import { Request, Response, NextFunction } from 'express';
import { PrismaClient, DonationStatus, RecurringInterval } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Note: Payment processing is handled by Paytm Payment Gateway
// See paytm.controller.ts for payment integration

// Validation schemas
const createDonationSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('INR'),
  campaignId: z.string().optional(),
  isRecurring: z.boolean().default(false),
  recurringInterval: z.nativeEnum(RecurringInterval).optional(),
  isAnonymous: z.boolean().default(false),
  dedicatedTo: z.string().optional(),
  message: z.string().max(500).optional(),
});

/**
 * Create a new donation
 * POST /api/donations
 */
export const createDonation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    const validatedData = createDonationSchema.parse(req.body);

    // Validate campaign if provided
    if (validatedData.campaignId) {
      const campaign = await prisma.campaign.findUnique({
        where: { id: validatedData.campaignId },
      });

      if (!campaign) {
        res.status(404).json({
          success: false,
          message: 'Campaign not found',
        });
        return;
      }

      if (campaign.endDate && campaign.endDate < new Date()) {
        res.status(400).json({
          success: false,
          message: 'Campaign has ended',
        });
        return;
      }
    }

    // Note: Use Paytm Payment Gateway for payment processing (see paytm.controller.ts)
    // For legacy/testing purposes, create a mock payment ID
    const mockPaymentId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        userId: userId || undefined,
        amount: validatedData.amount,
        currency: validatedData.currency,
        status: DonationStatus.PENDING,
        paymentIntentId: mockPaymentId,
        campaignId: validatedData.campaignId,
        isRecurring: validatedData.isRecurring,
        recurringInterval: validatedData.recurringInterval,
        isAnonymous: validatedData.isAnonymous,
        dedicatedTo: validatedData.dedicatedTo,
        message: validatedData.message,
      },
      include: {
        campaign: true,
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      data: {
        donation,
        paymentId: mockPaymentId,
        // Note: For actual payments, use /api/paytm/initiate endpoint
        paymentUrl: `http://localhost:3000/payment/${mockPaymentId}`,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors,
      });
      return;
    }
    next(error);
  }
};

/**
 * Get user's donation history
 * GET /api/donations/my-donations
 */
export const getMyDonations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where: { userId },
        include: {
          campaign: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.donation.count({
        where: { userId },
      }),
    ]);

    // Calculate statistics
    const totalDonated = await prisma.donation.aggregate({
      where: {
        userId,
        status: DonationStatus.COMPLETED,
      },
      _sum: {
        amount: true,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        donations,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
        statistics: {
          totalDonated: totalDonated._sum.amount || 0,
          totalDonations: total,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all donations (Admin only)
 * GET /api/donations
 */
export const getAllDonations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status as DonationStatus | undefined;
    const campaignId = req.query.campaignId as string | undefined;

    const where: any = {};
    if (status) where.status = status;
    if (campaignId) where.campaignId = campaignId;

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        include: {
          user: {
            include: {
              profile: true,
            },
          },
          campaign: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.donation.count({ where }),
    ]);

    // Calculate total revenue
    const revenue = await prisma.donation.aggregate({
      where: {
        status: DonationStatus.COMPLETED,
      },
      _sum: {
        amount: true,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        donations,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
        statistics: {
          totalRevenue: revenue._sum.amount || 0,
          totalDonations: total,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get donation by ID
 * GET /api/donations/:id
 */
export const getDonationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.userId;
    const userRole = (req as any).user?.role;

    const donation = await prisma.donation.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        campaign: true,
      },
    });

    if (!donation) {
      res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
      return;
    }

    // Check authorization (user can only see their own donations, admins can see all)
    if (userRole !== 'ADMIN' && donation.userId !== userId) {
      res.status(403).json({
        success: false,
        message: 'Access denied',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { donation },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle payment gateway webhook events (Legacy)
 * POST /api/donations/webhook
 * Note: Paytm webhooks are handled in paytm.controller.ts
 */
export const handleStripeWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Legacy webhook handler - Paytm uses its own callback endpoint
    // Signature validation could be added here if needed
    
    // For now, accept all webhooks (development only)
    const { order_id, status, payment_id } = req.body;

    // Handle the event based on status
    switch (status) {
      case 'success':
      case 'completed':
        // Update donation status
        const donation = await prisma.donation.findFirst({
          where: { paymentIntentId: order_id },
          include: { campaign: true },
        });

        if (donation) {
          await prisma.donation.update({
            where: { id: donation.id },
            data: {
              status: DonationStatus.COMPLETED,
              transactionId: payment_id,
            },
          });

          // Update campaign raised amount
          if (donation.campaignId) {
            await prisma.campaign.update({
              where: { id: donation.campaignId },
              data: {
                raised: {
                  increment: donation.amount,
                },
              },
            });
          }

          // Note: Thank you emails and 80G receipts are handled automatically in paytm.controller.ts
        }
        break;

      case 'failed':
      case 'declined':
        await prisma.donation.updateMany({
          where: { paymentIntentId: order_id },
          data: { status: DonationStatus.FAILED },
        });
        break;

      default:
        console.log(`Unhandled payment status: ${status}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    next(error);
  }
};

/**
 * Cancel recurring donation
 * DELETE /api/donations/:id/recurring
 */
export const cancelRecurringDonation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.userId;

    const donation = await prisma.donation.findUnique({
      where: { id },
    });

    if (!donation) {
      res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
      return;
    }

    if (donation.userId !== userId) {
      res.status(403).json({
        success: false,
        message: 'Access denied',
      });
      return;
    }

    if (!donation.isRecurring) {
      res.status(400).json({
        success: false,
        message: 'This is not a recurring donation',
      });
      return;
    }

    // Cancel the recurring donation
    await prisma.donation.update({
      where: { id },
      data: {
        isRecurring: false,
        recurringInterval: null,
      },
    });

    // Note: Recurring payments handled by Paytm Subscription API if needed

    res.status(200).json({
      success: true,
      message: 'Recurring donation cancelled successfully',
    });
  } catch (error) {
    next(error);
  }
};
