import axios from 'axios';
import { logger } from './logger.util';
import FormData from 'form-data';
import fs from 'fs';

/**
 * Meta WhatsApp Business Cloud API Integration
 * Official Meta WhatsApp API - No third-party service required
 * 
 * Setup Instructions:
 * 1. Go to https://developers.facebook.com/
 * 2. Create a new app or select existing app
 * 3. Add "WhatsApp" product to your app
 * 4. Go to WhatsApp > API Setup
 * 5. Copy your Phone Number ID
 * 6. Generate Permanent Access Token
 * 7. Add token and phone number ID to .env
 */

interface WhatsAppConfig {
  accessToken: string;
  phoneNumberId: string;
  apiVersion: string;
  baseUrl: string;
}

interface WhatsAppMessageData {
  to: string; // Phone number with country code (e.g., '919876543210')
  message: string;
  receiptPdfBuffer?: Buffer;
  donationDetails?: {
    orderId: string;
    amount: number;
    donorName: string;
    txnId: string;
  };
}

/**
 * Get WhatsApp configuration from environment variables
 */
function getWhatsAppConfig(): WhatsAppConfig {
  const accessToken = process.env.META_WHATSAPP_ACCESS_TOKEN || '';
  const phoneNumberId = process.env.META_WHATSAPP_PHONE_NUMBER_ID || '';
  const apiVersion = process.env.META_WHATSAPP_API_VERSION || 'v18.0';

  return {
    accessToken,
    phoneNumberId,
    apiVersion,
    baseUrl: `https://graph.facebook.com/${apiVersion}/${phoneNumberId}`,
  };
}

/**
 * Validate WhatsApp configuration
 */
export function validateWhatsAppConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const config = getWhatsAppConfig();

  if (!config.accessToken) {
    errors.push('META_WHATSAPP_ACCESS_TOKEN is not configured');
  }

  if (!config.phoneNumberId) {
    errors.push('META_WHATSAPP_PHONE_NUMBER_ID is not configured');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Format phone number for WhatsApp (remove spaces, dashes, add country code)
 * Example: '9876543210' -> '919876543210'
 */
function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, '');

  // If doesn't start with country code, add India code (91)
  if (!cleaned.startsWith('91') && cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }

  return cleaned;
}

/**
 * Send text message via WhatsApp
 */
export async function sendWhatsAppTextMessage(
  to: string,
  message: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const config = getWhatsAppConfig();
    const validation = validateWhatsAppConfig();

    if (!validation.isValid) {
      logger.error('WhatsApp not configured:', validation.errors);
      return { success: false, error: 'WhatsApp not configured' };
    }

    const formattedPhone = formatPhoneNumber(to);

    const response = await axios.post(
      `${config.baseUrl}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: formattedPhone,
        type: 'text',
        text: {
          preview_url: false,
          body: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    logger.info('WhatsApp text message sent successfully', {
      to: formattedPhone,
      messageId: response.data.messages?.[0]?.id,
    });

    return {
      success: true,
      messageId: response.data.messages?.[0]?.id,
    };
  } catch (error: any) {
    logger.error('Error sending WhatsApp text message:', {
      error: error.response?.data || error.message,
      to,
    });

    return {
      success: false,
      error: error.response?.data?.error?.message || error.message,
    };
  }
}

/**
 * Upload PDF document to WhatsApp Media API
 */
async function uploadWhatsAppMedia(
  pdfBuffer: Buffer,
  filename: string
): Promise<{ success: boolean; mediaId?: string; error?: string }> {
  try {
    const config = getWhatsAppConfig();

    // Create form data
    const formData = new FormData();
    formData.append('messaging_product', 'whatsapp');
    formData.append('file', pdfBuffer, {
      filename,
      contentType: 'application/pdf',
    });
    formData.append('type', 'application/pdf');

    const response = await axios.post(
      `${config.baseUrl}/media`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${config.accessToken}`,
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    logger.info('PDF uploaded to WhatsApp media successfully', {
      mediaId: response.data.id,
      filename,
    });

    return {
      success: true,
      mediaId: response.data.id,
    };
  } catch (error: any) {
    logger.error('Error uploading media to WhatsApp:', {
      error: error.response?.data || error.message,
    });

    return {
      success: false,
      error: error.response?.data?.error?.message || error.message,
    };
  }
}

/**
 * Send PDF document via WhatsApp
 */
