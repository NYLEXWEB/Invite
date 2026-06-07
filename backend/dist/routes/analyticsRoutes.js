"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyticsController_1 = require("../controllers/analyticsController");
const router = (0, express_1.Router)();
// GET: Retrieve views and device/country breakdowns
router.get('/', analyticsController_1.getAnalytics);
exports.default = router;
