import React from 'react';
import { useHotel } from '../../contexts/HotelContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { MoreHorizontal, ChevronDown } from 'lucide-react';

export const ChartsSection = () => {
  const { revenueData, metrics } = useHotel();
  const { roomAvailability, rating } = metrics;

  const totalRooms = roomAvailability.total || 418;
  const occPct = ((roomAvailability.occupied / totalRooms) * 100).toFixed(0);
  const resPct = ((roomAvailability.reserved / totalRooms) * 100).toFixed(0);
  const availPct = ((roomAvailability.available / totalRooms) * 100).toFixed(0);
  const nrPct = ((roomAvailability.notReady / totalRooms) * 100).toFixed(0);

  const ratingBars = [
    { label: 'Facilities', score: rating.facilities },
    { label: 'Cleanliness', score: rating.cleanliness },
    { label: 'Services', score: rating.services },
    { label: 'Comfort', score: rating.comfort },
    { label: 'Location', score: rating.location },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
      {/* 1. Room Availability Card (4 cols) */}
      <div className="lg:col-span-4 bg-white border border-slate-200/80 p-5 rounded-3xl shadow-xs flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-['Poppins'] text-sm font-bold text-[#1A1A1A]">Room Availability</h3>
          <button className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors cursor-pointer">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Stacked Progress Bar */}
        <div className="space-y-2">
          <div className="h-6 w-full rounded-xl overflow-hidden flex bg-[#EAF0EC] p-0.5 space-x-1">
            <div className="bg-[#8FD9C4] h-full rounded-lg transition-all" style={{ width: `${occPct}%` }} title={`Occupied: ${roomAvailability.occupied}`} />
            <div className="bg-[#D6E85A] h-full rounded-lg transition-all" style={{ width: `${resPct}%` }} title={`Reserved: ${roomAvailability.reserved}`} />
            <div className="bg-[#a7f3d0] h-full rounded-lg transition-all" style={{ width: `${availPct}%` }} title={`Available: ${roomAvailability.available}`} />
            <div className="bg-slate-300 h-full rounded-lg transition-all" style={{ width: `${nrPct}%` }} title={`Not Ready: ${roomAvailability.notReady}`} />
          </div>
        </div>

        {/* Metric Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-2xl bg-[#EAF0EC]/50 border border-slate-200/60">
            <span className="text-[11px] font-medium text-[#6B7280] block">Occupied</span>
            <span className="font-['Poppins'] text-2xl font-black text-[#1A1A1A]">{roomAvailability.occupied}</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#EAF0EC]/50 border border-slate-200/60">
            <span className="text-[11px] font-medium text-[#6B7280] block">Reserved</span>
            <span className="font-['Poppins'] text-2xl font-black text-[#1A1A1A]">{roomAvailability.reserved}</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#EAF0EC]/50 border border-slate-200/60">
            <span className="text-[11px] font-medium text-[#6B7280] block">Available</span>
            <span className="font-['Poppins'] text-2xl font-black text-[#1A1A1A]">{roomAvailability.available}</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#EAF0EC]/50 border border-slate-200/60">
            <span className="text-[11px] font-medium text-[#6B7280] block">Not Ready</span>
            <span className="font-['Poppins'] text-2xl font-black text-[#1A1A1A]">{roomAvailability.notReady}</span>
          </div>
        </div>
      </div>

      {/* 2. Revenue Wave Area Chart (5 cols) */}
      <div className="lg:col-span-5 bg-white border border-slate-200/80 p-5 rounded-3xl shadow-xs flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-['Poppins'] text-sm font-bold text-[#1A1A1A]">Revenue</h3>
          <button className="flex items-center space-x-1 text-xs font-bold text-[#1A1A1A] bg-[#D6E85A] hover:bg-[#cbe04a] px-3 py-1 rounded-full border border-lime-300 shadow-2xs transition-colors cursor-pointer">
            <span>Last 6 Months</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* Peak Revenue Highlight Pill */}
        <div className="flex justify-center -mb-2 z-10">
          <div className="bg-[#D6E85A] border border-lime-300 text-[#1A1A1A] px-3.5 py-1 rounded-xl shadow-xs text-center">
            <span className="text-[10px] text-[#1A1A1A] block font-medium">Total Revenue</span>
            <span className="font-['Poppins'] text-sm font-black">$315,060</span>
          </div>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="lodgifyRevGradExact" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8FD9C4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8FD9C4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#6B7280" fontSize={10} tickLine={false} />
              <YAxis stroke="#6B7280" fontSize={10} tickLine={false} tickFormatter={(val) => `$${val / 1000}K`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                formatter={(val) => [`$${val.toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#8FD9C4" strokeWidth={3} fillOpacity={1} fill="url(#lodgifyRevGradExact)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Overall Rating Card (3 cols) */}
      <div className="lg:col-span-3 bg-white border border-slate-200/80 p-5 rounded-3xl shadow-xs flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-['Poppins'] text-sm font-bold text-[#1A1A1A]">Overall Rating</h3>
          <button className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors cursor-pointer">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="font-['Poppins'] text-3xl font-black text-[#1A1A1A]">{rating.score}</span>
          <span className="text-xs text-[#6B7280] font-semibold">/ 5</span>
          <div className="pl-2 border-l border-slate-200">
            <span className="font-['Poppins'] text-xs font-bold text-[#1A1A1A] block">{rating.status}</span>
            <span className="text-[10px] text-[#6B7280] font-medium">from {rating.totalReviews} reviews</span>
          </div>
        </div>

        {/* Horizontal Progress Bars */}
        <div className="space-y-2 text-xs">
          {ratingBars.map((bar, idx) => (
            <div key={idx} className="flex items-center justify-between space-x-2">
              <span className="text-[11px] text-[#6B7280] font-medium w-20 shrink-0">{bar.label}</span>
              <div className="flex-1 h-2 bg-[#EAF0EC] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D6E85A] rounded-full"
                  style={{ width: `${(bar.score / 5) * 100}%` }}
                />
              </div>
              <span className="font-['Poppins'] text-[11px] font-bold text-[#1A1A1A] w-6 text-right font-mono">{bar.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
