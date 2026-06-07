'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  ArrowRight,
  Play,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const categories = [
    {
      id: 'wedding',
      name: 'Wedding',
      description: 'Celebrate Love',
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
      description: 'Make it Special',
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
      description: 'Cherish Moments',
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
      description: 'New Beginnings',
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
      description: 'Welcome Baby',
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
      description: 'Future Together',
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
        
        {/* 1. HERO SECTION */}
        <section 
          className="relative overflow-hidden py-20 lg:py-28"
          style={{ 
            backgroundColor: '#FAF8F5',
            backgroundImage: 'radial-gradient(circle at 75% 25%, rgba(200, 169, 107, 0.05) 0%, transparent 65%)'
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column Text Details */}
              <div className="lg:col-span-7 flex flex-col items-start space-y-6">
                
                {/* Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#C8A96B]/30 bg-white px-4 py-1.5 text-[10px] font-semibold tracking-widest text-[#C8A96B] uppercase"
                >
                  <span>✨</span>
                  Create • Share • Celebrate
                </motion.div>

                {/* Main Heading */}
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 leading-[1.12]"
                >
                  Create Beautiful <br />
                  <span className="text-[#C8A96B]">Invitations</span> in Minutes
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-gray-400 font-light text-sm sm:text-base leading-relaxed max-w-lg"
                >
                  Design stunning digital invitations for any occasion. <br />
                  Easy to create, share and remember forever.
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
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C8A96B] hover:bg-[#b59659] px-7 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-all duration-300 group"
                  >
                    Create Free Invitation
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="#categories"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white hover:bg-gray-50 border border-gray-100 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-gray-700 transition-all duration-300"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#C8A96B]">
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </span>
                    How It Works
                  </Link>
                </motion.div>

                {/* Four Feature Indicators */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-gray-200/50 w-full"
                >
                  <div className="flex gap-3 items-start">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B] shrink-0 shadow-3xs">
                      <svg className="w-4.5 h-4.5 stroke-current fill-none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v8M8 12h8" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-800">100% Free</h4>
                      <p className="text-[9px] text-gray-400 font-light mt-0.5 leading-tight">Forever</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B] shrink-0 shadow-3xs">
                      <svg className="w-4.5 h-4.5 stroke-current fill-none" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-800">Easy to Use</h4>
                      <p className="text-[9px] text-gray-400 font-light mt-0.5 leading-tight">No Design Skills</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B] shrink-0 shadow-3xs">
                      <svg className="w-4.5 h-4.5 stroke-current fill-none" viewBox="0 0 24 24">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-800">Share Anywhere</h4>
                      <p className="text-[9px] text-gray-400 font-light mt-0.5 leading-tight">One Click Sharing</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#C8A96B]/20 flex items-center justify-center text-[#C8A96B] shrink-0 shadow-3xs">
                      <svg className="w-4.5 h-4.5 stroke-current fill-none" viewBox="0 0 24 24">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-800">Secure & Private</h4>
                      <p className="text-[9px] text-gray-400 font-light mt-0.5 leading-tight">Your Data Safe</p>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Right Column Illustration Card mockup */}
              <div className="lg:col-span-5 flex items-center justify-center relative select-none">
                {/* Floating circle gradient */}
                <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-[#C8A96B]/5 to-transparent blur-3xl -z-10 rounded-full" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="w-full max-w-[420px] lg:max-w-none shadow-2xl rounded-3xl overflow-hidden border border-white p-2.5 bg-white/40 backdrop-blur-xs"
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

        {/* 2. CHOOSE OCCASION SECTION */}
        <section id="categories" className="py-24 sm:py-28 bg-white scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Headers and decorative divider */}
            <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A96B]">
                Invitations for Every Occasion
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-light text-gray-950">
                Choose Your Occasion
              </h2>
              {/* Divider lines with small heart in center */}
              <div className="flex justify-center items-center gap-3 pt-2">
                <div className="w-10 h-[0.75px] bg-[#C8A96B]/40" />
                <span className="text-[9px] text-[#C8A96B] fill-current">♥</span>
                <div className="w-10 h-[0.75px] bg-[#C8A96B]/40" />
              </div>
            </div>

            {/* Occasion Cards grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                >
                  <Link
                    href={`/create?type=${cat.id}`}
                    className="group relative flex flex-col items-center text-center rounded-2xl border border-gray-100 hover:border-[#C8A96B]/30 bg-white p-6 pt-8 pb-7 shadow-3xs hover:shadow-md transition-all duration-300 min-h-[190px]"
                  >
                    {/* Outline Icon */}
                    <div className="transition-transform duration-300 group-hover:scale-105 mb-5 shrink-0">
                      {cat.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-semibold text-xs text-gray-900 uppercase tracking-wider mb-1">
                      {cat.name}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-[9px] text-gray-400 font-light">
                      {cat.description}
                    </p>

                    {/* Bottom-right small circular arrow */}
                    <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-gray-50 border border-gray-100 group-hover:border-[#C8A96B]/30 flex items-center justify-center text-gray-400 group-hover:text-[#C8A96B] transition-all duration-300">
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
