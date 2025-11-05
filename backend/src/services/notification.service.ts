import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.util';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mahimaministriesindia@gmail.com';
const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP || '919246272675';

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Email template styling
const emailStyles = `
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; color: #6b7280; }
    .button { display: inline-block; padding: 12px 24px; background: #f97316; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; }
    .info-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
    .detail-row { padding: 10px; border-bottom: 1px solid #e5e7eb; }
    .detail-label { font-weight: bold; color: #6b7280; display: inline-block; width: 150px; }
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
    subject: 'Thank You for Contacting Mahima Ministries',
    html: `
      ${emailStyles}
      <div class="container">
        <div class="header">
          <h1>🙏 Thank You for Reaching Out!</h1>
        </div>
        <div class="content">
          <p>Dear ${data.name},</p>
          <p>We have received your message and appreciate you taking the time to contact Mahima Ministries.</p>
          
          <div class="info-box">
            <strong>📋 Your Submission Details:</strong>
            <div class="detail-row">
              <span class="detail-label">Subject:</span> ${data.subject}
            </div>
            <div class="detail-row">
              <span class="detail-label">Your Message:</span><br>
              ${data.message}
            </div>
            <div class="detail-row">
              <span class="detail-label">Submitted On:</span> ${data.submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </div>
          </div>

          <p>Our team will review your message and get back to you within 24-48 hours.</p>
          
          <p><strong>Need immediate assistance?</strong></p>
          <p>📞 Call: 040-23032675, 9246272675<br>
          📧 Email: mahimaministriesindia@gmail.com<br>
          💬 WhatsApp: +91 9246272675</p>
          
          <p>With gratitude,<br>
          <strong>The Mahima Ministries Team</strong></p>
        </div>
        <div class="footer">
          <p>Mahima Ministries | 2-38/8/2/9/4/1, NTR Nagar Colony, Chandanagar, Telangana - 502032</p>
          <p>Donations eligible for 80G tax benefits | Registration No: [To be updated]</p>
        </div>
      </div>
    `,
  };

  // Email to admin (notification)
  const adminEmail = {
    from: `Website Contact Form <${process.env.SMTP_USER}>`,
    to: ADMIN_EMAIL,
    subject: `🔔 New Contact Form Submission: ${data.subject}`,
    html: `
      ${emailStyles}
      <div class="container">
        <div class="header">
          <h1>📬 New Contact Form Submission</h1>
        </div>
        <div class="content">
          <p><strong>A new inquiry has been received through the website contact form.</strong></p>
          
          <div class="info-box">
            <h3>Contact Details:</h3>
            <div class="detail-row">
              <span class="detail-label">Name:</span> ${data.name}
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span> <a href="tel:${data.phone}">${data.phone}</a>
            </div>
            <div class="detail-row">
              <span class="detail-label">Subject:</span> ${data.subject}
            </div>
            <div class="detail-row">
              <span class="detail-label">Message:</span><br>
              <div style="margin-top: 10px; padding: 15px; background: #f9fafb; border-radius: 6px;">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div class="detail-row">
              <span class="detail-label">Submitted:</span> ${data.submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </div>
          </div>

          <p><strong>Action Required:</strong> Please respond to this inquiry within 24-48 hours.</p>
          
          <div style="margin-top: 20px;">
            <a href="mailto:${data.email}" class="button">Reply to ${data.name}</a>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated notification from the Mahima Ministries website.</p>
        </div>
      </div>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(senderEmail),
      transporter.sendMail(adminEmail),
    ]);
    logger.info(`Contact form emails sent successfully to ${data.email} and admin`);
    
    // Send WhatsApp notification
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
    
    return { success: true };
  } catch (error) {
    logger.error('Error sending contact form emails:', error);
    throw error;
  }
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
    subject: 'Partnership Application Received - Mahima Ministries',
    html: `
      ${emailStyles}
      <div class="container">
        <div class="header">
          <h1>🤝 Partnership Application Received</h1>
        </div>
        <div class="content">
          <p>Dear ${data.contactName},</p>
          <p>Thank you for your interest in partnering with Mahima Ministries! We have received your partnership application.</p>
          
          <div class="info-box">
            <strong>📋 Application Summary:</strong>
            <div class="detail-row">
              <span class="detail-label">Organization:</span> ${data.organizationName}
            </div>
            <div class="detail-row">
              <span class="detail-label">Partnership Type:</span> ${data.partnershipType}
            </div>
            <div class="detail-row">
              <span class="detail-label">Submitted On:</span> ${data.submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </div>
          </div>

          <p><strong>What happens next?</strong></p>
          <ul>
            <li>✅ Your application is under review</li>
            <li>📞 Our partnership team will contact you within 5-7 business days</li>
            <li>📄 We may request additional information or documentation</li>
            <li>🤝 Schedule a meeting to discuss partnership opportunities</li>
          </ul>
          
          <p>For any immediate questions, please contact:</p>
          <p>📞 040-23032675, 9246272675<br>
          📧 mahimaministriesindia@gmail.com</p>
          
          <p>We look forward to exploring how we can work together to make a difference!</p>
          
          <p>Warm regards,<br>
          <strong>Partnership Team<br>Mahima Ministries</strong></p>
        </div>
        <div class="footer">
          <p>Mahima Ministries | 2-38/8/2/9/4/1, NTR Nagar Colony, Chandanagar, Telangana - 502032</p>
        </div>
      </div>
    `,
  };

  // Email to admin (notification)
  const adminEmail = {
    from: `Partnership Applications <${process.env.SMTP_USER}>`,
    to: ADMIN_EMAIL,
    subject: `🤝 New Partnership Application: ${data.organizationName}`,
    html: `
      ${emailStyles}
      <div class="container">
        <div class="header">
          <h1>🤝 New Partnership Application</h1>
        </div>
        <div class="content">
          <p><strong>A new partnership application has been submitted.</strong></p>
          
          <div class="info-box">
            <h3>Application Details:</h3>
            <div class="detail-row">
              <span class="detail-label">Organization:</span> ${data.organizationName}
            </div>
            <div class="detail-row">
              <span class="detail-label">Contact Person:</span> ${data.contactName}
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span> <a href="mailto:${data.contactEmail}">${data.contactEmail}</a>
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span> <a href="tel:${data.contactPhone}">${data.contactPhone}</a>
            </div>
            <div class="detail-row">
              <span class="detail-label">Type:</span> ${data.partnershipType}
            </div>
            <div class="detail-row">
              <span class="detail-label">Proposal:</span><br>
              <div style="margin-top: 10px; padding: 15px; background: #f9fafb; border-radius: 6px;">
                ${data.proposalDetails.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div class="detail-row">
              <span class="detail-label">Submitted:</span> ${data.submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </div>
          </div>

          <p><strong>Action Required:</strong> Review and respond within 5-7 business days.</p>
          
          <div style="margin-top: 20px;">
            <a href="mailto:${data.contactEmail}" class="button">Contact ${data.contactName}</a>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated notification from the Mahima Ministries website.</p>
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
 * Using WhatsApp Business API or third-party service like Twilio
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

    // Log the WhatsApp message (in production, integrate with WhatsApp API)
    logger.info('WhatsApp notification prepared:', { message, to: ADMIN_WHATSAPP });
    
    // TODO: Integrate with WhatsApp Business API or Twilio
    // Example using Twilio (you'll need to install and configure):
    /*
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    
    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${ADMIN_WHATSAPP}`,
      body: message
    });
    */
    
    // For now, just log it
    console.log('\n' + '='.repeat(60));
    console.log('📱 WHATSAPP NOTIFICATION TO:', ADMIN_WHATSAPP);
    console.log('='.repeat(60));
    console.log(message);
    console.log('='.repeat(60) + '\n');
    
    return { success: true, message: 'WhatsApp notification logged (integration pending)' };
  } catch (error) {
    logger.error('Error sending WhatsApp notification:', error);
    // Don't throw error to prevent email sending failure
    return { success: false, error };
  }
};

export default {
  sendContactFormEmails,
  sendPartnershipApplicationEmails,
  sendWhatsAppNotification,
};
