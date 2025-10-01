import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaArrowLeft,
  FaSearch, 
  FaTimes, 
  FaBox,
  FaSync,
  FaBolt,
  FaFire,
  FaMugHot,
  FaWineBottle,
  FaTint,
  FaTools,
  FaCog
} from 'react-icons/fa';
import { GiCoffeeBeans, GiCoffeePot, GiCoffeeCup, GiBottleVapors } from 'react-icons/gi';
import { AiOutlineGift } from 'react-icons/ai';
import productsData from '../data/products.json';
import '../styles/Products.css';

const Products = ({ onAddToCart }) => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);
  const productsPerPage = 24;
  const searchRef = useRef(null);

  // Handle URL parameters for category filtering
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      // Map display names to category IDs
      const categoryMapping = {
        'Coffee Machines': 'coffee-machines',
        'Coffee Powders': 'coffee-powders',
        'Syrups': 'syrups',
        'Accessories': 'accessories',
        'Tea Milk': 'tea-milk',
        'Spreads': 'spreads',
        'Cleaners Filters': 'cleaners-filters',
        'Chocolate Chip': 'chocolate-chip',
        'Packing': 'packing',
        'Sauce': 'sauce',
        'Coffee': 'coffee'
      };
      
      const categoryId = categoryMapping[categoryParam] || categoryParam;
      setActiveCategory(categoryId);
      
      // Scroll to top when category changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.search]);

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
      'all': <FaBox className="category-icon" />,
      'tea-milk': <FaMugHot className="category-icon" />,
      'spreads': <GiCoffeeBeans className="category-icon" />,
      'coffee-machines': <GiCoffeePot className="category-icon" />,
      'cleaners-filters': <FaTools className="category-icon" />,
      'chocolate-chip': <GiCoffeeBeans className="category-icon" />,
      'accessories': <FaCog className="category-icon" />,
      'packing': <FaBox className="category-icon" />,
      'coffee-powders': <GiCoffeeBeans className="category-icon" />,
      'sauce': <FaWineBottle className="category-icon" />,
      'syrups': <GiBottleVapors className="category-icon" />,
      'coffee': <GiCoffeeCup className="category-icon" />
    };
    return icons[category] || <FaBox className="category-icon" />;
  }

  // Helper function to get active category name
  function getActiveCategoryName() {
    const category = categories.find(cat => cat.id === activeCategory);
    return category ? category.name : 'All Products';
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
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search products, categories, or descriptions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button 
                    className="search-button"
                    onClick={() => searchRef.current.focus()}
                    aria-label="Search"
                  >
                    <FaSearch />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

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

                    {/* Sort Options */}
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
                        className="reset-filters"
                        onClick={resetAllFilters}
                      >
                        Reset All Filters
                      </button>
                    </div>
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
      <div className="mobile-actions">
        <div className="mobile-actions-container">
          <button 
            className="mobile-action-btn"
            onClick={() => setShowFilters(true)}
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
          <div className="panel-footer">
            <button 
              className="apply-button"
              onClick={() => {
                document.querySelector('.modal-overlay').classList.remove('active');
                setShowFilters(false);
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Products;