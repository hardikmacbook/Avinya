import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Home, ChevronRight, Share2, Heart, ShoppingBag, Check } from "lucide-react";
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
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  // Add to cart function with quantity
  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // Stop event bubbling
    addToCart({...product, quantity});
    
    // Show added to cart confirmation
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2]">
        <div className="text-lg text-gray-600 bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-[#8b2727] border-r-[#8b2727] border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          Loading product details...
        </div>
      </div>
    );
  }

  // If we're on the general products page (no title)
  if (!title) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Products Page</h1>
          <p className="text-gray-600 mb-6">Please select a product from the home page to view details.</p>
          <Link to="/" className="text-white bg-[#8b2727] hover:bg-[#6a1d1d] px-6 py-3 rounded-lg inline-flex items-center transition-colors">
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  // If product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Product Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, the product you're looking for doesn't exist.</p>
          <Link to="/" className="text-white bg-[#8b2727] hover:bg-[#6a1d1d] px-6 py-3 rounded-lg inline-flex items-center transition-colors">
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2]">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-[#d2af6f]/30 sticky top-0 z-10">
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
        <div className=" rounded-xl shadow-lg p-6 md:p-8 backdrop-blur-sm bg-white/90">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images Section */}
            <div className="md:w-1/2">
              <div className="mb-4 h-80 md:h-96 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden relative group">
                <img 
                  src={product.images[currentImage]} 
                  alt={product.title} 
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                {product.discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                    {Math.round(product.discountPercentage)}% OFF
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`w-20 h-20 flex-shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md ${currentImage === index ? 'border-red-900 shadow-md' : 'border-gray-200'}`}
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
                <div className="flex items-center bg-yellow-100 px-3 py-1.5 rounded-full">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-medium">{product.rating}</span>
                </div>
              </div>
              
              <div className="inline-block text-sm text-white bg-[#8b2727]/80 px-3 py-1 rounded-full mb-4">{product.category}</div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
              
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-red-900">${product.price}</span>
                  {product.discountPercentage > 0 && (
                    <span className="ml-2 text-sm text-green-600 font-medium">{product.discountPercentage}% off</span>
                  )}
                </div>
                
                {product.stock <= 10 ? (
                  <div className="text-sm text-orange-600 mt-1 flex items-center">
                    <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-1"></span>
                    Only {product.stock} left in stock!
                  </div>
                ) : (
                  <div className="text-sm text-green-600 mt-1 flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    In stock
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="flex items-center border rounded-lg shadow-sm bg-white w-full sm:w-auto">
                  <button 
                    className="px-4 py-2 text-xl hover:bg-gray-100 transition-colors rounded-l-lg" 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x text-center min-w-[60px]">{quantity}</span>
                  <button 
                    className="px-4 py-2 text-xl hover:bg-gray-100 transition-colors rounded-r-lg"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className={`cursor-pointer ${addedToCart ? 'bg-green-600' : 'bg-red-900 hover:bg-black'} text-white px-6 py-3 rounded-lg transition-colors duration-200 flex-grow flex items-center justify-center gap-2 shadow-lg`}
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
                
                <button 
                  onClick={handleShare}
                  className="cursor-pointer border border-gray-300 hover:bg-gray-100 p-3 rounded-lg transition-colors duration-200 shadow-sm"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                
                <button 
                  className="cursor-pointer border border-gray-300 hover:bg-gray-100 p-3 rounded-lg transition-colors duration-200 shadow-sm"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Brand:</span> 
                    <span className="bg-gray-100 px-2 py-1 rounded">{product.brand}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Stock:</span> 
                    <span className="bg-gray-100 px-2 py-1 rounded">{product.stock}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs Section */}
          <div className="mt-12">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px space-x-8 overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'description' 
                    ? 'border-red-900 text-red-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'details' 
                    ? 'border-red-900 text-red-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Additional Details
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'reviews' 
                    ? 'border-red-900 text-red-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Reviews
                </button>
              </nav>
            </div>
            
            <div className="py-6">
              {activeTab === 'description' && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4 text-gray-800 border-l-4 border-red-900 pl-3">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              )}
              
              {activeTab === 'details' && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4 text-gray-800 border-l-4 border-red-900 pl-3">Additional Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-b pb-2 flex justify-between">
                      <span className="font-medium text-gray-700">Brand:</span> 
                      <span className="text-gray-600">{product.brand}</span>
                    </div>
                    <div className="border-b pb-2 flex justify-between">
                      <span className="font-medium text-gray-700">Category:</span> 
                      <span className="text-gray-600">{product.category}</span>
                    </div>
                    <div className="border-b pb-2 flex justify-between">
                      <span className="font-medium text-gray-700">Stock:</span> 
                      <span className="text-gray-600">{product.stock} units</span>
                    </div>
                    <div className="border-b pb-2 flex justify-between">
                      <span className="font-medium text-gray-700">Rating:</span> 
                      <span className="text-gray-600">{product.rating}/5</span>
                    </div>
                    <div className="border-b pb-2 flex justify-between">
                      <span className="font-medium text-gray-700">Discount:</span> 
                      <span className="text-gray-600">{product.discountPercentage}%</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4 text-gray-800 border-l-4 border-red-900 pl-3">Customer Reviews</h3>
                  
                  {/* Reviews list */}
                  {reviews.length > 0 ? (
                    <div className="space-y-4 mb-8">
                      {reviews.map(review => (
                        <div key={review.id} className="border-b pb-4 hover:bg-gray-50 p-3 rounded transition-colors">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-800">{review.name}</span>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center my-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                            ))}
                          </div>
                          <p className="text-gray-700 mt-2">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-6 bg-gray-50 p-4 rounded-lg">No reviews yet. Be the first to review this product!</p>
                  )}
                  
                  {/* Review form */}
                  <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                    <h4 className="font-medium mb-4 text-gray-800">Write a Review</h4>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={newReview.name}
                          onChange={handleReviewChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <button 
                              type="button"
                              key={i} 
                              onClick={() => setNewReview({...newReview, rating: i + 1})}
                              className="text-2xl focus:outline-none"
                            >
                              <span className={i < newReview.rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                            </button>
                          ))}
                        </div>
                        <select
                          id="rating"
                          name="rating"
                          value={newReview.rating}
                          onChange={handleReviewChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all"
                        >
                          <option value="5">5 - Excellent</option>
                          <option value="4">4 - Very Good</option>
                          <option value="3">3 - Good</option>
                          <option value="2">2 - Fair</option>
                          <option value="1">1 - Poor</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                        <textarea
                          id="comment"
                          name="comment"
                          value={newReview.comment}
                          onChange={handleReviewChange}
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all"
                          required
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="bg-red-900 hover:bg-black text-white px-6 py-3 rounded-md transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
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