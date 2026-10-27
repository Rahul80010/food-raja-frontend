import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Clock,
  CheckCircle2,
  ChefHat,
  Bike,
  PackageCheck,
  AlertCircle,
  RefreshCw,
  MapPin,
  UtensilsCrossed,
  ArrowRight
} from 'lucide-react';
import { trackOrder } from '../services/api';

const TIMELINE_STEPS = [
  { step: 1, key: 'submitted', label: 'Order Submitted', desc: 'Placed and queued for manual verification' },
  { step: 2, key: 'confirmed', label: 'Confirmed with Kitchen', desc: 'Availability verified with restaurant and customer' },
  { step: 3, key: 'preparing', label: 'Cooking & Packing', desc: 'Chef is preparing your fresh meal' },
  { step: 4, key: 'ready', label: 'Food Ready', desc: 'Freshly packed and waiting for delivery' },
  { step: 5, key: 'out_for_delivery', label: 'Out for Delivery', desc: 'Delivery partner is bringing your order' },
  { step: 6, key: 'delivered', label: 'Delivered', desc: 'Order completed. Bon appétit!' }
];

export default function OrderTrackingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialNumber = searchParams.get('orderNumber') || '';

  const [inputNumber, setInputNumber] = useState(initialNumber);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState(null);

  useEffect(() => {
    if (initialNumber) {
      handleSearch(initialNumber);
    }
  }, [initialNumber]);

  const handleSearch = async (numToSearch) => {
    const target = (numToSearch || inputNumber).trim();
    if (!target) return;

    try {
      setLoading(true);
      setError('');
      const res = await trackOrder(target);
      setOrder(res.data);
      setLastRefreshed(new Date());
      setSearchParams({ orderNumber: target });
    } catch (err) {
      setError(err.message || 'Order not found. Please verify your order number.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order?.statusDisplay?.step || 1;
  const isCancelled = order?.orderStatus === 'cancelled';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-[#1E2022]">Track Your Order</h1>
        <p className="text-sm text-gray-500">
          Enter your unique order number to check live status and delivery coordination.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="max-w-xl mx-auto bg-white p-3 rounded-2xl border-2 border-orange-200 shadow-sm flex items-center gap-2">
        <input
          type="text"
          placeholder="e.g. FR-20261015-8492"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 px-4 py-2.5 text-sm uppercase font-bold tracking-wider rounded-xl focus:outline-none text-gray-900"
        />
        <button
          onClick={() => handleSearch()}
          disabled={loading || !inputNumber.trim()}
          className="bg-[#FF5722] hover:bg-[#E64A19] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 shrink-0 disabled:bg-gray-300"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          <span>Track</span>
        </button>
      </div>

      {error && (
        <div className="max-w-xl mx-auto bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Order Status Display */}
      {order && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-orange-100 shadow-xl space-y-8 animate-fade-in">
          
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-[#1E2022] tracking-wider">{order.orderNumber}</h2>
                <button
                  onClick={() => handleSearch(order.orderNumber)}
                  title="Refresh status"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-[#FF5722] hover:bg-orange-50 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                From: <strong className="text-gray-800 font-bold">{order.restaurant?.name}</strong> • {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase ${
                isCancelled
                  ? 'bg-red-100 text-red-800'
                  : order.orderStatus === 'delivered'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-orange-100 text-[#FF5722]'
              }`}>
                {order.statusDisplay?.label || order.orderStatus}
              </span>
            </div>
          </div>

          {/* Cancelled Alert if applicable */}
          {isCancelled ? (
            <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-3 text-red-800">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Order Cancelled</p>
                <p className="text-xs text-red-700 mt-0.5">
                  This order was cancelled during verification. If you have questions, please contact our coordinator at +91 98400 12345.
                </p>
              </div>
            </div>
          ) : (
            /* Visual Timeline */
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">Live Progress</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {TIMELINE_STEPS.map((stepItem) => {
                  const isDone = currentStep >= stepItem.step;
                  const isCurrent = currentStep === stepItem.step;

                  return (
                    <div
                      key={stepItem.step}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isCurrent
                          ? 'border-[#FF5722] bg-orange-50/60 shadow-sm ring-2 ring-[#FF5722]/20'
                          : isDone
                          ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                          : 'border-gray-100 bg-gray-50/50 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                          isCurrent
                            ? 'bg-[#FF5722] text-white'
                            : isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          Step 0{stepItem.step}
                        </span>
                        {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <p className="font-bold text-xs leading-snug">{stepItem.label}</p>
                      <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 leading-tight">{stepItem.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Details Grid: Ordered Items & Delivery Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            
            {/* Items */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">Ordered Food Items</h4>
              <div className="bg-gray-50/80 rounded-2xl p-4 divide-y divide-gray-200/60 border border-gray-100">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-gray-800">{item.name}</span>
                      <span className="text-gray-400 ml-2">x {item.quantity}</span>
                    </div>
                    <span className="font-bold text-gray-900">Rs. {item.subtotal}</span>
                  </div>
                ))}

                <div className="pt-3 mt-3 flex justify-between font-black text-sm text-[#1E2022]">
                  <span>Total Amount ({order.paymentMethod?.toUpperCase()})</span>
                  <span className="text-[#FF5722]">Rs. {order.finalTotal}</span>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">Delivery Address</h4>
              <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900">{order.customer?.name}</p>
                    <p className="text-gray-600 mt-0.5 leading-relaxed">{order.customer?.address}</p>
                    {order.customer?.landmark && (
                      <p className="text-gray-400 mt-1 text-[11px]">Landmark: {order.customer.landmark}</p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200/60 text-[11px] text-gray-500">
                  Payment Status: <strong className="text-gray-800 uppercase">{order.paymentStatus}</strong>
                </div>
              </div>
            </div>

          </div>

          {lastRefreshed && (
            <p className="text-[11px] text-gray-400 text-center">
              Last status check: {lastRefreshed.toLocaleTimeString()}
            </p>
          )}

        </div>
      )}

    </div>
  );
}
