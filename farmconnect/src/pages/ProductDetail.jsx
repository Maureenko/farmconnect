import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/main.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Mock API call
    const mockProducts = [
      {
        id: 1,
        name: 'Fresh Tomatoes',
        price: 5000,
        image: 'https://via.placeholder.com/600',
        location: 'Nairobi',
        seller: 'FarmFresh Ltd',
        category: 'vegetables',
        description: 'Freshly harvested tomatoes from our farm. Grown without harmful chemicals and pesticides. Perfect for cooking, salads, and canning.',
        rating: 4.5,
        reviews: 24,
        sellerSince: '2020-05-15'
      },
      // Other products...
    ];

    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return <div className="loading">Loading product details...</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  return (
    <div className="product-detail">
      <div className="product-images">
        <img src={product.image} alt={product.name} className="main-image" />
      </div>
      
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">₦{product.price.toLocaleString()}</p>
        <p className="location">{product.location}</p>
        
        <div className="seller-info">
          <h3>Seller Information</h3>
          <p>{product.seller}</p>
          <p>Member since {new Date(product.sellerSince).getFullYear()}</p>
          <p>Rating: {product.rating} ({product.reviews} reviews)</p>
          <button className="contact-seller">Contact Seller</button>
        </div>
        
        <div className="product-description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
        
        <div className="add-to-cart">
          <div className="quantity-selector">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
          <button className="btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;