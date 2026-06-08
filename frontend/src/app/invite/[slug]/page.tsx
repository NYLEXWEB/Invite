import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { apiService } from '../../../services/api';
import PublicInvitationClient from '../../../components/PublicInvitationClient';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate dynamic SEO and OpenGraph metadata based on the invitation details
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const invite = await apiService.getInvitationBySlug(slug);
    
    let title = 'Digital Invitation';
    let description = `You are cordially invited to celebrate with us.`;
    
    if (invite.userData) {
      const isWish = invite.userData.mode === 'wish';
      const host = invite.userData.recipientName || 
                   invite.userData.coupleNames || 
                   invite.userData.name || 
                   (invite.userData.groomName && `${invite.userData.groomName} & ${invite.userData.brideName}`) || 
                   invite.userData.familyName ||
                   invite.userData.parentNames;
                   
      if (host) {
        const typeCapitalized = invite.serviceType.charAt(0).toUpperCase() + invite.serviceType.slice(1);
        title = isWish ? `Greeting Wish for ${host}` : `${host}'s ${typeCapitalized} Invitation`;
      }
      
      if (invite.userData.message) {
        description = invite.userData.message;
      }
    }

    // Resolve cover image for social previews
    const imageUrl = invite.image ? apiService.getMediaUrl(invite.image) : '';

    return {
      title: `${title} | InviteHub`,
      description,
      openGraph: {
        title: `${title} | InviteHub`,
        description,
        type: 'website',
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} | InviteHub`,
        description,
        images: imageUrl ? [imageUrl] : [],
      }
    };
  } catch {
    return {
      title: 'Digital Invitation | InviteHub',
      description: 'View this digital invitation card online.'
    };
  }
}

export default async function PublicInvitationPage({ params }: Props) {
  const { slug } = await params;
  let invite = null;
  let fetchError = null;

  try {
    invite = await apiService.getInvitationBySlug(slug);
  } catch (err: any) {
    fetchError = err.message || 'Invitation not found.';
  }

  // Error/Expired Fallback state
  if (fetchError || !invite) {
    return (
      <div className="min-h-screen bg-[#FCFDFE] flex flex-col justify-center items-center px-4 py-12 text-center">
        <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-lg">
          <div className="mx-auto w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-6">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <h1 className="font-playfair text-2xl font-light text-luxury-dark mb-3">
            Invitation Expired or Not Found
          </h1>
          <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
            To ensure privacy and data security, digital invitations created on InviteHub are automatically deleted 7 days after generation.
          </p>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center rounded-full bg-luxury-dark px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-gold-500 transition-all duration-300 gap-1.5"
          >
            Create Your Own
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      {/* Immersive Scrollable Invitation Website */}
      <PublicInvitationClient invite={invite} />

      {/* Create invitation card conversion banner */}
      <div className="mt-16 mb-8 max-w-md w-full mx-auto text-center px-4">
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col items-center gap-3">
          <h3 className="font-playfair text-lg font-light text-luxury-dark">
            Create Your Own Digital Invitation
          </h3>
          <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs">
            Want to make a digital card like this? Design and customize premium invitations for free on InviteHub.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-full bg-luxury-dark hover:bg-gold-500 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 gap-1.5 shadow-sm"
          >
            Start Designing
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Powered by Logo branding (promotes conversions) */}
      <div className="text-center pb-12 mt-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 group hover:opacity-90 transition-opacity"
        >
          <span className="text-2xs uppercase tracking-widest text-gray-400 font-light">
            Created with
          </span>
          <span className="font-cinzel text-xs font-bold tracking-wider text-luxury-dark flex items-center gap-1">
            INVITE<span className="text-gold-500 font-sans font-light">HUB</span>
          </span>
          <Sparkles className="w-3.5 h-3.5 text-gold-500 transition-transform group-hover:rotate-12" />
        </Link>
      </div>
    </div>
  );
}
