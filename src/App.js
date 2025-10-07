import React, { useState, useEffect } from 'react';
import './utils/resizeObserverFix';
import { Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TopCategories from './components/TopCategories';
import Products from './components/Products';
import SuccessPartners from './components/SuccessPartners';
import AppDownload from './components/AppDownload';
import ImageStas from './components/ImageStas';
import Statistics from './components/Statistics';
import Footer from './components/Footer';

// Main content component for the landing page
const MainContent = () => {
  const { pathname } = useLocation();
  
  // Smooth scroll for anchor links
  useEffect(() => {
    if (pathname === '/') {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [pathname]);

  return (
    <>
      <main>
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <Statistics />
        <section id="products">
          <TopCategories />
        </section>
        <SuccessPartners />
        <AppDownload />
        <ImageStas />
      </main>
      <Footer />
    </>
  );
};

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // Increase quantity if exists
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      // Add new item to cart
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <Header cart={cart} />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route 
            path="/products" 
            element={
              <ErrorBoundary>
                <Products onAddToCart={addToCart} />
              </ErrorBoundary>
            } 
          />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
