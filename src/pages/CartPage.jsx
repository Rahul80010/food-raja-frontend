import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Phone,
  User,
  MapPin,
  FileText,
  AlertCircle,
  CreditCard,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { submitOrder } from '../services/api';

export default function CartPage() {
  const {
    items,
    restaurant,
    itemCount,
    subtotal,
    deliveryFee,
    tax,
    total,
    minOrderMet,
    updateQuantity,
    removeItem,
    clearCart
  } = useCart();

  const { user, token, isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();

  // Checkout Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    locality: user?.locality || restaurant?.locality || '',
    landmark: '',
    instructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Synchronize user profile into form when authenticated
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
        locality: user.locality || prev.locality || (restaurant?.locality || '')
      }));
    }
  }, [user, restaurant]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckout = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number so the FoodRaja team can call you.');
      return;
    }

    if (!formData.address.trim()) {
      setErrorMessage('Please enter your complete delivery address.');
      return;
    }

    if (!minOrderMet) {
      setErrorMessage(`Minimum order for ${restaurant?.name} is Rs. ${restaurant?.minOrderAmount}.`);
      return;
    }

    try {
      setIsSubmitting(true);
      
      const payload = {
        restaurantId: restaurant.id,
        items: items.map(i => ({
          foodId: i.foodId,
          quantity: i.quantity,
          customization: i.customization || {}
        })),
        customerInfo: {
          name: formData.name.trim(),
          phone: cleanPhone,
          address: formData.address.trim(),
          locality: formData.locality || restaurant?.locality,
          landmark: formData.landmark.trim(),
          instructions: formData.instructions.trim()
        },
        paymentMethod,
        idempotencyKey: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      };

      const result = await submitOrder(payload, token);

      // Order created successfully! Clear cart & redirect
      clearCart();
      navigate(`/order-success/${result.orderNumber}`, {
        state: {
          orderNumber: result.orderNumber,
          finalTotal: result.finalTotal,
          customerName: formData.name,
          restaurantName: restaurant?.name
        }
      });
    } catch (err) {
      setErrorMessage(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-5">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-[#FF5722]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-[#1E2022]">Your Cart is Empty</h2>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          Explore our handpicked local restaurants and add delicious fresh food to your order!
        </p>
        <Link
          to="/restaurants"
          className="inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
        >
          <span>Browse Restaurants</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[#1E2022]">Complete Your Order</h1>
        <p className="text-xs text-gray-500 mt-1">
          Ordering from: <strong className="text-gray-900 font-bold">{restaurant?.name}</strong> ({restaurant?.locality})
        </p>
      </div>

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Delivery Form & Payment Option */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* If NOT logged in: Show Login Gate Card */}
          {!isAuthenticated ? (
            <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50/40 p-6 sm:p-8 rounded-3xl border-2 border-[#FF5722]/30 shadow-sm space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-orange-100">
                <div className="w-10 h-10 rounded-2xl bg-[#FF5722] text-white flex items-center justify-center font-black text-base shadow-md shadow-orange-500/20">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#1E2022]">Log In to Place Order</h3>
                  <p className="text-xs text-gray-500">Sign in with mobile number • Personal phone confirmation</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-orange-100 rounded-xl text-[#FF5722] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900">Why Log In Before Ordering?</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      FoodRaja coordinators manually call the restaurant to verify availability and call your mobile number to confirm hot food preparation. Logging in with your verified phone number allows us to contact you and track your order smoothly.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="py-3 px-4 bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl font-black text-xs shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Log In with Phone</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openAuthModal('register')}
                    className="py-3 px-4 bg-white hover:bg-orange-50 border-2 border-[#FF5722] text-[#FF5722] rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-[#FF5722]" />
                    <span>Create Free Account</span>
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 text-center">
                ✨ Browsing restaurant dishes and prices is always open. Login is only required when placing an order.
              </p>
            </div>
          ) : (
            /* If Logged In: Delivery Information Form */
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-orange-100 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF5722] flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[#1E2022]">Delivery Details</h3>
                    <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Logged in as {user?.name} ({user?.phone})</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="text-[11px] text-[#FF5722] hover:underline font-bold"
                >
                  Switch Account
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Phone Number (For Calling) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 98401 23456"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 block mt-1">Our coordinator calls you on this number to confirm.</span>
                </div>

              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Delivery Address (House/Flat, Street) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <textarea
                    name="address"
                    required
                    rows="2"
                    placeholder="e.g. Flat 3B, Sunshine Apartments, 5th Cross Street"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    placeholder="e.g. Near Big Temple or Water Tank"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Cooking / Delivery Instructions
                  </label>
                  <input
                    type="text"
                    name="instructions"
                    placeholder="e.g. Less spicy, call upon arrival"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
                  />
                </div>
              </div>

            </div>
          )}

          {/* Payment Method Selector */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-orange-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF5722] flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#1E2022]">Payment Method</h3>
                <p className="text-xs text-gray-500">Pay when your order arrives or mock online payment</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'cod'
                    ? 'border-[#FF5722] bg-orange-50/40'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 text-[#FF5722] focus:ring-[#FF5722]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-sm text-gray-900">Cash on Delivery (COD)</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Pay in cash or UPI QR upon receiving your hot meal.
                  </p>
                </div>
              </label>

              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'online'
                    ? 'border-[#FF5722] bg-orange-50/40'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  className="mt-1 text-[#FF5722] focus:ring-[#FF5722]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold text-sm text-gray-900">Online Payment (Mock)</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Instant verification demo for test checkout.
                  </p>
                </div>
              </label>

            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-xl mt-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Manual verification guarantee: We call you to re-confirm before food is prepared.</span>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Placement */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-[#1E2022]">Order Items</h3>
              <button
                onClick={clearCart}
                className="text-xs text-rose-500 hover:underline flex items-center gap-1 font-bold"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            </div>

            {/* Items List */}
            <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.foodId} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm text-[#1E2022] truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">Rs. {item.price} each</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-gray-100 rounded-lg px-2 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.foodId, -1)}
                        className="p-1 hover:text-[#FF5722]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-bold text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.foodId, 1)}
                        className="p-1 hover:text-[#FF5722]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-extrabold text-sm text-gray-900 w-16 text-right">
                      Rs. {item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal</span>
                <span className="font-semibold text-gray-900">Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Restaurant Delivery Fee</span>
                <span className="font-semibold text-gray-900">Rs. {deliveryFee}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes (5% GST)</span>
                <span className="font-semibold text-gray-900">Rs. {tax}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between text-base font-black text-[#1E2022]">
                <span>To Pay</span>
                <span className="text-[#FF5722]">Rs. {total}</span>
              </div>
            </div>

            {/* Min order check warning */}
            {!minOrderMet && (
              <div className="bg-amber-50 text-amber-800 text-xs p-3 rounded-xl border border-amber-200">
                Minimum order amount for {restaurant?.name} is Rs. {restaurant?.minOrderAmount}. Please add Rs. {restaurant?.minOrderAmount - subtotal} more to checkout.
              </div>
            )}

            {/* Place Order Button */}
            {!isAuthenticated ? (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="w-full py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all bg-[#FF5722] hover:bg-[#E64A19] text-white shadow-orange-500/25 active:scale-95"
              >
                <Lock className="w-4 h-4" />
                <span>Log In to Place Order (Rs. {total})</span>
              </button>
            ) : (
              <button
                onClick={handleCheckout}
                disabled={isSubmitting || !minOrderMet}
                className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isSubmitting || !minOrderMet
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#FF5722] hover:bg-[#E64A19] text-white shadow-orange-500/25 active:scale-95'
                }`}
              >
                <span>{isSubmitting ? 'Placing Order...' : `Confirm & Place Order (Rs. ${total})`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <p className="text-[11px] text-gray-400 text-center leading-tight">
              By clicking "Confirm & Place Order", your request is sent to our manual dispatch center. We do not charge cancellation fees prior to restaurant confirmation.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
