"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creationLimiter = exports.apiLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Standard API rate limiter: max 100 requests per 15 minutes
exports.apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false
});
// Invitation creation rate limiter (stricter): max 15 creations per hour per IP to prevent spamming
exports.creationLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 15,
    message: {
        success: false,
        message: 'Too many invitations created from this IP. Limit is 15 per hour.'
    },
    standardHeaders: true,
    legacyHeaders: false
});
