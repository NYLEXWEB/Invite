import { Invitation, Template, AnalyticsData } from '../types';

const isLocal = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' || 
   window.location.hostname.startsWith('192.168.'));

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (isLocal ? 'http://localhost:5000/api' : 'https://invite-backend-beta.vercel.app/api');

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data.data as T;
}

export const apiService = {
  // Create an invitation
  async createInvitation(formData: FormData): Promise<Invitation> {
    const response = await fetch(`${BASE_URL}/invitations/create`, {
      method: 'POST',
      body: formData, // FormData automatically sets multipart/form-data
    });
    return handleResponse<Invitation>(response);
  },

  // Get invitation details by slug
  async getInvitationBySlug(slug: string): Promise<Invitation> {
    const response = await fetch(`${BASE_URL}/invitations/${slug}`, {
      method: 'GET',
      next: { revalidate: 60 }, // Cache on Next.js server for 60 seconds
    });
    return handleResponse<Invitation>(response);
  },

  // Update invitation details
  async updateInvitation(id: string, formData: FormData): Promise<Invitation> {
    const response = await fetch(`${BASE_URL}/invitations/${id}`, {
      method: 'PUT',
      body: formData,
    });
    return handleResponse<Invitation>(response);
  },

  // Delete an invitation
  async deleteInvitation(id: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${BASE_URL}/invitations/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete invitation');
    }
    return data;
  },

  // Get active templates
  async getTemplates(): Promise<Template[]> {
    const response = await fetch(`${BASE_URL}/templates`, {
      method: 'GET',
      next: { revalidate: 3600 }, // Cache templates for 1 hour
    });
    return handleResponse<Template[]>(response);
  },

  // Get analytics metrics
  async getAnalytics(): Promise<AnalyticsData> {
    const response = await fetch(`${BASE_URL}/analytics`, {
      method: 'GET',
      // Avoid caching analytics
      cache: 'no-store',
    });
    return handleResponse<AnalyticsData>(response);
  },

  // Submit an RSVP for an invitation
  async submitRSVP(slug: string, rsvpData: { name: string; attending: boolean; guests: number; message?: string }): Promise<any> {
    const response = await fetch(`${BASE_URL}/rsvps/${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rsvpData)
    });
    return handleResponse<any>(response);
  },

  // Get RSVPs for an invitation
  async getRSVPs(slug: string): Promise<any[]> {
    const response = await fetch(`${BASE_URL}/rsvps/${slug}`, {
      method: 'GET',
      cache: 'no-store'
    });
    return handleResponse<any[]>(response);
  },

  // Get standard backend media URL for images
  getMediaUrl(imagePath: string): string {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    
    // Resolve relative path to backend
    const backendHost = BASE_URL.replace('/api', '');
    return `${backendHost}${imagePath}`;
  }
};
