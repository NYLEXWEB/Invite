'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Heart, Cake, Sparkles, Home, Gift, Gem, ArrowLeft, ArrowRight,
  Upload, Copy, Share2, Check, ExternalLink, Loader2, LayoutGrid,
  Scroll, Flower, Feather, CheckCircle2, Eye, Link2, Music
} from 'lucide-react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InvitationRenderer from '../../components/InvitationRenderer';
import PublicInvitationClient from '../../components/PublicInvitationClient';
import { apiService } from '../../services/api';
import { Template, ServiceType } from '../../types';

// Zod Validation Schemas - DO NOT modify business logic/schema shapes
const weddingSchema = z.object({
  groomName: z.string().min(2, 'Groom Name must be at least 2 characters'),
  brideName: z.string().min(2, 'Bride Name must be at least 2 characters'),
  weddingDate: z.string().min(1, 'Wedding Date is required'),
  time: z.string().min(1, 'Time is required'),
  venue: z.string().min(3, 'Venue must be at least 3 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  message: z.string().max(400, 'Message must be under 400 characters').optional()
});

const birthdaySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.coerce.number().min(1, 'Age must be at least 1').max(120, 'Invalid age'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  venue: z.string().min(3, 'Venue must be at least 3 characters'),
  message: z.string().max(400, 'Message must be under 400 characters').optional()
});

