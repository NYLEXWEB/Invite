"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDefaultTemplates = seedDefaultTemplates;
exports.getTemplates = getTemplates;
const Template_1 = require("../models/Template");
// Seed default templates if database is empty
async function seedDefaultTemplates() {
    try {
        const count = await Template_1.Template.countDocuments();
        if (count > 0)
            return;
        const defaultTemplates = [
            {
                templateName: 'Royal Luxury Gold',
                serviceType: 'wedding',
                previewImage: '/templates/wedding-gold.webp',
                templateConfig: {
                    fontHeader: 'Cinzel, serif',
                    fontBody: 'Montserrat, sans-serif',
                    primaryColor: '#D4AF37', // Gold
                    secondaryColor: '#1F2937', // Dark Gray
                    backgroundColor: '#FFFFFF',
                    borderStyle: 'double-gold'
                },
                activeStatus: true
            },
            {
                templateName: 'Modern Minimalist Wedding',
                serviceType: 'wedding',
                previewImage: '/templates/wedding-minimal.webp',
                templateConfig: {
                    fontHeader: 'Playfair Display, serif',
                    fontBody: 'Inter, sans-serif',
                    primaryColor: '#111827',
                    secondaryColor: '#6B7280',
                    backgroundColor: '#FAFAFA',
                    borderStyle: 'thin-gray'
                },
                activeStatus: true
            },
            {
                templateName: 'Playful Birthday Celebration',
                serviceType: 'birthday',
                previewImage: '/templates/birthday-fun.webp',
                templateConfig: {
                    fontHeader: 'Outfit, sans-serif',
                    fontBody: 'Inter, sans-serif',
                    primaryColor: '#3B82F6', // Blue
                    secondaryColor: '#F43F5E', // Pink
                    backgroundColor: '#FFFFFF',
                    borderStyle: 'none'
                },
                activeStatus: true
            },
            {
                templateName: 'Elegant Anniversary Gold',
                serviceType: 'anniversary',
                previewImage: '/templates/anniversary-elegant.webp',
                templateConfig: {
                    fontHeader: 'Cinzel, serif',
                    fontBody: 'Montserrat, sans-serif',
                    primaryColor: '#D4AF37',
                    secondaryColor: '#111827',
                    backgroundColor: '#FFFFFF',
                    borderStyle: 'filigree-gold'
                },
                activeStatus: true
            },
            {
                templateName: 'Warm Cozy Housewarming',
                serviceType: 'housewarming',
                previewImage: '/templates/housewarming-warm.webp',
                templateConfig: {
                    fontHeader: 'Playfair Display, serif',
                    fontBody: 'Inter, sans-serif',
                    primaryColor: '#B45309', // Warm Amber
                    secondaryColor: '#374151',
                    backgroundColor: '#FFFFFF',
                    borderStyle: 'dashed-warm'
                },
                activeStatus: true
            },
            {
                templateName: 'Sweet Baby Pastel',
                serviceType: 'babyshower',
                previewImage: '/templates/babyshower-pastel.webp',
                templateConfig: {
                    fontHeader: 'Outfit, sans-serif',
                    fontBody: 'Inter, sans-serif',
                    primaryColor: '#EC4899', // Pastel Pink/Blue accents
                    secondaryColor: '#06B6D4',
                    backgroundColor: '#FCFAFF',
                    borderStyle: 'rounded-pastel'
                },
                activeStatus: true
            },
            {
                templateName: 'Classic Engagement RSVP',
                serviceType: 'engagement',
                previewImage: '/templates/engagement-classic.webp',
                templateConfig: {
                    fontHeader: 'Cinzel, serif',
                    fontBody: 'Montserrat, sans-serif',
                    primaryColor: '#1E3A8A', // Deep Blue
                    secondaryColor: '#D4AF37',
                    backgroundColor: '#FFFFFF',
                    borderStyle: 'thin-gold'
                },
                activeStatus: true
            }
        ];
        await Template_1.Template.insertMany(defaultTemplates);
        console.log('[Database Seed] Default templates seeded successfully.');
    }
    catch (error) {
        console.error('[Database Seed] Error seeding templates:', error);
    }
}
// GET: Retrieve all active templates
async function getTemplates(req, res, next) {
    try {
        const templates = await Template_1.Template.find({ activeStatus: true });
        res.status(200).json({
            success: true,
            data: templates
        });
    }
    catch (error) {
        next(error);
    }
}
