# 🎯 DANAMOJO Payment Gateway Setup Guide

## Overview

DANAMOJO is India's leading payment gateway specifically designed for NGOs and charitable organizations. It supports:
- ✅ All major Indian payment methods (UPI, Cards, Net Banking, Wallets)
- ✅ Automated 80G tax receipt generation
- ✅ INR transactions with no foreign exchange fees
- ✅ Compliance with Indian NGO regulations (80G, 12A, FCRA)
- ✅ Lower transaction fees for NGOs
- ✅ Recurring donation support
- ✅ Donor management tools

---

## 📋 Prerequisites

1. **Registered NGO** with valid:
   - 80G Certificate
   - 12A Registration
   - PAN Card
   - FCRA (if accepting foreign donations)

2. **DANAMOJO Account** - Sign up at [danamojo.org](https://danamojo.org)

3. **Bank Account** in the NGO's name

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Create DANAMOJO Account

1. Visit [https://danamojo.org/register](https://danamojo.org/register)
2. Complete NGO verification:
   - Upload 80G certificate
   - Upload 12A registration
   - Upload PAN card
   - Upload bank account proof
3. Wait for approval (usually 24-48 hours)

### Step 2: Get API Credentials

Once approved:
1. Login to DANAMOJO dashboard
2. Go to **Settings** → **API Keys**
3. Copy your credentials:
   ```
   Merchant ID: MER_XXXXXXXXXXXX
   API Key: pk_live_XXXXXXXXXXXX
   Secret Key: sk_live_XXXXXXXXXXXX
   Webhook Secret: whsec_XXXXXXXXXXXX
   ```

### Step 3: Configure Backend Environment

Update `backend/.env`:

```env
# DANAMOJO Configuration
DANAMOJO_MERCHANT_ID=MER_XXXXXXXXXXXX
DANAMOJO_API_KEY=pk_live_XXXXXXXXXXXX
DANAMOJO_SECRET_KEY=sk_live_XXXXXXXXXXXX
DANAMOJO_WEBHOOK_SECRET=whsec_XXXXXXXXXXXX
DANAMOJO_MODE=live
DANAMOJO_CALLBACK_URL=https://yourdomain.com/api/donations/callback
DANAMOJO_WEBHOOK_URL=https://yourdomain.com/api/donations/webhook

# 80G Certificate Details
NGO_80G_NUMBER=DIT(E)/2023-24/XXXXX
NGO_12A_NUMBER=AAATM1234A
NGO_FCRA_NUMBER=083781234
NGO_PAN_NUMBER=AAATM1234A
NGO_REGISTRATION_NUMBER=REG/2020/12345
```

### Step 4: Configure Frontend Environment

Update `frontend/.env`:

```env
# DANAMOJO Configuration
VITE_DANAMOJO_MERCHANT_ID=MER_XXXXXXXXXXXX
VITE_DANAMOJO_MODE=live
```

### Step 5: Configure Webhook in DANAMOJO Dashboard

1. Go to **Settings** → **Webhooks**
2. Add webhook URL: `https://yourdomain.com/api/donations/webhook`
3. Select events:
   - ✅ payment.success
   - ✅ payment.failed
   - ✅ payment.pending
   - ✅ refund.initiated
   - ✅ refund.completed

---

## 🧪 Test Mode Setup

For testing during development:

### Backend `.env`:
```env
DANAMOJO_MERCHANT_ID=MER_TEST_1234567890
DANAMOJO_API_KEY=pk_test_XXXXXXXXXXXX
DANAMOJO_SECRET_KEY=sk_test_XXXXXXXXXXXX
DANAMOJO_WEBHOOK_SECRET=whsec_test_XXXXXXXXXXXX
DANAMOJO_MODE=test
DANAMOJO_CALLBACK_URL=http://localhost:3000/api/donations/callback
DANAMOJO_WEBHOOK_URL=http://localhost:3000/api/donations/webhook
```

### Frontend `.env`:
```env
VITE_DANAMOJO_MERCHANT_ID=MER_TEST_1234567890
VITE_DANAMOJO_MODE=test
```

### Test Cards:

| Card Number | Status | Description |
|-------------|--------|-------------|
| 4111 1111 1111 1111 | Success | Test successful payment |
| 4000 0000 0000 0002 | Declined | Test declined payment |
| 4000 0000 0000 0069 | Expired | Test expired card |

**Test UPI:** success@upi, failure@upi

---

## 📝 Implementation Steps

### 1. Install DANAMOJO SDK (if available)

```bash
cd backend
npm install @danamojo/node-sdk
```

### 2. Create DANAMOJO Service

Create `backend/src/services/danamojo.service.ts`:

```typescript
import axios from 'axios';
import crypto from 'crypto';

interface DanamojoConfig {
  merchantId: string;
  apiKey: string;
  secretKey: string;
  mode: 'test' | 'live';
  callbackUrl: string;
}

export class DanamojoService {
  private config: DanamojoConfig;
  private baseUrl: string;

  constructor() {
    this.config = {
      merchantId: process.env.DANAMOJO_MERCHANT_ID!,
      apiKey: process.env.DANAMOJO_API_KEY!,
      secretKey: process.env.DANAMOJO_SECRET_KEY!,
      mode: process.env.DANAMOJO_MODE as 'test' | 'live',
      callbackUrl: process.env.DANAMOJO_CALLBACK_URL!,
    };
    
    this.baseUrl = this.config.mode === 'test' 
      ? 'https://sandbox.danamojo.org/api/v1'
      : 'https://api.danamojo.org/api/v1';
  }

  // Create payment order
  async createPaymentOrder(data: {
    amount: number;
    currency: string;
    donorName: string;
    donorEmail: string;
    donorPhone: string;
    donorPan?: string;
    orderId: string;
    description: string;
    generate80G: boolean;
  }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/orders`,
        {
          merchant_id: this.config.merchantId,
          amount: data.amount,
          currency: data.currency,
          order_id: data.orderId,
          description: data.description,
          donor: {
            name: data.donorName,
            email: data.donorEmail,
            phone: data.donorPhone,
            pan: data.donorPan,
          },
          callback_url: this.config.callbackUrl,
          generate_80g_receipt: data.generate80G,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('DANAMOJO payment creation failed:', error);
      throw error;
    }
  }

  // Verify payment signature
  verifySignature(payload: string, signature: string): boolean {
    const expectedSignature = crypto
      .createHmac('sha256', this.config.secretKey)
      .update(payload)
      .digest('hex');
    
    return expectedSignature === signature;
  }

  // Get payment status
  async getPaymentStatus(orderId: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/orders/${orderId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to get payment status:', error);
      throw error;
    }
  }

  // Generate 80G receipt
  async generate80GReceipt(orderId: string) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/receipts/80g`,
        {
          order_id: orderId,
          ngo_details: {
            pan: process.env.NGO_PAN_NUMBER,
            certificate_80g: process.env.NGO_80G_NUMBER,
            certificate_12a: process.env.NGO_12A_NUMBER,
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to generate 80G receipt:', error);
      throw error;
    }
  }
}

export const danamojoService = new DanamojoService();
```

### 3. Update Donation Controller

Update `backend/src/controllers/donation.controller.ts`:

```typescript
import { danamojoService } from '../services/danamojo.service';

export const createDonation = async (req: Request, res: Response) => {
  try {
    const { amount, donorName, donorEmail, donorPhone, donorPan, generate80G } = req.body;
    
    // Create order in database
    const donation = await prisma.donation.create({
      data: {
        amount,
        currency: 'INR',
        donorName,
        donorEmail,
        donorPhone,
        donorPan,
        userId: req.user?.id,
        paymentMethod: 'DANAMOJO',
        status: 'PENDING',
      },
    });

    // Create payment order in DANAMOJO
    const paymentOrder = await danamojoService.createPaymentOrder({
      amount,
      currency: 'INR',
      donorName,
      donorEmail,
      donorPhone,
      donorPan,
      orderId: donation.id,
      description: `Donation to Mahima Ministries`,
      generate80G: generate80G && !!donorPan,
    });

    res.json({
      success: true,
      orderId: donation.id,
      paymentUrl: paymentOrder.payment_url,
    });
  } catch (error) {
    console.error('Donation creation failed:', error);
    res.status(500).json({ error: 'Failed to create donation' });
  }
};

// Webhook handler
export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const signature = req.headers['x-danamojo-signature'] as string;
    const payload = JSON.stringify(req.body);

    // Verify signature
    if (!danamojoService.verifySignature(payload, signature)) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const { event, order_id, status, payment_id } = req.body;

    // Update donation status
    await prisma.donation.update({
      where: { id: order_id },
      data: {
        status: status.toUpperCase(),
        paymentId: payment_id,
        paidAt: status === 'success' ? new Date() : undefined,
      },
    });

    // Generate 80G receipt if payment successful
    if (status === 'success') {
      const donation = await prisma.donation.findUnique({
        where: { id: order_id },
      });

      if (donation?.donorPan) {
        await danamojoService.generate80GReceipt(order_id);
      }

      // Send confirmation email
      // ... email logic
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};
```

---

## 🎨 Frontend Integration

Update the donation page to use DANAMOJO:

```typescript
// frontend/src/pages/donor/DonatePage.tsx

const handleDonation = async () => {
  try {
    const response = await api.post('/donations', {
      amount: donationAmount,
      donorName: user.name,
      donorEmail: user.email,
      donorPhone: user.phone,
      donorPan: panNumber, // Optional for 80G
      generate80G: wantReceipt,
      isAnonymous: false,
    });

    // Redirect to DANAMOJO payment page
    window.location.href = response.data.paymentUrl;
  } catch (error) {
    console.error('Donation failed:', error);
  }
};
```

---

## 🔒 Security Best Practices

1. **Never expose Secret Key** in frontend code
2. **Always verify webhook signatures**
3. **Use HTTPS** in production
4. **Store API keys** in environment variables
5. **Log all transactions** for audit trail
6. **Implement rate limiting** on payment endpoints
7. **Validate PAN format** before accepting 80G requests

---

## 📊 Testing Checklist

- [ ] Test successful payment flow
- [ ] Test failed payment handling
- [ ] Test webhook delivery
- [ ] Test 80G receipt generation
- [ ] Test recurring donation setup
- [ ] Test refund process
- [ ] Test payment status verification
- [ ] Test callback URL handling

---

## 🆘 Troubleshooting

### Payment Creation Fails
- Check API credentials are correct
- Verify merchant account is active
- Check amount is in valid range (₹10 - ₹10,00,000)

### Webhook Not Received
- Verify webhook URL is publicly accessible
- Check firewall settings
- Test webhook URL manually
- Verify signature validation logic

### 80G Receipt Not Generated
- Ensure donor PAN is provided
- Verify 80G certificate number is configured
- Check NGO details are complete

---

## 📞 Support

- **DANAMOJO Support**: support@danamojo.org
- **Phone**: +91-80-xxxx-xxxx
- **Documentation**: https://docs.danamojo.org
- **Status Page**: https://status.danamojo.org

---

## 🎉 Go Live Checklist

- [ ] Complete KYC verification
- [ ] Upload all certificates (80G, 12A, FCRA)
- [ ] Test in sandbox mode
- [ ] Configure production webhook URL
- [ ] Update environment variables to live mode
- [ ] Test end-to-end payment flow
- [ ] Set up payment monitoring
- [ ] Configure email notifications
- [ ] Train team on dashboard
- [ ] Set up reconciliation process

---

**Last Updated**: November 10, 2025  
**Status**: Ready for Integration
