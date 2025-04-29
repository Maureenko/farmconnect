import React, { useState } from 'react';
import '../styles/components.css';

const SearchFilter = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form className="search-filter" onSubmit={handleSubmit}>
      <select name="category" value={filters.category} onChange={handleChange}>
        <option value="">All Categories</option>
        <option value="vegetables">Vegetables</option>
        <option value="fruits">Fruits</option>
        <option value="grains">Grains</option>
        <option value="livestock">Livestock</option>
      </select>
      
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={filters.location}
        onChange={handleChange}
      />
      
      <div className="price-range">
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleChange}
        />
        <span>-</span>
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default SearchFilter;