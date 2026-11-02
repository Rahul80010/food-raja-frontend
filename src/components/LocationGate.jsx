import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import LocationEntryScreen from './LocationEntryScreen';

export default function LocationGate({ children }) {
  const { pincode, checkingSavedLocation, isPickerOpen } = useLocation();

  if (checkingSavedLocation) {
    return <div className="flex min-h-screen items-center justify-center bg-[#fffaf4] text-sm font-bold text-gray-500"><Loader2 className="mr-2 h-5 w-5 animate-spin text-orange-500" />Checking your delivery area…</div>;
  }

  if (!pincode) return <LocationEntryScreen />;

  return <>{children}{isPickerOpen && <LocationEntryScreen overlay />}</>;
}
