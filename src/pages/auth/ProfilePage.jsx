import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  User,
  Mail,
  Shield,
  Phone,
  Camera,
  Save,
  CheckCircle2,
  Lock,
  Bell,
  Building2,
  Key,
  Smartphone,
  Globe,
  Clock,
  History,
  Sparkles,
  Laptop,
  Check,
  RefreshCw,
  LogOut,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'react-toastify';

export const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();

  // Active Tab State
  const [activeTab, setActiveTab] = useState('personal');

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || 'Pavan',
    email: user?.email || 'pavan@grandhorizon.com',
    phone: user?.phone || '+91 98765 43210',
    role: user?.role || 'Administrator',
    department: user?.department || 'Executive Operations & Management',
    hotelName: user?.hotelName || 'Grand Horizon Luxury Resort & Hotel',
    bio: user?.bio || 'General Manager overseeing daily operations, revenue optimization, and guest experience at Grand Horizon Resort.',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    timezone: user?.timezone || '(GMT+05:30) Asia/Kolkata (IST)',
    language: user?.language || 'English (US)',
  });

  // Password Change Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notifications Toggle State
  const [notifications, setNotifications] = useState({
    emailBookingAlerts: true,
    revenueDigest: true,
    guestCheckInAlerts: true,
    systemMaintenanceAlerts: false,
    securityAlerts: true,
  });

  // 2FA Security State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Avatar Presets
  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
  ];

  // Save Profile Handler
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(formData);
    toast.success('User profile & settings updated successfully!');
  };

  // Change Password Handler
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwordData.currentPassword) {
      toast.error('Please enter your current password.');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New password and confirmation do not match.');
      return;
    }

    toast.success('Security password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-12">
      {/* 1. Header Banner & Executive Identity Hero Card */}
      <div className="bg-gradient-to-r from-[#1E2B37] via-[#2B3A4A] to-[#1E2B37] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/50 relative overflow-hidden">
        {/* Background Decorative Accents */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
            {/* User Avatar with Gold Border */}
            <div className="relative group shrink-0">
              <img
                src={formData.avatar}
                alt={formData.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border-4 border-[#C5A059] shadow-xl ring-4 ring-slate-900/50"
              />
              <button
                type="button"
                onClick={() => setActiveTab('personal')}
                className="absolute bottom-0 right-0 p-2 bg-[#C5A059] text-white hover:bg-[#b08d48] rounded-xl border-2 border-[#1E2B37] shadow-lg transition-colors cursor-pointer"
                title="Change Avatar"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info Details */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="font-['Poppins'] text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {formData.name}
                </h1>
                <span className="px-3 py-0.5 rounded-full bg-[#C5A059] text-white text-xs font-bold shadow-xs">
                  {formData.role}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online Active</span>
                </span>
              </div>

              <p className="text-xs text-slate-300 font-medium flex items-center justify-center sm:justify-start space-x-2">
                <Building2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{formData.hotelName}</span>
              </p>

              <p className="text-xs text-slate-400 font-mono">
                ID: <span className="text-amber-200 font-bold">{user?.id || 'usr_grand_horizon_01'}</span> • {formData.department}
              </p>
            </div>
          </div>

          {/* Quick Info Summary Pill Badges */}
          <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0 text-xs text-slate-300 font-medium">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Full Operations Administrator</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#C5A059]" />
              <span>Last Login: Today at 09:42 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab('personal')}
          className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === 'personal'
              ? 'bg-[#1E2B37] text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <User className={`w-4 h-4 ${activeTab === 'personal' ? 'text-[#C5A059]' : 'text-slate-400'}`} />
          <span>Personal Info & Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === 'security'
              ? 'bg-[#1E2B37] text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Lock className={`w-4 h-4 ${activeTab === 'security' ? 'text-[#C5A059]' : 'text-slate-400'}`} />
          <span>Security & Password</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-[#1E2B37] text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Bell className={`w-4 h-4 ${activeTab === 'notifications' ? 'text-[#C5A059]' : 'text-slate-400'}`} />
          <span>Preferences & Alerts</span>
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === 'activity'
              ? 'bg-[#1E2B37] text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <History className={`w-4 h-4 ${activeTab === 'activity' ? 'text-[#C5A059]' : 'text-slate-400'}`} />
          <span>System Activity Log</span>
        </button>
      </div>

      {/* 3. Tab Content Panels */}
      {/* TAB 1: PERSONAL INFO */}
      {activeTab === 'personal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Side (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-['Poppins'] text-lg font-extrabold text-[#1E2B37]">
                  Edit Personal Identity & Credentials
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Update your contact details, manager bio, and system display profile.
                </p>
              </div>
              <span className="p-2 rounded-xl bg-amber-50 text-[#C5A059] border border-amber-200">
                <User className="w-5 h-5" />
              </span>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Full Display Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Phone & Job Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">System Access Role</label>
                  <input
                    type="text"
                    readOnly
                    value={formData.role}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Row 3: Hotel Name & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Resort & Hotel Property</label>
                  <input
                    type="text"
                    value={formData.hotelName}
                    onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Department / Division</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059] transition-colors"
                  />
                </div>
              </div>

              {/* Bio Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Executive Manager Bio</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Describe your role and operational duties..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059] transition-colors resize-none"
                />
              </div>

              {/* Avatar Image URL & Preset Selection */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-700 block">Profile Avatar Selection</label>

                {/* Preset Avatars */}
                <div className="flex items-center space-x-3">
                  <span className="text-[11px] font-bold text-slate-400 shrink-0">Presets:</span>
                  {avatarPresets.map((presetUrl, idx) => (
                    <img
                      key={idx}
                      src={presetUrl}
                      alt={`Preset ${idx + 1}`}
                      onClick={() => setFormData({ ...formData, avatar: presetUrl })}
                      className={`w-10 h-10 rounded-xl object-cover cursor-pointer transition-all border-2 ${
                        formData.avatar === presetUrl
                          ? 'border-[#C5A059] scale-110 shadow-md ring-2 ring-amber-200'
                          : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>

                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="Or paste custom image URL..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-white bg-[#8C6239] hover:bg-[#734f2d] shadow-md transition-all cursor-pointer text-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Settings</span>
                </button>
              </div>
            </form>
          </div>

          {/* User Card Summary Side (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4 text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden border-2 border-[#C5A059] shadow-md">
                <img src={formData.avatar} alt={formData.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-['Poppins'] font-bold text-base text-[#1E2B37]">{formData.name}</h4>
                <p className="text-xs text-slate-500">{formData.email}</p>
                <span className="mt-2 inline-block px-3 py-1 rounded-full bg-amber-50 text-[#C5A059] border border-amber-200 font-extrabold text-[11px]">
                  {formData.role}
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100 text-left space-y-3 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-bold text-emerald-600">Active Duty</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Member Since:</span>
                  <span className="font-bold text-[#1E2B37]">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Permissions:</span>
                  <span className="font-bold text-[#C5A059]">Full Control</span>
                </div>
              </div>
            </div>

            {/* Account Quick Actions */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs space-y-3">
              <h4 className="font-['Poppins'] font-bold text-xs text-slate-400 uppercase tracking-wider">
                Account Control
              </h4>
              <button
                onClick={() => {
                  logout();
                  toast.info('Logged out of Grand Horizon PMS session.');
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs inline-flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of Session</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SECURITY & PASSWORD */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Password Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-['Poppins'] text-lg font-extrabold text-[#1E2B37]">
                  Change Password & Credentials
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Ensure your account is using a strong password for PMS protection.
                </p>
              </div>
              <span className="p-2 rounded-xl bg-amber-50 text-[#C5A059] border border-amber-200">
                <Key className="w-5 h-5" />
              </span>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Current Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Min 6 characters..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Repeat new password..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-white bg-[#8C6239] hover:bg-[#734f2d] shadow-md transition-all cursor-pointer text-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>

          {/* 2FA & Active Sessions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 2FA Card */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <Smartphone className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-['Poppins'] font-extrabold text-sm text-[#1E2B37]">Two-Factor Auth (2FA)</h4>
                    <p className="text-[11px] text-slate-400">Authenticator App Protection</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    toast.info(twoFactorEnabled ? 'Disabled Two-Factor Authentication.' : 'Enabled Two-Factor Authentication!');
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    twoFactorEnabled ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Require a 6-digit verification code from Google Authenticator or SMS when logging into the Grand Horizon PMS console.
              </p>
            </div>

            {/* Active Sessions */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
              <h4 className="font-['Poppins'] font-extrabold text-sm text-[#1E2B37] flex items-center space-x-2">
                <Laptop className="w-4 h-4 text-[#C5A059]" />
                <span>Active Device Sessions</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-bold text-[#1E2B37]">Windows PC • Chrome Browser</p>
                    <p className="text-[10px] text-slate-400">IP: 192.168.1.10 • Current Session</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                    Active
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-bold text-[#1E2B37]">iPhone 15 Pro • Safari</p>
                    <p className="text-[10px] text-slate-400">IP: 172.56.21.8 • 2 hours ago</p>
                  </div>
                  <button
                    onClick={() => toast.info('Revoked session on iPhone 15 Pro')}
                    className="text-[10px] font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTIFICATIONS & PREFERENCES */}
      {activeTab === 'notifications' && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] text-lg font-extrabold text-[#1E2B37]">
                Notification Preferences & Timezone
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Configure real-time PMS alerts, daily revenue emails, and regional localization.
              </p>
            </div>
            <span className="p-2 rounded-xl bg-amber-50 text-[#C5A059] border border-amber-200">
              <Bell className="w-5 h-5" />
            </span>
          </div>

          <div className="space-y-6">
            {/* Toggles List */}
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/60">
                <div>
                  <p className="font-bold text-[#1E2B37]">Instant Booking Confirmation Alerts</p>
                  <p className="text-slate-400 text-[11px]">Receive push notification when a new reservation is created.</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, emailBookingAlerts: !notifications.emailBookingAlerts })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                    notifications.emailBookingAlerts ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ${
                    notifications.emailBookingAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/60">
                <div>
                  <p className="font-bold text-[#1E2B37]">Daily Financial Revenue Email Digest</p>
                  <p className="text-slate-400 text-[11px]">Receive a midnight summary of daily revenue and folio settlements.</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, revenueDigest: !notifications.revenueDigest })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                    notifications.revenueDigest ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ${
                    notifications.revenueDigest ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/60">
                <div>
                  <p className="font-bold text-[#1E2B37]">VIP Guest Check-In Alerts</p>
                  <p className="text-slate-400 text-[11px]">Alert front desk manager when VIP profiles check into rooms.</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, guestCheckInAlerts: !notifications.guestCheckInAlerts })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                    notifications.guestCheckInAlerts ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ${
                    notifications.guestCheckInAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

            {/* Localization Settings */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">System Timezone</label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="(GMT+05:30) Asia/Kolkata (IST)">(GMT+05:30) Asia/Kolkata (IST)</option>
                    <option value="(GMT+00:00) London (GMT)">(GMT+00:00) London (GMT)</option>
                    <option value="(GMT-05:00) Eastern Time (US)">(GMT-05:00) Eastern Time (US)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Language Preference</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="English (US)">English (US)</option>
                  <option value="English (UK)">English (UK)</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Telugu">Telugu</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => toast.success('Saved notification & localization preferences!')}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-white bg-[#8C6239] hover:bg-[#734f2d] shadow-md transition-all cursor-pointer text-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save Notification Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SYSTEM ACTIVITY LOG */}
      {activeTab === 'activity' && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] text-lg font-extrabold text-[#1E2B37]">
                User Audit Trail & Activity Log
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Historical record of system operations performed by your manager account.
              </p>
            </div>
            <span className="p-2 rounded-xl bg-amber-50 text-[#C5A059] border border-amber-200">
              <History className="w-5 h-5" />
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { title: 'Updated Room Inventory Pricing', time: '10 minutes ago', detail: 'Adjusted Deluxe Suite rate to $240/night in System Settings', icon: Sparkles, color: 'text-[#C5A059]' },
              { title: 'Confirmed Guest Reservation #RES-8921', time: '1 hour ago', detail: 'Checked-in guest Rajesh Sharma to Room 104', icon: CheckCircle2, color: 'text-emerald-600' },
              { title: 'Exported Executive CSV BI Report', time: '3 hours ago', detail: 'Generated monthly financial yield report', icon: Laptop, color: 'text-blue-600' },
              { title: 'Modified Property Billing Address', time: 'Yesterday at 04:15 PM', detail: 'Updated tax GSTIN registration code', icon: Building2, color: 'text-purple-600' },
            ].map((log, idx) => {
              const IconComp = log.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 flex items-start space-x-3">
                  <span className={`p-2 rounded-xl bg-white shadow-2xs ${log.color} shrink-0`}>
                    <IconComp className="w-4 h-4" />
                  </span>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#1E2B37] text-xs">{log.title}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{log.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{log.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
