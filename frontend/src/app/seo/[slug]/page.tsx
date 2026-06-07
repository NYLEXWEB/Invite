import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

interface SEOPageData {
  title: string;
  description: string;
  h1: string;
  intro: string;
  type: string;
  keywords: string[];
  features: string[];
  tipsTitle: string;
  tips: string[];
}

const seoPagesData: Record<string, SEOPageData> = {
  'wedding-invitation-maker': {
    title: 'Free Online Wedding Invitation Maker | Luxury Designs',
    description: 'Design beautiful, elegant online digital wedding invitations. Choose templates, upload photos, and generate shareable links instantly.',
    h1: 'Digital Wedding Invitation Maker',
    intro: 'Celebrate your love with a luxury online wedding invitation. Crafted with elegant typography and custom configurations, InviteHub makes sharing your special day effortless.',
    type: 'wedding',
    keywords: ['wedding invitation', 'digital rsvp', 'online wedding card', 'marriage invite maker'],
    features: [
      'Groom and Bride customized details',
      'High-quality wedding cover photo upload',
      'Time, venue, and detailed ceremony address fields',
      'Elegant Royal Gold and Modern Minimalist templates',
      'Unique secure digital link generation'
    ],
    tipsTitle: 'Wedding Invitation Etiquette Tips',
    tips: [
      'Send digital invites at least 4 to 6 weeks before the wedding.',
      'Clearly specify ceremony start time and parking details.',
      'Add a warm, personalized couple message for your guests.'
    ]
  },
  'birthday-invitation-maker': {
    title: 'Digital Birthday Invitation Maker | Custom Templates',
    description: 'Create premium, modern digital birthday invitations. Customize age, theme, upload photos, and invite guests via WhatsApp instantly.',
    h1: 'Digital Birthday Invitation Maker',
    intro: 'Throw the perfect party with a stunning digital birthday card. Quick, elegant, and completely responsive on all devices.',
    type: 'birthday',
    keywords: ['birthday card maker', 'digital birthday invite', 'whatsapp birthday invitation', 'online party card'],
    features: [
      'Age and celebrated name configuration',
      'Vibrant photo uploads of the birthday guest',
      'Party venue and schedule details',
      'Modern, playful font styles',
      'One-click WhatsApp and Telegram sharing'
    ],
    tipsTitle: 'Planning a Birthday Bash?',
    tips: [
      'Ensure the theme matches the digital invitation style.',
      'Double-check that the RSVP link is sent to all group chats.',
      'State clearly if it is a themed party or if gifts are optional.'
    ]
  },
  'housewarming-invitation-maker': {
    title: 'Housewarming Invitation Card Maker Online | InviteHub',
    description: 'Design cozy, welcoming digital housewarming invitations. Customize your new address, add messages, and share with family instantly.',
    h1: 'Housewarming Invitation Maker',
    intro: 'Invite family and friends to celebrate your new home with a premium, elegant housewarming invitation card. Clean designs, fast generation.',
    type: 'housewarming',
    keywords: ['housewarming invitation', 'new home invite', 'griha pravesh card', 'online housewarming maker'],
    features: [
      'Family name and host details',
      'New home cover image upload',
      'Detailed house address and directions field',
      'Warm welcoming font combinations',
      'Auto-clean link expiry for security'
    ],
    tipsTitle: 'Welcoming Guests to Your New Nest',
    tips: [
      'Share details about parking or nearby landmarks.',
      'Include a message about food arrangements or house tours.',
      'Send your invite 2 weeks prior to allow guests to plan.'
    ]
  },
  'anniversary-invitation-maker': {
    title: 'Elegant Anniversary Invitation Maker | InviteHub',
    description: 'Create custom digital wedding anniversary invitations. Perfect for milestone years (25th, 50th), couples photos, and instant sharing.',
    h1: 'Anniversary Invitation Maker',
    intro: 'Celebrate decades of love. Create a premium digital anniversary invitation card using refined templates and shareable links.',
    type: 'anniversary',
    keywords: ['anniversary card maker', 'wedding anniversary invite', 'milestone anniversary card'],
    features: [
      'Couple names and milestone year',
      'Time-honored couple photo upload',
      'Date, time, and dinner venue options',
      'Filigree gold luxury frames and cards',
      'Instant copy-to-clipboard sharing'
    ],
    tipsTitle: 'Celebrating Milestones Beautifully',
    tips: [
      'Mention the milestone year (e.g. Silver or Golden Jubilee) clearly.',
      'Include a brief note reflecting on the couple\'s journey.',
      'Provide clear dress code rules if it\'s a formal banquet.'
    ]
  },
  'baby-shower-invitation-maker': {
    title: 'Sweet Baby Shower Invitation Maker Online | InviteHub',
    description: 'Create cute, pastel, and elegant digital baby shower invitations. Add parent names, location, photos, and share in seconds.',
    h1: 'Baby Shower Invitation Maker',
    intro: 'Celebrate the upcoming arrival of your bundle of joy with a sweet and elegant digital baby shower invitation card.',
    type: 'babyshower',
    keywords: ['baby shower invite', 'pastel baby shower card', 'digital baby card', 'newborn invite maker'],
    features: [
      'Parent names and baby nickname/gender configuration',
      'Cute pastel themes and illustration placeholders',
      'Baby registry options or gift notes',
      'Date, time, and diaper raffle details',
      'Responsive mobile templates'
    ],
    tipsTitle: 'Welcoming Baby Tips',
    tips: [
      'Include links to baby registries in your invitation message.',
      'Indicate if the baby shower is co-ed or traditional.',
      'Send invitations 3 to 4 weeks before the shower date.'
    ]
  }
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = seoPagesData[slug];
  
  if (!data) {
    return {
      title: 'Not Found | InviteHub',
    };
  }

  return {
    title: `${data.title} | InviteHub`,
    description: data.description,
    keywords: data.keywords.join(', '),
    openGraph: {
      title: data.title,
      description: data.description,
      type: 'website',
    }
  };
}

