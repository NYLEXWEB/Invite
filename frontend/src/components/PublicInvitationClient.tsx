'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, Heart, Sparkles, Navigation, Check, 
  ChevronDown, CalendarCheck, MessageSquare, Users, UserCheck, AlertCircle,
  VolumeX, Volume2, ChevronLeft, ChevronRight, Share2,
  Cake, Gift, Home, Gem, Key, Cloud, Star
} from 'lucide-react';
import { apiService } from '../services/api';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import BirthdayLayout from './BirthdayLayout';
import BabyShowerLayout from './BabyShowerLayout';
import AnniversaryLayout from './AnniversaryLayout';
import HousewarmingLayout from './HousewarmingLayout';
import EngagementLayout from './EngagementLayout';
import GreetingWishLayout from './GreetingWishLayout';

interface PublicInvitationClientProps {
  invite: {
    _id: string;
    slug: string;
    serviceType: string;
    userData: Record<string, any>;
    image?: string;
  };
}

// Global Luxury Theme Config
const eventThemes: Record<string, {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
  muted: string;
  border: string;
  fontHeader: string;
  fontSub: string;
  fontBody: string;
  musicUrl: string;
  assets: {
    hero: string;
    decor: string;
    bg?: string;
  };
  introText: string;
  detailsTitle: string;
}> = {
  wedding: {
    primary: '#C8A96B', // Premium Gold
    secondary: '#FAF8F5', // Elegant Ivory
    accent: '#D4AF37',
    bg: '#FAF8F5',
    text: '#111111',
    muted: '#6B7280',
    border: 'rgba(200, 169, 107, 0.15)',
    fontHeader: 'var(--font-playfair)',
    fontSub: 'var(--font-cormorant)',
    fontBody: 'var(--font-inter)',
    musicUrl: 'https://assets.mixkit.co/music/preview/mixkit-wedding-bells-2656.mp3',
    assets: {
      hero: '/assets/wedding/couple.png',
      decor: '🌸',
      bg: '/assets/wedding/bg.png'
    },
    introText: 'Together with their families, they invite you to celebrate their union.',
    detailsTitle: 'The Wedding Ceremony'
  },
  birthday: {
    primary: '#C8A96B',
    secondary: '#FAF9F6',
    accent: '#EEDB98',
    bg: '#FAF9F6',
    text: '#111111',
    muted: '#6D7278',
    border: 'rgba(212, 175, 55, 0.15)',
    fontHeader: 'var(--font-playfair)',
    fontSub: 'var(--font-cormorant)',
    fontBody: 'var(--font-inter)',
    musicUrl: 'https://assets.mixkit.co/music/preview/mixkit-joyful-toy-shop-2877.mp3',
    assets: {
      hero: '/assets/birthday/hero.png',
      decor: '🎈'
    },
    introText: 'A milestone year deserves a premium celebration. Join us in celebrating life!',
    detailsTitle: 'Birthday Celebration'
  },
  babyshower: {
    primary: '#B8A3C9',
    secondary: '#F5F7FA',
    accent: '#D4AF37',
    bg: '#F5F7FA',
    text: '#2C3E50',
    muted: '#7F8C8D',
    border: 'rgba(184, 163, 201, 0.2)',
    fontHeader: 'var(--font-playfair)',
    fontSub: 'var(--font-cormorant)',
    fontBody: 'var(--font-inter)',
    musicUrl: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
    assets: {
      hero: '/assets/baby-shower/hero.png',
      decor: '⭐'
    },
    introText: 'A grand adventure is about to begin. Join us to welcome the little one!',
    detailsTitle: 'Baby Shower Celebration'
  },
  anniversary: {
    primary: '#D0A150',
    secondary: '#FDFBF7',
    accent: '#AA771C',
    bg: '#FDFBF7',
    text: '#2D2D2D',
    muted: '#7A7A7A',
    border: 'rgba(208, 161, 80, 0.2)',
    fontHeader: 'var(--font-playfair)',
    fontSub: 'var(--font-cormorant)',
    fontBody: 'var(--font-inter)',
    musicUrl: 'https://assets.mixkit.co/music/preview/mixkit-love-and-piano-2953.mp3',
    assets: {
      hero: '/assets/anniversary/hero.png',
      decor: '❤️'
    },
    introText: 'Celebrating years of love, laughter, and beautiful memories together.',
    detailsTitle: 'Anniversary Celebration'
  },
  housewarming: {
    primary: '#A88D4D',
    secondary: '#FAF6F0',
    accent: '#C2A35D',
    bg: '#FAF6F0',
    text: '#2E2A25',
    muted: '#7D746C',
    border: 'rgba(168, 141, 77, 0.2)',
    fontHeader: 'var(--font-playfair)',
    fontSub: 'var(--font-cormorant)',
    fontBody: 'var(--font-inter)',
    musicUrl: 'https://assets.mixkit.co/music/preview/mixkit-warm-light-2826.mp3',
    assets: {
      hero: '/assets/housewarming/hero.png',
      decor: '🏠'
    },
    introText: 'Our new journey begins, and our home is ready. We can’t wait to welcome you!',
    detailsTitle: 'Housewarming Pooja & Celebration'
  },
  engagement: {
    primary: '#C2A35D',
    secondary: '#FAF9F6',
    accent: '#D4AF37',
    bg: '#FAF9F6',
    text: '#1A1A1A',
    muted: '#6E6E6E',
    border: 'rgba(194, 163, 93, 0.2)',
    fontHeader: 'var(--font-playfair)',
    fontSub: 'var(--font-cormorant)',
    fontBody: 'var(--font-inter)',
    musicUrl: 'https://assets.mixkit.co/music/preview/mixkit-sentimental-piano-2954.mp3',
    assets: {
      hero: '/assets/engagement/hero.png',
      decor: '✨'
    },
    introText: 'Two hearts unite. We invite you to share our happiness as we take our next step.',
    detailsTitle: 'Engagement Ceremony'
  }
};

