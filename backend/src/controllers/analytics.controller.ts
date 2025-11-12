import { Request, Response, NextFunction } from 'express';
import { PrismaClient, DonationStatus } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get comprehensive analytics data
 * GET /api/admin/analytics
 */
export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get date range (default to last 12 months)
    const monthsBack = parseInt(req.query.months as string) || 12;
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - monthsBack);

    // Parallel queries for better performance
    const [
      totalUsers,
      totalDonations,
      completedDonations,
      pendingDonations,
      failedDonations,
      donations,
      users,
      totalRevenue,
    ] = await Promise.all([
      // Total users count
      prisma.user.count(),

      // Donation counts by status
      prisma.donation.count(),
      prisma.donation.count({ where: { status: DonationStatus.COMPLETED } }),
      prisma.donation.count({ where: { status: DonationStatus.PENDING } }),
      prisma.donation.count({ where: { status: DonationStatus.FAILED } }),

      // All donations for processing
      prisma.donation.findMany({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
        select: {
          id: true,
          amount: true,
          status: true,
          isRecurring: true,
          createdAt: true,
          userId: true,
          user: {
            select: {
              id: true,
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),

      // All users for processing
      prisma.user.findMany({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
        select: {
          id: true,
          role: true,
          createdAt: true,
        },
      }),

      // Total revenue
      prisma.donation.aggregate({
        where: {
          status: DonationStatus.COMPLETED,
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    // Process donations by month
    const donationsByMonth = donations.reduce((acc: any, donation) => {
      const monthKey = new Date(donation.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });

      if (!acc[monthKey]) {
        acc[monthKey] = { month: monthKey, amount: 0, count: 0 };
      }

      if (donation.status === DonationStatus.COMPLETED) {
        acc[monthKey].amount += Number(donation.amount);
        acc[monthKey].count += 1;
      }

      return acc;
    }, {});

    // Process donations by status for pie chart
    const donationsByStatus = [
      { name: 'COMPLETED', value: completedDonations, percentage: ((completedDonations / totalDonations) * 100).toFixed(1) },
      { name: 'PENDING', value: pendingDonations, percentage: ((pendingDonations / totalDonations) * 100).toFixed(1) },
      { name: 'FAILED', value: failedDonations, percentage: ((failedDonations / totalDonations) * 100).toFixed(1) },
    ];

    // Process donations by type (one-time vs recurring)
    const recurringDonations = donations.filter((d) => d.isRecurring);
    const oneTimeDonations = donations.filter((d) => !d.isRecurring);

    const donationsByType = [
      {
        type: 'One-time',
        amount: oneTimeDonations
          .filter((d) => d.status === DonationStatus.COMPLETED)
          .reduce((sum, d) => sum + Number(d.amount), 0),
        count: oneTimeDonations.length,
      },
      {
        type: 'Recurring',
        amount: recurringDonations
          .filter((d) => d.status === DonationStatus.COMPLETED)
          .reduce((sum, d) => sum + Number(d.amount), 0),
        count: recurringDonations.length,
      },
    ];

    // Calculate top donors
    const donorMap = donations.reduce((acc: any, donation) => {
      if (!donation.userId || donation.status !== DonationStatus.COMPLETED) return acc;

      const donorName = donation.user?.profile
        ? `${donation.user.profile.firstName} ${donation.user.profile.lastName}`
        : 'Anonymous Donor';

      if (!acc[donation.userId]) {
        acc[donation.userId] = {
          name: donorName,
          total: 0,
          count: 0,
        };
      }

      acc[donation.userId].total += Number(donation.amount);
      acc[donation.userId].count += 1;

      return acc;
    }, {});

    const topDonors = Object.values(donorMap)
      .sort((a: any, b: any) => b.total - a.total)
      .slice(0, 10);

    // Process growth data (last 6 months)
    const recentGrowth = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      const monthStr = date.toLocaleDateString('en-US', { month: 'short' });

      const monthDonations = donations.filter((d) => {
        const dDate = new Date(d.createdAt);
        return (
          dDate.getMonth() === date.getMonth() &&
          dDate.getFullYear() === date.getFullYear()
        );
      });

      const monthUsers = users.filter((u) => {
        const uDate = new Date(u.createdAt);
        return (
          uDate.getMonth() === date.getMonth() &&
          uDate.getFullYear() === date.getFullYear()
        );
      });

      const monthRevenue = monthDonations
        .filter((d) => d.status === DonationStatus.COMPLETED)
        .reduce((sum, d) => sum + Number(d.amount), 0);

      return {
        date: monthStr,
        users: monthUsers.length,
        donations: monthDonations.length,
        revenue: monthRevenue / 1000, // Convert to thousands
      };
    });

    // Users by role
    const usersByRole = users.reduce((acc: any, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    const usersByRoleArray = Object.entries(usersByRole).map(([role, count]) => ({
      role,
      count: count as number,
    }));

    // Calculate averages
    const avgDonation = completedDonations > 0 
      ? Number(totalRevenue._sum.amount || 0) / completedDonations 
      : 0;
    
    const avgMonthlyRevenue = Number(totalRevenue._sum.amount || 0) / monthsBack;
    const avgDonationsPerUser = totalUsers > 0 ? totalDonations / totalUsers : 0;

    // Campaign performance (mock data - can be replaced with real campaign queries)
    const campaigns = await prisma.campaign.findMany({
      select: {
        id: true,
        name: true,
        goal: true,
        raised: true,
      },
      take: 10,
      orderBy: {
        raised: 'desc',
      },
    });

    const campaignPerformance = await Promise.all(
      campaigns.map(async (campaign) => {
        const donorCount = await prisma.donation.count({
          where: {
            campaignId: campaign.id,
            status: DonationStatus.COMPLETED,
          },
        });

        return {
          campaign: campaign.name,
          raised: Number(campaign.raised),
          goal: Number(campaign.goal),
          donors: donorCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalUsers,
          totalDonations,
          completedDonations,
          pendingDonations,
          failedDonations,
          totalRevenue: Number(totalRevenue._sum.amount || 0),
        },
        donationsByMonth: Object.values(donationsByMonth),
        donationsByStatus,
        donationsByType,
        topDonors,
        recentGrowth,
        campaignPerformance,
        usersByRole: usersByRoleArray,
        averages: {
          avgDonation,
          avgMonthlyRevenue,
          avgDonationsPerUser,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get donation trends
 * GET /api/admin/analytics/donations
 */
export const getDonationTrends = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const donations = await prisma.donation.findMany({
      where: {
        status: DonationStatus.COMPLETED,
      },
      select: {
        amount: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      success: true,
      data: donations,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user growth trends
 * GET /api/admin/analytics/users
 */
export const getUserTrends = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const monthsBack = parseInt(req.query.months as string) || 12;
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - monthsBack);

    const users = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        role: true,
        createdAt: true,
        isEmailVerified: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
