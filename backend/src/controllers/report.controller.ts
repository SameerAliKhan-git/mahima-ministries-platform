import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Validation schemas
const createReportSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  reportType: z.enum(['FINANCIAL', 'ANNUAL', 'AUDIT', 'IMPACT', 'QUARTERLY', 'OTHER']),
  fiscalYear: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional().default('PUBLISHED'),
});

const updateReportSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  reportType: z.enum(['FINANCIAL', 'ANNUAL', 'AUDIT', 'IMPACT', 'QUARTERLY', 'OTHER']).optional(),
  fiscalYear: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads/reports');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Upload a new report (Admin only)
export const uploadReport = async (req: Request, res: Response) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded. Please upload a PDF file.'
      });
    }

    // Validate file type
    if (req.file.mimetype !== 'application/pdf') {
      // Delete the uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        error: 'Invalid file type. Only PDF files are allowed.'
      });
    }

    // Validate request body
    const validatedData = createReportSchema.parse(req.body);

    // Get user ID from authenticated request
    const userId = (req as any).user?.id;

    // Create report record in database
    const report = await prisma.report.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        reportType: validatedData.reportType,
        fiscalYear: validatedData.fiscalYear,
        fileUrl: `/uploads/reports/${req.file.filename}`,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        status: validatedData.status || 'PUBLISHED',
        uploadedBy: userId,
        publishedAt: validatedData.status === 'PUBLISHED' ? new Date() : null,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Report uploaded successfully',
      data: report,
    });
  } catch (error) {
    console.error('Error uploading report:', error);
    
    // Delete uploaded file if database operation fails
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to upload report',
    });
  }
};

// Get all reports (with filtering)
export const getAllReports = async (req: Request, res: Response) => {
  try {
    const { reportType, status, fiscalYear, limit, offset } = req.query;

    const where: any = {};
    
    if (reportType) {
      where.reportType = reportType;
    }
    
    if (status) {
      where.status = status;
    } else {
      // By default, only show published reports to public
      where.status = 'PUBLISHED';
    }
    
    if (fiscalYear) {
      where.fiscalYear = fiscalYear;
    }

    const reports = await prisma.report.findMany({
      where,
      orderBy: [
        { publishedAt: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit ? parseInt(limit as string) : undefined,
      skip: offset ? parseInt(offset as string) : undefined,
    });

    const total = await prisma.report.count({ where });

    res.json({
      success: true,
      data: {
        reports,
        total,
        limit: limit ? parseInt(limit as string) : total,
        offset: offset ? parseInt(offset as string) : 0,
      },
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reports',
    });
  }
};

// Get report by ID
export const getReportById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const report = await prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found',
      });
    }

    // Increment view count
    await prisma.report.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch report',
    });
  }
};

// Update report metadata (Admin only)
export const updateReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateReportSchema.parse(req.body);

    // Check if report exists
    const existingReport = await prisma.report.findUnique({
      where: { id },
    });

    if (!existingReport) {
      return res.status(404).json({
        success: false,
        error: 'Report not found',
      });
    }

    // Update report
    const updateData: any = { ...validatedData };
    
    // If status is being changed to PUBLISHED and it wasn't published before
    if (validatedData.status === 'PUBLISHED' && existingReport.status !== 'PUBLISHED') {
      updateData.publishedAt = new Date();
    }

    const report = await prisma.report.update({
      where: { id },
      data: updateData,
    });

    res.json({
      success: true,
      message: 'Report updated successfully',
      data: report,
    });
  } catch (error) {
    console.error('Error updating report:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to update report',
    });
  }
};

// Delete report (Admin only)
export const deleteReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find report
    const report = await prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found',
      });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '../..', report.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete report from database
    await prisma.report.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Report deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete report',
    });
  }
};

// Get reports grouped by type
export const getReportsByType = async (req: Request, res: Response) => {
  try {
    const reports = await prisma.report.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [
        { reportType: 'asc' },
        { publishedAt: 'desc' },
      ],
    });

    // Group reports by type
    const groupedReports: any = {
      FINANCIAL: [],
      ANNUAL: [],
      AUDIT: [],
      IMPACT: [],
      QUARTERLY: [],
      OTHER: [],
    };

    reports.forEach(report => {
      groupedReports[report.reportType].push(report);
    });

    res.json({
      success: true,
      data: groupedReports,
    });
  } catch (error) {
    console.error('Error fetching reports by type:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reports',
    });
  }
};

// Get report statistics (Admin only)
export const getReportStats = async (req: Request, res: Response) => {
  try {
    const totalReports = await prisma.report.count();
    const publishedReports = await prisma.report.count({
      where: { status: 'PUBLISHED' },
    });
    const draftReports = await prisma.report.count({
      where: { status: 'DRAFT' },
    });
    const archivedReports = await prisma.report.count({
      where: { status: 'ARCHIVED' },
    });

    const reportsByType = await prisma.report.groupBy({
      by: ['reportType'],
      _count: true,
    });

    const totalViews = await prisma.report.aggregate({
      _sum: {
        viewCount: true,
      },
    });

    res.json({
      success: true,
      data: {
        totalReports,
        publishedReports,
        draftReports,
        archivedReports,
        reportsByType,
        totalViews: totalViews._sum.viewCount || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching report stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics',
    });
  }
};