const anniversarySchema = z.object({
  coupleNames: z.string().min(4, 'Names must be at least 4 characters'),
  anniversaryYear: z.coerce.number().min(1, 'Year must be at least 1').max(100, 'Invalid year'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  venue: z.string().min(3, 'Venue must be at least 3 characters'),
  message: z.string().max(400, 'Message must be under 400 characters').optional()
});

const housewarmingSchema = z.object({
  familyName: z.string().min(2, 'Family Name must be at least 2 characters'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  message: z.string().max(400, 'Message must be under 400 characters').optional()
});

const babyShowerSchema = z.object({
  parentNames: z.string().min(2, 'Parent Names are required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  venue: z.string().min(3, 'Venue must be at least 3 characters'),
  message: z.string().max(400, 'Message must be under 400 characters').optional()
});

const engagementSchema = z.object({
  coupleNames: z.string().min(4, 'Names must be at least 4 characters'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  venue: z.string().min(3, 'Venue must be at least 3 characters'),
  message: z.string().max(400, 'Message must be under 400 characters').optional()
});

const schemaMap: Record<ServiceType, any> = {
  wedding: weddingSchema,
  birthday: birthdaySchema,
  anniversary: anniversarySchema,
  housewarming: housewarmingSchema,
  babyshower: babyShowerSchema,
  engagement: engagementSchema,
  savethedate: engagementSchema
};

function WizardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL State & Steps (4 Steps matching mock layout)
  const initialType = (searchParams.get('type') as ServiceType) || 'wedding';
  const [activeType, setActiveType] = useState<ServiceType>(initialType);
  const [step, setStep] = useState<number>(1); 
  const [mode, setMode] = useState<'invite' | 'wish'>('invite');

  // Templates & Filters
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('All Templates');

  // File Upload State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  // Link Display Tab
  const [linkType, setLinkType] = useState<'invite' | 'wish'>('invite');

  // Generated Result
  const [generatedSlug, setGeneratedSlug] = useState<string>('');
  const [generatedLink, setGeneratedLink] = useState<string>('');

  // UI States
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  // Dynamic Validation Schemas
  const wishSchema = z.object({
    recipientName: z.string().min(2, "Recipient's Name must be at least 2 characters"),
    senderName: z.string().min(2, "Your Name must be at least 2 characters"),
    date: z.string().optional(),
    message: z.string().min(10, 'Wish Message must be at least 10 characters')
  });

  const defaultWishMessages: Record<ServiceType, string> = {
    wedding: "Wishing you both a lifetime of love, laughter, and happiness. May your journey together be filled with beautiful moments and endless blessings. Congratulations on your wedding!",
    birthday: "Happy Birthday! Wishing you a fantastic day and a wonderful year ahead. May all your dreams and wishes come true. Have a great celebration!",
    anniversary: "Happy Anniversary! Congratulations on another year of love, devotion, and companionship. Wishing you many more years of joy and happiness together.",
    housewarming: "Congratulations on your new home! May it be a place of love, laughter, warmth, and beautiful memories. Wishing you all the best as you settle in.",
    babyshower: "So excited to hear the wonderful news! Wishing you all the best on the upcoming arrival of your little one. May your family be blessed with joy and good health.",
    engagement: "Congratulations on your engagement! Wishing you a wonderful journey ahead as you plan your wedding and build your lives together. Best wishes always!",
    savethedate: "Congratulations on your engagement! Wishing you a wonderful journey ahead as you plan your wedding and build your lives together. Best wishes always!"
  };

  const customResolver = async (values: any, context: any, options: any) => {
    const activeSchema = mode === 'wish' ? wishSchema : schemaMap[activeType];
    if (!activeSchema) {
      return {
        values: {},
        errors: {
          form: {
            message: 'Active category schema not found',
            type: 'missing_schema'
          }
        }
      };
    }
    try {
      const data = await activeSchema.parseAsync(values);
      return { values: data, errors: {} };
    } catch (err: any) {
      if (err && Array.isArray(err.errors)) {
        return {
          values: {},
          errors: err.errors.reduce((acc: any, current: any) => {
            if (current.path && current.path.length > 0) {
              acc[current.path[0]] = {
                message: current.message,
                type: current.code || 'validation'
              };
            }
            return acc;
          }, {})
        };
      }
      return {
        values: {},
        errors: {
          form: {
            message: err.message || 'Validation failed',
            type: 'validation_error'
          }
        }
      };
    }
  };

  // Form setup hook
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: customResolver,
    mode: 'onChange'
  });

  // Watch form inputs in real-time
  const formValues = watch();

  // Handle auto-populating mode and default message
  useEffect(() => {
    register('mode');
  }, [register]);

  useEffect(() => {
    setValue('mode', mode);
    if (mode === 'wish') {
      setValue('message', defaultWishMessages[activeType]);
    } else {
      setValue('message', '');
    }
    trigger();
  }, [mode, activeType, setValue, trigger]);

  // Load templates on component mount
  useEffect(() => {
    async function loadTemplates() {
      try {
        const list = await apiService.getTemplates();
        // Filter templates relevant for the active type
        const typeList = list.filter(t => t.serviceType === activeType);
        setTemplates(typeList.length > 0 ? typeList : list);
        
        // Initial filter state
        setFilteredTemplates(typeList.length > 0 ? typeList : list);
        
        // Default select
        const matched = typeList[0] || list[0];
        setSelectedTemplate(matched || null);
      } catch (err) {
        console.error('Failed to load templates', err);
      }
    }
    loadTemplates();
  }, [activeType]);

  // Handle template filters
  useEffect(() => {
    if (selectedStyle === 'All Templates') {
      setFilteredTemplates(templates);
    } else {
      setFilteredTemplates(
        templates.filter(t => t.templateConfig.style === selectedStyle)
      );
    }
  }, [selectedStyle, templates]);

  // Handle active category changes
  const handleTypeChange = (type: ServiceType) => {
    setActiveType(type);
    reset({});
    setImageFile(null);
    setImagePreviewUrl('');
    // Update query params
    const params = new URLSearchParams(window.location.search);
    params.set('type', type);
    router.replace(`/create?${params.toString()}`);
  };

  // Image Selector Action
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image file exceeds the 5MB size limit.');
        return;
      }
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Step transitions
  const goToDesign = () => {
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreview = () => {
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate invitation link (Save to DB)
  const handleGenerateLink = async () => {
    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append('serviceType', activeType);

      const userDataWithTemplate = {
        ...formValues,
        templateConfig: selectedTemplate?.templateConfig || {},
        templateName: selectedTemplate?.templateName || ''
      };

      fd.append('userData', JSON.stringify(userDataWithTemplate));
      
      if (imageFile) {
        fd.append('image', imageFile);
      }

      const invite = await apiService.createInvitation(fd);
      
      setGeneratedSlug(invite.slug);
      
      // Calculate full URL
      const fullUrl = `${window.location.origin}/invite/${invite.slug}`;
      setGeneratedLink(fullUrl);
      setLinkType(mode === 'wish' ? 'wish' : 'invite');
      
      setStep(4); 
      showToast('Invitation generated successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      showToast(err.message || 'Failed to generate invitation.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    showToast('Link copied successfully');
  };

  const categories: { id: ServiceType; label: string; icon: any }[] = [
    { id: 'wedding', label: 'Wedding', icon: Heart },
    { id: 'birthday', label: 'Birthday', icon: Cake },
    { id: 'anniversary', label: 'Anniversary', icon: Gift },
    { id: 'housewarming', label: 'Housewarming', icon: Home },
    { id: 'babyshower', label: 'Baby Shower', icon: Sparkles },
    { id: 'engagement', label: 'Engagement', icon: Gem }
  ];

  const styleFilters = [
    { name: 'All Templates', icon: LayoutGrid },
    { name: 'Traditional', icon: Scroll },
    { name: 'Floral', icon: Flower },
    { name: 'Minimal', icon: Feather },
    { name: 'Modern', icon: Sparkles },
    { name: 'Luxury', icon: Gem }
  ];

  // Dynamically resolve naming preview for thumbnail cards
  const getGroomPreview = () => {
    if (mode === 'wish') {
      return formValues.recipientName || 'Dear Friend';
    }
    if (activeType === 'wedding') return formValues.groomName || 'Arjun';
    if (activeType === 'birthday') return formValues.name || 'Arjun';
    if (activeType === 'anniversary') return formValues.coupleNames || 'Arjun & Meera';
    if (activeType === 'housewarming') return formValues.familyName || 'Arjun Family';
    if (activeType === 'babyshower') return formValues.parentNames || 'Sophia & John';
    return formValues.coupleNames || 'Arjun & Meera';
  };

  const getBridePreview = () => {
    if (mode === 'wish') {
      return '';
    }
    if (activeType === 'wedding') return formValues.brideName || 'Meera';
    return '';
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="rounded-2xl bg-black border border-[#C8A96B]/20 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-xl flex items-center gap-2">
            <Check className="w-4 h-4 text-[#C8A96B]" />
            {toast}
          </div>
        </div>
      )}

      {/* Progress Stepper - EXACT layout matching mock image */}
      <div className="border-b border-[#C8A96B]/10 bg-[#FAF8F5]/50 py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 items-center max-w-3xl mx-auto text-center relative">
            
            {/* Step 1: Details */}
            <div className="flex flex-col items-center gap-1.5 z-10 relative">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center border text-xs transition-colors ${step >= 1 ? 'border-[#C8A96B] bg-[#C8A96B]/10 text-[#C8A96B] font-bold' : 'border-gray-200 bg-white text-gray-400'}`}>
                {step > 1 ? <Check className="w-4 h-4 stroke-[2.5]" /> : '1'}
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-800">Details</span>
                <span className="block text-[8px] text-gray-400 font-medium">Fill Invitation Details</span>
              </div>
            </div>

            {/* Step 2: Design */}
            <div className="flex flex-col items-center gap-1.5 z-10 relative">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center border text-xs transition-colors ${step >= 2 ? 'border-[#C8A96B] bg-[#C8A96B] text-white font-bold' : 'border-gray-200 bg-white text-gray-400'}`}>
                {step > 2 ? <Check className="w-4 h-4 stroke-[2.5]" /> : '2'}
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 font-bold">Design</span>
                <span className="block text-[8px] text-gray-400 font-medium">Choose Template</span>
              </div>
            </div>

            {/* Step 3: Preview */}
            <div className="flex flex-col items-center gap-1.5 z-10 relative">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center border text-xs transition-colors ${step >= 3 ? 'border-[#C8A96B] bg-[#C8A96B] text-white font-bold' : 'border-gray-200 bg-white text-gray-400'}`}>
                {step > 3 ? <Check className="w-4 h-4 stroke-[2.5]" /> : '3'}
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-800">Preview</span>
                <span className="block text-[8px] text-gray-400 font-medium">See Invitation</span>
              </div>
            </div>

            {/* Step 4: Share */}
            <div className="flex flex-col items-center gap-1.5 z-10 relative">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center border text-xs transition-colors ${step >= 4 ? 'border-[#C8A96B] bg-[#C8A96B] text-white font-bold' : 'border-gray-200 bg-white text-gray-400'}`}>
                4
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-800">Share</span>
                <span className="block text-[8px] text-gray-400 font-medium">Get Your Link</span>
              </div>
            </div>

            {/* Progress lines background */}
            <div className="absolute top-4 left-[12.5%] right-[12.5%] h-[1.5px] bg-gray-100 -z-10" />
            <div 
              className="absolute top-4 left-[12.5%] h-[1.5px] bg-[#C8A96B] -z-10 transition-all duration-500" 
              style={{ width: `${(Math.min(step, 4) - 1) * 25}%` }}
            />
          </div>
        </div>
      </div>

      <main className="flex-grow py-12 bg-[#FAF8F5]/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* STEP 1: Fill Invitation Details */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Category tabs + Input fields */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs">
                <h2 className="font-playfair text-2xl font-light text-gray-900 mb-6">
                  Select Invitation Category
                </h2>

                {/* Category selector */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleTypeChange(cat.id)}
                        className={`inline-flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-3xs font-semibold tracking-widest uppercase border transition-all duration-300 ${
                          activeType === cat.id
                            ? 'border-[#C8A96B] bg-[#FAF8F5] text-[#C8A96B]'
                            : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Purpose Selector */}
                <div className="mt-8">
                  <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400 block mb-3">Card Type / Purpose</label>
                  <div className="grid grid-cols-2 gap-3 bg-[#FAF8F5] p-1.5 rounded-2xl border border-gray-100">
                    <button
                      type="button"
                      onClick={() => setMode('invite')}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-3xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                        mode === 'invite'
                          ? 'bg-white text-[#C8A96B] shadow-xs font-bold'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      ✨ Event Invitation
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('wish')}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-3xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                        mode === 'wish'
                          ? 'bg-white text-[#C8A96B] shadow-xs font-bold'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5" />
                      💝 Greeting Wish
                    </button>
                  </div>
                </div>

                <div className="h-[1px] bg-gray-100 my-8" />

                {/* Forms */}
                <form onSubmit={handleSubmit(goToDesign)} className="space-y-6">
                  
                  {mode === 'wish' ? (
                    /* =======================================
                       GREETING / WISH CARD FIELDS
                       ======================================= */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Your Name (Sender) <span className="text-red-500">*</span></label>
                        <input {...register('senderName')} placeholder="Your Name" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                        {errors.senderName && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.senderName as any).message}</p>}
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Friend's Name (Recipient) <span className="text-red-500">*</span></label>
                        <input {...register('recipientName')} placeholder="Friend's Name" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                        {errors.recipientName && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.recipientName as any).message}</p>}
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Occasion Date (Optional)</label>
                        <input type="date" {...register('date')} className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                        {errors.date && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.date as any).message}</p>}
                      </div>
                    </div>
                  ) : (
                    /* =======================================
                       STANDARD INVITATION MODE FIELDS
                       ======================================= */
                    <>
                      {/* Wedding Fields */}
                      {activeType === 'wedding' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Groom Name <span className="text-red-500">*</span></label>
                            <input {...register('groomName')} placeholder="Groom's Full Name" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.groomName && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.groomName as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Bride Name <span className="text-red-500">*</span></label>
                            <input {...register('brideName')} placeholder="Bride's Full Name" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.brideName && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.brideName as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Wedding Date <span className="text-red-500">*</span></label>
                            <input type="date" {...register('weddingDate')} className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.weddingDate && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.weddingDate as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Time <span className="text-red-500">*</span></label>
                            <input type="time" {...register('time')} className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.time && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.time as any).message}</p>}
                          </div>
                          <div className="sm:col-span-2 space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Venue Name <span className="text-red-500">*</span></label>
                            <input {...register('venue')} placeholder="e.g. Taj Banquets, Kochi" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.venue && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.venue as any).message}</p>}
                          </div>
                          <div className="sm:col-span-2 space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Full Address <span className="text-red-500">*</span></label>
                            <input {...register('address')} placeholder="Event physical location address" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.address && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.address as any).message}</p>}
                          </div>
                        </div>
                      )}

                      {/* Birthday Fields */}
                      {activeType === 'birthday' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Celebrated Name <span className="text-red-500">*</span></label>
                            <input {...register('name')} placeholder="Celebrant's Name" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.name && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.name as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Age <span className="text-red-500">*</span></label>
                            <input type="number" {...register('age')} placeholder="e.g. 25" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.age && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.age as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Date <span className="text-red-500">*</span></label>
                            <input type="date" {...register('date')} className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.date && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.date as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Time <span className="text-red-500">*</span></label>
                            <input type="time" {...register('time')} className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.time && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.time as any).message}</p>}
                          </div>
                          <div className="sm:col-span-2 space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Venue <span className="text-red-500">*</span></label>
                            <input {...register('venue')} placeholder="e.g. Royal Grand Hall" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.venue && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.venue as any).message}</p>}
                          </div>
                        </div>
                      )}

                      {/* Anniversary Fields */}
                      {activeType === 'anniversary' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Couple Names <span className="text-red-500">*</span></label>
                            <input {...register('coupleNames')} placeholder="e.g. Arjun & Meera" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.coupleNames && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.coupleNames as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Anniversary Year <span className="text-red-500">*</span></label>
                            <input type="number" {...register('anniversaryYear')} placeholder="e.g. 5" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.anniversaryYear && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.anniversaryYear as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Date <span className="text-red-500">*</span></label>
                            <input type="date" {...register('date')} className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.date && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.date as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Time <span className="text-red-500">*</span></label>
                            <input type="time" {...register('time')} className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.time && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.time as any).message}</p>}
                          </div>
                          <div className="sm:col-span-2 space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Venue <span className="text-red-500">*</span></label>
                            <input {...register('venue')} placeholder="Banquet hall or hotel venue" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.venue && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.venue as any).message}</p>}
                          </div>
                        </div>
                      )}

                      {/* Housewarming Fields */}
                      {activeType === 'housewarming' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Family Name <span className="text-red-500">*</span></label>
                            <input {...register('familyName')} placeholder="e.g. Sharma Family" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.familyName && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.familyName as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Date <span className="text-red-500">*</span></label>
                            <input type="date" {...register('date')} className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.date && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.date as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Time <span className="text-red-500">*</span></label>
                            <input type="time" {...register('time')} className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.time && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.time as any).message}</p>}
                          </div>
                          <div className="sm:col-span-2 space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">New Address <span className="text-red-500">*</span></label>
                            <input {...register('address')} placeholder="New physical home address" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.address && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.address as any).message}</p>}
                          </div>
                        </div>
                      )}

                      {/* Baby Shower Fields */}
                      {activeType === 'babyshower' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Parent Names <span className="text-red-500">*</span></label>
                            <input {...register('parentNames')} placeholder="e.g. Sophia & John" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.parentNames && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.parentNames as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Date <span className="text-red-500">*</span></label>
                            <input type="date" {...register('date')} className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.date && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.date as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Time <span className="text-red-500">*</span></label>
                            <input type="time" {...register('time')} className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.time && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.time as any).message}</p>}
                          </div>
                          <div className="sm:col-span-2 space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Venue <span className="text-red-500">*</span></label>
                            <input {...register('venue')} placeholder="Baby shower party venue" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.venue && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.venue as any).message}</p>}
                          </div>
                        </div>
                      )}

                      {/* Engagement Fields */}
                      {activeType === 'engagement' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Couple Names <span className="text-red-500">*</span></label>
                            <input {...register('coupleNames')} placeholder="e.g. Sophia & John" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.coupleNames && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.coupleNames as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Date <span className="text-red-500">*</span></label>
                            <input type="date" {...register('date')} className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.date && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.date as any).message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Time <span className="text-red-500">*</span></label>
                            <input type="time" {...register('time')} className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.time && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.time as any).message}</p>}
                          </div>
                          <div className="sm:col-span-2 space-y-1.5">
                            <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Venue <span className="text-red-500">*</span></label>
                            <input {...register('venue')} placeholder="Ceremony venue location" className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors" />
                            {errors.venue && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.venue as any).message}</p>}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Cover Image Upload */}
                  <div className="space-y-2">
                    <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Cover Image</label>
                    <div className="mt-1 flex justify-center rounded-2xl border border-dashed border-gray-200 px-6 py-6 hover:border-[#C8A96B]/50 transition-colors bg-white">
                      <div className="space-y-1.5 text-center">
                        <Upload className="mx-auto h-7 w-7 text-gray-400" />
                        <div className="flex text-xs text-gray-600">
                          <label className="relative cursor-pointer rounded-md bg-white font-semibold text-[#C8A96B] focus-within:outline-none hover:text-gold-500">
                            <span>Upload a photo</span>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />
                          </label>
                          <p className="pl-1 font-light">or drag and drop</p>
                        </div>
                        <p className="text-[10px] text-gray-400 font-light">PNG, JPG, WEBP up to 5MB</p>
                      </div>
                    </div>
                    {imageFile && (
                      <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Loaded: {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                  </div>

                  {/* Invitation Message */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-3xs font-semibold uppercase tracking-widest text-gray-400">
                        {mode === 'wish' ? 'Personalized Wish Message' : 'Personalized Message'}
                      </label>
                      <span className="text-[10px] text-gray-400">
                        {watch('message')?.length || 0} / 400
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      maxLength={400}
                      {...register('message')}
                      placeholder={mode === 'wish' ? 'Enter a beautiful custom wish message for your friend...' : 'Enter a custom greeting message for your guests...'}
                      className="w-full rounded-2xl border border-gray-100 px-4 py-3 text-sm focus:border-[#C8A96B] focus:outline-none transition-colors resize-none"
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1 font-medium">{(errors.message as any).message}</p>}
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <button
                      type="submit"
                      disabled={!isValid}
                      className={`inline-flex items-center gap-1.5 rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-all duration-300 ${
                        isValid 
                          ? 'bg-black hover:bg-[#C8A96B] shadow-gray-200' 
                          : 'bg-gray-200 cursor-not-allowed text-gray-400 shadow-none'
                      }`}
                    >
                      Continue to Design
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </form>
              </div>

              {/* Live Card Preview Column */}
              <div className="lg:col-span-5 sticky top-24 space-y-4">
                <div className="flex justify-between items-center px-2">
                  <span className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Live Form Preview</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#C8A96B] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
                    Syncing changes
                  </span>
                </div>
                <InvitationRenderer 
                  serviceType={activeType}
                  userData={formValues}
                  imageSrc={imagePreviewUrl}
                  templateConfig={selectedTemplate?.templateConfig}
                />
              </div>

            </div>
          )}

          {/* STEP 2: Choose a Design Template - EXACT layout matching mock image */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Template Selection with Filters */}
              <div className="lg:col-span-7 flex flex-col items-start">
                
                {/* Back Link */}
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-3xs font-semibold uppercase tracking-widest text-[#C8A96B] hover:opacity-85 transition-opacity mb-6"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Details
                </button>

                <span className="text-3xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Step 2 of 4
                </span>
                <h2 className="font-playfair text-3xl font-light text-gray-900 mb-2">
                  Choose a Design Template
                </h2>
                <p className="text-xs text-gray-400 font-light leading-relaxed mb-8">
                  Select a template that matches your style. You can preview and customize it.
                </p>

                {/* Filter buttons row */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {styleFilters.map((filt) => {
                    const Icon = filt.icon;
                    const isActive = selectedStyle === filt.name;
                    return (
                      <button
                        key={filt.name}
                        onClick={() => setSelectedStyle(filt.name)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-3xs font-semibold uppercase tracking-widest border transition-all duration-300 ${
                          isActive 
                            ? 'bg-[#C8A96B] border-[#C8A96B] text-white' 
                            : 'bg-white border-gray-100 hover:border-gray-200 text-gray-600'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {filt.name}
                      </button>
                    );
                  })}
                </div>

                {/* Templates Grid - EXACT card look in mock image */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-8">
                  {filteredTemplates.map((tpl) => {
                    const isSelected = selectedTemplate?._id === tpl._id;
                    const config = tpl.templateConfig || {};
                    return (
                      <div
                        key={tpl._id}
                        onClick={() => setSelectedTemplate(tpl)}
                        className={`group relative flex flex-col bg-white rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'border-[#C8A96B] ring-2 ring-[#C8A96B]/15 shadow-md' 
                            : 'border-gray-100 hover:border-gray-200 shadow-2xs hover:shadow-xs'
                        }`}
                      >
                        {/* Dynamic populated thumbnail */}
                        <div 
                          className="relative aspect-square w-full flex flex-col justify-center items-center text-center p-4 overflow-hidden border-b border-gray-50 transition-transform duration-500"
                          style={{ 
                            backgroundColor: config.backgroundColor || '#FFFFFF',
                            backgroundImage: config.bgImage ? `url(${config.bgImage})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            fontFamily: config.fontBody || 'var(--font-inter)'
                          }}
                        >
                          {/* Inner gold/border outline decorative frame */}
                          <div className="absolute inset-2 border border-[#C8A96B]/10 pointer-events-none rounded-xl" />

                          {/* Populated miniature text */}
                          <span className="text-[5px] uppercase tracking-widest text-gray-400 font-bold leading-none mb-1">
                            Together With Their Families
                          </span>

                          <div 
                            className="text-[10px] font-normal leading-tight my-1 text-center truncate max-w-[90%]"
                            style={{ 
                              fontFamily: config.fontHeader || 'var(--font-playfair)',
                              color: config.primaryColor || '#C8A96B'
                            }}
                          >
                            {getGroomPreview()}
                            {getBridePreview() && (
                              <>
                                <span className="block text-[6px] italic font-serif text-gray-400 my-0.5">&amp;</span>
                                {getBridePreview()}
                              </>
                            )}
                          </div>

                          <span className="text-[5px] uppercase tracking-widest text-gray-400 font-medium leading-none mt-1">
                            Invite You to Celebrate
                          </span>
                          
                          {/* Selected circle checkmark badge */}
                          {isSelected && (
                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#C8A96B] flex items-center justify-center text-white shadow-sm animate-scale">
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </div>
                          )}
                        </div>

                        {/* Text description footer */}
                        <div className="p-4 flex items-center justify-between bg-white shrink-0">
                          <span className="text-[11px] font-semibold text-gray-800 truncate">{tpl.templateName.split(' (')[0]}</span>
                          {isSelected && (
                            <span className="text-[9px] font-bold text-[#C8A96B] bg-[#FAF8F5] px-2.5 py-0.5 rounded-full border border-[#C8A96B]/20">
                              Selected
                            </span>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Bottom View More button */}
                <div className="w-full flex justify-center pt-2 mb-8">
                  <button className="inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-5 py-2.5 text-3xs font-semibold uppercase tracking-widest text-gray-500 hover:text-black hover:border-gray-200 transition-colors shadow-2xs">
                    View More Templates
                    <svg className="w-3 h-3 fill-current rotate-90" viewBox="0 0 24 24">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                  </button>
                </div>

              </div>

              {/* Right Column: Full Mock Live Preview - EXACT layout in mock image */}
              <div className="lg:col-span-5 sticky top-24 space-y-4">
                <div className="px-2">
                  <span className="block text-3xs font-bold uppercase tracking-widest text-gray-400">Live Preview</span>
                  <span className="block text-[10px] text-gray-400 font-light mt-0.5">This is how your invitation will look</span>
                </div>

                <InvitationRenderer 
                  serviceType={activeType}
                  userData={formValues}
                  imageSrc={imagePreviewUrl}
                  templateConfig={selectedTemplate?.templateConfig}
                />

                <div className="w-full flex justify-center pt-2">
                  <button
                    onClick={() => {
                      // Randomly rotate to another template
                      const nextIdx = (templates.findIndex(t => t._id === selectedTemplate?._id) + 1) % templates.length;
                      if (templates[nextIdx]) setSelectedTemplate(templates[nextIdx]);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 hover:border-[#C8A96B]/25 bg-white px-5 py-2.5 text-3xs font-bold uppercase tracking-widest text-gray-600 transition-colors shadow-2xs"
                  >
                    <Music className="w-3.5 h-3.5 text-[#C8A96B]" />
                    Change Template
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: Interactive Full Page See Invitation Preview */}
          {step === 3 && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#C8A96B]/15">
                <div>
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1.5 text-3xs font-semibold uppercase tracking-widest text-[#C8A96B] hover:opacity-85 transition-opacity mb-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Design Selection
                  </button>
                  <h2 className="font-playfair text-2xl font-light text-gray-900">
                    Audit Guest Experience
                  </h2>
                  <p className="text-xs text-gray-400 font-light mt-0.5">
                    This is the full-screen interactive microsite guests will see. Test animations, timers, music, and forms.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-gray-600 hover:bg-[#FAF8F5] transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleGenerateLink}
                    disabled={submitting}
                    className="inline-flex items-center gap-1.5 rounded-full bg-black hover:bg-[#C8A96B] px-7 py-2.5 text-xs font-semibold uppercase tracking-widest text-white shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate Invitation
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Full Interactive Preview */}
              <div className="rounded-3xl border border-gray-100 overflow-hidden shadow-2xl bg-white min-h-[600px] relative">
                <PublicInvitationClient 
                  invite={{
                    _id: 'preview',
                    slug: 'preview',
                    serviceType: activeType,
                    userData: {
                      ...formValues,
                      templateConfig: selectedTemplate?.templateConfig
                    },
                    image: imagePreviewUrl
                  }}
                />
              </div>

            </div>
          )}

          {/* STEP 4: Share & Success */}
          {step === 4 && (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 text-center shadow-xl">
              
              <div className="mx-auto w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#C8A96B]/30 flex items-center justify-center text-[#C8A96B] mb-8 animate-pulse">
                <Sparkles className="w-6 h-6" />
              </div>

              <h1 className="font-playfair text-3xl font-light text-gray-900 mb-2">
                Your Invitation is Ready!
              </h1>
              <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm mx-auto mb-8">
                Your digital invitation is live! Choose the invitation link for guests, or the wishing link for friends to send wishes & light candles.
              </p>

              {/* Link Type Selector Tabs */}
              <div className="flex border-b border-gray-100 mb-6 justify-center gap-6">
                <button
                  onClick={() => setLinkType('invite')}
                  className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300 border-b-2 ${
                    linkType === 'invite' ? 'border-[#C8A96B] text-[#C8A96B]' : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  ✉️ Guest Invitation Link
                </button>
                <button
                  onClick={() => setLinkType('wish')}
                  className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300 border-b-2 ${
                    linkType === 'wish' ? 'border-[#C8A96B] text-[#C8A96B]' : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  🎉 Greeting / Wish Link
                </button>
              </div>

              {/* Invitation Link Input Box */}
              <div className="rounded-2xl border border-gray-100 bg-[#FAF8F5] p-3 flex flex-col sm:flex-row items-center gap-3 mb-10 shadow-xs">
                <input
                  type="text"
                  readOnly
                  value={linkType === 'wish' ? `${generatedLink}?mode=wish` : generatedLink}
                  className="w-full bg-transparent text-xs text-center sm:text-left text-gray-600 focus:outline-none font-mono tracking-tight px-2"
                />
                <button
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-black hover:bg-[#C8A96B] px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Link
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <a
                  href={linkType === 'wish' ? `/invite/${generatedSlug}?mode=wish` : `/invite/${generatedSlug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-gray-700 hover:bg-[#FAF8F5] transition-colors"
                >
                  Open {linkType === 'wish' ? 'Wishes Card' : 'Invitation'}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => {
                    const activeLink = linkType === 'wish' ? `${generatedLink}?mode=wish` : generatedLink;
                    navigator.share({
                      title: 'InviteHub Digital Card',
                      text: linkType === 'wish' ? `Wish me on my special day!` : `You're cordially invited! Check out the details:`,
                      url: activeLink
                    }).catch(() => showToast('Browser sharing not supported. Use the copy button!'));
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white border border-gray-200 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-gray-700 hover:bg-[#FAF8F5] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  System Share
                </button>
              </div>

              {/* Direct Social Media Shares */}
              <div className="flex justify-center items-center gap-4 pt-6 border-t border-gray-100 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                <span>Share via:</span>
                
                {/* WhatsApp Share */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    linkType === 'wish' 
                      ? `Wish me on my special day! Send your wishes here: ${generatedLink}?mode=wish` 
                      : `You are cordially invited! View details here: ${generatedLink}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white border border-green-200/50 p-2.5 text-green-600 hover:bg-green-50 transition-colors"
                  title="Share on WhatsApp"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.788 2.025 14.322.99 11.98.99c-5.437 0-9.863 4.373-9.866 9.8.001 1.762.479 3.487 1.395 5.024L2.511 20.4l4.136-1.246zm12.39-5.123c-.305-.153-1.805-.89-2.083-.99-.277-.101-.48-.153-.681.153-.2.305-.777.99-.952 1.193-.175.203-.35.229-.655.077-1.393-.696-2.289-1.293-3.136-2.75-.222-.383.222-.356.637-1.189.102-.203.051-.381-.026-.533-.076-.153-.681-1.639-.933-2.247-.244-.588-.492-.51-.681-.52-.176-.01-.377-.01-.578-.01-.201 0-.529.076-.805.381-.277.305-1.058 1.033-1.058 2.521 0 1.488 1.083 2.923 1.234 3.126.152.203 2.13 3.253 5.16 4.561.72.311 1.282.497 1.721.637.724.229 1.382.197 1.902.12.58-.087 1.805-.738 2.058-1.452.253-.713.253-1.323.177-1.452-.075-.129-.278-.205-.582-.356z" />
                  </svg>
                </a>
 
                {/* Telegram Share */}
                <a
                  href={`https://telegram.me/share/url?url=${encodeURIComponent(
                    linkType === 'wish' ? `${generatedLink}?mode=wish` : generatedLink
                  )}&text=${encodeURIComponent(
                    linkType === 'wish' ? `Wish me on my special day!` : `You're cordially invited!`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white border border-blue-200/50 p-2.5 text-blue-500 hover:bg-blue-50 transition-colors"
                  title="Share on Telegram"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.18l-1.91 9.02c-.14.65-.53.81-1.08.5L11.7 15.6l-1.39 1.34c-.15.15-.28.28-.58.28l.2-2.94 5.35-4.83c.23-.21-.05-.32-.35-.12L8.2 13.62l-2.85-.89c-.62-.19-.63-.62.13-.91l11.13-4.29c.52-.19.97.12.95.65z" />
                  </svg>
                </a>
              </div>

              {/* Start new */}
              <button
                onClick={() => {
                  setStep(1);
                  reset({});
                  setImageFile(null);
                  setImagePreviewUrl('');
                }}
                className="mt-8 text-xs font-semibold uppercase tracking-widest text-[#C8A96B] hover:underline transition-colors"
              >
                Create Another Invitation
              </button>

            </div>
          )}

        </div>
      </main>

      {/* Footer Nav Bar - EXACT design bottom row matching mock image */}
      {step === 2 && (
        <div className="border-t border-gray-150 bg-white py-4 shadow-sm z-30 sticky bottom-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3 text-xs font-semibold uppercase tracking-widest text-gray-700 hover:bg-[#FAF8F5] transition-all duration-300"
            >
              ← Back
            </button>
            <button
              onClick={goToPreview}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#B89047] hover:bg-[#A37B34] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-all duration-300"
            >
              Continue to Preview
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function CreateInvitationWizard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-white text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8A96B]" />
        <span className="text-[10px] uppercase tracking-widest font-semibold">Loading Creation Studio...</span>
      </div>
    }>
      <WizardContent />
    </Suspense>
  );
}
