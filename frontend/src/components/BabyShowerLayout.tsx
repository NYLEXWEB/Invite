'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, Sparkles, Heart, Gift, 
  MessageSquare, Check, ChevronDown, Cloud, Star 
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

export default function BabyShowerLayout({
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
      {/* Floating particles (Star/Cloud) */}
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
          {p.shape === 'heart' ? '🍼' : p.shape === 'sparkle' ? '⭐' : '☁️'}
        </span>
      ))}

      {/* 1. DREAMY sky HERO SECTION */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-4">
        {/* Parallax Background Cover Image or Watercolor */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {bgImage ? (
            <img 
              src={bgImage} 
              alt="Baby Shower Template Background" 
              className="w-full h-full object-cover opacity-50"
            />
          ) : activeTheme.assets.bg ? (
            <img 
              src={activeTheme.assets.bg} 
              alt="Baby Shower Default Background" 
              className="w-full h-full object-cover opacity-30"
            />
          ) : (
            <div className="w-full h-full opacity-10 absolute inset-0" style={{ backgroundColor }} />
          )}
          {/* Soft overlay gradient to blend with the rest of the sections */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>

        <div className="absolute top-16 left-12 text-6xl opacity-15 animate-pulse z-10">☁️</div>
        <div className="absolute top-36 right-16 text-5xl opacity-15 animate-bounce z-10">⭐</div>
        <div className="absolute bottom-28 left-20 text-7xl opacity-10 z-10">☁️</div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-2xl w-full bg-white/70 backdrop-blur-lg border border-purple-100 rounded-3xl p-8 sm:p-12 text-center shadow-lg space-y-6 relative"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-purple-400 text-white rounded-full p-3.5 shadow-md">
            <Sparkles className="w-6 h-6 animate-spin" />
          </div>

          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-purple-400 mt-4 block">
            A LITTLE STAR IS ON THE WAY
          </span>

          <h1 
            className="text-4xl sm:text-5xl font-light tracking-wide leading-tight my-2 text-purple-600 font-playfair animate-pulse"
            style={{ fontFamily: fontHeader, color: primaryColor }}
          >
            {userData.parentNames || 'Parents-to-Be'}
          </h1>

          <p className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
            CORDIALLY INVITE YOU TO SHARE IN OUR JOY AT A BABY SHOWER
          </p>

          {/* Date & Time */}
          <div className="flex items-center justify-center gap-4 border-y border-purple-200/40 py-4 px-6 my-6 text-xs sm:text-sm tracking-widest font-light text-gray-600 max-w-sm w-full mx-auto">
            <span className="uppercase">{getDetailedDate(userData.date || userData.weddingDate).weekday}</span>
            <span className="text-2xl sm:text-3xl font-light text-purple-500 px-4 border-x border-purple-200/40 font-playfair">
              {getDetailedDate(userData.date || userData.weddingDate).day}
            </span>
            <span className="uppercase">{getDetailedDate(userData.date || userData.weddingDate).monthYear}</span>
          </div>

          <p className="text-[10px] sm:text-[11px] font-medium tracking-widest text-gray-400 uppercase">
            AT {userData.time ? userData.time.toUpperCase() : 'THREE O\'CLOCK IN THE AFTERNOON'}
          </p>
        </motion.div>
      </section>

      {/* 2. PARENTS & BABY CRIB STORIES */}
      <section className="relative py-20 px-4 bg-white border-b border-purple-50/50">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center flex-col items-center">
            <Cloud className="w-5 h-5 mb-4 stroke-[1.2]" style={{ color: primaryColor }} />
            <span className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1">THE DETAILS</span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-wide italic" style={{ fontFamily: fontSub, color: primaryColor }}>
              Growing By Two Little Feet
            </h2>
          </div>

          <div className="max-w-md mx-auto bg-purple-50/10 p-8 rounded-3xl border border-purple-100/40 shadow-xs">
            <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border border-purple-400/20 p-2 bg-white mb-4">
              {imageSrc ? (
                <img src={imageSrc} alt="Baby Shower Decor" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full bg-purple-50 flex items-center justify-center rounded-full">
                  <Star className="w-12 h-12 text-purple-400" />
                </div>
              )}
            </div>
            <h3 className="font-light text-xl tracking-wide font-playfair text-purple-700" style={{ fontFamily: fontHeader }}>
              Baby Shower Celebration
            </h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs mx-auto mt-2">
              Join us to shower the parents-to-be with love, laughter, and best wishes before the little one arrives!
            </p>
          </div>
        </div>
      </section>

      {/* 3. EVENT TIMELINE */}
      <section className="py-20 px-4 bg-purple-50/5 border-b border-purple-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Baby Shower Activities</span>
            <h2 className="text-2xl font-light text-gray-900 font-playfair" style={{ fontFamily: fontHeader }}>Event Timeline</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { time: '03:00 PM', title: 'Welcome & High Tea', desc: 'Sweets & refreshments served', icon: Cloud },
              { time: '04:00 PM', title: 'Baby Shower Games', desc: 'Baby trivia, name guessing & bingo', icon: Star },
              { time: '05:00 PM', title: 'Cake Cutting', desc: 'Sweet treats & photo session', icon: Sparkles },
              { time: '05:30 PM', title: 'Gift Opening', desc: 'Opening shower gifts with parents', icon: Gift }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-purple-100 rounded-2xl p-6 text-center space-y-3 shadow-2xs">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mx-auto text-purple-500">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-purple-400">{item.time}</span>
                  <h4 className="font-semibold text-sm text-gray-800">{item.title}</h4>
                  <p className="text-3xs text-gray-400 leading-relaxed font-light mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DETAILS CARD */}
      <section className="py-20 px-4 bg-[#FAF9F6] border-b border-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-2xl p-6 border border-purple-100/60 flex flex-col items-center justify-between min-h-[220px]">
              <Calendar className="w-8 h-8 text-purple-500 mb-2" />
              <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-1">Date</h3>
              <p className="text-sm text-gray-800 font-medium">{formatDate(userData.date || userData.weddingDate)}</p>
              <a href={getGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="mt-4 w-full rounded-full border border-purple-200 px-4 py-2 text-3xs font-semibold uppercase text-gray-500 bg-white">Add Calendar</a>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-purple-100/60 flex flex-col items-center justify-center min-h-[220px]">
              <Clock className="w-8 h-8 text-purple-500 mb-2" />
              <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-1">Time</h3>
              <p className="text-xl font-light text-purple-600">{userData.time || '03:00 PM'}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-purple-100/60 flex flex-col items-center justify-between min-h-[220px]">
              <MapPin className="w-8 h-8 text-purple-500 mb-2" />
              <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-1">Venue</h3>
              <p className="text-sm text-gray-800 font-medium">{userData.venue || 'Taj Banquets'}</p>
              <a href={getMapsUrl()} target="_blank" rel="noopener noreferrer" className="mt-4 w-full rounded-full border border-purple-200 px-4 py-2 text-3xs font-semibold uppercase text-gray-500 bg-white">Directions</a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COUNTDOWN */}
      <section className="py-16 px-4 bg-white border-b border-purple-50 text-center">
        <h2 className="text-xl font-light text-gray-800 mb-6" style={{ fontFamily: fontHeader }}>Baby Shower Countdown</h2>
        <CountdownTimer targetDate={userData.date || userData.weddingDate} primaryColor={primaryColor} fontHeader={fontHeader} />
      </section>

      {/* 6. WISH REGISTRY BOX */}
      <section className="py-20 px-4 bg-purple-50/5 text-center">
        <div className="max-w-md mx-auto bg-white border border-purple-100 rounded-3xl p-8 shadow-lg">
          <h2 className="text-xl font-light text-gray-900 mb-2" style={{ fontFamily: fontHeader }}>Wisdom Registry</h2>
          <p className="text-3xs text-gray-400 mb-6">Leave some parenting tips or warm wishes!</p>

          <div className="mb-6">
            <div className="relative w-48 h-48 mx-auto flex flex-col justify-center items-center cursor-pointer group" onClick={triggerCelebration}>
              <div className={`w-32 h-7 bg-purple-400 rounded-t-md transition-transform duration-700 relative z-10 ${celebrated ? '-translate-y-8 rotate-12 scale-95' : ''}`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-purple-400 rounded-full" />
              </div>
              <div className="w-28 h-20 bg-purple-50 border border-purple-100 rounded-b-md shadow-inner relative overflow-hidden">
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-5 bg-purple-400" />
                {celebrated && <div className="absolute inset-0 bg-white/85 flex items-center justify-center font-bold text-purple-600 text-[10px] animate-pulse">Open! 🍼</div>}
              </div>
            </div>
          </div>

          {submitSuccess ? (
            <p className="text-xs text-green-600">Wish sent successfully! Thank you.</p>
          ) : (
            <form onSubmit={handleRSVPSubmit} className="space-y-4 text-left">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full border border-purple-100 rounded-xl px-3 py-2 text-xs" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Wishing you parenting bliss!" rows={2} className="w-full border border-purple-100 rounded-xl px-3 py-2 text-xs resize-none" />
              <button type="submit" className="w-full bg-purple-500 text-white rounded-full py-2.5 text-3xs font-semibold uppercase">Send Wish</button>
            </form>
          )}
        </div>
      </section>

      {/* 7. WISH WALL */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-light text-center text-gray-900 mb-8" style={{ fontFamily: fontHeader }}>Wisdom Wall</h2>
          {loadingRsvps ? (
            <div className="text-center text-xs text-gray-400">Loading wishes...</div>
          ) : rsvps.length === 0 ? (
            <p className="text-center text-xs text-gray-400">No wisdom shared yet!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rsvps.map((item, idx) => (
                <div key={idx} className="bg-purple-50/10 border border-purple-100/50 p-4 rounded-xl">
                  <span className="font-semibold text-xs text-gray-800">{item.name}</span>
                  {item.message && <p className="text-xs text-gray-500 italic mt-1">"{item.message}"</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="py-12 text-center text-3xs text-gray-400 uppercase tracking-widest">
        We can't wait to welcome our baby with you! ✨
      </footer>
    </div>
  );
}
