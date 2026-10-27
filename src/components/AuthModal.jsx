import React, { useState } from 'react';
import { X, Lock, Phone, User, MapPin, AlertCircle, Loader2, UtensilsCrossed, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode, setAuthModalMode, login, register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    address: '',
    locality: ''
  });

  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');

    if (authModalMode === 'login') {
      if (!formData.phone.trim() || !formData.password.trim()) {
        setError('Please enter your phone number and password.');
        return;
      }
      try {
        await login(formData.phone.trim(), formData.password);
      } catch (err) {
        setError(err.message || 'Login failed. Please check your credentials.');
      }
    } else {
      // Register Mode
      if (!formData.name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (cleanPhone.length < 10) {
        setError('Please enter a valid 10-digit mobile number.');
        return;
      }
      if (!formData.password || formData.password.length < 4) {
        setError('Password must be at least 4 characters long.');
        return;
      }

      try {
        await register({
          name: formData.name.trim(),
          phone: cleanPhone,
          password: formData.password,
          address: formData.address.trim(),
          locality: formData.locality.trim()
        });
      } catch (err) {
        setError(err.message || 'Failed to create account.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-orange-100 overflow-hidden relative transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#FF5722] to-[#FF7043] p-6 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute right-4 top-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-white text-[#FF5722] flex items-center justify-center shadow-md">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <span className="font-black text-xl tracking-tight">FOODRAJA</span>
          </div>

          <h3 className="text-lg font-black leading-tight">
            {authModalMode === 'login' ? 'Welcome Back!' : 'Create FoodRaja Account'}
          </h3>
          <p className="text-xs text-orange-100 mt-1">
            {authModalMode === 'login'
              ? 'Log in to place your order and get live confirmation calls.'
              : 'Sign up in seconds to place your order with home delivery.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-gray-100 bg-orange-50/40 p-1.5 m-4 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('login');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
              authModalMode === 'login'
                ? 'bg-white text-[#FF5722] shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('register');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
              authModalMode === 'register'
                ? 'bg-white text-[#FF5722] shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl flex items-center gap-2 text-xs font-semibold animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {authModalMode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FF5722]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
              Mobile Phone Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                name="phone"
                required
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FF5722]"
              />
            </div>
            <span className="text-[10px] text-gray-400 mt-1 block">
              Used by FoodRaja owner to call and confirm food availability.
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                required
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FF5722]"
              />
            </div>
          </div>

          {authModalMode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                Default Delivery Address (Optional)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <textarea
                  name="address"
                  rows={2}
                  placeholder="House / Flat No, Street, Landmark"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FF5722]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl font-black text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{authModalMode === 'login' ? 'Log In & Continue' : 'Create Account & Order'}</span>
            )}
          </button>

          <div className="text-center pt-2">
            {authModalMode === 'login' ? (
              <p className="text-xs text-gray-500">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('register');
                    setError('');
                  }}
                  className="font-black text-[#FF5722] hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('login');
                    setError('');
                  }}
                  className="font-black text-[#FF5722] hover:underline"
                >
                  Log In
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