export default async function SEOPage({ params }: Props) {
  const { slug } = await params;
  const data = seoPagesData[slug];

  if (!data) {
    notFound();
  }

  return (
    <>
      <Header />
      
      <main className="flex-grow bg-white">
        {/* Editorial Hero */}
        <section className="relative overflow-hidden py-20 border-b border-gray-100">
          <div className="absolute top-0 right-0 -z-10 translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold-50/30 blur-3xl" />
          
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-gold-200 bg-gold-50/20 px-3.5 py-1 text-xs font-medium tracking-wide text-gold-800 mb-6 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                Specialized Creator
              </div>
              <h1 className="font-playfair text-4xl sm:text-5xl font-light text-luxury-dark mb-6 leading-tight">
                {data.h1}
              </h1>
              <p className="text-lg text-gray-500 font-light leading-relaxed max-w-3xl mx-auto mb-10">
                {data.intro}
              </p>
              
              <Link
                href={`/create?type=${data.type}`}
                className="inline-flex items-center justify-center rounded-full bg-luxury-dark px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg hover:bg-gold-500 transition-all duration-300 gap-2"
              >
                Create {data.h1.replace(' Maker', '')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              
              {/* Left Column: Features */}
              <div>
                <h2 className="font-playfair text-2xl font-light text-luxury-dark mb-6">
                  Platform Features & Capabilities
                </h2>
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-8">
                  Our professional SaaS-grade invitation editor provides you with all the tools necessary to build and publish premium designs.
                </p>
                <ul className="flex flex-col gap-4">
                  {data.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 leading-relaxed font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Tips */}
              <div className="rounded-3xl bg-luxury-gray p-8 border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5 text-gold-500" />
                    <h3 className="font-semibold text-luxury-dark text-base">
                      {data.tipsTitle}
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-4 text-sm text-gray-500 font-light leading-relaxed">
                    {data.tips.map((tip, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-gold-500 font-semibold">{idx + 1}.</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200/60 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                  <p className="text-xs text-gray-400 font-light leading-normal">
                    This digital invitation features a secure 7-day automatic data cleanup policy, ensuring privacy of your event details and uploads.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
