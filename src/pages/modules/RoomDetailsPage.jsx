import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useHotel } from '../../contexts/HotelContext';
import { toast } from 'react-toastify';
import {
  ArrowLeft,
  BedDouble,
  Users,
  Building,
  DollarSign,
  CheckCircle2,
  Clock,
  Wifi,
  Tv,
  Coffee,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  Edit,
  Trash2,
  Plus,
  Compass,
  Maximize2,
  Sun,
  Flame,
  Award,
  Thermometer,
  Wind,
  Volume2,
  Share2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Key,
} from 'lucide-react';

export const RoomDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms, reservations, updateRoomStatus, deleteRoom } = useHotel();

  // Find target room by ID or Room Number
  const room = rooms.find(
    (r) => String(r.id) === String(id) || r.number.replace('# No.', '').trim() === String(id).trim()
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'policies' | 'calculator' | 'history'

  // Interactive Stay Calculator State
  const [calculatorNights, setCalculatorNights] = useState(3);
  const [calculatorGuests, setCalculatorGuests] = useState('2 Adults');

  if (!room) {
    return (
      <div className="max-w-[1200px] mx-auto p-12 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#1E2B37]">Room Not Found</h2>
        <p className="text-slate-500 text-sm">The room record you requested does not exist or has been removed.</p>
        <button
          onClick={() => navigate('/rooms')}
          className="px-5 py-2.5 bg-[#C5A059] text-white font-bold rounded-xl text-xs hover:bg-[#b08d48] cursor-pointer shadow-sm"
        >
          Back to Rooms Directory
        </button>
      </div>
    );
  }

  // Linked reservations for this specific room
  const roomReservations = reservations.filter(
    (r) => r.roomNumber.toLowerCase().trim() === room.number.toLowerCase().trim()
  );

  // Gallery Images Array (Hero + Fallback Angles)
  const roomGallery = [
    room.image,
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800',
  ];

  // Room Advantages / Highlights List
  const roomAdvantages = [
    { title: 'Panoramic Ocean Sunset View', desc: 'Unobstructed 180° view of the resort coastline and horizon.', icon: Sun },
    { title: '24/7 Dedicated Concierge', desc: 'Personal butler service for reservations, dining & laundry.', icon: Award },
    { title: 'Private Spa & Jacuzzi', desc: 'Italian marble bathroom equipped with hydrotherapy Jacuzzi tub.', icon: Sparkles },
    { title: 'Soundproof Double Glazing', desc: 'Acoustic soundproofing rating 55dB for quiet sleep.', icon: ShieldCheck },
    { title: '500 Mbps Fiber WiFi', desc: 'Ultra-fast dedicated wireless internet for seamless streaming.', icon: Wifi },
    { title: 'Smart Room Automation', desc: 'Touch control panel for lighting, curtains & multi-zone AC.', icon: Compass },
  ];

  // Split Amenities
  const amenitiesList = room.amenities
    ? room.amenities.split(',').map((a) => a.trim())
    : ['Free WiFi', 'Smart TV', 'Air Conditioner', 'Mini Bar', 'Ocean View', 'Jacuzzi'];

  const handleStatusUpdate = (newStatus) => {
    updateRoomStatus(room.id, newStatus);
    toast.success(`Room ${room.number} status updated to "${newStatus}".`);
  };

  const handleDeleteRoom = () => {
    if (window.confirm(`Are you sure you want to delete Room ${room.number}?`)) {
      deleteRoom(room.id, room.number);
      navigate('/rooms');
    }
  };

  const handleShareRoom = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info(`Room ${room.number} link copied to clipboard!`);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* Top Header & Breadcrumbs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/rooms')}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer shadow-2xs"
            title="Back to Rooms Directory"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase">
                {room.status}
              </span>
              <span className="text-xs font-mono text-[#C5A059] font-bold">{room.number}</span>
            </div>
            <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37] mt-0.5">
              {room.type} Details & Management
            </h2>
          </div>
        </div>

        {/* User-Friendly Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleShareRoom}
            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1E2B37] text-xs font-bold border border-slate-200 transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
            title="Share Room Details"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={() => navigate('/reservations')}
            className="py-2.5 px-4 rounded-xl bg-[#C5A059] hover:bg-[#b08d48] text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book Reservation</span>
          </button>

          <button
            onClick={handleDeleteRoom}
            className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-all flex items-center space-x-1 cursor-pointer"
            title="Delete Room Record"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center space-x-2 border-b border-slate-200/80 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#1E2B37] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Overview & Gallery
        </button>
        <button
          onClick={() => setActiveTab('policies')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'policies'
              ? 'bg-[#1E2B37] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Check-In Rules & Policies
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'calculator'
              ? 'bg-[#1E2B37] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Stay Cost Estimator
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-[#1E2B37] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Stay History ({roomReservations.length})
        </button>
      </div>

      {/* TAB CONTENT: Overview & Gallery */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Image Gallery & Highlights (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Interactive Hero Gallery Showcase */}
              <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs p-4 space-y-3">
                <div className="relative h-[380px] md:h-[440px] rounded-xl overflow-hidden bg-slate-900 group">
                  <img
                    src={roomGallery[activeImageIndex]}
                    alt={room.type}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => setIsLightboxOpen(true)}
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white font-mono text-xs font-bold shadow-md">
                    {room.number}
                  </div>

                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md p-2 rounded-full border border-white/20 text-white hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
                    title="Expand Fullscreen Gallery"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-4 rounded-xl text-white flex items-end justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#C5A059] block">
                        Luxury Suite Catalog
                      </span>
                      <h3 className="font-['Poppins'] text-2xl font-extrabold leading-tight">{room.type}</h3>
                    </div>
                    <span className="text-xs font-bold bg-[#C5A059] text-white px-3 py-1 rounded-lg shadow-2xs">
                      Click Image to Expand
                    </span>
                  </div>
                </div>

                {/* Thumbnail Selectors */}
                <div className="grid grid-cols-4 gap-2.5">
                  {roomGallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-[#C5A059] shadow-md scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Room Key Advantages */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                    Key Room Advantages & Luxury Features
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Premium guest inclusions and high-end structural features offered by this suite.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  {roomAdvantages.map((adv, i) => {
                    const IconComp = adv.icon;
                    return (
                      <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start space-x-3 hover:bg-slate-100/60 transition-colors">
                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[#C5A059] shrink-0 shadow-2xs">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-['Poppins'] text-xs font-bold text-[#1E2B37]">{adv.title}</h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">{adv.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Pricing, Specs, Amenities, History & Climate (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Room Pricing & Status Management Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex justify-between items-baseline pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Price Per Night</span>
                    <div className="flex items-baseline space-x-1">
                      <span className="font-mono text-3xl font-extrabold text-emerald-600">${room.price}</span>
                      <span className="text-xs text-slate-500 font-medium">/ USD night</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Floor Location</span>
                    <span className="font-mono text-lg font-bold text-[#1E2B37]">Floor {room.floor}</span>
                  </div>
                </div>

                {/* Specification Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Guest Capacity</span>
                    <span className="font-bold text-[#1E2B37] text-sm mt-0.5 block">{room.capacity} Guests</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Bed Setup</span>
                    <span className="font-bold text-[#1E2B37] text-sm mt-0.5 block">Master King Bed</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Room Dimension</span>
                    <span className="font-bold text-[#1E2B37] text-sm mt-0.5 block">1,150 sq ft / 106 m²</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Housekeeping</span>
                    <span className="font-bold text-emerald-600 text-sm mt-0.5 block">Sanitized Ready</span>
                  </div>
                </div>

                {/* Room Description */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <h4 className="font-['Poppins'] text-xs font-bold text-[#1E2B37]">Suite Description</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {room.description ||
                      'Ultra-luxurious suite featuring panoramic views, plush custom bedding, spa bath amenities, private balcony, and 24/7 dedicated room service.'}
                  </p>
                </div>

                {/* Status Change Selector */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <label className="text-xs font-bold text-slate-600 block">Manage Availability Status</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleStatusUpdate('Available')}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        room.status === 'Available'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Available
                    </button>
                    <button
                      onClick={() => handleStatusUpdate('Occupied')}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        room.status === 'Occupied'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Occupied
                    </button>
                    <button
                      onClick={() => handleStatusUpdate('Maintenance')}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        room.status === 'Maintenance'
                          ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Maintenance
                    </button>
                  </div>
                </div>
              </div>

              {/* Included Room Amenities Grid */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-3">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">Included Room Amenities</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Key room inclusions and services</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {amenitiesList.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-amber-50/80 text-[#1E2B37] text-xs font-semibold border border-amber-200/60 flex items-center space-x-1.5 shadow-2xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{amenity}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Room Stay History Grid Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                      Room Stay History & Bookings
                    </h3>
                    <p className="text-xs text-slate-400">All guest reservations linked to {room.number}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#C5A059] bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    {roomReservations.length} {roomReservations.length === 1 ? 'Stay' : 'Stays'}
                  </span>
                </div>

                {roomReservations.length === 0 ? (
                  <div className="p-6 text-center space-y-2 bg-slate-50 rounded-xl border border-slate-200">
                    <CalendarCheck className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs text-slate-500 font-medium">No active or historical reservations for this room.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {roomReservations.map((res) => (
                      <div
                        key={res.id}
                        className="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 transition-all space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-[#C5A059] block">{res.id}</span>
                            <h4 className="font-['Poppins'] text-xs font-bold text-[#1E2B37]">{res.guestName}</h4>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase shrink-0 ${
                              res.status === 'Confirmed'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : res.status === 'Checked-In'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : res.status === 'Completed'
                                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                : 'bg-rose-100 text-rose-800 border border-rose-300'
                            }`}
                          >
                            {res.status}
                          </span>
                        </div>

                        <div className="space-y-1 text-[11px] text-slate-600 font-medium">
                          <div className="flex items-center justify-between text-slate-500">
                            <span>Dates:</span>
                            <span className="font-mono font-bold text-[#1E2B37]">
                              {res.checkIn} → {res.checkOut}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                            <span className="font-bold text-slate-700">Folio Total:</span>
                            <span className="font-mono font-extrabold text-emerald-600">${res.totalAmount}</span>
                          </div>
                        </div>

                        <Link
                          to={`/reservations/${res.id}`}
                          className="w-full py-1.5 text-center bg-white hover:bg-[#1E2B37] hover:text-white text-[#1E2B37] text-[11px] font-bold rounded-lg border border-slate-200 transition-colors block shadow-2xs"
                        >
                          View Full Folio
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Real-Time Suite Environmental Metrics Widget */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-3">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                    Live Room Climate & Environmental Status
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Real-time suite IoT sensors & acoustics</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-center">
                    <Thermometer className="w-5 h-5 text-[#C5A059] mx-auto mb-1" />
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Temperature</span>
                    <span className="font-mono font-extrabold text-[#1E2B37] text-sm">22°C / 71°F</span>
                  </div>
                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-center">
                    <Wind className="w-5 h-5 text-[#C5A059] mx-auto mb-1" />
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Air Quality</span>
                    <span className="font-mono font-extrabold text-emerald-600 text-sm">AQI 12 (Pure)</span>
                  </div>
                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-center">
                    <Volume2 className="w-5 h-5 text-[#C5A059] mx-auto mb-1" />
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Acoustics</span>
                    <span className="font-mono font-extrabold text-[#1E2B37] text-sm">55 dB Quiet</span>
                  </div>
                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Sanitization</span>
                    <span className="font-bold text-emerald-600 text-xs">Inspected Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Check-In Rules & Policies */}
      {activeTab === 'policies' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Check-In / Check-Out Schedules & Suite Policies
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Official timing rules, express keyless entry, and house policies for {room.number}.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0 self-start sm:self-auto">
              Express Digital Key Enabled
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2.5">
              <div className="flex items-center space-x-2 text-[#C5A059]">
                <Clock className="w-4 h-4 shrink-0" />
                <span className="font-['Poppins'] text-xs font-bold text-[#1E2B37]">Check-In Schedule</span>
              </div>
              <div className="space-y-1.5 text-slate-600 font-medium">
                <div className="flex justify-between items-center">
                  <span>Standard Check-In:</span>
                  <strong className="font-mono text-[#1E2B37]">3:00 PM Onwards</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Early Express Arrival:</span>
                  <strong className="font-mono text-emerald-600">From 12:00 PM</strong>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-slate-200">
                  <span>Required ID Proof:</span>
                  <span className="font-semibold text-slate-700">Govt Photo ID / Passport</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2.5">
              <div className="flex items-center space-x-2 text-[#C5A059]">
                <Clock className="w-4 h-4 shrink-0" />
                <span className="font-['Poppins'] text-xs font-bold text-[#1E2B37]">Check-Out Schedule</span>
              </div>
              <div className="space-y-1.5 text-slate-600 font-medium">
                <div className="flex justify-between items-center">
                  <span>Standard Check-Out:</span>
                  <strong className="font-mono text-[#1E2B37]">Before 11:00 AM</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Late Departure:</span>
                  <strong className="font-mono text-blue-600">Up to 2:00 PM (VIP)</strong>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-slate-200">
                  <span>Folio Settlement:</span>
                  <span className="font-semibold text-slate-700">One-Tap Contactless</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/60 space-y-1">
              <span className="font-bold text-[#1E2B37] block">Smoking Policy</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                100% Non-smoking suite interior. Designated outdoor balcony seating provided.
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/60 space-y-1">
              <span className="font-bold text-[#1E2B37] block">Children & Occupancy</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Children up to 12 stay free. Extra rollaway crib available on request ($45/night).
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/60 space-y-1">
              <span className="font-bold text-[#1E2B37] block">Complimentary Inclusions</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Daily gourmet breakfast buffet, welcome tropical mocktails & evening turndown service.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Interactive Stay Cost Estimator */}
      {activeTab === 'calculator' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Calculator className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Interactive Stay Cost Estimator — {room.number}
              </h3>
              <p className="text-xs text-slate-500">
                Calculate total folio cost based on nights and guest occupancy before booking.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Form Controls */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Number of Nights</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 5, 7].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCalculatorNights(num)}
                      className={`px-3 py-2 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                        calculatorNights === num
                          ? 'bg-[#C5A059] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {num} {num === 1 ? 'Night' : 'Nights'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Occupants</label>
                <select
                  value={calculatorGuests}
                  onChange={(e) => setCalculatorGuests(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37]"
                >
                  <option value="1 Adult">1 Adult</option>
                  <option value="2 Adults">2 Adults</option>
                  <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                  <option value="3 Adults">3 Adults</option>
                </select>
              </div>
            </div>

            {/* Estimated Total Calculation Breakdown Card */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3 text-xs">
              <h4 className="font-['Poppins'] text-xs font-bold text-[#1E2B37] uppercase tracking-wider">
                Folio Cost Breakdown
              </h4>
              <div className="space-y-2 text-slate-600 border-b border-slate-200 pb-3">
                <div className="flex justify-between">
                  <span>Suite Daily Rate:</span>
                  <strong className="font-mono text-[#1E2B37]">${room.price} / night</strong>
                </div>
                <div className="flex justify-between">
                  <span>Selected Stay Duration:</span>
                  <strong className="font-mono text-[#1E2B37]">{calculatorNights} Nights</strong>
                </div>
                <div className="flex justify-between">
                  <span>Resort Fee & Taxes:</span>
                  <strong className="font-mono text-emerald-600">Included ($0.00)</strong>
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="font-extrabold text-sm text-[#1E2B37]">Estimated Total Cost:</span>
                <span className="font-mono text-2xl font-extrabold text-emerald-600">
                  ${calculatorNights * Number(room.price)} USD
                </span>
              </div>

              <button
                onClick={() => navigate('/reservations')}
                className="w-full py-3 rounded-xl bg-[#C5A059] hover:bg-[#b08d48] text-white font-bold text-xs cursor-pointer shadow-md transition-all mt-2 flex items-center justify-center space-x-1.5"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Proceed to Reserve Room</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Stay History */}
      {activeTab === 'history' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Historical & Active Room Stay Bookings
              </h3>
              <p className="text-xs text-slate-400">All guest reservations linked to {room.number}</p>
            </div>
            <span className="font-mono text-xs font-bold text-[#C5A059]">{roomReservations.length} Bookings</span>
          </div>

          {roomReservations.length === 0 ? (
            <div className="p-8 text-center space-y-2 bg-slate-50 rounded-xl border border-slate-200">
              <CalendarCheck className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">No active or historical reservations for this room.</p>
              <button
                onClick={() => navigate('/reservations')}
                className="mt-2 px-4 py-2 bg-[#C5A059] text-white text-xs font-bold rounded-xl hover:bg-[#b08d48] cursor-pointer"
              >
                Create First Reservation
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                    <th className="py-2.5 px-3">Booking ID</th>
                    <th className="py-2.5 px-3">Guest Name</th>
                    <th className="py-2.5 px-3">Stay Dates</th>
                    <th className="py-2.5 px-3">Total Folio</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
                  {roomReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#C5A059]">{res.id}</td>
                      <td className="py-3 px-3 font-bold text-[#1E2B37]">{res.guestName}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                        {res.checkIn} → {res.checkOut} ({res.nights} Nights)
                      </td>
                      <td className="py-3 px-3 font-mono font-extrabold text-emerald-600">${res.totalAmount}</td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            res.status === 'Confirmed'
                              ? 'bg-amber-100 text-amber-800'
                              : res.status === 'Checked-In'
                              ? 'bg-emerald-100 text-emerald-800'
                              : res.status === 'Completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* LIGHTBOX MODAL: High-Res Image Viewer */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() =>
              setActiveImageIndex((prev) => (prev === 0 ? roomGallery.length - 1 : prev - 1))
            }
            className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <img
            src={roomGallery[activeImageIndex]}
            alt={room.type}
            className="max-w-4xl max-h-[80vh] w-full object-contain rounded-2xl shadow-2xl border border-white/20"
          />

          <button
            onClick={() =>
              setActiveImageIndex((prev) => (prev === roomGallery.length - 1 ? 0 : prev + 1))
            }
            className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

