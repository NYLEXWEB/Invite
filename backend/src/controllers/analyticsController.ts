import { Request, Response, NextFunction } from 'express';
import { Analytics } from '../models/Analytics';

// GET: Retrieve aggregated analytics
export async function getAnalytics(req: Request, res: Response, next: NextFunction) {
  try {
    // 1. Total views
    const totalViewsRes = await Analytics.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    const totalViews = totalViewsRes[0]?.total || 0;

    // 2. Views by deviceType
    const deviceTypeBreakdown = await Analytics.aggregate([
      { $group: { _id: '$deviceType', count: { $sum: '$views' } } },
      { $project: { device: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);

    // 3. Views by country
    const countryBreakdown = await Analytics.aggregate([
      { $group: { _id: '$country', count: { $sum: '$views' } } },
      { $project: { country: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // 4. Views by invitation (top performing)
    const topInvitations = await Analytics.aggregate([
      { $group: { _id: '$invitationId', count: { $sum: '$views' } } },
      {
        $lookup: {
          from: 'invitations',
          localField: '_id',
          foreignField: '_id',
          as: 'invitation'
        }
      },
      { $unwind: { path: '$invitation', preserveNullAndEmptyArrays: false } },
      {
        $project: {
          invitationId: '$_id',
          slug: '$invitation.slug',
          serviceType: '$invitation.serviceType',
          views: '$count',
          userData: '$invitation.userData',
          _id: 0
        }
      },
      { $sort: { views: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalViews,
        deviceTypeBreakdown,
        countryBreakdown,
        topInvitations
      }
    });
  } catch (error) {
    next(error);
  }
}
