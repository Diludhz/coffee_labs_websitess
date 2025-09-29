import React, { useState, useEffect, useRef } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaShoppingCart,
  FaArrowRight, 
  FaArrowLeft,
  FaTimes,
  FaFire,
  FaBolt
} from 'react-icons/fa';
import productsData from '../data/products.json';
import '../styles/Products.css';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);
  const productsPerPage = 24; // Increased from 12 to 24 to show more products
  const searchRef = useRef(null);

  // Enhanced categories with unique icons and counts
  const categories = [
    { 
      id: 'all', 
      name: 'All Products', 
      icon: '📦',
      count: productsData.Products.reduce((total, cat) => total + cat.items.length, 0)
    },
    ...productsData.Products.map(category => ({
      id: category.category,
      name: category.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      icon: getCategoryIcon(category.category),
      count: category.items.length
    }))
  ];

  // Helper function for category icons
  function getCategoryIcon(category) {
    const icons = {
      'coffee-beans': '☕',
      'brewing-equipment': '⚗️',
      'grinders': '⚙️',
      'accessories': '🎯',
      'gift-sets': '🎁',
      'subscriptions': '🔄'
    };
    return icons[category] || '📦';
  }

  // Enhanced product filtering with loading state
  useEffect(() => {
    setIsLoading(true);
    
    const filterTimer = setTimeout(() => {
      let allProducts = [];

      productsData.Products.forEach(category => {
        if (activeCategory === 'all' || activeCategory === category.category) {
          const productsWithCategory = category.items.map(item => ({
            ...item,
            category: category.category,
            discount: 0,
            inStock: Math.random() > 0.2 // 80% chance of being in stock
          }));
          allProducts = [...allProducts, ...productsWithCategory];
        }
      });

      // Search filter
      if (searchQuery) {
        allProducts = allProducts.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Price filter
      allProducts = allProducts.filter(
        product => {
          const finalPrice = product.discount ? 
            product.price * (1 - product.discount / 100) : product.price;
          return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
        }
      );

      // Sorting
      allProducts.sort((a, b) => {
        const getFinalPrice = (product) => 
          product.discount ? product.price * (1 - product.discount / 100) : product.price;

        switch (sortBy) {
          case 'price-low':
            return getFinalPrice(a) - getFinalPrice(b);
          case 'price-high':
            return getFinalPrice(b) - getFinalPrice(a);
          case 'rating':
            return parseFloat(b.rating) - parseFloat(a.rating);
          case 'trending':
            if (a.isTrending && !b.isTrending) return -1;
            if (!a.isTrending && b.isTrending) return 1;
            return 0;
          default: // 'featured'
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return Math.random() - 0.5;
        }
      });

      setFilteredProducts(allProducts);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(filterTimer);
  }, [activeCategory, searchQuery, priceRange, sortBy]);

  // Enhanced filter handlers
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Handle price range change
  const handlePriceChange = (e, index) => {
    const value = Math.min(Math.max(parseInt(e.target.value || 0), 0), 1000);
    const newPriceRange = [...priceRange];
    
    if (index === 0) {
      // Min thumb was moved
      if (value >= newPriceRange[1]) return; // Prevent min from exceeding max
      newPriceRange[0] = value;
    } else {
      // Max thumb was moved
      if (value <= newPriceRange[0]) return; // Prevent max from going below min
      newPriceRange[1] = value;
    }
    
    setPriceRange(newPriceRange);
  };

  // Add to cart function
  const addToCart = (product, e) => {
    e.stopPropagation();
    console.log('Added to cart:', product);
    // You can add toast notification here
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Enhanced pagination with better mobile support
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = window.innerWidth <= 768 ? 3 : 5;
    
    if (totalPages <= maxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pageNumbers.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 2) {
      endPage = 3;
    } else if (currentPage >= totalPages - 1) {
      startPage = totalPages - 2;
    }

    if (startPage > 2) {
      pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== '...' && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  // Reset all filters
  const resetAllFilters = () => {
    setPriceRange([0, 1000]);
    setSortBy('featured');
    setSearchQuery('');
    setActiveCategory('all');
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  // Get active category name
  const getActiveCategoryName = () => {
    const category = categories.find(cat => cat.id === activeCategory);
    return category ? category.name : 'All Products';
  };

  return (
    <div className="products-container">
      {/* Enhanced Hero Section */}
      <section className="products-hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Premium Coffee Essentials</h1>
          <p className="hero-subtitle">
            Curated selection of specialty beans, brewing equipment, and accessories for the perfect brew
          </p>
          
          {/* Enhanced Search System */}
          <div className="search-container">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search products, categories, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button 
                className="filter-toggle"
                onClick={toggleFilters}
                aria-label="Toggle filters"
              >
                <FaFilter />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="container">
        <div className="filters-grid">
          {/* Enhanced Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'active' : ''}`}>
            <div className="filters-header">
              <h3 className="filters-title">Filters & Sorting</h3>
              <button 
                className="close-filters" 
                onClick={toggleFilters}
                aria-label="Close filters"
              >
                <FaTimes />
              </button>
            </div>
            
            {/* Categories Section */}
            <div className="filter-group">
              <label className="filter-label">Categories</label>
              <div className="category-tags">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-tag ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <div className="category-info">
                      <span className="category-name">{category.name}</span>
                      <span className="category-count">({category.count})</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
          
            
            {/* Enhanced Sort Options */}
            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <div className="sort-options">
                <button 
                  className={`sort-option ${sortBy === 'featured' ? 'active' : ''}`}
                  onClick={() => setSortBy('featured')}
                >
                  <FaBolt /> Featured
                </button>
                <button 
                  className={`sort-option ${sortBy === 'trending' ? 'active' : ''}`}
                  onClick={() => setSortBy('trending')}
                >
                  <FaFire /> Trending
                </button>
                <button 
                  className={`sort-option ${sortBy === 'price-low' ? 'active' : ''}`}
                  onClick={() => setSortBy('price-low')}
                >
                  Price: Low to High
                </button>
                <button 
                  className={`sort-option ${sortBy === 'price-high' ? 'active' : ''}`}
                  onClick={() => setSortBy('price-high')}
                >
                  Price: High to Low
                </button>
                <button 
                  className={`sort-option ${sortBy === 'rating' ? 'active' : ''}`}
                  onClick={() => setSortBy('rating')}
                >
                  Top Rated
                </button>
              </div>
            </div>
            
            {/* Filter Actions */}
            <div className="filter-actions">
              <button 
                className="apply-filters"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </button>
              <button 
                className="reset-filters"
                onClick={resetAllFilters}
              >
                Reset All
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="results-section">
            {/* Enhanced Results Header */}
            <div className="results-header">
              <div className="results-meta">
                <h2>{getActiveCategoryName()}</h2>
                <p className="results-count">
                  {isLoading ? (
                    'Discovering amazing products...'
                  ) : (
                    `Found ${filteredProducts.length} products`
                  )}
                </p>
              </div>
              <div className="sort-by-mobile">
                <label htmlFor="sort-select">Sort by:</label>
                <select 
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="trending">Trending</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Curating your perfect selection...</p>
              </div>
            )}

            {/* Enhanced Products Grid */}
            {!isLoading && currentProducts.length > 0 ? (
              <div className="products-grid">
                {currentProducts.map((product) => {
                  const finalPrice = product.discount ? 
                    product.price * (1 - product.discount / 100) : product.price;

                  return (
                    <article key={product.id} className="product-card">
                     

                      {/* Product Image with Enhanced Overlay */}
                      <div className="product-image">
                        <img
                          src={product.image || '/api/placeholder/400/400'}
                          alt={product.title}
                          onError={(e) => {
                            e.target.src = '/api/placeholder/400/400';
                          }}
                          loading="lazy"
                        />
                        
                      </div>

                      {/* Enhanced Product Details */}
                      <div className="product-details">
                        <div className="product-header">
                          <h3 className="product-title">{product.title}</h3>
                          <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                            <span className="status-dot"></span>
                            <span className="status-text">
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                        </div>
                        <p className="product-description">{product.description}</p>
                        
                        {/* Price and Add to Cart Section */}
                        <div className="product-footer">
                          <span className="product-price">
                            {product.price.toFixed(2)} <span className="currency">SAR</span>
                          </span>
                          <button 
                            className={`add-to-cart-btn ${!product.inStock ? 'out-of-stock' : ''}`}
                            onClick={(e) => product.inStock && addToCart(product, e)}
                            disabled={!product.inStock}
                          >
                            <span className="button-text">
                              {product.inStock ? 'Add To Cart' : 'Out Of Stock'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : !isLoading && (
              /* Enhanced Empty State */
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No Products Found</h3>
                <p>We couldn't find any products matching your criteria. Try adjusting your search or filters.</p>
                <button 
                  className="reset-search-btn"
                  onClick={resetAllFilters}
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Enhanced Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="pagination">
                <button 
                  className={`pagination-btn prev ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <FaArrowLeft />
                </button>
                
                {getPageNumbers().map((number, index) => (
                  <button
                    key={index}
                    className={`pagination-btn ${currentPage === number ? 'active' : ''} ${number === '...' ? 'ellipsis' : ''}`}
                    onClick={() => handlePageChange(number)}
                    disabled={number === '...'}
                    aria-label={number === '...' ? 'More pages' : `Page ${number}`}
                  >
                    {number}
                  </button>
                ))}
                
                <button 
                  className={`pagination-btn next ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <FaArrowRight />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

  

      {/* Filter Overlay for Mobile */}
      {showFilters && (
        <div className="filter-overlay" onClick={toggleFilters}></div>
      )}
    </div>
  );
};

export default Products;