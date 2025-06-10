import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Home, ChevronRight, Share2 } from "lucide-react";
import { useCart } from "../context/CartContext";


const ProductDetails = () => {
  const { title } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const { addToCart } = useCart();

  // Add to cart function with quantity
  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // Stop event bubbling
    addToCart({...product, quantity});
  };

  // Quantity handlers
  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Share product function
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out this amazing product: ${product.title}`,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(error => console.log('Error copying link:', error));
    }
  };

  // Handle review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      const reviewWithDate = {
        ...newReview,
        date: new Date().toLocaleDateString(),
        id: Date.now()
      };
      setReviews([...reviews, reviewWithDate]);
      setNewReview({ name: '', rating: 5, comment: '' });
    }
  };

  // Handle review input changes
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: name === 'rating' ? parseInt(value) : value
    });
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
                  <button 
                    className="px-3 py-1 text-xl" 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x">{quantity}</span>
                  <button 
                    className="px-3 py-1 text-xl"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="cursor-pointer bg-red-900 hover:bg-black text-white px-6 py-2 rounded-lg transition-colors duration-200 flex-grow">
                  Add to Cart
                </button>
                
                <button 
                  onClick={handleShare}
                  className="cursor-pointer border border-gray-300 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200">
                  <Share2 className="w-5 h-5" />
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
          
          {/* Tabs Section */}
          <div className="mt-12">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px space-x-8">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' 
                    ? 'border-red-900 text-red-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details' 
                    ? 'border-red-900 text-red-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Additional Details
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' 
                    ? 'border-red-900 text-red-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Reviews
                </button>
              </nav>
            </div>
            
            <div className="py-6">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Product Description</h3>
                  <p className="text-gray-700">{product.description}</p>
                </div>
              )}
              
              {activeTab === 'details' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Additional Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-b pb-2">
                      <span className="font-medium">Brand:</span> {product.brand}
                    </div>
                    <div className="border-b pb-2">
                      <span className="font-medium">Category:</span> {product.category}
                    </div>
                    <div className="border-b pb-2">
                      <span className="font-medium">Stock:</span> {product.stock} units
                    </div>
                    <div className="border-b pb-2">
                      <span className="font-medium">Rating:</span> {product.rating}/5
                    </div>
                    <div className="border-b pb-2">
                      <span className="font-medium">Discount:</span> {product.discountPercentage}%
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
                  
                  {/* Reviews list */}
                  {reviews.length > 0 ? (
                    <div className="space-y-4 mb-8">
                      {reviews.map(review => (
                        <div key={review.id} className="border-b pb-4">
                          <div className="flex justify-between">
                            <span className="font-medium">{review.name}</span>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center my-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-${i < review.rating ? 'yellow' : 'gray'}-500`}>★</span>
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-6">No reviews yet. Be the first to review this product!</p>
                  )}
                  
                  {/* Review form */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-4">Write a Review</h4>
                    <form onSubmit={handleReviewSubmit}>
                      <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={newReview.name}
                          onChange={handleReviewChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-900"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <select
                          id="rating"
                          name="rating"
                          value={newReview.rating}
                          onChange={handleReviewChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-900"
                        >
                          <option value="5">5 - Excellent</option>
                          <option value="4">4 - Very Good</option>
                          <option value="3">3 - Good</option>
                          <option value="2">2 - Fair</option>
                          <option value="1">1 - Poor</option>
                        </select>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                        <textarea
                          id="comment"
                          name="comment"
                          value={newReview.comment}
                          onChange={handleReviewChange}
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-900"
                          required
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="bg-red-900 hover:bg-black text-white px-4 py-2 rounded-md transition-colors duration-200"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
