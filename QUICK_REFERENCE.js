#!/usr/bin/env node

/**
 * QUICK REFERENCE - Mahima Ministries NGO Platform
 * All commands you need to run your platform
 */

console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║           📖 MAHIMA MINISTRIES - QUICK COMMAND REFERENCE                   ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

🚀 STARTING THE PLATFORM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

From workspace root:
  npm run dev

This starts both:
  - Backend: http://localhost:3000
  - Frontend: http://localhost:5173

From backend folder:
  cd backend
  npm run dev

From frontend folder:
  cd frontend
  npm run dev


🧪 TESTING SERVICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Test all services (Gmail + WhatsApp):
  cd backend
  node test-notifications.js

Expected output:
  ✅ Gmail SMTP: ✅ WORKING
  ✅ Twilio WhatsApp: ✅ WORKING


🗄️ DATABASE ACCESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open Prisma Studio (database GUI):
  cd backend
  npx prisma studio --port 5556

Then open browser:
  http://localhost:5556

See all tables:
  - Users
  - Donations
  - Campaigns
  - ContactInquiry (form submissions)
  - PartnershipApplication
  - etc.


📧 EMAIL TESTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Test Gmail SMTP directly:
  cd backend
  node test-notifications.js

This sends a test email to: chekarsamopt@gmail.com


💬 WHATSAPP TESTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Test Twilio WhatsApp directly:
  cd backend
  node test-notifications.js

This sends a test message to: +917416053348


⚙️ CONFIGURATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Edit configuration:
  backend/.env

Key settings:
  - SMTP_USER: chekarsamopt@gmail.com
  - SMTP_PASSWORD: ubxrvudslowomvae
  - ADMIN_EMAIL: chekarsamopt@gmail.com
  - ADMIN_WHATSAPP: +917416053348
  - DATABASE_URL: postgresql://postgres:Mahima@123@localhost:5432/nonprofit_db


📱 CONTACT FORM TEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Start platform: npm run dev
2. Go to: http://localhost:5173/contact
3. Fill form with:
   - Name: Test User
   - Email: your-email@example.com
   - Phone: +91 XXXXXXXXXX
   - Subject: Test
   - Message: Testing
4. Click Submit
5. You'll see success dialog

What happens behind scenes:
  ✅ Form saved to database (ContactInquiry table)
  ✅ Confirmation email sent to your-email@example.com
  ✅ Admin email sent to chekarsamopt@gmail.com
  ✅ WhatsApp sent to +917416053348 (if sandbox joined)


🧹 CLEANUP / RESTART
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Kill all Node processes:
  taskkill /F /IM node.exe

Restart backend:
  cd backend
  npm run dev

Restart everything from workspace:
  npm run dev


📁 PROJECT STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Main folders:
  /backend        - Node.js Express server
  /frontend       - React Vite application
  /prisma         - Database schema & migrations
  /.github        - Configuration & instructions

Key backend files:
  src/services/notification.service.ts   - Email + WhatsApp logic
  src/controllers/contact.controller.ts  - Contact form handler
  .env                                   - Configuration

Key frontend pages:
  src/pages/public/ContactPage.tsx   - Contact form


🌐 URLS YOU'LL NEED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Platform:
  Frontend: http://localhost:5173
  Backend: http://localhost:3000

Development:
  Contact Form: http://localhost:5173/contact
  Database: http://localhost:5556

External:
  Twilio Console: https://console.twilio.com
  Gmail: https://mail.google.com


📊 WHAT'S WORKING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Contact Form Submission
✅ Email Notifications (Gmail SMTP)
✅ WhatsApp Notifications (Twilio)
✅ Database Storage (PostgreSQL)
✅ Prisma Studio Access
✅ 31+ NGO Platform Pages
✅ Responsive Design
✅ Error Handling


🎯 QUICK START (5 MINUTES)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Start the platform:
   npm run dev

2. Test services:
   (in another terminal)
   cd backend && node test-notifications.js

3. Open browser:
   http://localhost:5173/contact

4. Fill and submit form

5. See success! ✨


💡 TIPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Keep backend running while testing frontend
- Check backend logs for email/WhatsApp status
- Use Prisma Studio to verify form data
- Test with your own email first
- Join Twilio sandbox to receive WhatsApp
- Check Gmail spam folder for test emails


📝 IMPORTANT NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Everything is configured correctly
✅ No code changes needed
✅ Network was the issue, now fixed
✅ All services tested and working
✅ Ready for production (with minor setup)


═══════════════════════════════════════════════════════════════════════════

You're all set! Start building your NGO platform! 🚀

`);
