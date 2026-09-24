import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const HotelContext = createContext(null);

// Initial Mock Rooms Dataset (12 Real-World Luxury Resort Rooms)
const INITIAL_ROOMS = [
  {
    id: 101,
    number: '# No.101',
    type: 'Presidential Suite',
    price: 280,
    capacity: 4,
    floor: 1,
    status: 'Available',
    amenities: 'Private Plunge Pool, Panoramic Ocean View, King Bed, Jacuzzi, Butler Service, 4K OLED Smart TV',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-luxurious oceanfront presidential suite with private balcony plunge pool, master king bedroom, marble Jacuzzi bathroom, and 24/7 butler concierge.',
  },
  {
    id: 102,
    number: '# No.102',
    type: 'Deluxe Suite',
    price: 160,
    capacity: 2,
    floor: 1,
    status: 'Occupied',
    amenities: 'King Bed, Private Balcony, High-speed WiFi, Espresso Machine, Marble Bathroom, Climate AC',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant deluxe suite offering scenic resort views, plush king bedding, spa bath amenities, and a private furnished balcony.',
  },
  {
    id: 103,
    number: '# No.103',
    type: 'Presidential Suite',
    price: 240,
    capacity: 2,
    floor: 1,
    status: 'Available',
    amenities: 'Sunset Terrace View, Jacuzzi Spa Tub, King Bed, Complimentary Champagne, Soundproof Rooms',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    description: 'Exclusive romantic getaway suite featuring private Jacuzzi terrace overlooking western sunset vistas and marble rainfall shower.',
  },
  {
    id: 201,
    number: '# No.201',
    type: 'Executive Room',
    price: 175,
    capacity: 3,
    floor: 2,
    status: 'Available',
    amenities: 'Ocean Sunset View, King Bed + Lounge Sofa, Free High-speed Fiber WiFi, Smart TV, Gourmet Minibar',
    image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=800',
    description: 'Spacious executive room tailored for business travelers and luxury seekers, featuring dedicated workstation and ocean view.',
  },
  {
    id: 202,
    number: '# No.202',
    type: 'Standard Room',
    price: 95,
    capacity: 2,
    floor: 2,
    status: 'Occupied',
    amenities: 'Queen Bed, Work Desk, Air Conditioner, Smart TV, Garden View, Nespresso Coffee Maker',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800',
    description: 'Comfortable standard room with modern decor, queen size bed, garden view balcony, and high-speed wireless internet.',
  },
  {
    id: 203,
    number: '# No.203',
    type: 'Deluxe Suite',
    price: 145,
    capacity: 2,
    floor: 2,
    status: 'Available',
    amenities: 'Garden Balcony, Rain Shower, Free Fiber WiFi, Plush Robes, In-Room Safe',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800',
    description: 'Quiet second-floor deluxe suite surrounded by botanical flora with furnished balcony and walk-in rain shower.',
  },
  {
    id: 301,
    number: '# No.301',
    type: 'Presidential Suite',
    price: 320,
    capacity: 5,
    floor: 3,
    status: 'Available',
    amenities: 'Infinity Terrace, Private Jacuzzi, 2 King Bedrooms, Full Kitchenette, Premium Lounge, Bose Audio',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=800',
    description: 'Top-tier presidential suite with dual king master bedrooms, private outdoor Jacuzzi terrace, full kitchenette, and panoramic coastline view.',
  },
  {
    id: 302,
    number: '# No.302',
    type: 'Executive Room',
    price: 165,
    capacity: 3,
    floor: 3,
    status: 'Maintenance',
    amenities: 'Queen Bed, Garden Terrace, Rain Shower, Free WiFi, Tea/Coffee Maker',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800',
    description: 'Charming executive room overlooking tropical resort gardens, currently undergoing routine deep sanitization and maintenance.',
  },
  {
    id: 303,
    number: '# No.303',
    type: 'Standard Room',
    price: 105,
    capacity: 2,
    floor: 3,
    status: 'Available',
    amenities: 'Double Bed, High-Floor View, AC, Smart TV, Free WiFi, Work Desk',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
    description: 'Elevated standard room offering serene resort skyline views, ergonomic work seating, and high-speed fiber connection.',
  },
  {
    id: 401,
    number: '# No.401',
    type: 'Executive Room',
    price: 185,
    capacity: 3,
    floor: 4,
    status: 'Available',
    amenities: 'Rooftop Lounge Access, King Bed, Smart TV, Mini Bar, Rain Shower',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
    description: 'Fourth floor executive room with direct access to rooftop terrace, king bedding, premium sound bar, and complimentary minibar.',
  },
  {
    id: 402,
    number: '# No.402',
    type: 'Standard Room',
    price: 90,
    capacity: 2,
    floor: 4,
    status: 'Available',
    amenities: 'Double Bed, Smart TV, Air Conditioner, Free WiFi, Hair Dryer',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    description: 'Cozy fourth floor standard room ideal for couples or solo travelers, equipped with double bed, AC, and high-speed WiFi.',
  },
  {
    id: 501,
    number: '# No.501',
    type: 'Presidential Suite',
    price: 350,
    capacity: 4,
    floor: 5,
    status: 'Available',
    amenities: 'Penthouse Panorama, Private Rooftop Spa, 2 Bedrooms, Dining Area, Butler Service',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    description: 'Grand penthouse suite on the top floor with private rooftop spa pool, grand dining area, master suite, and personalized 24/7 service.',
  },
];

