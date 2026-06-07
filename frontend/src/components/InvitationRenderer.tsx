'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Heart, Sparkles } from 'lucide-react';

interface InvitationRendererProps {
  serviceType: string;
  userData: Record<string, any>;
  imageSrc?: string; // Can be a local blob URL or backend URL
  templateConfig?: {
    fontHeader?: string;
    fontBody?: string;
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    bgImage?: string;
    borderStyle?: string;
  };
}

export default function InvitationRenderer({
  serviceType,
  userData,
  imageSrc,
  templateConfig = {}
}: InvitationRendererProps) {
  // Resolve config fallbacks - matching our premium luxury theme
  const fontHeader = templateConfig.fontHeader || 'var(--font-playfair)';
  const fontSub = 'var(--font-cormorant)';
  const fontBody = templateConfig.fontBody || 'var(--font-inter)';
  const primaryColor = templateConfig.primaryColor || '#C8A96B'; // Gold
  const secondaryColor = templateConfig.secondaryColor || '#111111'; // Text
  const backgroundColor = templateConfig.backgroundColor || '#FAF8F5'; // Elegant Ivory
  const borderStyle = templateConfig.borderStyle || 'thin-gold';
  const bgImage = templateConfig.bgImage || '';

  // Format Date beautifully
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  // Generate dynamic border styles based on selected template
  const getBorderClasses = () => {
    switch (borderStyle) {
      case 'none':
        return 'border-0 border-transparent';
      case 'double-gold':
        return 'border-4 border-double';
      case 'filigree-gold':
        return 'border-2 border-dashed';
      case 'thin-gold':
        return 'border border-solid';
      case 'dashed-warm':
        return 'border-2 border-dashed';
      case 'rounded-pastel':
        return 'border-4 border-dotted rounded-3xl';
      case 'thin-gray':
        return 'border border-solid border-gray-200';
      default:
        return 'border border-solid';
    }
  };

  const borderStyleObj = {
    borderColor: `${primaryColor}60`,
  };

  // Resolve cover image fallback based on service type
  const getCoverImage = () => {
    if (imageSrc) return imageSrc;
    const assets: Record<string, string> = {
      wedding: '/assets/wedding/couple.png',
      birthday: '/assets/birthday/hero.png',
      babyshower: '/assets/baby-shower/hero.png',
      anniversary: '/assets/anniversary/hero.png',
      housewarming: '/assets/housewarming/hero.png',
      engagement: '/assets/engagement/hero.png'
    };
    return assets[serviceType.toLowerCase().replace('-', '')] || '/assets/wedding/couple.png';
  };

  const coverImage = getCoverImage();

  return (
    <div 
      className="w-full max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-100 transition-all duration-300 relative bg-white gold-glow"
      style={{ 
        backgroundColor, 
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: fontBody,
        color: secondaryColor
      }}
    >
      {/* Invitation/Greeting Contents */}
      <div className="p-6 sm:p-8 text-center relative">
        
        {/* Floating badge */}
        <div className="flex justify-center mb-6">
          <span 
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-semibold bg-opacity-10 border"
            style={{ 
              color: primaryColor, 
              borderColor: `${primaryColor}30`,
              backgroundColor: `${primaryColor}08`
            }}
          >
            <Sparkles className="w-3 h-3" />
            {serviceType} {userData.mode === 'wish' ? 'Wish Card' : 'Invitation'}
          </span>
        </div>

        {/* Decorative Inner Border Box */}
        <div 
          className={`p-6 sm:p-8 rounded-2xl ${getBorderClasses()}`}
          style={borderStyleObj}
        >
          {userData.mode === 'wish' ? (
            /* =======================================
               GREETING / WISH CARD LAYOUT
               ======================================= */
            <div className="space-y-6">
              {/* Heading depending on type */}
              <div>
                {serviceType === 'wedding' && (
                  <h2 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Congratulations On Your Wedding</h2>
                )}
                {serviceType === 'birthday' && (
                  <h2 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Happy Birthday!</h2>
                )}
                {serviceType === 'anniversary' && (
                  <h2 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Happy Anniversary!</h2>
                )}
                {serviceType === 'housewarming' && (
                  <h2 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Congratulations on Your New Home</h2>
                )}
                {serviceType === 'babyshower' && (
                  <h2 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Best Wishes on Your Baby Shower</h2>
                )}
                {serviceType === 'engagement' && (
                  <h2 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Congratulations on Your Engagement</h2>
                )}
                <h1 
                  className="text-2xl sm:text-3xl font-light tracking-wide leading-tight my-2"
                  style={{ fontFamily: fontHeader, color: primaryColor }}
                >
                  {userData.recipientName || 'Dear Friend'}
                </h1>
              </div>

              {/* Wish Message */}
              <p 
                className="my-5 text-sm leading-relaxed text-gray-500 font-light italic max-w-sm mx-auto"
                style={{ fontFamily: fontSub }}
              >
                &ldquo;{userData.message || 'Wishing you a day filled with love, laughter, and beautiful memories. May this special milestone bring endless joy to your life!'}&rdquo;
              </p>

              {/* Signature Block */}
              <div className="mt-8 pt-6 border-t border-gray-100/60 text-center">
                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">With Warm Wishes From</p>
                <p 
                  className="text-xl font-normal" 
                  style={{ fontFamily: fontHeader, color: primaryColor }}
                >
                  {userData.senderName || 'Your Friend'}
                </p>
                {userData.date && (
                  <p className="text-[8px] text-gray-400 font-light mt-3 tracking-widest uppercase">
                    {formatDate(userData.date)}
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* =======================================
               STANDARD EVENT INVITATION LAYOUT
               ======================================= */
            <>
              {/* Main Headers depending on Service Type */}
              {serviceType === 'wedding' && (
                <div className="space-y-3">
                  <h2 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">The Wedding of</h2>
                  <h1 
                    className="text-2xl sm:text-3xl font-light tracking-wide leading-tight my-2"
                    style={{ fontFamily: fontHeader, color: primaryColor }}
                  >
                    {userData.groomName || 'Arjun'}
                    <span className="block text-xl font-serif italic my-0.5 text-gray-400">&amp;</span>
                    {userData.brideName || 'Meera'}
                  </h1>
                </div>
              )}

              {serviceType === 'birthday' && (
                <div className="space-y-3">
                  <h2 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Celebrating</h2>
                  <h1 
                    className="text-2xl sm:text-3xl font-light tracking-wide leading-tight my-2"
                    style={{ fontFamily: fontHeader, color: primaryColor }}
                  >
                    {userData.name || 'Jane Doe'}
                  </h1>
                  <p className="text-sm font-light italic text-gray-500" style={{ fontFamily: fontSub }}>
                    Turning {userData.age || '—'} Years Old
                  </p>
                </div>
              )}

              {serviceType === 'anniversary' && (
                <div className="space-y-3">
                  <h2 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Happy Anniversary</h2>
                  <h1 
                    className="text-2xl sm:text-3xl font-light tracking-wide leading-tight my-2"
                    style={{ fontFamily: fontHeader, color: primaryColor }}
                  >
                    {userData.coupleNames || 'Couple Names'}
                  </h1>
                  <p className="text-sm font-light italic text-gray-500" style={{ fontFamily: fontSub }}>
                    Celebrating {userData.anniversaryYear || '—'} Years of Love
                  </p>
                </div>
              )}

              {serviceType === 'housewarming' && (
                <div className="space-y-3">
                  <h2 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">New Beginnings</h2>
                  <h1 
                    className="text-2xl sm:text-3xl font-light tracking-wide leading-tight my-2"
                    style={{ fontFamily: fontHeader, color: primaryColor }}
                  >
                    {userData.familyName || 'Family Name'}
                  </h1>
                  <p className="text-sm font-light italic text-gray-500" style={{ fontFamily: fontSub }}>
                    Housewarming Celebration
                  </p>
                </div>
              )}

              {serviceType === 'babyshower' && (
                <div className="space-y-3">
                  <h2 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Welcome Baby</h2>
                  <h1 
                    className="text-2xl sm:text-3xl font-light tracking-wide leading-tight my-2"
                    style={{ fontFamily: fontHeader, color: primaryColor }}
                  >
                    {userData.parentNames || 'Parents'}
                  </h1>
                  <p className="text-sm font-light italic text-gray-500" style={{ fontFamily: fontSub }}>
                    Baby Shower Celebration
                  </p>
                </div>
              )}

              {(serviceType === 'engagement' || serviceType === 'savethedate') && (
                <div className="space-y-3">
                  <h2 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Save the Date</h2>
                  <h1 
                    className="text-2xl sm:text-3xl font-light tracking-wide leading-tight my-2"
                    style={{ fontFamily: fontHeader, color: primaryColor }}
                  >
                    {userData.coupleNames || 'Couple Names'}
                  </h1>
                  <p className="text-sm font-light italic text-gray-500" style={{ fontFamily: fontSub }}>
                    Engagement Announcement
                  </p>
                </div>
              )}

              {/* Invitation Message */}
              <p 
                className="my-5 text-sm leading-relaxed text-gray-500 font-light italic max-w-sm mx-auto"
                style={{ fontFamily: fontSub }}
              >
                &ldquo;{userData.message || 'You are cordially invited to celebrate this special milestone with us. Your presence would mean the world to our family.'}&rdquo;
              </p>

              {/* Event Metadata (Date, Time, Venue) */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col gap-3.5 text-xs text-gray-500 max-w-xs mx-auto">
                {/* Date */}
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4.5 h-4.5 shrink-0" style={{ color: primaryColor }} />
                  <span className="font-light text-left">
                    {formatDate(userData.date || userData.weddingDate)}
                  </span>
                </div>

                {/* Time */}
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4.5 h-4.5 shrink-0" style={{ color: primaryColor }} />
                  <span className="font-light text-left">
                    {userData.time || '—:— AM/PM'}
                  </span>
                </div>

                {/* Venue / Address */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4.5 h-4.5 shrink-0 mt-0.5" style={{ color: primaryColor }} />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{userData.venue || 'Event Venue'}</p>
                    {(userData.address) && (
                      <p className="text-[10px] text-gray-400 mt-0.5 font-light leading-normal">{userData.address}</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Elegant footer decoration */}
        <div className="flex justify-center mt-6 text-gray-200">
          <Heart className="w-3.5 h-3.5 fill-current" style={{ color: `${primaryColor}30` }} />
        </div>
      </div>
    </div>
  );
}
