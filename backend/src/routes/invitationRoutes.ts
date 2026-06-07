import { Router } from 'express';
import {
  createInvitation,
  getInvitationBySlug,
  updateInvitation,
  deleteInvitation
} from '../controllers/invitationController';
import { upload } from '../middlewares/upload';
import { creationLimiter } from '../middlewares/rateLimiter';
import { sanitizeMiddleware } from '../middlewares/sanitize';

const router = Router();

// POST: Create invitation with rate limiting, file upload, and sanitization
router.post(
  '/create',
  creationLimiter,
  upload.single('image'),
  sanitizeMiddleware,
  createInvitation
);

// GET: Retrieve invitation details by slug
router.get('/:slug', getInvitationBySlug);

// PUT: Update invitation details
router.put('/:id', upload.single('image'), sanitizeMiddleware, updateInvitation);

// DELETE: Manually delete invitation
router.delete('/:id', deleteInvitation);

export default router;
