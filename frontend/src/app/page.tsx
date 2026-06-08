'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  ArrowRight, Play, ArrowUpRight, Sparkles, Zap, Share2, Lock, Gift, Star, ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const categories = [
    {
      id: 'wedding',
      name: 'Wedding',
      description: 'Celebrate Eternal Love',
      icon: (
        <svg className="w-10 h-10 stroke-[#C8A96B] fill-none stroke-[1.25]" viewBox="0 0 24 24">
          <circle cx="9" cy="14" r="4.5" />
          <circle cx="15" cy="14" r="4.5" />
          <path d="M12 9.5c-.4-.4-.8-.8-1.5-.8-1 0-1.7.7-1.7 1.7 0 1.2 1.5 2.5 3.2 3.5 1.7-1 3.2-2.3 3.2-3.5 0-1-.7-1.7-1.7-1.7-.7 0-1.1.4-1.5.8z" />
        </svg>
      )
    },
    {
      id: 'birthday',
      name: 'Birthday',
      description: 'Make Memories Shine',
      icon: (
        <svg className="w-10 h-10 stroke-[#C8A96B] fill-none stroke-[1.25]" viewBox="0 0 24 24">
          <path d="M12 4v4M12 4c.3.5.3 1 0 1.5c-.3-.5-.3-1 0-1.5z" />
          <rect x="7" y="8" width="10" height="4" rx="1.5" />
          <rect x="5" y="12" width="14" height="6" rx="1.5" />
          <rect x="4" y="18" width="16" height="2" rx="0.5" />
        </svg>
      )
    },
    {
      id: 'anniversary',
      name: 'Anniversary',
      description: 'Cherish Every Year',
      icon: (
        <svg className="w-10 h-10 stroke-[#C8A96B] fill-none stroke-[1.25]" viewBox="0 0 24 24">
          <path d="M12 8.5c-1-1.2-2.5-1.8-4-1.8-2.8 0-5 2.2-5 5 0 3.8 4.5 7.2 9 10 4.5-2.8 9-6.2 9-10 0-2.8-2.2-5-5-5-1.5 0-3 .6-4 1.8z" />
          <path d="M15.5 5.5c-.7-.8-1.7-1.2-2.8-1.2-2 0-3.6 1.6-3.6 3.6 0 2.7 3.2 5.1 6.4 7.1 3.2-2 6.4-4.4 6.4-7.1 0-2-1.6-3.6-3.6-3.6-1.1 0-2.1.4-2.8 1.2z" />
        </svg>
      )
    },
    {
      id: 'housewarming',
      name: 'Housewarming',
      description: 'Begin a New Chapter',
      icon: (
        <svg className="w-10 h-10 stroke-[#C8A96B] fill-none stroke-[1.25]" viewBox="0 0 24 24">
          <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z" />
          <path d="M9 21V12h6v9" />
          <path d="M18 6V4h-2v2.5" />
        </svg>
      )
    },
    {
      id: 'babyshower',
      name: 'Baby Shower',
      description: 'Welcome Little Blessings',
      icon: (
        <svg className="w-10 h-10 stroke-[#C8A96B] fill-none stroke-[1.25]" viewBox="0 0 24 24">
          <circle cx="8" cy="19" r="2" />
          <circle cx="16" cy="19" r="2" />
          <path d="M5 8h14a3 3 0 0 1 3 3v2a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-2a3 3 0 0 1 3-3z" />
          <path d="M5 12a5 5 0 0 1 10 0" />
          <path d="M19 8h2v3" />
        </svg>
      )
    },
    {
      id: 'engagement',
      name: 'Engagement',
      description: 'A Promise of Forever',
      icon: (
        <svg className="w-10 h-10 stroke-[#C8A96B] fill-none stroke-[1.25]" viewBox="0 0 24 24">
          <circle cx="12" cy="15" r="5" />
          <path d="M12 10l-2.5-3h5L12 10z" />
          <path d="M9.5 7L12 4.5 14.5 7" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        
        {/* =======================================================
           1. PREMIUM HERO SECTION
           ======================================================= */}
        <section 
          className="relative overflow-hidden py-20 lg:py-32"
          style={{ 
            backgroundColor: '#FAF8F5',
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(200, 169, 107, 0.08) 0%, transparent 60%)'
          }}
        >
          {/* Subtle gold grid lines in background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(200,169,107,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,169,107,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
              
              {/* Left Column Details */}
              <div className="lg:col-span-7 flex flex-col items-start space-y-6">
                
                {/* Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#C8A96B]/25 bg-white px-4 py-1.5 text-[9px] font-bold tracking-widest text-[#C8A96B] uppercase shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  CREATE • SHARE • CELEBRATE
                </motion.div>

                {/* Main Heading */}
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-playfair text-4xl sm:text-5xl lg:text-6.5xl font-light text-gray-900 leading-[1.1]"
                >
                  Create Beautiful <br />
                  <span className="font-playfair font-normal italic tracking-wide text-[#C8A96B]">Digital Cards</span> in Minutes
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-gray-400 font-light text-sm sm:text-base leading-relaxed max-w-lg"
                >
                  Design premium, interactive digital invitations and greeting cards for all life’s precious milestones. Fully responsive, highly customizable, and completely free.
                </motion.p>

                {/* Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
                >
                  <Link
                    href="/create"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-black hover:bg-[#C8A96B] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-black/10 hover:shadow-[#C8A96B]/15 transition-all duration-300 group"
                  >
                    Start Designing Free
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white hover:bg-gray-50 border border-gray-150 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-gray-700 transition-all duration-300 shadow-2xs"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#C8A96B]">
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </span>
                    See How It Works
                  </Link>
                </motion.div>

                {/* Feature Icons Grid */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-gray-200/60 w-full"
                >
                  <div className="flex gap-3 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#C8A96B]/15 flex items-center justify-center text-[#C8A96B] shrink-0 shadow-3xs group-hover:scale-105 group-hover:border-[#C8A96B]/30 transition-all duration-300">
                      <Gift className="w-4.5 h-4.5 stroke-[1.5]" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-800">100% Free</h4>
                      <p className="text-[9px] text-gray-400 font-light mt-0.5 leading-tight">No Hidden Costs</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#C8A96B]/15 flex items-center justify-center text-[#C8A96B] shrink-0 shadow-3xs group-hover:scale-105 group-hover:border-[#C8A96B]/30 transition-all duration-300">
                      <Zap className="w-4.5 h-4.5 stroke-[1.5]" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-800">Instant Build</h4>
                      <p className="text-[9px] text-gray-400 font-light mt-0.5 leading-tight">No Skills Needed</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#C8A96B]/15 flex items-center justify-center text-[#C8A96B] shrink-0 shadow-3xs group-hover:scale-105 group-hover:border-[#C8A96B]/30 transition-all duration-300">
                      <Share2 className="w-4.5 h-4.5 stroke-[1.5]" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-800">Easy Share</h4>
                      <p className="text-[9px] text-gray-400 font-light mt-0.5 leading-tight">WhatsApp & SMS</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#C8A96B]/15 flex items-center justify-center text-[#C8A96B] shrink-0 shadow-3xs group-hover:scale-105 group-hover:border-[#C8A96B]/30 transition-all duration-300">
                      <Lock className="w-4.5 h-4.5 stroke-[1.5]" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-800">Private & Safe</h4>
                      <p className="text-[9px] text-gray-400 font-light mt-0.5 leading-tight">Secure & Monitored</p>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Right Column Showcase Mockup */}
              <div className="lg:col-span-5 flex items-center justify-center relative select-none">
                <div className="absolute w-[125%] h-[125%] bg-gradient-to-tr from-[#C8A96B]/8 to-transparent blur-3xl -z-10 rounded-full" />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="w-full max-w-[440px] lg:max-w-none shadow-2xl rounded-3xl overflow-hidden border border-white p-3 bg-white/40 backdrop-blur-xs hover:scale-101 transition-transform duration-500"
                  style={{
                    boxShadow: '0 30px 70px -10px rgba(200, 169, 107, 0.22)'
                  }}
                >
                  <img 
                    src="/assets/hero_mockup.png" 
                    alt="Luxury Wedding Invitation Card Mockup" 
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* =======================================================
           2. OCCASION SELECTION SECTION
           ======================================================= */}
        <section id="categories" className="py-24 sm:py-32 bg-white scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Headers and decorative divider */}
            <div className="text-center max-w-xl mx-auto mb-20 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A96B]">
                INVITATIONS & WISHES FOR EVERY OCCASION
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-light text-gray-950">
                Choose Your Category
              </h2>
              {/* Divider lines with small heart in center */}
              <div className="flex justify-center items-center gap-3 pt-2">
                <div className="w-10 h-[0.75px] bg-[#C8A96B]/40" />
                <span className="text-[9px] text-[#C8A96B] fill-current">♥</span>
                <div className="w-10 h-[0.75px] bg-[#C8A96B]/40" />
              </div>
            </div>

            {/* Occasion Cards grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.06 }}
                >
                  <Link
                    href={`/create?type=${cat.id}`}
                    className="group relative flex flex-col items-center text-center rounded-2xl border border-gray-100 hover:border-[#C8A96B]/30 bg-white p-6 pt-10 pb-8 shadow-3xs hover:shadow-lg hover:shadow-[#C8A96B]/5 transition-all duration-300 min-h-[200px]"
                  >
                    {/* Circle back shadow */}
                    <div className="absolute top-8 w-14 h-14 rounded-full bg-[#FAF8F5] -z-10 group-hover:scale-110 transition-transform duration-300" />
                    
                    {/* Outline Icon */}
                    <div className="transition-transform duration-500 group-hover:scale-108 mb-6 shrink-0 relative z-10">
                      {cat.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-semibold text-xs text-gray-900 uppercase tracking-wider mb-1 relative z-10">
                      {cat.name}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-[9px] text-gray-400 font-light relative z-10">
                      {cat.description}
                    </p>

                    {/* Bottom-right small circular arrow */}
                    <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-gray-50 border border-gray-100 group-hover:border-[#C8A96B]/30 flex items-center justify-center text-gray-400 group-hover:text-[#C8A96B] transition-all duration-300 shadow-3xs">
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* =======================================================
           3. HOW IT WORKS SECTION (NEW PREMIUM SECTION)
           ======================================================= */}
        <section id="how-it-works" className="py-24 sm:py-32 bg-[#FAF8F5]/60 border-y border-gray-100/60 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-xl mx-auto mb-20 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A96B]">
                THREE SIMPLE STEPS
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-light text-gray-950">
                How It Works
              </h2>
              <div className="flex justify-center items-center gap-3 pt-1">
                <div className="w-10 h-[0.75px] bg-[#C8A96B]/40" />
                <span className="text-[9px] text-[#C8A96B]">✦</span>
                <div className="w-10 h-[0.75px] bg-[#C8A96B]/40" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="text-center space-y-4 relative group">
                <div className="w-16 h-16 rounded-full bg-white border border-[#C8A96B]/25 flex items-center justify-center text-xl font-light font-playfair text-[#C8A96B] mx-auto shadow-md group-hover:scale-105 transition-transform duration-300">
                  01
                </div>
                <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wider">
                  Fill Details & Purpose
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs mx-auto">
                  Choose your category and fill out key details. Select between an interactive RSVP invitation or a stylized greeting card with reply walls.
                </p>
                {/* Arrow connector in desktop */}
                <div className="hidden md:block absolute top-8 left-2/3 w-1/2 h-[0.75px] bg-dashed border-t border-dashed border-[#C8A96B]/30" />
              </div>

              {/* Step 2 */}
              <div className="text-center space-y-4 relative group">
                <div className="w-16 h-16 rounded-full bg-white border border-[#C8A96B]/25 flex items-center justify-center text-xl font-light font-playfair text-[#C8A96B] mx-auto shadow-md group-hover:scale-105 transition-transform duration-300">
                  02
                </div>
                <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wider">
                  Pick A Premium Template
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs mx-auto">
                  Browse a catalog of designed templates matching your style. Instantly review font sizes, luxury frames, background images, and songs.
                </p>
                {/* Arrow connector in desktop */}
                <div className="hidden md:block absolute top-8 left-2/3 w-1/2 h-[0.75px] bg-dashed border-t border-dashed border-[#C8A96B]/30" />
              </div>

              {/* Step 3 */}
              <div className="text-center space-y-4 group">
                <div className="w-16 h-16 rounded-full bg-white border border-[#C8A96B]/25 flex items-center justify-center text-xl font-light font-playfair text-[#C8A96B] mx-auto shadow-md group-hover:scale-105 transition-transform duration-300">
                  03
                </div>
                <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wider">
                  Generate & Share Links
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs mx-auto">
                  Instantly publish your page and generate dynamic links to share directly on WhatsApp. Track RSVPs and wishes directly.
                </p>
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="text-center pt-16">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-[#C8A96B] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 shadow-md"
              >
                Create Your Card Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* =======================================================
           4. SHOWCASE TESTIMONIAL GALLERY (NEW PREMIUM SECTION)
           ======================================================= */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-xl mx-auto mb-20 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A96B]">
                CURATED GUEST EXPERIENCES
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-light text-gray-950">
                Loved by Hosts & Guests
              </h2>
              <div className="flex justify-center items-center gap-3 pt-1">
                <div className="w-10 h-[0.75px] bg-[#C8A96B]/40" />
                <span className="text-[9px] text-[#C8A96B]">★</span>
                <div className="w-10 h-[0.75px] bg-[#C8A96B]/40" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Testimonial Card 1 */}
              <div className="bg-[#FAF8F5]/50 border border-gray-100 rounded-3xl p-8 space-y-6 flex flex-col justify-between hover:scale-101 hover:shadow-md transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-xs text-gray-500 font-light italic leading-relaxed">
                    &ldquo;We created our wedding invitation on InviteHub. The animations, luxury background layouts, and dynamic maps blew our guests away. Having RSVPs updated in real-time was incredibly helpful!&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-150">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600">SM</div>
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-800">Sarah & Mark</h4>
                    <span className="text-[8px] uppercase tracking-widest text-gray-400 font-medium">Wedding Card Hosts</span>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 2 */}
              <div className="bg-[#FAF8F5]/50 border border-gray-100 rounded-3xl p-8 space-y-6 flex flex-col justify-between hover:scale-101 hover:shadow-md transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-xs text-gray-500 font-light italic leading-relaxed">
                    &ldquo;The new Greeting Wish e-card layout is outstanding. I generated a birthday wish card for my sister; when she opened the wax seal envelope, the chimes played, balloons floated, and she got to see replies from all our friends on the wall.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-150">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">AD</div>
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-800">Ashley Davis</h4>
                    <span className="text-[8px] uppercase tracking-widest text-gray-400 font-medium">Greeting Wish Creator</span>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 3 */}
              <div className="bg-[#FAF8F5]/50 border border-gray-100 rounded-3xl p-8 space-y-6 flex flex-col justify-between hover:scale-101 hover:shadow-md transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-xs text-gray-500 font-light italic leading-relaxed">
                    &ldquo;Simple, responsive, and elegant. I created a housewarming invitation card within 5 minutes. The page adapts perfectly on mobile, making sharing it on WhatsApp extremely easy and natural.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-150">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-600">RP</div>
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-800">Robert Patel</h4>
                    <span className="text-[8px] uppercase tracking-widest text-gray-400 font-medium">Housewarming Host</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
