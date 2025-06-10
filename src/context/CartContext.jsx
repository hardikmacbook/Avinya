import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      setCartCount(parsedCart.reduce((total, item) => total + item.quantity, 0));
    }
  }, []);

  // Add to cart function
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    const productQuantity = product.quantity || 1; // Use provided quantity or default to 1
    
    let updatedCart;
    if (existingItem) {
      // If item exists, add the new quantity to existing quantity
      updatedCart = cart.map(item => 
        item.id === product.id ? {...item, quantity: item.quantity + productQuantity} : item
      );
    } else {
      // If item doesn't exist, add it with the specified quantity
      updatedCart = [...cart, {...product, quantity: productQuantity}];
    }
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Update cart count
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Update cart count
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
  };

  // Update quantity function
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === productId ? {...item, quantity: newQuantity} : item
    );
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Update cart count
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
  };

  // Clear cart function
  const clearCart = () => {
    setCart([]);
    setCartCount(0);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartCount, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);