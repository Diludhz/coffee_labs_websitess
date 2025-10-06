import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TopCategories.css";

// Image paths - assuming images are in the public/assets/ directory
const PLACEHOLDER_IMAGES = {
  coffeeMachines: '/assets/C-bg1.jpeg',
  coffeePowders: '/assets/C-bg2.jpeg',
  syrups: '/assets/C-bg3.jpeg',
  other: '/assets/C-bg4.jpeg'
};

function TopCategory() {
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Create categories with proper image paths and descriptions
    const categoriesWithImages = [
      {
        id: 1,
        item: "Coffee Machines",
        image: PLACEHOLDER_IMAGES.coffeeMachines,
        description: "Professional grade coffee machines and equipment for high-volume operations",
        categoryId: 'coffee-machines'
      },
      {
        id: 2,
        item: "Coffee Powders",
        image: PLACEHOLDER_IMAGES.coffeePowders,
        description: "Premium wholesale coffee powders and blends for cafes, restaurants, and businesses",
        categoryId: 'coffee-powders'
      },
      {
        id: 3,
        item: "Syrups & Sauces",
        image: PLACEHOLDER_IMAGES.syrups,
        description: "Premium flavoring syrups and sauces to enhance your coffee experience",
        categoryId: 'syrups'
      },
      {
        id: 4,
        item: "Accessories",
        image: PLACEHOLDER_IMAGES.other,
        description: "Essential coffee accessories and equipment for the perfect brew",
        categoryId: 'accessories'
      }
    ];

    setDisplayedCategories(categoriesWithImages);
  }, []);

  const handleExploreMore = (e) => {
    e.preventDefault();
    navigate('/products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="section-container">
      <div className="top-category-container">
        <div className="header-container">
          <div className="section-header">
            <h2 className="heading">Our Premium Categories</h2>
            <p className="sub-text">Discover our wide range of high-quality coffee products and equipment</p>
          </div>
          <button className="explore-more-btn" onClick={handleExploreMore}>
            View Catalog
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="categories-grid">
          {displayedCategories.map((category, index) => (
            <div 
              key={index} 
              className="category-card"
              onClick={() => {
                if (category.categoryId) {
                  navigate(`/products?category=${encodeURIComponent(category.categoryId)}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <img
                src={category.image}
                alt={category.item}
                className="category-image"
              />
              <div className="category-content">
                <h3 className="category-name">{category.item}</h3>
                <p className="category-description">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopCategory;
