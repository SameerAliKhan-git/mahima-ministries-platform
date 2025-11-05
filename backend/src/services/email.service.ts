import nodemailer from 'nodemailer';
import { Donation, User, Profile } from '@prisma/client';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@nonprofit.org';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

/**
 * Send verification email to new users
 */
export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  const verificationUrl = `${FRONTEND_URL}/verify-email?token=${verificationToken}`;

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: 'Verify Your Email Address',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3B82F6; color: white; padding: 30px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
            .button { display: inline-block; padding: 12px 30px; background-color: #10B981; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Our NonProfit!</h1>
            </div>
            <div class="content">
              <h2>Verify Your Email Address</h2>
              <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
              <p style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email</a>
              </p>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #3B82F6;">${verificationUrl}</p>
              <p>This link will expire in 24 hours.</p>
              <p>If you didn't create an account, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 NonProfit Donation Platform. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
};

/**
 * Send donation confirmation email
 */
export const sendDonationConfirmation = async (
  donation: Donation & { user?: (User & { profile?: Profile | null }) | null }
): Promise<void> => {
  if (!donation.user || donation.isAnonymous) {
    return;
  }

  const receiptUrl = `${FRONTEND_URL}/donations/${donation.id}/receipt`;

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: donation.user.email,
    subject: 'Thank You for Your Donation!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #10B981; color: white; padding: 30px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
            .amount { font-size: 36px; font-weight: bold; color: #10B981; text-align: center; margin: 20px 0; }
            .details { background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .button { display: inline-block; padding: 12px 30px; background-color: #3B82F6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🙏 Thank You!</h1>
            </div>
            <div class="content">
              <p>Dear ${donation.user.profile?.firstName || 'Donor'},</p>
              <p>Your generous donation has been received and is making a difference!</p>
              
              <div class="amount">₹${Number(donation.amount).toFixed(2)}</div>
              
              <div class="details">
                <div class="detail-row">
                  <span><strong>Transaction ID:</strong></span>
                  <span>${donation.transactionId || donation.id}</span>
                </div>
                <div class="detail-row">
                  <span><strong>Date:</strong></span>
                  <span>${new Date(donation.createdAt).toLocaleDateString()}</span>
                </div>
                ${donation.isRecurring ? `
                <div class="detail-row">
                  <span><strong>Recurring:</strong></span>
                  <span>${donation.recurringInterval}</span>
                </div>
                ` : ''}
                ${donation.dedicatedTo ? `
                <div class="detail-row">
                  <span><strong>Dedicated To:</strong></span>
                  <span>${donation.dedicatedTo}</span>
                </div>
                ` : ''}
              </div>
              
              <p>Your contribution helps us continue our mission and support those in need. Every donation, no matter the size, makes a real impact.</p>
              
              <p style="text-align: center;">
                <a href="${receiptUrl}" class="button">View Receipt</a>
              </p>
              
              <p>For tax purposes, please keep this email as your donation receipt. Your donation is eligible for 80G tax benefits. Our registration details are available on your receipt.</p>
              
              <p>With gratitude,<br>The Mahima Ministries Team</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 NonProfit Donation Platform. All rights reserved.</p>
              <p>Tax ID: 12-3456789</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string
): Promise<void> => {
  const resetUrl = `${FRONTEND_URL}/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: 'Reset Your Password',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #F59E0B; color: white; padding: 30px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
            .button { display: inline-block; padding: 12px 30px; background-color: #3B82F6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .warning { background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              
              <p style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </p>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #3B82F6;">${resetUrl}</p>
              
              <div class="warning">
                <strong>⚠️ Important:</strong> This link will expire in 1 hour for security reasons.
              </div>
              
              <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
              
              <p>For security reasons, we never include passwords in emails.</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 NonProfit Donation Platform. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
};

/**
 * Send welcome email after registration
 */
export const sendWelcomeEmail = async (
  email: string,
  firstName: string
): Promise<void> => {
  await transporter.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: 'Welcome to Our Community!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3B82F6; color: white; padding: 30px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
            .features { display: grid; gap: 15px; margin: 20px 0; }
            .feature { background-color: white; padding: 15px; border-radius: 5px; }
            .button { display: inline-block; padding: 12px 30px; background-color: #10B981; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome, ${firstName}! 🎉</h1>
            </div>
            <div class="content">
              <p>Thank you for joining our community of changemakers!</p>
              
              <p>Here's what you can do:</p>
              
              <div class="features">
                <div class="feature">
                  <strong>💝 Make a Difference</strong>
                  <p>Your donations directly support our programs and initiatives.</p>
                </div>
                <div class="feature">
                  <strong>📊 Track Your Impact</strong>
                  <p>View your donation history and see how you're making a difference.</p>
                </div>
                <div class="feature">
                  <strong>🔄 Set Up Recurring Donations</strong>
                  <p>Automate your giving and create lasting change.</p>
                </div>
                <div class="feature">
                  <strong>🤝 Explore Partnerships</strong>
                  <p>Corporate and institutional partnership opportunities available.</p>
                </div>
              </div>
              
              <p style="text-align: center;">
                <a href="${FRONTEND_URL}/dashboard" class="button">Go to Dashboard</a>
              </p>
              
              <p>If you have any questions, feel free to reach out to our team at support@nonprofit.org</p>
              
              <p>Together, we can make a difference!</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 NonProfit Donation Platform. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
};

/**
 * Verify email configuration
 */
export const verifyEmailService = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log('✅ Email service is configured correctly');
    return true;
  } catch (error) {
    console.error('❌ Email service configuration error:', error);
    return false;
  }
};
