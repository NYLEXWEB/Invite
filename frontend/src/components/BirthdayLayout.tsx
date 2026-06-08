'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, Sparkles, Cake, Gift, Music, 
  GlassWater, MessageSquare, Check, ChevronDown 
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

export default function BirthdayLayout({
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
      {/* Sparkles / Confetti Particle Overlay (Celebration Triggered) */}
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
          {p.shape === 'balloon' ? '🎈' : p.shape === 'heart' ? '❤️' : p.shape === 'gift' ? '🎁' : '✨'}
        </span>
      ))}

      {/* 1. HERO SECTION - Playful Festive Card Style */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-4">
        {/* Parallax Background Cover Image or Watercolor */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {bgImage ? (
            <img 
              src={bgImage} 
              alt="Birthday Template Background" 
              className="w-full h-full object-cover opacity-50"
            />
          ) : activeTheme.assets.bg ? (
            <img 
              src={activeTheme.assets.bg} 
              alt="Birthday Default Background" 
              className="w-full h-full object-cover opacity-30"
            />
          ) : (
            <div className="w-full h-full opacity-10 absolute inset-0" style={{ backgroundColor }} />
          )}
          {/* Soft overlay gradient to blend with the rest of the sections */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>

        {/* Background Balloons decoration */}
        <div className="absolute top-10 left-10 text-4xl opacity-20 animate-bounce z-10">🎈</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-pulse delay-700 z-10">🎁</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-10 animate-bounce delay-300 z-10">🎈</div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-2xl w-full bg-white/80 backdrop-blur-md border border-amber-100 rounded-3xl p-8 sm:p-12 text-center shadow-xl space-y-6 relative"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-400 text-white rounded-full p-3.5 shadow-md">
            <Cake className="w-6 h-6" />
          </div>

          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-400 mt-4 block">
            CELEBRATE THE MILESTONE
          </span>

          <h1 
            className="text-4xl sm:text-6xl font-light tracking-wide leading-tight my-2 text-amber-500 font-playfair"
            style={{ fontFamily: fontHeader, color: primaryColor }}
          >
            {userData.recipientName || userData.name || 'Birthday Star'}
          </h1>

          <div className="flex justify-center items-center gap-1.5 my-3 text-red-500/40">
            <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
          </div>

          <p className="text-sm font-medium tracking-widest text-gray-500 max-w-md mx-auto leading-relaxed">
            INVITE YOU TO CELEBRATE THE BIRTHDAY PARTY OF THE YEAR!
          </p>

          {/* Date & Time Display */}
          <div className="flex items-center justify-center gap-4 border-y border-amber-200/40 py-4 px-6 my-6 text-xs sm:text-sm tracking-widest font-light text-gray-600 max-w-sm w-full mx-auto">
            <span className="uppercase">{getDetailedDate(userData.date || userData.weddingDate).weekday}</span>
            <span className="text-2xl sm:text-3xl font-light text-amber-500 px-4 border-x border-amber-200/40 font-playfair">
              {getDetailedDate(userData.date || userData.weddingDate).day}
            </span>
            <span className="uppercase">{getDetailedDate(userData.date || userData.weddingDate).monthYear}</span>
          </div>

          <p className="text-[10px] sm:text-[11px] font-medium tracking-widest text-gray-400 uppercase">
            AT {userData.time ? userData.time.toUpperCase() : 'SIX O\'CLOCK IN THE EVENING'}
          </p>
        </motion.div>

        <div className="mt-8 animate-bounce text-amber-400 cursor-pointer">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* 2. CELEBRANT STORY PROFILE */}
      <section className="relative py-20 px-4 bg-white border-b border-amber-50">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center flex-col items-center">
            <Cake className="w-5 h-5 mb-4 stroke-[1.2]" style={{ color: primaryColor }} />
            <span className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1">THE HOST</span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-wide italic" style={{ fontFamily: fontSub, color: primaryColor }}>
              A Year Older, A Year Better!
            </h2>
          </div>

          <div className="max-w-md mx-auto bg-amber-50/20 p-8 rounded-3xl border border-amber-100/50 shadow-xs relative">
            <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border border-amber-400/30 p-2 bg-white mb-4">
              {imageSrc ? (
                <img src={imageSrc} alt="Host Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full bg-amber-100 flex items-center justify-center rounded-full">
                  <Cake className="w-12 h-12 text-amber-500" />
                </div>
              )}
            </div>
            <h3 className="font-light text-2xl tracking-wide font-playfair text-amber-600" style={{ fontFamily: fontHeader }}>
              {userData.recipientName || userData.name || 'Birthday Star'}
            </h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs mx-auto mt-2">
              We are gathering to celebrate another wonderful year of life, love, and laughter. Your presence is the greatest gift we could ask for!
            </p>
          </div>

          <div className="max-w-2xl mx-auto pt-6">
            <p className="text-lg sm:text-xl font-light italic leading-relaxed text-gray-500 max-w-xl mx-auto" style={{ fontFamily: fontSub }}>
              &ldquo;{userData.message || 'Another adventure-filled year awaits! Come celebrate this special day and let’s make memories to last a lifetime.'}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 3. AGENDA / EVENT HIGHLIGHTS */}
      <section className="py-20 px-4 bg-amber-50/10 border-b border-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">What’s Happening</span>
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900" style={{ fontFamily: fontHeader }}>
              Party Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { time: '06:00 PM', title: 'Welcome Drinks', desc: 'Guests arrive & cocktails served', icon: GlassWater },
              { time: '07:00 PM', title: 'Cake Cutting', desc: 'Wishes, candles & cake slicing', icon: Cake },
              { time: '08:00 PM', title: 'Games & DJ Beats', desc: 'Get ready to hit the dance floor', icon: Music },
              { time: '09:00 PM', title: 'Grand Dinner Feast', desc: 'Delicious food & desserts', icon: Gift }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-amber-100 rounded-2xl p-6 text-center space-y-3 shadow-2xs">
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto text-amber-500">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400">{item.time}</span>
                  <h4 className="font-semibold text-sm text-gray-800">{item.title}</h4>
                  <p className="text-3xs text-gray-400 leading-relaxed font-light mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EVENT DETAILS (VENUE & MAPS) */}
      <section className="py-20 px-4 bg-[#FAF9F6] border-b border-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Date Card */}
            <div className="bg-white rounded-2xl p-6 border border-amber-100/60 flex flex-col items-center justify-between min-h-[220px]">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4 text-amber-500">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-1">Event Date</h3>
                <p className="text-sm text-gray-800 font-medium">{formatDate(userData.date || userData.weddingDate)}</p>
              </div>
              <a 
                href={getGoogleCalendarUrl()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 w-full rounded-full border border-amber-200 hover:border-amber-400 px-4 py-2 text-3xs font-semibold tracking-widest uppercase text-gray-500 bg-white transition-all duration-300"
              >
                Add Calendar
              </a>
            </div>

            {/* Time Card */}
            <div className="bg-white rounded-2xl p-6 border border-amber-100/60 flex flex-col items-center justify-center min-h-[220px]">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4 text-amber-500">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-1">Party Time</h3>
                <p className="text-xl font-light text-amber-600 tracking-wide">{userData.time || '06:00 PM'}</p>
              </div>
            </div>

            {/* Venue Card */}
            <div className="bg-white rounded-2xl p-6 border border-amber-100/60 flex flex-col items-center justify-between min-h-[220px]">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4 text-amber-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-1">Venue</h3>
                <p className="text-sm text-gray-800 font-medium">{userData.venue || ' Taj Banquets'}</p>
                {userData.address && <p className="text-3xs text-gray-400 mt-1 max-w-[150px] mx-auto truncate" title={userData.address}>{userData.address}</p>}
              </div>
              <a 
                href={getMapsUrl()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 w-full rounded-full border border-amber-200 hover:border-amber-400 px-4 py-2 text-3xs font-semibold tracking-widest uppercase text-gray-500 bg-white transition-all duration-300"
              >
                Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COUNTDOWN TIMER */}
      <section className="py-16 px-4 bg-white border-b border-amber-50 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-amber-400">COUNTING DOWN</span>
          <h2 className="text-2xl sm:text-3xl font-light text-gray-800" style={{ fontFamily: fontHeader }}>
            The Celebration Begins In
          </h2>
          <CountdownTimer 
            targetDate={userData.date || userData.weddingDate} 
            primaryColor={primaryColor} 
            fontHeader={fontHeader}
          />
        </div>
      </section>

      {/* 6. INTERACTIVE WISH BOX */}
      <section className="py-20 px-4 bg-amber-50/5 text-center relative">
        <div className="max-w-md mx-auto bg-white border border-amber-100 rounded-3xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400" />
          <h2 className="text-xl font-light text-gray-900 mb-2" style={{ fontFamily: fontHeader }}>
            Send Birthday Blessings
          </h2>
          <p className="text-3xs text-gray-400 mb-6">Drop a sweet wish for the birthday host!</p>

          <div className="mb-6">
            <div className="relative w-48 h-48 mx-auto flex flex-col justify-center items-center cursor-pointer group" onClick={triggerCelebration}>
              {/* Box Lid */}
              <div className={`w-32 h-7 bg-amber-400 rounded-t-md shadow-md transition-transform duration-700 relative z-10 ${celebrated ? '-translate-y-8 rotate-12 scale-95' : 'group-hover:-translate-y-0.5'}`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-amber-400 rounded-full rotate-45" />
              </div>
              {/* Box Body */}
              <div className="w-28 h-20 bg-amber-50/50 border border-amber-100 rounded-b-md shadow-inner relative overflow-hidden">
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-5 bg-amber-400" />
                {celebrated && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center font-bold text-amber-500 text-[10px] uppercase tracking-widest animate-pulse">
                    Opened! 🎈
                  </div>
                )}
              </div>
            </div>
          </div>

          {submitSuccess ? (
            <div className="py-6 flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center border border-green-200">
                <Check className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-500">Thank you! Your wish has been recorded.</p>
            </div>
          ) : (
            <form onSubmit={handleRSVPSubmit} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Your Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your Name" 
                  className="w-full border border-amber-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Wish Message</label>
                <textarea 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Happy Birthday! Have a great one!" 
                  rows={2}
                  className="w-full border border-amber-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting} 
                className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full py-2.5 text-3xs font-semibold uppercase tracking-widest transition-all duration-300"
              >
                {submitting ? 'Sending...' : 'Send Wishes'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 7. WISH WALL / GUESTBOOK */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Birthday Guestbook</span>
            <h2 className="text-2xl font-light text-gray-900" style={{ fontFamily: fontHeader }}>Wishes Wall</h2>
          </div>

          {loadingRsvps ? (
            <div className="text-center text-xs text-gray-400">Loading wishes...</div>
          ) : rsvps.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-amber-100 rounded-2xl">
              <p className="text-xs text-gray-400">No wishes yet. Be the first to congratulate!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rsvps.map((item, idx) => (
                <div key={idx} className="bg-amber-50/10 border border-amber-100/55 p-4 rounded-xl shadow-3xs relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-xs text-gray-800">{item.name}</span>
                    <span className="text-[9px] text-amber-500">✨ Wish</span>
                  </div>
                  {item.message && <p className="text-xs text-gray-500 italic leading-relaxed">"{item.message}"</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-amber-50/10 text-center text-3xs text-gray-400 uppercase tracking-widest border-t border-amber-100/40">
        We can't wait to celebrate with you! 🎈
      </footer>
    </div>
  );
}
