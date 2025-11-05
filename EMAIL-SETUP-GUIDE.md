# 📧 Email Configuration Guide

## Current Status: ⚠️ Email Not Configured

Your contact form is submitting successfully, but emails are not being sent because Gmail SMTP is not properly configured.

---

## 🔧 Quick Fix - Follow These Steps:

### **Step 1: Get Gmail App Password**

1. **Go to Google Account Security**
   - Visit: https://myaccount.google.com/security
   - Login with: `mahimaministriesindia@gmail.com`

2. **Enable 2-Step Verification** (if not already enabled)
   - Click on "2-Step Verification"
   - Follow the prompts to enable it

3. **Create App Password**
   - Visit: https://myaccount.google.com/apppasswords
   - Or: Google Account → Security → 2-Step Verification → App passwords
   - Select app: **Mail**
   - Select device: **Other (Custom name)**
   - Type: `Mahima Ministries Platform`
   - Click **Generate**
   - **COPY THE 16-CHARACTER PASSWORD** (looks like: `abcd efgh ijkl mnop`)

### **Step 2: Update Backend Configuration**

1. Open file: `backend/.env`
2. Find this line:
   ```
   SMTP_PASSWORD=your-gmail-app-password-here
   ```
3. Replace `your-gmail-app-password-here` with the app password you copied
   - Remove all spaces from the password
   - Example: `SMTP_PASSWORD=abcdefghijklmnop`

4. Save the file

### **Step 3: Test Email Configuration**

Run this command to test:
```bash
cd backend
node test-email.js
```

If successful, you'll see:
```
✅ SMTP connection successful!
✅ Test email sent successfully!
```

### **Step 4: Restart Backend Server**

1. Close the command window running the backend
2. Double-click `START-ALL.bat` again to restart

---

## 📋 Your Email Settings (Reference)

```properties
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=mahimaministriesindia@gmail.com
SMTP_PASSWORD=[Your App Password Here]
EMAIL_FROM=mahimaministriesindia@gmail.com
ADMIN_EMAIL=mahimaministriesindia@gmail.com
```

---

## 🧪 Test the Contact Form

After configuration, test by:
1. Go to Contact page
2. Fill the form
3. Click Submit
4. Check these 2 emails:
   - ✅ Enquirer receives confirmation email
   - ✅ Admin (mahimaministriesindia@gmail.com) receives notification

---

## ⚠️ Troubleshooting

### **"Invalid login" error:**
- Make sure you're using App Password, NOT your regular Gmail password
- Remove all spaces from the app password

### **"EAUTH" error:**
- Double-check the email address in SMTP_USER
- Verify the app password is correct

### **"Connection refused" error:**
- Check your internet connection
- Some networks block port 587 - try port 465 with SMTP_SECURE=true

### **Still not working?**
1. Check spam folder
2. Try with a different email to send test to
3. Verify 2-Step Verification is enabled on Google Account

---

## 📧 Email Template Preview

**Enquirer receives:**
```
Subject: Thank you for contacting Mahima Ministries

Dear [Name],

Thank you for reaching out to us! We have received your message and 
appreciate you taking the time to contact Mahima Ministries.

Your Message Details:
- Subject: [Subject]
- Message: [Message]
- Phone: [Phone]

We will review your inquiry and get back to you within 24-48 hours.

Best regards,
Mahima Ministries Team
```

**Admin receives:**
```
Subject: New Contact Form Submission

You have received a new contact form submission:

Name: [Name]
Email: [Email]
Phone: [Phone]
Subject: [Subject]

Message:
[Message]

Submitted at: [Time] IST
```

---

## 🎯 Next Steps

1. ✅ Get Gmail App Password
2. ✅ Update `.env` file
3. ✅ Run test: `node test-email.js`
4. ✅ Restart backend
5. ✅ Test contact form
6. ✅ Check emails received!

---

**Need Help?** 
- Gmail App Password Guide: https://support.google.com/accounts/answer/185833
- Contact: mahimaministriesindia@gmail.com
