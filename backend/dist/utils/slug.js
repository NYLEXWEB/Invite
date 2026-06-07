"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = generateSlug;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Generates a random, secure, uppercase alphanumeric slug.
 * Example format: AB12CD34 (length = 8)
 */
function generateSlug(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const bytes = crypto_1.default.randomBytes(length);
    let slug = '';
    for (let i = 0; i < length; i++) {
        slug += chars[bytes[i] % chars.length];
    }
    return slug;
}
