import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1C1E] text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Model */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E64A19] to-[#FF7043] flex items-center justify-center text-white">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white">FOOD<span className="text-[#FF5722]">RAJA</span></span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              FoodRaja brings your favorite local restaurant flavors straight to your door with personalized, human-centered order coordination.
            </p>
            <div className="flex items-center gap-2 text-xs text-orange-300 bg-orange-950/40 border border-orange-800/60 p-3 rounded-xl">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#FF5722]" />
              <span>Owner directly verifies food availability & updates you via phone!</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-[#FF5722] transition-colors">Home & Featured</Link></li>
              <li><Link to="/restaurants" className="hover:text-[#FF5722] transition-colors">Browse All Restaurants</Link></li>
              <li><Link to="/search" className="hover:text-[#FF5722] transition-colors">Search Delicious Dishes</Link></li>
              <li><Link to="/track" className="hover:text-[#FF5722] transition-colors">Live Order Tracking</Link></li>
              <li><Link to="/cart" className="hover:text-[#FF5722] transition-colors">Your Cart</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-[#FF5722] transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link to="/about-us" className="hover:text-[#FF5722] transition-colors">About Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#FF5722] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/shipping-and-delivery" className="hover:text-[#FF5722] transition-colors">Shipping &amp; Delivery</Link></li>
              <li><Link to="/refund-policy" className="hover:text-[#FF5722] transition-colors">Cancellation &amp; Refund Policy</Link></li>
            </ul>
          </div>

          {/* Col 3: Cuisines */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Popular Cuisines</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/restaurants?category=Biryani" className="hover:text-[#FF5722] transition-colors">Royal Dum Biryani</Link></li>
              <li><Link to="/restaurants?category=Chettinad" className="hover:text-[#FF5722] transition-colors">Chettinad & Bun Parotta</Link></li>
              <li><Link to="/restaurants?category=Pure%20Veg" className="hover:text-[#FF5722] transition-colors">Pure Veg South & North</Link></li>
              <li><Link to="/restaurants?category=Chinese" className="hover:text-[#FF5722] transition-colors">Indo-Chinese & Noodles</Link></li>
              <li><Link to="/restaurants?category=Cafe" className="hover:text-[#FF5722] transition-colors">Burgers & Artisanal Bakes</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Manual Care */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Order Desk Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF5722] shrink-0 mt-1" />
                <span>FoodRaja Operations Hub, Central Anna Salai, Chennai - 600002</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF5722] shrink-0" />
                <a href="tel:+919840012345" className="hover:text-white transition-colors">+91 98400 12345</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FF5722] shrink-0" />
                <span>orders@foodraja.local</span>
              </div>
              <div className="pt-2 text-xs text-gray-500">
                Operating Hours: 08:00 AM – 11:30 PM Everyday
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} FoodRaja Technologies. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for authentic food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
