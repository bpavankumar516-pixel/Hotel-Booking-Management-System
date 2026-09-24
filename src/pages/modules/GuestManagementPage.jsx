import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../../contexts/HotelContext';
import { toast } from 'react-toastify';
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Globe,
  UserCheck,
  LogOut,
  CheckCircle2,
  Clock,
  LayoutGrid,
  List,
  Filter,
  RefreshCw,
  CalendarCheck,
} from 'lucide-react';
import { SkeletonStatCard, SkeletonTable } from '../../components/common/Skeleton';

export const GuestManagementPage = () => {
  const navigate = useNavigate();
  const { guests, reservations, addGuest, updateGuest, deleteGuest, reloadDummyGuests } = useHotel();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [activeModal, setActiveModal] = useState(null); // 'add' | 'edit' | 'details'
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [guestForm, setGuestForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    idProof: '',
    nationality: 'American',
    address: '',
    status: 'Checked-In',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  });

  // Filter Guests
  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.mobile.includes(searchQuery) ||
      g.idProof.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.nationality.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'All' || g.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage) || 1;
  const paginatedGuests = filteredGuests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers using HotelContext
  const handleAddSubmit = (e) => {
    e.preventDefault();
    addGuest({
      ...guestForm,
      avatar: guestForm.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    });
    setActiveModal(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateGuest({
      ...selectedGuest,
      ...guestForm,
    });
    setActiveModal(null);
  };

  const handleDelete = (id, name) => {
    deleteGuest(id, name);
  };

  const openEdit = (g) => {
    setSelectedGuest(g);
    setGuestForm({ ...g });
    setActiveModal('edit');
  };

  const openDetails = (g) => {
    navigate(`/guests/${g.id}`);
  };

  // Compute linked reservations for selected guest
  const getGuestStayHistory = (guestName) => {
    if (!guestName) return [];
    return reservations.filter(
      (r) => r.guestName.toLowerCase().trim() === guestName.toLowerCase().trim()
    );
  };

  // KPIs
  const totalCount = guests.length;
  const checkedInCount = guests.filter((g) => g.status === 'Checked-In').length;
  const activeCount = guests.filter((g) => g.status === 'Active').length;
  const checkedOutCount = guests.filter((g) => g.status === 'Checked-Out').length;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Module Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">
            Guest Directory & Management
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Hotel guest identity records, contact details, ID proof verification, and linked reservation histories.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={() => reloadDummyGuests(true)}
            className="py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1E2B37] text-xs font-bold border border-slate-200 shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Reload 30 guest profiles from DummyJSON API"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            <span>Sync DummyJSON Users</span>
          </button>

          <button
            onClick={() => {
              setGuestForm({
                fullName: '',
                email: '',
                mobile: '',
                idProof: `PASSPORT-${Math.floor(100000 + Math.random() * 900000)}`,
                nationality: 'American',
                address: '',
                status: 'Checked-In',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
              });
              setActiveModal('add');
            }}
            className="py-2.5 px-4 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Guest</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-[#1E2B37] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Total Directory</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{totalCount}</span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">Registered Profiles</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Checked-In</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{checkedInCount}</span>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">Currently In-House</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Active Upcoming</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{activeCount}</span>
            <span className="text-[11px] text-blue-600 font-semibold block mt-0.5">Upcoming Reservation</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
            <LogOut className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Checked-Out</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{checkedOutCount}</span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">Completed Stays</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by full name, email, mobile, ID proof, address, or nationality..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          />
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Filters & View Switcher */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center space-x-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] font-semibold focus:outline-none focus:border-[#C5A059]"
            >
              <option value="All">All Guest Statuses</option>
              <option value="Checked-In">Checked-In</option>
              <option value="Active">Active (Upcoming)</option>
              <option value="Checked-Out">Checked-Out</option>
            </select>
          </div>

          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-[#1E2B37] shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-[#1E2B37] shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredGuests.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200/80 space-y-3">
          <Users className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-['Poppins'] text-base font-bold text-[#1E2B37]">No guest records found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search query or status filter.</p>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Guest Full Name</th>
                  <th className="py-3.5 px-4">Email Address</th>
                  <th className="py-3.5 px-4">Mobile Number</th>
                  <th className="py-3.5 px-4">ID Proof Number (Passport / DL)</th>
                  <th className="py-3.5 px-4">Nationality</th>
                  <th className="py-3.5 px-4">Guest Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
                {paginatedGuests.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={g.avatar}
                          alt={g.fullName}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0 shadow-xs"
                        />
                        <div>
                          <span className="font-['Poppins'] font-bold text-sm block">{g.fullName}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{g.email}</td>
                    <td className="py-3.5 px-4 font-mono text-[#2563EB] font-semibold">{g.mobile}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-700 font-medium">{g.idProof}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{g.nationality}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          g.status === 'Checked-In'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : g.status === 'Active'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {g.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => openDetails(g)}
                        title="View Guest Record & Reservation History"
                        className="p-1.5 text-slate-600 hover:text-[#C5A059] hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEdit(g)}
                        title="Edit Guest"
                        className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(g.id, g.fullName)}
                        title="Delete Guest"
                        className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedGuests.map((g) => (
            <div key={g.id} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4 hover:shadow-md transition-shadow relative">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img src={g.avatar} alt={g.fullName} className="w-12 h-12 rounded-full object-cover border-2 border-[#C5A059]/40 shadow-xs" />
                  <div>
                    <h4 className="font-['Poppins'] font-extrabold text-sm text-[#1E2B37] leading-snug">{g.fullName}</h4>
                    <span className="text-[11px] text-slate-400 block">{g.nationality}</span>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    g.status === 'Checked-In'
                      ? 'bg-emerald-100 text-emerald-800'
                      : g.status === 'Active'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {g.status}
                </span>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <p className="flex items-center text-slate-500 truncate">
                  <Mail className="w-3.5 h-3.5 mr-2 text-slate-400 shrink-0" />
                  <span className="truncate">{g.email}</span>
                </p>
                <p className="flex items-center font-mono text-[#2563EB]">
                  <Phone className="w-3.5 h-3.5 mr-2 text-slate-400 shrink-0" />
                  <span>{g.mobile}</span>
                </p>
                <p className="flex items-center text-slate-500 truncate">
                  <MapPin className="w-3.5 h-3.5 mr-2 text-slate-400 shrink-0" />
                  <span className="truncate">{g.address}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 font-bold">{g.idProof}</span>
                <div className="flex items-center space-x-1">
                  <button onClick={() => openDetails(g)} className="p-1.5 text-slate-600 hover:text-[#C5A059] rounded cursor-pointer">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => openEdit(g)} className="p-1.5 text-slate-600 hover:text-blue-600 rounded cursor-pointer">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(g.id, g.fullName)} className="p-1.5 text-slate-600 hover:text-rose-600 rounded cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/80 text-xs text-slate-500 font-medium">
          <span>
            Showing page <strong className="text-[#1E2B37] font-bold">{currentPage}</strong> of <strong className="text-[#1E2B37] font-bold">{totalPages}</strong> ({filteredGuests.length} guests)
          </span>
          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MODAL WINDOWS */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37] flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#C5A059]" />
                <span>
                  {activeModal === 'add' && 'Create New Guest Record'}
                  {activeModal === 'edit' && `Edit Profile — ${selectedGuest?.fullName}`}
                  {activeModal === 'details' && `Guest Identity & Linked Stays — ${selectedGuest?.fullName}`}
                </span>
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeModal === 'details' ? (
              <div className="space-y-4 text-xs">
                {/* Profile Overview */}
                <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <img
                    src={selectedGuest?.avatar}
                    alt={selectedGuest?.fullName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#C5A059] shadow-md"
                  />
                  <div className="space-y-1">
                    <h4 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">{selectedGuest?.fullName}</h4>
                    <p className="text-[#2563EB] font-mono font-semibold">{selectedGuest?.mobile}</p>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        selectedGuest?.status === 'Checked-In'
                          ? 'bg-emerald-100 text-emerald-800'
                          : selectedGuest?.status === 'Active'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Status: {selectedGuest?.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Email Address</span>
                    <p className="font-medium text-slate-700 truncate">{selectedGuest?.email}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">ID Proof Number</span>
                    <p className="font-mono font-bold text-[#1E2B37]">{selectedGuest?.idProof}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Nationality</span>
                    <p className="font-semibold text-slate-700">{selectedGuest?.nationality}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Current Status</span>
                    <p className="font-bold text-emerald-600">{selectedGuest?.status}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Residential Address</span>
                    <p className="font-medium text-slate-700">{selectedGuest?.address}</p>
                  </div>
                </div>

                {/* Linked Stay History */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h5 className="font-['Poppins'] font-extrabold text-slate-800 text-xs flex items-center space-x-1.5">
                    <CalendarCheck className="w-4 h-4 text-[#C5A059]" />
                    <span>Linked Reservation History ({getGuestStayHistory(selectedGuest?.fullName).length})</span>
                  </h5>

                  {getGuestStayHistory(selectedGuest?.fullName).length === 0 ? (
                    <p className="text-[11px] text-slate-400 italic">No past or active stay bookings recorded.</p>
                  ) : (
                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                      {getGuestStayHistory(selectedGuest?.fullName).map((stay) => (
                        <div key={stay.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex justify-between items-center text-[11px]">
                          <div>
                            <span className="font-mono font-bold text-[#C5A059] block">{stay.id}</span>
                            <span className="font-bold text-[#1E2B37] block">{stay.roomNumber} ({stay.roomType})</span>
                            <span className="text-slate-400">{stay.checkIn} → {stay.checkOut}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-mono font-extrabold text-emerald-600 block">${stay.totalAmount}</span>
                            <span className="text-[10px] font-bold uppercase text-slate-500">{stay.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 rounded-lg bg-[#1E2B37] hover:bg-slate-800 text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  Close Profile View
                </button>
              </div>
            ) : (
              <form onSubmit={activeModal === 'add' ? handleAddSubmit : handleEditSubmit} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-600 font-bold block mb-1">Guest Full Name</label>
                  <input
                    type="text"
                    required
                    value={guestForm.fullName}
                    onChange={(e) => setGuestForm({ ...guestForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
                    placeholder="e.g. Emily Johnson"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-600 font-bold block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={guestForm.email}
                      onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
                      placeholder="emily.johnson@x.dummyjson.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 font-bold block mb-1">Mobile Number</label>
                    <input
                      type="text"
                      required
                      value={guestForm.mobile}
                      onChange={(e) => setGuestForm({ ...guestForm, mobile: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
                      placeholder="+1 555 019 2831"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-600 font-bold block mb-1">ID Proof Number (Passport / DL)</label>
                    <input
                      type="text"
                      required
                      value={guestForm.idProof}
                      onChange={(e) => setGuestForm({ ...guestForm, idProof: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
                      placeholder="e.g. PASSPORT-902188"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 font-bold block mb-1">Nationality</label>
                    <input
                      type="text"
                      required
                      value={guestForm.nationality}
                      onChange={(e) => setGuestForm({ ...guestForm, nationality: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
                      placeholder="e.g. American"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-600 font-bold block mb-1">Guest Status</label>
                  <select
                    value={guestForm.status}
                    onChange={(e) => setGuestForm({ ...guestForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] font-semibold focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Active">Active (Upcoming)</option>
                    <option value="Checked-In">Checked-In</option>
                    <option value="Checked-Out">Checked-Out</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-600 font-bold block mb-1">Residential Address</label>
                  <input
                    type="text"
                    required
                    value={guestForm.address}
                    onChange={(e) => setGuestForm({ ...guestForm, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
                    placeholder="Full Residential Address"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-white font-bold text-xs cursor-pointer shadow-md transition-all mt-2"
                >
                  Save Guest Profile
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
