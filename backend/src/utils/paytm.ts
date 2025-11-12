import PaytmChecksum from 'paytmchecksum';
import axios from 'axios';
import { logger } from './logger.util';

// Paytm Configuration
export const paytmConfig = {
  MID: process.env.PAYTM_MERCHANT_ID || '',
  MERCHANT_KEY: process.env.PAYTM_MERCHANT_KEY || '',
  WEBSITE: process.env.PAYTM_WEBSITE || 'DEFAULT',
  INDUSTRY_TYPE: process.env.PAYTM_INDUSTRY_TYPE || 'Retail',
  CHANNEL_ID: process.env.PAYTM_CHANNEL_ID || 'WEB',
  
  // URLs based on environment
  TRANSACTION_URL: process.env.PAYTM_MODE === 'production'
    ? 'https://securegw.paytm.in/theia/processTransaction'
    : 'https://securegw-stage.paytm.in/theia/processTransaction',
    
  TRANSACTION_STATUS_URL: process.env.PAYTM_MODE === 'production'
    ? 'https://securegw.paytm.in/merchant-status/getTxnStatus'
    : 'https://securegw-stage.paytm.in/merchant-status/getTxnStatus',
    
  CALLBACK_URL: `${process.env.API_URL}/api/paytm/callback`,
};

/**
 * Generate Paytm checksum for payment request
 */
export async function generatePaytmChecksum(
  orderId: string,
  amount: string,
  customerId: string,
  email: string,
  phone: string
): Promise<{ paytmParams: any; checksum: string } | null> {
  try {
    const paytmParams: any = {
      MID: paytmConfig.MID,
      WEBSITE: paytmConfig.WEBSITE,
      INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE,
      CHANNEL_ID: paytmConfig.CHANNEL_ID,
      ORDER_ID: orderId,
      CUST_ID: customerId,
      TXN_AMOUNT: amount,
      CALLBACK_URL: paytmConfig.CALLBACK_URL,
      EMAIL: email,
      MOBILE_NO: phone,
    };

    // Generate checksum
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams),
      paytmConfig.MERCHANT_KEY
    );

    logger.info('Paytm checksum generated successfully', { orderId });

    return {
      paytmParams: {
        ...paytmParams,
        CHECKSUMHASH: checksum,
      },
      checksum,
    };
  } catch (error) {
    logger.error('Error generating Paytm checksum:', error);
    return null;
  }
}

/**
 * Verify Paytm checksum from callback
 */
export async function verifyPaytmChecksum(
  paytmParams: any
): Promise<boolean> {
  try {
    const checksumHash = paytmParams.CHECKSUMHASH;
    delete paytmParams.CHECKSUMHASH;

    const isValid = await PaytmChecksum.verifySignature(
      JSON.stringify(paytmParams),
      paytmConfig.MERCHANT_KEY,
      checksumHash
    );

    logger.info('Paytm checksum verification', { isValid });
    return isValid;
  } catch (error) {
    logger.error('Error verifying Paytm checksum:', error);
    return false;
  }
}

/**
 * Check transaction status with Paytm
 */
export async function getPaytmTransactionStatus(
  orderId: string
): Promise<any> {
  try {
    const paytmParams: any = {
      MID: paytmConfig.MID,
      ORDERID: orderId,
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams),
      paytmConfig.MERCHANT_KEY
    );

    const requestBody = {
      body: {
        ...paytmParams,
        CHECKSUMHASH: checksum,
      },
      head: {
        signature: checksum,
      },
    };

    const response = await axios.post(
      paytmConfig.TRANSACTION_STATUS_URL,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    logger.info('Paytm transaction status retrieved', {
      orderId,
      status: response.data,
    });

    return response.data;
  } catch (error) {
    logger.error('Error getting Paytm transaction status:', error);
    throw error;
  }
}

/**
 * Initialize Paytm payment transaction
 */
export async function initiatePaytmPayment(params: {
  orderId: string;
  amount: number;
  customerId: string;
  customerEmail: string;
  customerPhone: string;
  description?: string;
}) {
  try {
    const {
      orderId,
      amount,
      customerId,
      customerEmail,
      customerPhone,
    } = params;

    // Generate checksum
    const checksumData = await generatePaytmChecksum(
      orderId,
      amount.toFixed(2),
      customerId,
      customerEmail,
      customerPhone
    );

    if (!checksumData) {
      throw new Error('Failed to generate Paytm checksum');
    }

    return {
      success: true,
      transactionUrl: paytmConfig.TRANSACTION_URL,
      params: checksumData.paytmParams,
      orderId,
    };
  } catch (error) {
    logger.error('Error initiating Paytm payment:', error);
    throw error;
  }
}

/**
 * Validate Paytm configuration
 */
export function validatePaytmConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!paytmConfig.MID) {
    errors.push('PAYTM_MERCHANT_ID is not configured');
  }

  if (!paytmConfig.MERCHANT_KEY) {
    errors.push('PAYTM_MERCHANT_KEY is not configured');
  }

  if (!paytmConfig.WEBSITE) {
    errors.push('PAYTM_WEBSITE is not configured');
  }

  if (!process.env.API_URL) {
    errors.push('API_URL is not configured for callback URL');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Get payment mode label
 */
export function getPaymentModeLabel(mode: string): string {
  const modes: Record<string, string> = {
    'CC': 'Credit Card',
    'DC': 'Debit Card',
    'NB': 'Net Banking',
    'PPI': 'Paytm Wallet',
    'UPI': 'UPI',
    'BALANCE': 'Paytm Balance',
  };

  return modes[mode] || mode;
}
