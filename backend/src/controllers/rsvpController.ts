import { Request, Response, NextFunction } from 'express';
import { RSVP } from '../models/RSVP';
import { Invitation } from '../models/Invitation';

// POST: Submit an RSVP / Greeting message
export async function createRSVP(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const { name, attending, guests, message } = req.body;

    if (!name || attending === undefined) {
      return res.status(400).json({ success: false, message: 'Name and attendance status are required.' });
    }

    const invitation = await Invitation.findOne({ slug });
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found.' });
    }

    const newRSVP = new RSVP({
      invitationId: invitation._id,
      name,
      attending: Boolean(attending),
      guests: Number(guests) || 1,
      message: message || undefined,
      expiresAt: invitation.expiresAt // Sync expiry with parent invitation
    });

    await newRSVP.save();

    res.status(201).json({
      success: true,
      message: 'RSVP submitted successfully.',
      data: newRSVP
    });
  } catch (error) {
    next(error);
  }
}

// GET: Retrieve all RSVPs/Greetings for an invitation
export async function getRSVPsBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;

    const invitation = await Invitation.findOne({ slug });
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found.' });
    }

    const rsvps = await RSVP.find({ invitationId: invitation._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: rsvps
    });
  } catch (error) {
    next(error);
  }
}
