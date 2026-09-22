import React from 'react';
import { useHotel } from '../../contexts/HotelContext';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, DollarSign, BedDouble, Users, Calendar } from 'lucide-react';

export const ReportsPage = () => {
  const { revenueData, reservationsChartData } = useHotel();

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-8">
      {/* Title Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-[#C5A059] text-white uppercase">
            Module 09
          </span>
          <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">Reports & Analytics</h2>
        </div>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Comprehensive business intelligence, revenue performance, room occupancy rate, and booking trends.
        </p>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Total Revenue</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">$123,980</span>
          </div>
          <div className="p-3 bg-[#F7F2E7] text-[#C5A059] rounded-lg">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Room Occupancy Rate</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#2563EB]">68.4%</span>
          </div>
          <div className="p-3 bg-blue-50 text-[#2563EB] rounded-lg">
            <BedDouble className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Most Booked Room Type</span>
            <span className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">A/c King</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Active Guests Today</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">231</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Revenue Area Chart */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-['Poppins'] text-sm font-extrabold text-[#1E2B37]">Revenue Performance Trend</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="repRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C5A059" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#C5A059" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} tickFormatter={(val) => `$${val / 1000}K`} />
              <Tooltip formatter={(val) => [`$${val.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#C5A059" strokeWidth={3} fillOpacity={1} fill="url(#repRevGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Reservations Bar Chart */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-['Poppins'] text-sm font-extrabold text-[#1E2B37]">Weekly Booking Trends</h3>
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reservationsChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
              <Tooltip />
              <Bar dataKey="booked" fill="#1E2B37" radius={[4, 4, 0, 0]} />
              <Bar dataKey="canceled" fill="#E74C3C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
