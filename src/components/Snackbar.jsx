import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/Snackbar.css';

const Snackbar = ({ message, onClose, show, productName, showViewCart = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const handleViewCart = () => {
    navigate('/cart');
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="snackbar">
      <div className="snackbar-content">
        <div className="snackbar-message">
          <FaCheckCircle className="snackbar-icon" />
          <span>{message}</span>
          {productName && <span className="product-name">{productName}</span>}
        </div>
        {showViewCart && (
          <button className="view-cart-btn" onClick={handleViewCart}>
            <FaShoppingCart className="cart-icon" />
            View Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Snackbar;
