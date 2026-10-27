import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, ChefHat, ArrowRight, Utensils } from 'lucide-react';
import { searchFoods } from '../services/api';
import FoodItemCard from '../components/FoodItemCard';
import { FoodSkeleton } from '../components/LoadingSkeleton';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(q);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    if (q) {
      performSearch(q);
    }
  }, [q, vegOnly, maxPrice]);

  const performSearch = async (queryText) => {
    if (!queryText.trim()) return;
    try {
      setLoading(true);
      const res = await searchFoods({
        q: queryText,
        vegOnly,
        maxPrice
      });
      setResults(res.data || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
      performSearch(searchTerm.trim());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Search Header */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-3xl font-black text-[#1E2022]">Search Dishes Across Restaurants</h1>
        <p className="text-xs text-gray-500">
          Find your favorite biryani, curry, parotta, or dessert from verified local kitchens.
        </p>

        <form onSubmit={handleFormSubmit} className="relative">
          <input
            type="text"
            placeholder="Search dish name, e.g. Biryani, Butter Naan, Dosa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-28 py-3.5 bg-white border-2 border-orange-200 rounded-2xl text-sm font-semibold text-gray-900 shadow-md focus:outline-none focus:border-[#FF5722]"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF5722] hover:bg-[#E64A19] text-white px-5 py-2 rounded-xl text-xs font-bold shadow transition-all"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
              vegOnly
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            🌱 Pure Veg Only
          </button>

          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs font-bold text-gray-600 focus:outline-none"
          >
            <option value="">Any Price</option>
            <option value="150">Under Rs. 150</option>
            <option value="250">Under Rs. 250</option>
            <option value="350">Under Rs. 350</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => <FoodSkeleton key={i} />)}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Found {results.length} dishes
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map(item => (
                <div key={item.id} className="relative">
                  <div className="text-[11px] font-bold text-gray-500 mb-1 flex items-center justify-between px-1">
                    <span>From: <strong className="text-gray-800">{item.restaurantName}</strong> ({item.locality})</span>
                    <Link
                      to={`/restaurant/${item.restaurantSlug || item.restaurantId}`}
                      className="text-[#FF5722] hover:underline flex items-center gap-0.5"
                    >
                      View Menu <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <FoodItemCard
                    item={item}
                    restaurant={{
                      id: item.restaurantId,
                      name: item.restaurantName,
                      slug: item.restaurantSlug,
                      locality: item.locality
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : q ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200 space-y-3">
            <ChefHat className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-bold text-gray-800">No dishes matched "{q}"</h3>
            <p className="text-xs text-gray-500">
              Try searching for common items like Biryani, Parotta, Fried Rice, Burger, or Dosa.
            </p>
          </div>
        ) : null}
      </div>

    </div>
  );
}
