import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartConflictModal from './components/CartConflictModal';
import AuthModal from './components/AuthModal';

import HomePage from './pages/HomePage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import CartPage from './pages/CartPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import SearchPage from './pages/SearchPage';
import MyOrdersPage from './pages/MyOrdersPage';
import TermsPage from './pages/TermsPage';
import SiteInfoPage from './pages/SiteInfoPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-[#FFFDF9] text-[#1E2022]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/restaurants" element={<RestaurantsPage />} />
                <Route path="/restaurant/:slug" element={<RestaurantDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CartPage />} />
                <Route path="/order-success/:orderNumber" element={<OrderSuccessPage />} />
                <Route path="/track" element={<OrderTrackingPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />
                <Route path="/terms-and-conditions" element={<TermsPage />} />
                <Route path="/about-us" element={<SiteInfoPage page="about" />} />
                <Route path="/privacy-policy" element={<SiteInfoPage page="privacy" />} />
                <Route path="/shipping-and-delivery" element={<SiteInfoPage page="shipping" />} />
                <Route path="/refund-policy" element={<SiteInfoPage page="refund" />} />
              </Routes>
            </main>
            <Footer />
            <CartConflictModal />
            <AuthModal />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
