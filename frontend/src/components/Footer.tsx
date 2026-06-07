import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const seoLinks = [
    { name: 'Wedding Invitation Maker', href: '/seo/wedding-invitation-maker' },
    { name: 'Birthday Invitation Maker', href: '/seo/birthday-invitation-maker' },
    { name: 'Housewarming Invitation Maker', href: '/seo/housewarming-invitation-maker' },
    { name: 'Anniversary Invitation Maker', href: '/seo/anniversary-invitation-maker' },
    { name: 'Baby Shower Invitation Maker', href: '/seo/baby-shower-invitation-maker' }
  ];

  return (
    <footer className="mt-auto border-t border-[#C8A96B]/10 bg-[#FAF8F5] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo & Pitch */}
          <div className="flex flex-col gap-4">
            <span className="font-cinzel text-lg font-bold tracking-widest text-[#111111]">
              INVITE<span className="text-[#C8A96B] font-sans font-light">HUB</span>
            </span>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs font-light">
              Elegantly designed digital invitations for your most memorable moments. Fully customizable, instant generation, and automatically self-cleaning.
            </p>
          </div>

          {/* SEO Invitation Creators */}
          <div className="flex flex-col gap-4">
            <h4 className="text-2xs font-semibold uppercase tracking-widest text-gray-800">
              Digital Creators
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-500 font-light">
              {seoLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#C8A96B] transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Rules & Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="text-2xs font-semibold uppercase tracking-widest text-gray-800">
              Safety & Lifecycle
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-500 font-light">
              <li>
                <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-3xs font-semibold uppercase tracking-widest text-[#C8A96B] border border-[#C8A96B]/20">
                  7-Day Auto Cleanup
                </span>
              </li>
              <li>
                <p className="text-3xs text-gray-400 max-w-xs leading-normal">
                  To protect your privacy and optimize resources, all invitations, analytics, and uploaded images are automatically and permanently deleted 7 days after creation.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-3xs text-gray-400 font-light tracking-wider uppercase">
            &copy; {currentYear} InviteHub Platform. Designed in Switzerland. All rights reserved.
          </p>
          <div className="flex gap-6 text-3xs text-gray-400 font-light uppercase tracking-wider">
            <Link href="/" className="hover:text-black transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-black transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
