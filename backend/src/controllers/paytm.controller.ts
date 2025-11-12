import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import {
  initiatePaytmPayment,
  verifyPaytmChecksum,
  getPaytmTransactionStatus,
  validatePaytmConfig,
  getPaymentModeLabel,
} from '../utils/paytm';
import { logger } from '../utils/logger.util';
import { generateAndSendReceipt } from '../utils/receipt.util';

const prisma = new PrismaClient();

// Validation schemas
const initiatePaymentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  donorName: z.string().min(1, 'Donor name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  campaignId: z.string().uuid().optional(),
  isAnonymous: z.boolean().optional(),
  message: z.string().optional(),
});

const checkStatusSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
});

/**
 * Initiate Paytm payment transaction
 */
export const initiatePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate Paytm configuration
    const configValidation = validatePaytmConfig();
    if (!configValidation.isValid) {
      res.status(500).json({
        success: false,
        message: 'Paytm payment gateway is not configured properly',
        errors: configValidation.errors,
      });
      return;
    }

    // Validate request
    const validatedData = initiatePaymentSchema.parse(req.body);
    const userId = (req as any).user?.userId;

    // Generate unique order ID
    const orderId = `MM_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Create donation record in database with INR currency for Paytm
    const donation = await prisma.donation.create({
      data: {
        amount: validatedData.amount,
        currency: 'INR', // Paytm uses Indian Rupees
        donorName: validatedData.donorName,
        email: validatedData.email,
        phone: validatedData.phone,
        campaignId: validatedData.campaignId,
        userId: userId || null,
        isAnonymous: validatedData.isAnonymous || false,
        message: validatedData.message,
        paymentMethod: 'PAYTM',
        paymentStatus: 'PENDING',
        orderId: orderId,
      },
    });

    // Initialize Paytm payment
    const paymentData = await initiatePaytmPayment({
      orderId,
      amount: validatedData.amount,
      customerId: userId || validatedData.email,
      customerEmail: validatedData.email,
      customerPhone: validatedData.phone,
      description: `Donation to Mahima Ministries - ${orderId}`,
    });

    logger.info('Paytm payment initiated', {
      donationId: donation.id,
      orderId,
      amount: validatedData.amount,
    });

    res.status(200).json({
      success: true,
      message: 'Payment initiated successfully',
      data: {
        donationId: donation.id,
        orderId,
        transactionUrl: paymentData.transactionUrl,
        params: paymentData.params,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
      return;
    }

    logger.error('Error initiating Paytm payment:', error);
    next(error);
  }
};

/**
 * Handle Paytm payment callback
 */
export const handleCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paytmParams = req.body;

    logger.info('Paytm callback received', { paytmParams });

    // Verify checksum
    const isValid = await verifyPaytmChecksum(paytmParams);

    if (!isValid) {
      logger.error('Invalid Paytm checksum', { paytmParams });
      res.redirect(
        `${process.env.FRONTEND_URL}/donations/payment-failed?error=invalid_checksum`
      );
      return;
    }

    const {
      ORDERID: orderId,
      TXNID: txnId,
      TXNAMOUNT: amount,
      STATUS: status,
      RESPCODE: respCode,
      RESPMSG: respMsg,
      PAYMENTMODE: paymentMode,
      BANKTXNID: bankTxnId,
      TXNDATE: txnDate,
    } = paytmParams;

    // Find donation by order ID
    const donation = await prisma.donation.findFirst({
      where: { orderId },
    });

    if (!donation) {
      logger.error('Donation not found for order ID', { orderId });
      res.redirect(
        `${process.env.FRONTEND_URL}/donations/payment-failed?error=donation_not_found`
      );
      return;
    }

    // Update donation based on payment status
    if (status === 'TXN_SUCCESS') {
      const updatedDonation = await prisma.donation.update({
        where: { id: donation.id },
        data: {
          paymentStatus: 'COMPLETED',
          txnId,
          paymentMode: getPaymentModeLabel(paymentMode),
          bankTxnId,
          paidAt: new Date(txnDate),
          gatewayResponse: JSON.stringify(paytmParams),
        },
        include: {
          campaign: true,
        },
      });

      logger.info('Payment successful', { donationId: donation.id, txnId });

      // Generate and send automated receipt
      try {
        await generateAndSendReceipt({
          donationId: updatedDonation.id,
          orderId: updatedDonation.orderId!,
          donorName: updatedDonation.donorName,
          email: updatedDonation.email,
          phone: updatedDonation.phone,
          amount: updatedDonation.amount,
          paymentMode: updatedDonation.paymentMode || 'PAYTM',
          txnId: updatedDonation.txnId!,
          paidAt: updatedDonation.paidAt!,
          campaignName: updatedDonation.campaign?.title,
          message: updatedDonation.message || undefined,
          isAnonymous: updatedDonation.isAnonymous,
        });

        logger.info('Automated receipt sent successfully', {
          donationId: updatedDonation.id,
          email: updatedDonation.email,
        });
      } catch (receiptError) {
        // Log error but don't fail the payment
        logger.error('Failed to send automated receipt', {
          error: receiptError,
          donationId: updatedDonation.id,
        });
      }

      // Redirect to success page
      res.redirect(
        `${process.env.FRONTEND_URL}/donations/payment-success?orderId=${orderId}&donationId=${donation.id}`
      );
    } else {
      await prisma.donation.update({
        where: { id: donation.id },
        data: {
          paymentStatus: 'FAILED',
          gatewayResponse: JSON.stringify(paytmParams),
        },
      });

      logger.info('Payment failed', {
        donationId: donation.id,
        status,
        respMsg,
      });

      // Redirect to failure page
      res.redirect(
        `${process.env.FRONTEND_URL}/donations/payment-failed?orderId=${orderId}&message=${encodeURIComponent(respMsg)}`
      );
    }
  } catch (error) {
    logger.error('Error handling Paytm callback:', error);
    res.redirect(
      `${process.env.FRONTEND_URL}/donations/payment-failed?error=callback_error`
    );
  }
};

/**
 * Check payment status
 */
export const checkPaymentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = checkStatusSchema.parse(req.query);

    // Get status from Paytm
    const statusResponse = await getPaytmTransactionStatus(orderId);

    // Find donation
    const donation = await prisma.donation.findFirst({
      where: { orderId },
      include: {
        campaign: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!donation) {
      res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
      return;
    }

    // Update donation if status changed
    if (statusResponse.body?.resultInfo?.resultStatus === 'TXN_SUCCESS') {
      if (donation.paymentStatus !== 'COMPLETED') {
        await prisma.donation.update({
          where: { id: donation.id },
          data: {
            paymentStatus: 'COMPLETED',
            txnId: statusResponse.body.txnId,
            paymentMode: getPaymentModeLabel(statusResponse.body.paymentMode),
            bankTxnId: statusResponse.body.bankTxnId,
            paidAt: new Date(statusResponse.body.txnDate),
            gatewayResponse: JSON.stringify(statusResponse),
          },
        });
      }
    }

    res.status(200).json({
      success: true,
      data: {
        donation,
        paytmStatus: statusResponse,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
      return;
    }

    logger.error('Error checking payment status:', error);
    next(error);
  }
};

/**
 * Get all donations (for admin)
 */
export const getAllDonations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          campaign: {
            select: {
              title: true,
            },
          },
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      prisma.donation.count(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        donations,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    logger.error('Error fetching donations:', error);
    next(error);
  }
};
