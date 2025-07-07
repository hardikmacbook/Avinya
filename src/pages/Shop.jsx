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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600 font-medium">Loading products...</div>
        </div>
      </div>
    );
  }

  const SidebarFilters = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'p-6' : 'p-6'} space-y-6`}>
      {isMobile && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
          <button
            onClick={() => setShowMobileFilters(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min Price"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 2000])}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="default">Default</option>
          <option value="name">Name (A-Z)</option>
          <option value="price-low">Price (Low to High)</option>
          <option value="price-high">Price (High to Low)</option>
          <option value="rating">Rating (High to Low)</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
      >
        Clear All Filters
      </button>

      <div className="text-sm text-gray-600 pt-4 border-t">
        {filteredData.length} products found
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="flex items-center hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Shop</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 bg-white rounded-lg shadow-sm border h-fit sticky top-6">
            <SidebarFilters />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Header */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <span className="text-gray-600">({filteredData.length} items)</span>
              </div>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8">
                {currentProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        src={product.images[0]}
                        alt={product.title}
                      />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900 leading-tight line-clamp-2 flex-1">
                          {product.title}
                        </h3>
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full ml-2">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price}
                        </span>
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>
                    
                      <button 
                        onClick={(e) => handleAddToCart(e, product)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {currentProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm border p-4 flex gap-4">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={product.images[0]}
                        alt={product.title}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900 text-lg">
                          {product.title}
                        </h3>
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold text-gray-900">
                            ${product.price}
                          </span>
                          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            {product.category}
                          </span>
                        </div>
                        
                        <button 
                          onClick={(e) => handleAddToCart(e, product)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        currentPage === pageNumber
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}

            {/* No Results */}
            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
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
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <SidebarFilters isMobile={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;