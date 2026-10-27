import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('foodraja_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [restaurant, setRestaurant] = useState(() => {
    try {
      const saved = localStorage.getItem('foodraja_cart_restaurant');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Conflict modal state when trying to add from a different restaurant
  const [conflictState, setConflictState] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('foodraja_cart_items', JSON.stringify(items));
      localStorage.setItem('foodraja_cart_restaurant', JSON.stringify(restaurant));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items, restaurant]);

  const addItem = (food, restaurantInfo, customization = {}) => {
    // Check if cart already has items from another restaurant
    if (items.length > 0 && restaurant && restaurant.id !== restaurantInfo.id) {
      setConflictState({
        pendingItem: food,
        pendingRestaurant: restaurantInfo,
        pendingCustomization: customization,
        currentRestaurantName: restaurant.name,
        newRestaurantName: restaurantInfo.name
      });
      return { conflict: true };
    }

    // Set restaurant if not set
    if (!restaurant || items.length === 0) {
      setRestaurant({
        id: restaurantInfo.id,
        name: restaurantInfo.name,
        slug: restaurantInfo.slug,
        locality: restaurantInfo.locality,
        deliveryFee: restaurantInfo.deliveryFee || 0,
        minOrderAmount: restaurantInfo.minOrderAmount || 0,
        phone: restaurantInfo.phone
      });
    }

    setItems(prev => {
      const existingIdx = prev.findIndex(item => item.foodId === food.id);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      } else {
        return [
          ...prev,
          {
            foodId: food.id,
            name: food.name,
            price: food.price,
            quantity: 1,
            isVeg: food.isVeg,
            image: food.image,
            category: food.category,
            customization
          }
        ];
      }
    });

    return { conflict: false };
  };

  const confirmReplaceCart = () => {
    if (!conflictState) return;
    const { pendingItem, pendingRestaurant, pendingCustomization } = conflictState;

    setRestaurant({
      id: pendingRestaurant.id,
      name: pendingRestaurant.name,
      slug: pendingRestaurant.slug,
      locality: pendingRestaurant.locality,
      deliveryFee: pendingRestaurant.deliveryFee || 0,
      minOrderAmount: pendingRestaurant.minOrderAmount || 0,
      phone: pendingRestaurant.phone
    });

    setItems([
      {
        foodId: pendingItem.id,
        name: pendingItem.name,
        price: pendingItem.price,
        quantity: 1,
        isVeg: pendingItem.isVeg,
        image: pendingItem.image,
        category: pendingItem.category,
        customization: pendingCustomization || {}
      }
    ]);

    setConflictState(null);
  };

  const cancelConflict = () => {
    setConflictState(null);
  };

  const updateQuantity = (foodId, delta) => {
    setItems(prev => {
      return prev
        .map(item => {
          if (item.foodId === foodId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeItem = (foodId) => {
    setItems(prev => prev.filter(item => item.foodId !== foodId));
  };

  const clearCart = () => {
    setItems([]);
    setRestaurant(null);
    localStorage.removeItem('foodraja_cart_items');
    localStorage.removeItem('foodraja_cart_restaurant');
  };

  // If all items removed, reset restaurant
  useEffect(() => {
    if (items.length === 0 && restaurant) {
      setRestaurant(null);
    }
  }, [items, restaurant]);

  const itemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const deliveryFee = restaurant ? Number(restaurant.deliveryFee || 0) : 0;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + deliveryFee + tax;
  const minOrderMet = !restaurant || !restaurant.minOrderAmount || subtotal >= restaurant.minOrderAmount;

  return (
    <CartContext.Provider
      value={{
        items,
        restaurant,
        itemCount,
        subtotal,
        deliveryFee,
        tax,
        total,
        minOrderMet,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        conflictState,
        confirmReplaceCart,
        cancelConflict
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
