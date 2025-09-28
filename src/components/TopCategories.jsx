import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import '../styles/TopCategories.css';

const TopCategories = () => {
  const categories = [
    {
      id: 1,
      title: 'Coffee Machines',
      description: 'High-performance machines for businesses',
      bgColor: '#f8f9fa',
      textColor: '#333333'
    },
    {
      id: 2,
      title: 'Coffee Powders',
      description: 'Premium quality coffee for perfect extraction',
      bgColor: '#f1f3f5',
      textColor: '#333333'
    },
    {
      id: 3,
      title: 'Syrups',
      description: 'Essential for enhancing coffee flavors',
      bgColor: '#e9ecef',
      textColor: '#333333'
    },
    {
      id: 4,
      title: 'Accessories',
      description: 'Essential tools for your coffee setup',
      bgColor: '#dee2e6',
      textColor: '#333333'
    }
  ];

  return (
    <section className="top-categories-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Top Categories</h2>
          <p className="section-subtitle">Explore our premium selection of coffee products</p>
        </div>
        
        <div className="categories-grid">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="category-card"
              style={{ 
                backgroundColor: category.bgColor,
                color: category.textColor
              }}
            >
              <div className="card-content">
                <h3 className="category-title">{category.title}</h3>
                <p className="category-description">{category.description}</p>
                <Link 
                  to={`/products?category=${encodeURIComponent(category.title)}`} 
                  className="view-btn"
                >
                  Chat with as
                </Link>
              </div>
            </div>
          ))}
        </div>
    
      </div>
    </section>
  );
};

export default TopCategories;
