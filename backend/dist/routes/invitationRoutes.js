"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const invitationController_1 = require("../controllers/invitationController");
const upload_1 = require("../middlewares/upload");
const rateLimiter_1 = require("../middlewares/rateLimiter");
const sanitize_1 = require("../middlewares/sanitize");
const router = (0, express_1.Router)();
// POST: Create invitation with rate limiting, file upload, and sanitization
router.post('/create', rateLimiter_1.creationLimiter, upload_1.upload.single('image'), sanitize_1.sanitizeMiddleware, invitationController_1.createInvitation);
// GET: Retrieve invitation details by slug
router.get('/:slug', invitationController_1.getInvitationBySlug);
// PUT: Update invitation details
router.put('/:id', upload_1.upload.single('image'), sanitize_1.sanitizeMiddleware, invitationController_1.updateInvitation);
// DELETE: Manually delete invitation
router.delete('/:id', invitationController_1.deleteInvitation);
exports.default = router;
