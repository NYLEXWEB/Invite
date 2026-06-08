'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, Sparkles, Home, Key, 
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

export default function HousewarmingLayout({
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
      {/* Floating particles */}
      {particles.map(p => (
        <span
          key={p.id}
          className="particle-anim text-2xl"
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
          {p.shape === 'gift' ? '🏠' : p.shape === 'sparkle' ? '✨' : '🍃'}
        </span>
      ))}

      {/* Traditional Arch Entrance - Garland on Top */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400 via-orange-500 to-amber-600 flex justify-around items-center text-xs text-white/95 select-none shadow-md z-30 font-serif">
        <span>🌸</span><span>🍃</span><span>🌸</span><span>🍃</span><span>🌸</span><span>🍃</span><span>🌸</span><span>🍃</span><span>🌸</span><span>🍃</span><span>🌸</span><span>🍃</span><span>🌸</span>
      </div>

      {/* 1. HERO SECTION - Traditional Garland / Gateway style */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-4">
        {/* Parallax Background Cover Image or Watercolor */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {bgImage ? (
            <img 
              src={bgImage} 
              alt="Housewarming Template Background" 
              className="w-full h-full object-cover opacity-50"
            />
          ) : activeTheme.assets.bg ? (
            <img 
              src={activeTheme.assets.bg} 
              alt="Housewarming Default Background" 
              className="w-full h-full object-cover opacity-30"
            />
          ) : (
            <div className="w-full h-full opacity-10 absolute inset-0" style={{ backgroundColor }} />
          )}
          {/* Soft overlay gradient to blend with the rest of the sections */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>

        {/* Glowing traditional lamps (Diyas) in corners */}
        <div className="absolute bottom-10 left-10 text-5xl opacity-40 animate-pulse z-10">🪔</div>
        <div className="absolute bottom-10 right-10 text-5xl opacity-40 animate-pulse delay-700 z-10">🪔</div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-2xl w-full bg-orange-50/15 backdrop-blur-md border border-orange-200/40 rounded-3xl p-8 sm:p-12 text-center shadow-xl space-y-6 relative"
          style={{ boxShadow: `0 20px 40px -15px ${primaryColor}15` }}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-orange-500 text-white rounded-full p-3.5 shadow-md">
            <Home className="w-6 h-6" />
          </div>

          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-orange-500 mt-4 block">
            GRIHA PRAVESH INVITATION
          </span>

          <h1 
            className="text-4xl sm:text-5xl font-light tracking-wide leading-tight my-2 text-orange-600 font-playfair"
            style={{ fontFamily: fontHeader, color: primaryColor }}
          >
            {userData.familyName ? `The ${userData.familyName} Family` : 'Our New Nest'}
          </h1>

          <div className="flex justify-center items-center gap-1.5 my-3 text-red-500/40">
            <Sparkles className="w-5 h-5 text-orange-500" />
          </div>

          <p className="text-xs font-semibold tracking-widest text-gray-500 max-w-md mx-auto leading-relaxed">
            CORDIALLY INVITE YOU TO BLESS OUR NEW HOME & GRACE THE OCCASION
          </p>

          {/* Date & Time */}
          <div className="flex items-center justify-center gap-4 border-y border-orange-200/40 py-4 px-6 my-6 text-xs sm:text-sm tracking-widest font-light text-gray-600 max-w-sm w-full mx-auto">
            <span className="uppercase">{getDetailedDate(userData.date || userData.weddingDate).weekday}</span>
            <span className="text-2xl sm:text-3xl font-light text-orange-600 px-4 border-x border-orange-200/40 font-playfair">
              {getDetailedDate(userData.date || userData.weddingDate).day}
            </span>
            <span className="uppercase">{getDetailedDate(userData.date || userData.weddingDate).monthYear}</span>
          </div>

          <p className="text-[10px] sm:text-[11px] font-medium tracking-widest text-gray-400 uppercase">
            AT {userData.time ? userData.time.toUpperCase() : 'NINE O\'CLOCK IN THE MORNING'}
          </p>
        </motion.div>
      </section>

      {/* 2. FAMILY STORY / BLESSINGS */}
      <section className="relative py-20 px-4 bg-white border-b border-orange-50/50">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center flex-col items-center">
            <Home className="w-5 h-5 mb-4 stroke-[1.2]" style={{ color: primaryColor }} />
            <span className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1">THE HOME</span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-wide italic" style={{ fontFamily: fontSub, color: primaryColor }}>
              A Nest Built With Dreams & Love
            </h2>
          </div>

          <div className="max-w-md mx-auto bg-orange-50/5 p-8 rounded-3xl border border-orange-100/50 shadow-xs">
            <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border border-orange-400/20 p-2 bg-white mb-4">
              {imageSrc ? (
                <img src={imageSrc} alt="New Home" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full bg-orange-50 flex items-center justify-center rounded-full">
                  <Key className="w-12 h-12 text-orange-500" />
                </div>
              )}
            </div>
            <h3 className="font-light text-xl tracking-wide font-playfair text-orange-600" style={{ fontFamily: fontHeader }}>
              Our New Beginning
            </h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs mx-auto mt-2">
              Our dream home is finally a reality, and it wouldn't be complete without the warmth of our friends and family. Join us to bless our new house!
            </p>
          </div>
        </div>
      </section>

      {/* 3. POOJA & TIMINGS AGENDA */}
      <section className="py-20 px-4 bg-orange-50/5 border-b border-orange-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Pooja Highlights</span>
            <h2 className="text-2xl font-light text-gray-900 font-playfair" style={{ fontFamily: fontHeader }}>Ceremony Timings</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { time: '08:30 AM', title: 'Griha Pravesh Pooja', desc: 'Auspicious entry & prayers', icon: Home },
              { time: '09:30 AM', title: 'Milk Boiling Ritual', desc: 'Traditional blessing for prosperity', icon: Key },
              { time: '10:30 AM', title: 'House Tour', desc: 'Welcome walk through our new nest', icon: Sparkles },
              { time: '12:00 PM', title: 'Festive Lunch', desc: 'Traditional vegetarian banquet feast', icon: Home }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-orange-100 rounded-2xl p-6 text-center space-y-3 shadow-2xs">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mx-auto text-orange-500">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-orange-400">{item.time}</span>
                  <h4 className="font-semibold text-sm text-gray-800">{item.title}</h4>
                  <p className="text-3xs text-gray-400 leading-relaxed font-light mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DETAILS */}
      <section className="py-20 px-4 bg-[#FAF9F6] border-b border-orange-50 text-center">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-orange-100/60 flex flex-col items-center justify-between min-h-[220px]">
            <Calendar className="w-8 h-8 text-orange-500 mb-2" />
            <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-1">Date</h3>
            <p className="text-sm text-gray-800 font-medium">{formatDate(userData.date || userData.weddingDate)}</p>
            <a href={getGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="mt-4 w-full rounded-full border border-orange-200 px-4 py-2 text-3xs font-semibold uppercase text-gray-500 bg-white">Add Calendar</a>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-orange-100/60 flex flex-col items-center justify-center min-h-[220px]">
            <Clock className="w-8 h-8 text-orange-500 mb-2" />
            <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-1">Time</h3>
            <p className="text-xl font-light text-orange-600">{userData.time || '08:30 AM'}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-orange-100/60 flex flex-col items-center justify-between min-h-[220px]">
            <MapPin className="w-8 h-8 text-orange-500 mb-2" />
            <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-1">Venue</h3>
            <p className="text-sm text-gray-800 font-medium">{userData.venue || 'Taj Banquets'}</p>
            <a href={getMapsUrl()} target="_blank" rel="noopener noreferrer" className="mt-4 w-full rounded-full border border-orange-200 px-4 py-2 text-3xs font-semibold uppercase text-gray-500 bg-white">Directions</a>
          </div>
        </div>
      </section>

      {/* 5. COUNTDOWN */}
      <section className="py-16 px-4 bg-white border-b border-orange-50 text-center">
        <h2 className="text-xl font-light text-gray-800 mb-6" style={{ fontFamily: fontHeader }}>Pooja Countdown</h2>
        <CountdownTimer targetDate={userData.date || userData.weddingDate} primaryColor={primaryColor} fontHeader={fontHeader} />
      </section>

      {/* 6. GUEST BLESSINGS FORM */}
      <section className="py-20 px-4 bg-orange-50/5 text-center">
        <div className="max-w-md mx-auto bg-white border border-orange-100 rounded-3xl p-8 shadow-lg">
          <h2 className="text-xl font-light text-gray-900 mb-2" style={{ fontFamily: fontHeader }}>Bless the New Home</h2>
          <p className="text-3xs text-gray-400 mb-6">Drop your blessings and messages!</p>

          <div className="mb-6">
            <div className="relative w-48 h-48 mx-auto flex flex-col justify-center items-center cursor-pointer group" onClick={triggerCelebration}>
              <div className={`w-32 h-7 bg-orange-500 rounded-t-md transition-transform duration-700 relative z-10 ${celebrated ? '-translate-y-8 rotate-12 scale-95' : ''}`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-orange-500 rounded-full" />
              </div>
              <div className="w-28 h-20 bg-orange-50 border border-orange-100 rounded-b-md shadow-inner relative overflow-hidden">
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-5 bg-orange-500" />
                {celebrated && <div className="absolute inset-0 bg-white/85 flex items-center justify-center font-bold text-orange-600 text-[10px] animate-pulse">Blessed! 🏠</div>}
              </div>
            </div>
          </div>

          {submitSuccess ? (
            <p className="text-xs text-green-600">Your blessings have been recorded. Thank you!</p>
          ) : (
            <form onSubmit={handleRSVPSubmit} className="space-y-4 text-left">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full border border-orange-100 rounded-xl px-3 py-2 text-xs" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Congratulations on your new house! May it be filled with love." rows={2} className="w-full border border-orange-100 rounded-xl px-3 py-2 text-xs resize-none" />
              <button type="submit" className="w-full bg-orange-500 text-white rounded-full py-2.5 text-3xs font-semibold uppercase">Bless Home</button>
            </form>
          )}
        </div>
      </section>

      {/* 7. WALL */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-light text-center text-gray-900 mb-8" style={{ fontFamily: fontHeader }}>Blessings Wall</h2>
          {loadingRsvps ? (
            <div className="text-center text-xs text-gray-400">Loading blessings...</div>
          ) : rsvps.length === 0 ? (
            <p className="text-center text-xs text-gray-400">No blessings left yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rsvps.map((item, idx) => (
                <div key={idx} className="bg-orange-50/10 border border-orange-100/50 p-4 rounded-xl">
                  <span className="font-semibold text-xs text-gray-800">{item.name}</span>
                  {item.message && <p className="text-xs text-gray-500 italic mt-1">"{item.message}"</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="py-12 text-center text-3xs text-gray-400 uppercase tracking-widest">
        Welcome Home! 🏡
      </footer>
    </div>
  );
}
