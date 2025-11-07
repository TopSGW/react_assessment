import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, cartTotal, updateQuantity, removeFromCart, loading } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  if (loading) {
    return <div className="cart-container"><div className="loading">Loading cart...</div></div>;
  }

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.product._id} className="cart-item">
            <div className="cart-item-image">
              <img
                src={item.product.image || 'https://via.placeholder.com/100'}
                alt={item.product.name}
                onClick={() => navigate(`/products/${item.product._id}`)}
              />
            </div>
            <div className="cart-item-details">
              <h3 onClick={() => navigate(`/products/${item.product._id}`)}>
                {item.product.name}
              </h3>
              <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-quantity">
              <button
                onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                className="quantity-btn"
              >
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.product._id, parseInt(e.target.value) || 1)
                }
                min="1"
                className="quantity-input"
              />
              <button
                onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
            <div className="cart-item-total">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
            <button
              onClick={() => removeFromCart(item.product._id)}
              className="btn-remove"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <button className="btn-primary btn-checkout">
          Proceed to Checkout
        </button>
        <button
          onClick={() => navigate('/products')}
          className="btn-secondary"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;
