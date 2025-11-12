import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.util';
import { sendWhatsAppTextMessage } from '../utils/whatsapp.util';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mahimaministriesindia@gmail.com';
const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP || '+919246272675';

// Create email transporter
const createTransporter = () => {
  // Check if SMTP is configured
  const smtpPassword = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
  
  if (!smtpPassword || smtpPassword === 'your-gmail-app-password-here') {
    logger.warn('SMTP not configured - emails will be logged instead of sent');
    // Return a test transporter that just logs
    return {
      sendMail: async (mailOptions: any) => {
        logger.info('📧 Email would be sent:', {
          to: mailOptions.to,
          subject: mailOptions.subject,
          from: mailOptions.from,
        });
        console.log('\n' + '='.repeat(80));
        console.log('📧 EMAIL NOTIFICATION');
        console.log('='.repeat(80));
        console.log('To:', mailOptions.to);
        console.log('From:', mailOptions.from);
        console.log('Subject:', mailOptions.subject);
        console.log('='.repeat(80) + '\n');
        return { messageId: 'test-' + Date.now() };
      },
    } as any;
  }
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: smtpPassword,
    },
  });
};

// Email template styling
const emailStyles = `
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2d3748; background-color: #f7fafc; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 40px 30px; text-align: center; }
    .header h1 { font-size: 24px; font-weight: 600; margin: 0; }
    .content { padding: 40px 30px; }
    .content p { margin: 15px 0; color: #4a5568; }
    .content strong { color: #2d3748; }
    .divider { height: 2px; background: #e2e8f0; margin: 25px 0; }
    .info-box { background: #f7fafc; border-left: 4px solid #f97316; padding: 20px; margin: 20px 0; border-radius: 6px; }
    .info-box h3 { color: #f97316; margin-bottom: 15px; font-size: 14px; font-weight: 600; }
    .detail-row { margin: 10px 0; font-size: 14px; }
    .detail-label { font-weight: 600; color: #718096; display: inline-block; min-width: 120px; }
    .detail-value { color: #2d3748; }
    .button { display: inline-block; padding: 12px 28px; background: #f97316; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; margin: 10px 0; }
    .button:hover { background: #ea580c; }
    .footer { background: #f7fafc; border-top: 1px solid #e2e8f0; padding: 25px 30px; text-align: center; font-size: 12px; color: #718096; }
    .footer p { margin: 5px 0; }
    .list-item { margin: 8px 0; padding-left: 20px; }
    .list-item:before { content: "✓"; color: #f97316; font-weight: bold; margin-right: 10px; margin-left: -20px; }
    .signature { margin-top: 30px; }
    .signature p { margin: 5px 0; }
  </style>
`;

/**
 * Send Contact Form Submission Emails
 */
