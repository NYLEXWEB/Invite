"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const templateController_1 = require("../controllers/templateController");
const router = (0, express_1.Router)();
// GET: Retrieve list of active invitation templates
router.get('/', templateController_1.getTemplates);
exports.default = router;
