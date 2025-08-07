import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Home,
  ChevronRight,
  Mail,
  MessageCircle,
  User,
  ArrowLeft,
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

  // Loader
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-200">
        <div className="text-lg text-gray-600 bg-white/70 p-12 rounded-3xl shadow-2xl flex flex-col items-center">
          <div className="loader-custom mb-6" />
          <span className="font-medium tracking-wide">Loading product details...</span>
        </div>
        <style>{`
        .loader-custom {
          width: 52px; height: 52px; border: 4px solid #be123c;
          border-bottom-color: transparent;
          border-radius: 50%; animation: spin 0.9s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg);} }
      `}</style>
      </div>
    );
  }

  // 404 or no title
  if (!title || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-platinum via-red-50 to-yellow-100">
        <div className="bg-white/70 rounded-[2rem] shadow-2xl border border-[#f2d5bb] p-12 text-center flex flex-col items-center max-w-lg">
          <ArrowLeft className="mb-4 w-8 h-8 text-[#b36a26]" />
          <h1 className="text-2xl font-extrabold text-neutral-700 mb-3">Product Not Found</h1>
          <p className="text-base text-neutral-500 mb-7">Sorry, the product you're looking for doesn't exist.</p>
          <Link to="/" className="bg-gradient-to-r from-[#ea5c3b] to-[#a81140] hover:from-[#a81140] hover:to-[#ea5c3b] text-white px-8 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg transition-all duration-300">
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  // Premium Product Details UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] via-[#f7ece6] to-[#fde5ed]">
      {/* Breadcrumbs */}
      <nav className="backdrop-blur-md bg-white/80 border-b sticky top-0 z-30 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-gray-500 text-xs sm:text-base">
          <Link to="/" className="hover:text-[#e53e3e] transition font-semibold flex items-center">
            <Home className="w-4 h-4 mr-1 opacity-80" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-[#e53e3e] transition">
            Shop
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#a33e3e] font-semibold truncate whitespace-nowrap">{product.title}</span>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl p-4 md:py-10 min-h-[80vh]">
        <div className="rounded-3xl shadow-[0_30px_60px_-20px_rgba(181,70,107,0.13)] border border-[#fde6d0] bg-white/90 p-4 md:p-10 flex flex-col gap-10 backdrop-blur-xl">
          {/* Main Product Row */}
          <div className="flex flex-col md:flex-row gap-12">
            {/* Big image & thumbs */}
            <div className="md:w-[44%] flex flex-col gap-6 items-center md:items-start relative">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-xl group bg-gradient-to-br from-white/80 to-[#f8e7d9]/60 border border-[#eddad1] backdrop-blur-lg">
                <img
                  src={product.images[currentImage]}
                  alt={product.title}
                  className="w-full aspect-[4/3] object-contain transition-all duration-500 group-hover:scale-105 group-hover:brightness-105"
                  style={{ minHeight: 320, maxHeight: 400, background: 'linear-gradient(120deg, #fdf6ee 70%, #f2ecd6 100%)' }}
                  draggable={false}
                />
                {product.discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 bg-gradient-to-br from-[#fa5252] to-[#ffb4a2] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-xl border border-white/30 tracking-wide uppercase">
                    {Math.round(product.discountPercentage)}% OFF
                  </span>
                )}
                {/* FABs */}
                <div className="flex gap-3 absolute right-4 bottom-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="rounded-full border px-3 py-2 bg-white/80 hover:bg-white/95 shadow-lg backdrop-blur-lg text-[#a33e3e] hover:text-[#ea5c3b] transition" title="Share">
                    {/* You can connect the Share function */}
                    <svg width={18} height={18} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 5l-8.5 7L16 19"/></svg>
                  </button>
                  <button className="rounded-full border px-3 py-2 bg-white/80 hover:bg-white/95 shadow-lg backdrop-blur-lg text-[#a33e3e] hover:text-[#ea5c3b] transition" title="Wishlist">
                    <svg width={18} height={18} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 
                                16.5 3 19.58 3 22 5.41 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                </div>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pt-3 w-full">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`transition-all hover:scale-105 border rounded-xl shadow-sm ${currentImage === idx ? "border-[#e53e3e] ring-2 ring-[#fa5252]/40" : "border-[#ececec]"}`}
                  >
                    <img
                      src={img}
                      alt={`Product preview ${idx + 1}`}
                      className="w-20 h-20 object-contain rounded-xl"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <section className="flex-1 flex flex-col gap-9">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-snug text-transparent bg-gradient-to-r from-[#e53e3e] via-[#3e1c6e] to-[#ad4d25] bg-clip-text mb-3">
                  {product.title}
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-xl shadow text-yellow-700 font-bold">
                    <span className="text-lg">★</span>
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-gradient-to-br from-[#e53e3e]/20 via-yellow-100 to-white shadow border">
                    {product.category}
                  </span>
                  <span className="text-xs bg-white border border-[#f2d5bb] px-3 py-1 rounded-full text-[#a33e3e] font-medium">{product.brand}</span>
                </div>
              </div>
              <p className="text-neutral-600 mb-3 text-lg">{product.description}</p>
              <div className="flex items-center gap-6 mb-2">
                <span className="text-3xl text-[#e53e3e] font-extrabold">₹{product.price}</span>
                {product.discountPercentage > 0 && (
                  <span className="px-3 py-1 text-green-700 bg-green-50 rounded-full text-xs tracking-wider">
                    {product.discountPercentage}% off
                  </span>
                )}
                {product.stock <= 10 ? (
                  <span className="flex items-center gap-1 text-orange-600 font-medium">
                    <span className="inline-block w-2 h-2 bg-orange-500 animate-pulse rounded-full" />
                    Only {product.stock} left
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-green-700 font-medium">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
                    In stock
                  </span>
                )}
              </div>
              <div className="flex gap-4 sm:gap-7 items-center">
                <div className="flex items-center bg-white/80 border border-[#f2d5bb] rounded-xl shadow transition-all duration-200">
                  <button onClick={decrementQuantity} disabled={quantity <= 1}
                    className="px-4 py-2 font-black text-xl text-gray-500 hover:text-[#e53e3e] transition-colors disabled:opacity-60">-</button>
                  <span className="px-8 py-2 border-x text-lg">{quantity}</span>
                  <button onClick={incrementQuantity} disabled={quantity >= product.stock}
                    className="px-4 py-2 font-black text-xl text-gray-500 hover:text-[#e53e3e] transition-colors rounded-r-xl disabled:opacity-60">+</button>
                </div>
                <button onClick={handleEmailInquiry}
                  className="group flex-1 sm:flex-none bg-gradient-to-br from-[#70a1e7] via-blue-400 to-[#357edd] hover:from-[#357edd] hover:to-[#6bbaf7] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300">
                  <Mail className="w-5 h-5 opacity-80 group-hover:-translate-y-1 transition" /> Email
                </button>
                <button onClick={handleWhatsAppInquiry}
                  className="group flex-1 sm:flex-none bg-gradient-to-br from-[#63d471] via-[#a3eea0] to-[#2dd563] hover:from-[#129535] hover:to-[#63d471] text-green-900 px-5 py-3 rounded-2xl shadow-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300">
                  <MessageCircle className="w-5 h-5 opacity-80 group-hover:scale-125 transition" /> WhatsApp
                </button>
              </div>
            </section>
          </div>

          {/* Tabs */}
          <div className="mt-2">
            <div className="border-b flex gap-2 sm:gap-8 font-semibold text-base">
              {["description", "details", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-4 transition-all rounded-t-2xl duration-300
                    ${activeTab === tab ? "bg-gradient-to-tr from-[#ffdeda] via-[#ffefef]/80 to-[#fffbe6] border-b-2 border-[#e53e3e] text-[#e53e3e] shadow"
                      : "bg-transparent text-neutral-500 hover:bg-[#f6f6f6] hover:text-[#e53e3e]/70"}`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="pt-7 pb-2">
              {activeTab === "description" && (
                <div className="bg-white/90 p-8 rounded-2xl shadow-inner border border-[#ecd5b4]/50">
                  <h3 className="text-xl font-bold mb-3 text-[#e53e3e]">Product Description</h3>
                  <p className="text-neutral-700 text-lg">{product.description}</p>
                </div>
              )}
              {activeTab === "details" && (
                <div className="bg-white p-8 rounded-2xl shadow-inner border border-[#ecd5b4]/50">
                  <h3 className="text-xl font-bold mb-3 text-[#e53e3e]">Additional Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <span className="flex justify-between border-b py-2"><span className="font-bold">Brand:</span> <span>{product.brand}</span></span>
                    <span className="flex justify-between border-b py-2"><span className="font-bold">Category:</span> <span>{product.category}</span></span>
                    <span className="flex justify-between border-b py-2"><span className="font-bold">Stock:</span> <span>{product.stock} units</span></span>
                    <span className="flex justify-between border-b py-2"><span className="font-bold">Rating:</span> <span>{product.rating}/5</span></span>
                    <span className="flex justify-between border-b py-2"><span className="font-bold">Discount:</span> <span>{product.discountPercentage}%</span></span>
                  </div>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="bg-white/95 p-8 rounded-2xl shadow-lg border border-[#eec7a0]/40">
                  <h3 className="text-xl font-bold mb-6 text-[#e53e3e]">Customer Reviews</h3>
                  {reviews.length > 0 ? (
                    <div className="space-y-4 mb-8">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 flex gap-4 items-center hover:bg-[#fffbe6]/60 rounded-xl transition">
                          <div className="flex items-center justify-center bg-gradient-to-br from-[#fde6e3] to-[#fdeced] w-11 h-11 rounded-full shadow">
                            <User className="text-[#e53e3e]" size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[#a33e3e]">{review.name}</span>
                              <span className="text-xs text-gray-400">{review.date}</span>
                            </div>
                            <div className="flex items-center my-1 gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < review.rating ? "text-yellow-400 text-lg" : "text-gray-200 text-lg"}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <p className="text-gray-700 mt-1">{review.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-5 bg-[#fffbe6]/80 p-4 rounded-lg font-medium">
                      No reviews yet. Be the first to review this product!
                    </p>
                  )}
                  {/* Review form */}
                  <div className="p-6 bg-gradient-to-br from-[#fffbe6]/70 to-white/90 rounded-2xl shadow-inner border border-[#ecd5b4]/60">
                    <h4 className="font-bold mb-4 text-[#e53e3e]">Leave a Review</h4>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-gray-500 mb-1">Your Name</label>
                        <input type="text" id="name" name="name" value={newReview.name} onChange={handleReviewChange}
                          className="w-full px-3 py-2 border border-[#ecd5b4] rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#e53e3e]" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Rating</label>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <button type="button" key={i} onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                              className="text-2xl focus:outline-none">{i < newReview.rating ? <span className="text-yellow-500">★</span> : <span className="text-gray-300">★</span>}
                            </button>
                          ))}
                        </div>
                        <select id="rating" name="rating" value={newReview.rating} onChange={handleReviewChange}
                          className="w-full px-3 py-2 border border-[#ecd5b4] rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#e53e3e]">
                          <option value="5">5 - Excellent</option>
                          <option value="4">4 - Very Good</option>
                          <option value="3">3 - Good</option>
                          <option value="2">2 - Fair</option>
                          <option value="1">1 - Poor</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="comment" className="block text-xs font-semibold text-gray-500 mb-1">Your Review</label>
                        <textarea id="comment" name="comment" value={newReview.comment} onChange={handleReviewChange} rows={3}
                          className="w-full px-3 py-2 border border-[#ecd5b4] rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#e53e3e]" required />
                      </div>
                      <button type="submit"
                        className="bg-gradient-to-r from-[#fa5252] via-[#ea5c3b] to-[#ad4d25] hover:from-[#ad4d25] hover:to-[#e53e3e] text-white px-7 py-3 rounded-full shadow-lg transition font-bold">
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Spacer */}
        <div className="h-12" />
      </div>
    </div>
  );
};

export default ProductDetails;
