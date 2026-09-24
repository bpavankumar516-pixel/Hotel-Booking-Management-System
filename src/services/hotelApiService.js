import { fetchDummyJsonUsers } from './dummyJsonService';
import { toast } from 'react-toastify';

// Storage Keys
const STORAGE_KEYS = {
  ROOMS: 'hotel_resort_rooms_v2',
  GUESTS: 'hotel_resort_guests_v2',
  RESERVATIONS: 'hotel_resort_reservations_v2',
  CHECKIN_LOGS: 'hotel_resort_checkin_logs_v2',
  CHECKOUT_LOGS: 'hotel_resort_checkout_logs_v2',
  MAINTENANCE: 'hotel_resort_maintenance_tasks_v2',
};

// Storage Helpers
const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error loading key ${key} from LocalStorage:`, e);
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving key ${key} to LocalStorage:`, e);
  }
};

/**
 * Unified Hotel API Service Layer
 */
export const hotelApiService = {
  // --- ROOMS API SERVICES ---
  fetchRooms: async (initialRooms) => {
    const cached = getStorageItem(STORAGE_KEYS.ROOMS, null);
    if (!cached || cached.length === 0) {
      setStorageItem(STORAGE_KEYS.ROOMS, initialRooms);
      return initialRooms;
    }
    return cached;
  },

  saveRooms: (rooms) => {
    setStorageItem(STORAGE_KEYS.ROOMS, rooms);
    return rooms;
  },

  // --- GUESTS API SERVICES ---
  fetchGuests: async (initialGuests) => {
    const cached = getStorageItem(STORAGE_KEYS.GUESTS, null);
    if (!cached || cached.length === 0) {
      setStorageItem(STORAGE_KEYS.GUESTS, initialGuests);
      return initialGuests;
    }
    return cached;
  },

  saveGuests: (guests) => {
    setStorageItem(STORAGE_KEYS.GUESTS, guests);
    return guests;
  },

  syncDummyJson: async (currentGuests, forceToast = false) => {
    try {
      const dummyGuests = await fetchDummyJsonUsers(30);
      if (dummyGuests && dummyGuests.length > 0) {
        // Merge without duplicating existing IDs
        const existingMap = new Map(currentGuests.map((g) => [g.fullName.toLowerCase(), g]));
        dummyGuests.forEach((dg) => {
          if (!existingMap.has(dg.fullName.toLowerCase())) {
            existingMap.set(dg.fullName.toLowerCase(), dg);
          }
        });

        const merged = Array.from(existingMap.values());
        setStorageItem(STORAGE_KEYS.GUESTS, merged);

        if (forceToast) {
          toast.success(`Successfully synchronized ${dummyGuests.length} profiles from DummyJSON Users API!`);
        }
        return merged;
      }
    } catch (err) {
      console.error('DummyJSON sync failed:', err);
    }
    return currentGuests;
  },

  // --- RESERVATIONS API SERVICES ---
  fetchReservations: async (initialReservations) => {
    const cached = getStorageItem(STORAGE_KEYS.RESERVATIONS, null);
    if (!cached || cached.length === 0) {
      setStorageItem(STORAGE_KEYS.RESERVATIONS, initialReservations);
      return initialReservations;
    }
    return cached;
  },

  saveReservations: (reservations) => {
    setStorageItem(STORAGE_KEYS.RESERVATIONS, reservations);
    return reservations;
  },

  // --- CHECK-IN / CHECK-OUT AUDIT LOGS ---
  fetchCheckInLogs: async (initialLogs) => {
    const cached = getStorageItem(STORAGE_KEYS.CHECKIN_LOGS, null);
    if (!cached) {
      setStorageItem(STORAGE_KEYS.CHECKIN_LOGS, initialLogs);
      return initialLogs;
    }
    return cached;
  },

  saveCheckInLogs: (logs) => {
    setStorageItem(STORAGE_KEYS.CHECKIN_LOGS, logs);
    return logs;
  },

  fetchCheckOutLogs: async (initialLogs) => {
    const cached = getStorageItem(STORAGE_KEYS.CHECKOUT_LOGS, null);
    if (!cached) {
      setStorageItem(STORAGE_KEYS.CHECKOUT_LOGS, initialLogs);
      return initialLogs;
    }
    return cached;
  },

  saveCheckOutLogs: (logs) => {
    setStorageItem(STORAGE_KEYS.CHECKOUT_LOGS, logs);
    return logs;
  },
};

export default hotelApiService;
