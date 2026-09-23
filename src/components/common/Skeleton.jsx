import React from 'react';

// Base Skeleton element with shimmering pulse effect
export const SkeletonBase = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200/90 rounded-2xl ${className}`} />
);

// Skeleton for KPI Stat Cards (Total Rooms, Available Rooms, Occupied Rooms, Guests, Revenue)
export const SkeletonStatCard = () => (
  <div className="bg-white border border-slate-200/80 rounded-3xl p-5 space-y-3 shadow-xs">
    <div className="flex items-center justify-between">
      <SkeletonBase className="w-10 h-10 rounded-2xl" />
      <SkeletonBase className="w-14 h-4 rounded-full" />
    </div>
    <div className="space-y-1.5 pt-1">
      <SkeletonBase className="w-20 h-3 rounded-md" />
      <SkeletonBase className="w-28 h-7 rounded-xl" />
    </div>
    <SkeletonBase className="w-36 h-3 rounded-md" />
  </div>
);

// Skeleton for Table Rows (Recent Bookings / Enquiries)
export const SkeletonTable = ({ rows = 5 }) => (
  <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-xs">
    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
      <SkeletonBase className="w-40 h-6 rounded-xl" />
      <SkeletonBase className="w-24 h-8 rounded-full" />
    </div>
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-50">
          <div className="flex items-center space-x-3">
            <SkeletonBase className="w-9 h-9 rounded-full" />
            <div className="space-y-1">
              <SkeletonBase className="w-32 h-4 rounded-md" />
              <SkeletonBase className="w-20 h-3 rounded-md" />
            </div>
          </div>
          <SkeletonBase className="w-20 h-6 rounded-full" />
          <SkeletonBase className="w-24 h-4 rounded-md" />
        </div>
      ))}
    </div>
  </div>
);

// Skeleton for Chart Panels
export const SkeletonChart = ({ height = 'h-64' }) => (
  <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-xs">
    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
      <SkeletonBase className="w-36 h-6 rounded-xl" />
      <SkeletonBase className="w-20 h-7 rounded-full" />
    </div>
    <SkeletonBase className={`w-full ${height} rounded-2xl`} />
  </div>
);

// Skeleton for Quick Action Cards
export const SkeletonActionCard = () => (
  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center space-x-3 shadow-xs">
    <SkeletonBase className="w-10 h-10 rounded-xl" />
    <div className="space-y-1 flex-1">
      <SkeletonBase className="w-24 h-4 rounded-md" />
      <SkeletonBase className="w-36 h-3 rounded-md" />
    </div>
  </div>
);
