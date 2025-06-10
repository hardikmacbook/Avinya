import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Home, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";


const ProductDetails = () => {
  const { title } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useCart();

  // Add to cart function
  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // Stop event bubbling
    addToCart(product);
  };

  // First fetch all products
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Then find the product that matches the title slug
  useEffect(() => {
    if (products.length > 0 && title) {
      const createSlug = (productTitle) => {
        return productTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      };

      const foundProduct = products.find(p => createSlug(p.title) === title);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [products, title]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading product details...</div>
      </div>
    );
  }

  // If we're on the general products page (no title)
  if (!title) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Products Page</h1>
        <p>Please select a product from the home page to view details.</p>
        <Link to="/" className="text-red-900 hover:underline mt-4 inline-block">
          Go to Home
        </Link>
      </div>
    );
  }

  // If product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p>Sorry, the product you're looking for doesn't exist.</p>
        <Link to="/" className="text-red-900 hover:underline mt-4 inline-block">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2]">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-[#d2af6f]/30">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="flex items-center hover:text-[#8b2727] transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/shop" className="hover:text-[#8b2727] transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/shop?category=${product.category}`} className="hover:text-[#8b2727] transition-colors">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#8b2727] font-medium truncate max-w-[200px]">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images Section */}
            <div className="md:w-1/2">
              <div className="mb-4 h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                <img 
                  src={product.images[currentImage]} 
                  alt={product.title} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`w-20 h-20 flex-shrink-0 cursor-pointer border-2 rounded ${currentImage === index ? 'border-red-900' : 'border-gray-200'}`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} thumbnail ${index + 1}`} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Details Section */}
            <div className="md:w-1/2">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
                <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-medium">{product.rating}</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mb-4">{product.category}</div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-red-900">${product.price}</span>
                  {product.discountPercentage > 0 && (
                    <span className="ml-2 text-sm text-green-600">{product.discountPercentage}% off</span>
                  )}
                </div>
                
                {product.stock <= 10 && (
                  <div className="text-sm text-orange-600 mt-1">Only {product.stock} left in stock!</div>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded-lg">
                  <button className="px-3 py-1 text-xl">-</button>
                  <span className="px-4 py-1 border-x">1</span>
                  <button className="px-3 py-1 text-xl">+</button>
                </div>
                
                <button 
                onClick={(e) => handleAddToCart(e, product)}
                className="cursor-pointer bg-red-900 hover:bg-black text-white px-6 py-2 rounded-lg transition-colors duration-200">
                  Add to Cart
                </button>
              
              </div>
              
              <div className="border-t pt-4">
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="font-medium">Brand:</span> {product.brand}
                  </div>
                  <div>
                    <span className="font-medium">Stock:</span> {product.stock}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