export const sendContactFormEmails = async (data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: Date;
}) => {
  const transporter = createTransporter();

  // Email to sender (acknowledgment)
  const senderEmail = {
    from: `Mahima Ministries <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: 'Thank You for Contacting Mahima Ministries ✓',
    html: `
      ${emailStyles}
      <div class="container">
        <div class="header">
          <h1>Thank You for Reaching Out!</h1>
          <p style="margin-top: 5px; opacity: 0.95;">We've received your inquiry</p>
        </div>
        <div class="content">
          <p>Dear ${data.name},</p>
          <p>Thank you for taking the time to contact Mahima Ministries. We truly appreciate your interest and will carefully review your message.</p>
          
          <div class="divider"></div>
          
          <div class="info-box">
            <h3>Your Submission Details</h3>
            <div class="detail-row">
              <span class="detail-label">Subject:</span>
              <span class="detail-value">${data.subject}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Submitted:</span>
              <span class="detail-value">${data.submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</span>
            </div>
          </div>

          <p><strong>What happens next?</strong></p>
          <div class="list-item">Our team will review your message thoroughly</div>
          <div class="list-item">We'll respond to you within 24-48 hours</div>
          <div class="list-item">Your inquiry is important to us</div>

          <div class="divider"></div>
          
          <p><strong style="color: #2d3748;">Need Immediate Help?</strong></p>
          <p style="margin: 15px 0;">
            📞 <strong>Phone:</strong> 040-23032675, 9246272675<br>
            📧 <strong>Email:</strong> mahimaministriesindia@gmail.com<br>
            💬 <strong>WhatsApp:</strong> +91 9246272675
          </p>

          <div class="signature">
            <p style="margin-top: 20px;">Blessings,</p>
            <p><strong>The Mahima Ministries Team</strong></p>
          </div>
        </div>
        <div class="footer">
          <p><strong>Mahima Ministries</strong></p>
          <p>2-38/8/2/9/4/1, NTR Nagar Colony, Chandanagar, Telangana - 502032</p>
          <p style="margin-top: 10px;">Bringing hope, compassion, and spiritual care to our community</p>
        </div>
      </div>
    `,
  };

  // Email to admin (notification)
  const adminEmail = {
    from: `Website Contact Form <${process.env.SMTP_USER}>`,
    to: ADMIN_EMAIL,
    subject: `New Contact Form Submission: ${data.subject}`,
    html: `
      ${emailStyles}
      <div class="container">
        <div class="header">
          <h1>New Inquiry Received</h1>
        </div>
        <div class="content">
          <p>A new contact form submission has been received from your website.</p>
          
          <div class="info-box">
            <h3>Contact Details</h3>
            <div class="detail-row">
              <span class="detail-label">Name:</span>
              <span class="detail-value"><strong>${data.name}</strong></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span class="detail-value"><a href="mailto:${data.email}" style="color: #f97316; text-decoration: none;">${data.email}</a></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span>
              <span class="detail-value"><a href="tel:${data.phone}" style="color: #f97316; text-decoration: none;">${data.phone}</a></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Subject:</span>
              <span class="detail-value"><strong>${data.subject}</strong></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Submitted:</span>
              <span class="detail-value">${data.submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</span>
            </div>
          </div>

          <p style="margin-top: 20px;"><strong>Message:</strong></p>
          <div style="background: #f7fafc; border-left: 4px solid #cbd5e0; padding: 15px; margin: 15px 0; border-radius: 4px; font-size: 14px; line-height: 1.6;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>

          <div class="divider"></div>

          <p><strong>⏱️ Action Required:</strong> Please respond to this inquiry within 24-48 hours.</p>
          
          <a href="mailto:${data.email}" class="button">Reply to ${data.name}</a>
        </div>
        <div class="footer">
          <p>This is an automated notification from your website contact form.</p>
        </div>
      </div>
    `,
  };

  let emailError: unknown = null;

  try {
    await Promise.all([
      transporter.sendMail(senderEmail),
      transporter.sendMail(adminEmail),
    ]);
    logger.info(`Contact form emails sent successfully to ${data.email} and admin`);
  } catch (error) {
    emailError = error;
    logger.error('Error sending contact form emails:', error);
  }

  try {
    await sendWhatsAppNotification({
      type: 'contact_form',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message.substring(0, 100) + (data.message.length > 100 ? '...' : ''),
      },
    });
  } catch (error) {
    logger.error('Error sending WhatsApp notification for contact form:', error);
  }

  if (emailError) {
    throw emailError;
  }

  return { success: true };
};

/**
 * Send Partnership Application Emails
 */
export const sendPartnershipApplicationEmails = async (data: {
  organizationName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  partnershipType: string;
  proposalDetails: string;
  submittedAt: Date;
}) => {
  const transporter = createTransporter();

  // Email to applicant (acknowledgment)
  const applicantEmail = {
    from: `Mahima Ministries <${process.env.SMTP_USER}>`,
    to: data.contactEmail,
    subject: 'Partnership Application Received ✓',
    html: `
      ${emailStyles}
      <div class="container">
        <div class="header">
          <h1>Partnership Application Received</h1>
          <p style="margin-top: 5px; opacity: 0.95;">Thank you for your interest in partnering with us</p>
        </div>
        <div class="content">
          <p>Dear ${data.contactName},</p>
          <p>Thank you for your interest in partnering with Mahima Ministries! We are excited to learn about your organization and explore potential opportunities for collaboration.</p>
          
          <div class="divider"></div>
          
          <div class="info-box">
            <h3>Application Summary</h3>
            <div class="detail-row">
              <span class="detail-label">Organization:</span>
              <span class="detail-value"><strong>${data.organizationName}</strong></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Partnership Type:</span>
              <span class="detail-value">${data.partnershipType}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Received:</span>
              <span class="detail-value">${data.submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</span>
            </div>
          </div>

          <p><strong>Next Steps:</strong></p>
          <div class="list-item">Our partnership team will review your application</div>
          <div class="list-item">We'll contact you within 5-7 business days</div>
          <div class="list-item">We may request additional information if needed</div>
          <div class="list-item">Schedule a meeting to discuss opportunities</div>

          <div class="divider"></div>

          <p>If you have any immediate questions, please don't hesitate to reach out:</p>
          <p style="margin: 15px 0;">
            📞 <strong>Phone:</strong> 040-23032675, 9246272675<br>
            📧 <strong>Email:</strong> mahimaministriesindia@gmail.com
          </p>

          <p>We look forward to exploring how we can work together to make a meaningful difference!</p>

          <div class="signature">
            <p style="margin-top: 20px;">Warm regards,</p>
            <p><strong>Partnership Team<br>Mahima Ministries</strong></p>
          </div>
        </div>
        <div class="footer">
          <p><strong>Mahima Ministries</strong></p>
          <p>2-38/8/2/9/4/1, NTR Nagar Colony, Chandanagar, Telangana - 502032</p>
        </div>
      </div>
    `,
  };

  // Email to admin (notification)
  const adminEmail = {
    from: `Partnership Applications <${process.env.SMTP_USER}>`,
    to: ADMIN_EMAIL,
    subject: `New Partnership Application: ${data.organizationName}`,
    html: `
      ${emailStyles}
      <div class="container">
        <div class="header">
          <h1>New Partnership Application</h1>
        </div>
        <div class="content">
          <p>A new partnership application has been submitted through your website.</p>
          
          <div class="info-box">
            <h3>Application Details</h3>
            <div class="detail-row">
              <span class="detail-label">Organization:</span>
              <span class="detail-value"><strong>${data.organizationName}</strong></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Contact Person:</span>
              <span class="detail-value">${data.contactName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span class="detail-value"><a href="mailto:${data.contactEmail}" style="color: #f97316; text-decoration: none;">${data.contactEmail}</a></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span>
              <span class="detail-value"><a href="tel:${data.contactPhone}" style="color: #f97316; text-decoration: none;">${data.contactPhone}</a></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Type:</span>
              <span class="detail-value"><strong>${data.partnershipType}</strong></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Received:</span>
              <span class="detail-value">${data.submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</span>
            </div>
          </div>

          <p style="margin-top: 20px;"><strong>Proposal Details:</strong></p>
          <div style="background: #f7fafc; border-left: 4px solid #cbd5e0; padding: 15px; margin: 15px 0; border-radius: 4px; font-size: 14px; line-height: 1.6;">
            ${data.proposalDetails.replace(/\n/g, '<br>')}
          </div>

          <div class="divider"></div>

          <p><strong>⏱️ Action Required:</strong> Review and respond within 5-7 business days.</p>
          
          <a href="mailto:${data.contactEmail}" class="button">Contact ${data.contactName}</a>
        </div>
        <div class="footer">
          <p>This is an automated notification from your website partnership form.</p>
        </div>
      </div>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(applicantEmail),
      transporter.sendMail(adminEmail),
    ]);
    logger.info(`Partnership application emails sent successfully to ${data.contactEmail} and admin`);
    
    // Send WhatsApp notification
    await sendWhatsAppNotification({
      type: 'partnership_application',
      data: {
        organizationName: data.organizationName,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        partnershipType: data.partnershipType,
      },
    });
    
    return { success: true };
  } catch (error) {
    logger.error('Error sending partnership application emails:', error);
    throw error;
  }
};

/**
 * Send WhatsApp Notification
 * Using Meta WhatsApp Business Cloud API (Official)
 */
export const sendWhatsAppNotification = async (notification: {
  type: string;
  data: any;
}) => {
  try {
    // Format message based on type
    let message = '';
    
    if (notification.type === 'contact_form') {
      message = `🔔 *New Contact Form Submission*\n\n` +
        `👤 Name: ${notification.data.name}\n` +
        `📧 Email: ${notification.data.email}\n` +
        `📞 Phone: ${notification.data.phone}\n` +
        `📝 Subject: ${notification.data.subject}\n` +
        `💬 Message: ${notification.data.message}\n\n` +
        `⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;
    } else if (notification.type === 'partnership_application') {
      message = `🤝 *New Partnership Application*\n\n` +
        `🏢 Organization: ${notification.data.organizationName}\n` +
        `👤 Contact: ${notification.data.contactName}\n` +
        `📧 Email: ${notification.data.contactEmail}\n` +
        `📞 Phone: ${notification.data.contactPhone}\n` +
        `🔖 Type: ${notification.data.partnershipType}\n\n` +
        `⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;
    }

    // Send WhatsApp message using Meta WhatsApp Business Cloud API
    logger.info('Sending WhatsApp via Meta:', { to: ADMIN_WHATSAPP });
    
    const result = await sendWhatsAppTextMessage(ADMIN_WHATSAPP, message);
    
    if (result.success) {
      logger.info('✅ WhatsApp sent successfully:', { messageId: result.messageId });
      console.log('\n' + '='.repeat(60));
      console.log('✅ WHATSAPP SENT TO:', ADMIN_WHATSAPP);
      console.log('Message ID:', result.messageId);
      console.log('='.repeat(60) + '\n');
      
      return { success: true, message: 'WhatsApp notification sent via Meta', messageId: result.messageId };
    } else {
      logger.warn('WhatsApp not configured or failed - message logged only');
      console.log('\n' + '='.repeat(60));
      console.log('📱 WHATSAPP NOTIFICATION TO:', ADMIN_WHATSAPP);
      console.log('='.repeat(60));
      console.log(message);
      console.log('='.repeat(60) + '\n');
      
      return { success: true, message: 'WhatsApp notification logged (Meta WhatsApp not configured)' };
    }
  } catch (error: any) {
    logger.error('❌ Error sending WhatsApp notification:', error);
    
    // Log the error details
    console.log('\n' + '='.repeat(60));
    console.log('❌ WHATSAPP SENDING FAILED');
    console.log('Error:', error.message);
    console.log('='.repeat(60) + '\n');
    
    // Don't throw error to prevent email sending failure
    return { success: false, error: error.message };
  }
};

export default {
  sendContactFormEmails,
  sendPartnershipApplicationEmails,
  sendWhatsAppNotification,
};
