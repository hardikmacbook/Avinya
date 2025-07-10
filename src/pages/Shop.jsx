import React, { useEffect, useState } from "react";
import { Search, Filter, Grid, List, ChevronDown, Star, ShoppingCart, Home, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";



const Shop = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();

   // Add to cart function
   const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // Stop event bubbling
    addToCart(product);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then(response => response.json())
      .then(data => {
        setData(data.products);
        setFilteredData(data.products);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.products.map(product => product.category))];
        setCategories(uniqueCategories);
        
        // Set max price for price range
        const maxPrice = Math.max(...data.products.map(product => product.price));
        setPriceRange([0, Math.ceil(maxPrice)]);
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = data.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [data, searchTerm, selectedCategory, priceRange, sortBy]);

  // Function to create URL-friendly slugs from product titles
  const createSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredData.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange([0, Math.max(...data.map(product => product.price))]);
    setSortBy("default");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2]">
        <div className="text-center">
          {/* <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#8b2727] mx-auto mb-4"></div> */}
          <div className="text-xl text-[#8b2727] font-medium">Loading amazing products...</div>
        </div>
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
            <span className="text-[#8b2727] font-medium">Shop</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#d2af6f]/20">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b2727] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-[#8b2727] text-white rounded-xl hover:bg-[#d2af6f] transition-colors hover:text-black cursor-pointer"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* View Mode */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 ${viewMode === "grid" ? 'bg-[#8b2727] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer'} transition-colors`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 ${viewMode === "list" ? 'bg-[#8b2727] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer'} transition-colors`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-[#d2af6f]/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b2727] focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b2727] focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 2000])}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b2727] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b2727] focus:border-transparent"
                  >
                    <option value="default">Default</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="rating">Rating (High to Low)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={clearFilters}
                  className="text-white p-2 rounded-2xl hover:text-black hover:bg-[#d2af6f] font-medium bg-[#8b2727] cursor-pointer"
                >
                  Clear All Filters
                </button>
                <span className="text-gray-600">
                  {filteredData.length} products found
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        <div className={`${viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
        } mb-8`}>
          {currentProducts.map((product) => (
            <div 
              key={product.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#d2af6f]/20 hover:border-[#8b2727] ${viewMode === 'list' ? 'flex p-4' : 'p-6'}`}
            >
              {/* Clickable Image */}
              <Link 
                to={`/shop/${createSlug(product.title)}`}
                className={`${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0 mr-6' : 'w-full h-48 mb-4'} bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] rounded-xl flex items-center justify-center overflow-hidden group`}
              >
                <img
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  src={product.images[0]}
                  alt={product.title}
                />
              </Link>
              
              {/* Non-clickable Product Info */}
              <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                    {product.title.length > (viewMode === 'list' ? 50 : 25) 
                      ? product.title.slice(0, viewMode === 'list' ? 50 : 25) + "..." 
                      : product.title}
                  </h3>
                  <div className="flex items-center bg-[#f8f3e9] px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-[#8b2727  ] fill-current" />
                    <span className="text-sm text-gray-700 ml-1 font-medium">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description.length > (viewMode === 'list' ? 120 : 80) 
                    ? product.description.slice(0, viewMode === 'list' ? 120 : 80) + "..." 
                    : product.description}
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
                className="w-full bg-gradient-to-r from-[#8b2727] to-[#a83333] hover:from-[#6a1d1d] hover:to-[#8b2727] text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg cursor-pointer">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#d2af6f] border border-[#d2af6f]/30 rounded-lg hover:bg-[#8b2727] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer hover:text-white"
            >
              Previous
            </button>
            
            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              const pageNumber = currentPage <= 3 ? index + 1 : currentPage - 2 + index;
              if (pageNumber > totalPages) return null;
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`px-4 py-2 border rounded-lg transition-colors ${currentPage === pageNumber
                      ? 'bg-[#8b2727] text-white border-[#8b2727]'
                      : 'bg-white border-[#d2af6f]/30 hover:bg-[#8b2727] hover:text-white cursor-pointer'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#d2af6f] border border-[#d2af6f]/30 rounded-lg hover:bg-[#8b2727] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-[#8b2727] mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearFilters}
              className="bg-[#8b2727] text-white px-6 py-3 rounded-xl hover:bg-[#6a1d1d] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;