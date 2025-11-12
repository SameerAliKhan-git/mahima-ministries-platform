# Paytm Payment Gateway Integration - Mahima Ministries

## ✅ Backend Integration Complete

### What's Been Set Up:

1. **Paytm SDK Installed** ✅
   - Package: `paytmchecksum`
   - For generating and verifying payment checksums

2. **Utility Functions Created** ✅
   - File: `backend/src/utils/paytm.ts`
   - Functions:
     - `generatePaytmChecksum()` - Create payment request
     - `verifyPaytmChecksum()` - Verify callback authenticity
     - `getPaytmTransactionStatus()` - Check payment status
     - `initiatePaytmPayment()` - Start payment flow
     - `validatePaytmConfig()` - Check configuration

3. **Payment Controller Created** ✅
   - File: `backend/src/controllers/paytm.controller.ts`
   - Endpoints:
     - `initiatePayment` - Start a new donation payment
     - `handleCallback` - Process Paytm payment callback
     - `checkPaymentStatus` - Query transaction status
     - `getAllDonations` - Admin endpoint for all donations

4. **API Routes Configured** ✅
   - File: `backend/src/routes/paytm.routes.ts`
   - Routes:
     - `POST /api/paytm/initiate` - Initiate payment
     - `POST /api/paytm/callback` - Paytm callback handler
     - `GET /api/paytm/status` - Check payment status
     - `GET /api/paytm/donations` - Get all donations (admin only)

5. **Database Schema Updated** ✅
   - Migration: `add_paytm_fields`
   - New Fields in Donation model:
     - `donorName` - Donor's full name
     - `email` - Donor's email
     - `phone` - Donor's phone number
     - `orderId` - Unique order identifier
     - `txnId` - Paytm transaction ID
     - `paymentMode` - Payment method used (CC/DC/UPI/etc)
     - `bankTxnId` - Bank transaction reference
     - `gatewayResponse` - Full Paytm response (JSON)
     - `paidAt` - Payment completion timestamp
     - `paymentStatus` - PENDING/COMPLETED/FAILED/REFUNDED

6. **Environment Variables Configured** ✅
   - Backend `.env`:
     ```
     PAYTM_MERCHANT_ID=your_paytm_merchant_id_here
     PAYTM_MERCHANT_KEY=your_paytm_merchant_key_here
     PAYTM_WEBSITE=WEBSTAGING
     PAYTM_INDUSTRY_TYPE=Retail
     PAYTM_CHANNEL_ID=WEB
     PAYTM_MODE=staging
     ```

## 🔄 Payment Flow

### 1. **User Initiates Donation**
```
Frontend → POST /api/paytm/initiate
{
  "amount": 1000,
  "donorName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "campaignId": "optional-campaign-id",
  "isAnonymous": false,
  "message": "God bless"
}
```

### 2. **Backend Response**
```json
{
  "success": true,
  "data": {
    "donationId": "donation_id",
    "orderId": "MM_1234567890_abc123",
    "transactionUrl": "https://securegw-stage.paytm.in/theia/processTransaction",
    "params": {
      "MID": "merchant_id",
      "ORDER_ID": "order_id",
      "TXN_AMOUNT": "1000.00",
      "CHECKSUMHASH": "checksum_hash",
      ...
    }
  }
}
```

### 3. **Frontend Submits to Paytm**
- Creates a form with Paytm parameters
- Submits to Paytm payment gateway
- User completes payment on Paytm page

### 4. **Paytm Redirects to Callback**
```
POST /api/paytm/callback
{
  "ORDERID": "MM_1234567890_abc123",
  "TXNID": "paytm_transaction_id",
  "STATUS": "TXN_SUCCESS",
  "TXNAMOUNT": "1000.00",
  "PAYMENTMODE": "CC",
  ...
}
```

### 5. **Backend Processes Callback**
- Verifies checksum
- Updates donation status
- Redirects to success/failure page

## 🔐 Security Features

1. **Checksum Verification**
   - All requests signed with merchant key
   - Callbacks verified for authenticity
   - Prevents tampering

2. **Order ID Generation**
   - Format: `MM_timestamp_random`
   - Unique per transaction
   - Prevents replay attacks

3. **Database Validation**
   - Zod schema validation
   - Type-safe operations
   - SQL injection prevention

4. **Environment Separation**
   - Staging mode for testing
   - Production mode for live payments
   - Separate URLs for each

## 📋 Next Steps

### To Get Your Paytm Credentials:

1. **Register for Paytm Business**
   - Go to: https://dashboard.paytm.com/next/apikeys
   - Sign up/Login to Paytm Business
   - Complete KYC verification

2. **Get Test Credentials**
   - Navigate to "API Keys" section
   - Enable "Test Mode"
   - Copy:
     - Merchant ID (MID)
     - Merchant Key
     - Website Name (usually "WEBSTAGING" for testing)

3. **Update `.env` File**
   ```bash
   PAYTM_MERCHANT_ID=your_test_merchant_id
   PAYTM_MERCHANT_KEY=your_test_merchant_key
   PAYTM_WEBSITE=WEBSTAGING
   PAYTM_MODE=staging
   ```

4. **For Production**
   - Complete all verification steps
   - Get production credentials
   - Update `.env` with production values
   - Set `PAYTM_MODE=production`

### Frontend Integration (To Do):

1. **Create Payment Component**
   - Form for donor details
   - Amount selection
   - Campaign selection
   - Submit button

2. **Handle Payment Initiation**
   - Call `/api/paytm/initiate`
   - Receive payment parameters
   - Create dynamic form
   - Submit to Paytm URL

3. **Create Success/Failure Pages**
   - Display transaction details
   - Show receipt
   - Option to download 80G certificate
   - Return to home option

## 🧪 Testing

### Test Mode Features:
- Use Paytm test credentials
- No real money transactions
- Test with dummy card numbers
- Full payment flow simulation

### Paytm Test Cards:
```
Card Number: 5104 0151 5151 5151
CVV: 123
Expiry: Any future date
OTP: 489871
```

## 📊 Payment Modes Supported

- ✅ Credit Cards (Visa, Mastercard, Amex)
- ✅ Debit Cards (All major banks)
- ✅ Net Banking (50+ banks)
- ✅ UPI (PhonePe, Google Pay, Paytm)
- ✅ Paytm Wallet
- ✅ EMI Options
- ✅ International Cards (with Paytm International)

## 🌍 International Payments

Paytm supports international payments through:
- International Credit/Debit Cards
- Separate merchant configuration needed
- Currency conversion handled by Paytm
- Multi-currency support available

## 📝 API Endpoints Summary

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/paytm/initiate` | POST | Optional | Start payment |
| `/api/paytm/callback` | POST | No | Paytm callback |
| `/api/paytm/status` | GET | No | Check status |
| `/api/paytm/donations` | GET | Admin | All donations |

## 🎯 Current Status

✅ Backend fully implemented
✅ Database schema updated
✅ Payment flow configured
✅ Security measures in place
⏳ Frontend components pending
⏳ Success/failure pages pending
⏳ Testing with Paytm sandbox pending

## 🚀 Ready to Start Frontend Integration!

The backend is 100% ready. Now we can build the frontend payment UI!
