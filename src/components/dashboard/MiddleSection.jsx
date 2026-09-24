import React, { useState } from 'react';
import { useHotel } from '../../contexts/HotelContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowUpRight, ChevronDown, ChevronRight, X, MessageSquare, Send, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const MiddleSection = () => {
  const navigate = useNavigate();
  const { recentEnquiries = [], guests = [], bookingStatusChartData = [] } = useHotel();
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [replyText, setReplyText] = useState('');

  const sampleMessages = [
    {
      subject: 'Late Check-out & Airport Shuttle Request',
      message: 'Hello Grand Horizon team! We will be arriving on flight AA-920 at 2:30 PM. Could you please arrange an executive airport transfer and confirm if a 2 PM late check-out is possible for our suite?',
      time: '12 mins ago',
    },
    {
      subject: 'Spa Jacuzzi & Dietary Preferences',
      message: 'Hi! I wanted to check if gluten-free options are available for in-room breakfast service, and if we can pre-book a private spa session for tomorrow evening?',
      time: '35 mins ago',
    },
    {
      subject: 'Invoice & Folio Payment Confirmation',
      message: 'Dear Reception, please send the itemized invoice for reservation RES-9014 to my business email address for company reimbursement processing.',
      time: '1 hour ago',
    },
    {
      subject: 'Express Check-In & Extra Keys',
      message: 'Good morning! We are driving from Phoenix and expecting early arrival around 11:30 AM. Is express check-in available for room #101?',
      time: '2 hours ago',
    },
    {
      subject: 'Conference Room & High-Speed WiFi',
      message: 'Hello, we require high-speed fiber WiFi access codes for 4 laptops and access to Conference Room B for a virtual board meeting tomorrow morning.',
      time: '3 hours ago',
    },
    {
      subject: 'Cancellation & Refund Status',
      message: 'Hi, I received notification for reservation cancellation RES-9016. Kindly confirm when the refund credit will reflect on my Visa card.',
      time: '5 hours ago',
    },
  ];

  const enquiriesList = (guests && guests.length > 0 ? guests.slice(0, 6) : recentEnquiries).map((g, idx) => {
    const tags = [
      { tag: 'BOOKINGS', tagColor: '#1E2B37' },
      { tag: 'AMENITIES', tagColor: '#2563EB' },
      { tag: 'PAYMENTS', tagColor: '#1E2B37' },
      { tag: 'CHECKOUT', tagColor: '#2563EB' },
      { tag: 'RESERVATION', tagColor: '#C5A059' },
      { tag: 'CANCELLATION', tagColor: '#DC2626' },
    ];
    const tagInfo = tags[idx % tags.length];
    const msgInfo = sampleMessages[idx % sampleMessages.length];
    return {
      id: g.id || idx + 1,
      name: g.fullName || g.name || 'Hotel Guest',
      email: g.email || 'guest@x.dummyjson.com',
      mobile: g.mobile || '+1 555 019 9999',
      avatar: g.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      tag: g.tag || tagInfo.tag,
      tagColor: g.tagColor || tagInfo.tagColor,
      subject: msgInfo.subject,
      message: msgInfo.message,
      time: msgInfo.time,
    };
  });

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) {
      toast.warning('Please enter a response message before sending.');
      return;
    }
    toast.success(`Official response sent to ${selectedEnquiry.name} (${selectedEnquiry.email})!`);
    setReplyText('');
    setSelectedEnquiry(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* 1. Recent Enquiries Card (5 cols) - Compact & Sleek */}
      <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Recent Enquiries</h3>
            <p className="text-[10px] text-slate-400 font-medium">Guest messages & booking requests</p>
          </div>
          <Link
            to="/communication"
            className="text-[10px] font-bold text-[#C5A059] hover:underline flex items-center space-x-0.5"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Compact List of Enquiries */}
        <div className="grid grid-cols-2 gap-2.5 my-auto">
          {enquiriesList.map((enq) => (
            <div
              key={enq.id}
              onClick={() => setSelectedEnquiry(enq)}
              className="bg-slate-50/80 border border-slate-200/70 hover:border-amber-300 hover:bg-[#F7F2E7]/80 p-2.5 rounded-lg flex items-center space-x-2.5 transition-all duration-150 cursor-pointer shadow-2xs group"
              title={`Click to view and reply to enquiry from ${enq.name}`}
            >
              {/* Avatar */}
              <img
                src={enq.avatar}
                alt={enq.name}
                className="w-9 h-9 rounded-full object-cover border border-white shadow-2xs shrink-0 group-hover:scale-105 transition-transform"
              />

              {/* Info: Name & Tag */}
              <div className="min-w-0 flex-1 space-y-0.5">
                <span className="font-['Poppins'] text-xs font-bold text-[#1E2B37] leading-tight truncate block group-hover:text-[#C5A059]">
                  {enq.name}
                </span>
                <span
                  className="inline-block text-[8px] font-extrabold px-1.5 py-0.2 rounded text-white tracking-wider uppercase shadow-2xs"
                  style={{ backgroundColor: enq.tagColor }}
                >
                  {enq.tag}
                </span>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:text-[#C5A059] transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Booking Status Area Chart Card (7 cols) - Compact & Sleek */}
      <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
        {/* Header Bar with Filter */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Booking Status</h3>
            <p className="text-[10px] text-slate-400 font-medium">Monthly booking vs enquiry comparison</p>
          </div>
          <button className="flex items-center space-x-1 text-[10px] font-bold text-[#1E2B37] bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full border border-slate-200 transition-colors cursor-pointer">
            <span>Jan - Oct</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>
        </div>

        {/* Quick Performance Indicators */}
        <div className="flex items-center space-x-6 px-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded bg-[#C5A059] shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block leading-tight">Total Bookings</span>
              <span className="font-['Poppins'] text-xs font-extrabold text-[#1E2B37]">580</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 border-l border-slate-200 pl-6">
            <span className="w-2.5 h-2.5 rounded bg-[#1E2B37] shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block leading-tight">Total Enquiries</span>
              <span className="font-['Poppins'] text-xs font-extrabold text-[#1E2B37]">510</span>
            </div>
          </div>
        </div>

        {/* Compact Multi-Area Chart */}
        <div className="h-44 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={bookingStatusChartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="grandHorizonGoldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C5A059" stopOpacity={0.85} />
                  <stop offset="95%" stopColor="#C5A059" stopOpacity={0.15} />
                </linearGradient>
                <linearGradient id="grandHorizonNavyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E2B37" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#1E2B37" stopOpacity={0.25} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '10px',
                  fontSize: '11px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
              <Area type="monotone" dataKey="Bookings" stroke="#C5A059" strokeWidth={2} fillOpacity={1} fill="url(#grandHorizonGoldGrad)" />
              <Area type="monotone" dataKey="Enquiries" stroke="#1E2B37" strokeWidth={2} fillOpacity={1} fill="url(#grandHorizonNavyGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Compact Legend Footer */}
        <div className="flex items-center justify-center space-x-6 text-[11px] text-slate-500 pt-1.5 border-t border-slate-100">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded bg-[#C5A059]" />
            <span className="font-semibold text-slate-700">Bookings (53%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded bg-[#1E2B37]" />
            <span className="font-semibold text-slate-700">Enquiries (47%)</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE GUEST ENQUIRY MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span
                  className="inline-block text-[9px] font-extrabold px-2 py-0.5 rounded text-white tracking-wider uppercase"
                  style={{ backgroundColor: selectedEnquiry.tagColor }}
                >
                  {selectedEnquiry.tag}
                </span>
                <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                  Guest Enquiry Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Guest Profile Summary */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <img
                  src={selectedEnquiry.avatar}
                  alt={selectedEnquiry.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#C5A059] shrink-0 shadow-2xs"
                />
                <div className="min-w-0">
                  <h4 className="font-['Poppins'] text-sm font-extrabold text-[#1E2B37]">
                    {selectedEnquiry.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono truncate">
                    {selectedEnquiry.email} • {selectedEnquiry.mobile}
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono shrink-0">{selectedEnquiry.time}</span>
            </div>

            {/* Subject & Message Content */}
            <div className="space-y-2 bg-[#F7F2E7]/60 p-4 rounded-xl border border-[#C5A059]/30 text-xs">
              <div className="flex items-center space-x-1.5 text-[#1E2B37] font-bold">
                <MessageSquare className="w-4 h-4 text-[#C5A059]" />
                <span className="text-sm font-['Poppins']">{selectedEnquiry.subject}</span>
              </div>
              <p className="text-slate-700 leading-relaxed pt-1.5 border-t border-[#C5A059]/20 font-medium">
                "{selectedEnquiry.message}"
              </p>
            </div>

            {/* Reply Form */}
            <form onSubmit={handleSendReply} className="space-y-3 pt-1">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Send Official Response to Guest
                </label>
                <textarea
                  rows={3}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Write official resort response for ${selectedEnquiry.name}...`}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059] font-medium"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Response</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedEnquiry(null);
                    navigate('/reservations');
                  }}
                  className="py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1E2B37] text-xs font-bold border border-slate-200 transition-all flex items-center space-x-1 cursor-pointer"
                  title="Create a reservation for this guest"
                >
                  <CalendarCheck className="w-3.5 h-3.5 text-[#1E2B37]" />
                  <span>Book Room</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
