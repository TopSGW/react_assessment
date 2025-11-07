import { createContext, useState, useContext, useEffect } from 'react';
import { getCart, addToCart as apiAddToCart, updateCartItem, removeFromCart as apiRemoveFromCart } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // Load cart from localStorage for non-authenticated users
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await getCart();
      setCart(response.data.data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (isAuthenticated) {
      try {
        await apiAddToCart(product._id, quantity);
        await fetchCart();
      } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
      }
    } else {
      // Local cart management
      const existingItem = cart.find(item => item.product._id === product._id);
      let newCart;

      if (existingItem) {
        newCart = cart.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...cart, { product, quantity }];
      }

      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (isAuthenticated) {
      try {
        await updateCartItem(productId, quantity);
        await fetchCart();
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    } else {
      const newCart = cart.map(item =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      );
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const removeFromCart = async (productId) => {
    if (isAuthenticated) {
      try {
        await apiRemoveFromCart(productId);
        await fetchCart();
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      const newCart = cart.filter(item => item.product._id !== productId);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) =>
    total + (item.product.price * item.quantity), 0
  );

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
