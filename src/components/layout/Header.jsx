import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  CalendarCheck,
  BedDouble,
  CheckCircle2,
  Wrench,
  Check,
  Trash2,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useHotel } from '../../contexts/HotelContext';
import { toast } from 'react-toastify';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const {
    notifications = [],
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
  } = useHotel();

  // Dropdown States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Refs for click outside handling
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pageTitles = {
    '/dashboard': 'Dashboard Analytics',
    '/rooms': 'Rooms & Suites Directory',
    '/guests': 'Guest Directory & Profiles',
    '/reservations': 'Reservations & Booking Engine',
    '/frontdesk': 'Front Desk Operations',
    '/checkin': 'Check-In Operations',
    '/checkout': 'Check-Out Operations',
    '/maintenance': 'Maintenance Operations',
    '/payments': 'Payments & Billing',
    '/history': 'Booking History Directory',
    '/reports': 'Analytics & Reports',
    '/settings': 'System Settings',
    '/profile': 'User Profile',
  };

  const currentTitle = pageTitles[location.pathname] || 'Dashboard';
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    setShowProfileDropdown(false);
    logout();
    toast.info('Logged out successfully.');
    navigate('/login');
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'reservation':
        return <CalendarCheck className="w-4 h-4 text-[#C5A059]" />;
      case 'room':
        return <BedDouble className="w-4 h-4 text-emerald-600" />;
      case 'checkout':
        return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-amber-600" />;
      default:
        return <Bell className="w-4 h-4 text-[#C5A059]" />;
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/70 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
      {/* Title */}
      <h1 className="font-['Poppins'] text-lg font-extrabold text-[#1E2B37] tracking-tight">
        {currentTitle}
      </h1>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Search Bar */}
        <div className="relative w-40 sm:w-64 hidden xs:block">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hotel records..."
            className="w-full pr-9 pl-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-[#1E2B37] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all font-sans"
          />
          <Search className="w-3.5 h-3.5 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* --- NOTIFICATION BELL CONTAINER --- */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileDropdown(false);
            }}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-[#C5A059]" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 ring-2 ring-white"></span>
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <h4 className="font-['Poppins'] text-xs font-extrabold text-[#1E2B37] uppercase tracking-wider">
                    Notifications
                  </h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">
                      {unreadCount} New
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] text-[#C5A059] hover:underline font-bold cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* List */}
              <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    No active notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                        n.read
                          ? 'bg-slate-50/70 border-slate-100 opacity-75'
                          : 'bg-amber-50/40 border-amber-200/70 shadow-2xs'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-white border border-slate-200 shrink-0 shadow-2xs">
                        {getCategoryIcon(n.category)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-['Poppins'] text-xs font-bold text-[#1E2B37] truncate">
                            {n.title}
                          </span>
                          <span className="text-[10px] text-slate-400 shrink-0 ml-1">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{n.text}</p>
                      </div>

                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-[#C5A059] shrink-0 mt-1" />
                      )}
                    </div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-[10px] text-slate-400">Showing {notifications.length} alerts</span>
                  <button
                    onClick={clearNotifications}
                    className="text-[11px] text-slate-500 hover:text-rose-600 font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* --- USER PROFILE DROPDOWN CONTAINER --- */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-2.5 pl-1.5 pr-3 py-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
              alt="Profile"
              className="w-7 h-7 rounded-full object-cover border border-[#C5A059] shadow-2xs"
            />
            <span className="font-['Poppins'] text-xs font-bold text-[#1E2B37] hidden sm:inline-block">
              {user?.name || 'Pavan'}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                showProfileDropdown ? 'rotate-180 text-[#C5A059]' : ''
              }`}
            />
          </button>

          {/* Interactive Profile Dropdown Panel */}
          {showProfileDropdown && (
            <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 space-y-1">
              {/* Header User Badge */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3 mb-1">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border border-[#C5A059] shrink-0"
                />
                <div className="truncate">
                  <h4 className="font-['Poppins'] text-xs font-bold text-[#1E2B37] truncate">
                    {user?.name || 'Pavan'}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate">{user?.email || 'pavan@grandhorizon.com'}</p>
                  <span className="inline-block mt-1 text-[9px] font-extrabold px-2 py-0.2 rounded bg-[#C5A059] text-white uppercase tracking-wider">
                    {user?.role || 'Admin'}
                  </span>
                </div>
              </div>

              {/* Menu Links */}
              <button
                onClick={() => {
                  setShowProfileDropdown(false);
                  navigate('/profile');
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#1E2B37] hover:bg-slate-100 flex items-center space-x-2.5 transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>User Profile</span>
              </button>

              <button
                onClick={() => {
                  setShowProfileDropdown(false);
                  navigate('/settings');
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#1E2B37] hover:bg-slate-100 flex items-center space-x-2.5 transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4 text-slate-500" />
                <span>System Settings</span>
              </button>

              <div className="border-t border-slate-100 my-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center space-x-2.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span>Sign Out / Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
