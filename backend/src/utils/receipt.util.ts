import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { logger } from './logger.util';
import { sendWhatsAppReceipt, validateWhatsAppConfig } from './whatsapp.util';

interface ReceiptData {
  donationId: string;
  orderId: string;
  donorName: string;
  email: string;
  phone: string;
  amount: number;
  paymentMode: string;
  txnId: string;
  paidAt: Date;
  campaignName?: string;
  message?: string;
  isAnonymous: boolean;
}

// Email configuration
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

/**
 * Generate a PDF receipt for a donation
 */
export async function generateReceiptPDF(data: ReceiptData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks: Buffer[] = [];

      // Collect PDF chunks
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Header - Organization Logo and Name
      doc
        .fontSize(24)
        .font('Helvetica-Bold')
        .fillColor('#FF6B35')
        .text('MAHIMA MINISTRIES', { align: 'center' });

      doc
        .fontSize(12)
        .font('Helvetica')
        .fillColor('#666666')
        .text('Tax Exempt Organization under Section 80G', { align: 'center' })
        .moveDown(0.5);

      doc
        .fontSize(10)
        .text('Registration No: [Your Registration Number]', { align: 'center' })
        .text('PAN: [Your PAN Number]', { align: 'center' })
        .moveDown(2);

      // Receipt Title
      doc
        .fontSize(20)
        .font('Helvetica-Bold')
        .fillColor('#333333')
        .text('DONATION RECEIPT', { align: 'center' })
        .moveDown(2);

      // Draw a line
      doc
        .strokeColor('#FF6B35')
        .lineWidth(2)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke()
        .moveDown(1);

      // Receipt Details Box
      const startY = doc.y;
      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .fillColor('#333333');

      // Left Column
      const leftX = 80;
      const rightX = 320;
      let currentY = startY;

      // Receipt Number
      doc.text('Receipt No:', leftX, currentY);
      doc.font('Helvetica').text(data.orderId, rightX, currentY);
      currentY += 25;

      // Transaction ID
      doc.font('Helvetica-Bold').text('Transaction ID:', leftX, currentY);
      doc.font('Helvetica').text(data.txnId, rightX, currentY);
      currentY += 25;

      // Date
      doc.font('Helvetica-Bold').text('Date:', leftX, currentY);
      doc
        .font('Helvetica')
        .text(new Date(data.paidAt).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }), rightX, currentY);
      currentY += 25;

      // Donor Name
      doc.font('Helvetica-Bold').text('Donor Name:', leftX, currentY);
      doc
        .font('Helvetica')
        .text(data.isAnonymous ? 'Anonymous Donor' : data.donorName, rightX, currentY);
      currentY += 25;

      // Email
      if (!data.isAnonymous) {
        doc.font('Helvetica-Bold').text('Email:', leftX, currentY);
        doc.font('Helvetica').text(data.email, rightX, currentY);
        currentY += 25;

        // Phone
        doc.font('Helvetica-Bold').text('Phone:', leftX, currentY);
        doc.font('Helvetica').text(data.phone, rightX, currentY);
        currentY += 25;
      }

      // Campaign
      if (data.campaignName) {
        doc.font('Helvetica-Bold').text('Campaign:', leftX, currentY);
        doc.font('Helvetica').text(data.campaignName, rightX, currentY);
        currentY += 25;
      }

      // Payment Mode
      doc.font('Helvetica-Bold').text('Payment Mode:', leftX, currentY);
      doc.font('Helvetica').text(getPaymentModeName(data.paymentMode), rightX, currentY);
      currentY += 40;

      // Amount Box - Highlighted
      doc
        .rect(50, currentY - 10, 495, 60)
        .fillAndStroke('#FFF5F0', '#FF6B35');

      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .fillColor('#333333')
        .text('Amount Received:', leftX, currentY + 10);

      doc
        .fontSize(18)
        .fillColor('#FF6B35')
        .text(`₹ ${data.amount.toLocaleString('en-IN')}`, rightX, currentY + 10);

      currentY += 80;

      // Amount in Words
      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .fillColor('#333333')
        .text('Amount in Words:', leftX, currentY);

      doc
        .font('Helvetica')
        .text(numberToWords(data.amount) + ' Rupees Only', leftX, currentY + 15, {
          width: 450,
        });

      currentY += 60;

      // Message/Dedication if provided
      if (data.message) {
        doc
          .font('Helvetica-Bold')
          .text('Message/Dedication:', leftX, currentY);
        doc
          .font('Helvetica')
          .fontSize(10)
          .text(data.message, leftX, currentY + 15, {
            width: 450,
            align: 'justify',
          });
        currentY += 60;
      }

      // Tax Benefits Note
      currentY = Math.max(currentY, 550); // Ensure we're not too low on the page
      doc
        .fontSize(10)
        .font('Helvetica-Bold')
        .fillColor('#FF6B35')
        .text('Tax Benefit Information:', 50, currentY)
        .moveDown(0.5);

      doc
        .fontSize(9)
        .font('Helvetica')
        .fillColor('#666666')
        .text(
          'This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961. ' +
          'Please retain this receipt for your tax filing purposes. This is a computer-generated receipt and does not require a signature.',
          { width: 495, align: 'justify' }
        )
        .moveDown(1);

      // Footer
      doc
        .fontSize(8)
        .fillColor('#999999')
        .text('Thank you for your generous contribution!', { align: 'center' })
        .moveDown(0.5);

      doc
        .fontSize(8)
        .text(
          'For queries, contact: info@mahimaministries.org | +91-XXX-XXX-XXXX',
          { align: 'center' }
        );

      // Finalize PDF
      doc.end();
    } catch (error) {
      logger.error('Error generating PDF receipt:', error);
      reject(error);
    }
  });
}

