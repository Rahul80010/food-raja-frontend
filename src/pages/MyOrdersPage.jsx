import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PackageCheck,
  Clock,
  MapPin,
  PhoneCall,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
  Loader2,
  AlertCircle,
  User,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchCustomerOrders } from '../services/api';

export default function MyOrdersPage() {
  const { user, token, isAuthenticated, openAuthModal } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    loadOrders();
  }, [isAuthenticated, token]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetchCustomerOrders(token);
      setOrders(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch your orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return { text: 'Awaiting Coordinator Call', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'restaurant_contacted':
      case 'availability_confirmed':
        return { text: 'Restaurant Contacted', bg: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'customer_contacted':
      case 'confirmed':
        return { text: 'Order Confirmed', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'preparing':
        return { text: 'Kitchen Preparing', bg: 'bg-orange-100 text-orange-800 border-orange-300' };
      case 'ready':
        return { text: 'Food Ready for Pickup', bg: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'out_for_delivery':
        return { text: 'Out for Delivery 🛵', bg: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
      case 'delivered':
        return { text: 'Delivered Successfully ✅', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'cancelled':
        return { text: 'Order Cancelled', bg: 'bg-rose-100 text-rose-800 border-rose-300' };
      default:
        return { text: status, bg: 'bg-gray-100 text-gray-800 border-gray-300' };
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-orange-100 text-[#FF5722] flex items-center justify-center mx-auto shadow-inner">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Please Log In</h2>
        <p className="text-sm text-gray-500">
          Log in with your mobile number to view your previous orders and check real-time delivery status.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="bg-[#FF5722] hover:bg-[#E64A19] text-white px-6 py-3 rounded-xl font-black text-sm shadow-md transition-all inline-flex items-center gap-2"
        >
          <span>Log In to View Orders</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E2022] flex items-center gap-2.5">
            <PackageCheck className="w-7 h-7 text-[#FF5722]" />
            <span>My Orders</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Logged in as <strong className="text-gray-800">{user?.name}</strong> ({user?.phone})
          </p>
        </div>

        <Link
          to="/restaurants"
          className="bg-orange-50 hover:bg-orange-100 text-[#FF5722] border border-orange-200 px-4 py-2 rounded-xl text-xs font-bold transition-all self-start sm:self-auto flex items-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order More Food</span>
        </Link>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#FF5722] animate-spin mx-auto" />
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-orange-100 p-8 space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-[#FF5722] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-gray-900">No Orders Yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            You haven't placed any food orders with this account yet. Choose from our delicious partner restaurants!
          </p>
          <Link
            to="/restaurants"
            className="inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-orange-500/20 transition-all"
          >
            <span>Explore Restaurants</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const badge = getStatusBadge(order.orderStatus);
            return (
              <div
                key={order.id || order.orderNumber}
                className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-gray-800">
                        {order.orderNumber}
                      </span>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${badge.bg}`}>
                        {badge.text}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(order.createdAt).toLocaleString()}</span>
                    </p>
                  </div>

                  <Link
                    to={`/track?order=${encodeURIComponent(order.orderNumber)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-[#FF5722] hover:underline self-start sm:self-auto"
                  >
                    <span>Track Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Restaurant & Items summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Restaurant</p>
                    <p className="font-extrabold text-gray-900 text-sm">
                      {order.restaurantSnapshot?.name || 'Partner Restaurant'}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>{order.restaurantSnapshot?.locality || order.customerInfo?.locality}</span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Final Total</p>
                    <p className="font-black text-lg text-[#FF5722]">
                      Rs. {order.finalTotal}
                    </p>
                    <p className="text-[11px] text-gray-500 uppercase font-semibold">
                      Payment: {order.paymentMethod === 'online' ? 'Online' : 'Cash on Delivery'}
                    </p>
                  </div>
                </div>

                {/* Items List */}
                <div className="bg-gray-50 p-3.5 rounded-2xl space-y-1.5 text-xs text-gray-700">
                  {order.itemsSnapshot && order.itemsSnapshot.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                        <span className="font-bold">{item.quantity}x</span>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-semibold text-gray-600">Rs. {item.subtotal || item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Notice */}
                <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-[#FF5722] shrink-0" />
                  <span>
                    FoodRaja calls you on <strong>{order.customerInfo?.phone}</strong> for all order updates.
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