// Initial Mock Guests Dataset (Aligned with DummyJSON API)
const INITIAL_GUESTS = [
  {
    id: 1,
    fullName: 'Emily Johnson',
    email: 'emily.johnson@x.dummyjson.com',
    mobile: '+81 965-431-3024',
    idProof: 'PASSPORT-902188',
    nationality: 'United States',
    address: '626 Main Street, Phoenix, AZ',
    status: 'Checked-In',
    avatar: 'https://dummyjson.com/icon/emilyj/128',
  },
  {
    id: 2,
    fullName: 'Michael Williams',
    email: 'michael.williams@x.dummyjson.com',
    mobile: '+49 258-865-6325',
    idProof: 'DL-USA-442109',
    nationality: 'United States',
    address: '245 Liberty Ave, Dallas, TX',
    status: 'Checked-In',
    avatar: 'https://dummyjson.com/icon/michaelw/128',
  },
  {
    id: 3,
    fullName: 'Sophia Brown',
    email: 'sophia.brown@x.dummyjson.com',
    mobile: '+86 935-617-1354',
    idProof: 'PASSPORT-881240',
    nationality: 'United States',
    address: '99 Sunset Blvd, Los Angeles, CA',
    status: 'Active',
    avatar: 'https://dummyjson.com/icon/sophiab/128',
  },
  {
    id: 4,
    fullName: 'James Miller',
    email: 'james.miller@x.dummyjson.com',
    mobile: '+1 630-555-0192',
    idProof: 'DL-USA-110293',
    nationality: 'United States',
    address: '12 Beach Road, Miami, FL',
    status: 'Checked-Out',
    avatar: 'https://dummyjson.com/icon/jamesm/128',
  },
  {
    id: 5,
    fullName: 'Isabella Martinez',
    email: 'isabella.martinez@x.dummyjson.com',
    mobile: '+33 1 42 68 55 00',
    idProof: 'PASSPORT-772183',
    nationality: 'United States',
    address: '45 Park Avenue, New York, NY',
    status: 'Checked-Out',
    avatar: 'https://dummyjson.com/icon/isabellam/128',
  },
];

// Initial Mock Reservations Dataset
const INITIAL_RESERVATIONS = [
  {
    id: 'RES-9012',
    guestName: 'Emily Johnson',
    guestEmail: 'emily.johnson@x.dummyjson.com',
    guestPhone: '+81 965-431-3024',
    roomNumber: '# No.101',
    roomType: 'Presidential Suite',
    checkIn: '2026-09-24',
    checkOut: '2026-09-28',
    nights: 4,
    guests: '2 Adults, 1 Child',
    totalAmount: 1000,
    paymentStatus: 'Paid',
    status: 'Confirmed',
  },
  {
    id: 'RES-9013',
    guestName: 'Michael Williams',
    guestEmail: 'michael.williams@x.dummyjson.com',
    guestPhone: '+49 258-865-6325',
    roomNumber: '# No.102',
    roomType: 'Deluxe Suite',
    checkIn: '2026-09-23',
    checkOut: '2026-09-26',
    nights: 3,
    guests: '2 Adults',
    totalAmount: 420,
    paymentStatus: 'Paid',
    status: 'Checked-In',
  },
  {
    id: 'RES-9014',
    guestName: 'Sophia Brown',
    guestEmail: 'sophia.brown@x.dummyjson.com',
    guestPhone: '+86 935-617-1354',
    roomNumber: '# No.201',
    roomType: 'Executive Room',
    checkIn: '2026-09-25',
    checkOut: '2026-09-30',
    nights: 5,
    guests: '3 Adults',
    totalAmount: 825,
    paymentStatus: 'Pending',
    status: 'Confirmed',
  },
  {
    id: 'RES-9015',
    guestName: 'James Miller',
    guestEmail: 'james.miller@x.dummyjson.com',
    guestPhone: '+1 630-555-0192',
    roomNumber: '# No.202',
    roomType: 'Standard Room',
    checkIn: '2026-09-20',
    checkOut: '2026-09-23',
    nights: 3,
    guests: '1 Adult',
    totalAmount: 285,
    paymentStatus: 'Paid',
    status: 'Completed',
  },
  {
    id: 'RES-9016',
    guestName: 'Isabella Martinez',
    guestEmail: 'isabella.martinez@x.dummyjson.com',
    guestPhone: '+33 1 42 68 55 00',
    roomNumber: '# No.301',
    roomType: 'Presidential Suite',
    checkIn: '2026-09-26',
    checkOut: '2026-09-27',
    nights: 1,
    guests: '2 Adults',
    totalAmount: 280,
    paymentStatus: 'Refunded',
    status: 'Cancelled',
  },
];

