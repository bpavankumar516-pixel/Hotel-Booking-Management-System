import React from 'react';
import { useHotel } from '../../contexts/HotelContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowUpRight, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MiddleSection = () => {
  const { recentEnquiries, bookingStatusChartData } = useHotel();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* 1. Recent Enquiries Card (5 cols) - Compact & Sleek */}
      <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Recent Enquiries</h3>
            <p className="text-[10px] text-slate-400 font-medium">Guest messages & booking requests</p>
          </div>
          <Link
            to="/communication"
            className="text-[10px] font-bold text-[#C5A059] hover:underline flex items-center space-x-0.5"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Compact List of Enquiries (No View Message text, tight padding, clean alignment) */}
        <div className="grid grid-cols-2 gap-2.5 my-auto">
          {recentEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-slate-50/80 border border-slate-200/70 hover:border-amber-300 hover:bg-[#F7F2E7]/80 p-2.5 rounded-lg flex items-center space-x-2.5 transition-all duration-150 cursor-pointer shadow-2xs group"
            >
              {/* Avatar */}
              <img
                src={enq.avatar}
                alt={enq.name}
                className="w-9 h-9 rounded-full object-cover border border-white shadow-2xs shrink-0 group-hover:scale-105 transition-transform"
              />

              {/* Info: Name & Tag */}
              <div className="min-w-0 flex-1 space-y-0.5">
                <span className="font-['Poppins'] text-xs font-bold text-[#1E2B37] leading-tight truncate block">
                  {enq.name}
                </span>
                <span
                  className="inline-block text-[8px] font-extrabold px-1.5 py-0.2 rounded text-white tracking-wider uppercase shadow-2xs"
                  style={{ backgroundColor: enq.tagColor }}
                >
                  {enq.tag}
                </span>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:text-[#C5A059] transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Booking Status Area Chart Card (7 cols) - Compact & Sleek */}
      <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
        {/* Header Bar with Filter */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Booking Status</h3>
            <p className="text-[10px] text-slate-400 font-medium">Monthly booking vs enquiry comparison</p>
          </div>
          <button className="flex items-center space-x-1 text-[10px] font-bold text-[#1E2B37] bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full border border-slate-200 transition-colors cursor-pointer">
            <span>Jan - Oct</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>
        </div>

        {/* Quick Performance Indicators */}
        <div className="flex items-center space-x-6 px-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded bg-[#C5A059] shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block leading-tight">Total Bookings</span>
              <span className="font-['Poppins'] text-xs font-extrabold text-[#1E2B37]">580</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 border-l border-slate-200 pl-6">
            <span className="w-2.5 h-2.5 rounded bg-[#1E2B37] shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block leading-tight">Total Enquiries</span>
              <span className="font-['Poppins'] text-xs font-extrabold text-[#1E2B37]">510</span>
            </div>
          </div>
        </div>

        {/* Compact Multi-Area Chart */}
        <div className="h-44 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={bookingStatusChartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="hodelzGoldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C5A059" stopOpacity={0.85} />
                  <stop offset="95%" stopColor="#C5A059" stopOpacity={0.15} />
                </linearGradient>
                <linearGradient id="hodelzNavyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E2B37" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#1E2B37" stopOpacity={0.25} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '10px',
                  fontSize: '11px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
              <Area type="monotone" dataKey="Bookings" stroke="#C5A059" strokeWidth={2} fillOpacity={1} fill="url(#hodelzGoldGrad)" />
              <Area type="monotone" dataKey="Enquiries" stroke="#1E2B37" strokeWidth={2} fillOpacity={1} fill="url(#hodelzNavyGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Compact Legend Footer */}
        <div className="flex items-center justify-center space-x-6 text-[11px] text-slate-500 pt-1.5 border-t border-slate-100">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded bg-[#C5A059]" />
            <span className="font-semibold text-slate-700">Bookings (53%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded bg-[#1E2B37]" />
            <span className="font-semibold text-slate-700">Enquiries (47%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
