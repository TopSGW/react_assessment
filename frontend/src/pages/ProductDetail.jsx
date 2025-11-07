import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getProduct(id);
      setProduct(response.data.data.product);
    } catch (err) {
      setError('Failed to load product details.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      setSuccessMessage('');
      await addToCart(product, quantity);
      setSuccessMessage('Added to cart successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to add to cart.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="product-detail-container"><div className="loading">Loading product...</div></div>;
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/products')} className="btn-secondary">
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return <div className="product-detail-container"><p>Product not found.</p></div>;
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate('/products')} className="btn-back">
        ← Back to Products
      </button>
      <div className="product-detail">
        <div className="product-image">
          <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>

          {product.category && (
            <p className="product-category">
              <strong>Category:</strong> {product.category.name}
            </p>
          )}

          <p className="product-stock">
            <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
          </p>

          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="btn-primary"
              disabled={addingToCart || product.stock === 0}
            >
              {addingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>

          {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
