import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <div className="product-card-image">
        <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} />
      </div>
      <div className="product-card-content">
        <h3>{product.name}</h3>
        <p className="product-card-price">${product.price.toFixed(2)}</p>
        <p className="product-card-description">
          {product.description?.substring(0, 80)}
          {product.description?.length > 80 ? '...' : ''}
        </p>
        <button
          onClick={handleAddToCart}
          className="btn-primary"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
