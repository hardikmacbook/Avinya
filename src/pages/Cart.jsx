import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Function to create URL-friendly slugs from product titles
  const createSlug = (title) => {
    return title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
  };

  return (
    <div className="cart-page bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto max-w-[1200px] w-full px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#8b2727]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#8b2727] font-medium">Cart</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h1>
        
        {cart.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Cart header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-gray-600 font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {/* Cart items */}
            <div className="space-y-6 py-6">
              {cart.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 border-b border-gray-100">
                  {/* Product info */}
                  <div className="col-span-1 md:col-span-6 flex items-center space-x-4">
                    <Link to={`/shop/${createSlug(item.title)}`} className="w-20 h-20 bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img 
                        src={item.images?.[0]} 
                        alt={item.title} 
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                    <div>
                      <Link to={`/shop/${createSlug(item.title)}`} className="font-medium text-gray-800 hover:text-[#8b2727] line-clamp-2">{item.title}</Link>
                      <div className="text-xs text-[#8b2727] bg-[#f8f3e9] px-2 py-1 rounded-full inline-block mt-2">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="col-span-1 md:col-span-2 text-left md:text-center">
                    <div className="md:hidden text-sm text-gray-500 mb-1">Price:</div>
                    <div className="font-medium text-[#8b2727]">${item.price}</div>
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-1 md:col-span-2 flex items-center">
                    <div className="md:hidden text-sm text-gray-500 mr-2">Quantity:</div>
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 cursor-pointer hover:text-[#8b2727]"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-center w-10">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 cursor-pointer text-gray-600 hover:text-[#8b2727]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="col-span-1 md:col-span-2 flex justify-between items-center">
                    <div className="md:hidden text-sm text-gray-500">Total:</div>
                    <div className="font-bold text-right">${(item.price * item.quantity).toFixed(2)}</div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 cursor-pointer hover:text-[#8b2727] ml-4"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart summary */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={clearCart}
                  className="px-6 py-3 bg-gradient-to-r from-[#8b2727] to-[#a83333] hover:from-[#6a1d1d] hover:to-[#8b2727] text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg cursor-pointer"
                >
                  Clear Cart
                </button>
                <div className="text-right">
                  <div className="text-gray-600 mb-1">Total Amount:</div>
                  <div className="text-2xl font-bold text-[#8b2727]">${totalAmount.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                <Link 
                  to="/shop"
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </Link>
                
                <button 
                  className="px-6 py-3 bg-gradient-to-r from-[#8b2727] to-[#a83333] hover:from-[#6a1d1d] hover:to-[#8b2727] text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              to="/shop"
              className="px-6 py-3 bg-gradient-to-r from-[#8b2727] to-[#a83333] hover:from-[#6a1d1d] hover:to-[#8b2727] text-white font-medium rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;