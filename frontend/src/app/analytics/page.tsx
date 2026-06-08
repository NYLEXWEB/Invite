'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { apiService } from '../../services/api';
import { AnalyticsData } from '../../types';
import { 
  Eye, 
  Smartphone, 
  Globe2, 
  Sparkles, 
  ArrowLeft,
  Loader2,
  Calendar,
  Layers
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        const res = await apiService.getAnalytics();
        setData(res);
      } catch (err: any) {
        setError(err.message || 'Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  const deviceIcons: Record<string, any> = {
    mobile: Smartphone,
    desktop: Globe2,
    tablet: Layers,
    unknown: Sparkles
  };

  return (
    <>
      <Header />
      
      <main className="flex-grow bg-[#FAF8F5] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-[#C8A96B]/10">
            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-3xs font-semibold uppercase tracking-widest text-[#C8A96B] hover:opacity-80 transition-opacity mb-2">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Studio
              </Link>
              <h1 className="font-playfair text-3xl font-light text-gray-900">
                Visitor Analytics
              </h1>
              <p className="text-xs text-gray-400 font-light mt-1">
                Real-time traffic statistics and event conversions.
              </p>
            </div>
            
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#C8A96B]/15 px-4 py-1.5 text-3xs font-semibold uppercase tracking-widest text-gray-500 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-[#C8A96B]" />
              Last 7 Days Rolling
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="rounded-3xl border border-red-100 bg-red-50/50 p-8 text-center max-w-2xl mx-auto my-12">
              <p className="text-sm text-red-600 font-medium">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-xs font-semibold uppercase text-white hover:bg-red-700 transition-colors"
              >
                Retry Loading
              </button>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && (
            <div className="space-y-8 animate-pulse">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-28 rounded-3xl bg-white border border-gray-100 p-6" />
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="h-96 rounded-3xl bg-white border border-gray-100 p-6 lg:col-span-2" />
                <div className="h-96 rounded-3xl bg-white border border-gray-100 p-6" />
              </div>
            </div>
          )}

          {/* Live Data Dashboard */}
          {!loading && !error && data && (
            <div className="space-y-8">
              
              {/* KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Total Views Card */}
                <div className="rounded-3xl bg-white border border-gray-100 p-6 shadow-xs flex items-center justify-between gold-glow">
                  <div>
                    <span className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Total Views</span>
                    <h3 className="font-playfair text-3xl font-light text-gray-900 mt-1">
                      {data.totalViews.toLocaleString()}
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-[#FAF8F5] p-3.5 border border-[#C8A96B]/20">
                    <Eye className="w-5 h-5 text-[#C8A96B]" />
                  </div>
                </div>

                {/* Unique Links Active */}
                <div className="rounded-3xl bg-white border border-gray-100 p-6 shadow-xs flex items-center justify-between gold-glow">
                  <div>
                    <span className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Active Links</span>
                    <h3 className="font-playfair text-3xl font-light text-gray-900 mt-1">
                      {data.topInvitations.length}
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-[#FAF8F5] p-3.5 border border-[#C8A96B]/20">
                    <Sparkles className="w-5 h-5 text-[#C8A96B]" />
                  </div>
                </div>

                {/* Avg Views Per Link */}
                <div className="rounded-3xl bg-white border border-gray-100 p-6 shadow-xs flex items-center justify-between gold-glow">
                  <div>
                    <span className="text-3xs font-semibold uppercase tracking-widest text-gray-400">Avg Engagement</span>
                    <h3 className="font-playfair text-3xl font-light text-gray-900 mt-1">
                      {data.topInvitations.length > 0 
                        ? Math.round(data.totalViews / data.topInvitations.length) 
                        : 0}
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-[#FAF8F5] p-3.5 border border-[#C8A96B]/20">
                    <Layers className="w-5 h-5 text-[#C8A96B]" />
                  </div>
                </div>
              </div>

              {/* Aggregation Breakdowns */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Top Performing Invitations */}
                <div className="rounded-3xl bg-white border border-gray-100 p-6 shadow-xs lg:col-span-2 flex flex-col justify-between gold-glow">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-xs uppercase tracking-widest mb-6">Top Invitations</h3>
                    
                    {data.topInvitations.length === 0 ? (
                      <div className="text-center py-12 text-gray-400 text-xs font-light">
                        No active invitations being tracked. Check back later!
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-gray-500">
                          <thead>
                            <tr className="border-b border-gray-100 text-3xs font-semibold uppercase tracking-widest text-gray-400">
                              <th className="py-3 px-1">Type</th>
                              <th className="py-3 px-1">Target Host</th>
                              <th className="py-3 px-1">Views</th>
                              <th className="py-3 px-1 text-right">Link</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.topInvitations.map((inv, idx) => {
                              let hostName = 'Unknown';
                              if (inv.userData) {
                                hostName = inv.userData.coupleNames || 
                                           inv.userData.name || 
                                           (inv.userData.groomName && `${inv.userData.groomName} & ${inv.userData.brideName}`) || 
                                           inv.userData.familyName ||
                                           inv.userData.parentNames ||
                                           'Details';
                              }
                              
                              return (
                                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                  <td className="py-4 px-1 capitalize font-semibold text-gray-800">
                                    {inv.serviceType}
                                  </td>
                                  <td className="py-4 px-1 truncate max-w-[150px] font-light">
                                    {hostName}
                                  </td>
                                  <td className="py-4 px-1 font-semibold text-[#C8A96B]">
                                    {inv.views}
                                  </td>
                                  <td className="py-4 px-1 text-right">
                                    <Link 
                                      href={`/invite/${inv.slug}`}
                                      target="_blank"
                                      className="inline-flex rounded-full bg-white border border-gray-100 px-4 py-1.5 text-3xs font-semibold uppercase tracking-widest text-gray-600 hover:border-[#C8A96B] hover:text-[#C8A96B] transition-colors"
                                    >
                                      View Invite
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>

                {/* Device & Country Breakdown */}
                <div className="space-y-6">
                  
                  {/* Devices */}
                  <div className="rounded-3xl bg-white border border-gray-100 p-6 shadow-xs gold-glow">
                    <h3 className="font-semibold text-gray-900 text-xs uppercase tracking-widest mb-6">Device Breakdown</h3>
                    
                    {data.deviceTypeBreakdown.length === 0 ? (
                      <div className="text-center py-6 text-gray-400 text-xs font-light">No device data.</div>
                    ) : (
                      <div className="space-y-4">
                        {data.deviceTypeBreakdown.map((item, idx) => {
                          const Icon = deviceIcons[item.device.toLowerCase()] || Sparkles;
                          const pct = data.totalViews > 0 ? Math.round((item.count / data.totalViews) * 100) : 0;
                          
                          return (
                            <div key={idx} className="space-y-1.5">
                              <div className="flex justify-between items-center text-xs font-medium">
                                <span className="flex items-center gap-1.5 capitalize text-gray-500 font-light text-2xs">
                                  <Icon className="w-3.5 h-3.5 text-[#C8A96B]" />
                                  {item.device}
                                </span>
                                <span className="text-gray-900 font-semibold text-2xs">{pct}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#C8A96B] rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Countries */}
                  <div className="rounded-3xl bg-white border border-gray-100 p-6 shadow-xs gold-glow">
                    <h3 className="font-semibold text-gray-900 text-xs uppercase tracking-widest mb-6">Country Traffic</h3>
                    
                    {data.countryBreakdown.length === 0 ? (
                      <div className="text-center py-6 text-gray-400 text-xs font-light">No geographic data.</div>
                    ) : (
                      <div className="space-y-3">
                        {data.countryBreakdown.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-2xs">
                            <span className="capitalize font-light text-gray-500">{item.country}</span>
                            <span className="font-semibold text-gray-950">{item.count} views</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </>
  );
}
