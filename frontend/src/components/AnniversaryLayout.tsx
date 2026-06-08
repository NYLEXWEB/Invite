'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, Heart, Sparkles, 
  MessageSquare, Check, ChevronDown 
} from 'lucide-react';
import { CountdownTimer } from './PublicInvitationClient';

interface LayoutProps {
  userData: any;
  serviceType: string;
  slug: string;
  imageSrc: string;
  activeTheme: any;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontHeader: string;
  fontSub: string;
  fontBody: string;
  themeKey: string;
  bgImage: string;
  getDetailedDate: (date?: string) => any;
  formatDate: (date?: string) => string;
  getGoogleCalendarUrl: () => string;
  getMapsUrl: () => string;
  rsvps: any[];
  loadingRsvps: boolean;
  name: string;
  setName: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  submitting: boolean;
  submitSuccess: boolean;
  errorMsg: string;
  handleRSVPSubmit: (e: React.FormEvent) => void;
  celebrated: boolean;
  triggerCelebration: (e: React.MouseEvent) => void;
  particles: any[];
}

export default function AnniversaryLayout({
  userData,
  serviceType,
  imageSrc,
  activeTheme,
  primaryColor,
  secondaryColor,
  backgroundColor,
  fontHeader,
  fontSub,
  fontBody,
  themeKey,
  bgImage,
  getDetailedDate,
  formatDate,
  getGoogleCalendarUrl,
  getMapsUrl,
  rsvps,
  loadingRsvps,
  name,
  setName,
  message,
  setMessage,
  submitting,
  submitSuccess,
  errorMsg,
  handleRSVPSubmit,
  celebrated,
  triggerCelebration,
  particles
}: LayoutProps) {
  return (
    <div 
      className="w-full min-h-screen relative overflow-hidden"
      style={{ 
        backgroundColor, 
        fontFamily: fontBody,
        color: activeTheme.text 
      }}
    >
      {/* Floating hearts */}
      {particles.map(p => (
        <span
          key={p.id}
          className="particle-anim text-2xl animate-float-down"
          style={{
            left: p.x,
            top: p.y,
            color: p.color,
            fontSize: `${p.size}px`,
            '--dx': `${Math.cos(p.angle * Math.PI / 180) * 150}px`,
            '--dy': `${Math.sin(p.angle * Math.PI / 180) * 150}px`,
            '--dr': `${Math.random() * 360}deg`,
            animation: 'float-up-particle 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards'
          } as React.CSSProperties}
        >
          ❤️
        </span>
      ))}

      {/* 1. HERO SECTION - Timeless Split Grid */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-4">
        {/* Parallax Background Cover Image or Watercolor */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {bgImage ? (
            <img 
              src={bgImage} 
              alt="Anniversary Template Background" 
              className="w-full h-full object-cover opacity-35"
            />
          ) : activeTheme.assets.bg ? (
            <img 
              src={activeTheme.assets.bg} 
              alt="Anniversary Default Background" 
              className="w-full h-full object-cover opacity-20"
            />
          ) : (
            <div className="w-full h-full opacity-10 absolute inset-0" style={{ backgroundColor }} />
          )}
          {/* Soft overlay gradient to blend with the rest of the sections */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white border border-[#C8A96B]/20 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Left Visual side */}
          <div className="relative min-h-[300px] md:min-h-full bg-stone-900 flex items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: bgImage ? `url(${bgImage})` : `url('/assets/wedding/couple.png')` }} />
            <div className="relative z-10 text-center space-y-4 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">CELEBRATING</span>
              <h2 className="text-4xl font-light font-playfair tracking-wide leading-tight italic" style={{ color: primaryColor }}>
                {userData.anniversaryYear || 'Years of'} Togetherness
              </h2>
              <Heart className="w-8 h-8 text-[#C8A96B] mx-auto fill-current animate-pulse mt-4" />
            </div>
          </div>

          {/* Right Text side */}
          <div className="p-8 sm:p-12 flex flex-col justify-center text-center space-y-6 bg-[#FAF8F5]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">HAPPY ANNIVERSARY</span>
            <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-gray-900 font-playfair" style={{ fontFamily: fontHeader, color: primaryColor }}>
              {userData.coupleNames || 'The Couple'}
            </h1>
            <p className="text-3xs text-gray-500 tracking-widest uppercase">INVITE YOU TO AN EVENING TO CELEBRATE THEIR JOURNEY OF LOVE</p>

            {/* Split Date */}
            <div className="flex items-center justify-center gap-3 border-y border-[#C8A96B]/20 py-3 text-xs tracking-widest font-light text-gray-600">
              <span className="uppercase">{getDetailedDate(userData.date || userData.weddingDate).weekday}</span>
              <span className="text-2xl font-light text-[#C8A96B] px-3 border-x border-[#C8A96B]/20 font-playfair">
                {getDetailedDate(userData.date || userData.weddingDate).day}
              </span>
              <span className="uppercase">{getDetailedDate(userData.date || userData.weddingDate).monthYear}</span>
            </div>

            <p className="text-[10px] font-medium tracking-widest text-gray-400 uppercase">
              AT {userData.time ? userData.time.toUpperCase() : 'SIX O\'CLOCK IN THE EVENING'}
            </p>
          </div>
        </motion.div>
      </section>

      {/* 2. THE COUPLE INTRO */}
      <section className="relative py-20 px-4 bg-white border-b border-gray-100/40">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center flex-col items-center">
            <Heart className="w-5 h-5 mb-4 stroke-[1.2] fill-current" style={{ color: primaryColor }} />
            <span className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1">THE COUPLE</span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-wide italic" style={{ fontFamily: fontSub, color: primaryColor }}>
              Celebrating Their Love Story
            </h2>
          </div>

          <div className="max-w-md mx-auto bg-stone-50/50 p-8 rounded-3xl border border-[#C8A96B]/10 shadow-xs">
            <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border border-[#C8A96B]/30 p-2 bg-white mb-4">
              {imageSrc ? (
                <img src={imageSrc} alt="Couple" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full bg-stone-100 flex items-center justify-center rounded-full">
                  <Heart className="w-12 h-12 text-[#C8A96B]" />
                </div>
              )}
            </div>
            <h3 className="font-light text-2xl tracking-wide font-playfair text-[#C8A96B]" style={{ fontFamily: fontHeader }}>
              {userData.coupleNames || 'The Couple'}
            </h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs mx-auto mt-2">
              Celebrating years of beautiful memories, enduring love, and an unbreakable bond. Join us to toast to our journey and many more years of happiness!
            </p>
          </div>
        </div>
      </section>

      {/* 3. LOVE TIMELINE / HIGHLIGHTS */}
      <section className="py-20 px-4 bg-[#FAF9F6] border-b border-gray-100/40">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Our Milestones</span>
            <h2 className="text-2xl font-light text-gray-900 font-playfair" style={{ fontFamily: fontHeader }}>Our Love Journey</h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 before:w-[1px] before:bg-[#C8A96B]/30">
            {[
              { title: 'The First Encounter', desc: 'Where two paths crossed and friendship bloomed.' },
              { title: 'The Proposal', desc: 'A beautiful promise of forever under the starlit sky.' },
              { title: 'The Marriage', desc: 'Walking hand in hand into a lifetime of togetherness.' },
              { title: 'Celebrating Today', desc: 'Looking back with gratitude, looking forward with love.' }
            ].map((milestone, idx) => (
              <div key={idx} className="relative pl-10 space-y-1">
                <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-[#C8A96B] border border-white" />
                <h4 className="font-semibold text-sm text-gray-800">{milestone.title}</h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DETAILS */}
      <section className="py-20 px-4 bg-white border-b border-gray-100/40 text-center">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-[#C8A96B]/15 flex flex-col items-center justify-between min-h-[200px]">
            <Calendar className="w-6 h-6 text-[#C8A96B]" />
            <span className="text-3xs uppercase tracking-widest text-gray-400">Date</span>
            <p className="text-xs font-semibold text-gray-800">{formatDate(userData.date || userData.weddingDate)}</p>
            <a href={getGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="text-3xs uppercase tracking-widest text-gray-500 hover:text-gold-500 border border-gray-200 bg-white px-4 py-1.5 rounded-full mt-2">Add Calendar</a>
          </div>

          <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-[#C8A96B]/15 flex flex-col items-center justify-center min-h-[200px]">
            <Clock className="w-6 h-6 text-[#C8A96B]" />
            <span className="text-3xs uppercase tracking-widest text-gray-400">Time</span>
            <p className="text-xl font-light text-[#C8A96B]">{userData.time || '06:00 PM'}</p>
          </div>

          <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-[#C8A96B]/15 flex flex-col items-center justify-between min-h-[200px]">
            <MapPin className="w-6 h-6 text-[#C8A96B]" />
            <span className="text-3xs uppercase tracking-widest text-gray-400">Venue</span>
            <p className="text-xs font-semibold text-gray-800">{userData.venue || 'Taj Banquets'}</p>
            <a href={getMapsUrl()} target="_blank" rel="noopener noreferrer" className="text-3xs uppercase tracking-widest text-gray-500 hover:text-gold-500 border border-gray-200 bg-white px-4 py-1.5 rounded-full mt-2">Directions</a>
          </div>
        </div>
      </section>

      {/* 5. COUNTDOWN */}
      <section className="py-16 px-4 bg-[#FAF9F6] border-b border-gray-100/40 text-center">
        <h2 className="text-xl font-light text-gray-800 mb-6" style={{ fontFamily: fontHeader }}>Event Countdown</h2>
        <CountdownTimer targetDate={userData.date || userData.weddingDate} primaryColor={primaryColor} fontHeader={fontHeader} />
      </section>

      {/* 6. WISH BOX */}
      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-md mx-auto bg-[#FAF8F5] border border-[#C8A96B]/20 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-light text-gray-900 mb-2" style={{ fontFamily: fontHeader }}>Send Anniversary Toast</h2>
          <p className="text-3xs text-gray-400 mb-6">Raise a virtual toast for the beautiful couple!</p>

          <div className="mb-6">
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center cursor-pointer group" onClick={triggerCelebration}>
              <div className={`w-28 h-28 rounded-full bg-white border border-[#C8A96B]/30 flex items-center justify-center shadow-lg transition-transform duration-500 ${!celebrated ? 'heart-pulse' : ''}`}>
                <Heart className={`w-14 h-14 transition-colors duration-500 ${celebrated ? 'text-[#C8A96B] fill-[#C8A96B]' : 'text-gray-300'}`} />
              </div>
            </div>
          </div>

          {submitSuccess ? (
            <p className="text-xs text-green-600 font-semibold">Toast raised successfully!</p>
          ) : (
            <form onSubmit={handleRSVPSubmit} className="space-y-4 text-left">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Warmest congratulations!" rows={2} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs resize-none" />
              <button type="submit" className="w-full bg-[#C8A96B] hover:bg-[#b79555] text-white rounded-full py-2.5 text-3xs font-semibold uppercase tracking-widest">Raise Toast</button>
            </form>
          )}
        </div>
      </section>

      {/* 7. WISHES WALL */}
      <section className="py-20 px-4 bg-[#FAF9F6]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-light text-center text-gray-900 mb-8" style={{ fontFamily: fontHeader }}>Wall of Love</h2>
          {loadingRsvps ? (
            <div className="text-center text-xs text-gray-400">Loading wishes...</div>
          ) : rsvps.length === 0 ? (
            <p className="text-center text-xs text-gray-400">No wishes posted yet.</p>
          ) : (
            <div className="space-y-4">
              {rsvps.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-100 p-4 rounded-xl shadow-2xs">
                  <span className="font-semibold text-xs text-gray-800">{item.name}</span>
                  {item.message && <p className="text-xs text-gray-500 italic mt-1">"{item.message}"</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="py-12 bg-white text-center text-3xs text-gray-400 uppercase tracking-widest border-t border-gray-100/40">
        Thank you for being a part of our love story! ❤️
      </footer>
    </div>
  );
}
