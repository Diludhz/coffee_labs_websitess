import React, { useEffect } from 'react';
import './utils/resizeObserverFix'; // Add ResizeObserver error handling
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TopCategories from './components/TopCategories';
import EquipmentSection from './components/EquipmentSection';
import ProductsManagement from './components/ProductsManagement';
import SuccessPartners from './components/SuccessPartners';
import BookingSlot from './components/BookingSlot';
import AppDownload from './components/AppDownload';
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
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname]);
  
  return (
    <>
      <main>
        <section id="home"> <Hero /> </section>
        <section id="about"> <About /> </section>
        <section id="products"> <TopCategories /> </section>
        <SuccessPartners />
        <section id="equipment"> <EquipmentSection /> </section>
        <AppDownload />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/products" element={<ProductsManagement />} />
        <Route path="/category/:categoryId" element={<ProductsManagement />} />
        <Route path="/book" element={<BookingSlot />} />
      </Routes>
    </div>
  );
}

export default App;
