import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TopCategories.css';

const TopCategories = () => {
  const categories = [
    {
      id: 1,
      title: 'Coffee Machines',
      categoryId: 'coffee-machines',
      description: 'High-performance machines for businesses',
      bgImage: '/assets/C-bg1.jpeg'
    },
    {
      id: 2,
      title: 'Coffee Powders',
      categoryId: 'coffee-powders',
      description: 'Premium quality coffee for perfect extraction',
      bgImage: '/assets/C-bg2.jpeg'
    },
    {
      id: 3,
      title: 'Syrups',
      categoryId: 'syrups',
      description: 'Essential for enhancing coffee flavors',
      bgImage: '/assets/C-bg3.jpeg'
    },
    {
      id: 4,
      title: 'Accessories',
      categoryId: 'accessories',
      description: 'Essential tools for your coffee setup',
      bgImage: '/assets/C-bg4.jpeg'
    }
  ];

  return (
    <section className="top-categories-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Top Categories</h2>
          <p className="section-subtitle">
            Explore our premium selection of coffee products
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              to={`/products?category=${category.categoryId}`}
              className="category-card"
              key={category.id}
              style={{ backgroundImage: `url(${category.bgImage})` }}
            >
              <div className="overlay"></div>
              <div className="card-content">
                <h3 className="category-title">{category.title}</h3>
                <p className="category-description">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
