'use client';

import Link from 'next/link';
import { User, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Brand Section */}
          <div className="flex items-center">
            <Link href="/" className="flex flex-col items-start leading-none group">
              <span 
                className="text-3xl font-normal text-[#C8A96B] transition-opacity hover:opacity-90 select-none"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Inviteo
              </span>
              <span className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold mt-1">
                Make Every Occasion Special
              </span>
            </Link>
          </div>
          
          {/* Menu items */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-gray-500">
            <Link href="/" className="relative text-gray-900 transition-colors duration-300">
              Home
              <span className="absolute left-0 -bottom-1.5 w-full h-[1.5px] bg-[#C8A96B]" />
            </Link>
            <Link href="/#about" className="hover:text-[#C8A96B] transition-colors duration-300">
              About
            </Link>
            <Link href="/#categories" className="hover:text-[#C8A96B] transition-colors duration-300">
              Templates
            </Link>
            <Link href="/#how-it-works" className="hover:text-[#C8A96B] transition-colors duration-300">
              How It Works
            </Link>
            <Link href="/#contact" className="hover:text-[#C8A96B] transition-colors duration-300">
              Contact
            </Link>
          </nav>

          {/* Action button */}
          <div className="flex items-center gap-4">
            <Link
              href="/analytics"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 hover:border-[#C8A96B]/40 bg-white px-5 py-2.5 text-xs font-semibold text-gray-700 hover:text-[#C8A96B] shadow-2xs hover:shadow-xs transition-all duration-300"
            >
              <User className="h-4 w-4 stroke-[1.5]" />
              My Invitations
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
