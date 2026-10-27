import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, PhoneCall, Clock, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function OrderSuccessPage() {
  const { orderNumber } = useParams();
  const location = useLocation();
  const stateData = location.state || {};

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 space-y-8 text-center">
      
      {/* Animated Success Badge */}
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-scale-up">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      {/* Main Announcement */}
      <div className="space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF5722] bg-orange-100 px-3 py-1 rounded-full">
          Order Submitted Successfully
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1E2022]">
          We Received Your Food Request!
        </h1>
        <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
          Your order is now in our central management queue. Next, our FoodRaja coordinator will personally verify kitchen availability and call you.
        </p>
      </div>

      {/* Order Number Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-200/80 shadow-lg space-y-4 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase">Order Reference Number</span>
            <div className="text-2xl font-black text-[#1E2022] tracking-wider">{orderNumber}</div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Awaiting Phone Confirmation
          </span>
        </div>

        {/* What Happens Next Steps */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            What Happens Next:
          </h4>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-orange-100 text-[#FF5722] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">FoodRaja calls the restaurant</p>
              <p className="text-[11px] text-gray-500">We verify that {stateData.restaurantName || 'the kitchen'} has all ingredients fresh and ready to cook.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-orange-100 text-[#FF5722] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">FoodRaja calls you</p>
              <p className="text-[11px] text-gray-500">We confirm your exact delivery instructions and estimated preparation time.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-orange-100 text-[#FF5722] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Fresh delivery to your doorstep</p>
              <p className="text-[11px] text-gray-500">Hot food is dispatched directly to you. Pay cash or UPI on delivery.</p>
            </div>
          </div>

        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-xl">
          <PhoneCall className="w-4 h-4 text-[#FF5722] shrink-0" />
          <span>Keep your phone nearby. Our caller ID will display our FoodRaja hotline number.</span>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link
          to={`/track?orderNumber=${encodeURIComponent(orderNumber)}`}
          className="inline-flex items-center justify-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-md shadow-orange-500/20 transition-all"
        >
          <span>Track Live Status</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/restaurants"
          className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Browse More Restaurants</span>
        </Link>
      </div>

    </div>
  );
}
