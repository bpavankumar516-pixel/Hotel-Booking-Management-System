import React, { useState } from 'react';
import { Settings, Save, Building, ShieldCheck, DollarSign, Bell } from 'lucide-react';

export const SettingsPage = () => {
  const [settings, setSettings] = useState({
    hotelName: 'Grand Horizon Luxury Resort & Hotel',
    address: '100 Ocean Boulevard, Suite 500, Miami Beach, FL',
    currency: 'USD ($)',
    taxRate: 12,
    checkInTime: '14:00',
    checkOutTime: '11:00',
    emailAlerts: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-[#C5A059] text-white uppercase">
              Configuration
            </span>
            <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">System Settings & Property Profile</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage property details, default check-in/out hours, tax calculations, and system preferences.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold text-center">
          System settings updated successfully!
        </div>
      )}

      {/* Settings Form Card */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs max-w-3xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div className="space-y-4">
            <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37] pb-2 border-b border-slate-100 flex items-center space-x-2">
              <Building className="w-4 h-4 text-[#C5A059]" />
              <span>Property Identity</span>
            </h3>

            <div>
              <label className="text-xs text-slate-500 font-semibold block mb-1">Hotel Brand Name</label>
              <input
                type="text"
                required
                value={settings.hotelName}
                onChange={(e) => setSettings({ ...settings, hotelName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] font-semibold"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500 font-semibold block mb-1">Property Address</label>
              <input
                type="text"
                required
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37] pb-2 border-b border-slate-100 flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-[#C5A059]" />
              <span>Billing & Operational Policy</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 font-semibold block mb-1">Default Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                >
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                  <option value="GBP (£)">GBP (£)</option>
                  <option value="INR (₹)">INR (₹)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-semibold block mb-1">Standard Tax Rate (%)</label>
                <input
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 font-semibold block mb-1">Standard Check-In Time</label>
                <input
                  type="time"
                  value={settings.checkInTime}
                  onChange={(e) => setSettings({ ...settings, checkInTime: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 font-semibold block mb-1">Standard Check-Out Time</label>
                <input
                  type="time"
                  value={settings.checkOutTime}
                  onChange={(e) => setSettings({ ...settings, checkOutTime: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] font-extrabold text-xs text-white shadow-xs transition-all flex items-center justify-center space-x-1 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save System Settings</span>
          </button>
        </form>
      </div>
    </div>
  );
};
