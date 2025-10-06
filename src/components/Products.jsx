import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaArrowLeft,
  FaSearch, 
  FaTimes, 
  FaBolt, 
  FaFire, 
  FaSlidersH,
  FaSortAmountDown,
  FaTags,
  FaBox,
  FaBoxOpen,
  FaMugHot,
  FaSync
} from 'react-icons/fa';
import { AiOutlineGift } from 'react-icons/ai';
import { 
  GiCoffeeBeans, 
  GiCoffeePot, 
  GiCoffeeCup 
} from 'react-icons/gi';
import productsData from '../data/products.json';
import '../styles/Products.css';

const Products = ({ onAddToCart }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeMobileTab, setActiveMobileTab] = useState(null);
  // Removed unused state variables
  // const [expandedFilters, setExpandedFilters] = useState({
  //   categories: true,
  //   price: true,
  //   rating: true,
  //   availability: true
  // });

  // Handle slider thumb drag with pointer events (works for mouse + touch)
  const handleThumbPointerDown = (e, type) => {
    e.preventDefault();
    const slider = e.currentTarget.closest('.price-slider');
    if (!slider) return;

    const sliderRect = slider.getBoundingClientRect();
    const sliderWidth = sliderRect.width;

    const getClientX = (evt) => {
      if (evt.touches && evt.touches.length) return evt.touches[0].clientX;
      if (evt.changedTouches && evt.changedTouches.length) return evt.changedTouches[0].clientX;
      return evt.clientX;
    };

    const moveHandler = (evt) => {
      const clientX = getClientX(evt);
      const x = Math.min(Math.max(0, clientX - sliderRect.left), sliderWidth);
      const percentage = (x / sliderWidth) * 100;
      const value = Math.round((percentage / 100) * 1000);

      if (type === 'min') {
        setPriceRange(prev => [Math.min(Math.max(0, value), prev[1] - 10), prev[1]]);
      } else {
        setPriceRange(prev => [prev[0], Math.max(Math.min(1000, value), prev[0] + 10)]);
      }
    };

    const upHandler = () => {
      document.removeEventListener('pointermove', moveHandler);
      document.removeEventListener('pointerup', upHandler);
      document.removeEventListener('touchmove', moveHandler);
      document.removeEventListener('touchend', upHandler);
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };

    document.addEventListener('pointermove', moveHandler, { passive: false });
    document.addEventListener('pointerup', upHandler);
    document.addEventListener('touchmove', moveHandler, { passive: false });
    document.addEventListener('touchend', upHandler);
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  };
  const [sortBy, setSortBy] = useState('featured');
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isLoading, setIsLoading] = useState(false);
  const productsPerPage = 24;
  const searchRef = useRef(null);
  const location = useLocation();

  // Enhanced categories with unique icons and counts
  const categories = [
    { 
      id: 'all', 
      name: 'All Products', 
      icon: <FaBoxOpen />,
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
      'all': <FaBox className="category-icon" />,
      'coffee-beans': <GiCoffeeBeans className="category-icon" />,
      'brewing-equipment': <GiCoffeePot className="category-icon" />,
      'grinders': <GiCoffeeCup className="category-icon" />,
      'accessories': <FaMugHot className="category-icon" />,
      'gift-sets': <AiOutlineGift className="category-icon" />,
      'subscriptions': <FaSync className="category-icon" />
    };
    return icons[category] || <FaBox className="category-icon" />;
  }

  // Helper function to get active category name
  function getActiveCategoryName() {
    const category = categories.find(cat => cat.id === activeCategory);
    return category ? category.name : 'All Products';
  }

  // Toggle mobile tab function
  const toggleMobileTab = (tab) => {
    setActiveMobileTab(activeMobileTab === tab ? null : tab);
  };

  // Toggle filters function
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    if (!showFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Close filters automatically on mobile after a selection
  const closeFiltersIfMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
      setShowFilters(false);
      document.body.style.overflow = 'auto';
      const overlay = document.querySelector('.modal-overlay');
      if (overlay) overlay.classList.remove('active');
    }
  };

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
    }, 500); // Simulate loading

    return () => clearTimeout(filterTimer);
  }, [searchQuery, activeCategory, priceRange, sortBy]); // Fixed: Added closing bracket and parenthesis

  // Read category from query string on first load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromQuery = params.get('category');
    if (categoryFromQuery) {
      setActiveCategory(categoryFromQuery);
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup function for body overflow
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Add to cart handler
  const addToCart = (product, e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * productsPerPage;
  const indexOfFirstItem = indexOfLastItem - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftBound = Math.max(2, currentPage - 1);
      const rightBound = Math.min(totalPages - 1, currentPage + 1);
      
      pageNumbers.push(1);
      
      if (leftBound > 2) {
        pageNumbers.push('...');
      }
      
      for (let i = leftBound; i <= rightBound; i++) {
        pageNumbers.push(i);
      }
      
      if (rightBound < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      if (rightBound < totalPages) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setPriceRange([0, 1000]);
    setSortBy('featured');
    setCurrentPage(1);
  };

  return (
    <div className="products-page">
      <div className="products-container">
        <div className="products-section">
          {/* Search Section */}
          <section className="search-section">
            <div className="container">
              <h1 className="products-heading">Our Products</h1>
              <div className="search-container">
                <div className="search-box">
                  <FaSearch className="search-icon" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    onFocus={() => setShowFilters(false)}
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Mobile Filters Bar */}
          <div className="mobile-filters-bar">
            <div className="mobile-filters-inner">
              <button 
                className={`mobile-filter-btn ${activeMobileTab === 'filters' ? 'active' : ''}`}
                onClick={() => toggleMobileTab('filters')}
              >
                <FaSlidersH /> Filters
              </button>
              <button 
                className={`mobile-filter-btn ${activeMobileTab === 'sort' ? 'active' : ''}`}
                onClick={() => toggleMobileTab('sort')}
              >
                <FaSortAmountDown /> Sort
              </button>
              <button 
                className={`mobile-filter-btn ${activeMobileTab === 'categories' ? 'active' : ''}`}
                onClick={() => toggleMobileTab('categories')}
              >
                <FaTags /> Categories
              </button>
            </div>
          </div>
          
          {/* Filter Overlay */}
          <div 
            className={`filter-overlay ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(false)}
          />

          {/* Main Content */}
          <div className="main-content">
            <div className="container">
              <div className="filters-grid">
                {/* Filters Sidebar */}
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
                    <div className="price-range-header">
                      <h3 className="price-range-title">Categories</h3>
                    </div>
                    <div className="category-tags">
                        {categories.map(category => (
                          <div 
                            key={category.id}
                            className={`category-tag ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => { setActiveCategory(category.id); closeFiltersIfMobile(); }}
                          >
                            <div className="category-info">
                              <span className="category-name">{category.name}</span>
                              <span className="category-count">({category.count})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                  </div>
                  {/* Price Range Section */}
                  <div className="filter-group">
                    <div className="price-range-header">
                      <h3 className="price-range-title">Price Range</h3>
                    </div>
                    <div className="price-range-content">
                        <div className="price-inputs">
                          <div className="price-input">
                            <label>Min Price (SAR)</label>
                            <input 
                              type="number" 
                              value={priceRange[0]} 
                              onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                              min="0"
                            />
                          </div>
                          <div className="price-input">
                            <label>Max Price (SAR)</label>
                            <input 
                              type="number" 
                              value={priceRange[1]} 
                              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                              min={priceRange[0]}
                            />
                          </div>
                        </div>
                        <div className="price-slider">
                          <div 
                            className="track" 
                            style={{
                              left: `${priceRange[0] / 1000 * 100}%`,
                              right: `${100 - (priceRange[1] / 1000 * 100)}%`
                            }} 
                          />
                          <div 
                            className="thumb" 
                            style={{ left: `${priceRange[0] / 1000 * 100}%` }}
                            onPointerDown={(e) => handleThumbPointerDown(e, 'min')}
                            onMouseDown={(e) => handleThumbPointerDown(e, 'min')}
                            onTouchStart={(e) => handleThumbPointerDown(e, 'min')}
                          />
                          <div 
                            className="thumb" 
                            style={{ left: `${priceRange[1] / 1000 * 100}%` }}
                            onPointerDown={(e) => handleThumbPointerDown(e, 'max')}
                            onMouseDown={(e) => handleThumbPointerDown(e, 'max')}
                            onTouchStart={(e) => handleThumbPointerDown(e, 'max')}
                          />
                        </div>
                      </div>
                  
                  </div>

                    {/* Sort Options */}
                  <div className="filter-group">
                    <div className="price-range-header">
                      <h3 className="price-range-title">Sort By</h3>
                    </div>
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
                      className="reset-filters"
                      onClick={resetAllFilters}
                    >
                      Reset All Filters
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
                  </div>

                  {/* Loading State */}
                  {isLoading && (
                    <div className="loading-state">
                      <div className="loading-spinner"></div>
                      <p>Curating your perfect selection...</p>
                    </div>
                  )}

                  {/* Enhanced Products Grid */}
                  {!isLoading && (
                    currentProducts.length > 0 ? (
                      <div className="products-grid">
                        {currentProducts.map((product) => {
                          // Check if there's a discount (real_price is higher than price)
                          const hasDiscount = product.real_price > product.price;
                          const finalPrice = hasDiscount ? product.price : product.real_price || product.price;

                          return (
                            <div 
                              key={product.id} 
                              className="product-card"
                            >
                              {/* Product Image with Enhanced Overlay */}
                              <div className="product-image">
                                <img
                                  src={product.image1 || 'https://via.placeholder.com/400x400.png?text=No+Image'}
                                  alt={product.title}
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400x400.png?text=Image+Not+Available';
                                  }}
                                  loading="lazy"
                                />
                              </div>

                              {/* Enhanced Product Details */}
                              <div className="product-details">
                                <div className="product-header">
                                  <h3 className="product-title">{product.title}</h3>
                                </div>
                                <p className="product-description">{product.description}</p>
                                
                                {/* Price and Add to Cart Section */}
                                <div className="product-footer">
                                  <div className="price-container">
                                  {hasDiscount ? (
                                    <>
                                      <span className="original-price">
                                        <img src="/assets/saudi_riyal.svg" alt="SAR" className="currency-symbol" />
                                        {product.real_price.toFixed(2)}
                                      </span>
                                      <span className="final-price">
                                        <img src="/assets/saudi_riyal.svg" alt="SAR" className="currency-symbol" />
                                        {finalPrice.toFixed(2)}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="final-price">
                                      <img src="/assets/saudi_riyal.svg" alt="SAR" className="currency-symbol" />
                                      {finalPrice.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                                  <button 
                                    className="add-to-cart-button"
                                    onClick={(e) => addToCart(product, e)}
                                    aria-label="Order in App"
                                  >
                                    Order in App
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
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
                    )
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
                          onClick={() => typeof number === 'number' ? handlePageChange(number) : null}
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
          </div>
        </div>

        {/* Filter Overlay for Mobile */}
        {showFilters && (
          <div className="filter-overlay" onClick={toggleFilters}></div>
        )}
      </div>

      {/* Mobile Action Buttons */}
      {!showFilters && (
      <div className="mobile-actions">
        <div className="mobile-actions-container">
          <button 
            className="mobile-action-btn"
            onClick={toggleFilters}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            Filter
          </button>
          
          <button 
            className="mobile-action-btn"
            onClick={() => {
              const panel = document.querySelector('.action-panel');
              if (panel) {
                panel.querySelector('.panel-title').textContent = 'Sort By';
                const content = panel.querySelector('.panel-content');
                // Create the sort options using DOM methods instead of innerHTML
                content.innerHTML = '';
                
                const optionGroup = document.createElement('div');
                optionGroup.className = 'option-group';
                
                const optionTitle = document.createElement('div');
                optionTitle.className = 'option-title';
                optionTitle.textContent = 'Sort Options';
                optionGroup.appendChild(optionTitle);
                
                // Create sort options
                const sortOptions = [
                  { id: 'sort-featured', value: 'featured', label: 'Featured' },
                  { id: 'sort-trending', value: 'trending', label: 'Trending' },
                  { id: 'sort-price-low', value: 'price-low', label: 'Price: Low to High' },
                  { id: 'sort-price-high', value: 'price-high', label: 'Price: High to Low' },
                  { id: 'sort-rating', value: 'rating', label: 'Top Rated' }
                ];
                
                sortOptions.forEach(option => {
                  const optionItem = document.createElement('div');
                  optionItem.className = `option-item ${sortBy === option.value ? 'active' : ''}`;
                  
                  const input = document.createElement('input');
                  input.type = 'radio';
                  input.id = option.id;
                  input.name = 'sort';
                  input.checked = sortBy === option.value;
                  
                  const label = document.createElement('label');
                  label.htmlFor = option.id;
                  label.className = 'option-label';
                  label.textContent = option.label;
                  
                  // Add click handler
                  optionItem.addEventListener('click', (e) => {
                    // Update active state
                    optionGroup.querySelectorAll('.option-item').forEach(el => el.classList.remove('active'));
                    optionItem.classList.add('active');
                    
                    // Update sort
                    setSortBy(option.value);
                    
                    // Close the modal
                    const modalOverlay = document.querySelector('.modal-overlay');
                    if (modalOverlay) {
                      modalOverlay.classList.remove('active');
                    }
                  });
                  
                  optionItem.appendChild(input);
                  optionItem.appendChild(label);
                  optionGroup.appendChild(optionItem);
                });
                
                content.appendChild(optionGroup);
                document.querySelector('.modal-overlay').classList.add('active');
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2v16"></path>
              <path d="M6 6l4-4 4 4"></path>
              <path d="M18 6v16"></path>
              <path d="M14 22l4-4 4 4"></path>
            </svg>
            Sort
          </button>
        </div>
      </div>
      )}

      {/* Modal Overlay */}
      <div className="modal-overlay" onClick={(e) => {
        if (e.target === e.currentTarget) {
          e.currentTarget.classList.remove('active');
          setShowFilters(false);
        }
      }}>
        <div className="action-panel">
          <div className="panel-header">
            <div className="panel-title">Filter</div>
            <button className="panel-close" onClick={() => {
              document.querySelector('.modal-overlay').classList.remove('active');
              setShowFilters(false);
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="panel-content">
            <div className="option-group">
              <div className="option-title">Price Range</div>
              <div className="price-range-slider">
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={priceRange[0]} 
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="range-slider"
                />
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="range-slider"
                />
                <div className="price-range-values">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <div className="option-group">
              <div className="option-title">Categories</div>
              {categories.map(category => (
                <div 
                  key={category.id}
                  className={`option-item ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setCurrentPage(1);
                    closeFiltersIfMobile();
                  }}
                >
                  <input 
                    type="radio" 
                    id={`cat-${category.id}`} 
                    name="category" 
                    checked={activeCategory === category.id}
                    readOnly
                  />
                  <label htmlFor={`cat-${category.id}`} className="option-label">
                    {category.name} ({category.count})
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="panel-footer" style={{ display: 'flex' }}>
            <button 
              className="reset-filters"
              onClick={() => {
                // Reset filters to defaults
                setSearchQuery('');
                setActiveCategory('all');
                setPriceRange([0, 1000]);
                setSortBy('featured');
                setCurrentPage(1);
                closeFiltersIfMobile();
              }}
            >
              Reset All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;