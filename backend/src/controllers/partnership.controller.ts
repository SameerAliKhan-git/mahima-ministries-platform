import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { sendPartnershipApplicationEmails } from '../services/notification.service';
import { logger } from '../utils/logger.util';

const prisma = new PrismaClient();

// Validation schema
const partnershipApplicationSchema = z.object({
  organizationName: z.string().min(2, 'Organization name must be at least 2 characters'),
  contactName: z.string().min(2, 'Contact name must be at least 2 characters'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  partnershipType: z.enum(['CORPORATE', 'INSTITUTIONAL', 'INDIVIDUAL', 'FOUNDATION']),
  proposalDetails: z.string().min(50, 'Proposal details must be at least 50 characters'),
  documentsUrl: z.string().url().optional(),
});

/**
 * Submit partnership application
 * POST /api/partnerships/apply
 */
export const submitPartnershipApplication = async (req: Request, res: Response) => {
  try {
    // Validate input
    const validatedData = partnershipApplicationSchema.parse(req.body);

    // Save to database
    const application = await prisma.partnershipApplication.create({
      data: {
        organizationName: validatedData.organizationName,
        contactName: validatedData.contactName,
        contactEmail: validatedData.contactEmail,
        contactPhone: validatedData.contactPhone,
        partnershipType: validatedData.partnershipType,
        proposalDetails: validatedData.proposalDetails,
        documentsUrl: validatedData.documentsUrl,
        status: 'PENDING',
        userId: (req as any).user?.userId || null,
      },
    });

    // Send email notifications
    try {
      await sendPartnershipApplicationEmails({
        organizationName: validatedData.organizationName,
        contactName: validatedData.contactName,
        contactEmail: validatedData.contactEmail,
        contactPhone: validatedData.contactPhone,
        partnershipType: validatedData.partnershipType,
        proposalDetails: validatedData.proposalDetails,
        submittedAt: application.createdAt,
      });
    } catch (emailError) {
      logger.error('Error sending partnership application emails:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Your partnership application has been submitted successfully. Our team will contact you soon!',
      data: {
        id: application.id,
        status: application.status,
        submittedAt: application.createdAt,
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

    logger.error('Error submitting partnership application:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to submit application. Please try again later.',
      },
    });
  }
};

/**
 * Get all partnership applications (Admin only)
 * GET /api/partnerships/applications
 */
export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;

    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (type) {
      where.partnershipType = type;
    }

    const [applications, total] = await Promise.all([
      prisma.partnershipApplication.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      prisma.partnershipApplication.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        applications,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    logger.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to fetch applications',
      },
    });
  }
};

/**
 * Get single application by ID
 * GET /api/partnerships/applications/:id
 */
export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const application = await prisma.partnershipApplication.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Application not found',
        },
      });
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    logger.error('Error fetching application:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to fetch application',
      },
    });
  }
};

/**
 * Update application status (Admin only)
 * PATCH /api/partnerships/applications/:id
 */
export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, reviewNotes } = req.body;

    if (!['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_STATUS',
          message: 'Invalid status value',
        },
      });
    }

    const application = await prisma.partnershipApplication.update({
      where: { id },
      data: {
        status,
        reviewNotes,
        reviewedBy: (req as any).user?.userId,
        reviewedAt: new Date(),
      },
    });

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    logger.error('Error updating application status:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update application status',
      },
    });
  }
};

export default {
  submitPartnershipApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
};