// Reusable Components inside file
export function FloatingParticles({ type }: { type: string }) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const pCount = 18;
    const list = [];
    const symbols = {
      wedding: ['🌸', '✨', '🌸', '💮', '🤍'],
      birthday: ['🎈', '✨', '🎉', '✨', '🎁'],
      babyshower: ['⭐', '☁️', '⭐', '✨', '🍼'],
      anniversary: ['❤️', '✨', '🌹', '✨', '💖'],
      housewarming: ['✨', '🍃', '✨', '🍁', '🔑'],
      engagement: ['✨', '💍', '✨', '💎', '🤍']
    }[type] || ['✨'];

    for (let i = 0; i < pCount; i++) {
      list.push({
        id: i,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        left: Math.random() * 100,
        delay: Math.random() * 10,
        speed: 10 + Math.random() * 12,
        size: 14 + Math.random() * 18,
      });
    }
    setParticles(list);
  }, [type]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute text-center animate-float-down select-none opacity-0"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            '--speed': `${p.speed}s`,
            fontSize: `${p.size}px`,
          } as React.CSSProperties}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}

export function CountdownTimer({ targetDate, primaryColor, fontHeader }: { targetDate: string, primaryColor: string, fontHeader: string }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!targetDate) return;

    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) return null;
  if (!timeLeft) {
    return (
      <div className="text-center p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-gray-100 max-w-sm mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">The Event Has Begun!</span>
      </div>
    );
  }

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center items-center gap-3 sm:gap-4 max-w-md mx-auto">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center justify-center bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 w-16 sm:w-20 border border-gray-100/50 shadow-xs hover:border-gold-500/20 transition-colors"
        >
          <span className="text-xl sm:text-2xl font-light tracking-wide" style={{ fontFamily: fontHeader, color: primaryColor }}>
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function MusicPlayer({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const aud = new Audio(url);
    aud.loop = true;
    setAudio(aud);

    return () => {
      aud.pause();
    };
  }, [url]);

  const toggle = () => {
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(err => console.log("Audio play blocked by browser:", err));
    }
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggle}
      className={`fixed top-6 right-6 z-50 p-3.5 rounded-full shadow-lg border transition-all duration-300 flex items-center justify-center group ${
        playing ? 'bg-[#B23B44] border-[#B23B44] text-white' : 'bg-white/95 border-gray-150 text-gray-800'
      }`}
      aria-label="Toggle Background Music"
    >
      {playing ? (
        <Volume2 className="w-4 h-4" />
      ) : (
        <VolumeX className="w-4 h-4 text-gray-400 group-hover:text-gold-500" />
      )}
    </button>
  );
}

