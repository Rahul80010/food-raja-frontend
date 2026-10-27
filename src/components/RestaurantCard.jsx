import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Bike, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RestaurantCard({ restaurant }) {
  const isOpen = restaurant.isOpenNow;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-orange-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      
      {/* Cover Image & Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={restaurant.coverImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80'}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Real Open/Closed Status Badge */}
        <div className="absolute top-3 left-3">
          {isOpen ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600/90 text-white backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
              Open Now
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600/90 text-white backdrop-blur-md shadow-sm">
              <AlertCircle className="w-3.5 h-3.5" />
              Closed
            </span>
          )}
        </div>

        {/* Delivery Availability Badge */}
        <div className="absolute top-3 right-3">
          {restaurant.isDeliveryAvailable ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 backdrop-blur-md shadow-sm">
              <Bike className="w-3.5 h-3.5 text-[#FF5722]" />
              Delivery Avail.
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-900/80 text-white backdrop-blur-md shadow-sm">
              Dine-in Only
            </span>
          )}
        </div>

        {/* Restaurant Logo & Name overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end gap-3">
          {restaurant.logo && (
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md bg-white shrink-0"
            />
          )}
          <div className="text-white min-w-0 flex-1">
            <h3 className="font-extrabold text-lg text-white leading-tight truncate drop-shadow-sm group-hover:text-orange-200 transition-colors">
              {restaurant.name}
            </h3>
            <p className="text-xs text-gray-200 truncate flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#FF5722] shrink-0" />
              {restaurant.locality || restaurant.address}
            </p>
          </div>
        </div>
      </div>

      {/* Details Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Cuisines Tags */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {restaurant.cuisineCategories?.map((cat, idx) => (
              <span
                key={idx}
                className="text-[11px] font-semibold bg-cream-100 text-[#c2410c] px-2.5 py-0.5 rounded-md border border-orange-200/50"
              >
                {cat}
              </span>
            ))}
          </div>
          {restaurant.description && (
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
              {restaurant.description}
            </p>
          )}
        </div>

        {/* Meta info: Hours, Delivery fee & Min order */}
        <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
          {restaurant.openingHours && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" /> Hours
              </span>
              <span className="font-medium text-gray-800">
                {restaurant.openingHours.open} – {restaurant.openingHours.close}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-gray-400">Delivery Fee</span>
            <span className="font-bold text-gray-900">
              {restaurant.deliveryFee > 0 ? `Rs. ${restaurant.deliveryFee}` : 'Free Delivery'}
            </span>
          </div>

          {restaurant.minOrderAmount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Min. Order</span>
              <span className="font-medium text-gray-700">Rs. {restaurant.minOrderAmount}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link
          to={`/restaurant/${restaurant.slug || restaurant.id}`}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            isOpen
              ? 'bg-[#FF5722] hover:bg-[#E64A19] text-white shadow-md shadow-orange-500/20'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          <span>{isOpen ? 'View Full Menu' : 'View Menu (Closed)'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

      </div>

    </div>
  );
}
