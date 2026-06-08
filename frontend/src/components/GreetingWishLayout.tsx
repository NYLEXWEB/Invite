'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Sparkles, Cake, Gift, Home, Gem, Mail, 
  MessageSquare, Check, AlertCircle, Send, Volume2, VolumeX, Share2
} from 'lucide-react';
import { FloatingParticles } from './PublicInvitationClient';

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

export default function GreetingWishLayout({
  userData,
  serviceType,
  activeTheme,
  primaryColor,
  backgroundColor,
  fontHeader,
  fontBody,
  themeKey,
  bgImage,
  formatDate,
  rsvps,
  loadingRsvps,
  name,
  setName,
  message,
  setMessage,
  submitting,
  submitSuccess,
  errorMsg,
  handleRSVPSubmit
}: LayoutProps) {
  const [envelopeState, setEnvelopeState] = useState<'closed' | 'opening' | 'opened'>('closed');
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [popParticles, setPopParticles] = useState<{ id: number; x: number; y: number; char: string; color: string }[]>([]);

  // Setup audio player
  useEffect(() => {
    if (activeTheme?.musicUrl) {
      const audio = new Audio(activeTheme.musicUrl);
      audio.loop = true;
      audioRef.current = audio;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [activeTheme?.musicUrl]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log('Audio play blocked:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleOpenEnvelope = () => {
    setEnvelopeState('opening');
    
    // Play open chime sound effect
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(329.63, audioCtx.currentTime); // E4
      osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.35); // E5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch {}

    // Transition to fully opened and auto-play music
    setTimeout(() => {
      setEnvelopeState('opened');
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log('Audio blocked:', err));
      }
      // Trigger a confetti burst
      triggerPopper();
    }, 1000);
  };

  // Copy Link utility
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Occasion popper effect
  const triggerPopper = () => {
    const chars = ['🎉', '✨', '💖', '🎈', '🌸', '⭐', '🤍'];
    const colors = ['#C8A96B', '#F59E0B', '#EF4444', '#EC4899', '#3B82F6', '#10B981'];
    const list: { id: number; x: number; y: number; char: string; color: string }[] = [];
    for (let i = 0; i < 40; i++) {
      list.push({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        char: chars[Math.floor(Math.random() * chars.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setPopParticles(prev => [...prev, ...list]);
    setTimeout(() => {
      setPopParticles([]);
    }, 2000);
  };

  // Determine occasion details
  const getOccasionConfig = () => {
    switch (serviceType) {
      case 'birthday':
        return {
          icon: <Cake className="w-8 h-8 text-amber-500 animate-bounce" />,
          emoji: '🎈',
          label: 'Happy Birthday Wish Card',
          tagline: 'A Golden Milestone Greeting',
          bgGradient: 'from-amber-50/40 via-white/80 to-orange-50/30'
        };
      case 'anniversary':
        return {
          icon: <Heart className="w-8 h-8 text-rose-500 animate-pulse fill-current" />,
          emoji: '🌹',
          label: 'Anniversary Wishing Card',
          tagline: 'Celebrating Eternal Love',
          bgGradient: 'from-rose-50/40 via-white/80 to-amber-50/30'
        };
      case 'babyshower':
        return {
          icon: <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />,
          emoji: '🍼',
          label: 'Baby Shower Blessing Card',
          tagline: 'Welcoming New Blessings',
          bgGradient: 'from-blue-50/40 via-white/80 to-purple-50/30'
        };
      case 'housewarming':
        return {
          icon: <Home className="w-8 h-8 text-emerald-500 animate-bounce" />,
          emoji: '🏡',
          label: 'Housewarming Wishing Card',
          tagline: 'Warmest Home Sweet Home Wishes',
          bgGradient: 'from-emerald-50/40 via-white/80 to-teal-50/30'
        };
      case 'engagement':
        return {
          icon: <Gem className="w-8 h-8 text-blue-500 animate-pulse" />,
          emoji: '💍',
          label: 'Engagement Congratulation Card',
          tagline: 'Honoring Your Beautiful Bond',
          bgGradient: 'from-cyan-50/40 via-white/80 to-indigo-50/30'
        };
      default:
        return {
          icon: <Gift className="w-8 h-8 text-amber-500 animate-bounce" />,
          emoji: '✨',
          label: 'Celebration Wishes Card',
          tagline: 'Sharing Joy & Warm Wishes',
          bgGradient: 'from-amber-50/40 via-white/80 to-amber-50/30'
        };
    }
  };

  const oConfig = getOccasionConfig();

  return (
    <div 
      className="w-full min-h-screen relative flex flex-col justify-start items-center overflow-x-hidden py-12 px-4 transition-all duration-700 bg-cover bg-center"
      style={{ 
        backgroundColor, 
        fontFamily: fontBody,
        backgroundImage: bgImage ? `linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.92)), url(${bgImage})` : 'none',
      }}
    >
      {/* Custom Styles for Waveform Audio Widget */}
      <style>{`
        @keyframes playWave {
          0%, 100% { height: 4px; }
          50% { height: 26px; }
        }
        @keyframes popperFly {
          0% { transform: translateY(0) rotate(0deg) scale(0.6); opacity: 1; }
          100% { transform: translateY(-120vh) rotate(360deg) scale(1.2); opacity: 0; }
        }
        .waveform-bar {
          animation: playWave 1.2s ease-in-out infinite;
        }
        .popper-particle {
          animation: popperFly 1.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
      `}</style>

      {/* Floating particles background when card is open */}
      {envelopeState === 'opened' && <FloatingParticles type={themeKey} />}

      {/* Popper particle emitter layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
        {popParticles.map(p => (
          <span
            key={p.id}
            className="absolute popper-particle text-3xl select-none"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              color: p.color
            }}
          >
            {p.char}
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {envelopeState !== 'opened' ? (
          /* =======================================================
             1. INTERACTIVE ENVELOPE (CLOSED / OPENING STATE)
             ======================================================= */
          <motion.div 
            key="envelope-container"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, y: -80, transition: { duration: 0.6 } }}
            className="flex flex-col items-center justify-center min-h-[75vh] w-full max-w-lg mx-auto text-center"
          >
            {/* The Envelope wrapper with 3D perspective */}
            <div className="relative w-full aspect-[4/3] bg-transparent cursor-pointer group select-none relative" onClick={handleOpenEnvelope}>
              {/* Outer Glow Decal */}
              <div className="absolute -inset-4 rounded-3xl bg-[#C8A96B]/5 group-hover:bg-[#C8A96B]/10 blur-2xl transition-all duration-500" />
              
              {/* The Envelope Body */}
              <motion.div 
                className="relative w-full h-full bg-[#FAF6EE] rounded-3xl border border-[#C8A96B]/25 overflow-hidden shadow-2xl flex flex-col justify-between items-center p-8 transition-transform duration-500"
                style={{
                  background: 'linear-gradient(135deg, #FFFDFB 0%, #FAF5EB 100%)',
                  boxShadow: '0 30px 60px -15px rgba(200, 169, 107, 0.25)'
                }}
              >
                {/* Back flap triangles (luxurious folds design) */}
                <div className="absolute inset-0 pointer-events-none border-[14px] border-transparent border-t-[#FAF2E1]/70 border-b-[#FAF2E1]/90 rounded-3xl" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-amber-50/20 to-transparent pointer-events-none" />

                {/* Envelope content preview */}
                <div className="flex flex-col items-center justify-center flex-grow space-y-4 relative z-10 py-6">
                  {/* Flashing Mail Icon */}
                  <div className="w-16 h-16 rounded-full bg-white border border-[#C8A96B]/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Mail className="w-7 h-7 text-[#C8A96B] stroke-[1.2]" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A96B] block">GREETING WISH CARD FOR YOU</span>
                    <h3 className="font-playfair text-2xl font-light text-gray-800 italic">
                      To: {userData.recipientName || 'Dear Friend'}
                    </h3>
                  </div>
                </div>

                {/* Wax Seal at the bottom overlap */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 border-2 border-red-500 shadow-xl flex items-center justify-center text-xl font-bold transition-all duration-300 relative select-none ${envelopeState === 'opening' ? 'scale-0 rotate-180 opacity-0' : 'group-hover:scale-108 active:scale-95 group-hover:rotate-6'}`}>
                    💖
                    {/* Ring glow around wax seal */}
                    <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-60" />
                  </div>
                  <span className="text-[8px] font-bold text-gray-400 tracking-widest uppercase mt-3 group-hover:text-[#C8A96B] transition-colors">
                    {envelopeState === 'opening' ? 'Opening...' : 'Tap wax seal to open'}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Prompt text below envelope */}
            <p className="text-xs text-gray-400 mt-8 font-light tracking-wide italic">
              From: <span className="font-medium text-[#C8A96B] not-italic">{userData.senderName || 'Anonymous'}</span>
            </p>
          </motion.div>
        ) : (
          /* =======================================================
             2. GREETING CARD (OPENED STATE)
             ======================================================= */
          <motion.div 
            key="card-opened"
            initial={{ opacity: 0, y: 120, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', damping: 22, stiffness: 75 }}
            className="w-full max-w-3xl mx-auto space-y-12 flex flex-col items-center"
          >
            {/* The E-Card */}
            <div 
              className={`w-full bg-gradient-to-br ${oConfig.bgGradient} border border-[#C8A96B]/20 rounded-3xl p-8 sm:p-14 md:p-20 text-center shadow-2xl relative overflow-hidden flex flex-col items-center justify-between gold-glow`}
              style={{ minHeight: '560px' }}
            >
              {/* Corner border decals */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#C8A96B]/25 rounded-tl-3xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#C8A96B]/25 rounded-tr-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#C8A96B]/25 rounded-bl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#C8A96B]/25 rounded-br-3xl pointer-events-none" />

              {/* Gold floral decal accents */}
              <div className="absolute top-4 left-4 text-[#C8A96B]/10 font-serif text-3xl">✿</div>
              <div className="absolute top-4 right-4 text-[#C8A96B]/10 font-serif text-3xl">✿</div>
              <div className="absolute bottom-4 left-4 text-[#C8A96B]/10 font-serif text-3xl">✿</div>
              <div className="absolute bottom-4 right-4 text-[#C8A96B]/10 font-serif text-3xl">✿</div>

              {/* Decorative top icon */}
              <div className="relative z-10 flex flex-col items-center space-y-3 pt-2">
                <div className="w-16 h-16 rounded-full bg-white border border-[#C8A96B]/20 flex items-center justify-center shadow-inner hover:scale-105 transition-transform duration-300">
                  {oConfig.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#C8A96B] uppercase block">
                    {oConfig.tagline}
                  </span>
                  <span className="text-[8px] tracking-widest text-gray-400 uppercase font-light">
                    {oConfig.label}
                  </span>
                </div>
              </div>

              {/* Greeting Wishes Content */}
              <div className="relative z-10 flex-grow flex flex-col justify-center items-center py-12 max-w-lg space-y-8">
                
                {/* To Field */}
                <h2 
                  className="text-4xl sm:text-5xl font-light tracking-wide text-gray-800 font-playfair italic"
                  style={{ fontFamily: fontHeader, color: primaryColor }}
                >
                  Dear {userData.recipientName || 'Friend'},
                </h2>

                {/* Message Body */}
                <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed tracking-wide italic max-w-md">
                  &ldquo;{userData.message || 'Wishing you all the joy, love and happiness this special occasion can bring!'}&rdquo;
                </p>

                {/* Date stamp if present */}
                {userData.date && (
                  <div className="inline-flex items-center gap-2 border-y border-[#C8A96B]/15 py-2 px-6 my-2 text-3xs font-semibold uppercase tracking-wider text-gray-400">
                    <span>{oConfig.emoji}</span>
                    <span>{formatDate(userData.date)}</span>
                    <span>{oConfig.emoji}</span>
                  </div>
                )}
              </div>

              {/* From / Signature Field */}
              <div className="relative z-10 flex flex-col items-center space-y-1 pt-4 pb-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">WITH LOVE & BEST WISHES FROM</span>
                <h3 className="font-playfair text-2xl font-light text-gray-900" style={{ color: primaryColor }}>
                  {userData.senderName || 'Your Friend'}
                </h3>
              </div>
            </div>

            {/* Reply Wall / Guestbook section (replacing RSVP) */}
            <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
              <div className="text-center space-y-1">
                <h3 className="font-playfair text-2xl font-light text-gray-900">
                  Send Your Wishes Back
                </h3>
                <p className="text-[10px] text-gray-400 font-light uppercase tracking-wider">
                  Post a message on the public guestbook
                </p>
              </div>

              {/* Reply Form */}
              {submitSuccess ? (
                <div className="py-8 flex flex-col items-center gap-3 animate-fade-in text-center">
                  <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center border border-green-200 shadow-md">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-800">Wish Posted Successfully!</h4>
                  <p className="text-xs text-gray-400 font-light">Your reply message is now on the board.</p>
                </div>
              ) : (
                <form onSubmit={handleRSVPSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3.5 rounded-2xl bg-red-50/50 border border-red-100 text-red-600 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block">Your Name</label>
                      <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A96B] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block">Your Message</label>
                      <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a sweet message back..."
                        rows={3}
                        className="w-full border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A96B] transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-black hover:bg-[#C8A96B] text-white rounded-full py-3.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? 'Posting...' : 'Post Message'}
                  </button>
                </form>
              )}

              {/* Guestbook List - Polaroid Postcard Style */}
              <div className="border-t border-gray-100 pt-8 space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#C8A96B]" />
                    <span className="font-bold text-xs uppercase tracking-widest text-[#C8A96B]">Guestbook Wall</span>
                  </div>
                  <span className="text-[10px] text-gray-400">{rsvps.length} messages</span>
                </div>

                {loadingRsvps ? (
                  <div className="text-center py-6 text-xs text-gray-400 font-light">Loading replies...</div>
                ) : rsvps.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-gray-100 rounded-2xl p-6">
                    <p className="text-xs text-gray-400 italic font-light">No messages left yet. Send one to reply!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
                    {rsvps.map((item, idx) => {
                      // Slight tilt angle for postcard feel
                      const tilt = (idx % 3 - 1) * 1.5;
                      return (
                        <div 
                          key={item._id || idx} 
                          className="bg-amber-50/30 border border-[#C8A96B]/10 rounded-2xl p-5 shadow-xs hover:shadow-md hover:scale-101 hover:border-[#C8A96B]/30 transition-all duration-300 text-left relative overflow-hidden"
                          style={{ transform: `rotate(${tilt}deg)` }}
                        >
                          <div className="absolute top-0 right-0 w-8 h-8 bg-[#C8A96B]/5 rounded-bl-2xl flex items-center justify-center text-3xs font-serif text-[#C8A96B]">
                            ✉
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-sm text-gray-800">{item.name}</span>
                            <span className="text-[9px] text-gray-400">
                              {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 italic leading-relaxed pt-1 border-t border-[#C8A96B]/5">
                            &ldquo;{item.message}&rdquo;
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =======================================================
         3. FLOATING SOUND WAVEFORM & ACTION WIDGETS
         ======================================================= */}
      {envelopeState === 'opened' && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-1.5 sm:gap-2">
          {/* Party Popper Popper Trigger Button */}
          <button 
            onClick={triggerPopper}
            title="Pop Celebration Confetti!"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#C8A96B]/20 flex items-center justify-center shadow-lg hover:scale-110 hover:border-[#C8A96B]/50 hover:shadow-xl transition-all duration-300 text-base sm:text-lg"
          >
            🎉
          </button>

          {/* Copy Shareable Card Link Button */}
          <button 
            onClick={handleCopyLink}
            title={copied ? 'Link Copied!' : 'Share Greeting Card'}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#C8A96B]/20 flex items-center justify-center shadow-lg hover:scale-110 hover:border-[#C8A96B]/50 hover:shadow-xl transition-all duration-300 relative text-xs"
          >
            {copied ? (
              <span className="text-[8px] uppercase tracking-widest text-[#C8A96B] font-bold">Copied</span>
            ) : (
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            )}
          </button>

          {/* Premium Audio Waveform Widget */}
          <div 
            onClick={toggleMusic}
            className="flex items-center gap-2 sm:gap-3 bg-white border border-[#C8A96B]/20 py-2 px-3 sm:py-2.5 sm:px-4 rounded-full shadow-lg cursor-pointer hover:shadow-xl hover:scale-102 hover:border-[#C8A96B]/50 transition-all duration-300"
          >
            <div className="flex items-center gap-0.5 h-5 sm:h-6">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-0.5 sm:w-1 bg-[#C8A96B] rounded-full waveform-bar"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animationPlayState: isPlaying ? 'running' : 'paused',
                    height: isPlaying ? undefined : '4px'
                  }}
                />
              ))}
            </div>
            <span className="text-[9px] sm:text-3xs font-semibold uppercase tracking-widest text-gray-500 hidden sm:inline-block">
              {isPlaying ? 'Music On' : 'Music Muted'}
            </span>
            {isPlaying ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C8A96B]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
