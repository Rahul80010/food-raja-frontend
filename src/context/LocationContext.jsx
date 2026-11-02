import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchKitchensByPincode } from '../services/api';

const LocationContext = createContext(null);
const PINCODE_PATTERN = /^[1-9]\d{5}$/;
const STORAGE_KEY = 'foodraja_delivery_pincode';

export function LocationProvider({ children }) {
  const [pincode, setPincode] = useState(null);
  const [kitchens, setKitchens] = useState([]);
  const [checkingSavedLocation, setCheckingSavedLocation] = useState(true);
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [isSearching, setSearching] = useState(false);
  const [locationError, setLocationError] = useState('');

  const findKitchens = useCallback(async (value) => {
    const clean = String(value || '').trim();
    if (!PINCODE_PATTERN.test(clean)) {
      setLocationError('Enter a valid 6-digit Indian pincode.');
      return false;
    }

    setSearching(true);
    setLocationError('');
    try {
      const result = await fetchKitchensByPincode(clean);
      const matches = Array.isArray(result.data) ? result.data : [];
      if (matches.length === 0) {
        setLocationError('Sorry! FoodRaja is not available in your area yet.');
        return false;
      }

      localStorage.setItem(STORAGE_KEY, clean);
      setPincode(clean);
      setKitchens(matches);
      setPickerOpen(false);
      setLocationError('');
      return true;
    } catch (error) {
      setLocationError(error.message || 'We could not verify this pincode. Please try again.');
      return false;
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || '';
    if (!saved) {
      setPickerOpen(true);
      setCheckingSavedLocation(false);
      return;
    }
    if (!PINCODE_PATTERN.test(saved)) {
      localStorage.removeItem(STORAGE_KEY);
      setPickerOpen(true);
      setCheckingSavedLocation(false);
      return;
    }

    let cancelled = false;
    fetchKitchensByPincode(saved)
      .then(result => {
        if (cancelled) return;
        const matches = Array.isArray(result.data) ? result.data : [];
        if (!matches.length) {
          localStorage.removeItem(STORAGE_KEY);
          setPickerOpen(true);
          setLocationError('Sorry! FoodRaja is not available in your area yet.');
          return;
        }
        setPincode(saved);
        setKitchens(matches);
      })
      .catch(error => {
        if (cancelled) return;
        setLocationError(error.message || 'Could not verify your saved location. Try again.');
        setPickerOpen(true);
      })
      .finally(() => {
        if (!cancelled) setCheckingSavedLocation(false);
      });

    return () => { cancelled = true; };
  }, []);

  const openLocationPicker = useCallback(() => {
    setLocationError('');
    setPickerOpen(true);
  }, []);

  const closeLocationPicker = useCallback(() => {
    if (pincode) setPickerOpen(false);
  }, [pincode]);

  const value = useMemo(() => ({
    pincode,
    kitchens,
    checkingSavedLocation,
    isPickerOpen,
    isSearching,
    locationError,
    findKitchens,
    openLocationPicker,
    closeLocationPicker
  }), [pincode, kitchens, checkingSavedLocation, isPickerOpen, isSearching, locationError, findKitchens, openLocationPicker, closeLocationPicker]);

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) throw new Error('useLocation must be used inside LocationProvider');
  return context;
}
