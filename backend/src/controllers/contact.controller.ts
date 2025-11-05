import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { sendContactFormEmails } from '../services/notification.service';
import { logger } from '../utils/logger.util';

const prisma = new PrismaClient();

// Validation schema
const contactInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

/**
 * Submit contact form
 * POST /api/contact
 */
export const submitContactForm = async (req: Request, res: Response) => {
  try {
    // Validate input
    const validatedData = contactInquirySchema.parse(req.body);

    // Save to database
    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: `Phone: ${validatedData.phone}\n\n${validatedData.message}`,
        status: 'NEW',
      },
    });

    // Send email notifications
    try {
      await sendContactFormEmails({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message,
        submittedAt: inquiry.createdAt,
      });
    } catch (emailError) {
      logger.error('Error sending contact form emails:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully. We will get back to you soon!',
      data: {
        id: inquiry.id,
        status: inquiry.status,
        submittedAt: inquiry.createdAt,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: error.errors,
        },
      });
    }

    logger.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to submit inquiry. Please try again later.',
      },
    });
  }
};

/**
 * Get all contact inquiries (Admin only)
 * GET /api/contact/inquiries
 */
export const getAllInquiries = async (req: Request, res: Response) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const [inquiries, total] = await Promise.all([
      prisma.contactInquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      }),
      prisma.contactInquiry.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        inquiries,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    logger.error('Error fetching inquiries:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to fetch inquiries',
      },
    });
  }
};

/**
 * Update inquiry status (Admin only)
 * PATCH /api/contact/inquiries/:id
 */
export const updateInquiryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_STATUS',
          message: 'Invalid status value',
        },
      });
    }

    const inquiry = await prisma.contactInquiry.update({
      where: { id },
      data: {
        status,
        respondedAt: status === 'RESOLVED' || status === 'CLOSED' ? new Date() : undefined,
      },
    });

    res.json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    logger.error('Error updating inquiry status:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update inquiry status',
      },
    });
  }
};

export default {
  submitContactForm,
  getAllInquiries,
  updateInquiryStatus,
};
