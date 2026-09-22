import React, { useState } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useHotel } from '../../contexts/HotelContext';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const { user } = useAuth();
  const { notifications } = useHotel();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const pageTitles = {
    '/dashboard': 'Dashboard',
    '/rooms': 'Rooms Available',
    '/guests': 'Agents & Staff',
    '/reservations': 'Reservation List',
    '/frontdesk': 'Front Desk Operations',
    '/housekeeping': 'Checkouts & Housekeeping',
    '/maintenance': 'Maintenance Management',
    '/payments': 'Payments & Billing',
    '/invoices': 'Invoices',
    '/history': 'Booking History',
    '/reports': 'Reports & Financials',
    '/notifications': 'Notifications Center',
    '/offers': 'Offers & Discounts',
    '/room-types': 'Room Types & Amenities',
    '/communication': 'Enquiries & Messages',
    '/settings': 'Settings',
    '/profile': 'User Profile',
  };

  const currentTitle = pageTitles[location.pathname] || 'Dashboard';
  const unreadCount = notifications.filter((n) => !n.read).length || 4;

  return (
    <header className="h-16 bg-white border-b border-slate-200/70 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
      {/* Title */}
      <h1 className="font-['Poppins'] text-lg font-bold text-[#1E2B37]">{currentTitle}</h1>

      {/* Center/Right Controls matching reference image */}
      <div className="flex items-center space-x-4">
        {/* Search Bar: Pill-shaped light gray input */}
        <div className="relative w-48 sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pr-9 pl-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-[#1E2B37] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all font-sans"
          />
          <Search className="w-3.5 h-3.5 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Bell Notification Icon with red dot badge */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer relative"
          >
            <Bell className="w-4 h-4 text-[#C5A059]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="font-['Poppins'] text-xs font-bold text-[#1E2B37] uppercase tracking-wider">Notifications</h4>
                <span className="text-[10px] bg-[#C5A059] text-white px-2 py-0.5 rounded-full font-bold">
                  {unreadCount} New
                </span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-['Poppins'] text-xs font-bold text-[#1E2B37]">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Pill: Avatar + Name + Chevron */}
        <Link
          to="/profile"
          className="flex items-center space-x-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
            alt="Profile"
            className="w-7 h-7 rounded-full object-cover border border-slate-300"
          />
          <span className="font-['Poppins'] text-xs font-semibold text-[#1E2B37] hidden sm:inline-block">
            {user?.name || 'Madison Alley'}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>
    </header>
  );
};
