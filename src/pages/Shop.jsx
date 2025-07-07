import React, { useEffect, useState } from "react";
import { Search, Filter, Grid, List, ChevronDown, Star, ShoppingCart, Home, ChevronRight, X } from "lucide-react";

const Shop = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [categories, setCategories] = useState([]);

  // Mock cart function since we don't have the context
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Added to cart:', product);
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
    setCurrentPage(1);
  }, [data, searchTerm, selectedCategory, priceRange, sortBy]);

  const createSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Pagination
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

  const SidebarFilters = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'h-full overflow-y-auto' : ''}`}>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#d2af6f]/20 h-fit sticky top-6">
        {isMobile && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#8b2727]">Filters</h2>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="p-2 hover:bg-[#f8f3e9] rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[#8b2727]" />
            </button>
          </div>
        )}

        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-[#8b2727] mb-2">Search Products</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b2727] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-[#8b2727] mb-2">Category</label>
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
            <label className="block text-sm font-medium text-[#8b2727] mb-2">
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
            <label className="block text-sm font-medium text-[#8b2727] mb-2">Sort By</label>
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

          {/* Clear Filters */}
          <div className="pt-4 border-t border-[#d2af6f]/20">
            <button
              onClick={clearFilters}
              className="w-full text-white p-3 rounded-xl hover:text-black hover:bg-[#d2af6f] font-medium bg-[#8b2727] cursor-pointer transition-colors"
            >
              Clear All Filters
            </button>
            <div className="text-center mt-3">
              <span className="text-[#8b2727] font-medium">
                {filteredData.length} products found
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2]">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-[#d2af6f]/30">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="flex items-center hover:text-[#8b2727] transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#8b2727] font-medium">Shop</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <SidebarFilters />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Header */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 border border-[#d2af6f]/20 lg:hidden">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#8b2727] text-white rounded-xl hover:bg-[#d2af6f] transition-colors hover:text-black cursor-pointer"
                >
                  <Filter className="w-5 h-5" />
                  Filters
                </button>
                
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
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-[#8b2727]">Our Products</h1>
                <span className="text-[#8b2727] font-medium">({filteredData.length} items)</span>
              </div>
              
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

            {/* Products Grid/List */}
            <div className={`${viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6' 
              : 'space-y-4'
            } mb-8`}>
              {currentProducts.map((product) => (
                <div 
                  key={product.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#d2af6f]/20 hover:border-[#8b2727] ${viewMode === 'list' ? 'flex p-4' : 'p-6'}`}
                >
                  {/* Clickable Image */}
                  <a 
                    href={`/shop/${createSlug(product.title)}`}
                    className={`${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0 mr-6' : 'w-full h-48 mb-4'} bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] rounded-xl flex items-center justify-center overflow-hidden group`}
                  >
                    <img
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      src={product.images[0]}
                      alt={product.title}
                    />
                  </a>
                  
                  {/* Non-clickable Product Info */}
                  <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                        {product.title.length > (viewMode === 'list' ? 50 : 25) 
                          ? product.title.slice(0, viewMode === 'list' ? 50 : 25) + "..." 
                          : product.title}
                      </h3>
                      <div className="flex items-center bg-[#f8f3e9] px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 text-[#8b2727] fill-current" />
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
                      className="w-full bg-gradient-to-r from-[#8b2727] to-[#a83333] hover:from-[#6a1d1d] hover:to-[#8b2727] text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg cursor-pointer"
                    >
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
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] shadow-xl overflow-y-auto">
            <div className="p-4">
              <SidebarFilters isMobile={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;  