"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRSVP = createRSVP;
exports.getRSVPsBySlug = getRSVPsBySlug;
const RSVP_1 = require("../models/RSVP");
const Invitation_1 = require("../models/Invitation");
// POST: Submit an RSVP / Greeting message
async function createRSVP(req, res, next) {
    try {
        const { slug } = req.params;
        const { name, attending, guests, message } = req.body;
        if (!name || attending === undefined) {
            return res.status(400).json({ success: false, message: 'Name and attendance status are required.' });
        }
        const invitation = await Invitation_1.Invitation.findOne({ slug });
        if (!invitation) {
            return res.status(404).json({ success: false, message: 'Invitation not found.' });
        }
        const newRSVP = new RSVP_1.RSVP({
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
    }
    catch (error) {
        next(error);
    }
}
// GET: Retrieve all RSVPs/Greetings for an invitation
async function getRSVPsBySlug(req, res, next) {
    try {
        const { slug } = req.params;
        const invitation = await Invitation_1.Invitation.findOne({ slug });
        if (!invitation) {
            return res.status(404).json({ success: false, message: 'Invitation not found.' });
        }
        const rsvps = await RSVP_1.RSVP.find({ invitationId: invitation._id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: rsvps
        });
    }
    catch (error) {
        next(error);
    }
}
