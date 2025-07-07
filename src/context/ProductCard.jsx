import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

const ProductCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    // fetch("https://dummyjson.com/products?limit=100")
    fetch("https://dummyjson.com/prducts?limit=100")
      .then(response => response.json())
      .then(data => {
        setData(data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const createSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-[#8b2727]">Working on products...</div>
      </div>
    );
  }

  return (
    <div className="outer pt-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-[1200px] w-full px-4 py-6">
        <div className="product-inner">
          <div className="product-inner-content">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Products</h1>
            <div className="product-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.slice(0,8).map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg border border-[#d2af6f]/20 hover:border-[#8b2727] transition-colors duration-200 p-6 h-full flex flex-col"
                >
                  <Link 
                    to={`/shop/${createSlug(product.title)}`}
                    className="w-full h-48 mb-4 bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] rounded-xl flex items-center justify-center overflow-hidden"
                  >
                    <img
                      className="max-w-full max-h-full object-contain"
                      src={product.images[0]}
                      alt={product.title}
                    />
                  </Link>
                  
                  <div className="flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                        {product.title.length > 25 ? product.title.slice(0, 25) + "..." : product.title}
                      </h3>
                      <div className="flex items-center bg-[#f8f3e9] px-2 py-1 rounded-full">
                        <span className="text-[#d2af6f]">★</span>
                        <span className="text-sm text-gray-700 ml-1 font-medium">{product.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description.length > 80 ? product.description.slice(0, 80) + "..." : product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-[#8b2727]">
                        ${product.price}
                      </span>
                      <span className="text-xs text-[#8b2727] bg-[#f8f3e9] px-3 py-1 rounded-full font-medium">
                        {product.category}
                      </span>
                    </div>
                  
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-gradient-to-r from-[#8b2727] to-[#a83333] hover:from-[#6a1d1d] hover:to-[#8b2727] text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer mt-auto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;