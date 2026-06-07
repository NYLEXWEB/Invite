import { Router } from 'express';
import { createRSVP, getRSVPsBySlug } from '../controllers/rsvpController';

const router = Router();

// POST: Submit RSVP linked to invitation slug
router.post('/:slug', createRSVP);

// GET: Fetch all RSVPs linked to invitation slug
router.get('/:slug', getRSVPsBySlug);

export default router;