/**
 * Send receipt email with PDF attachment
 */
export async function sendReceiptEmail(
  data: ReceiptData,
  pdfBuffer: Buffer
): Promise<boolean> {
  try {
    const transporter = createEmailTransporter();

    const mailOptions = {
      from: {
        name: 'Mahima Ministries',
        address: process.env.SMTP_USER || 'noreply@mahimaministries.org',
      },
      to: data.email,
      subject: `Donation Receipt - ${data.orderId}`,
      html: generateReceiptEmailHTML(data),
      attachments: [
        {
          filename: `Receipt_${data.orderId}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Receipt email sent successfully to ${data.email}`, {
      messageId: info.messageId,
      orderId: data.orderId,
    });

    return true;
  } catch (error) {
    logger.error('Error sending receipt email:', error);
    return false;
  }
}

/**
 * Generate HTML email content for receipt
 */
function generateReceiptEmailHTML(data: ReceiptData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Donation Receipt</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">MAHIMA MINISTRIES</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 14px;">Thank you for your generous donation!</p>
      </div>
      
      <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
        <p style="font-size: 16px; margin-bottom: 20px;">Dear ${data.isAnonymous ? 'Valued Donor' : data.donorName},</p>
        
        <p style="font-size: 14px; margin-bottom: 20px;">
          We have received your generous donation of <strong style="color: #FF6B35; font-size: 18px;">₹${data.amount.toLocaleString('en-IN')}</strong>.
          Your contribution will help us continue our mission of serving those in need.
        </p>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #FF6B35; margin-top: 0;">Transaction Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Receipt No:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${data.orderId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Transaction ID:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${data.txnId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Date:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                ${new Date(data.paidAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Payment Mode:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${getPaymentModeName(data.paymentMode)}</td>
            </tr>
            ${data.campaignName ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Campaign:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${data.campaignName}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        ${data.message ? `
        <div style="background: #FFF5F0; padding: 15px; border-left: 4px solid #FF6B35; margin: 20px 0;">
          <p style="margin: 0; font-style: italic; color: #666;">"${data.message}"</p>
        </div>
        ` : ''}
        
        <div style="background: #FFF5F0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #FF6B35; margin-top: 0;">📄 Tax Benefit Information</h4>
          <p style="margin: 0; font-size: 13px; color: #666;">
            This donation is eligible for tax deduction under <strong>Section 80G</strong> of the Income Tax Act, 1961.
            Please find the attached PDF receipt for your tax filing purposes.
          </p>
        </div>
        
        <p style="font-size: 14px; margin-top: 30px;">
          Your support makes a real difference in the lives of those we serve. We are deeply grateful for your generosity.
        </p>
        
        <p style="font-size: 14px;">
          With gratitude,<br>
          <strong>Mahima Ministries Team</strong>
        </p>
      </div>
      
      <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
        <p style="font-size: 12px; color: #999; margin: 0;">
          For any queries, please contact us at:<br>
          📧 info@mahimaministries.org | 📞 +91-XXX-XXX-XXXX
        </p>
        <p style="font-size: 11px; color: #999; margin: 10px 0 0 0;">
          © ${new Date().getFullYear()} Mahima Ministries. All rights reserved.
        </p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate and send automated receipt via Email AND WhatsApp
 */
export async function generateAndSendReceipt(
  data: ReceiptData
): Promise<{ success: boolean; pdfBuffer?: Buffer; emailSent?: boolean; whatsappSent?: boolean }> {
  try {
    logger.info(`Generating receipt for donation ${data.donationId}`, {
      orderId: data.orderId,
      amount: data.amount,
    });

    // Generate PDF
    const pdfBuffer = await generateReceiptPDF(data);

    // Send email with PDF attachment
    const emailSent = await sendReceiptEmail(data, pdfBuffer);

    if (emailSent) {
      logger.info(`Receipt emailed successfully for ${data.orderId}`);
    } else {
      logger.warn(`Receipt email failed for ${data.orderId}`);
    }

    // Send WhatsApp receipt (if configured)
    let whatsappSent = false;
    const whatsappConfig = validateWhatsAppConfig();
    
    if (whatsappConfig.isValid) {
      try {
        const whatsappResult = await sendWhatsAppReceipt({
          to: data.phone,
          message: `Thank you for your donation!`,
          receiptPdfBuffer: pdfBuffer,
          donationDetails: {
            orderId: data.orderId,
            amount: data.amount,
            donorName: data.donorName,
            txnId: data.txnId,
          },
        });

        whatsappSent = whatsappResult.success;

        if (whatsappSent) {
          logger.info(`Receipt sent via WhatsApp successfully for ${data.orderId}`, {
            phone: data.phone,
          });
        } else {
          logger.warn(`WhatsApp receipt failed for ${data.orderId}`, {
            error: whatsappResult.error,
          });
        }
      } catch (whatsappError) {
        logger.error('Error sending WhatsApp receipt:', whatsappError);
      }
    } else {
      logger.info('WhatsApp not configured, skipping WhatsApp receipt', {
        errors: whatsappConfig.errors,
      });
    }

    // Return success if at least one channel succeeded
    const success = emailSent || whatsappSent;

    return { 
      success, 
      pdfBuffer,
      emailSent,
      whatsappSent 
    };
  } catch (error) {
    logger.error('Error in generateAndSendReceipt:', error);
    return { success: false };
  }
}

/**
 * Convert payment mode code to readable name
 */
function getPaymentModeName(mode: string): string {
  const modes: { [key: string]: string } = {
    CC: 'Credit Card',
    DC: 'Debit Card',
    NB: 'Net Banking',
    UPI: 'UPI',
    PPI: 'Paytm Wallet',
    PPBL: 'Paytm Postpaid',
    BALANCE: 'Paytm Balance',
  };
  return modes[mode] || mode || 'Online Payment';
}

/**
 * Convert number to words (Indian numbering system)
 */
function numberToWords(num: number): string {
  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen',
  ];
  
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety',
  ];

  if (num === 0) return 'Zero';

  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const hundred = Math.floor(num / 100);
  num %= 100;

  let words = '';

  if (crore > 0) {
    words += convertTwoDigit(crore) + ' Crore ';
  }
  if (lakh > 0) {
    words += convertTwoDigit(lakh) + ' Lakh ';
  }
  if (thousand > 0) {
    words += convertTwoDigit(thousand) + ' Thousand ';
  }
  if (hundred > 0) {
    words += ones[hundred] + ' Hundred ';
  }
  if (num > 0) {
    if (num < 20) {
      words += ones[num];
    } else {
      words += tens[Math.floor(num / 10)];
      if (num % 10 > 0) {
        words += ' ' + ones[num % 10];
      }
    }
  }

  return words.trim();
}

function convertTwoDigit(num: number): string {
  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen',
  ];
  
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety',
  ];

  if (num < 20) return ones[num];
  const ten = Math.floor(num / 10);
  const one = num % 10;
  return tens[ten] + (one > 0 ? ' ' + ones[one] : '');
}

export default {
  generateReceiptPDF,
  sendReceiptEmail,
  generateAndSendReceipt,
};
