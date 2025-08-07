import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Home, ChevronRight, Mail, MessageCircle, User, ArrowLeft,
} from "lucide-react";

const ProductDetails = () => {
  const { title } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });

  const CONTACT_EMAIL = "hardikkamaliya0000@gmail.com";
  const WHATSAPP_NUMBER = "7575837112";

  const handleEmailInquiry = () => {
    if (!product) return;
    const subject = `Inquiry about ${product.title}`;
    const body = `Hi,\n\nI'm interested in the following product:\n\nProduct Details:\n- Name: ${product.title}\n- Brand: ${product.brand}\n- Category: ${product.category}\n- Price: ₹${product.price}\n- Description: ${product.description}\n- Quantity Interested: ${quantity}\n\nProduct Images:\n${product.images.map((img, idx) => `Image ${idx + 1}: ${img}`).join('\n')}\n\nPlease provide more information about this product and availability.\n\nBest regards`;
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  const handleWhatsAppInquiry = () => {
    if (!product) return;
    const message = `Hi! I'm interested in this product:\n\n*${product.title}*\n\n📋 *Product Details:*\n• Brand: ${product.brand}\n• Category: ${product.category}\n• Price: ₹${product.price}\n• Quantity Interested: ${quantity}\n\n📝 *Description:*\n${product.description}\n\n🖼️ *Product Images:*\n${product.images.map((img, idx) => `Image ${idx + 1}: ${img}`).join('\n')}\n\nCould you please provide more information about this product?`;
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) setQuantity(quantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      const reviewWithDate = {
        ...newReview,
        date: new Date().toLocaleDateString(),
        id: Date.now(),
      };
      setReviews([...reviews, reviewWithDate]);
      setNewReview({ name: "", rating: 5, comment: "" });
    }
  };
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: name === "rating" ? parseInt(value) : value });
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (products.length > 0 && title) {
      const createSlug = (productTitle) =>
        productTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const foundProduct = products.find((p) => createSlug(p.title) === title);
      if (foundProduct) setProduct(foundProduct);
    }
  }, [products, title]);

  // Loader, 404, and minimal shadow sections use your background scheme, colors, and only soft, low elevation where needed
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2]">
        <div className="text-lg text-gray-600 bg-white p-8 rounded-xl flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-[#8b2727] border-r-[#8b2727] border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          Loading product details...
        </div>
      </div>
    );
  }
  if (!title || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2]">
        <div className="bg-white/80 rounded-2xl border border-[#d2af6f]/50 p-12 text-center flex flex-col items-center max-w-lg">
          <ArrowLeft className="mb-4 w-8 h-8 text-[#8b2727]" />
          <h1 className="text-2xl font-extrabold text-[#8b2727] mb-3">Product Not Found</h1>
          <p className="text-base text-gray-600 mb-7">Sorry, the product you're looking for doesn't exist.</p>
          <Link to="/" className="bg-[#8b2727] hover:bg-[#6a1d1d] text-white px-8 py-3 rounded-lg flex items-center gap-2 font-bold">
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2]">
      <nav className="bg-white/95 border-b border-[#d2af6f]/20 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-gray-600 text-xs sm:text-base">
          <Link to="/" className="flex items-center hover:text-[#8b2727] font-medium">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-[#8b2727]">
            Shop
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#8b2727] font-semibold truncate max-w-[200px]">{product.title}</span>
        </div>
      </nav>
      {/* Main Layout */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="rounded-xl border border-[#d2af6f]/50 bg-white/90 flex flex-col gap-7 p-5 md:p-10">
          <div className="flex flex-col md:flex-row gap-7">
            <div className="md:w-1/2 flex flex-col items-center">
              <div className="mb-4 w-full h-80 md:h-96 flex items-center justify-center bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] rounded-lg border border-[#d2af6f]/60 transition-all">
                <img
                  src={product.images[currentImage]}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                  draggable={false}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto w-full pt-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`rounded-md border-2 p-0.5 transition ${currentImage === idx
                      ? "border-[#8b2727]" 
                      : "border-transparent hover:border-[#d2af6f]"}`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-16 h-16 object-contain rounded"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <section className="md:w-1/2 flex flex-col gap-5">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#8b2727]">{product.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-[#ffeec1] text-[#8b2727] font-medium px-3 py-1 rounded">{product.rating}★</span>
                  <span className="bg-[#8b2727] text-white px-3 py-1 rounded text-xs">{product.category}</span>
                  <span className="border border-[#d2af6f] px-3 py-1 rounded text-[#8b2727] bg-white text-xs">{product.brand}</span>
                </div>
              </div>
              <p className="text-gray-700 text-base">{product.description}</p>
              <div className="flex flex-wrap gap-4 items-center">
                {/* <span className="text-3xl font-bold text-[#8b2727]">₹{product.price}</span> */}
                {/* {product.discountPercentage > 0 && (
                  <span className="bg-[#d2af6f] text-[#8b2727] text-xs font-semibold rounded px-4 py-1">{product.discountPercentage}% OFF</span>
                )}
                {product.stock <= 10 ? (
                  <span className="text-orange-700 flex items-center gap-1 text-xs px-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full inline-block" /> Only {product.stock} left!
                  </span>
                ) : (
                  <span className="text-green-700 flex items-center gap-1 text-xs px-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block" /> In stock
                  </span>
                )} */}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-center mt-3">
                <div className="flex items-center border border-[#d2af6f] rounded-lg bg-white px-2">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="px-3 py-2 text-lg font-bold text-[#8b2727] transition"
                  >-</button>
                  <span className="px-6 py-2 border-l border-r border-[#d2af6f] text-center">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="px-3 py-2 text-lg font-bold text-[#8b2727] transition"
                  >+</button>
                </div>
                <button
                  onClick={handleEmailInquiry}
                  className="bg-[#8b2727] hover:bg-[#d2af6f] text-white hover:text-black px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold cursor-pointer"
                >
                  <Mail className="w-5 h-5" /> Email Inquiry
                </button>
                <button
                  onClick={handleWhatsAppInquiry}
                  className="bg-[#d2af6f] hover:bg-[#8b2727] hover:text-white text-black px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </button>
              </div>
            </section>
          </div>

          {/* Tabs Section */}
          <div>
            <nav className="flex border-b border-[#d2af6f]/50">
              {["description", "details", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-4 transition ${activeTab === tab
                    ? "text-[#8b2727] border-b-2 border-[#8b2727] bg-[#f8f3e9]/70 font-semibold"
                    : "text-gray-600 hover:text-[#8b2727]"}`
                  }
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
            <div className="pt-6">
              {activeTab === "description" && (
                <div className="bg-white/90 p-7 rounded border border-[#d2af6f]/50">
                  <h3 className="text-lg font-bold text-[#8b2727] mb-2">Product Description</h3>
                  <p className="text-gray-700">{product.description}</p>
                </div>
              )}
              {activeTab === "details" && (
                <div className="bg-white/90 p-7 rounded border border-[#d2af6f]/50">
                  <h3 className="text-lg font-bold text-[#8b2727] mb-2">Additional Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex justify-between pb-2"><span className="font-medium text-gray-700">Brand:</span> <span>{product.brand}</span></div>
                    <div className="flex justify-between pb-2"><span className="font-medium text-gray-700">Category:</span> <span>{product.category}</span></div>
                    <div className="flex justify-between pb-2"><span className="font-medium text-gray-700">Stock:</span> <span>{product.stock} units</span></div>
                    <div className="flex justify-between pb-2"><span className="font-medium text-gray-700">Rating:</span> <span>{product.rating}/5</span></div>
                    <div className="flex justify-between pb-2"><span className="font-medium text-gray-700">Discount:</span> <span>{product.discountPercentage}%</span></div>
                  </div>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="bg-white/95 p-7 rounded border border-[#d2af6f]/50">
                  <h3 className="text-lg font-bold text-[#8b2727] mb-4">Customer Reviews</h3>
                  {reviews.length > 0 ? (
                    <div className="space-y-4 mb-8">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 flex gap-4 items-start transition">
                          <div className="flex items-center justify-center bg-[#f8f3e9] w-10 h-10 rounded-full border border-[#d2af6f]/60">
                            <User className="text-[#8b2727]" size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#8b2727]">{review.name}</span>
                              <span className="text-xs text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < review.rating ? "text-[#d2af6f]" : "text-gray-300"}>★</span>
                              ))}
                            </div>
                            <p className="text-gray-700 mt-2">{review.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-5 bg-[#f8f3e9] p-4 rounded font-medium">
                      No reviews yet. Be the first to review this product!
                    </p>
                  )}
                  <div className="p-6 bg-[#f8f3e9]/60 rounded border border-[#d2af6f]/50 mt-5">
                    <h4 className="font-bold mb-3 text-[#8b2727]">Leave a Review</h4>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                        <input type="text" id="name" name="name" value={newReview.name} onChange={handleReviewChange}
                          className="w-full px-3 py-2 border border-[#d2af6f] rounded bg-white focus:outline-[#8b2727] focus:ring-2 focus:ring-[#8b2727]" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Rating</label>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <button type="button" key={i} onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                              className="text-xl focus:outline-none">{i < newReview.rating ? <span className="text-[#d2af6f]">★</span> : <span className="text-gray-300">★</span>}
                            </button>
                          ))}
                        </div>
                        <select id="rating" name="rating" value={newReview.rating} onChange={handleReviewChange}
                          className="w-full px-3 py-2 border border-[#d2af6f] rounded bg-white focus:outline-[#8b2727]">
                          <option value="5">5 - Excellent</option>
                          <option value="4">4 - Very Good</option>
                          <option value="3">3 - Good</option>
                          <option value="2">2 - Fair</option>
                          <option value="1">1 - Poor</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="comment" className="block text-xs font-semibold text-gray-700 mb-1">Your Review</label>
                        <textarea id="comment" name="comment" value={newReview.comment} onChange={handleReviewChange} rows={3}
                          className="w-full px-3 py-2 border border-[#d2af6f] rounded bg-white focus:outline-[#8b2727]" required />
                      </div>
                      <button type="submit"
                        className="bg-[#8b2727] hover:bg-[#6a1d1d] text-white px-7 py-3 rounded-lg font-bold">
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-10" />
      </div>
    </div>
  );
};

export default ProductDetails;
