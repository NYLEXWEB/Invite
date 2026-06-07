"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rsvpController_1 = require("../controllers/rsvpController");
const router = (0, express_1.Router)();
// POST: Submit RSVP linked to invitation slug
router.post('/:slug', rsvpController_1.createRSVP);
// GET: Fetch all RSVPs linked to invitation slug
router.get('/:slug', rsvpController_1.getRSVPsBySlug);
exports.default = router;