export async function sendWhatsAppDocument(
  to: string,
  pdfBuffer: Buffer,
  filename: string,
  caption?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const config = getWhatsAppConfig();
    const validation = validateWhatsAppConfig();

    if (!validation.isValid) {
      logger.error('WhatsApp not configured:', validation.errors);
      return { success: false, error: 'WhatsApp not configured' };
    }

    // Step 1: Upload PDF to WhatsApp Media API
    const uploadResult = await uploadWhatsAppMedia(pdfBuffer, filename);

    if (!uploadResult.success || !uploadResult.mediaId) {
      return {
        success: false,
        error: uploadResult.error || 'Failed to upload document',
      };
    }

    // Step 2: Send document message
    const formattedPhone = formatPhoneNumber(to);

    const response = await axios.post(
      `${config.baseUrl}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: formattedPhone,
        type: 'document',
        document: {
          id: uploadResult.mediaId,
          caption: caption || undefined,
          filename,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    logger.info('WhatsApp document sent successfully', {
      to: formattedPhone,
      messageId: response.data.messages?.[0]?.id,
      mediaId: uploadResult.mediaId,
    });

    return {
      success: true,
      messageId: response.data.messages?.[0]?.id,
    };
  } catch (error: any) {
    logger.error('Error sending WhatsApp document:', {
      error: error.response?.data || error.message,
      to,
    });

    return {
      success: false,
      error: error.response?.data?.error?.message || error.message,
    };
  }
}

/**
 * Send donation receipt via WhatsApp
 * Sends both text message and PDF receipt
 */
export async function sendWhatsAppReceipt(
  data: WhatsAppMessageData
): Promise<{ success: boolean; error?: string }> {
  try {
    const validation = validateWhatsAppConfig();

    if (!validation.isValid) {
      logger.warn('WhatsApp not configured, skipping WhatsApp receipt', {
        errors: validation.errors,
      });
      return { success: false, error: 'WhatsApp not configured' };
    }

    const { to, donationDetails, receiptPdfBuffer } = data;

    // Send thank you text message first
    const thankYouMessage = generateThankYouMessage(donationDetails);
    const textResult = await sendWhatsAppTextMessage(to, thankYouMessage);

    if (!textResult.success) {
      logger.error('Failed to send WhatsApp thank you message', {
        error: textResult.error,
      });
    }

    // If PDF buffer is provided, send document
    if (receiptPdfBuffer && donationDetails) {
      // Add small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const filename = `Receipt_${donationDetails.orderId}.pdf`;
      const caption = `Your donation receipt for ₹${donationDetails.amount.toLocaleString('en-IN')}`;

      const documentResult = await sendWhatsAppDocument(
        to,
        receiptPdfBuffer,
        filename,
        caption
      );

      if (!documentResult.success) {
        logger.error('Failed to send WhatsApp receipt document', {
          error: documentResult.error,
        });
        return { success: false, error: documentResult.error };
      }

      logger.info('WhatsApp receipt sent successfully', {
        to,
        orderId: donationDetails.orderId,
        textMessageId: textResult.messageId,
        documentMessageId: documentResult.messageId,
      });

      return { success: true };
    }

    // If only text message (no PDF)
    return textResult;
  } catch (error: any) {
    logger.error('Error sending WhatsApp receipt:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Generate thank you message for donation
 */
function generateThankYouMessage(
  donationDetails?: WhatsAppMessageData['donationDetails']
): string {
  if (!donationDetails) {
    return `🙏 Thank you for your generous donation to Mahima Ministries!\n\nYour contribution helps us serve those in need.\n\nMay God bless you abundantly! ✨`;
  }

  const { donorName, amount, orderId, txnId } = donationDetails;

  return `🙏 *Thank You, ${donorName}!*

Thank you for your generous donation of *₹${amount.toLocaleString('en-IN')}* to Mahima Ministries.

📝 *Receipt Details:*
• Receipt No: ${orderId}
• Transaction ID: ${txnId}

Your contribution will help us continue our mission of serving those in need.

📧 A detailed receipt with 80G tax benefit information has been sent to your email.

May God bless you abundantly! ✨

_Mahima Ministries_`;
}

/**
 * Send WhatsApp template message (for pre-approved templates)
 * Templates need to be created and approved in Meta Business Manager
 */
export async function sendWhatsAppTemplateMessage(
  to: string,
  templateName: string,
  languageCode: string = 'en',
  components?: any[]
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const config = getWhatsAppConfig();
    const validation = validateWhatsAppConfig();

    if (!validation.isValid) {
      return { success: false, error: 'WhatsApp not configured' };
    }

    const formattedPhone = formatPhoneNumber(to);

    const response = await axios.post(
      `${config.baseUrl}/messages`,
      {
        messaging_product: 'whatsapp',
        to: formattedPhone,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
          components: components || [],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    logger.info('WhatsApp template message sent successfully', {
      to: formattedPhone,
      template: templateName,
      messageId: response.data.messages?.[0]?.id,
    });

    return {
      success: true,
      messageId: response.data.messages?.[0]?.id,
    };
  } catch (error: any) {
    logger.error('Error sending WhatsApp template message:', {
      error: error.response?.data || error.message,
      to,
      template: templateName,
    });

    return {
      success: false,
      error: error.response?.data?.error?.message || error.message,
    };
  }
}

/**
 * Check WhatsApp API health
 */
export async function checkWhatsAppHealth(): Promise<{
  healthy: boolean;
  error?: string;
}> {
  try {
    const config = getWhatsAppConfig();
    const validation = validateWhatsAppConfig();

    if (!validation.isValid) {
      return { healthy: false, error: validation.errors.join(', ') };
    }

    // Get phone number details to verify API access
    const response = await axios.get(
      `https://graph.facebook.com/${config.apiVersion}/${config.phoneNumberId}`,
      {
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      }
    );

    logger.info('WhatsApp API health check successful', {
      phoneNumber: response.data.display_phone_number,
    });

    return { healthy: true };
  } catch (error: any) {
    logger.error('WhatsApp API health check failed:', {
      error: error.response?.data || error.message,
    });

    return {
      healthy: false,
      error: error.response?.data?.error?.message || error.message,
    };
  }
}

export default {
  sendWhatsAppTextMessage,
  sendWhatsAppDocument,
  sendWhatsAppReceipt,
  sendWhatsAppTemplateMessage,
  validateWhatsAppConfig,
  checkWhatsAppHealth,
};
