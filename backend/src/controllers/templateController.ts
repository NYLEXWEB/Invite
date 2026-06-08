import { Request, Response, NextFunction } from 'express';
import { Template } from '../models/Template';

// Seed default templates
export async function seedDefaultTemplates() {
  try {
    // Delete any existing templates to ensure we use the new premium set
    await Template.deleteMany({});

    const defaultTemplates = [
      // ==========================================
      // WEDDING CATEGORY (6 templates)
      // ==========================================
      {
        templateName: 'Elegant Floral (Wedding)',
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
        templateName: 'Blush Bloom (Wedding)',
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
        templateName: 'Royal Emerald (Wedding)',
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
        templateName: 'Traditional Heritage (Wedding)',
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
        templateName: 'Minimalist Leaf (Wedding)',
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
        templateName: 'Watercolor Love (Wedding)',
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
      },

      // ==========================================
      // BIRTHDAY CATEGORY (6 templates)
      // ==========================================
      {
        templateName: 'Golden Jubilee (Birthday)',
        serviceType: 'birthday',
        previewImage: '/assets/templates/birthday_gold_black.png',
        templateConfig: {
          fontHeader: 'var(--font-cinzel)',
          fontBody: 'var(--font-montserrat)',
          primaryColor: '#E6C887', // Muted Gold
          secondaryColor: '#FFFFFF', // White text
          backgroundColor: '#0C221C', // Dark Emerald
          bgImage: '/assets/templates/birthday_gold_black.png',
          borderStyle: 'none',
          style: 'Luxury'
        },
        activeStatus: true
      },
      {
        templateName: 'Pastel Confetti (Birthday)',
        serviceType: 'birthday',
        previewImage: '/assets/templates/birthday_pastel_confetti.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#D58E97', // Rose Gold
          secondaryColor: '#4E3E40', // Deep Plum
          backgroundColor: '#FFF2F4',
          bgImage: '/assets/templates/birthday_pastel_confetti.png',
          borderStyle: 'none',
          style: 'Modern'
        },
        activeStatus: true
      },
      {
        templateName: 'Safari Adventure (Birthday)',
        serviceType: 'birthday',
        previewImage: '/assets/templates/birthday_safari.png',
        templateConfig: {
          fontHeader: 'var(--font-cormorant)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#C8A96B', // Gold accent
          secondaryColor: '#2C302E', // Soft grey-green
          backgroundColor: '#FAF8F5',
          bgImage: '/assets/templates/birthday_safari.png',
          borderStyle: 'none',
          style: 'Minimal'
        },
        activeStatus: true
      },
      {
        templateName: 'Retro Disco (Birthday)',
        serviceType: 'birthday',
        previewImage: '/assets/templates/birthday_retro_disco.png',
        templateConfig: {
          fontHeader: 'var(--font-playfair)',
          fontBody: 'var(--font-montserrat)',
          primaryColor: '#E5C07B', // Indian Gold
          secondaryColor: '#FFFFFF', // White text
          backgroundColor: '#4D1115', // Crimson
          bgImage: '/assets/templates/birthday_retro_disco.png',
          borderStyle: 'none',
          style: 'Traditional'
        },
        activeStatus: true
      },
      {
        templateName: 'Floral Elegance (Birthday)',
        serviceType: 'birthday',
        previewImage: '/assets/templates/birthday_floral_elegance.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#B35D67', // Blush Pink
          secondaryColor: '#3A2E2F', // Deep Charcoal Brown
          backgroundColor: '#FAF4F4',
          bgImage: '/assets/templates/birthday_floral_elegance.png',
          borderStyle: 'none',
          style: 'Floral'
        },
        activeStatus: true
      },
      {
        templateName: 'Minimalist Chic (Birthday)',
        serviceType: 'birthday',
        previewImage: '/assets/templates/birthday_minimalist_chic.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#C8A96B', // Gold
          secondaryColor: '#111111', // Charcoal text
          backgroundColor: '#FFFFFF',
          bgImage: '/assets/templates/birthday_minimalist_chic.png',
          borderStyle: 'none',
          style: 'Floral'
        },
        activeStatus: true
      },

      // ==========================================
      // BABY SHOWER CATEGORY (6 templates)
      // ==========================================
      {
        templateName: 'Little Star (Baby Shower)',
        serviceType: 'babyshower',
        previewImage: '/assets/templates/baby_shower_star.png',
        templateConfig: {
          fontHeader: 'var(--font-playfair)',
          fontBody: 'var(--font-montserrat)',
          primaryColor: '#FFF9C4', // Soft Yellow Gold
          secondaryColor: '#FFFFFF',
          backgroundColor: '#1A237E', // Deep Indigo Sky
          bgImage: '/assets/templates/baby_shower_star.png',
          borderStyle: 'none',
          style: 'Luxury'
        },
        activeStatus: true
      },
      {
        templateName: 'Blush Balloon (Baby Shower)',
        serviceType: 'babyshower',
        previewImage: '/assets/templates/baby_shower_blush.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#D81B60', // Rose Gold accent
          secondaryColor: '#4A154B', // Deep Violet Plum
          backgroundColor: '#FCE4EC', // Soft Pink
          bgImage: '/assets/templates/baby_shower_blush.png',
          borderStyle: 'none',
          style: 'Floral'
        },
        activeStatus: true
      },
      {
        templateName: 'Teddy Dream (Baby Shower)',
        serviceType: 'babyshower',
        previewImage: '/assets/templates/baby_shower_teddy.png',
        templateConfig: {
          fontHeader: 'var(--font-cormorant)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#8D6E63', // Soft Teddy Brown
          secondaryColor: '#3E2723',
          backgroundColor: '#FAF8F5', // Creamy White
          bgImage: '/assets/templates/baby_shower_teddy.png',
          borderStyle: 'none',
          style: 'Minimal'
        },
        activeStatus: true
      },
      {
        templateName: 'Gender Reveal Blue (Baby Shower)',
        serviceType: 'babyshower',
        previewImage: '/assets/templates/baby_shower_blue.png',
        templateConfig: {
          fontHeader: 'var(--font-cinzel)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#0D47A1', // Royal Blue
          secondaryColor: '#1A237E',
          backgroundColor: '#E3F2FD', // Sky Pastel Blue
          bgImage: '/assets/templates/baby_shower_blue.png',
          borderStyle: 'none',
          style: 'Modern'
        },
        activeStatus: true
      },
      {
        templateName: 'Gender Reveal Pink (Baby Shower)',
        serviceType: 'babyshower',
        previewImage: '/assets/templates/baby_shower_pink.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#C2185B', // Deep Magenta
          secondaryColor: '#880E4F',
          backgroundColor: '#FCE4EC', // Baby Pink
          bgImage: '/assets/templates/baby_shower_pink.png',
          borderStyle: 'none',
          style: 'Modern'
        },
        activeStatus: true
      },
      {
        templateName: 'Woodland Friends (Baby Shower)',
        serviceType: 'babyshower',
        previewImage: '/assets/templates/baby_shower_woodland.png',
        templateConfig: {
          fontHeader: 'var(--font-playfair)',
          fontBody: 'var(--font-montserrat)',
          primaryColor: '#E64A19', // Terracotta Orange
          secondaryColor: '#4E342E',
          backgroundColor: '#FFF59D', // Warm Custard Yellow
          bgImage: '/assets/templates/baby_shower_woodland.png',
          borderStyle: 'none',
          style: 'Traditional'
        },
        activeStatus: true
      },

      // ==========================================
      // ANNIVERSARY CATEGORY (6 templates)
      // ==========================================
      {
        templateName: 'Silver Jubilee (Anniversary)',
        serviceType: 'anniversary',
        previewImage: '/assets/templates/anniversary_silver.png',
        templateConfig: {
          fontHeader: 'var(--font-cinzel)',
          fontBody: 'var(--font-montserrat)',
          primaryColor: '#B0BEC5', // Platinum Silver
          secondaryColor: '#ECEFF1',
          backgroundColor: '#263238', // Deep Charcoal
          bgImage: '/assets/templates/anniversary_silver.png',
          borderStyle: 'solid',
          style: 'Luxury'
        },
        activeStatus: true
      },
      {
        templateName: 'Golden Milestone (Anniversary)',
        serviceType: 'anniversary',
        previewImage: '/assets/templates/anniversary_gold.png',
        templateConfig: {
          fontHeader: 'var(--font-playfair)',
          fontBody: 'var(--font-montserrat)',
          primaryColor: '#D4AF37', // Antique Gold
          secondaryColor: '#FFFFFF',
          backgroundColor: '#1A0F00', // Noir gold
          bgImage: '/assets/templates/anniversary_gold.png',
          borderStyle: 'none',
          style: 'Luxury'
        },
        activeStatus: true
      },
      {
        templateName: 'Rose Romance (Anniversary)',
        serviceType: 'anniversary',
        previewImage: '/assets/templates/anniversary_rose.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#C2185B', // Crimson Rose
          secondaryColor: '#2C3E50',
          backgroundColor: '#FFF5F5', // Rose Blush Cream
          bgImage: '/assets/templates/anniversary_rose.png',
          borderStyle: 'none',
          style: 'Floral'
        },
        activeStatus: true
      },
      {
        templateName: 'Botanical Love (Anniversary)',
        serviceType: 'anniversary',
        previewImage: '/assets/templates/anniversary_botanical.png',
        templateConfig: {
          fontHeader: 'var(--font-cormorant)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#FFD54F', // Warm Gold Accent
          secondaryColor: '#E8F5E9', // Mint text
          backgroundColor: '#1B5E20', // Forest Emerald Green
          bgImage: '/assets/templates/anniversary_botanical.png',
          borderStyle: 'none',
          style: 'Floral'
        },
        activeStatus: true
      },
      {
        templateName: 'Modern Monochromatic (Anniversary)',
        serviceType: 'anniversary',
        previewImage: '/assets/templates/anniversary_monochrome.png',
        templateConfig: {
          fontHeader: 'var(--font-inter)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#111111',
          secondaryColor: '#212121',
          backgroundColor: '#FAFAFA', // Stark Premium White
          bgImage: '/assets/templates/anniversary_monochrome.png',
          borderStyle: 'none',
          style: 'Minimal'
        },
        activeStatus: true
      },
      {
        templateName: 'Watercolor Dreams (Anniversary)',
        serviceType: 'anniversary',
        previewImage: '/assets/templates/watercolor_love.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#8E24AA', // Purple Orchid
          secondaryColor: '#4A148C',
          backgroundColor: '#F3E5F5', // Lilac Wash
          bgImage: '/assets/templates/watercolor_love.png',
          borderStyle: 'none',
          style: 'Modern'
        },
        activeStatus: true
      },

      // ==========================================
      // HOUSEWARMING CATEGORY (6 templates)
      // ==========================================
      {
        templateName: 'Ganesha Pooja (Housewarming)',
        serviceType: 'housewarming',
        previewImage: '/assets/templates/traditional_heritage.png',
        templateConfig: {
          fontHeader: 'var(--font-playfair)',
          fontBody: 'var(--font-montserrat)',
          primaryColor: '#FFB300', // Marigold Yellow
          secondaryColor: '#FFFFFF',
          backgroundColor: '#D84315', // Sacred Vermilion Red
          bgImage: '/assets/templates/traditional_heritage.png',
          borderStyle: 'solid',
          style: 'Traditional'
        },
        activeStatus: true
      },
      {
        templateName: 'Modern Hearth (Housewarming)',
        serviceType: 'housewarming',
        previewImage: '/assets/templates/royal_green.png',
        templateConfig: {
          fontHeader: 'var(--font-cinzel)',
          fontBody: 'var(--font-montserrat)',
          primaryColor: '#E0A96D', // Warm Sand Gold
          secondaryColor: '#ECEFF1',
          backgroundColor: '#37474F', // Modern Slate Charcoal
          bgImage: '/assets/templates/royal_green.png',
          borderStyle: 'none',
          style: 'Modern'
        },
        activeStatus: true
      },
      {
        templateName: 'Botanical Welcome (Housewarming)',
        serviceType: 'housewarming',
        previewImage: '/assets/templates/minimal_leaf.png',
        templateConfig: {
          fontHeader: 'var(--font-cormorant)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#558B2F', // Olive Leaf
          secondaryColor: '#2E3B1E',
          backgroundColor: '#F1F8E9', // Warm White Sage
          bgImage: '/assets/templates/minimal_leaf.png',
          borderStyle: 'none',
          style: 'Floral'
        },
        activeStatus: true
      },
      {
        templateName: 'Warm Lantern (Housewarming)',
        serviceType: 'housewarming',
        previewImage: '/assets/templates/traditional_heritage.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#FFE082', // Warm Candlelight
          secondaryColor: '#FFFFFF',
          backgroundColor: '#BF360C', // Terracotta Clay
          bgImage: '/assets/templates/traditional_heritage.png',
          borderStyle: 'none',
          style: 'Traditional'
        },
        activeStatus: true
      },
      {
        templateName: 'Minimalist Brick (Housewarming)',
        serviceType: 'housewarming',
        previewImage: '/assets/templates/elegant_floral.png',
        templateConfig: {
          fontHeader: 'var(--font-inter)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#8D6E63', // Earth Clay
          secondaryColor: '#3E2723',
          backgroundColor: '#F5F5F5', // Soft Studio Grey
          bgImage: '/assets/templates/elegant_floral.png',
          borderStyle: 'none',
          style: 'Minimal'
        },
        activeStatus: true
      },
      {
        templateName: 'Cozy Home (Housewarming)',
        serviceType: 'housewarming',
        previewImage: '/assets/templates/watercolor_love.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#1B5E20', // Pine Green
          secondaryColor: '#3E2723',
          backgroundColor: '#C8E6C9', // Pale Mint
          bgImage: '/assets/templates/watercolor_love.png',
          borderStyle: 'none',
          style: 'Modern'
        },
        activeStatus: true
      },

      // ==========================================
      // ENGAGEMENT CATEGORY (6 templates)
      // ==========================================
      {
        templateName: 'Sparkling Rings (Engagement)',
        serviceType: 'engagement',
        previewImage: '/assets/templates/royal_green.png',
        templateConfig: {
          fontHeader: 'var(--font-playfair)',
          fontBody: 'var(--font-montserrat)',
          primaryColor: '#FFD700', // Diamond Gold
          secondaryColor: '#FFFFFF',
          backgroundColor: '#0D47A1', // Classic Sapphire Blue
          bgImage: '/assets/templates/royal_green.png',
          borderStyle: 'none',
          style: 'Luxury'
        },
        activeStatus: true
      },
      {
        templateName: 'Midnight Promise (Engagement)',
        serviceType: 'engagement',
        previewImage: '/assets/templates/traditional_heritage.png',
        templateConfig: {
          fontHeader: 'var(--font-cinzel)',
          fontBody: 'var(--font-montserrat)',
          primaryColor: '#E0A96D', // Champagne Gold
          secondaryColor: '#F5F5F5',
          backgroundColor: '#121212', // Obsidian Black
          bgImage: '/assets/templates/traditional_heritage.png',
          borderStyle: 'solid',
          style: 'Luxury'
        },
        activeStatus: true
      },
      {
        templateName: 'Floral Ring Wreath (Engagement)',
        serviceType: 'engagement',
        previewImage: '/assets/templates/blush_bloom.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#EC407A', // Rose Pink
          secondaryColor: '#4A154B',
          backgroundColor: '#FFEBEE', // Blush Pearl
          bgImage: '/assets/templates/blush_bloom.png',
          borderStyle: 'none',
          style: 'Floral'
        },
        activeStatus: true
      },
      {
        templateName: 'Minimal Promise (Engagement)',
        serviceType: 'engagement',
        previewImage: '/assets/templates/minimal_leaf.png',
        templateConfig: {
          fontHeader: 'var(--font-cormorant)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#3E2723', // Espresso
          secondaryColor: '#5D4037',
          backgroundColor: '#FFFFFF', // Clean Paper White
          bgImage: '/assets/templates/minimal_leaf.png',
          borderStyle: 'none',
          style: 'Minimal'
        },
        activeStatus: true
      },
      {
        templateName: 'Watercolor Engagement (Engagement)',
        serviceType: 'engagement',
        previewImage: '/assets/templates/watercolor_love.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#E64A19', // Coral Orange
          secondaryColor: '#5D4037',
          backgroundColor: '#FFE0B2', // Soft Peach Wash
          bgImage: '/assets/templates/watercolor_love.png',
          borderStyle: 'none',
          style: 'Modern'
        },
        activeStatus: true
      },
      {
        templateName: 'Elegant Script (Engagement)',
        serviceType: 'engagement',
        previewImage: '/assets/templates/elegant_floral.png',
        templateConfig: {
          fontHeader: 'var(--font-script)',
          fontBody: 'var(--font-inter)',
          primaryColor: '#37474F', // Slate Blue-Grey
          secondaryColor: '#263238',
          backgroundColor: '#F9F9F9', // Alabaster White
          bgImage: '/assets/templates/elegant_floral.png',
          borderStyle: 'none',
          style: 'Modern'
        },
        activeStatus: true
      }
    ];

    await Template.insertMany(defaultTemplates);
    console.log('[Database Seed] Premium category-specific templates seeded successfully.');
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