export const HotelProvider = ({ children }) => {
  // 1. Central State: Rooms
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('grand_horizon_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  // 2. Central State: Guests
  const [guests, setGuests] = useState(() => {
    const saved = localStorage.getItem('grand_horizon_guests');
    return saved ? JSON.parse(saved) : INITIAL_GUESTS;
  });

  // 3. Central State: Reservations
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('grand_horizon_reservations');
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  // 4. Central State: Tasks
  const [tasks, setTasks] = useState([
    { id: 1, date: 'Sept 24, 2026', title: 'Set Up Conference Room B for 10 AM Meeting', completed: false, category: 'event' },
    { id: 2, date: 'Sept 24, 2026', title: 'Restock Housekeeping Supplies on 3rd Floor', completed: true, category: 'housekeeping' },
    { id: 3, date: 'Sept 25, 2026', title: 'Inspect and Clean the Infinity Pool Area', completed: false, category: 'maintenance' },
  ]);

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTask = (newTask) => {
    const formattedDate = newTask.date
      ? new Date(newTask.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'Sept 24, 2026';
    const taskObj = {
      id: Date.now(),
      date: formattedDate,
      title: newTask.title,
      completed: false,
      category: newTask.category || 'general',
    };
    setTasks((prev) => [taskObj, ...prev]);
    toast.success('Operational task added successfully!');
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    toast.success('Task removed.');
  };

  // --- DUMMYJSON GUESTS FETCH ENGINE ---
  const reloadDummyGuests = async (showToast = false) => {
    try {
      const response = await fetch('https://dummyjson.com/users?limit=30');
      const data = await response.json();
      if (data && data.users && Array.isArray(data.users)) {
        const mappedGuests = data.users.map((u, idx) => {
          const statusOptions = ['Active', 'Checked-In', 'Checked-Out'];
          let status = statusOptions[idx % 3];
          if (idx === 0) status = 'Checked-In';
          if (idx === 1) status = 'Checked-In';
          if (idx === 2) status = 'Active';

          return {
            id: u.id,
            fullName: `${u.firstName} ${u.lastName}`,
            email: u.email,
            mobile: u.phone || `+1 555-${100 + u.id}-${2000 + u.id}`,
            idProof: u.ssn || u.ein || `PASSPORT-${100000 + u.id * 137}`,
            nationality: u.address?.country || 'United States',
            address: `${u.address?.address || ''}, ${u.address?.city || ''}, ${u.address?.state || ''}`.replace(/^,\s*|,\s*$/g, ''),
            status: status,
            avatar: u.image || `https://dummyjson.com/icon/${u.username}/128`,
          };
        });

        setGuests(mappedGuests);
        localStorage.setItem('grand_horizon_guests', JSON.stringify(mappedGuests));
        localStorage.setItem('grand_horizon_dummyjson_loaded_v1', 'true');

        // Sync existing reservations with DummyJSON guests if needed
        setReservations((prevRes) => {
          const updatedRes = prevRes.map((resItem, idx) => {
            const matchedGuest = mappedGuests.find(
              (g) => g.fullName.toLowerCase().trim() === resItem.guestName?.toLowerCase()?.trim()
            );
            if (!matchedGuest && mappedGuests[idx % mappedGuests.length]) {
              const targetG = mappedGuests[idx % mappedGuests.length];
              return {
                ...resItem,
                guestName: targetG.fullName,
                guestEmail: targetG.email,
                guestPhone: targetG.mobile,
              };
            }
            return resItem;
          });
          localStorage.setItem('grand_horizon_reservations', JSON.stringify(updatedRes));
          return updatedRes;
        });

        if (showToast) {
          toast.success(`Loaded 30 guest records from DummyJSON API & synced reservations.`);
        }
      }
    } catch (error) {
      console.error('Failed to fetch DummyJSON guests:', error);
      if (showToast) {
        toast.error('Failed to connect to DummyJSON API. Using local cache.');
      }
    }
  };

  useEffect(() => {
    const isDummyLoaded = localStorage.getItem('grand_horizon_dummyjson_loaded_v1');
    if (!isDummyLoaded || guests.length < 10) {
      reloadDummyGuests(false); // Silent load - no toast notification on page load!
    }
  }, []);

  // Persist State to LocalStorage
  useEffect(() => {
    localStorage.setItem('grand_horizon_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('grand_horizon_guests', JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem('grand_horizon_reservations', JSON.stringify(reservations));
  }, [reservations]);

  // --- ROOM ACTIONS ---
  const addRoom = (roomData) => {
    const newRoom = {
      id: Date.now(),
      ...roomData,
    };
    setRooms((prev) => [newRoom, ...prev]);
    toast.success(`Created new room ${newRoom.number} (${newRoom.type}).`);
  };

  const updateRoom = (updatedRoom) => {
    setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
    toast.info(`Updated room ${updatedRoom.number} details.`);
  };

  const deleteRoom = (id, number) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
    toast.error(`Deleted room ${number} from inventory.`);
  };

  const updateRoomStatus = (numberOrId, newStatus) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === numberOrId || r.number === numberOrId ? { ...r, status: newStatus } : r))
    );
  };

  // --- GUEST ACTIONS ---
  const addGuest = (guestData) => {
    const newGuest = {
      id: Date.now(),
      ...guestData,
    };
    setGuests((prev) => [newGuest, ...prev]);
    toast.success(`Guest profile created for ${newGuest.fullName}.`);
  };

  const updateGuest = (updatedGuest) => {
    setGuests((prev) => prev.map((g) => (g.id === updatedGuest.id ? updatedGuest : g)));
    toast.info(`Updated profile for ${updatedGuest.fullName}.`);
  };

  const deleteGuest = (id, name) => {
    setGuests((prev) => prev.filter((g) => g.id !== id));
    toast.error(`Removed ${name} from guest directory.`);
  };

  // --- RESERVATION ACTIONS ---
  const addReservation = (resData) => {
    const newRes = {
      id: `RES-${Math.floor(9017 + Math.random() * 100)}`,
      ...resData,
    };

    setReservations((prev) => [newRes, ...prev]);

    const initialRoomStatus = newRes.status === 'Checked-In' ? 'Occupied' : 'Occupied';
    updateRoomStatus(newRes.roomNumber, initialRoomStatus);

    setGuests((prev) =>
      prev.map((g) =>
        g.fullName.toLowerCase() === newRes.guestName.toLowerCase()
          ? { ...g, status: newRes.status === 'Checked-In' ? 'Checked-In' : 'Active' }
          : g
      )
    );

    toast.success(`Reservation ${newRes.id} created for ${newRes.guestName}! Room ${newRes.roomNumber} updated.`);
  };

  const checkInReservation = (resId) => {
    const targetRes = reservations.find((r) => r.id === resId);
    if (!targetRes) return;

    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status: 'Checked-In' } : r))
    );

    updateRoomStatus(targetRes.roomNumber, 'Occupied');

    setGuests((prev) =>
      prev.map((g) =>
        g.fullName.toLowerCase() === targetRes.guestName.toLowerCase() ? { ...g, status: 'Checked-In' } : g
      )
    );

    toast.success(`Guest ${targetRes.guestName} checked in to ${targetRes.roomNumber}! Room marked Occupied.`);
  };

  const checkOutReservation = (resId) => {
    const targetRes = reservations.find((r) => r.id === resId);
    if (!targetRes) return;

    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status: 'Completed' } : r))
    );

    updateRoomStatus(targetRes.roomNumber, 'Available');

    setGuests((prev) =>
      prev.map((g) =>
        g.fullName.toLowerCase() === targetRes.guestName.toLowerCase() ? { ...g, status: 'Checked-Out' } : g
      )
    );

    toast.info(`Guest ${targetRes.guestName} checked out. Room ${targetRes.roomNumber} marked Available.`);
  };

  const cancelReservation = (resId) => {
    const targetRes = reservations.find((r) => r.id === resId);
    if (!targetRes) return;

    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status: 'Cancelled', paymentStatus: 'Refunded' } : r))
    );

    updateRoomStatus(targetRes.roomNumber, 'Available');

    toast.error(`Reservation ${resId} cancelled. Room ${targetRes.roomNumber} freed.`);
  };

  // --- COMPUTED DASHBOARD METRICS ---
  const availableRoomsList = rooms.filter((r) => r.status === 'Available');
  const occupiedRoomsCount = rooms.filter((r) => r.status === 'Occupied').length;
  const availableRoomsCount = availableRoomsList.length;
  const maintenanceRoomsCount = rooms.filter((r) => r.status === 'Maintenance').length;

  const totalBookingsCount = reservations.length;
  const checkedInCount = reservations.filter((r) => r.status === 'Checked-In').length;
  const completedCount = reservations.filter((r) => r.status === 'Completed').length;
  const cancellationsCount = reservations.filter((r) => r.status === 'Cancelled').length;
  const pendingPaymentsCount = reservations.filter((r) => r.paymentStatus === 'Pending').length;

  const totalRevenue = reservations
    .filter((r) => r.paymentStatus === 'Paid' || r.status === 'Completed' || r.status === 'Checked-In')
    .reduce((sum, r) => sum + Number(r.totalAmount || 0), 0);

  const rating = {
    score: '4.6',
    totalReviews: '2546',
    status: 'Impressive',
    facilities: 4.4,
    cleanliness: 4.7,
    services: 4.6,
    comfort: 4.8,
    location: 4.5,
  };

  const metrics = {
    availableRooms: availableRoomsCount,
    occupiedRooms: occupiedRoomsCount,
    todayCheckout: completedCount + checkedInCount,
    cancellations: cancellationsCount,
    enquiries: 42,
    pendingPayments: pendingPaymentsCount,
    totalBookings: totalBookingsCount,
    checkedIn: checkedInCount,
    totalRevenue: `$${totalRevenue.toLocaleString()}`,
    rating: rating,
    roomAvailability: {
      occupied: occupiedRoomsCount,
      reserved: reservations.filter((r) => r.status === 'Confirmed').length,
      available: availableRoomsCount,
      notReady: maintenanceRoomsCount,
      total: rooms.length,
    },
  };

  const recentEnquiries = [
    { id: 1, name: 'Micheal M', tag: 'BOOKINGS', tagColor: '#1E2B37', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' },
    { id: 2, name: 'Peterson K', tag: 'AMENITIES', tagColor: '#2563EB', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150' },
    { id: 3, name: 'Johnson T', tag: 'PAYMENTS', tagColor: '#1E2B37', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150' },
    { id: 4, name: 'Albert G', tag: 'CHECKOUT', tagColor: '#2563EB', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { id: 5, name: 'Thomas R', tag: 'PAYMENTS', tagColor: '#1E2B37', avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150' },
    { id: 6, name: 'Hendry W', tag: 'CANCELLATION', tagColor: '#DC2626', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150' },
  ];

  const bookingStatusChartData = [
    { month: 'Jan', Bookings: 25, Enquiries: 35 },
    { month: 'Feb', Bookings: 45, Enquiries: 65 },
    { month: 'Mar', Bookings: 75, Enquiries: 45 },
    { month: 'Apr', Bookings: 35, Enquiries: 55 },
    { month: 'May', Bookings: 85, Enquiries: 80 },
    { month: 'Jun', Bookings: 55, Enquiries: 40 },
    { month: 'Jul', Bookings: 95, Enquiries: 65 },
    { month: 'Aug', Bookings: 65, Enquiries: 85 },
    { month: 'Sep', Bookings: 40, Enquiries: 50 },
    { month: 'Oct', Bookings: 80, Enquiries: 60 },
  ];

  const platformData = [
    { name: 'Direct Booking', value: 61, color: '#C5A059' },
    { name: 'Booking.com', value: 12, color: '#1E2B37' },
    { name: 'Airbnb', value: 18, color: '#2563EB' },
    { name: 'Agoda', value: 9, color: '#10B981' },
  ];

  const notifications = [
    { id: 1, text: 'New reservation RES-9014 created by Sarah Wilson', read: false, time: '10 mins ago' },
    { id: 2, text: 'Room # No.102 marked as Occupied', read: false, time: '25 mins ago' },
    { id: 3, text: 'Express check-out processed for Alexander Wright', read: true, time: '1 hour ago' },
  ];

  return (
    <HotelContext.Provider
      value={{
        rooms,
        guests,
        reservations,
        metrics,
        rating,
        platformData,
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        recentEnquiries,
        bookingStatusChartData,
        notifications,
        availableRoomsList,
        recentReservationsList: reservations.slice(0, 5),
        addRoom,
        updateRoom,
        deleteRoom,
        updateRoomStatus,
        addGuest,
        updateGuest,
        deleteGuest,
        reloadDummyGuests,
        addReservation,
        checkInReservation,
        checkOutReservation,
        cancelReservation,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
