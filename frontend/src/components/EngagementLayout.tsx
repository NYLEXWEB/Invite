'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, Sparkles, Gem, Heart, 
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

export default function EngagementLayout({
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
          {p.shape === 'heart' ? '💍' : p.shape === 'sparkle' ? '✨' : '💎'}
        </span>
      ))}

      {/* 1. HERO SECTION - Minimal Modern Luxury */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-4">
        {/* Parallax Background Cover Image or Watercolor */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {bgImage ? (
            <img 
              src={bgImage} 
              alt="Engagement Template Background" 
              className="w-full h-full object-cover opacity-45"
            />
          ) : activeTheme.assets.bg ? (
            <img 
              src={activeTheme.assets.bg} 
              alt="Engagement Default Background" 
              className="w-full h-full object-cover opacity-25"
            />
          ) : (
            <div className="w-full h-full opacity-10 absolute inset-0" style={{ backgroundColor }} />
          )}
          {/* Soft overlay gradient to blend with the rest of the sections */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>

        <div className="absolute top-10 left-10 text-4xl opacity-15 z-10">💎</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-15 z-10">💍</div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl w-full bg-white/70 backdrop-blur-md border border-emerald-100/50 rounded-3xl p-8 sm:p-12 text-center shadow-xl space-y-6 relative"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-emerald-700 text-white rounded-full p-3.5 shadow-md">
            <Gem className="w-6 h-6 animate-pulse" />
          </div>

          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-emerald-600 mt-4 block">
            THE ENGAGEMENT OF
          </span>

          <h1 
            className="text-4xl sm:text-6xl font-light tracking-wide leading-tight my-2 text-emerald-800 font-playfair"
            style={{ fontFamily: fontHeader, color: primaryColor }}
          >
            {userData.groomName || 'Arjun'}
            <span className="block text-2xl font-serif italic my-2 text-gray-400 font-light">&amp;</span>
            {userData.brideName || 'Meera'}
          </h1>

          <div className="flex justify-center items-center gap-1.5 my-3 text-red-500/40">
            <Sparkles className="w-5 h-5 text-emerald-600" />
          </div>

          <p className="text-xs font-semibold tracking-widest text-gray-500 max-w-md mx-auto leading-relaxed">
            INVITE YOU TO CELEBRATE THEIR UNION AND WITNESS THEIR PROMISE OF FOREVER
          </p>

          {/* Date & Time */}
          <div className="flex items-center justify-center gap-4 border-y border-emerald-200/40 py-4 px-6 my-6 text-xs sm:text-sm tracking-widest font-light text-gray-600 max-w-sm w-full mx-auto">
            <span className="uppercase">{getDetailedDate(userData.date || userData.weddingDate).weekday}</span>
            <span className="text-2xl sm:text-3xl font-light text-emerald-700 px-4 border-x border-emerald-200/40 font-playfair">
              {getDetailedDate(userData.date || userData.weddingDate).day}
            </span>
            <span className="uppercase">{getDetailedDate(userData.date || userData.weddingDate).monthYear}</span>
          </div>

          <p className="text-[10px] sm:text-[11px] font-medium tracking-widest text-gray-400 uppercase">
            AT {userData.time ? userData.time.toUpperCase() : 'SIX O\'CLOCK IN THE EVENING'}
          </p>
        </motion.div>
      </section>

      {/* 2. THE COUPLE STORY */}
      <section className="relative py-20 px-4 bg-white border-b border-emerald-50">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center flex-col items-center">
            <Gem className="w-5 h-5 mb-4 stroke-[1.2]" style={{ color: primaryColor }} />
            <span className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1">THE ENGAGED COUPLE</span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-wide italic" style={{ fontFamily: fontSub, color: primaryColor }}>
              A Promise of Forever
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-emerald-50/5 p-6 rounded-2xl border border-emerald-100/30">
              <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border border-emerald-400/20 p-1 bg-white mb-3">
                <img src="/assets/wedding/groom.png" alt="Groom avatar" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="font-light text-lg text-emerald-800 font-playfair">{userData.groomName || 'Arjun'}</h3>
              <p className="text-3xs text-gray-400 mt-1">Ready to promise a lifetime of love and companionship as we seal our engagement.</p>
            </div>

            <div className="bg-emerald-50/5 p-6 rounded-2xl border border-emerald-100/30">
              <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border border-emerald-400/20 p-1 bg-white mb-3">
                <img src="/assets/wedding/bride.png" alt="Bride avatar" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="font-light text-lg text-emerald-800 font-playfair">{userData.brideName || 'Meera'}</h3>
              <p className="text-3xs text-gray-400 mt-1">Walking hand in hand toward a beautiful future starting from this special day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TIMELINE */}
      <section className="py-20 px-4 bg-emerald-50/5 border-b border-emerald-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Ceremony Agenda</span>
            <h2 className="text-2xl font-light text-gray-900 font-playfair" style={{ fontFamily: fontHeader }}>Event Timeline</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { time: '06:00 PM', title: 'Welcome Drinks', desc: 'Greeting of guests & cocktails', icon: Sparkles },
              { time: '07:00 PM', title: 'Ring Exchange', desc: 'The promise of forever', icon: Gem },
              { time: '08:00 PM', title: 'Banquet Dinner', desc: 'Grand dinner feast & toast', icon: Heart }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-emerald-100/60 rounded-2xl p-6 text-center space-y-3 shadow-2xs">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto text-emerald-700">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-600">{item.time}</span>
                  <h4 className="font-semibold text-sm text-gray-800">{item.title}</h4>
                  <p className="text-3xs text-gray-400 leading-relaxed font-light mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DETAILS */}
      <section className="py-20 px-4 bg-[#FAF9F6] border-b border-emerald-50 text-center">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-emerald-100/50 flex flex-col items-center justify-between min-h-[220px]">
            <Calendar className="w-8 h-8 text-emerald-700 mb-2" />
            <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-1">Date</h3>
            <p className="text-sm text-gray-800 font-medium">{formatDate(userData.date || userData.weddingDate)}</p>
            <a href={getGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="mt-4 w-full rounded-full border border-emerald-200 px-4 py-2 text-3xs font-semibold text-gray-500 bg-white">Add Calendar</a>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-100/50 flex flex-col items-center justify-center min-h-[220px]">
            <Clock className="w-8 h-8 text-emerald-700 mb-2" />
            <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-1">Time</h3>
            <p className="text-xl font-light text-emerald-800">{userData.time || '06:00 PM'}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-100/50 flex flex-col items-center justify-between min-h-[220px]">
            <MapPin className="w-8 h-8 text-emerald-700 mb-2" />
            <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-1">Venue</h3>
            <p className="text-sm text-gray-800 font-medium">{userData.venue || 'Taj Banquets'}</p>
            <a href={getMapsUrl()} target="_blank" rel="noopener noreferrer" className="mt-4 w-full rounded-full border border-emerald-200 px-4 py-2 text-3xs font-semibold text-gray-500 bg-white">Directions</a>
          </div>
        </div>
      </section>

      {/* 5. COUNTDOWN */}
      <section className="py-16 px-4 bg-white border-b border-emerald-50 text-center">
        <h2 className="text-xl font-light text-gray-800 mb-6" style={{ fontFamily: fontHeader }}>Engagement Countdown</h2>
        <CountdownTimer targetDate={userData.date || userData.weddingDate} primaryColor={primaryColor} fontHeader={fontHeader} />
      </section>

      {/* 6. TOAST BOX */}
      <section className="py-20 px-4 bg-emerald-50/5 text-center">
        <div className="max-w-md mx-auto bg-white border border-emerald-100 rounded-3xl p-8 shadow-lg">
          <h2 className="text-xl font-light text-gray-900 mb-2" style={{ fontFamily: fontHeader }}>Send Engagement Toast</h2>
          <p className="text-3xs text-gray-400 mb-6">Drop your sweet wishes for the engaged couple!</p>

          <div className="mb-6">
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center cursor-pointer group" onClick={triggerCelebration}>
              <div className={`w-28 h-28 rounded-full bg-white border border-emerald-700/25 flex items-center justify-center shadow-lg transition-transform duration-500 ${!celebrated ? 'heart-pulse' : ''}`}>
                <Gem className={`w-12 h-12 transition-colors duration-500 ${celebrated ? 'text-emerald-700' : 'text-gray-300'}`} />
              </div>
            </div>
          </div>

          {submitSuccess ? (
            <p className="text-xs text-green-600">Wish sent successfully! Thank you.</p>
          ) : (
            <form onSubmit={handleRSVPSubmit} className="space-y-4 text-left">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full border border-emerald-100 rounded-xl px-3 py-2 text-xs" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Congratulations to the lovely couple!" rows={2} className="w-full border border-emerald-100 rounded-xl px-3 py-2 text-xs resize-none" />
              <button type="submit" className="w-full bg-emerald-700 text-white rounded-full py-2.5 text-3xs font-semibold uppercase">Toast Couple</button>
            </form>
          )}
        </div>
      </section>

      {/* 7. WISH WALL */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-light text-center text-gray-900 mb-8" style={{ fontFamily: fontHeader }}>Greetings Wall</h2>
          {loadingRsvps ? (
            <div className="text-center text-xs text-gray-400">Loading wishes...</div>
          ) : rsvps.length === 0 ? (
            <p className="text-center text-xs text-gray-400">No wishes yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rsvps.map((item, idx) => (
                <div key={idx} className="bg-emerald-50/10 border border-emerald-100/40 p-4 rounded-xl">
                  <span className="font-semibold text-xs text-gray-800">{item.name}</span>
                  {item.message && <p className="text-xs text-gray-500 italic mt-1">"{item.message}"</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="py-12 text-center text-3xs text-gray-400 uppercase tracking-widest">
        Thank you for sharing in our joy! ✨
      </footer>
    </div>
  );
}
