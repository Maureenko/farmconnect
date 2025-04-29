import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Home = () => {
  const featuredCategories = [
    { name: 'Vegetables', image: '/images/vegetables.jpg' },
    { name: 'Fruits', image: '/images/fruits.jpg' },
    { name: 'Grains', image: '/images/grains.jpg' },
    { name: 'Livestock', image: '/images/livestock.jpg' }
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Buy and Sell Fresh Agricultural Products</h1>
        <p>Connect directly with farmers and suppliers</p>
        <div className="cta-buttons">
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
          <Link to="/sell" className="btn btn-secondary">Sell Your Produce</Link>
        </div>
      </section>
      
      <section className="featured-categories">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {featuredCategories.map((category, index) => (
            <Link to={`/products?category=${category.name.toLowerCase()}`} key={index} className="category-card">
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;