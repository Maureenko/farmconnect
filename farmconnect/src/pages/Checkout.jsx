import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaMapMarkerAlt, FaCreditCard, FaUser } from 'react-icons/fa';
import '../styles/main.css';

const Checkout = () => {
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // Sample cart items
  const cartItems = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      price: 5000,
      quantity: 2,
      image: 'https://via.placeholder.com/80'
    },
    {
      id: 2,
      name: 'Organic Bananas',
      price: 3500,
      quantity: 1,
      image: 'https://via.placeholder.com/80'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryOption === 'delivery' ? 1500 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and payment processing
    alert('Order placed successfully!');
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <Link to="/cart" className="back-button">
          <FaArrowLeft /> Back to Cart
        </Link>
        <h1>Checkout</h1>
      </div>

      <div className="checkout-container">
        <div className="checkout-steps">
          <div className="step active">
            <div className="step-number">1</div>
            <div className="step-title">Delivery</div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-title">Payment</div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-title">Confirmation</div>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-form">
            <h2><FaUser /> Delivery Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="delivery-options">
                <h3>Delivery Method</h3>
                <div className="options">
                  <label className={`option ${deliveryOption === 'pickup' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === 'pickup'}
                      onChange={() => setDeliveryOption('pickup')}
                    />
                    <div className="option-content">
                      <FaMapMarkerAlt />
                      <span>Pickup at Farm</span>
                      <p>Collect your order directly from the farm</p>
                    </div>
                  </label>

                  <label className={`option ${deliveryOption === 'delivery' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === 'delivery'}
                      onChange={() => setDeliveryOption('delivery')}
                    />
                    <div className="option-content">
                      <FaMapMarkerAlt />
                      <span>Home Delivery</span>
                      <p>₦1,500 delivery fee</p>
                    </div>
                  </label>
                </div>
              </div>

              {deliveryOption === 'delivery' && (
                <div className="address-fields">
                  <div className="form-group">
                    <label>Delivery Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="payment-methods">
                <h3><FaCreditCard /> Payment Method</h3>
                <div className="options">
                  <label className={`option ${paymentMethod === 'card' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <span>Credit/Debit Card</span>
                  </label>

                  <label className={`option ${paymentMethod === 'transfer' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'transfer'}
                      onChange={() => setPaymentMethod('transfer')}
                    />
                    <span>Bank Transfer</span>
                  </label>

                  <label className={`option ${paymentMethod === 'cash' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="card-details">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <button type="submit" className="place-order-btn">
                Place Order
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>₦{item.price.toLocaleString()} x {item.quantity}</p>
                  </div>
                  <div className="item-total">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="secure-checkout">
              <FaCheckCircle />
              <span>Secure Checkout</span>
              <p>Your payment information is encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;