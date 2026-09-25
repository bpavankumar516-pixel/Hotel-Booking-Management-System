import React, { useState } from 'react';
import { useHotel } from '../../contexts/HotelContext';
import { toast } from 'react-toastify';
import {
  Settings,
  Save,
  Building2,
  DollarSign,
  Clock,
  Bell,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Globe,
  Mail,
  Phone,
  HelpCircle,
  RefreshCw,
  Percent,
  FileText,
  Key,
  Wrench,
  Sparkles,
  Eye,
  Check,
} from 'lucide-react';

export const SettingsPage = () => {
  const { addNotification } = useHotel();

  // Active Tab State: 'property' | 'billing' | 'policies' | 'notifications' | 'operations'
  const [activeTab, setActiveTab] = useState('property');

  // Loaded Settings from localStorage or Default Mock Properties
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('grand_horizon_settings');
    return saved
      ? JSON.parse(saved)
      : {
          hotelName: 'Grand Horizon Luxury Resort & Hotel',
          tagline: '5-Star Oceanfront Hospitality & Spa',
          address: '100 Ocean Boulevard, Suite 500, Paradise Beach, CA 90210',
          contactEmail: 'contact@grandhorizonresort.com',
          contactPhone: '+1 (800) 555-HORIZON',
          taxId: 'US-9941820',
          website: 'https://grandhorizonresort.com',
          currency: 'USD ($)',
          currencySymbol: '$',
          taxRate: 12,
          serviceChargeRate: 5,
          defaultPaymentMethod: 'Credit Card',
          checkInTime: '14:00',
          checkOutTime: '11:00',
          lateCheckOutFeeRate: 25,
          autoReleaseUnpaidHours: 24,
          autoFlagDirtyOnCheckOut: true,
          minStayNights: 1,
          emailAlerts: true,
          smsAlerts: true,
          soundAlerts: true,
          lowInventoryThreshold: 3,
          autoBackupDaily: true,
        };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Save Settings Submit Handler
  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('grand_horizon_settings', JSON.stringify(settings));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);

    if (addNotification) {
      addNotification({
        title: 'System Settings Synchronized',
        text: `Property rules & billing parameters updated for ${settings.hotelName}`,
        category: 'system',
      });
    }

    toast.success('System configuration saved & synchronized successfully!');
  };

  // Reset to Factory Defaults
  const handleResetDefaults = () => {
    const defaults = {
      hotelName: 'Grand Horizon Luxury Resort & Hotel',
      tagline: '5-Star Oceanfront Hospitality & Spa',
      address: '100 Ocean Boulevard, Suite 500, Paradise Beach, CA 90210',
      contactEmail: 'contact@grandhorizonresort.com',
      contactPhone: '+1 (800) 555-HORIZON',
      taxId: 'US-9941820',
      website: 'https://grandhorizonresort.com',
      currency: 'USD ($)',
      currencySymbol: '$',
      taxRate: 12,
      serviceChargeRate: 5,
      defaultPaymentMethod: 'Credit Card',
      checkInTime: '14:00',
      checkOutTime: '11:00',
      lateCheckOutFeeRate: 25,
      autoReleaseUnpaidHours: 24,
      autoFlagDirtyOnCheckOut: true,
      minStayNights: 1,
      emailAlerts: true,
      smsAlerts: true,
      soundAlerts: true,
      lowInventoryThreshold: 3,
      autoBackupDaily: true,
    };
    setSettings(defaults);
    localStorage.setItem('grand_horizon_settings', JSON.stringify(defaults));
    toast.info('Reset system settings to default factory values.');
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* 1. Executive Title & System Status Banner */}
      <div className="bg-gradient-to-r from-[#1E2B37] via-[#2B3A4A] to-[#1E2B37] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Background Subtle Blur Accent */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="flex items-center space-x-3">
            <span className="p-2.5 rounded-2xl bg-[#C5A059] text-white shadow-md">
              <Settings className="w-6 h-6" />
            </span>
            <div>
              <h1 className="font-['Poppins'] text-2xl sm:text-3xl font-extrabold tracking-tight">
                System Configuration & PMS Policies
              </h1>
              <p className="text-xs text-slate-300 font-medium">
                Manage property identity, tax rules, standard check-in hours, and front-desk automation.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls & Quick Badges */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 self-start md:self-auto">
          <div className="hidden sm:flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-2xl border border-white/10 text-xs font-semibold backdrop-blur-md">
            <span className="flex items-center space-x-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live PMS Sync</span>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-amber-200">Tax: {settings.taxRate}%</span>
          </div>

          <button
            onClick={handleResetDefaults}
            className="py-2.5 px-4 rounded-xl border border-slate-600 bg-white/10 hover:bg-white/20 text-white font-bold text-xs inline-flex items-center space-x-2 cursor-pointer transition-all shadow-sm"
          >
            <RefreshCw className="w-4 h-4 text-slate-300" />
            <span>Reset Factory Defaults</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Property configuration and operational policies have been updated in real-time.</span>
          </div>
          <span className="text-[10px] font-mono font-extrabold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded">
            SYNCHRONIZED
          </span>
        </div>
      )}

      {/* 2. Navigation Pills Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('property')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === 'property'
              ? 'bg-[#1E2B37] text-white shadow-md'
              : 'text-slate-600 hover:text-[#1E2B37] hover:bg-slate-100'
          }`}
        >
          <Building2 className={`w-4 h-4 ${activeTab === 'property' ? 'text-[#C5A059]' : 'text-slate-400'}`} />
          <span>Property Identity & Branding</span>
        </button>

        <button
          onClick={() => setActiveTab('billing')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === 'billing'
              ? 'bg-[#1E2B37] text-white shadow-md'
              : 'text-slate-600 hover:text-[#1E2B37] hover:bg-slate-100'
          }`}
        >
          <DollarSign className={`w-4 h-4 ${activeTab === 'billing' ? 'text-[#C5A059]' : 'text-slate-400'}`} />
          <span>Billing, Currency & Tax Rates</span>
        </button>

        <button
          onClick={() => setActiveTab('policies')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === 'policies'
              ? 'bg-[#1E2B37] text-white shadow-md'
              : 'text-slate-600 hover:text-[#1E2B37] hover:bg-slate-100'
          }`}
        >
          <Clock className={`w-4 h-4 ${activeTab === 'policies' ? 'text-[#C5A059]' : 'text-slate-400'}`} />
          <span>Check-In & Stay Rules</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === 'notifications'
              ? 'bg-[#1E2B37] text-white shadow-md'
              : 'text-slate-600 hover:text-[#1E2B37] hover:bg-slate-100'
          }`}
        >
          <Bell className={`w-4 h-4 ${activeTab === 'notifications' ? 'text-[#C5A059]' : 'text-slate-400'}`} />
          <span>Front-Desk Alerts & Chimes</span>
        </button>
      </div>

      {/* 3. Main Form Grid Layout (8 cols Form + 4 cols Live Invoice Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Container (8 cols) */}
        <form onSubmit={handleSaveSettings} className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* TAB 1: PROPERTY IDENTITY & BRANDING */}
          {activeTab === 'property' && (
            <div className="space-y-5 text-xs">
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-['Poppins'] font-extrabold text-lg text-[#1E2B37]">Property Identity & Branding</h3>
                  <p className="text-slate-400 text-xs">Official hotel details printed on receipts, guest folios & guest emails</p>
                </div>
                <span className="p-2 rounded-xl bg-amber-50 text-[#C5A059] border border-amber-200">
                  <Building2 className="w-5 h-5" />
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hotel Brand Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.hotelName}
                    onChange={(e) => setSettings({ ...settings, hotelName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] font-semibold focus:bg-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Resort Tagline / Slogan</label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Physical Resort Address</label>
                  <input
                    type="text"
                    required
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={settings.contactEmail}
                        onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={settings.contactPhone}
                        onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tax Registration ID (GSTIN / TIN)</label>
                    <input
                      type="text"
                      value={settings.taxId}
                      onChange={(e) => setSettings({ ...settings, taxId: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] font-mono focus:bg-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Official Resort Website</label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="url"
                        value={settings.website}
                        onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] focus:bg-white focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BILLING & TAX RATES */}
          {activeTab === 'billing' && (
            <div className="space-y-5 text-xs">
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-['Poppins'] font-extrabold text-lg text-[#1E2B37]">Billing, Currency & Tax Rates</h3>
                  <p className="text-slate-400 text-xs">Financial calculation percentages, default payment gateway & currency unit</p>
                </div>
                <span className="p-2 rounded-xl bg-amber-50 text-[#C5A059] border border-amber-200">
                  <DollarSign className="w-5 h-5" />
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Default Base Currency</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => {
                        const cur = e.target.value;
                        const symbol = cur.includes('$') ? '$' : cur.includes('€') ? '€' : cur.includes('£') ? '£' : '₹';
                        setSettings({ ...settings, currency: cur, currencySymbol: symbol });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] font-semibold focus:bg-white focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="USD ($)">US Dollar ($ USD)</option>
                      <option value="EUR (€)">Euro (€ EUR)</option>
                      <option value="GBP (£)">British Pound (£ GBP)</option>
                      <option value="INR (₹)">Indian Rupee (₹ INR)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Default Payment Gateway Method</label>
                    <select
                      value={settings.defaultPaymentMethod}
                      onChange={(e) => setSettings({ ...settings, defaultPaymentMethod: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] font-semibold focus:bg-white focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="Credit Card">Credit Card Terminal</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="Bank Transfer">Bank Transfer / UPI Wire</option>
                      <option value="Cash">Cash at Front Desk</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Standard Room Tax Rate (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.taxRate}
                      onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[#1E2B37] font-mono font-bold focus:outline-none focus:border-[#C5A059]"
                    />
                    <span className="text-[10px] text-slate-400 block">Applied automatically to room night folios</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Resort Service Charge (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={settings.serviceChargeRate}
                      onChange={(e) => setSettings({ ...settings, serviceChargeRate: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[#1E2B37] font-mono font-bold focus:outline-none focus:border-[#C5A059]"
                    />
                    <span className="text-[10px] text-slate-400 block">Surcharge for resort facilities & housekeeping</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHECK-IN & STAY POLICIES */}
          {activeTab === 'policies' && (
            <div className="space-y-5 text-xs">
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-['Poppins'] font-extrabold text-lg text-[#1E2B37]">Check-In & Stay Rules</h3>
                  <p className="text-slate-400 text-xs">Standard check-in/out operating hours, late fees & auto-release</p>
                </div>
                <span className="p-2 rounded-xl bg-amber-50 text-[#C5A059] border border-amber-200">
                  <Clock className="w-5 h-5" />
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Standard Check-In Time</label>
                    <input
                      type="time"
                      required
                      value={settings.checkInTime}
                      onChange={(e) => setSettings({ ...settings, checkInTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[#1E2B37] font-mono font-bold focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Standard Check-Out Time</label>
                    <input
                      type="time"
                      required
                      value={settings.checkOutTime}
                      onChange={(e) => setSettings({ ...settings, checkOutTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[#1E2B37] font-mono font-bold focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Late Check-Out Fee Rate (% of Room Rate)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.lateCheckOutFeeRate}
                      onChange={(e) => setSettings({ ...settings, lateCheckOutFeeRate: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] font-mono font-bold focus:bg-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Auto-Release Unpaid Booking Holding (Hours)</label>
                    <input
                      type="number"
                      min="1"
                      max="72"
                      value={settings.autoReleaseUnpaidHours}
                      onChange={(e) => setSettings({ ...settings, autoReleaseUnpaidHours: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#1E2B37] font-mono font-bold focus:bg-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                {/* Auto Flag Housekeeping */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div>
                    <p className="font-bold text-[#1E2B37]">Auto-Flag Room "Needs Cleaning" on Check-Out</p>
                    <p className="text-[11px] text-slate-400">Automatically switch room inventory state to Dirty upon guest check-out</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, autoFlagDirtyOnCheckOut: !settings.autoFlagDirtyOnCheckOut })}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                      settings.autoFlagDirtyOnCheckOut ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ${
                      settings.autoFlagDirtyOnCheckOut ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SYSTEM ALERTS */}
          {activeTab === 'notifications' && (
            <div className="space-y-5 text-xs">
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-['Poppins'] font-extrabold text-lg text-[#1E2B37]">Front-Desk Alerts & Automation</h3>
                  <p className="text-slate-400 text-xs">Real-time sound chimes, email receipts & inventory alerts</p>
                </div>
                <span className="p-2 rounded-xl bg-amber-50 text-[#C5A059] border border-amber-200">
                  <Bell className="w-5 h-5" />
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div>
                    <p className="font-bold text-[#1E2B37]">Email Guest Receipts & Folio Confirmations</p>
                    <p className="text-[11px] text-slate-400">Send automatic PDF folio receipts to guest emails upon payment</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, emailAlerts: !settings.emailAlerts })}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                      settings.emailAlerts ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ${
                      settings.emailAlerts ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div>
                    <p className="font-bold text-[#1E2B37]">SMS Keycard & Check-In Reminders</p>
                    <p className="text-[11px] text-slate-400">Send room number & RFID key details to guest mobile phones</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, smsAlerts: !settings.smsAlerts })}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                      settings.smsAlerts ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ${
                      settings.smsAlerts ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div>
                    <p className="font-bold text-[#1E2B37]">Front-Desk Sound Audio Chimes</p>
                    <p className="text-[11px] text-slate-400">Play audio chime notification when new online reservations arrive</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, soundAlerts: !settings.soundAlerts })}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                      settings.soundAlerts ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ${
                      settings.soundAlerts ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Low Room Inventory Alert Threshold (Suites Remaining)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={settings.lowInventoryThreshold}
                    onChange={(e) => setSettings({ ...settings, lowInventoryThreshold: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[#1E2B37] font-mono font-bold focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button Bar */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="submit"
              className="py-3 px-8 rounded-xl bg-[#8C6239] hover:bg-[#734f2d] font-bold text-xs text-white shadow-md transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </button>
          </div>
        </form>

        {/* 4. Live Folio & Receipt Header Preview Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#1E2B37] text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
              <span className="text-[11px] font-bold text-[#C5A059] uppercase tracking-wider flex items-center space-x-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Live Receipt Header Preview</span>
              </span>
              <span className="text-[9px] font-mono bg-[#C5A059]/20 text-[#C5A059] px-2 py-0.5 rounded font-extrabold">
                REAL-TIME
              </span>
            </div>

            {/* Mock Invoice Header */}
            <div className="bg-white text-slate-900 rounded-2xl p-5 shadow-lg font-sans space-y-3">
              <div className="text-center space-y-1">
                <div className="w-8 h-8 mx-auto rounded-full bg-[#C5A059] text-white flex items-center justify-center font-bold text-xs">
                  GH
                </div>
                <h4 className="font-['Poppins'] font-black text-sm text-[#1E2B37] leading-tight">
                  {settings.hotelName || 'Grand Horizon Luxury Resort'}
                </h4>
                <p className="text-[10px] text-slate-400 font-medium italic">{settings.tagline}</p>
                <p className="text-[9px] text-slate-500 font-mono">{settings.address}</p>
              </div>

              <div className="border-t border-dashed border-slate-200 pt-2 space-y-1 text-[10px]">
                <div className="flex justify-between text-slate-500">
                  <span>Phone:</span>
                  <span className="font-semibold text-slate-800">{settings.contactPhone}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax ID:</span>
                  <span className="font-semibold font-mono text-slate-800">{settings.taxId}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Base Tax:</span>
                  <span className="font-bold text-[#C5A059]">{settings.taxRate}%</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Service Fee:</span>
                  <span className="font-bold text-emerald-600">{settings.serviceChargeRate}%</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-2 text-center">
                <span className="text-[9px] text-slate-400 font-mono block">
                  Check-In: {settings.checkInTime} • Check-Out: {settings.checkOutTime}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 text-center">
              Changes saved in System Settings update all generated PDF invoices and guest check-in slips instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
