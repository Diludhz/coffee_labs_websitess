import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaStar, FaStarHalfAlt, FaDownload } from "react-icons/fa";
import productsData from "../data/products.json";
import "../styles/ProductDetailsPage.css";

const ProductDetails = ({ onAddToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const findProduct = () => {
      const allProducts = productsData.Products.flatMap(category => 
        category.items.map(item => ({
          ...item,
          category: category.category,
          images: [
            item.image1,
            item.image2 || item.image1,
            item.image3 || item.image1
          ].filter(Boolean)
        }))
      );

      const normalizedId = String(productId);
      const foundProduct = allProducts.find(item => String(item.id) === normalizedId);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        console.error('Product not found:', productId);
      }
      setLoading(false);
    };
    
    findProduct();
  }, [productId]);


  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  return (
    <div className="product-page">
      <button className="back-button" onClick={() => navigate(-1)} aria-label="Back to products">
        <FaArrowLeft />
        <span className="back-button-text">Back to Products</span>
      </button>

      <div className="product-container">
        {/* Left Side - Images */}
        <div className="product-gallery">
          <div className="main-image-container">
            <img 
              src={product.images[selectedImage]} 
              alt={product.title}
              className="main-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x500?text=Image+Not+Available';
              }}
            />
          </div>
          <div className="thumbnail-container">
            {product.images.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={img} 
                  alt={`${product.title} ${index + 1}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100?text=Image+Not+Available';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product.title}</h1>
            <h2 className="product-subtitle">{product.subtitle}</h2>
            
            <div className="rating-container">
              <div className="rating">
                <span className="rating-number">{product.rating.toFixed(1)}</span>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`star ${star <= Math.floor(product.rating) ? 'filled' : ''}`}>
                      {star <= Math.floor(product.rating) ? (
                        <FaStar />
                      ) : star === Math.ceil(product.rating) && product.rating % 1 > 0 ? (
                        <FaStarHalfAlt />
                      ) : (
                        <FaStar />
                      )}
                    </span>
                  ))}
                </div>
                <span className="review-count">({product.reviewCount || 0} reviews)</span>
              </div>
              <div className="stock-status in-stock">In Stock</div>
            </div>
          </div>

          <div className="product-description">
            {product.small_description}
          </div>

          

          <div className="category-section">
            <div className="category">
              <span className="label">Category:</span>
              <span className="value">{product.category}</span>
            </div>
            {product.category_unit && (
              <div className="sizes">
                <span className="label">Available Sizes:</span>
                <div className="size-options">
                  {product.category_unit.map((size, index) => (
                    <span key={index} className="size-option">{size}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pricing">
            <div className="current-price">
              ${product.price.toFixed(2)}
            </div>
            {product.real_price && (
              <div className="original-price">
                ${product.real_price.toFixed(2)}
              </div>
            )}
          </div>

          <button className="order-app-button">
            <FaDownload /> Order in App
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="product-details-tabs">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`tab ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button 
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-content">
              <p>{product.main_description || product.small_description || 'No description available.'}</p>
            </div>
          )}
          
          {activeTab === 'features' && (
            <div className="features-content">
              <ul className="features-list">
                {product.features?.map((feature, index) => (
                  <li key={index}>
                    <span className="feature-bullet">•</span>
                    {feature}
                  </li>
                )) || (
                  <li>No features listed</li>
                )}
              </ul>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="reviews-content">
              <p>No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;