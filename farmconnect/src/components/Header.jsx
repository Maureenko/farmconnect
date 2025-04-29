import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">FarmConnect</Link>
      </div>
      
      <div className="search-bar">
        <input type="text" placeholder="Search for produce..." />
        <button><FaSearch /></button>
      </div>
      
      <nav className="nav-links">
        <Link to="/products">Browse</Link>
        <Link to="/sell">Sell</Link>
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart />
          <span className="cart-count">0</span>
        </Link>
        <Link to="/profile"><FaUser /></Link>
      </nav>
    </header>
  );
};

export default Header;