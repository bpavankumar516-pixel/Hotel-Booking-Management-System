import React, { useState, useEffect } from 'react';
import { StatCards } from '../../components/dashboard/StatCards';
import { AvailableRoomsSection } from '../../components/dashboard/AvailableRoomsSection';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { MiddleSection } from '../../components/dashboard/MiddleSection';
import { AnalyticsAndTasksSection } from '../../components/dashboard/AnalyticsAndTasksSection';
import { BookingDetailsTable } from '../../components/dashboard/BookingDetailsTable';
import { SkeletonStatCard, SkeletonTable, SkeletonChart, SkeletonActionCard } from '../../components/common/Skeleton';

export const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-[1600px] mx-auto pb-8">
        {/* Top Stat Cards Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
        </div>

        {/* Middle Skeleton Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8">
            <SkeletonChart height="h-72" />
          </div>
          <div className="lg:col-span-4 space-y-3">
            <SkeletonActionCard />
            <SkeletonActionCard />
            <SkeletonActionCard />
            <SkeletonActionCard />
          </div>
        </div>

        {/* Table & Chart Skeletons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5">
            <SkeletonTable rows={4} />
          </div>
          <div className="lg:col-span-7">
            <SkeletonChart height="h-80" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-8 animate-fadeIn">
      {/* Welcome Greeting Banner */}
      <div className="bg-gradient-to-r from-[#1E2B37] via-[#2B3A4A] to-[#1E2B37] text-white p-6 rounded-2xl shadow-lg border border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌴</span>
            <h1 className="font-['Poppins'] text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, Pavan!
            </h1>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            Grand Horizon Luxury Resort & Hotel PMS • Live Property Operations & Revenue Analytics
          </p>
        </div>
        <div className="flex items-center space-x-4 text-xs font-semibold bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 backdrop-blur-xs self-start md:self-auto">
          <div className="flex items-center space-x-1.5 text-amber-300">
            <span>☀️ 28°C Sunny</span>
          </div>
          <span className="text-slate-400">|</span>
          <span className="text-slate-200">Beachfront Resort Ops</span>
        </div>
      </div>

      {/* 1. Top Row: 5 Key Performance Metric Stat Cards */}
      <StatCards />

      {/* 2. Second Row: Daily Operations Hub - Available Rooms Grid (8 cols) & Quick Operational Actions (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-8">
          <AvailableRoomsSection />
        </div>
        <div className="lg:col-span-4">
          <QuickActions />
        </div>
      </div>

      {/* 3. Third Row: Guest Enquiries (5 cols) & Booking Status Trend Analytics (7 cols) */}
      <MiddleSection />

      {/* 4. Fourth Row: Operations & Channels - Staff Tasks, Booking Platforms Donut, Guest Rating */}
      <AnalyticsAndTasksSection />

      {/* 5. Fifth Row: Full Detailed Booking Reservations Data Table */}
      <BookingDetailsTable />
    </div>
  );
};
