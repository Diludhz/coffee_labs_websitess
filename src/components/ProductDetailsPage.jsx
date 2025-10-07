import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
  FaFire,
  FaCheck,
} from "react-icons/fa";
import productsData from "../data/products.json";
import "../styles/ProductDetailsPage.css";

const ProductDetails = ({ onAddToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const findProduct = () => {
      // Flatten all products from all categories
      const allProducts = productsData.Products.flatMap(category => 
        category.items.map(item => ({
          ...item,
          category: category.category,
          // Ensure images is an array
          images: [
            item.image1,
            item.image2 || item.image1,
            item.image3 || item.image1
          ].filter(Boolean) // Remove any undefined values
        }))
      );

      // Find the product by ID
      const foundProduct = allProducts.find(item => item.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        console.error('Product not found:', productId);
      }
      setLoading(false);
    };
    
    findProduct();
  }, [productId]);

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  return (
    <div className="unique-product-page">
      <button className="go-back" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Products
      </button>

      <div className="product-layout">
        {/* Left Image Section */}
        <div className="product-image-side">
          <div className="image-frame">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="main-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x500?text=Image+Not+Available';
              }}
            />
            <div className="trend-tag">
              <FaFire /> Trending Now
            </div>
          </div>
          <div className="image-thumbs">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index}`}
                className={`thumb-img ${
                  selectedImage === index ? "active" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Info Section */}
        <div className="product-info-side">
          <div className="product-header">
            <h1 className="product-name">{product.title}</h1>
            {product.subtitle && <h2 className="product-subtitle">{product.subtitle}</h2>}
          </div>

          <div className="rating-box">
            <div className="stars">
              {[...Array(5)].map((_, i) =>
                i < Math.floor(product.rating) ? (
                  <FaStar key={i} className="star filled" />
                ) : i < Math.ceil(product.rating) ? (
                  <FaStarHalfAlt key={i} className="star half" />
                ) : (
                  <FaStar key={i} className="star" />
                )
              )}
            </div>
            <span className="review-count">({product.reviewCount} reviews)</span>
          </div>

          <div className="price-box">
            <span className="new-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="old-price">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.originalPrice && (
              <span className="discount-badge">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <p className="desc-text">{product.main_description || product.small_description || 'No description available.'}</p>
          
          {product.features && product.features.length > 0 && (
            <div className="product-features">
              <h3>Key Features:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <FaCheck className="feature-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="category-info">
            <p className="category">
              <strong>Category:</strong> {product.category}
            </p>
            {product.category_unit && (
              <p className="category-units">
                <strong>Available Sizes:</strong> {product.category_unit.join(', ')}
              </p>
            )}
          </div>

          <div className="qty-cart-row">
            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-control">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) =>
                    setQuantity(parseInt(e.target.value, 10) || 1)
                  }
                />
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
            </div>

            <button className="cart-btn" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart • $
              {(product.price * quantity).toFixed(2)}
            </button>
          </div>

          <div className="product-benefits">
            <div className="benefit-item">
              <div className="benefit-icon">🚚</div>
              <div className="benefit-text">
                <strong>Free Shipping</strong>
                <span>On orders over $50</span>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">↩️</div>
              <div className="benefit-text">
                <strong>30-Day Returns</strong>
                <span>No questions asked</span>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🔒</div>
              <div className="benefit-text">
                <strong>Secure Checkout</strong>
                <span>Your data is protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;