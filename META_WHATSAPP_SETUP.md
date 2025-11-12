# Meta WhatsApp Business API Integration Guide

## 🎯 Overview

This guide will help you set up **Meta's Official WhatsApp Business Cloud API** for automated receipt delivery via WhatsApp. This is Meta's (Facebook's) official solution - **NO third-party service required**!

---

## ✨ Why Meta WhatsApp Business API?

### ✅ Advantages

1. **Official Meta Product** - Direct from Facebook/Meta
2. **No Third-Party Fees** - No Twilio, no other middleman
3. **Free Tier Available** - 1,000 free conversations per month
4. **Reliable & Scalable** - Enterprise-grade infrastructure
5. **Rich Media Support** - Send PDFs, images, videos
6. **Template Messages** - Pre-approved message templates
7. **Two-Way Communication** - Receive responses from users
8. **Business Verification** - Green checkmark badge

### 🆚 Comparison

| Feature | Meta WhatsApp API | Twilio | Other Services |
|---------|-------------------|--------|----------------|
| Cost | Free tier + pay-per-conversation | Expensive | Varies |
| Official | ✅ Yes | ❌ Third-party | ❌ Third-party |
| Setup Complexity | Medium | Easy | Easy |
| Reliability | Excellent | Good | Varies |
| Feature Rich | ✅ Full features | Limited | Limited |
| Business Verification | ✅ Yes | ❌ No | ❌ No |

---

## 📋 Prerequisites

Before starting, you need:

1. **Facebook Business Account** (Free)
2. **Meta Business Manager Account** (Free)
3. **Verified Phone Number** for WhatsApp Business
4. **Business Verification** (Optional but recommended)

---

## 🚀 Setup Instructions

### Step 1: Create Meta App

1. **Go to Meta for Developers**
   - Visit: https://developers.facebook.com/
   - Log in with your Facebook account
   - Click "My Apps" in top menu

2. **Create New App**
   - Click "Create App" button
   - Select "Business" as app type
   - Click "Next"
   
3. **App Details**
   - App Name: "Mahima Ministries Donations"
   - App Contact Email: your-email@mahimaministries.org
   - Business Account: Select or create one
   - Click "Create App"

### Step 2: Add WhatsApp Product

1. **Add WhatsApp to Your App**
   - In your app dashboard, find "WhatsApp" product
   - Click "Set Up" button
   - Select "WhatsApp Business" (not regular WhatsApp)

2. **Select Business Portfolio**
   - Choose existing portfolio or create new one
   - Click "Continue"

3. **WhatsApp Business Account**
   - Create new WhatsApp Business Account
   - Or select existing one
   - Click "Continue"

### Step 3: Get Your Credentials

#### A. Get Phone Number ID

1. **Go to WhatsApp > API Setup** in left sidebar

2. **Find "Send and receive messages" section**
   - You'll see "From: [Phone Number]"
   - Below it shows "Phone number ID: 123456789012345"
   - **Copy this Phone Number ID** ⭐
   - This is your `META_WHATSAPP_PHONE_NUMBER_ID`

3. **Test Phone Number** (Provided by Meta for testing)
   - Meta provides a test number for free
   - You can send to 5 numbers during testing
   - Add test numbers in "To:" field

#### B. Generate Access Token

**Option 1: Temporary Token (For Testing - 24 hours)**

1. In "API Setup" page, find "Temporary access token"
2. Click "Copy" button
3. Valid for 24 hours only
4. Good for initial testing

**Option 2: Permanent Token (For Production - Recommended)**

1. **Create System User:**
   - Go to Business Settings: https://business.facebook.com/settings/
   - Click "Users" > "System Users"
   - Click "Add" button
   - Name: "WhatsApp API System User"
   - Role: "Admin"
   - Click "Create System User"

2. **Assign Assets:**
   - Click on newly created system user
   - Click "Add Assets"
   - Select "Apps"
   - Find your app and select it
   - Toggle "Manage App" permission
   - Click "Save Changes"

3. **Generate Token:**
   - Click "Generate New Token" button
   - Select your app
   - Select permissions:
     - ✅ `whatsapp_business_management`
     - ✅ `whatsapp_business_messaging`
   - Click "Generate Token"
   - **Copy and save this token securely** ⭐
   - This is your `META_WHATSAPP_ACCESS_TOKEN`
   - **This token never expires!**

### Step 4: Configure Backend

1. **Update `.env` file:**

```env
# Meta WhatsApp Business Cloud API
META_WHATSAPP_ACCESS_TOKEN=EAAH4ZC9ZBqhZAZBsBO7vu1QQ... (your actual token)
META_WHATSAPP_PHONE_NUMBER_ID=123456789012345 (your actual phone number ID)
META_WHATSAPP_API_VERSION=v18.0
```

2. **Save the file**

3. **Restart backend server:**
```bash
cd backend
npm run dev
```

### Step 5: Add Test Recipients

**For Testing Phase:**

1. Go to WhatsApp > API Setup
2. Scroll to "To:" section
3. Click "Manage phone number list"
4. Add phone numbers you want to test with (max 5)
5. Verify phone numbers via code sent to WhatsApp

**Format:** Add with country code (e.g., +919876543210)

### Step 6: Test the Integration

1. **Make a test donation:**
   - Visit: http://localhost:5173/pay
   - Enter amount: ₹100
   - Use **your WhatsApp number** as phone number
   - Complete payment with test card

2. **Check Results:**
   - ✅ Email received (existing functionality)
   - ✅ WhatsApp message received (new!)
   - ✅ WhatsApp PDF receipt received (new!)

3. **Check Backend Logs:**
   ```
   ✅ Receipt emailed successfully
   ✅ WhatsApp receipt sent successfully
   ```

---

## 📱 What Users Receive on WhatsApp

### Message 1: Thank You Text

```
🙏 *Thank You, John Doe!*

Thank you for your generous donation of *₹1,000* to Mahima Ministries.

📝 *Receipt Details:*
• Receipt No: MM_1699875432_ABC123
• Transaction ID: TXN123456789

Your contribution will help us continue our mission of serving those in need.

📧 A detailed receipt with 80G tax benefit information has been sent to your email.

May God bless you abundantly! ✨

_Mahima Ministries_
```

### Message 2: PDF Receipt Document

- **Filename:** Receipt_MM_1699875432_ABC123.pdf
- **Caption:** "Your donation receipt for ₹1,000"
- **Content:** Same professional PDF sent via email

---

## 🔧 Technical Implementation

### Files Created/Modified

**New File:**
- `backend/src/utils/whatsapp.util.ts` - Meta WhatsApp integration

**Modified Files:**
- `backend/src/utils/receipt.util.ts` - Added WhatsApp sending
- `backend/.env` - Added Meta WhatsApp credentials

### Key Functions

```typescript
// Send text message
sendWhatsAppTextMessage(phone, message)

// Send PDF document
sendWhatsAppDocument(phone, pdfBuffer, filename, caption)

// Send complete receipt (text + PDF)
sendWhatsAppReceipt(data)

// Check API health
checkWhatsAppHealth()

// Validate configuration
validateWhatsAppConfig()
```

### Integration Point

Receipt generation now sends to **BOTH** channels automatically:

```typescript
// In paytm.controller.ts callback
await generateAndSendReceipt({
  donationId: updatedDonation.id,
  orderId: updatedDonation.orderId!,
  donorName: updatedDonation.donorName,
  email: updatedDonation.email,
  phone: updatedDonation.phone,  // ⭐ Used for WhatsApp
  amount: updatedDonation.amount,
  txnId: updatedDonation.txnId!,
  paidAt: updatedDonation.paidAt!,
  // ...
});

// Automatically sends to:
// ✅ Email
// ✅ WhatsApp (if configured)
```

---

## 🎓 Testing Checklist

### Initial Setup Testing

```
[ ] Meta app created
[ ] WhatsApp product added
[ ] Phone Number ID copied
[ ] Access token generated
[ ] Credentials added to .env
[ ] Backend restarted
[ ] Test phone number added to allowed list
[ ] Health check passed
```

### Functionality Testing

```
[ ] Make test donation
[ ] Email received
[ ] WhatsApp message received (text)
[ ] WhatsApp PDF received
[ ] Backend logs show success
[ ] Database updated correctly
[ ] No errors in console
```

### Test API Health

```bash
# Create test endpoint (optional)
curl -X GET http://localhost:3000/api/whatsapp/health
```

Or check logs when making donation:
```
✅ WhatsApp receipt sent successfully for MM_xxxxx
```

---

## 🚀 Going to Production

### Step 1: Business Verification

**Why?**
- Get green checkmark badge
- Increase message limits
- Build trust with donors
- Remove "test mode" restrictions

**How:**
1. Go to Business Settings
2. Click "Business Info" > "Verify Your Business"
3. Submit business documents:
   - Registration certificate
   - GST certificate (if applicable)
   - 80G certificate
   - Address proof
4. Wait 1-3 business days for approval

### Step 2: Get Production Phone Number

**Options:**

**Option A: Use Existing Business Number**
1. Go to WhatsApp Manager
2. Click "Phone Numbers" > "Add Phone Number"
3. Enter your existing business WhatsApp number
4. Verify via SMS code
5. Migrate conversations (if any)

**Option B: Get New Number**
1. Purchase new number from Meta
2. Or use virtual number provider
3. Add to WhatsApp Business Account
4. Verify ownership

### Step 3: Create Message Templates

**Required for promotional messages:**

1. Go to WhatsApp > Message Templates
2. Click "Create Template"
3. Design template:
   ```
   Name: donation_receipt
   Category: Utility (Transactional)
   Language: English
   
   Content:
   Thank you {{1}} for your donation of ₹{{2}}!
   Receipt: {{3}}
   Transaction: {{4}}
   ```
4. Submit for approval (usually approved within hours)

**Not required for session messages** (replies within 24 hours)

### Step 4: Monitor Usage

1. **Conversation Pricing:**
   - Free tier: 1,000 conversations/month
   - After free tier: ~₹0.60 per conversation
   - "Conversation" = 24-hour window

2. **Monitor in Meta Business Suite:**
   - Go to WhatsApp Manager
   - View analytics
   - Track message delivery
   - Monitor costs

---

## 💰 Pricing (as of 2025)

### Free Tier
- **1,000 conversations per month** - FREE
- Perfect for small to medium organizations
- Resets every month

### Beyond Free Tier
- **India:** ~₹0.60 per conversation
- **Conversation:** 24-hour window from first message
- **Multiple messages in 24h:** Count as 1 conversation

### Example Calculations

**Scenario 1: Small NGO**
- 500 donations/month
- Cost: FREE (within free tier)

**Scenario 2: Medium NGO**
- 2,000 donations/month
- Cost: 1,000 free + 1,000 × ₹0.60 = ₹600/month

**Scenario 3: Large NGO**
- 5,000 donations/month
- Cost: 1,000 free + 4,000 × ₹0.60 = ₹2,400/month

**Compare to Twilio WhatsApp:**
- Twilio: ₹4-5 per message
- 5,000 messages = ₹20,000-25,000/month
- **Meta is 10x cheaper!** 💰

---

## 🔍 Troubleshooting

### Issue: Access Token Invalid

**Error:** `(#100) Invalid access token`

**Solutions:**
1. Token expired (if using temporary token)
2. Generate new permanent token
3. Check token copied correctly (no extra spaces)
4. Verify token has correct permissions

### Issue: Phone Number ID Not Found

**Error:** `(#131030) Recipient phone number not in allowed list`

**Solutions:**
1. Add recipient number to test numbers list
2. Verify number format: +919876543210
3. For production: Complete business verification
4. Check phone number ID is correct

### Issue: Message Not Delivered

**Error:** Message sent but not received

**Solutions:**
1. Check recipient has WhatsApp installed
2. Verify phone number format
3. Check if number is blocked
4. Review message template (if using template)
5. Check WhatsApp Manager for delivery status

### Issue: Media Upload Failed

**Error:** Failed to upload PDF

**Solutions:**
1. Check file size < 16MB
2. Verify PDF is valid
3. Check content type is correct
4. Ensure form-data is installed: `npm list form-data`

### Issue: Rate Limiting

**Error:** `(#4) Too many messages sent`

**Solutions:**
1. Implement retry logic with exponential backoff
2. Batch messages (don't send all at once)
3. Upgrade to business verification for higher limits
4. Monitor message volume

---

## 📊 Best Practices

### 1. Message Quality

✅ **Do:**
- Use clear, concise messages
- Include relevant information
- Format with Markdown (* for bold, _ for italic)
- Use emojis sparingly
- Provide value to recipient

❌ **Don't:**
- Send spam or promotional content without consent
- Use all caps (SHOUTING)
- Send too frequently
- Include misleading information

### 2. Timing

- Send receipts immediately after payment
- Avoid sending between 10 PM - 8 AM (unless urgent)
- Respect user preferences
- Provide opt-out option

### 3. Compliance

- Get explicit consent for marketing messages
- Transactional messages (receipts) don't need consent
- Follow WhatsApp Commerce Policy
- Maintain privacy (GDPR, data protection)
- Store user preferences

### 4. Monitoring

- Track delivery rates
- Monitor errors in logs
- Review user feedback
- Analyze opt-out rates
- Optimize message content

---

## 🎯 What's Automated Now

After setting up Meta WhatsApp:

### For Every Donation:

1. **Payment Verified** ✅
2. **Database Updated** ✅
3. **PDF Receipt Generated** ✅
4. **Email Sent** ✅ (with PDF)
5. **WhatsApp Thank You Message** ✅ (NEW!)
6. **WhatsApp PDF Receipt** ✅ (NEW!)

### Zero Manual Work Required!

Donors receive receipts on **THREE channels:**
1. 📧 **Email** - Professional HTML + PDF
2. 📱 **WhatsApp** - Instant message + PDF
3. 💻 **Success Page** - Web confirmation

---

## 🚀 Advanced Features (Future Enhancements)

### 1. Two-Way Communication

```typescript
// Receive messages from users
// Setup webhook to handle incoming messages
// Reply to user questions automatically
```

### 2. WhatsApp Business Profile

```typescript
// Set business profile
// Add logo, description, address
// Display on WhatsApp Business profile
```

### 3. Rich Media Messages

```typescript
// Send images with receipts
// Send video thank you messages
// Send interactive buttons
```

### 4. Campaign Updates

```typescript
// Send campaign progress updates
// Share impact stories
// Request feedback
```

### 5. Analytics Dashboard

```typescript
// Track message delivery
// Monitor engagement
// Analyze user preferences
// A/B test messages
```

---

## 📞 Support Resources

### Official Documentation
- **Meta for Developers:** https://developers.facebook.com/docs/whatsapp
- **WhatsApp Business API:** https://developers.facebook.com/docs/whatsapp/cloud-api
- **Getting Started:** https://developers.facebook.com/docs/whatsapp/cloud-api/get-started

### Community
- **Meta Developer Community:** https://developers.facebook.com/community/
- **Stack Overflow:** Tag `whatsapp-cloud-api`
- **GitHub Issues:** Check our repository

### Contact
- **Meta Support:** https://developers.facebook.com/support/
- **Business Support:** https://business.facebook.com/business/help

---

## ✅ Quick Start Checklist

```
[ ] Create Meta Developer account
[ ] Create new app
[ ] Add WhatsApp product
[ ] Copy Phone Number ID
[ ] Generate access token (permanent)
[ ] Add credentials to .env
[ ] Install form-data: npm install form-data
[ ] Restart backend server
[ ] Add test phone number
[ ] Make test donation
[ ] Verify WhatsApp message received
[ ] Verify PDF received on WhatsApp
[ ] Check backend logs
[ ] 🎉 Celebrate automated WhatsApp receipts!
```

---

## 🎊 Summary

You now have:

✅ **Official Meta WhatsApp Business API** integrated
✅ **Automated receipt delivery** via WhatsApp
✅ **PDF documents** sent via WhatsApp
✅ **Thank you messages** with transaction details
✅ **No third-party service fees**
✅ **Free tier** (1,000 conversations/month)
✅ **Professional** WhatsApp Business presence
✅ **Dual channel delivery** (Email + WhatsApp)

**Total Automation:** Email + WhatsApp + Web confirmation - all automatic!

---

*Last Updated: November 11, 2025*
*Version: 1.0.0*
*Using Meta WhatsApp Business Cloud API v18.0*
