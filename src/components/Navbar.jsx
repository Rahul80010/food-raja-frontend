import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  PhoneCall,
  UtensilsCrossed,
  User,
  LogOut,
  ChevronDown,
  PackageCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { itemCount, total } = useCart();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#E64A19] to-[#FF7043] flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-[#1E2022]">FOOD<span className="text-[#FF5722]">RAJA</span></span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-[#E64A19] px-1.5 py-0.5 rounded-full">Manual Care</span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium hidden sm:block">Personal Call Confirmation on Every Order</p>
            </div>
          </Link>

          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search restaurant or delicious food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFDF9] border border-orange-200/80 rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] transition-all text-gray-800 placeholder-gray-400"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </form>

          {/* Right Navigation */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Track Order Link */}
            <Link
              to="/track"
              className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#FF5722] transition-colors px-2.5 py-2 rounded-lg hover:bg-orange-50 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Track Order</span>
            </Link>

            {/* Helpline Badge */}
            <div className="hidden lg:flex items-center gap-2 bg-cream-100 border border-orange-200/60 px-3 py-1.5 rounded-xl">
              <PhoneCall className="w-4 h-4 text-[#FF5722]" />
              <div className="text-left text-xs">
                <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">Owner Calling Desk</span>
                <span className="font-bold text-[#1E2022]">+91 98400 12345</span>
              </div>
            </div>

            {/* User Profile / Login Button */}
            {isAuthenticated ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded-xl text-xs font-bold text-gray-800 hover:bg-orange-100/80 transition-all shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FF5722] text-white flex items-center justify-center font-black text-[10px]">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:inline font-black text-gray-800">
                    {user?.name ? user.name.split(' ')[0] : 'Profile'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn text-xs">
                    <div className="px-3.5 py-2 border-b border-gray-100">
                      <p className="font-black text-gray-900 truncate">{user?.name}</p>
                      <p className="text-[10px] text-gray-400">{user?.phone}</p>
                    </div>

                    <Link
                      to="/my-orders"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-orange-50 font-semibold text-gray-700 transition-colors"
                    >
                      <PackageCheck className="w-4 h-4 text-[#FF5722]" />
                      <span>My Orders</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-rose-50 text-rose-600 font-semibold transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-orange-50/80 hover:bg-orange-100 border border-orange-200/80 text-[#FF5722] rounded-xl text-xs font-black shadow-sm transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
            )}

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-[#1E2022] hover:bg-[#FF5722] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all group shrink-0"
            >
              <div className="relative">
                <ShoppingBag className="w-4 sm:w-5 h-4 sm:h-5 group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF5722] group-hover:bg-white group-hover:text-[#FF5722] text-white text-[10px] sm:text-[11px] font-black w-4.5 sm:w-5 h-4.5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="text-[11px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-md font-bold">
                  Rs. {total}
                </span>
              )}
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
}
