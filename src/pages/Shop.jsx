import React, { useEffect, useState } from "react";
import { Search, Filter, Grid, List, ChevronDown, Star, ShoppingCart, Home, ChevronRight } from "lucide-react";

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

  // Mock cart functionality
  const addToCart = (product) => {
    console.log('Added to cart:', product);
  };

  // Add to cart function
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then(response => response.json())
      .then(data => {
        setData(data.products);
        setFilteredData(data.products);
        
        const uniqueCategories = [...new Set(data.products.map(product => product.category))];
        setCategories(uniqueCategories);
        
        const maxPrice = Math.max(...data.products.map(product => product.price));
        setPriceRange([0, Math.ceil(maxPrice)]);
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = data.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

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
    setCurrentPage(1);
  }, [data, searchTerm, selectedCategory, priceRange, sortBy]);

  const createSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredData.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <div className="text-xl text-[#8b2727] font-medium">Loading amazing products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2]">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-[#d2af6f]/30">
        <div className="container mx-auto max-w-7xl px-3 sm:px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="flex items-center hover:text-[#8b2727] transition-colors">
              <Home className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Home</span>
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#8b2727] font-medium">Shop</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-3 sm:px-4 py-4 sm:py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-[#d2af6f]/20">
          <div className="flex flex-col gap-4">
            {/* Search and Controls Row */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b2727] focus:border-transparent text-sm sm:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Mobile: Filter and View Mode in same row */}
              <div className="flex gap-2 sm:gap-3">
                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#8b2727] text-white rounded-xl hover:bg-[#d2af6f] transition-colors hover:text-black cursor-pointer text-sm sm:text-base flex-1 sm:flex-initial justify-center"
                >
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Filters</span>
                  <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                {/* View Mode */}
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 sm:p-3 ${viewMode === "grid" ? 'bg-[#8b2727] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer'} transition-colors`}
                  >
                    <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 sm:p-3 ${viewMode === "list" ? 'bg-[#8b2727] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer'} transition-colors`}
                  >
                    <List className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#d2af6f]/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b2727] focus:border-transparent text-sm sm:text-base"
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
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b2727] focus:border-transparent text-sm sm:text-base"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 2000])}
                      className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b2727] focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2.5 sm:p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b2727] focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="default">Default</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="rating">Rating (High to Low)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
                <button
                  onClick={clearFilters}
                  className="w-full sm:w-auto text-white px-4 py-2.5 rounded-xl hover:text-black hover:bg-[#d2af6f] font-medium bg-[#8b2727] cursor-pointer text-sm sm:text-base transition-colors"
                >
                  Clear All Filters
                </button>
                <span className="text-gray-600 text-sm sm:text-base">
                  {filteredData.length} products found
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        <div className={`${viewMode === 'grid' 
          ? 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6' 
          : 'space-y-3 sm:space-y-4'
        } mb-6 sm:mb-8`}>
          {currentProducts.map((product) => (
            <div 
              key={product.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#d2af6f]/20 hover:border-[#8b2727] ${
                viewMode === 'list' 
                  ? 'flex flex-col sm:flex-row p-3 sm:p-4 gap-3 sm:gap-4' 
                  : 'p-3 sm:p-4 lg:p-6'
              }`}
            >
              {/* Product Image */}
              <div className={`${
                viewMode === 'list' 
                  ? 'w-full sm:w-32 md:w-48 h-32 sm:h-24 md:h-32 flex-shrink-0' 
                  : 'w-full h-32 sm:h-40 lg:h-48 mb-3 sm:mb-4'
              } bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] rounded-xl flex items-center justify-center overflow-hidden group cursor-pointer`}>
                <img
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  src={product.images[0]}
                  alt={product.title}
                />
              </div>
              
              {/* Product Info */}
              <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-semibold text-gray-800 leading-tight ${
                    viewMode === 'list' ? 'text-sm sm:text-base lg:text-lg' : 'text-sm sm:text-base lg:text-lg'
                  }`}>
                    {product.title.length > (viewMode === 'list' ? 35 : 25) 
                      ? product.title.slice(0, viewMode === 'list' ? 35 : 25) + "..." 
                      : product.title}
                  </h3>
                  <div className="flex items-center bg-[#f8f3e9] px-2 py-1 rounded-full ml-2 flex-shrink-0">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-[#8b2727] fill-current" />
                    <span className="text-xs sm:text-sm text-gray-700 ml-1 font-medium">{product.rating}</span>
                  </div>
                </div>
                
                <p className={`text-gray-600 mb-3 line-clamp-2 ${
                  viewMode === 'list' ? 'text-xs sm:text-sm' : 'text-xs sm:text-sm'
                }`}>
                  {product.description.length > (viewMode === 'list' ? 80 : 60) 
                    ? product.description.slice(0, viewMode === 'list' ? 80 : 60) + "..." 
                    : product.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-bold text-[#8b2727] ${
                    viewMode === 'list' ? 'text-lg sm:text-xl lg:text-2xl' : 'text-lg sm:text-xl lg:text-2xl'
                  }`}>
                    ${product.price}
                  </span>
                  <span className="text-xs text-[#8b2727] bg-[#f8f3e9] px-2 py-1 rounded-full font-medium">
                    {product.category}
                  </span>
                </div>
              
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className={`w-full bg-gradient-to-r from-[#8b2727] to-[#a83333] hover:from-[#6a1d1d] hover:to-[#8b2727] text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg cursor-pointer ${
                    viewMode === 'list' ? 'py-2 px-3 text-sm' : 'py-2.5 sm:py-3 px-4 text-sm sm:text-base'
                  }`}
                >
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 sm:gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 bg-[#d2af6f] border border-[#d2af6f]/30 rounded-lg hover:bg-[#8b2727] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer hover:text-white text-sm sm:text-base flex-shrink-0"
            >
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>
            
            {[...Array(Math.min(totalPages, window.innerWidth < 640 ? 3 : 5))].map((_, index) => {
              const pageNumber = currentPage <= 2 ? index + 1 : currentPage - 1 + index;
              if (pageNumber > totalPages) return null;
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`px-3 sm:px-4 py-2 border rounded-lg transition-colors text-sm sm:text-base flex-shrink-0 ${
                    currentPage === pageNumber
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
              className="px-3 sm:px-4 py-2 bg-[#d2af6f] border border-[#d2af6f]/30 rounded-lg hover:bg-[#8b2727] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer text-sm sm:text-base flex-shrink-0"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredData.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="text-4xl sm:text-6xl mb-4">🔍</div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#8b2727] mb-2">No products found</h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearFilters}
              className="bg-[#8b2727] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-[#6a1d1d] transition-colors text-sm sm:text-base"
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