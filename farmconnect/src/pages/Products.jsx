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
            price: 5000,
            image: 'https://example.com/tomatoes.jpg',
            location: 'Nairobi',
            seller: 'FarmFresh Ltd',
            category: 'vegetables'
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