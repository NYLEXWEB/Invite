"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invitation = void 0;
const mongoose_1 = require("mongoose");
const InvitationSchema = new mongoose_1.Schema({
    serviceType: {
        type: String,
        required: true,
        enum: ['wedding', 'birthday', 'anniversary', 'housewarming', 'babyshower', 'engagement', 'savethedate']
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    userData: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        expires: 0
    }
});
exports.Invitation = (0, mongoose_1.model)('Invitation', InvitationSchema);
