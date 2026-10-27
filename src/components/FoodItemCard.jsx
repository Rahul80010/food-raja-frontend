import React from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { resolveAssetUrl } from '../services/api';

export default function FoodItemCard({ item, restaurant }) {
  const { items, addItem, updateQuantity } = useCart();
  
  const cartItem = items.find(ci => ci.foodId === item.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addItem(item, restaurant);
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-orange-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      
      <div className="flex gap-4">
        
        {/* Info Column */}
        <div className="flex-1 min-w-0">
          
          {/* Veg / Non-Veg Indicator */}
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`w-4 h-4 rounded-[4px] border flex items-center justify-center ${
                item.isVeg ? 'border-emerald-600 bg-emerald-50' : 'border-red-600 bg-red-50'
              }`}
              title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                }`}
              ></span>
            </span>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              {item.category}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-bold text-[#1E2022] text-base leading-snug group-hover:text-[#FF5722] transition-colors">
            {item.name}
          </h4>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-extrabold text-[#1E2022] text-base">
              Rs. {item.price}
            </span>
            {item.originalPrice > item.price && (
              <span className="text-xs text-gray-400 line-through">
                Rs. {item.originalPrice}
              </span>
            )}
          </div>

          {/* Description */}
          {item.description && (
            <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}

          {/* Customizations Tag */}
          {item.customization && item.customization.length > 0 && (
            <div className="mt-2 text-[10px] text-amber-700 bg-amber-50 border border-amber-200/60 inline-block px-2 py-0.5 rounded font-medium">
              Customizable options available
            </div>
          )}

        </div>

        {/* Image & Action Column */}
        <div className="relative w-28 sm:w-32 shrink-0 flex flex-col items-center">
          <div className="w-28 sm:w-32 h-24 sm:h-28 rounded-xl overflow-hidden bg-gray-100 shadow-inner">
            <img
              src={resolveAssetUrl(item.image) || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&auto=format&fit=crop&q=80'}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>

          {/* Add / Quantity Button Overlay */}
          <div className="mt-2 w-full">
            {!item.isAvailable ? (
              <span className="block text-center text-[11px] font-bold text-gray-400 bg-gray-100 py-1.5 px-3 rounded-lg">
                Unavailable
              </span>
            ) : inCartQty > 0 ? (
              <div className="flex items-center justify-between bg-[#1E2022] text-white rounded-xl px-2 py-1 shadow-sm w-full">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-sm">{inCartQty}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="w-full bg-white hover:bg-orange-50 text-[#FF5722] border-2 border-[#FF5722] font-black text-xs uppercase py-1.5 px-3 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-1 active:scale-95"
              >
                <span>Add</span>
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
