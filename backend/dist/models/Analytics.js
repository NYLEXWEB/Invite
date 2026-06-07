"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analytics = void 0;
const mongoose_1 = require("mongoose");
const AnalyticsSchema = new mongoose_1.Schema({
    invitationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Invitation',
        required: true,
        index: true
    },
    views: {
        type: Number,
        default: 1,
        required: true
    },
    deviceType: {
        type: String,
        required: true,
        default: 'unknown'
    },
    country: {
        type: String,
        required: true,
        default: 'unknown'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});
// Create index for fast lookups on aggregation queries
AnalyticsSchema.index({ invitationId: 1, createdAt: -1 });
exports.Analytics = (0, mongoose_1.model)('Analytics', AnalyticsSchema);
