import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Shield, Phone, Camera, Save, Check } from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'Jaylon Dorwart',
    email: user?.email || 'jaylon@lodgify.com',
    phone: user?.phone || '+1 (555) 987-6543',
    role: user?.role || 'Admin',
    hotelName: user?.hotelName || 'Lodgify Hotel PMS',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Poppins'] text-2xl font-bold text-[#1A1A1A]">User Profile</h1>
          <p className="text-xs text-[#6B7280]">View and manage your account details and permissions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Card */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 text-center space-y-4 shadow-xs">
          <div className="relative w-28 h-28 mx-auto">
            <img
              src={formData.avatar}
              alt={formData.name}
              className="w-full h-full object-cover rounded-full border-4 border-[#8FD9C4]/40 shadow-md"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-[#D6E85A] text-[#1A1A1A] rounded-full border border-lime-300 shadow-md">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div>
            <h3 className="font-['Poppins'] text-xl font-bold text-[#1A1A1A]">{formData.name}</h3>
            <p className="text-xs font-bold text-slate-700 bg-[#D6E85A] inline-block px-3 py-0.5 rounded-full mt-1 border border-lime-300">{formData.role}</p>
            <p className="text-xs text-[#6B7280] mt-1">{formData.hotelName}</p>
          </div>

          <div className="pt-4 border-t border-slate-100 text-left space-y-3 text-xs text-[#6B7280]">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#6B7280]" />
              <span>{formData.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#6B7280]" />
              <span>{formData.phone || 'No phone set'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-[#1A1A1A] font-bold">Single Role: Full Operations Admin</span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
          <h2 className="font-['Poppins'] text-lg font-bold text-[#1A1A1A] mb-4">Edit Profile Settings</h2>
          
          {saved && (
            <div className="mb-4 p-3 rounded-2xl bg-[#8FD9C4]/30 border border-[#8FD9C4] text-[#1A1A1A] text-xs flex items-center space-x-2 font-bold">
              <Check className="w-4 h-4 text-emerald-800" />
              <span>Profile settings saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A1A1A] uppercase">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#EAF0EC]/60 border border-slate-200 text-[#1A1A1A] text-xs focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A1A1A] uppercase">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#EAF0EC]/60 border border-slate-200 text-[#1A1A1A] text-xs focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A1A1A] uppercase">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#EAF0EC]/60 border border-slate-200 text-[#1A1A1A] text-xs focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A1A1A] uppercase">Hotel System Name</label>
                <input
                  type="text"
                  value={formData.hotelName}
                  onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#EAF0EC]/60 border border-slate-200 text-[#1A1A1A] text-xs focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1A1A] uppercase">Avatar Image URL</label>
              <input
                type="text"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#EAF0EC]/60 border border-slate-200 text-[#1A1A1A] text-xs font-mono focus:bg-white"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-2xl font-bold text-[#1A1A1A] bg-[#D6E85A] hover:bg-[#cbe04a] border border-lime-300 shadow-xs text-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
