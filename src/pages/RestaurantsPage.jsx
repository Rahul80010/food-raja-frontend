import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ChefHat, MapPin, Bike } from 'lucide-react';
import { fetchRestaurants } from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import { RestaurantSkeleton } from '../components/LoadingSkeleton';

export default function RestaurantsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocality, setSelectedLocality] = useState('');
  const [openOnly, setOpenOnly] = useState(false);

  useEffect(() => {
    loadData();
  }, [selectedCategory, selectedLocality]);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchRestaurants({
        category: selectedCategory,
        locality: selectedLocality
      });
      setRestaurants(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRestaurants = restaurants.filter(r => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) &&
        !r.locality.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (openOnly && !r.isOpenNow) {
      return false;
    }
    return true;
  });

  // Extract unique localities
  const localities = Array.from(new Set(restaurants.map(r => r.locality).filter(Boolean)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-[#FF7043] rounded-3xl p-6 sm:p-10 text-white shadow-lg shadow-orange-500/10">
        <div className="max-w-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
            All Kitchens & Messes
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">Find Local Restaurants</h1>
          <p className="text-orange-100 text-sm">
            Handpicked restaurants with confirmed operating hours and direct kitchen verification.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by restaurant name or area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          {/* Locality Selector */}
          <select
            value={selectedLocality}
            onChange={(e) => setSelectedLocality(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30"
          >
            <option value="">All Localities</option>
            {localities.map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>

          {/* Open Only Toggle */}
          <button
            onClick={() => setOpenOnly(!openOnly)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              openOnly
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${openOnly ? 'bg-white' : 'bg-emerald-500'}`}></span>
            <span>Open Now Only</span>
          </button>

          {/* Reset Filters */}
          {(search || selectedCategory || selectedLocality || openOnly) && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('');
                setSelectedLocality('');
                setOpenOnly(false);
              }}
              className="text-xs font-bold text-[#FF5722] hover:underline px-2 py-1"
            >
              Reset Filters
            </button>
          )}

        </div>

      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <RestaurantSkeleton key={i} />
          ))}
        </div>
      ) : filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200 space-y-3">
          <ChefHat className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-lg font-bold text-gray-800">No restaurants matched your filters</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try resetting your search query or locality filter to see all available partner restaurants.
          </p>
        </div>
      )}

    </div>
  );
}