export default function PublicInvitationClient({ invite }: PublicInvitationClientProps) {
  const { serviceType, userData, image, slug } = invite;
  const imageSrc = image ? apiService.getMediaUrl(image) : '';

  // Get active configuration based on event type
  const themeKey = (serviceType || 'wedding').toLowerCase().replace('-', '') as keyof typeof eventThemes;
  const activeTheme = eventThemes[themeKey] || eventThemes.wedding;

  const templateConfig = userData.templateConfig || {};
  const fontHeader = templateConfig.fontHeader || activeTheme.fontHeader;
  const fontSub = activeTheme.fontSub || activeTheme.fontSub;
  const fontBody = templateConfig.fontBody || activeTheme.fontBody;
  const primaryColor = templateConfig.primaryColor || activeTheme.primary;
  const secondaryColor = templateConfig.secondaryColor || activeTheme.secondary;
  const backgroundColor = templateConfig.backgroundColor || activeTheme.bg;
  const bgImage = templateConfig.bgImage || '';
  
  // Detailed Date Parsing helper matching luxury banner mock layouts
  const getDetailedDate = (dateStr?: string) => {
    if (!dateStr) return { day: '24', monthYear: 'MAY 2025', weekday: 'SATURDAY' };
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return { day: '24', monthYear: 'MAY 2025', weekday: 'SATURDAY' };
      }
      const day = date.getDate();
      const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
      const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
      return { day, monthYear, weekday };
    } catch {
      return { day: '24', monthYear: 'MAY 2025', weekday: 'SATURDAY' };
    }
  };

  const [activeSlide, setActiveSlide] = useState(0);

  // Scroll Animation Hooks for Groom/Bride hugging animation (using scrollY with useSpring to avoid hydration issues and smooth scroll-linked motions)
  const { scrollY } = useScroll();

  // Create a spring-smoothed scroll value
  const smoothScrollY = useSpring(scrollY, {
    damping: 35,
    stiffness: 80,
    mass: 0.5
  });

  // Calculate translations based on smooth scroll (responsive meeting in the center)
  const groomX = useTransform(smoothScrollY, [0, 320], ["0vw", "37vw"]);
  const brideX = useTransform(smoothScrollY, [0, 320], ["0vw", "-37vw"]);

  // Opacities: Groom and Bride fade out, Couple image fades in
  const charactersOpacity = useTransform(smoothScrollY, [0, 280, 320], [1, 1, 0]);
  const coupleOpacity = useTransform(smoothScrollY, [290, 340, 680, 800], [0, 1, 1, 0]);

  // Zoom / Scale: Couple zooms in from 0.75 to 1.55
  const coupleScale = useTransform(smoothScrollY, [290, 340, 680, 800], [0.75, 1.0, 1.55, 1.7]);

  // Background text opacity: fades out completely when characters start meeting
  const textOpacity = useTransform(smoothScrollY, [0, 180, 280], [1, 1, 0]);

  // RSVP Form States
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  
  // App States
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loadingRsvps, setLoadingRsvps] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Greeting Wish interactive states
  interface Particle {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    shape: 'heart' | 'balloon' | 'sparkle' | 'gift' | 'confetti';
    angle: number;
    delay: number;
  }
  const [celebrated, setCelebrated] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const triggerCelebration = (e: React.MouseEvent) => {
    if (celebrated) return;
    setCelebrated(true);
    
    // Play a subtle chime sound if possible using Web Audio API!
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.35); // C6
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (err) {
      console.log('Audio Context error: ', err);
    }

    const newParticles: Particle[] = [];
    const colors = ['#C8A96B', '#F59E0B', '#EF4444', '#EC4899', '#3B82F6', '#10B981'];
    
    // Choose particle shape based on type
    let shapes: Particle['shape'][] = ['sparkle', 'confetti'];
    if (serviceType === 'birthday') {
      shapes = ['balloon', 'sparkle', 'confetti'];
    } else if (['wedding', 'anniversary', 'engagement'].includes(serviceType)) {
      shapes = ['heart', 'sparkle'];
    } else if (['babyshower', 'housewarming'].includes(serviceType)) {
      shapes = ['gift', 'sparkle', 'confetti'];
    }

    // Emit 60 particles
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: e.clientX || window.innerWidth / 2,
        y: e.clientY || window.innerHeight / 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 16 + 8,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        angle: Math.random() * 360,
        delay: Math.random() * 0.2
      });
    }
    setParticles(newParticles);
    
    // Cleanup particles after animation
    setTimeout(() => {
      setParticles([]);
    }, 3500);
  };

  // Fetch RSVPs / Guestbook on load
  useEffect(() => {
    async function loadRSVPs() {
      if (slug === 'preview') {
        setRsvps([]);
        setLoadingRsvps(false);
        return;
      }
      try {
        const data = await apiService.getRSVPs(slug);
        setRsvps(data || []);
      } catch (err) {
        console.error('Failed to load RSVPs:', err);
      } finally {
        setLoadingRsvps(false);
      }
    }
    loadRSVPs();
  }, [slug]);

  // Desktop-specific scroll speed dampener for smooth and slower scrolling experience
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let isScrolling = false;

    const onScrollReset = () => {
      if (!isScrolling) {
        targetScrollY = window.scrollY;
        currentScrollY = window.scrollY;
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Dampen deltaY to slow down scroll speed
      targetScrollY += e.deltaY * 0.45;
      targetScrollY = Math.max(0, Math.min(targetScrollY, document.documentElement.scrollHeight - window.innerHeight));

      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(updateScroll);
      }
    };

    const updateScroll = () => {
      const diff = targetScrollY - currentScrollY;
      currentScrollY += diff * 0.075; // Lerp factor for buttery dampening

      window.scrollTo(0, currentScrollY);

      if (Math.abs(diff) > 0.4) {
        requestAnimationFrame(updateScroll);
      } else {
        isScrolling = false;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScrollReset);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScrollReset);
    };
  }, []);

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

  // Get host names for headers
  const getHosts = () => {
    return userData.coupleNames || 
           userData.name || 
           (userData.groomName && userData.brideName && `${userData.groomName} & ${userData.brideName}`) || 
           userData.familyName ||
           userData.parentNames || 
           'Special Guest';
  };

  const hostNames = getHosts();

  // Create Google Calendar link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${serviceType.toUpperCase()} - ${hostNames}`);
    const details = encodeURIComponent(userData.message || 'You are invited!');
    const location = encodeURIComponent(`${userData.venue || ''}, ${userData.address || ''}`);
    const dateStr = userData.date || userData.weddingDate;
    if (!dateStr) return '';
    
    const dateObj = new Date(dateStr);
    const formattedDate = dateObj.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formattedDate}/${formattedDate}&details=${details}&location=${location}`;
  };

  // Create Google Maps search link
  const getMapsUrl = () => {
    const query = encodeURIComponent(`${userData.venue || ''} ${userData.address || ''}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    
    const isWishMode = true;
    if (!isWishMode && attending === null) {
      setErrorMsg('Please select your attendance.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const result = await apiService.submitRSVP(slug, {
        name: name.trim(),
        attending: isWishMode ? true : attending!,
        guests: isWishMode ? 0 : (attending ? guests : 0),
        message: message.trim() || undefined
      });

      setSubmitSuccess(true);
      setRsvps(prev => [result, ...prev]);

      setName('');
      setAttending(null);
      setGuests(1);
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit RSVP. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const layoutProps = {
    userData,
    serviceType,
    slug,
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
  };

  // If this is a greeting wish card instead of an event invitation, render the greeting layout
  if (userData?.mode === 'wish') {
    return <GreetingWishLayout {...layoutProps} />;
  }

  // Render based on service type to provide completely separate layout styles
  if (serviceType === 'birthday') {
    return <BirthdayLayout {...layoutProps} />;
  }
  if (serviceType === 'babyshower') {
    return <BabyShowerLayout {...layoutProps} />;
  }
  if (serviceType === 'anniversary') {
    return <AnniversaryLayout {...layoutProps} />;
  }
  if (serviceType === 'housewarming') {
    return <HousewarmingLayout {...layoutProps} />;
  }
  if (serviceType === 'engagement') {
    return <EngagementLayout {...layoutProps} />;
  }

  return (
    <div 
      className="w-full min-h-screen transition-colors duration-500 selection:bg-gold-500 selection:text-white"
      style={{ 
        backgroundColor, 
        fontFamily: fontBody,
        color: activeTheme.text
      }}
    >
      {/* Ambient background track */}
      <MusicPlayer url={activeTheme.musicUrl} />

      {/* 1. HERO SECTION */}
      {/* 1. HERO SECTION WITH STICKY SCROLL PINNING */}
      <section className="relative h-[220vh] w-full">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center text-center px-4 overflow-hidden border-b border-gray-100/40">
          
          {/* Floating Particles overlay */}
          <FloatingParticles type={themeKey} />

          {/* Parallax Background Cover Image or Watercolor */}
          <div className="absolute inset-0 z-0">
            {bgImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={bgImage} 
                alt="Luxury Background" 
                className="w-full h-full object-cover opacity-60"
              />
            ) : activeTheme.assets.bg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={activeTheme.assets.bg} 
                alt="Luxury Background" 
                className="w-full h-full object-cover opacity-45"
              />
            ) : (
              <div className="w-full h-full bg-[#FAF8F5] opacity-20 absolute inset-0" />
            )}
            {/* Soft overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-transparent" />
          </div>

          {/* Header/Event category badge */}
          <div className="relative z-10 pt-12">
            <span 
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-3xs uppercase tracking-widest font-semibold bg-white/95 border shadow-xs"
              style={{ 
                color: primaryColor, 
                borderColor: `${primaryColor}30`,
              }}
            >
              <Sparkles className="w-3 h-3 text-gold-500 animate-pulse" />
              {serviceType} INVITATION ATELIER
            </span>
          </div>

          {/* Hero Content Grid (Centered luxury text layout framed by standing characters) */}
          <div className="relative z-10 max-w-6xl w-full px-4 flex flex-col md:flex-row items-center justify-center gap-8 flex-grow">
            
            {/* Standing Left Character / Decorative Element */}
            <motion.div 
              style={{ x: groomX, opacity: charactersOpacity }}
              className="flex absolute left-2 md:left-6 lg:left-12 bottom-12 md:bottom-20 z-20 w-24 sm:w-32 md:w-48 lg:w-56 h-[220px] sm:h-[280px] md:h-[400px] lg:h-[480px] items-end justify-center pointer-events-none"
            >
              {serviceType === 'wedding' ? (
                <img 
                  src="/assets/wedding/groom.png" 
                  alt="Groom Illustration" 
                  className="h-full object-contain filter drop-shadow-xl"
                />
              ) : (
                <div 
                  className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center border shadow-xl backdrop-blur-md animate-pulse"
                  style={{ 
                    borderColor: `${primaryColor}40`,
                    backgroundColor: `${backgroundColor}D0`,
                    color: primaryColor,
                    boxShadow: `0 10px 25px -5px ${primaryColor}20`
                  }}
                >
                  {serviceType === 'birthday' && <Gift className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 stroke-[1.2]" />}
                  {serviceType === 'babyshower' && <Cloud className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 stroke-[1.2]" />}
                  {serviceType === 'anniversary' && <Heart className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 stroke-[1.2] fill-current" />}
                  {serviceType === 'housewarming' && <Home className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 stroke-[1.2]" />}
                  {serviceType === 'engagement' && <Gem className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 stroke-[1.2]" />}
                </div>
              )}
            </motion.div>

            {/* Central Text Details */}
            <motion.div 
              style={{ opacity: textOpacity }}
              className="flex-1 max-w-2xl text-center flex flex-col items-center justify-center py-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center"
              >
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  {serviceType === 'wedding' ? 'TOGETHER WITH THEIR FAMILIES' : 'YOU ARE CORDIALLY INVITED'}
                </span>
                
                {serviceType === 'wedding' ? (
                  <>
                    <h1 
                      className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide leading-tight my-2"
                      style={{ fontFamily: fontHeader, color: primaryColor }}
                    >
                      {userData.groomName || 'Arjun'}
                      <span className="block text-2xl font-serif italic my-2 text-gray-400 font-light">&amp;</span>
                      {userData.brideName || 'Meera'}
                    </h1>
                  </>
                ) : serviceType === 'engagement' ? (
                  <>
                    <h1 
                      className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide leading-tight my-2"
                      style={{ fontFamily: fontHeader, color: primaryColor }}
                    >
                      {userData.groomName || 'Arjun'}
                      <span className="block text-2xl font-serif italic my-2 text-gray-400 font-light">&amp;</span>
                      {userData.brideName || 'Meera'}
                    </h1>
                  </>
                ) : (
                  <h1 
                    className="text-4xl sm:text-6xl font-light tracking-wide leading-tight my-2"
                    style={{ fontFamily: fontHeader, color: primaryColor }}
                  >
                    {userData.coupleNames || userData.recipientName || userData.name || userData.familyName || 'Arjun & Meera'}
                  </h1>
                )}

                <div className="flex justify-center items-center gap-1.5 my-3 text-red-500/40">
                  {serviceType === 'wedding' && <Heart className="w-3.5 h-3.5 fill-current" style={{ color: `${primaryColor}60` }} />}
                  {serviceType === 'birthday' && <Cake className="w-3.5 h-3.5" style={{ color: `${primaryColor}60` }} />}
                  {serviceType === 'babyshower' && <Sparkles className="w-3.5 h-3.5" style={{ color: `${primaryColor}60` }} />}
                  {serviceType === 'anniversary' && <Heart className="w-3.5 h-3.5 fill-current" style={{ color: `${primaryColor}60` }} />}
                  {serviceType === 'housewarming' && <Home className="w-3.5 h-3.5" style={{ color: `${primaryColor}60` }} />}
                  {serviceType === 'engagement' && <Gem className="w-3.5 h-3.5" style={{ color: `${primaryColor}60` }} />}
                </div>

                <p className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-4">
                  INVITE YOU TO CELEBRATE {
                    serviceType === 'wedding' ? 'THEIR WEDDING' : 
                    serviceType === 'birthday' ? 'THE BIRTHDAY' : 
                    serviceType === 'babyshower' ? 'THE BABY SHOWER' : 
                    serviceType === 'anniversary' ? 'THE ANNIVERSARY' : 
                    serviceType === 'housewarming' ? 'THE HOUSEWARMING' : 
                    serviceType === 'engagement' ? 'THE ENGAGEMENT' : 
                    'THIS SPECIAL OCCASION'
                  }
                </p>

                {/* Structured Split Date (MATCHING SCREENSHOT) */}
                <div className="flex items-center justify-center gap-4 border-y border-[#C8A96B]/25 py-3 px-6 my-4 text-xs sm:text-sm tracking-widest font-light text-gray-600 max-w-sm w-full">
                  <span className="uppercase">{getDetailedDate(userData.date || userData.weddingDate).weekday}</span>
                  <span className="text-2xl sm:text-3xl font-light text-[#C8A96B] px-4 border-x border-[#C8A96B]/25 font-playfair">
                    {getDetailedDate(userData.date || userData.weddingDate).day}
                  </span>
                  <span className="uppercase">{getDetailedDate(userData.date || userData.weddingDate).monthYear}</span>
                </div>

                <p className="text-[10px] sm:text-[11px] font-medium tracking-widest text-gray-400 uppercase mt-2">
                  AT {userData.time ? userData.time.toUpperCase() : 'SIX O\'CLOCK IN THE EVENING'}
                </p>
              </motion.div>
            </motion.div>

            {/* Standing Right Character / Decorative Element */}
            <motion.div 
              style={{ x: brideX, opacity: charactersOpacity }}
              className="flex absolute right-2 md:right-6 lg:left-auto lg:right-12 bottom-12 md:bottom-20 z-20 w-24 sm:w-32 md:w-48 lg:w-56 h-[220px] sm:h-[280px] md:h-[400px] lg:h-[480px] items-end justify-center pointer-events-none"
            >
              {serviceType === 'wedding' ? (
                <img 
                  src="/assets/wedding/bride.png" 
                  alt="Bride Illustration" 
                  className="h-full object-contain filter drop-shadow-xl"
                />
              ) : (
                <div 
                  className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center border shadow-xl backdrop-blur-md animate-pulse"
                  style={{ 
                    borderColor: `${primaryColor}40`,
                    backgroundColor: `${backgroundColor}D0`,
                    color: primaryColor,
                    boxShadow: `0 10px 25px -5px ${primaryColor}20`
                  }}
                >
                  {serviceType === 'birthday' && <Cake className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 stroke-[1.2]" />}
                  {serviceType === 'babyshower' && <Star className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 stroke-[1.2]" />}
                  {serviceType === 'anniversary' && <Heart className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 stroke-[1.2] fill-current" />}
                  {serviceType === 'housewarming' && <Key className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 stroke-[1.2]" />}
                  {serviceType === 'engagement' && <Heart className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 stroke-[1.2] fill-current" />}
                </div>
              )}
            </motion.div>

            {/* Hugging Couple (Fades in at scroll) */}
            {serviceType === 'wedding' && (
              <motion.div 
                style={{ opacity: coupleOpacity, scale: coupleScale }}
                className="flex absolute left-1/2 bottom-12 md:bottom-20 -translate-x-1/2 z-15 w-28 sm:w-36 md:w-52 lg:w-60 h-[220px] sm:h-[280px] md:h-[400px] lg:h-[480px] items-end justify-center pointer-events-none"
              >
                <img 
                  src="/assets/wedding/couple.png" 
                  alt="Couple Hugging" 
                  className="h-full object-contain filter drop-shadow-2xl"
                />
              </motion.div>
            )}

            {/* Centered Category Hero Image (Fades & Zooms on scroll for Birthday, Baby Shower, Anniversary, Housewarming, Engagement) */}
            {serviceType !== 'wedding' && activeTheme.assets.hero && (
              <motion.div 
                style={{ opacity: coupleOpacity, scale: coupleScale }}
                className="flex absolute left-1/2 bottom-12 md:bottom-20 -translate-x-1/2 z-15 w-28 sm:w-36 md:w-52 lg:w-60 h-[220px] sm:h-[280px] md:h-[400px] lg:h-[480px] items-end justify-center pointer-events-none"
              >
                <img 
                  src={activeTheme.assets.hero} 
                  alt={`${serviceType} Hero`} 
                  className="h-full object-contain filter drop-shadow-2xl"
                />
              </motion.div>
            )}

          </div>

          {/* Scroll Indicator */}
          <div className="relative z-10 pb-8 flex flex-col items-center gap-1 animate-bounce text-gray-400 hover:text-[#C8A96B] cursor-pointer">
            <span className="text-[9px] uppercase tracking-widest font-semibold">Scroll to View</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC INTRO STORY SECTION */}
      <section className="relative py-24 px-4 bg-white border-b border-gray-100/40">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center flex-col items-center"
          >
            {/* Category-Specific Icon */}
            {serviceType === 'wedding' && <Heart className="w-5 h-5 mb-4 stroke-[1.2]" style={{ color: primaryColor }} />}
            {serviceType === 'birthday' && <Cake className="w-5 h-5 mb-4 stroke-[1.2]" style={{ color: primaryColor }} />}
            {serviceType === 'babyshower' && <Sparkles className="w-5 h-5 mb-4 stroke-[1.2]" style={{ color: primaryColor }} />}
            {serviceType === 'anniversary' && <Heart className="w-5 h-5 mb-4 stroke-[1.2]" style={{ color: primaryColor }} />}
            {serviceType === 'housewarming' && <Home className="w-5 h-5 mb-4 stroke-[1.2]" style={{ color: primaryColor }} />}
            {serviceType === 'engagement' && <Gem className="w-5 h-5 mb-4 stroke-[1.2]" style={{ color: primaryColor }} />}

            <span 
              className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1"
              style={{ fontFamily: fontBody }}
            >
              {serviceType === 'wedding' && "ABOUT THE COUPLE"}
              {serviceType === 'birthday' && "THE CELEBRANT"}
              {serviceType === 'babyshower' && "ABOUT THE PARENTS"}
              {serviceType === 'anniversary' && "THE CELEBRATED COUPLE"}
              {serviceType === 'housewarming' && "THE FAMILY"}
              {serviceType === 'engagement' && "THE ENGAGED COUPLE"}
            </span>

            <h2 
              className="text-3xl sm:text-4xl font-light tracking-wide italic"
              style={{ fontFamily: fontSub, color: primaryColor }}
            >
              {serviceType === 'wedding' && "Two Souls, One Heart"}
              {serviceType === 'birthday' && "Celebrating a Milestone Year!"}
              {serviceType === 'babyshower' && "A Precious Gift Awaits"}
              {serviceType === 'anniversary' && "Years of Love & Togetherness"}
              {serviceType === 'housewarming' && "A New Beginning, A Warm Welcome"}
              {serviceType === 'engagement' && "Two Hearts, One Promise"}
            </h2>
          </motion.div>

          {/* Couple profiles side by side (Wedding and Engagement) */}
          {(serviceType === 'wedding' || serviceType === 'engagement') && (
            <motion.div 
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto pt-6"
            >
              {/* Groom */}
              <motion.div variants={itemVariants} className="flex flex-col items-center space-y-3 bg-white p-6 rounded-3xl relative">
                {/* Wreath border wrapper */}
                <div className="relative w-36 h-36 rounded-full overflow-hidden border border-[#C8A96B]/30 p-2 bg-[#FAF8F5]">
                  <img src="/assets/wedding/groom.png" alt="Groom avatar" className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="font-light text-2xl tracking-wide text-[#C8A96B] font-playfair" style={{ fontFamily: fontHeader }}>
                  {userData.groomName || 'Arjun'}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs">
                  {serviceType === 'wedding' 
                    ? "Our journey began with a friendship, blossomed into love, and now we are ready to start our forever."
                    : "Ready to promise a lifetime of love and companionship as we seal our engagement."}
                </p>
              </motion.div>

              {/* Bride */}
              <motion.div variants={itemVariants} className="flex flex-col items-center space-y-3 bg-white p-6 rounded-3xl relative">
                {/* Wreath border wrapper */}
                <div className="relative w-36 h-36 rounded-full overflow-hidden border border-[#C8A96B]/30 p-2 bg-[#FAF8F5]">
                  <img src="/assets/wedding/bride.png" alt="Bride avatar" className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="font-light text-2xl tracking-wide text-[#C8A96B] font-playfair" style={{ fontFamily: fontHeader }}>
                  {userData.brideName || 'Meera'}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs">
                  {serviceType === 'wedding' 
                    ? "Two lives, two hearts, joined together in friendship, united forever in love."
                    : "Walking hand in hand toward a beautiful future starting from this special day."}
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Birthday Host Profile (Birthday) */}
          {serviceType === 'birthday' && (
            <motion.div 
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="max-w-md mx-auto pt-6"
            >
              <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-xs relative">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center border p-2"
                  style={{ borderColor: `${primaryColor}40`, backgroundColor: `${primaryColor}10` }}
                >
                  <Cake className="w-10 h-10 stroke-[1.2]" style={{ color: primaryColor }} />
                </div>
                <h3 className="font-light text-2xl tracking-wide font-playfair" style={{ fontFamily: fontHeader, color: primaryColor }}>
                  {userData.recipientName || userData.name || 'Birthday Host'}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs">
                  We are gathering to celebrate another wonderful year of life, love, and laughter. Your presence is the greatest gift we could ask for!
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Baby Shower Profile (Baby Shower) */}
          {serviceType === 'babyshower' && (
            <motion.div 
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="max-w-md mx-auto pt-6"
            >
              <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-xs relative">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center border p-2"
                  style={{ borderColor: `${primaryColor}40`, backgroundColor: `${primaryColor}10` }}
                >
                  <Sparkles className="w-10 h-10 stroke-[1.2]" style={{ color: primaryColor }} />
                </div>
                <h3 className="font-light text-2xl tracking-wide font-playfair" style={{ fontFamily: fontHeader, color: primaryColor }}>
                  {userData.parentNames || 'Parents-to-Be'}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs">
                  A bundle of joy is on the way! We invite you to join us as we celebrate the upcoming arrival of our little one and share in our parenting journey.
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Anniversary Profile (Anniversary) */}
          {serviceType === 'anniversary' && (
            <motion.div 
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="max-w-md mx-auto pt-6"
            >
              <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-xs relative">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center border p-2"
                  style={{ borderColor: `${primaryColor}40`, backgroundColor: `${primaryColor}10` }}
                >
                  <Heart className="w-10 h-10 stroke-[1.2] fill-current" style={{ color: primaryColor }} />
                </div>
                <h3 className="font-light text-2xl tracking-wide font-playfair" style={{ fontFamily: fontHeader, color: primaryColor }}>
                  {userData.coupleNames || 'The Couple'}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs">
                  Celebrating years of beautiful memories, enduring love, and an unbreakable bond. Join us to toast to our journey and many more years of happiness!
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Housewarming Profile (Housewarming) */}
          {serviceType === 'housewarming' && (
            <motion.div 
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="max-w-md mx-auto pt-6"
            >
              <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-xs relative">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center border p-2"
                  style={{ borderColor: `${primaryColor}40`, backgroundColor: `${primaryColor}10` }}
                >
                  <Home className="w-10 h-10 stroke-[1.2]" style={{ color: primaryColor }} />
                </div>
                <h3 className="font-light text-2xl tracking-wide font-playfair" style={{ fontFamily: fontHeader, color: primaryColor }}>
                  {userData.familyName ? `The ${userData.familyName} Family` : 'Our New Nest'}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs">
                  Our dream home is finally a reality, and it wouldn't be complete without the warmth of our friends and family. Join us to bless our new house!
                </p>
              </motion.div>
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-2xl mx-auto pt-6"
          >
            <p 
              className="text-lg sm:text-xl font-light italic leading-relaxed text-gray-500 max-w-xl mx-auto"
              style={{ fontFamily: fontSub }}
            >
              &ldquo;{userData.message || 'You are cordially invited to celebrate this special milestone with us. Your presence would mean the world to our family.'}&rdquo;
            </p>
            <div className="mt-8 flex justify-center items-center gap-3">
              <div className="w-12 h-[1px] bg-gray-100" />
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">RSVP Requested</span>
              <div className="w-12 h-[1px] bg-gray-100" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. EVENT DETAILS / CELEBRATION WIDGET */}
      {userData.mode === 'wish' ? (
        /* =======================================
           INTERACTIVE CELEBRATION WIDGET SECTION
           ======================================= */
        <section className="py-24 px-4 bg-[#FAF9F6] border-b border-gray-100/30 relative overflow-hidden">
          {/* Style Injector */}
          <style>{`
            @keyframes float-up-particle {
              0% {
                transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
                opacity: 1;
              }
              100% {
                transform: translate3d(var(--dx), var(--dy), 0) scale(0.2) rotate(var(--dr));
                opacity: 0;
              }
            }
            .particle-anim {
              position: fixed;
              pointer-events: none;
              z-index: 9999;
              animation: float-up-particle 2.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
            }
            @keyframes flicker {
              0%, 100% { transform: scale(1) rotate(-2deg); opacity: 0.9; }
              50% { transform: scale(1.1) rotate(3deg); opacity: 1; }
            }
            .candle-flame {
              animation: flicker 0.6s infinite alternate;
            }
            @keyframes glow-pulse {
              0%, 100% { filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.6)); }
              50% { filter: drop-shadow(0 0 10px rgba(251, 146, 60, 0.9)); }
            }
            .candle-glow {
              animation: glow-pulse 1.5s infinite;
            }
            @keyframes heartbeat {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
            .heart-pulse {
              animation: heartbeat 1.2s infinite ease-in-out;
            }
          `}</style>

          {/* Floating particle elements */}
          {particles.map(p => (
            <div
              key={p.id}
              className="particle-anim text-2xl flex items-center justify-center animate-fade-in"
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                color: p.color,
                fontSize: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                '--dx': `${Math.cos(p.angle * Math.PI / 180) * (Math.random() * 250 + 100)}px`,
                '--dy': `${Math.sin(p.angle * Math.PI / 180) * (Math.random() * 250 - 350)}px`,
                '--dr': `${Math.random() * 720 - 360}deg`
              } as any}
            >
              {p.shape === 'heart' && '💖'}
              {p.shape === 'balloon' && '🎈'}
              {p.shape === 'sparkle' && '✨'}
              {p.shape === 'gift' && '🎁'}
              {p.shape === 'confetti' && '🎉'}
            </div>
          ))}

          <div className="max-w-xl mx-auto text-center space-y-8 relative z-10">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Tap to Celebrate</span>
              <h2 className="text-3xl font-light text-gray-950" style={{ fontFamily: fontHeader }}>
                {serviceType === 'birthday' ? 'Blow Out the Candle' : 
                 ['wedding', 'anniversary', 'engagement'].includes(serviceType) ? 'Send Your Love' : 'Open the Celebration Gift'}
              </h2>
              <p className="text-xs text-gray-500 font-light">
                {celebrated 
                  ? 'Thank you for your warm wishes! 💝' 
                  : 'Click on the interactive element below to blow out candles or open gifts with custom chime effects'}
              </p>
            </div>

            <div className="bg-white border border-[#C8A96B]/25 rounded-3xl p-10 shadow-xl relative">
              {serviceType === 'birthday' ? (
                /* Birthday cake interactive element */
                <div className="relative w-48 h-48 mx-auto flex flex-col justify-end items-center cursor-pointer group" onClick={triggerCelebration}>
                  {/* Candle */}
                  <div className="relative w-3.5 h-14 bg-gradient-to-t from-pink-300 via-yellow-200 to-pink-300 rounded-full flex flex-col items-center">
                    {/* Flame */}
                    {!celebrated && (
                      <div className="absolute -top-6 w-4 h-6 bg-orange-400 rounded-full candle-flame candle-glow origin-bottom bg-gradient-to-t from-red-500 via-orange-400 to-yellow-200" />
                    )}
                  </div>
                  {/* Cake Layers */}
                  <div className="w-36 h-9 bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100 border-t-2 border-[#C8A96B]/20 rounded-t-lg relative" />
                  <div className="w-40 h-10 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 border-t border-[#C8A96B]/10 rounded-t-sm" />
                  <div className="w-44 h-12 bg-gradient-to-r from-[#C8A96B]/15 via-[#C8A96B]/25 to-[#C8A96B]/15 rounded-b-xl border-t border-white" />
                  {/* Plate */}
                  <div className="w-52 h-2.5 bg-gray-200 rounded-full shadow-xs" />
                </div>
              ) : ['wedding', 'anniversary', 'engagement'].includes(serviceType) ? (
                /* Wedding / Anniversary Heart chime element */
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center cursor-pointer group" onClick={triggerCelebration}>
                  <div className={`w-28 h-28 rounded-full bg-[#FAF8F5] border border-[#C8A96B]/30 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-105 ${!celebrated ? 'heart-pulse' : ''}`}>
                    <Heart className={`w-14 h-14 transition-colors duration-500 ${celebrated ? 'text-[#C8A96B] fill-[#C8A96B]' : 'text-gray-300 fill-none group-hover:text-red-400'}`} />
                  </div>
                  {!celebrated && (
                    <div className="absolute inset-0 border border-[#C8A96B]/15 rounded-full animate-ping pointer-events-none" />
                  )}
                </div>
              ) : (
                /* Gift Box interactive element */
                <div className="relative w-48 h-48 mx-auto flex flex-col justify-center items-center cursor-pointer group" onClick={triggerCelebration}>
                  {/* Box Lid */}
                  <div className={`w-32 h-7 bg-gradient-to-r from-[#C8A96B] to-[#b79555] rounded-t-md shadow-md transition-transform duration-700 relative z-10 ${celebrated ? '-translate-y-8 rotate-12 scale-95' : 'group-hover:-translate-y-0.5'}`}>
                    {/* Ribbon bow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-[#C8A96B] rounded-full rotate-45" />
                  </div>
                  {/* Box Body */}
                  <div className="w-28 h-20 bg-gradient-to-br from-[#FAF8F5] to-gray-50 border border-gray-100 rounded-b-md shadow-inner relative overflow-hidden">
                    {/* Ribbon vertical wrap */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-5 bg-gradient-to-r from-[#C8A96B] to-[#b79555]" />
                    {celebrated && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center font-bold text-[#C8A96B] text-[10px] uppercase tracking-widest animate-pulse">
                        Open! 💝
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* 3. EVENT DETAILS (Cards with Google Maps/Calendar) */}
          <section className="py-24 px-4 bg-[#FAF9F6] border-b border-gray-100/30">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16 space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Save the Date & Location</span>
                <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-gray-900" style={{ fontFamily: fontHeader }}>
                  {activeTheme.detailsTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:divide-x md:divide-gray-150/40">
                
                {/* Date Card */}
                <div className="flex flex-col items-center justify-between text-center p-6 min-h-[250px]">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#C8A96B]/25 flex items-center justify-center mb-4">
                    <Calendar className="w-5 h-5 text-[#C8A96B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-2">Event Date</h3>
                    <p className="text-sm text-gray-800 font-medium">{formatDate(userData.date || userData.weddingDate)}</p>
                    <p className="text-[10px] text-gray-400 font-light mt-1">{getDetailedDate(userData.date || userData.weddingDate).weekday}</p>
                  </div>
                  <div className="w-full mt-4">
                    <a 
                      href={getGoogleCalendarUrl()} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-gray-150 hover:border-gold-500/30 px-4 py-2.5 text-3xs font-semibold tracking-widest uppercase text-gray-500 hover:text-gold-500 bg-white transition-all duration-300"
                    >
                      Calendar
                    </a>
                  </div>
                </div>

                {/* Time Card */}
                <div className="flex flex-col items-center justify-between text-center p-6 min-h-[250px] md:pl-8">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#C8A96B]/25 flex items-center justify-center mb-4">
                    <Clock className="w-5 h-5 text-[#C8A96B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-2">Event Time</h3>
                    <p className="text-xl font-light text-[#C8A96B] tracking-wide" style={{ fontFamily: fontHeader }}>
                      {userData.time || '06:00 PM'}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 font-light">Onwards</p>
                  </div>
                  <div className="w-full mt-4 invisible">
                    <div className="py-2" />
                  </div>
                </div>

                {/* Venue Location Card */}
                <div className="flex flex-col items-center justify-between text-center p-6 min-h-[250px] md:pl-8">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#C8A96B]/25 flex items-center justify-center mb-4">
                    <MapPin className="w-5 h-5 text-[#C8A96B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-2">Venue</h3>
                    <p className="text-sm text-gray-800 font-medium">{userData.venue || 'Taj Banquets'}</p>
                    {userData.address && (
                      <p className="text-[10px] text-gray-400 mt-1 font-light leading-relaxed max-w-[150px] mx-auto truncate" title={userData.address}>{userData.address}</p>
                    )}
                  </div>
                  <div className="w-full mt-4">
                    <a 
                      href={getMapsUrl()} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-gray-150 hover:border-gold-500/30 px-4 py-2.5 text-3xs font-semibold tracking-widest uppercase text-gray-500 hover:text-gold-500 bg-white transition-all duration-300"
                    >
                      Directions
                    </a>
                  </div>
                </div>

                {/* Reception Card */}
                <div className="flex flex-col items-center justify-between text-center p-6 min-h-[250px] md:pl-8">
                  <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#C8A96B]/25 flex items-center justify-center mb-4">
                    <Heart className="w-5 h-5 text-[#C8A96B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-3xs uppercase tracking-widest text-gray-400 mb-2">Reception</h3>
                    <p className="text-sm text-gray-800 font-medium">Dinner & Dance</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-light">To Follow</p>
                  </div>
                  <div className="w-full mt-4 invisible">
                    <div className="py-2" />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 4. COUNTDOWN TIMER SECTION */}
          <section className="py-20 px-4 bg-white border-b border-gray-100/40 relative overflow-hidden">
            {/* Soft circle glow behind timer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#C8A96B]/5 blur-3xl pointer-events-none" />
            <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">THE MOMENTS ARE NEAR</span>
                <h2 className="text-2xl sm:text-3xl font-light text-gray-800" style={{ fontFamily: fontHeader }}>
                  Countdown to Event
                </h2>
              </div>
              <CountdownTimer 
                targetDate={userData.date || userData.weddingDate} 
                primaryColor={primaryColor} 
                fontHeader={fontHeader}
              />
            </div>
          </section>
        </>
      )}



      {/* 6. RSVP / WISH FORM SECTION */}
      <section className="py-24 px-4 max-w-xl mx-auto">
        <div className="bg-white border border-[#C8A96B]/20 rounded-3xl p-8 sm:p-10 shadow-xl text-center relative overflow-hidden gold-glow">
          <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: primaryColor }} />
          
          <h2 className="text-2xl font-light tracking-wide text-gray-900 mb-2" style={{ fontFamily: fontHeader }}>
            Send a Celebration Wish
          </h2>
          <p className="text-xs text-gray-400 font-light mb-8">
            Send a warm congratulatory message to celebrate this special occasion.
          </p>

          {submitSuccess ? (
            <div className="py-10 flex flex-col items-center gap-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center border border-green-200">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-800">
                Wish Sent Successfully!
              </h3>
              <p className="text-xs text-gray-400 font-light">
                Your warm wishing message has been published on the wishes board.
              </p>
              <button 
                onClick={() => setSubmitSuccess(false)}
                className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold-600 hover:underline"
              >
                Send another wish
              </button>
            </div>
          ) : (
            <form onSubmit={handleRSVPSubmit} className="space-y-6 text-left">
              {/* Error Callout */}
              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-red-50/50 border border-red-100 text-red-600 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Your Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A96B] transition-colors"
                />
              </div>

              {/* Congratulations Message */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  Your Wish Message
                </label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your sweet congratulatory wish here..."
                  rows={3}
                  className="w-full border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#C8A96B] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black hover:bg-[#C8A96B] text-white rounded-full py-3.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Send Wish Greeting'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 7. GUESTBOOK / WALL OF LOVE */}
      <section className="py-20 px-4 bg-[#FAF9F6] border-t border-gray-100/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Wishes & Greetings</span>
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900" style={{ fontFamily: fontHeader }}>
              Guestbook
            </h2>
          </div>

          {loadingRsvps ? (
            <div className="text-center py-8 text-xs text-gray-400 font-light">Loading messages...</div>
          ) : rsvps.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-100 p-8 shadow-xs">
              <MessageSquare className="w-8 h-8 mx-auto text-gray-300 stroke-[1] mb-2" />
              <p className="text-xs text-gray-400 font-light">No messages left yet. Be the first to congratulate the host!</p>
            </div>
          ) : (
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
              {rsvps.map((item, idx) => (
                <div 
                  key={item._id || idx} 
                  className="bg-white border border-gray-100/50 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-gray-800">{item.name}</span>
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider border bg-amber-50/50 border-[#C8A96B]/20 text-[#C8A96B]">
                        Wished ✨
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-300 font-light">
                      {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  {item.message && (
                    <p className="text-xs text-gray-500 leading-relaxed font-light italic">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 8. MESSAGE FROM HOSTS & FLOATING SHARE BAR */}
      <section className="py-24 px-4 bg-white border-t border-gray-100/30 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">A Message From Us</span>
          <p className="text-sm text-gray-500 font-light max-w-md mx-auto leading-relaxed">
            Your love, blessings and presence on our special day will mean the world to us.
          </p>
          <h2 className="text-3xl font-light text-[#C8A96B] italic font-playfair" style={{ fontFamily: fontSub }}>
            We can&apos;t wait to celebrate with you!
          </h2>
          <div className="flex justify-center items-center gap-1.5 text-red-400">
            <Heart className="w-3.5 h-3.5 fill-current" style={{ color: `${primaryColor}60` }} />
          </div>
        </div>
      </section>
    </div>
  );
}