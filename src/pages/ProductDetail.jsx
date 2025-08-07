import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Home, ChevronRight, Share2, Heart, ShoppingBag, Check, Mail, MessageCircle } from "lucide-react";
// import { useCart } from "../context/CartContext";

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

  // const [addedToCart, setAddedToCart] = useState(false);
  // const { addToCart } = useCart();

  const CONTACT_EMAIL = "hardikkamaliya0000@gmail.com";
  const WHATSAPP_NUMBER = "7575837112";

  // Email inquiry
  const handleEmailInquiry = () => {
    if (!product) return;
    const subject = `Inquiry about ${product.title}`;
    const body = `Hi,

I'm interested in the following product:

Product Details:
- Name: ${product.title}
- Brand: ${product.brand}
- Category: ${product.category}
- Price: ₹${product.price}
- Description: ${product.description}
- Quantity Interested: ${quantity}

Product Images:
${product.images.map((img, idx) => `Image ${idx+1}: ${img}`).join('\n')}

Please provide more information about this product and availability.

Best regards`;

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  // WhatsApp inquiry
  const handleWhatsAppInquiry = () => {
    if (!product) return;
    const message = `Hi! I'm interested in this product:

*${product.title}*

📋 *Product Details:*
• Brand: ${product.brand}
• Category: ${product.category}
• Price: ₹${product.price}
• Quantity Interested: ${quantity}

📝 *Description:*
${product.description}

🖼️ *Product Images:*
${product.images.map((img, idx) => `Image ${idx+1}: ${img}`).join('\n')}

Could you please provide more information about this product?`;

    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  // Quantity handlers
  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Review handling
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
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: name === 'rating' ? parseInt(value) : value
    });
  };

  // Fetch products
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Find product by slug
  useEffect(() => {
    if (products.length > 0 && title) {
      const createSlug = (productTitle) =>
        productTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const foundProduct = products.find(p => createSlug(p.title) === title);
      if (foundProduct) setProduct(foundProduct);
    }
  }, [products, title]);

  // Loading and 404 states
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fcf7f2] via-[#ffe5cf] to-[#fbeaf7]">
        <div className="text-lg text-gray-600 bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-[#8b2727] border-r-[#8b2727] border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          Loading product details...
        </div>
      </div>
    );
  }
  if (!title) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-[#fcf7f2] via-[#ffe5cf] to-[#fbeaf7] min-h-screen">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Products Page</h1>
          <p className="text-gray-600 mb-6">Please select a product from the home page to view details.</p>
          <Link to="/" className="text-white bg-[#8b2727] hover:bg-[#6a1d1d] px-6 py-3 rounded-xl inline-flex items-center transition">
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </Link>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-[#fcf7f2] via-[#ffe5cf] to-[#fbeaf7] min-h-screen">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Product Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, the product you're looking for doesn't exist.</p>
          <Link to="/" className="text-white bg-[#8b2727] hover:bg-[#6a1d1d] px-6 py-3 rounded-xl inline-flex items-center transition">
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcf7f2] via-[#ffe5cf] to-[#fbeaf7]">
      {/* Breadcrumb */}
      <div className="backdrop-blur-lg bg-white/60 shadow border-b border-[#d2af6f]/20 sticky top-0 z-20">
        <div className="container mx-auto max-w-7xl px-4 py-2">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <Link to="/" className="flex items-center hover:text-[#8b2727] transition">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/shop" className="hover:text-[#8b2727]">
              Shop
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#8b2727] font-medium truncate max-w-[150px] sm:max-w-[200px]">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-8 max-w-6xl">
        <div className="rounded-3xl shadow-2xl border border-[#ecd5b4]/40 p-4 sm:p-8 bg-white/95 flex flex-col gap-8 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images */}
            <div className="md:w-1/2">
              {/* Main Image */}
              <div
                className="mb-4 h-80 md:h-[420px] flex items-center justify-center bg-gradient-to-br from-[#fdf6ee] to-[#fbf0df] rounded-2xl border-[3px] border-[#eee5cf] shadow-lg group transition-all duration-300 relative overflow-hidden"
                style={{ perspective: '500px' }}
              >
                <img
                  src={product.images[currentImage]}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain transform transition-transform duration-500 group-hover:scale-[1.08] group-hover:rotate-[-2deg]"
                  draggable={false}
                />
                {product.discountPercentage > 0 && (
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-[#bb3a3a] to-[#eb6868] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-white border">
                    {Math.round(product.discountPercentage)}% OFF
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-[#d2af6f]/40">
                {product.images.map((image, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`w-[70px] h-[70px] flex-shrink-0 cursor-pointer border-2 rounded-xl overflow-hidden bg-white/75 transition-all duration-200 ring-2 ring-offset-2
                      ${currentImage === index
                        ? 'border-[#8b2727] ring-[#bb3a3a]'
                        : 'border-gray-200 hover:border-[#c2755e] hover:ring-[#ecd5b4]/60'}`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.title} preview ${index + 1}`}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 flex flex-col gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black leading-snug text-[#501f1f] tracking-tight mb-1">{product.title}</h1>
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-xl shadow flex-grow">
                  <span className="text-yellow-500 mr-1 text-base">★</span>
                  <span className="font-bold text-lg text-[#b5861c]">{product.rating}</span>
                  <span className="ml-2 text-xs text-gray-400">Rating</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-xs font-semibold tracking-wide uppercase text-white bg-[#ab533d] px-2.5 py-1 rounded-xl shadow inline-block">{product.category}</div>
                <div className="text-xs font-semibold tracking-wide uppercase border border-[#ecd5b4] px-2.5 py-1 rounded-xl shadow bg-white text-[#bb3a3a]">{product.brand}</div>
              </div>
              <p className="text-gray-700 mb-2 leading-relaxed text-base sm:text-lg font-medium">{product.description}</p>
              {/* Price and stock */}
              <div className="mb-4 bg-amber-50/70 p-5 rounded-2xl shadow-md flex flex-col gap-2 border border-[#ecd5b4]/60">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-extrabold text-[#ab533d] drop-shadow">₹{product.price}</span>
                  {product.discountPercentage > 0 && (
                    <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full shadow">{product.discountPercentage}% off</span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  {product.stock <= 10 ? (
                    <>
                      <span className="inline-block w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                      <span className="text-orange-700 font-medium">Only {product.stock} left! Hurry</span>
                    </>
                  ) : (
                    <>
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-green-700 font-medium">In stock</span>
                    </>
                  )}
                </div>
              </div>
              {/* Quantity and Inquiry */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border rounded-xl shadow bg-gradient-to-r from-white to-[#f8e6df]/60 w-full sm:w-auto">
                  <button
                    className="px-4 py-2 text-xl hover:bg-[#ecd5b4]/40 transition-colors rounded-l-xl font-black text-gray-600"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >-</button>
                  <span className="px-7 py-2 border-x text-center text-lg font-bold text-[#ab533d] min-w-[60px] bg-white">{quantity}</span>
                  <button
                    className="px-4 py-2 text-xl hover:bg-[#ecd5b4]/40 transition-colors rounded-r-xl font-black text-gray-600"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >+</button>
                </div>
                <button
                  onClick={handleEmailInquiry}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 font-semibold"
                >
                  <Mail className="w-5 h-5" /> Email Inquiry
                </button>
                <button
                  onClick={handleWhatsAppInquiry}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 font-semibold"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </button>
              </div>
            </div>
          </div> {/* End main grid*/}

          {/* TAB SECTION */}
          <div className="mt-8">
            <div className="border-b border-[#ecd5b4]">
              <nav className="flex -mb-px overflow-x-auto scrollbar-hide font-semibold text-base space-x-6">
                {['description', 'details', 'reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-3 border-b-2 transition-all duration-200
                      ${activeTab === tab
                        ? 'border-[#8b2727] text-[#8b2727] shadow-sm bg-[#f8e7d8]/50'
                        : 'border-transparent text-gray-600 hover:text-[#ab533d] hover:border-[#ecd5b4]'}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
            <div className="py-7">
              {activeTab === 'description' && (
                <div className="bg-white/85 p-6 rounded-2xl shadow-inner border border-[#ecd5b4]/50">
                  <h3 className="text-xl font-semibold mb-4 text-[#bb3a3a] border-l-4 border-[#bb3a3a] pl-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="bg-white/85 p-6 rounded-2xl shadow-inner border border-[#ecd5b4]/50">
                  <h3 className="text-xl font-semibold mb-4 text-[#bb3a3a] border-l-4 border-[#bb3a3a] pl-4">Additional Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex justify-between pb-2">
                      <span className="font-medium text-gray-700">Brand:</span>
                      <span className="text-gray-600">{product.brand}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="font-medium text-gray-700">Category:</span>
                      <span className="text-gray-600">{product.category}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="font-medium text-gray-700">Stock:</span>
                      <span className="text-gray-600">{product.stock} units</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="font-medium text-gray-700">Rating:</span>
                      <span className="text-gray-600">{product.rating}/5</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="font-medium text-gray-700">Discount:</span>
                      <span className="text-gray-600">{product.discountPercentage}%</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="bg-white/90 p-6 rounded-2xl shadow-inner border border-[#ecd5b4]/60">
                  <h3 className="text-xl font-semibold mb-4 text-[#bb3a3a] border-l-4 border-[#bb3a3a] pl-4">Customer Reviews</h3>
                  {reviews.length > 0 ? (
                    <div className="space-y-4 mb-8">
                      {reviews.map(review => (
                        <div key={review.id} className="border-b pb-4 hover:bg-[#fffbe6] hover:shadow flex flex-col rounded transition">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-[#ab533d]">{review.name}</span>
                            <span className="text-xs text-gray-400">{review.date}</span>
                          </div>
                          <div className="flex items-center my-1 gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-yellow-500 text-lg' : 'text-gray-300 text-lg'}>★</span>
                            ))}
                          </div>
                          <p className="text-gray-700 mt-1">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-5 bg-[#fffbe6] p-4 rounded-lg font-medium">No reviews yet. Be the first to review this product!</p>
                  )}
                  {/* Review form */}
                  <div className="bg-gradient-to-br from-[#fffbe6]/50 to-[#f6efef]/70 p-6 rounded-2xl shadow-md">
                    <h4 className="font-bold mb-3 text-[#8b2727]">Leave a Review</h4>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-gray-500 mb-1">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={newReview.name}
                          onChange={handleReviewChange}
                          className="w-full px-3 py-2 border border-[#ecd5b4] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ab533d] focus:border-transparent"
                          required
                          autoComplete="off"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Rating</label>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <button
                              type="button"
                              key={i}
                              onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                              className="text-2xl focus:outline-none"
                            >
                              <span className={i < newReview.rating ? 'text-yellow-500' : 'text-gray-300'}>
                                ★
                              </span>
                            </button>
                          ))}
                        </div>
                        <select
                          id="rating"
                          name="rating"
                          value={newReview.rating}
                          onChange={handleReviewChange}
                          className="w-full px-3 py-2 border border-[#ecd5b4] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ab533d]"
                        >
                          <option value="5">5 - Excellent</option>
                          <option value="4">4 - Very Good</option>
                          <option value="3">3 - Good</option>
                          <option value="2">2 - Fair</option>
                          <option value="1">1 - Poor</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="comment" className="block text-xs font-semibold text-gray-500 mb-1">Your Review</label>
                        <textarea
                          id="comment"
                          name="comment"
                          value={newReview.comment}
                          onChange={handleReviewChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-[#ecd5b4] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#ab533d]"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-[#ac6a43] hover:bg-[#8b2727] text-white px-6 py-3 rounded-lg transition font-bold shadow-md flex items-center gap-2"
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
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default ProductDetails;
