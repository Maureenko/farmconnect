import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchFilter from '../components/SearchFilter';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        // In a real app, this would be an actual API call
        const mockProducts = [
          {
            id: 1,
            name: 'Fresh Tomatoes',
            price: 500,
            image: 'https://example.com/tomatoes.jpg',
            location: 'Nairobi',
            seller: 'FarmFresh Ltd',
            category: 'vegetables'
          },
          {
            id: 2,
            name: 'Fresh pineapples',
            price: 3000,
            image: 'https://example.com/tomatoes.jpg',
            location: 'Nairobi',
            seller: 'Mananasi Ltd',
            category: 'fruits'
          },{
            id: 3,
            name: 'Fresh meat',
            price: 5000,
            image: 'https://example.com/tomatoes.jpg',
            location: 'Nairobi',
            seller: 'Kichinjio Ltd',
            category: 'livestock'
          },{
            id: 4,
            name: 'Fresh onions',
            price: 5000,
            image: 'https://example.com/tomatoes.jpg',
            location: 'Nairobi',
            seller: 'FarmFresh Ltd',
            category: 'vegetables'
          },{
            id: 5,
            name: 'Fresh potatoes',
            price: 1000,
            image: 'https://example.com/tomatoes.jpg',
            location: 'Nairobi',
            seller: 'Kiwaru Ltd',
            category: 'vegetables'
          },{
            id: 6,
            name: 'Fresh maize',
            price: 7500,
            image: 'https://example.com/tomatoes.jpg',
            location: 'Nairobi',
            seller: 'Mahindi Ltd',
            category: 'grains'
          },{
            id: 7,
            name: 'Fresh eggs',
            price: 480,
            image: 'https://example.com/tomatoes.jpg',
            location: 'Nairobi',
            seller: 'MayaiFresh Ltd',
            category: 'livestock'
          },{
            id: 8,
            name: 'Fresh milk',
            price: 50,
            image: 'https://example.com/tomatoes.jpg',
            location: 'Nairobi',
            seller: 'Ngombe Ltd',
            category: 'livestock'
          },{
            id: 9,
            name: 'Fresh strawberries',
            price: 250,
            image: 'https://example.com/tomatoes.jpg',
            location: 'Nairobi',
            seller: 'Farmesh Ltd',
            category: 'fruits'
          },
          // More products...
        ];
        
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (filters) => {
    const filtered = products.filter(product => {
      return (
        (!filters.category || product.category === filters.category) &&
        (!filters.location || product.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.minPrice || product.price >= filters.minPrice) &&
        (!filters.maxPrice || product.price <= filters.maxPrice)
      );
    });
    setFilteredProducts(filtered);
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="products-page">
      <h1>Agricultural Products</h1>
      
      <SearchFilter onSearch={handleSearch} />
      
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Products;