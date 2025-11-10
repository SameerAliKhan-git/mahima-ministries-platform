# Gmail App Password Setup Guide for Mahima Ministries Platform

## Overview
The Mahima Ministries platform uses Gmail SMTP to send email notifications for:
- Contact form submissions
- Partnership applications
- Donation receipts
- User account notifications
- Admin alerts

To enable email sending, you need to generate a Gmail App Password (not your regular Gmail password).

---

## Prerequisites
- Gmail account: `mahimaministriesindia@gmail.com`
- 2-Factor Authentication must be enabled on the account

---

## Step-by-Step Setup

### 1. Enable 2-Factor Authentication (If Not Already Enabled)

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **"Security"** in the left sidebar
3. Under **"How you sign in to Google"**, click on **"2-Step Verification"**
4. Follow the prompts to enable 2FA using:
   - SMS verification, OR
   - Google Authenticator app, OR
   - Security key

### 2. Generate App Password

1. Once 2FA is enabled, go back to: https://myaccount.google.com/security
2. Under **"How you sign in to Google"**, click on **"2-Step Verification"**
3. Scroll down to the bottom and click on **"App passwords"**
   - If you don't see this option, make sure 2FA is properly enabled
4. You may be asked to sign in again
5. In the "Select app" dropdown, choose **"Mail"**
6. In the "Select device" dropdown, choose **"Windows Computer"** or **"Other (Custom name)"**
   - If choosing Other, enter: `Mahima Ministries Platform`
7. Click **"Generate"**
8. Google will display a 16-character password like: `abcd efgh ijkl mnop`
   - Copy this password immediately (you won't be able to see it again)

### 3. Update Backend Configuration

1. Open the file: `backend/.env`
2. Find the line:
   ```
   SMTP_PASSWORD=your-gmail-app-password-here
   ```
3. Replace with your generated app password (remove spaces):
   ```
   SMTP_PASSWORD=abcdefghijklmnop
   ```
   **Important:** Remove all spaces from the 16-character password

4. Save the file

### 4. Restart Backend Server

1. Stop the current backend server (Ctrl+C in the terminal)
2. Start it again:
   ```powershell
   cd "d:\MM CusrtoṁDemo\New folder\backend"
   npm run dev
   ```

### 5. Test Email Sending

1. Go to: http://localhost:5173/contact
2. Fill out the contact form with test data:
   - Name: Test User
   - Email: your-email@example.com
   - Subject: Test Contact Form
   - Message: Testing email notifications
3. Click **Submit**
4. Check:
   - Your email inbox (should receive confirmation email)
   - Admin email inbox (mahimaministriesindia@gmail.com should receive notification)
   - Backend terminal (should show success logs, not errors)

---

## Current Configuration

Your platform is configured to send emails from:
- **From Address:** mahimaministriesindia@gmail.com
- **SMTP Server:** smtp.gmail.com
- **Port:** 587 (TLS)
- **Admin Email:** mahimaministriesindia@gmail.com

---

## Email Templates Configured

The platform will send beautifully formatted HTML emails for:

### 1. Contact Form User Acknowledgment
- Professional styling with Mahima Ministries branding
- Confirms receipt of inquiry
- Sets expectations for response time (24-48 hours)

### 2. Contact Form Admin Notification
- Includes full inquiry details (name, email, phone, subject, message)
- Formatted for easy reading
- Includes timestamp

### 3. Partnership Application User Acknowledgment
- Thanks user for partnership interest
- Provides next steps information

### 4. Partnership Application Admin Notification
- Includes partnership type, organization details
- Skills and availability information
- Background check consent status

---

## Troubleshooting

### "Invalid login: 535-5.7.8 Username and Password not accepted"
- **Solution:** You're using your regular Gmail password instead of an App Password
- Generate a new App Password following steps above

### "SMTP not configured - emails will be logged instead of sent"
- **Solution:** The SMTP_PASSWORD in .env is still set to the placeholder
- Update with your real App Password and restart backend

### "Less secure app access" error
- **Solution:** This is an old security model. Use App Passwords instead (as described above)
- Google no longer allows "less secure apps" after May 30, 2022

### Can't find "App passwords" option
- **Solution:** Make sure 2-Factor Authentication is fully enabled
- Wait 5-10 minutes after enabling 2FA, then check again
- If still not visible, you may need to contact Google Support

### Emails going to spam
- **Solution:** Add proper SPF/DKIM records to your domain (if using custom domain)
- For now, ask recipients to mark emails as "Not Spam"
- Consider using a dedicated email service (SendGrid, Mailgun) for production

---

## Security Best Practices

### ✅ DO:
- Keep your App Password secret (it's as powerful as your account password)
- Store it only in the `.env` file (which is in `.gitignore`)
- Revoke and regenerate if accidentally exposed
- Use a different App Password for each application

### ❌ DON'T:
- Share your App Password with anyone
- Commit the `.env` file to Git (it's already ignored)
- Use your regular Gmail password in the application
- Enable "Less secure app access" (deprecated and insecure)

---

## Alternative Email Services (For Future)

For higher volume or better deliverability, consider:

### SendGrid (Free tier: 100 emails/day)
- Professional transactional email service
- Better deliverability rates
- Email analytics and tracking
- Easy integration with Nodemailer

### Mailgun (Free tier: 5,000 emails/month)
- Simple API
- Good documentation
- Email validation features

### Amazon SES (Very cheap, $0.10 per 1,000 emails)
- Part of AWS ecosystem
- Extremely reliable
- Requires AWS account setup

---

## Migration Path

Once you have App Password working:
1. **Development:** Continue using Gmail (current setup)
2. **Staging:** Consider SendGrid free tier
3. **Production:** Migrate to SendGrid/Mailgun/SES for reliability

---

## Support

If you encounter issues:
1. Check the backend terminal for error messages
2. Review the `backend/logs/error.log` file
3. Verify your .env file has no typos
4. Ensure 2FA is properly enabled on Gmail account
5. Try generating a fresh App Password

---

## Current Status

✅ Email service code is complete and tested
✅ Email templates are professionally designed
✅ Fallback logging implemented for development
⏳ **WAITING:** Gmail App Password to enable real email sending

Once you add the App Password, all email features will work immediately!
