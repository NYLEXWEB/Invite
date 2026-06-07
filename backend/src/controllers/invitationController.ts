import { Request, Response, NextFunction } from 'express';
import { Invitation } from '../models/Invitation';
import { Analytics } from '../models/Analytics';
import { generateSlug } from '../utils/slug';
import fs from 'fs';
import path from 'path';

// Helper to delete a file from disk
function deleteFile(filePath: string) {
  const absolutePath = path.isAbsolute(filePath) 
    ? filePath 
    : path.join(process.cwd(), filePath);
  
  if (fs.existsSync(absolutePath)) {
    fs.unlink(absolutePath, (err) => {
      if (err) console.error(`Failed to delete file ${absolutePath}:`, err);
      else console.log(`Deleted file: ${absolutePath}`);
    });
  }
}

// POST: Create invitation
export async function createInvitation(req: Request, res: Response, next: NextFunction) {
  try {
    const { serviceType } = req.body;
    let userData = req.body.userData;

    if (!serviceType) {
      return res.status(400).json({ success: false, message: 'Service type is required.' });
    }

    // Parse userData if it's sent as a string from multipart/form-data
    if (typeof userData === 'string') {
      try {
        userData = JSON.parse(userData);
      } catch (err) {
        return res.status(400).json({ success: false, message: 'Invalid JSON for userData.' });
      }
    }

    if (!userData || typeof userData !== 'object') {
      return res.status(400).json({ success: false, message: 'User data is required and must be an object.' });
    }

    // Generate unique slug
    let slug = '';
    let isUnique = false;
    let attempts = 0;
    while (!isUnique && attempts < 10) {
      slug = generateSlug(8);
      const existing = await Invitation.findOne({ slug });
      if (!existing) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      return res.status(500).json({ success: false, message: 'Failed to generate a unique link. Please try again.' });
    }

    // Get cover image path if uploaded
    let imagePath = '';
    if (req.file) {
      // Store relative path so frontend can resolve it
      imagePath = `/uploads/${req.file.filename}`;
    }

    // Expiry: current time + 7 days
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);

    const newInvitation = new Invitation({
      serviceType,
      slug,
      userData,
      image: imagePath || undefined,
      createdAt,
      expiresAt
    });

    await newInvitation.save();

    res.status(201).json({
      success: true,
      message: 'Invitation generated successfully',
      data: newInvitation
    });
  } catch (error) {
    next(error);
  }
}

// GET: Retrieve public invitation by slug & record analytics
export async function getInvitationBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const invitation = await Invitation.findOne({ slug });

    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found or has expired.' });
    }

    // Track analytics in the background (don't block the response)
    const userAgent = req.headers['user-agent'] || '';
    let deviceType = 'desktop';
    if (/mobile/i.test(userAgent)) {
      deviceType = 'mobile';
    } else if (/tablet/i.test(userAgent)) {
      deviceType = 'tablet';
    }

    const country = (req.headers['cf-ipcountry'] || req.headers['x-vercel-ip-country'] || 'unknown') as string;

    Analytics.create({
      invitationId: invitation._id,
      deviceType,
      country,
      views: 1
    }).catch(err => console.error('Error logging analytics:', err));

    res.status(200).json({
      success: true,
      data: invitation
    });
  } catch (error) {
    next(error);
  }
}

// PUT: Update invitation
export async function updateInvitation(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { serviceType } = req.body;
    let userData = req.body.userData;

    const invitation = await Invitation.findById(id);
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found.' });
    }

    if (serviceType) {
      invitation.serviceType = serviceType;
    }

    if (userData) {
      if (typeof userData === 'string') {
        try {
          userData = JSON.parse(userData);
        } catch (err) {
          return res.status(400).json({ success: false, message: 'Invalid JSON for userData.' });
        }
      }
      invitation.userData = { ...invitation.userData, ...userData };
    }

    // Update image if a new one is uploaded
    if (req.file) {
      // Delete old image
      if (invitation.image) {
        deleteFile(invitation.image);
      }
      invitation.image = `/uploads/${req.file.filename}`;
    }

    await invitation.save();

    res.status(200).json({
      success: true,
      message: 'Invitation updated successfully',
      data: invitation
    });
  } catch (error) {
    next(error);
  }
}

// DELETE: Remove invitation manually
export async function deleteInvitation(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const invitation = await Invitation.findById(id);

    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found.' });
    }

    // Delete image file from storage if it exists
    if (invitation.image) {
      deleteFile(invitation.image);
    }

    await Invitation.findByIdAndDelete(id);

    // Clean up related analytics records
    await Analytics.deleteMany({ invitationId: invitation._id }).catch(err => 
      console.error('Failed to clean up analytics on deletion:', err)
    );

    res.status(200).json({
      success: true,
      message: 'Invitation and its assets deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
}
