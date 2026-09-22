import React, { useState } from 'react';
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
} from 'lucide-react';

export const GuestManagementPage = () => {
  const [guests, setGuests] = useState([
    {
      id: 1,
      fullName: 'Mitchel Johnson',
      email: 'mitchel@example.com',
      mobile: '+99 256 896 8855',
      address: '742 Evergreen Terrace, Springfield',
      idProof: 'ID-PASSPORT-9021',
      nationality: 'American',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
    {
      id: 2,
      fullName: 'Robert Affleck',
      email: 'robert@example.com',
      mobile: '+81 569 854 8866',
      address: '45 Park Avenue, New York',
      idProof: 'ID-DRIVER-4421',
      nationality: 'Canadian',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    },
    {
      id: 3,
      fullName: 'Chris Hemsworth',
      email: 'chris@example.com',
      mobile: '+92 745 856 1144',
      address: '12 Beach Road, Sydney',
      idProof: 'ID-PASSPORT-8812',
      nationality: 'Australian',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    },
    {
      id: 4,
      fullName: 'Sarah Wilson',
      email: 'sarah@example.com',
      mobile: '+1 408 923 1188',
      address: '99 Sunset Blvd, Los Angeles',
      idProof: 'ID-[#881923]',
      nationality: 'British',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [activeModal, setActiveModal] = useState(null); // 'add' | 'edit' | 'details'
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [guestForm, setGuestForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    idProof: '',
    nationality: 'American',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  });

  const filteredGuests = guests.filter(
    (g) =>
      g.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.mobile.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage) || 1;
  const paginatedGuests = filteredGuests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newG = { id: Date.now(), ...guestForm };
    setGuests([newG, ...guests]);
    setActiveModal(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setGuests(guests.map((g) => (g.id === selectedGuest.id ? { ...selectedGuest, ...guestForm } : g)));
    setActiveModal(null);
  };

  const handleDelete = (id) => {
    setGuests(guests.filter((g) => g.id !== id));
  };

  const openEdit = (g) => {
    setSelectedGuest(g);
    setGuestForm({ ...g });
    setActiveModal('edit');
  };

  const openDetails = (g) => {
    setSelectedGuest(g);
    setActiveModal('details');
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-[#C5A059] text-white uppercase">
              Module 04
            </span>
            <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">Guest Management</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Maintain complete guest profile directory, verification proof, and contact information.
          </p>
        </div>

        <button
          onClick={() => {
            setGuestForm({
              fullName: '',
              email: '',
              mobile: '',
              address: '',
              idProof: `ID-PASSPORT-${Math.floor(1000 + Math.random() * 9000)}`,
              nationality: 'American',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
            });
            setActiveModal('add');
          }}
          className="py-2.5 px-4 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Guest</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by full name, email, or mobile..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          />
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Guests Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500">
                <th className="py-3 px-4">Guest Name</th>
                <th className="py-3 px-4">Mobile Number</th>
                <th className="py-3 px-4">ID Proof Number</th>
                <th className="py-3 px-4">Nationality</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
              {paginatedGuests.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={g.avatar} alt={g.fullName} className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0" />
                      <div>
                        <span className="font-['Poppins'] font-bold block">{g.fullName}</span>
                        <span className="text-[11px] text-slate-400 font-mono block">{g.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[#2563EB] font-semibold">{g.mobile}</td>
                  <td className="py-3 px-4 font-mono text-slate-600 font-medium">{g.idProof}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{g.nationality}</td>
                  <td className="py-3 px-4 text-right space-x-1">
                    <button onClick={() => openDetails(g)} title="View Profile" className="p-1.5 text-slate-600 hover:text-[#C5A059] rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => openEdit(g)} title="Edit Guest" className="p-1.5 text-slate-600 hover:text-blue-600 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(g.id)} title="Delete Guest" className="p-1.5 text-slate-600 hover:text-rose-600 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-500 font-medium">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex items-center space-x-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="p-1.5 rounded border border-slate-200 disabled:opacity-40">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="p-1.5 rounded border border-slate-200 disabled:opacity-40">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                {activeModal === 'add' && 'Add New Guest Profile'}
                {activeModal === 'edit' && `Edit Profile (${selectedGuest?.fullName})`}
                {activeModal === 'details' && `Guest Profile View (${selectedGuest?.fullName})`}
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeModal === 'details' ? (
              <div className="space-y-3 text-xs">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                  <img src={selectedGuest?.avatar} alt={selectedGuest?.fullName} className="w-12 h-12 rounded-full object-cover border border-slate-300" />
                  <div>
                    <h4 className="font-['Poppins'] text-sm font-extrabold text-[#1E2B37]">{selectedGuest?.fullName}</h4>
                    <p className="text-[#2563EB] font-mono">{selectedGuest?.mobile}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p><Mail className="w-3.5 h-3.5 inline mr-2 text-slate-400" />{selectedGuest?.email}</p>
                  <p><MapPin className="w-3.5 h-3.5 inline mr-2 text-slate-400" />{selectedGuest?.address}</p>
                  <p><CreditCard className="w-3.5 h-3.5 inline mr-2 text-slate-400" />{selectedGuest?.idProof}</p>
                  <p><Globe className="w-3.5 h-3.5 inline mr-2 text-slate-400" />{selectedGuest?.nationality}</p>
                </div>
                <button onClick={() => setActiveModal(null)} className="w-full py-2.5 rounded-lg bg-[#1E2B37] text-white font-bold text-xs">
                  Close Profile
                </button>
              </div>
            ) : (
              <form onSubmit={activeModal === 'add' ? handleAddSubmit : handleEditSubmit} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-500 font-semibold block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={guestForm.fullName}
                    onChange={(e) => setGuestForm({ ...guestForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 font-semibold block">Email</label>
                    <input
                      type="email"
                      required
                      value={guestForm.email}
                      onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-semibold block">Mobile Number</label>
                    <input
                      type="text"
                      required
                      value={guestForm.mobile}
                      onChange={(e) => setGuestForm({ ...guestForm, mobile: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 font-semibold block">ID Proof Number</label>
                    <input
                      type="text"
                      required
                      value={guestForm.idProof}
                      onChange={(e) => setGuestForm({ ...guestForm, idProof: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-semibold block">Nationality</label>
                    <input
                      type="text"
                      required
                      value={guestForm.nationality}
                      onChange={(e) => setGuestForm({ ...guestForm, nationality: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-500 font-semibold block">Address</label>
                  <input
                    type="text"
                    required
                    value={guestForm.address}
                    onChange={(e) => setGuestForm({ ...guestForm, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                  />
                </div>

                <button type="submit" className="w-full py-2.5 rounded-lg bg-[#C5A059] text-white font-bold text-xs hover:bg-[#b08d48]">
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
