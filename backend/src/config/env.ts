import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export const config = {
  // Server
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Database
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',

  // JWT
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'your-access-secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
  jwtAccessExpiry: '15m',
  jwtRefreshExpiry: '7d',

  // Session
  sessionSecret: process.env.SESSION_SECRET || 'your-session-secret',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',

  // Email
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  emailFrom: process.env.EMAIL_FROM || 'noreply@nonprofit.org',

  // Payment (Stripe)
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },

  // File Storage (AWS S3)
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || 'us-east-1',
    s3Bucket: process.env.AWS_S3_BUCKET || 'nonprofit-uploads',
  },

  // Security
  bcryptRounds: 12,
  csrfTokenLength: 32,

  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
  },

  authRateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 10,
  },

  registerRateLimit: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
  },
};
