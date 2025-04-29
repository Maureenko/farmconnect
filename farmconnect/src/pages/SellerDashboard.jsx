import React, { useState } from 'react';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewProduct(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price),
      date: new Date().toISOString()
    };
    setProducts(prev => [...prev, productToAdd]);
    setNewProduct({
      name: '',
      price: '',
      category: '',
      description: '',
      image: null
    });
  };

  return (
    <div className="seller-dashboard">
      <h1>Seller Dashboard</h1>
      
      <div className="add-product-form">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Price (Ksh)</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select category</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
              <option value="livestock">Livestock</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          
          <button type="submit">Add Product</button>
        </form>
      </div>
      
      <div className="my-products">
        <h2>My Products</h2>
        {products.length > 0 ? (
          <div className="product-list">
            {products.map(product => (
              <div key={product.id} className="product-item">
                <h3>{product.name}</h3>
                <p>Ksh{product.price.toLocaleString()}</p>
                <p>{product.category}</p>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p>You haven't added any products yet.</p>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;