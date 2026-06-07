"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const mongoose_1 = require("mongoose");
const TemplateSchema = new mongoose_1.Schema({
    templateName: {
        type: String,
        required: true,
        unique: true
    },
    serviceType: {
        type: String,
        required: true,
        enum: ['wedding', 'birthday', 'anniversary', 'housewarming', 'babyshower', 'engagement', 'savethedate', 'all']
    },
    previewImage: {
        type: String
    },
    templateConfig: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
        default: {}
    },
    activeStatus: {
        type: Boolean,
        required: true,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.Template = (0, mongoose_1.model)('Template', TemplateSchema);
