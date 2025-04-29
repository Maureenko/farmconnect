import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <button className="wishlist-btn"><FaHeart /></button>
      </div>
      <div className="product-info">
        <h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
        <p className="price">Ksh{product.price.toLocaleString()}</p>
        <p className="location">{product.location}</p>
        <p className="seller">Sold by {product.seller}</p>
        <div className="product-actions">
          <button className="add-to-cart"><FaShoppingCart /> Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;