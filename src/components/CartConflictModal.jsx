import React from 'react';
import { AlertTriangle, Trash2, ArrowRight, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartConflictModal() {
  const { conflictState, confirmReplaceCart, cancelConflict } = useCart();

  if (!conflictState) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-orange-100 space-y-5 animate-scale-up">
        
        {/* Header Icon */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={cancelConflict}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h3 className="text-xl font-black text-[#1E2022]">
            Start a fresh cart?
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your cart already contains items from{' '}
            <strong className="text-gray-900 font-bold">{conflictState.currentRestaurantName}</strong>.
          </p>
          <p className="text-xs text-gray-500 bg-orange-50/70 p-3 rounded-xl border border-orange-200/60 leading-normal">
            To ensure fresh, timely delivery, FoodRaja coordinates orders from <strong>one restaurant at a time</strong>. Would you like to clear your current cart and add items from <strong className="text-[#FF5722]">{conflictState.newRestaurantName}</strong>?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={cancelConflict}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors order-2 sm:order-1"
          >
            Keep Current Cart
          </button>
          <button
            onClick={confirmReplaceCart}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#FF5722] hover:bg-[#E64A19] shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 order-1 sm:order-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear & Add New</span>
          </button>
        </div>

      </div>
    </div>
  );
}
