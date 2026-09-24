import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../../contexts/HotelContext';
import { toast } from 'react-toastify';
import {
  BedDouble,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  CheckCircle2,
  Wrench,
  Building2,
  Sparkles,
} from 'lucide-react';
import { SkeletonActionCard } from '../../components/common/Skeleton';

export const RoomManagementPage = () => {
  const navigate = useNavigate();
  const { rooms, addRoom, updateRoom, deleteRoom, updateRoomStatus } = useHotel();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterAvailability, setFilterAvailability] = useState('All');
  const [sortBy, setSortBy] = useState('price-asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [activeModal, setActiveModal] = useState(null); // 'add' | 'edit' | 'details' | 'status'
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [roomForm, setRoomForm] = useState({
    number: '',
    type: 'Deluxe Suite',
    price: 140,
    capacity: 2,
    floor: 1,
    status: 'Available',
    amenities: 'Free WiFi, Smart TV, Air Conditioner, Mini Bar, Ocean View',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    description: '',
  });

  // Filtering & Sorting
  const filteredRooms = rooms
    .filter((room) => {
      const matchesSearch =
        room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (room.description && room.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        room.amenities.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === 'All' || room.type === filterType;
      const matchesAvail = filterAvailability === 'All' || room.status === filterAvailability;
      
      return matchesSearch && matchesType && matchesAvail;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'floor-asc') return a.floor - b.floor;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage) || 1;
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers using HotelContext
  const handleAddSubmit = (e) => {
    e.preventDefault();
    addRoom({
      ...roomForm,
      price: Number(roomForm.price),
      capacity: Number(roomForm.capacity),
      floor: Number(roomForm.floor),
      image: roomForm.image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    });
    setActiveModal(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateRoom({
      ...selectedRoom,
      ...roomForm,
      price: Number(roomForm.price),
      capacity: Number(roomForm.capacity),
      floor: Number(roomForm.floor),
    });
    setActiveModal(null);
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedRoom) return;
    updateRoomStatus(selectedRoom.id, newStatus);
    setActiveModal(null);
    toast.success(`Room ${selectedRoom.number} status updated to "${newStatus}"`);
  };

  const handleDelete = (id, number) => {
    deleteRoom(id, number);
  };

  const openEdit = (room) => {
    setSelectedRoom(room);
    setRoomForm({ ...room });
    setActiveModal('edit');
  };

  const openDetails = (room) => {
    navigate(`/rooms/${room.id}`);
  };

  const openStatusModal = (room) => {
    setSelectedRoom(room);
    setActiveModal('status');
  };

  // KPIs
  const totalRoomsCount = rooms.length;
  const availableCount = rooms.filter((r) => r.status === 'Available').length;
  const occupiedCount = rooms.filter((r) => r.status === 'Occupied').length;
  const maintenanceCount = rooms.filter((r) => r.status === 'Maintenance').length;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Module Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">
            Room & Suite Management
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage hotel rooms, suite categories, daily rates, capacity, amenities, and real-time availability status.
          </p>
        </div>

        <button
          onClick={() => {
            setRoomForm({
              number: `# No.${Math.floor(100 + Math.random() * 800)}`,
              type: 'Deluxe Suite',
              price: 140,
              capacity: 2,
              floor: 2,
              status: 'Available',
              amenities: 'Free High-speed WiFi, Smart TV, AC, Mini Bar, Ocean View',
              image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
              description: 'Luxury hotel suite equipped with modern amenities and scenic balcony view.',
            });
            setActiveModal('add');
          }}
          className="py-2.5 px-4 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Room</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-[#1E2B37] flex items-center justify-center shrink-0">
            <BedDouble className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Total Inventory</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{totalRoomsCount}</span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">All Floors Active</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Available</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{availableCount}</span>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">Ready for Guests</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Occupied</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{occupiedCount}</span>
            <span className="text-[11px] text-blue-600 font-semibold block mt-0.5">Checked-In Guests</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Maintenance</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">{maintenanceCount}</span>
            <span className="text-[11px] text-purple-600 font-semibold block mt-0.5">Cleaning / Repair</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search room number, type, description..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          />
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          {/* Room Type Filter */}
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] font-semibold focus:outline-none focus:border-[#C5A059]"
          >
            <option value="All">All Room Types</option>
            <option value="Deluxe Suite">Deluxe Suite</option>
            <option value="Executive Room">Executive Room</option>
            <option value="Standard Room">Standard Room</option>
            <option value="Presidential Suite">Presidential Suite</option>
          </select>

          {/* Availability Status Filter */}
          <select
            value={filterAvailability}
            onChange={(e) => {
              setFilterAvailability(e.target.value);
              setCurrentPage(1);
            }}
            className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] font-semibold focus:outline-none focus:border-[#C5A059]"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] font-semibold focus:outline-none focus:border-[#C5A059]"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="floor-asc">Floor No.</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-[#1E2B37] shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid Cards View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-[#1E2B37] shadow-xs' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Grid / Table */}
      {filteredRooms.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200/80 space-y-3">
          <BedDouble className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-['Poppins'] text-base font-bold text-[#1E2B37]">No rooms found matching search filters</h3>
          <p className="text-xs text-slate-500">Try adjusting room type or availability status options.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image & Badges */}
              <div
                onClick={() => navigate(`/rooms/${room.id}`)}
                className="relative h-52 w-full overflow-hidden bg-slate-900 cursor-pointer"
              >
                <img
                  src={room.image}
                  alt={room.number}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-black/30" />

                <div className="absolute top-3 left-3">
                  <span className="font-['Poppins'] text-xs font-extrabold px-3 py-1 rounded-full bg-[#1E2B37]/90 text-white backdrop-blur-xs border border-white/20">
                    {room.number}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => openStatusModal(room)}
                    className={`text-[10px] font-extrabold px-3 py-1 rounded-full backdrop-blur-md cursor-pointer transition-transform active:scale-95 border ${
                      room.status === 'Available'
                        ? 'bg-emerald-500/90 text-white border-emerald-300'
                        : room.status === 'Occupied'
                        ? 'bg-blue-600/90 text-white border-blue-300'
                        : 'bg-purple-600/90 text-white border-purple-300'
                    }`}
                  >
                    {room.status}
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950 block w-max uppercase tracking-wider mb-1">
                      {room.type}
                    </span>
                    <span className="text-[11px] text-slate-200 font-semibold">
                      Floor {room.floor} • Capacity: {room.capacity} Guests
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-['Poppins'] text-xl font-extrabold text-amber-300">${room.price}</span>
                    <span className="text-[10px] text-slate-300 block">/night</span>
                  </div>
                </div>
              </div>

              {/* Description & Highlighted Amenities */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 text-xs">
                <div className="space-y-2">
                  <p className="text-slate-600 font-medium line-clamp-2 leading-relaxed">
                    {room.description || 'Spacious luxury hotel suite equipped with world-class amenities.'}
                  </p>
                  
                  <div className="pt-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C5A059] block mb-1">
                      Featured Amenities
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {(room.amenities ? room.amenities.split(',') : ['Free WiFi', 'Ocean View', 'Smart TV']).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-50 text-[#1E2B37] border border-amber-200/80 flex items-center space-x-1 shadow-2xs"
                        >
                          <Sparkles className="w-2.5 h-2.5 text-[#C5A059] shrink-0" />
                          <span>{amenity.trim()}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500">
                  <span className="text-[11px] font-semibold text-slate-400">Floor No. {room.floor}</span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => openDetails(room)}
                      className="p-1.5 text-slate-600 hover:text-[#C5A059] hover:bg-amber-50 rounded-lg cursor-pointer transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openEdit(room)}
                      className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                      title="Edit Room"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(room.id, room.number)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                      title="Delete Room"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Room Number & Image</th>
                  <th className="py-3.5 px-4">Room Type</th>
                  <th className="py-3.5 px-4">Floor No.</th>
                  <th className="py-3.5 px-4">Capacity</th>
                  <th className="py-3.5 px-4">Price / Night ($)</th>
                  <th className="py-3.5 px-4">Availability Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
                {paginatedRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 cursor-pointer" onClick={() => navigate(`/rooms/${room.id}`)}>
                      <div className="flex items-center space-x-3">
                        <img src={room.image} alt={room.number} className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0" />
                        <div>
                          <span className="font-['Poppins'] font-bold text-sm block hover:text-[#C5A059] transition-colors">{room.number}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{room.type}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">Floor {room.floor}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{room.capacity} Guests</td>
                    <td className="py-3.5 px-4 font-mono font-extrabold text-[#C5A059]">${room.price}/night</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          room.status === 'Available'
                            ? 'bg-emerald-100 text-emerald-800'
                            : room.status === 'Occupied'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {room.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button onClick={() => openDetails(room)} className="p-1.5 text-slate-600 hover:text-[#C5A059] rounded cursor-pointer">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => openEdit(room)} className="p-1.5 text-slate-600 hover:text-blue-600 rounded cursor-pointer">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(room.id, room.number)} className="p-1.5 text-slate-600 hover:text-rose-600 rounded cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/80 text-xs text-slate-500 font-medium">
          <span>
            Showing page <strong className="text-[#1E2B37] font-bold">{currentPage}</strong> of <strong className="text-[#1E2B37] font-bold">{totalPages}</strong> ({filteredRooms.length} rooms)
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
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                {activeModal === 'add' && 'Add New Room'}
                {activeModal === 'edit' && `Edit Room — ${selectedRoom?.number}`}
                {activeModal === 'details' && `Room Details — ${selectedRoom?.number}`}
                {activeModal === 'status' && `Change Status — ${selectedRoom?.number}`}
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeModal === 'status' ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-medium">Select availability status for room {selectedRoom?.number}:</p>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  {['Available', 'Occupied', 'Maintenance'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(st)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedRoom?.status === st
                          ? 'border-[#C5A059] bg-amber-50 text-[#C5A059]'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            ) : activeModal === 'details' ? (
              <div className="space-y-3 text-xs">
                <img src={selectedRoom?.image} alt={selectedRoom?.number} className="w-full h-44 object-cover rounded-xl border border-slate-200" />
                <div className="flex justify-between items-center">
                  <h4 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">{selectedRoom?.number} ({selectedRoom?.type})</h4>
                  <span className="font-mono text-lg font-extrabold text-[#C5A059]">${selectedRoom?.price}/night</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5">
                  <p className="text-slate-700"><strong>Floor No.:</strong> {selectedRoom?.floor} | <strong>Capacity:</strong> {selectedRoom?.capacity} Guests</p>
                  <p className="text-slate-700"><strong>Availability Status:</strong> <span className="font-bold text-emerald-600">{selectedRoom?.status}</span></p>
                  <p className="text-slate-700"><strong>Amenities:</strong> {selectedRoom?.amenities}</p>
                  <p className="text-slate-600 pt-1 border-t border-slate-200"><strong>Description:</strong> {selectedRoom?.description || 'N/A'}</p>
                </div>
                <button onClick={() => setActiveModal(null)} className="w-full py-2.5 rounded-lg bg-[#1E2B37] text-white font-bold cursor-pointer">
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={activeModal === 'add' ? handleAddSubmit : handleEditSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Room Number</label>
                    <input
                      type="text"
                      required
                      value={roomForm.number}
                      onChange={(e) => setRoomForm({ ...roomForm, number: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[#1E2B37]"
                      placeholder="e.g. # No.101"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Room Type</label>
                    <select
                      value={roomForm.type}
                      onChange={(e) => setRoomForm({ ...roomForm, type: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-[#1E2B37]"
                    >
                      <option value="Deluxe Suite">Deluxe Suite</option>
                      <option value="Executive Room">Executive Room</option>
                      <option value="Standard Room">Standard Room</option>
                      <option value="Presidential Suite">Presidential Suite</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Price / Night ($)</label>
                    <input
                      type="number"
                      required
                      value={roomForm.price}
                      onChange={(e) => setRoomForm({ ...roomForm, price: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[#1E2B37]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Capacity (Guests)</label>
                    <input
                      type="number"
                      required
                      value={roomForm.capacity}
                      onChange={(e) => setRoomForm({ ...roomForm, capacity: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[#1E2B37]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Floor No.</label>
                    <input
                      type="number"
                      required
                      value={roomForm.floor}
                      onChange={(e) => setRoomForm({ ...roomForm, floor: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[#1E2B37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-600 block mb-1">Availability Status</label>
                  <select
                    value={roomForm.status}
                    onChange={(e) => setRoomForm({ ...roomForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-[#1E2B37]"
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-600 block mb-1">Amenities (Comma separated)</label>
                  <input
                    type="text"
                    required
                    value={roomForm.amenities}
                    onChange={(e) => setRoomForm({ ...roomForm, amenities: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[#1E2B37]"
                    placeholder="WiFi, AC, TV, Mini Bar, Ocean View"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-600 block mb-1">Image URL (Optional)</label>
                  <input
                    type="url"
                    value={roomForm.image}
                    onChange={(e) => setRoomForm({ ...roomForm, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[#1E2B37]"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-600 block mb-1">Room Description</label>
                  <textarea
                    rows={2}
                    value={roomForm.description}
                    onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[#1E2B37]"
                    placeholder="Write a brief description of the room..."
                  />
                </div>

                <button type="submit" className="w-full py-3 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-white font-bold mt-2 cursor-pointer shadow-md">
                  Save Room Data
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
