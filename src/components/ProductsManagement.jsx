import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiPlus, FiFilter, FiX, FiStar, FiSearch } from 'react-icons/fi';
import '../styles/ProductsManagement.css';

const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/datas.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // Flatten products and add categorySlug
        const flattenedProducts = data.products.flatMap(category =>
          category.items.map(item => ({
            ...item,
            category: category.category,
            categorySlug: category.slug
          }))
        );

        // Update products and categories state
        setProducts(flattenedProducts);
        
        // Get categories with counts
        const categoriesData = data.products.map(category => ({
          id: category.id,
          name: category.category,
          slug: category.slug,
          count: category.items.length
        }));

        setProducts(flattenedProducts);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products based on search term and category
  const filteredProducts = React.useMemo(() => {
    if (loading) return [];
    
    return products.filter(product => {
      const matchesSearch = 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = 
        selectedCategory === 'all' || 
        product.categorySlug === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, products, loading]);

  const handleBuyNow = (productId) => {
    console.log(`Buy now clicked for product ${productId}`);
    // Add to cart logic here
  };

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug);
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  return (
    <section className="product-grid-section">
      <div className="product-grid-container">
        {/* Search and Filter Bar */}
        <div className="search-filter-container">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products by name, category, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {(searchTerm || selectedCategory !== 'all') && (
              <button 
                onClick={clearFilters}
                className="clear-filters"
                aria-label="Clear filters"
              >
                <FiX /> Clear filters
              </button>
            )}
          </div>
          
          <button 
            className="filter-toggle"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            aria-expanded={isFilterOpen}
            aria-label="Filter products"
          >
            <FiFilter /> {selectedCategory === 'all' ? 'Categories' : categories.find(c => c.slug === selectedCategory)?.name}
          </button>
        </div>
        
        {/* Category Filter */}
        <div className={`category-filter ${isFilterOpen ? 'open' : ''}`}>
          <div className="category-list">
            <button
              className={`category-item ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              All Products
              <span className="category-count">{products?.length || 0}</span>
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-item ${selectedCategory === category.slug ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.slug)}
              >
                {category.name}
                <span className="category-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Section Header */}
        <div className="section-header">
          <h1 className="section-title">
            {selectedCategory === 'all' 
              ? 'Our Products' 
              : categories.find(c => c.slug === selectedCategory)?.name}
          </h1>
          <p className="section-subtitle">
            {searchTerm 
              ? `Found ${filteredProducts.length} products matching "${searchTerm}"`
              : selectedCategory === 'all'
                ? 'Discover our premium selection of coffee products and accessories'
                : `${filteredProducts.length} products available`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                {/* Product Image */}
                <div className="product-image">
                  {product.badge && (
                    <span className={`product-badge ${product.badge.toLowerCase()}`}>
                      {product.badge}
                    </span>
                  )}
                  <img 
                    src={process.env.PUBLIC_URL + product.image} 
                    alt={product.title} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                    loading="lazy"
                  />
                  <button 
                    className="quick-view-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle quick view
                      console.log('Quick view:', product.id);
                    }}
                  >
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Product Content */}
                <div className="product-content">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.title}</h3>
                  
                  {/* Rating */}
                  <div className="product-rating">
                    {[...Array(5)].map((_, i) => {
                      const ratingValue = product.rating || 0;
                      const isFilled = i < Math.floor(ratingValue);
                      const isHalf = !isFilled && (i < Math.ceil(ratingValue));
                      
                      return (
                        <FiStar 
                          key={i} 
                          className={`star ${isFilled ? 'filled' : ''} ${isHalf ? 'half' : ''}`} 
                        />
                      );
                    })}
                    <span className="rating-count">
                      {product.rating ? product.rating.toFixed(1) : '0.0'}
                    </span>
                  </div>
                  
                  <p className="product-description">{product.description}</p>

                  {/* Product Info */}
                  <div className="product-info">
                    <div className="price-stock">
                      <div className="product-price">${product.price.toFixed(2)}</div>
                      {product.stock ? (
                        <div className="product-stock in-stock">In Stock</div>
                      ) : (
                        <div className="product-stock out-of-stock">Out of Stock</div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button 
                      className="buy-button"
                      onClick={() => handleBuyNow(product.id)}
                      disabled={!product.stock}
                    >
                      <div className="buy-button-content">
                        <FiShoppingCart className="cart-icon" />
                        <span>{product.stock ? 'ADD TO CART' : 'OUT OF STOCK'}</span>
                      </div>
                    </button>
                    <button 
                      className="wishlist-button" 
                      title="Add to wishlist"
                      aria-label="Add to wishlist"
                    >
                      <FiPlus className="plus-icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No products found matching "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button 
            className="quick-action-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <FiShoppingCart />
            Back to Top
          </button>
          <button 
            className="quick-action-btn"
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <FiFilter />
            Reset Filters
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;