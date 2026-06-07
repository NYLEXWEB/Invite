export type ServiceType =
  | 'wedding'
  | 'birthday'
  | 'anniversary'
  | 'housewarming'
  | 'babyshower'
  | 'engagement'
  | 'savethedate';

export interface WeddingData {
  groomName: string;
  brideName: string;
  weddingDate: string;
  time: string;
  venue: string;
  address: string;
  message: string;
}

export interface BirthdayData {
  name: string;
  age: number;
  date: string;
  time: string;
  venue: string;
  message: string;
}

export interface AnniversaryData {
  coupleNames: string;
  anniversaryYear: number;
  date: string;
  time: string;
  venue: string;
  message: string;
}

export interface HousewarmingData {
  familyName: string;
  date: string;
  time: string;
  address: string;
  message: string;
}

export interface BabyShowerData {
  parentNames: string;
  date: string;
  time: string;
  venue: string;
  message: string;
}

export interface EngagementData {
  coupleNames: string;
  date: string;
  time: string;
  venue: string;
  message: string;
}

export interface SaveTheDateData {
  coupleNames: string;
  date: string;
  time: string;
  venue: string;
  message: string;
}

export interface Invitation {
  _id: string;
  serviceType: ServiceType;
  slug: string;
  userData: Record<string, any>;
  image?: string;
  createdAt: string;
  expiresAt: string;
}

export interface Template {
  _id: string;
  templateName: string;
  serviceType: ServiceType | 'all';
  previewImage?: string;
  templateConfig: {
    fontHeader?: string;
    fontBody?: string;
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    borderStyle?: string;
    bgImage?: string;
    style?: string;
    [key: string]: any;
  };
  activeStatus: boolean;
}

export interface AnalyticsData {
  totalViews: number;
  deviceTypeBreakdown: { device: string; count: number }[];
  countryBreakdown: { country: string; count: number }[];
  topInvitations: {
    invitationId: string;
    slug: string;
    serviceType: ServiceType;
    views: number;
    userData: Record<string, any>;
  }[];
}
