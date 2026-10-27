import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, Phone, Bike, ShoppingBag, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';
import { fetchRestaurantDetails, resolveAssetUrl } from '../services/api';
import FoodItemCard from '../components/FoodItemCard';
import { FoodSkeleton } from '../components/LoadingSkeleton';
import { useCart } from '../context/CartContext';

export default function RestaurantDetailPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  
  const { items, restaurant: cartRestaurant, itemCount, total } = useCart();

  useEffect(() => {
    loadDetails();
  }, [slug]);

  const loadDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchRestaurantDetails(slug);
      setData(res.data);
      if (res.data?.menu?.length > 0) {
        setActiveCategory(res.data.menu[0].category);
      }
    } catch (err) {
      setError(err.message || 'Restaurant could not be loaded.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="h-64 bg-gray-200 rounded-3xl animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => <FoodSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-gray-800">{error || 'Restaurant not found'}</h2>
        <Link
          to="/restaurants"
          className="inline-flex items-center gap-2 bg-[#FF5722] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Restaurants
        </Link>
      </div>
    );
  }

  const { restaurant, menu } = data;
  const isThisRestaurantInCart = cartRestaurant && cartRestaurant.id === restaurant.id && itemCount > 0;

  return (
    <div className="pb-28">
      
      {/* Back button & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          to="/restaurants"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#FF5722] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Restaurants
        </Link>
      </div>

      {/* Hero Banner Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden border border-orange-100 shadow-md">
          
          {/* Cover Photo */}
          <div className="relative h-60 sm:h-72 w-full bg-gray-200">
            <img
              src={resolveAssetUrl(restaurant.coverImage) || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80'}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Badges overlay */}
            <div className="absolute top-4 right-4 flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md text-white shadow ${
                restaurant.isOpenNow ? 'bg-emerald-600/90' : 'bg-rose-600/90'
              }`}>
                {restaurant.isOpenNow ? 'Open Now' : 'Closed'}
              </span>
            </div>
          </div>

          {/* Restaurant Profile Info */}
          <div className="p-6 sm:p-8 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 -mt-16 sm:-mt-20">
              
              <div className="flex items-end gap-4">
                {restaurant.logo && (
                  <img
                    src={resolveAssetUrl(restaurant.logo)}
                    alt={restaurant.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-xl bg-white shrink-0"
                  />
                )}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-[#1E2022]">
                    {restaurant.name}
                  </h1>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5722] shrink-0" />
                    {restaurant.address}, {restaurant.locality}
                  </p>
                </div>
              </div>

              {/* Delivery Meta */}
              <div className="flex items-center gap-4 bg-orange-50/70 border border-orange-200/60 p-3 rounded-2xl text-xs w-full sm:w-auto">
                <div>
                  <span className="text-gray-400 block text-[10px] font-bold uppercase">Delivery Fee</span>
                  <span className="font-bold text-gray-900">
                    {restaurant.deliveryFee > 0 ? `Rs. ${restaurant.deliveryFee}` : 'Free Delivery'}
                  </span>
                </div>
                <div className="w-px h-7 bg-orange-200"></div>
                <div>
                  <span className="text-gray-400 block text-[10px] font-bold uppercase">Min Order</span>
                  <span className="font-bold text-gray-900">
                    {restaurant.minOrderAmount > 0 ? `Rs. ${restaurant.minOrderAmount}` : 'No Minimum'}
                  </span>
                </div>
                <div className="w-px h-7 bg-orange-200"></div>
                <div>
                  <span className="text-gray-400 block text-[10px] font-bold uppercase">Hours</span>
                  <span className="font-bold text-gray-900">
                    {restaurant.openingHours?.open} - {restaurant.openingHours?.close}
                  </span>
                </div>
              </div>

            </div>

            {restaurant.description && (
              <p className="text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed max-w-3xl">
                {restaurant.description}
              </p>
            )}

            {/* Cuisines */}
            <div className="flex flex-wrap gap-2 mt-4">
              {restaurant.cuisineCategories?.map((cat, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-lg"
                >
                  {cat}
                </span>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Menu Categories Bar (Sticky) */}
      <div className="sticky top-20 z-30 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-orange-100 py-3 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {menu?.map((catGroup, idx) => (
              <a
                key={idx}
                href={`#cat-${idx}`}
                onClick={() => setActiveCategory(catGroup.category)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                  activeCategory === catGroup.category
                    ? 'bg-[#1E2022] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                }`}
              >
                {catGroup.category} ({catGroup.items.length})
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {menu?.map((catGroup, idx) => (
          <section key={idx} id={`cat-${idx}`} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-black text-[#1E2022]">
                {catGroup.category}
              </h2>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {catGroup.items.length} dishes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {catGroup.items.map(item => (
                <FoodItemCard
                  key={item.id}
                  item={item}
                  restaurant={restaurant}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Floating Bottom Cart Bar if current restaurant items in cart */}
      {isThisRestaurantInCart && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-2xl mx-auto">
          <div className="bg-[#1E2022] text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-gray-700 animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF5722] flex items-center justify-center font-bold text-sm">
                {itemCount}
              </div>
              <div>
                <p className="font-extrabold text-sm">{restaurant.name}</p>
                <p className="text-xs text-gray-400">{itemCount} items selected • Rs. {total}</p>
              </div>
            </div>
            <Link
              to="/cart"
              className="bg-[#FF5722] hover:bg-[#E64A19] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>View Cart</span>
              <ShoppingBag className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
