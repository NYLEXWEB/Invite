import { Request, Response, NextFunction } from 'express';
import { Template } from '../models/Template';

// Seed default templates
export async function seedDefaultTemplates() {
  try {
    // Delete any existing templates to ensure we use the new premium set
    await Template.deleteMany({});

    const defaultTemplates = [
      {
        templateName: 'Elegant Floral',
        serviceType: 'wedding',
        previewImage: '/assets/templates/elegant_floral.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#C8A96B', // Gold
          secondaryColor: '#111111', // Charcoal text
          backgroundColor: '#FFFFFF',
          bgImage: '/assets/templates/elegant_floral.png',
          borderStyle: 'none',
          style: 'Floral'
        },
        activeStatus: true
      },
      {
        templateName: 'Blush Bloom',
        serviceType: 'wedding',
        previewImage: '/assets/templates/blush_bloom.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#B35D67', // Blush Pink
          secondaryColor: '#3A2E2F', // Deep Charcoal Brown
          backgroundColor: '#FAF4F4',
          bgImage: '/assets/templates/blush_bloom.png',
          borderStyle: 'none',
          style: 'Floral'
        },
        activeStatus: true
      },
      {
        templateName: 'Royal Green',
        serviceType: 'wedding',
        previewImage: '/assets/templates/royal_green.png',
        templateConfig: {
          fontHeader: 'var(--font-cinzel)',
          fontBody: 'var(--font-montserrat)',
          primaryColor: '#E6C887', // Muted Gold
          secondaryColor: '#FFFFFF', // White text on dark green
          backgroundColor: '#0C221C', // Dark Emerald
          bgImage: '/assets/templates/royal_green.png',
          borderStyle: 'none',
          style: 'Luxury'
        },
        activeStatus: true
      },
      {
        templateName: 'Traditional Heritage',
        serviceType: 'wedding',
        previewImage: '/assets/templates/traditional_heritage.png',
        templateConfig: {
          fontHeader: 'var(--font-playfair)',
          fontBody: 'var(--font-montserrat)',
          primaryColor: '#E5C07B', // Indian Gold
          secondaryColor: '#FFFFFF', // White text
          backgroundColor: '#4D1115', // Crimson
          bgImage: '/assets/templates/traditional_heritage.png',
          borderStyle: 'none',
          style: 'Traditional'
        },
        activeStatus: true
      },
      {
        templateName: 'Minimal Leaf',
        serviceType: 'wedding',
        previewImage: '/assets/templates/minimal_leaf.png',
        templateConfig: {
          fontHeader: 'var(--font-cormorant)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#C8A96B', // Gold accent
          secondaryColor: '#2C302E', // Soft grey-green
          backgroundColor: '#FAF8F5',
          bgImage: '/assets/templates/minimal_leaf.png',
          borderStyle: 'none',
          style: 'Minimal'
        },
        activeStatus: true
      },
      {
        templateName: 'Watercolor Love',
        serviceType: 'wedding',
        previewImage: '/assets/templates/watercolor_love.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#D58E97', // Rose Gold
          secondaryColor: '#4E3E40', // Deep Plum
          backgroundColor: '#FFF2F4',
          bgImage: '/assets/templates/watercolor_love.png',
          borderStyle: 'none',
          style: 'Modern'
        },
        activeStatus: true
      }
    ];

    // Seed these for all occasion categories to make them universally selectable
    const allOccasionTemplates: any[] = [];
    const occasionTypes = ['wedding', 'birthday', 'anniversary', 'housewarming', 'babyshower', 'engagement', 'savethedate'];
    
    occasionTypes.forEach(type => {
      defaultTemplates.forEach(tpl => {
        allOccasionTemplates.push({
          ...tpl,
          templateName: `${tpl.templateName} (${type})`,
          serviceType: type,
          // Unique template name required by MongoDB unique constraint
          templateNameUnique: `${tpl.templateName}-${type}`
        });
      });
    });

    // Mongoose schema uses templateName as unique, so let's adjust it
    const finalSeed = allOccasionTemplates.map(t => ({
      templateName: `${t.templateName}`,
      serviceType: t.serviceType,
      previewImage: t.previewImage,
      templateConfig: t.templateConfig,
      activeStatus: t.activeStatus
    }));

    await Template.insertMany(finalSeed);
    console.log('[Database Seed] Premium templates seeded successfully for all occasions.');
  } catch (error) {
    console.error('[Database Seed] Error seeding templates:', error);
  }
}

// GET: Retrieve all active templates
export async function getTemplates(req: Request, res: Response, next: NextFunction) {
  try {
    const templates = await Template.find({ activeStatus: true });
    res.status(200).json({
      success: true,
      data: templates
    });
  } catch (error) {
    next(error);
  }
}
