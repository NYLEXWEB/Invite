"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeMiddleware = sanitizeMiddleware;
// Recursive helper to sanitize objects and strings
function sanitizeInput(data) {
    if (typeof data === 'string') {
        // Strip script tags and HTML tags, escape characters
        return data
            .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '') // Strip script blocks
            .replace(/<\/?[^>]+(>|$)/g, '') // Strip all HTML tags
            .trim();
    }
    if (Array.isArray(data)) {
        return data.map(item => sanitizeInput(item));
    }
    if (data !== null && typeof data === 'object') {
        const sanitized = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                sanitized[key] = sanitizeInput(data[key]);
            }
        }
        return sanitized;
    }
    return data;
}
function sanitizeMiddleware(req, res, next) {
    if (req.body) {
        req.body = sanitizeInput(req.body);
    }
    if (req.query) {
        req.query = sanitizeInput(req.query);
    }
    if (req.params) {
        req.params = sanitizeInput(req.params);
    }
    next();
}
