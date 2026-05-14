import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/layout/Preloader';

// Lazy Loading pages for performance optimization
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

// Simple Loading Indicator for Suspense
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-secondary-950">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-white/[0.08] border-t-white rounded-full animate-spin"></div>
      <p className="font-display font-black text-white text-xl tracking-[0.3em]">
        MOO<span className="text-primary-400">UN</span>
      </p>
    </div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Suspense>
  );
}

export default App;
