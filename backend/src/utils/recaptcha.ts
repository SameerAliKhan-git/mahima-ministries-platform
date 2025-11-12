import axios from 'axios';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
  score?: number;
  action?: string;
}

/**
 * Verify reCAPTCHA token with Google
 * @param token - The reCAPTCHA token from the client
 * @param remoteip - Optional: User's IP address
 * @returns Promise<boolean> - True if verification successful
 */
export async function verifyRecaptcha(
  token: string,
  remoteip?: string
): Promise<{ success: boolean; message?: string }> {
  try {
    if (!RECAPTCHA_SECRET_KEY) {
      console.error('RECAPTCHA_SECRET_KEY is not configured');
      return {
        success: false,
        message: 'reCAPTCHA verification is not configured',
      };
    }

    if (!token) {
      return {
        success: false,
        message: 'reCAPTCHA token is required',
      };
    }

    // Build request parameters
    const params = new URLSearchParams({
      secret: RECAPTCHA_SECRET_KEY,
      response: token,
    });

    if (remoteip) {
      params.append('remoteip', remoteip);
    }

    // Verify token with Google
    const response = await axios.post<RecaptchaResponse>(
      RECAPTCHA_VERIFY_URL,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 10000, // 10 second timeout
      }
    );

    const data = response.data;

    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data['error-codes']);
      return {
        success: false,
        message: 'reCAPTCHA verification failed. Please try again.',
      };
    }

    // Additional security checks
    // For reCAPTCHA v2, we just check success
    // For v3, you would also check the score here

    return {
      success: true,
      message: 'reCAPTCHA verification successful',
    };
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return {
      success: false,
      message: 'Failed to verify reCAPTCHA. Please try again.',
    };
  }
}

/**
 * Middleware to verify reCAPTCHA token
 * Use this in routes that require CAPTCHA verification
 */
export async function recaptchaMiddleware(
  req: any,
  res: any,
  next: any
): Promise<void> {
  try {
    const { recaptchaToken } = req.body;

    if (!recaptchaToken) {
      res.status(400).json({
        success: false,
        message: 'reCAPTCHA token is required',
      });
      return;
    }

    const verification = await verifyRecaptcha(recaptchaToken, req.ip);

    if (!verification.success) {
      res.status(400).json({
        success: false,
        message: verification.message || 'reCAPTCHA verification failed',
      });
      return;
    }

    // Verification successful, proceed to next middleware
    next();
  } catch (error) {
    console.error('reCAPTCHA middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during CAPTCHA verification',
    });
  }
}

export default {
  verifyRecaptcha,
  recaptchaMiddleware,
};
