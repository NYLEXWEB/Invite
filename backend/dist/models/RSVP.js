"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSVP = void 0;
const mongoose_1 = require("mongoose");
const RSVPSchema = new mongoose_1.Schema({
    invitationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Invitation',
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    attending: {
        type: Boolean,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        default: 1
    },
    message: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        expires: 0 // Expire exactly at the expiresAt date
    }
});
exports.RSVP = (0, mongoose_1.model)('RSVP', RSVPSchema);
