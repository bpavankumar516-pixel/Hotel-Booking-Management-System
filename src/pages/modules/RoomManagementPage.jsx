import React, { useState, useEffect } from 'react';
import { useHotel } from '../../contexts/HotelContext';
import {
  BedDouble,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  ArrowUpDown,
  X,
  Check,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const RoomManagementPage = () => {
  const { availableRoomsList } = useHotel();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterAvailability, setFilterAvailability] = useState('All');
  const [sortBy, setSortBy] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [activeModal, setActiveModal] = useState(null); // 'add' | 'edit' | 'details'
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [roomForm, setRoomForm] = useState({
    number: '',
    type: 'A/c King',
    price: 29,
    capacity: 2,
    amenities: 'WiFi, TV, AC, Mini Bar',
    floor: 3,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500',
  });

  // Third-Party API Integration (DummyJSON fetch with fallback to HotelContext)
  useEffect(() => {
    const fetchRoomsFromApi = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://dummyjson.com/products?limit=10');
        const data = await res.json();
        if (data && data.products && data.products.length > 0) {
          const apiRooms = data.products.slice(0, 8).map((prod, idx) => ({
            id: prod.id,
            number: `# No.${300 + idx}`,
            type: idx % 3 === 0 ? 'A/c King' : idx % 3 === 1 ? 'A/c Queen' : 'A/c Double',
            price: Math.floor(prod.price * 1.5) || 35,
            capacity: (idx % 3) + 2,
            amenities: 'Free WiFi, Smart TV, AC, Ocean View',
            floor: (idx % 4) + 1,
            status: idx % 2 === 0 ? 'Available' : 'Occupied',
            image: prod.thumbnail || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500',
          }));
          setRooms(apiRooms);
        } else {
          fallbackRooms();
        }
      } catch {
        fallbackRooms();
      } finally {
        setLoading(false);
      }
    };

    const fallbackRooms = () => {
      const defaultRooms = availableRoomsList.map((r, i) => ({
        id: r.id || i + 1,
        number: r.number,
        type: r.type,
        price: parseInt(r.price.replace(/[^0-9]/g, '')) || 29,
        capacity: 2,
        amenities: 'WiFi, TV, Air Conditioner',
        floor: 2,
        status: i % 2 === 0 ? 'Available' : 'Occupied',
        image: r.image,
      }));
      setRooms(defaultRooms);
    };

    fetchRoomsFromApi();
  }, [availableRoomsList]);

  // Filtering & Sorting
  const filteredRooms = rooms
    .filter((room) => {
      const matchesSearch =
        room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'All' || room.type === filterType;
      const matchesAvail =
        filterAvailability === 'All' || room.status === filterAvailability;
      return matchesSearch && matchesType && matchesAvail;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage) || 1;
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newRoomObj = {
      id: Date.now(),
      ...roomForm,
      price: Number(roomForm.price),
    };
    setRooms([newRoomObj, ...rooms]);
    setActiveModal(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setRooms(rooms.map((r) => (r.id === selectedRoom.id ? { ...selectedRoom, ...roomForm } : r)));
    setActiveModal(null);
  };

  const handleDelete = (id) => {
    setRooms(rooms.filter((r) => r.id !== id));
  };

  const openEdit = (room) => {
    setSelectedRoom(room);
    setRoomForm({ ...room });
    setActiveModal('edit');
  };

  const openDetails = (room) => {
    setSelectedRoom(room);
    setActiveModal('details');
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Module Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-[#C5A059] text-white uppercase">
              Module 03
            </span>
            <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">Room Management</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage hotel rooms, pricing, amenities, and real-time availability status.
          </p>
        </div>

        <button
          onClick={() => {
            setRoomForm({
              number: `# No.${Math.floor(100 + Math.random() * 800)}`,
              type: 'A/c King',
              price: 35,
              capacity: 2,
              amenities: 'Free WiFi, Smart TV, AC, Sea View',
              floor: 3,
              status: 'Available',
              image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500',
            });
            setActiveModal('add');
          }}
          className="py-2.5 px-4 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Room</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search room number or type..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          />
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Filter Type */}
        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="All">All Room Types</option>
            <option value="A/c King">A/c King</option>
            <option value="A/c Queen">A/c Queen</option>
            <option value="A/c Double">A/c Double</option>
          </select>
        </div>

        {/* Filter Availability */}
        <div className="flex items-center space-x-2">
          <select
            value={filterAvailability}
            onChange={(e) => {
              setFilterAvailability(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
        </div>

        {/* Sort Price */}
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Room Grid / Loader */}
      {loading ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#C5A059] animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-medium">Fetching third-party API room data...</p>
        </div>
      ) : paginatedRooms.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-2">
          <BedDouble className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">No Rooms Found</h4>
          <p className="text-xs text-slate-400">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Room Photo & Status Badge */}
                <div className="h-44 w-full relative overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.number}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 right-3 text-[10px] font-extrabold px-2.5 py-1 rounded text-white shadow-md ${
                      room.status === 'Available' ? 'bg-[#2ECC71]' : 'bg-[#E74C3C]'
                    }`}
                  >
                    {room.status}
                  </span>
                </div>

                {/* Info Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                        {room.number}
                      </h3>
                      <span className="text-xs font-semibold text-slate-500">{room.type}</span>
                    </div>
                    <span className="text-sm font-extrabold text-[#C5A059] bg-[#F7F2E7] px-2.5 py-1 rounded border border-amber-200">
                      ${room.price}/night
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 space-y-1 pt-1 border-t border-slate-100">
                    <p><span className="font-semibold text-slate-700">Capacity:</span> {room.capacity} Persons</p>
                    <p><span className="font-semibold text-slate-700">Floor:</span> Floor {room.floor}</p>
                    <p className="truncate"><span className="font-semibold text-slate-700">Amenities:</span> {room.amenities}</p>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  onClick={() => openDetails(room)}
                  title="View Details"
                  className="p-1.5 text-slate-600 hover:text-[#C5A059] hover:bg-white rounded transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openEdit(room)}
                  title="Edit Room"
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-white rounded transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(room.id)}
                  title="Delete Room"
                  className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-white rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-xs text-slate-500 font-medium">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-1.5 rounded border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-1.5 rounded border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Add / Edit / Details Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                {activeModal === 'add' && 'Add New Room'}
                {activeModal === 'edit' && `Edit Room (${selectedRoom?.number})`}
                {activeModal === 'details' && `Room Details (${selectedRoom?.number})`}
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeModal === 'details' ? (
              <div className="space-y-3 text-xs">
                <img src={selectedRoom?.image} alt={selectedRoom?.number} className="w-full h-40 object-cover rounded-lg" />
                <div className="space-y-1.5">
                  <p><span className="font-bold text-slate-700">Room Number:</span> {selectedRoom?.number}</p>
                  <p><span className="font-bold text-slate-700">Type:</span> {selectedRoom?.type}</p>
                  <p><span className="font-bold text-slate-700">Price / Night:</span> ${selectedRoom?.price}</p>
                  <p><span className="font-bold text-slate-700">Capacity:</span> {selectedRoom?.capacity} Persons</p>
                  <p><span className="font-bold text-slate-700">Floor Number:</span> Floor {selectedRoom?.floor}</p>
                  <p><span className="font-bold text-slate-700">Status:</span> {selectedRoom?.status}</p>
                  <p><span className="font-bold text-slate-700">Amenities:</span> {selectedRoom?.amenities}</p>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 rounded-lg bg-[#1E2B37] text-white font-bold text-xs"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={activeModal === 'add' ? handleAddSubmit : handleEditSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 font-semibold block">Room Number</label>
                    <input
                      type="text"
                      required
                      value={roomForm.number}
                      onChange={(e) => setRoomForm({ ...roomForm, number: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-semibold block">Price ($/night)</label>
                    <input
                      type="number"
                      required
                      value={roomForm.price}
                      onChange={(e) => setRoomForm({ ...roomForm, price: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 font-semibold block">Type</label>
                    <select
                      value={roomForm.type}
                      onChange={(e) => setRoomForm({ ...roomForm, type: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                    >
                      <option value="A/c King">A/c King</option>
                      <option value="A/c Queen">A/c Queen</option>
                      <option value="A/c Double">A/c Double</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-semibold block">Status</label>
                    <select
                      value={roomForm.status}
                      onChange={(e) => setRoomForm({ ...roomForm, status: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                    >
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-500 font-semibold block">Amenities</label>
                  <input
                    type="text"
                    value={roomForm.amenities}
                    onChange={(e) => setRoomForm({ ...roomForm, amenities: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#C5A059] text-white font-bold text-xs hover:bg-[#b08d48] transition-colors"
                >
                  Save Room
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
