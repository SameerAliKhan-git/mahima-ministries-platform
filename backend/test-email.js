import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function testEmail() {
  console.log('🧪 Testing Email Configuration...\n');
  
  // Display configuration (without password)
  console.log('Configuration:');
  console.log('- SMTP Host:', process.env.SMTP_HOST);
  console.log('- SMTP Port:', process.env.SMTP_PORT);
  console.log('- SMTP User:', process.env.SMTP_USER);
  console.log('- Email From:', process.env.EMAIL_FROM);
  console.log('- Admin Email:', process.env.ADMIN_EMAIL);
  console.log('- Password:', process.env.SMTP_PASSWORD ? '✓ Set' : '✗ Missing');
  console.log();

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    // Verify connection
    console.log('📡 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');

    // Send test email
    console.log('📧 Sending test email...');
    const info = await transporter.sendMail({
      from: `"Mahima Ministries" <${process.env.EMAIL_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '✅ Email Test - Mahima Ministries Platform',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">✅ Email Configuration Successful!</h2>
          <p>This is a test email from your Mahima Ministries Platform.</p>
          <p><strong>Email system is working correctly!</strong></p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 14px;">
            Sent at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>
      `,
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('\n✨ Email configuration is working! Check your inbox.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('Invalid login')) {
      console.log('\n💡 Fix: Generate an App Password from Google Account settings');
      console.log('   → https://myaccount.google.com/apppasswords');
    } else if (error.message.includes('EAUTH')) {
      console.log('\n💡 Fix: Check your email and app password in .env file');
    } else if (error.message.includes('ECONNECTION')) {
      console.log('\n💡 Fix: Check your internet connection and firewall settings');
    }
  }
}

testEmail();
