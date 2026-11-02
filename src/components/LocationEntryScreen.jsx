import React, { useState } from 'react';
import { ArrowRight, ChefHat, Loader2, MapPin, X } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

const PINCODE_PATTERN = /^[1-9]\d{5}$/;

export default function LocationEntryScreen({ overlay = false }) {
  const { pincode, locationError, isSearching, findKitchens, closeLocationPicker } = useLocation();
  const [value, setValue] = useState(pincode || '');

  const submit = (event) => {
    event.preventDefault();
    findKitchens(value);
  };

  return (
    <div className={overlay ? 'fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-[#17110f]/65 p-3 backdrop-blur-sm sm:p-6' : 'flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_#fff1df,_#fffaf4_48%,_#fff_100%)] p-4 sm:p-8'}>
      <div className={`relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-[0_30px_100px_-35px_rgba(83,42,15,0.32)] ${overlay ? 'my-auto' : 'min-h-[min(720px,calc(100vh-2rem))] lg:grid-cols-2'}`}>
        {overlay && pincode && <button type="button" onClick={closeLocationPicker} aria-label="Close location picker" className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-600 shadow hover:bg-white"><X className="h-5 w-5" /></button>}

        <div className="relative flex min-h-[240px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#291b15] via-[#6c2b16] to-[#ed5124] p-6 text-white sm:p-9 lg:min-h-full">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[32px] border-white/10" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />
          <div className="relative z-[1] inline-flex w-fit rounded-2xl bg-white p-2 shadow-xl">
            <img src="/foodraja-logo-v2.png" alt="FoodRaja by Aarika Ashok Foundation" className="h-16 w-28 object-contain sm:h-[74px] sm:w-[132px]" />
          </div>
          <div className="relative z-[1] mt-9 max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-orange-100 backdrop-blur"><ChefHat className="h-3.5 w-3.5" /> Fresh from local kitchens</span>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">Good food starts<br className="hidden sm:block" /> close to home.</h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-orange-50/85">We’ll find the kitchens that can deliver to your area.</p>
          </div>
          <div className="relative z-[1] mt-8 hidden items-center gap-2 text-xs font-semibold text-white/75 lg:flex"><MapPin className="h-4 w-4 text-orange-200" /> Verified kitchen availability by delivery area</div>
        </div>

        <div className="flex items-center p-6 sm:p-9 lg:p-12">
          <div className="mx-auto w-full max-w-md">
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#e64a19]">Your delivery location</span>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1e2022] sm:text-[2.55rem]">Delicious Food, Delivered to Your Location</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">Enter your delivery pincode to discover kitchens near you.</p>

            <form onSubmit={submit} className="mt-8 space-y-4">
              <label htmlFor="delivery-pincode" className="block text-xs font-extrabold uppercase tracking-wide text-gray-600">6-digit Indian PIN code</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-500" />
                <input
                  id="delivery-pincode"
                  name="pincode"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  autoFocus={!overlay}
                  maxLength={6}
                  pattern="[1-9][0-9]{5}"
                  required
                  value={value}
                  onChange={event => setValue(event.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter pincode"
                  aria-describedby={locationError ? 'pincode-error' : undefined}
                  className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-xl font-extrabold tracking-[0.22em] text-gray-900 outline-none transition placeholder:text-sm placeholder:font-medium placeholder:tracking-normal focus:border-[#ff5722] focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>
              {locationError && <p id="pincode-error" role="alert" className="rounded-xl border border-rose-100 bg-rose-50 px-3.5 py-3 text-sm font-semibold text-rose-700">{locationError}</p>}
              <button
                type="submit"
                disabled={!PINCODE_PATTERN.test(value) || isSearching}
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#ff5722] to-[#e64a19] px-5 py-4 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSearching ? <><Loader2 className="h-5 w-5 animate-spin" /> Finding nearby kitchens…</> : <>Find Kitchens <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
            <p className="mt-5 text-center text-[11px] leading-relaxed text-gray-400">We’ll only show kitchens that are open for delivery to this pincode.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
