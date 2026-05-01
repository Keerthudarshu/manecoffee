import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import productApi from '../../../services/productApi';
import { resolveImageUrl } from '../../../lib/resolveImageUrl';

const FeaturedProductsSection = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('bestsellers');
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState({}); // Track selected variant per product

  const categories = [
    { id: 'bestsellers', name: 'Best Sellers', icon: 'Star', filter: { sort: 'rating', category: null } },
    { id: 'new-arrivals', name: 'New Arrivals', icon: 'Zap', filter: { sort: 'newest', category: null } },
    { id: 'offers', name: 'Special Offers', icon: 'Tag', filter: { minDiscount: 15, category: null } }
  ];

  // Helper function to map database products to display format
  const mapProductData = (dbProduct, categoryName) => {
    const variants = dbProduct.variants || [];

    // Store full variant objects with all details
    const variantObjects = variants.length > 0
      ? variants.map((v, idx) => ({
        id: v.id || `variant-${idx}`,
        label: `${v.weightValue}${v.weightUnit}`,
        weightValue: v.weightValue,
        weightUnit: v.weightUnit,
        price: v.price || dbProduct.price || 0,
        originalPrice: v.originalPrice || v.mrp || (v.price ? Math.round(v.price / (1 - (dbProduct.discount || 0) / 100)) : dbProduct.price),
        stockQuantity: v.stockQuantity || v.stock || 0
      }))
      : [{
        id: 'default',
        label: dbProduct.weightValue ? `${dbProduct.weightValue}${dbProduct.weightUnit}` : 'Default',
        weightValue: dbProduct.weightValue,
        weightUnit: dbProduct.weightUnit,
        price: dbProduct.price || 0,
        originalPrice: dbProduct.originalPrice || dbProduct.mrp || dbProduct.price || 0,
        stockQuantity: dbProduct.stockQuantity || 0
      }];

    const firstVariant = variantObjects[0];
    const price = firstVariant.price || 0;
    const originalPrice = firstVariant.originalPrice || price;
    const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : (dbProduct.discount || 0);

    // Use imageUrl from database, resolve it properly, fallback to default
    const imageUrl = dbProduct.imageUrl || dbProduct.image || '';
    const resolvedImage = imageUrl
      ? resolveImageUrl(imageUrl)
      : '/assets/images/no_image.png';

    return {
      id: dbProduct.id,
      name: dbProduct.name,
      price: price,
      originalPrice: originalPrice,
      rating: dbProduct.rating && dbProduct.rating > 0 ? dbProduct.rating : (Math.floor(Math.random() * 2) + 4), // Default to 4 or 5
      reviews: dbProduct.reviewCount || Math.floor(Math.random() * 50) + 10,
      image: resolvedImage,
      badge: dbProduct.badge || (categoryName === 'Special Offers' ? 'Offer' : 'Featured'),
      variants: variantObjects, // Store full variant objects
      category: dbProduct.category,
      inStock: dbProduct.stockQuantity > 0 || (variantObjects.length > 0 && variantObjects.some(v => v.stockQuantity > 0)),
      discount: discount,
      stockQuantity: dbProduct.stockQuantity
    };
  };

  // Fetch products for each category on mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const productsData = {};

        // Fetch for each category
        for (const category of categories) {
          try {
            let params = { limit: 4 };

            // Add filters based on category
            if (category.filter.category) {
              params.category = category.filter.category;
            }
            if (category.filter.sort) {
              params.sort = category.filter.sort;
            }
            if (category.filter.minDiscount) {
              params.discount = category.filter.minDiscount;
            }

            const categoryProducts = await productApi.getAll(params);
            productsData[category.id] = Array.isArray(categoryProducts)
              ? categoryProducts.map(prod => mapProductData(prod, category.name))
              : [];
          } catch (err) {
            console.error(`Failed to fetch ${category.name}:`, err);
            productsData[category.id] = [];
          }
        }

        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError(err.message || 'Failed to load featured products');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const activeProducts = (products[activeCategory] || []).slice(0, 4);

  // Get selected variant for a product (or default to first variant)
  const getSelectedVariant = (productId, product) => {
    if (selectedVariants[productId] !== undefined) {
      return product.variants[selectedVariants[productId]] || product.variants[0];
    }
    return product.variants[0];
  };

  // Handle variant selection
  const handleVariantSelect = (productId, variantIndex) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variantIndex
    }));
  };

  const handleQuickAdd = (product) => {
    if (onAddToCart) {
      const selectedVariant = getSelectedVariant(product.id, product);
      onAddToCart({
        ...product,
        variant: selectedVariant.label,
        price: selectedVariant.price,
        originalPrice: selectedVariant.originalPrice,
        selectedVariantId: selectedVariant.id
      });
    }
  };

  return (
    <section className="py-8 md:py-16 bg-[#efe5d7]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2a1f0e] mb-3 md:mb-4">
            Our Best Selling Coffee
          </h2>
          <p className="font-body text-sm sm:text-base md:text-lg text-[#2a1f0e]/70 max-w-2xl md:max-w-3xl mx-auto px-2">
            Discover the perfect brew from our premium selection. Each blend is carefully crafted for the ultimate coffee experience.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12 px-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all duration-300 border ${activeCategory === category.id
                ? 'bg-[#C9A227] text-white shadow-gold-md border-[#C9A227]'
                : 'bg-white text-[#1e1509] border-[#1e1509]/10 hover:border-[#C9A227] hover:text-[#C9A227]'
                }`}
            >
              <Icon name={category.icon} size={14} className="sm:size-16 md:size-18" />
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">Loading featured products...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12 text-center">
            <p className="text-red-600 font-medium">Failed to load featured products</p>
            <p className="text-red-500 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && activeProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products available in this category</p>
          </div>
        )}

        {/* Products Display Row with Horizontal Scroll */}
        {!loading && activeProducts.length > 0 && (
          <div className="relative group/featured-scroll">
            {/* Scroll Buttons */}
            <button
              onClick={() => {
                const container = document.getElementById('featured-products-container');
                if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-20 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-[#C9A227] border border-[#C9A227]/20 opacity-0 group-hover/featured-scroll:opacity-100 transition-opacity hidden md:flex hover:bg-[#C9A227] hover:text-white"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>

            <div
              id="featured-products-container"
              className="flex gap-6 overflow-x-auto pb-10 scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {activeProducts.map((product) => {
                const selectedVariant = getSelectedVariant(product.id, product);
                const currentPrice = selectedVariant.price;
                const currentOriginalPrice = selectedVariant.originalPrice;
                const currentDiscount = currentOriginalPrice > currentPrice
                  ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
                  : 0;

                return (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-[64vw] sm:w-[72vw] md:w-[80vw] lg:w-[320px] group bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg border border-border hover:shadow-xl md:hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop&auto=format&q=80';
                        }}
                      />

                      {/* Enhanced Badge */}
                      <div className="absolute top-2 left-2 md:top-3 md:left-3">
                        <span
                          className="bg-[#C9A227] text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-wider shadow-md border border-[#F0C040]/30"
                        >
                          {product.badge}
                        </span>
                      </div>

                      {/* Image Hover Actions (Quick Add & Wishlist) */}
                      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
                        <button
                          onClick={(e) => { e.preventDefault(); handleQuickAdd(product); }}
                          className="flex-1 bg-white text-black font-bold py-2.5 px-4 rounded-xl shadow-lg border border-gray-100 flex items-center justify-center gap-2 hover:bg-gray-50 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                        >
                          <Icon name="ShoppingCart" size={16} /> Quick Add
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); /* Wishlist logic later */ }}
                          className="w-10 h-10 bg-white text-black rounded-full shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:text-red-500 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 flex-shrink-0"
                          aria-label="Add to wishlist"
                        >
                          <Icon name="Heart" size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Product Content */}
                    <div className="p-4 md:p-5">
                      {/* Product Name */}
                      <h3 className="font-heading text-lg md:text-xl font-bold text-[#2a1f0e] mb-1">
                        {product.name}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-sm font-medium text-[#C9A227] mb-3">
                        {product.name.toLowerCase().includes('arabica + robusta') || product.name.toLowerCase().includes('blend') ? 'Strong & Bold | Perfect for Filter Coffee' :
                          product.name.toLowerCase().includes('robusta') ? 'Strong & Bold | Intense Flavor' :
                            'Smooth & Aromatic | Refined Taste'}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={14}
                              className={`${i < Math.floor(product.rating)
                                ? 'text-[#C9A227] fill-current'
                                : 'text-gray-200'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>

                      {/* Coffee Details */}
                      <div className="mb-3 p-3 bg-[#efe5d7] rounded-lg">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <span className="text-[#C9A227]">🌱</span>
                            <span className="text-[#2a1f0e]">Origin: Coorg</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[#C9A227]">🔥</span>
                            <span className="text-[#2a1f0e]">Roast: {
                              product.name.toLowerCase().includes('arabica') && !product.name.toLowerCase().includes('robusta') ? 'Medium' : 'Medium-Dark'
                            }</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[#C9A227]">☕</span>
                            <span className="text-[#2a1f0e]">Taste: {
                              product.name.toLowerCase().includes('arabica + robusta') || product.name.toLowerCase().includes('blend') ? 'Balanced, Smooth' :
                                product.name.toLowerCase().includes('robusta') ? 'Strong, Bold' : 'Smooth, Aromatic'
                            }</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[#C9A227]">✨</span>
                            <span className="text-[#2a1f0e]">Best for: {
                              product.name.toLowerCase().includes('robusta') && !product.name.toLowerCase().includes('arabica') ? 'Espresso/Milk' : 'Filter Coffee'
                            }</span>
                          </div>
                        </div>
                      </div>

                      {/* Weight Options */}
                      {product.variants && product.variants.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-muted-foreground mb-2">Weight:</p>
                          <div className="flex flex-wrap gap-2">
                            {product.variants.slice(0, 5).map((variant, idx) => {
                              const isSelected = selectedVariants[product.id] === idx || (selectedVariants[product.id] === undefined && idx === 0);
                              return (
                                <button
                                  key={idx}
                                  onClick={() => handleVariantSelect(product.id, idx)}
                                  className={`text-xs font-bold px-3 py-1.5 rounded-md border transition-all duration-200 ${isSelected
                                    ? 'bg-[#C9A227] text-white border-[#C9A227] shadow-sm'
                                    : 'bg-white text-[#1e1509] border-[#1e1509]/10 hover:border-[#C9A227]'
                                    }`}
                                >
                                  {variant.label.toUpperCase()}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-heading text-xl font-bold text-[#2a1f0e]">
                            ₹{currentPrice}
                          </span>
                          {currentOriginalPrice > currentPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              MRP ₹{currentOriginalPrice}
                            </span>
                          )}
                        </div>
                        <div className={`text-sm font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          {product.inStock ? '✓ In Stock' : 'Out of Stock'}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleQuickAdd(product)}
                          disabled={!product.inStock}
                          className="flex-1 bg-[#C9A227] text-white py-3 rounded-lg font-bold hover:bg-[#F0C040] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          🛒 Buy Now
                        </button>
                        <a
                          href="https://wa.me/91 90194 45168?text=Hi%20Mane%20Coffee,%20I%20want%20to%20order%20{product.name}"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-400 transition-all duration-300"
                        >
                          <Icon name="MessageCircle" size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                const container = document.getElementById('featured-products-container');
                if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-20 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-[#C9A227] border border-[#C9A227]/20 opacity-0 group-hover/featured-scroll:opacity-100 transition-opacity hidden md:flex hover:bg-[#C9A227] hover:text-white"
            >
              <Icon name="ChevronRight" size={24} />
            </button>
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center">
          <Link
            to="/product-collection-grid"
            className="inline-flex items-center gap-3 bg-[#C9A227] hover:bg-[#F0C040] text-white px-8 py-4 rounded-full font-heading font-bold text-lg transition-all duration-300 hover:scale-105 shadow-gold-lg"
          >
            Shop All Products
            <Icon name="ArrowRight" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;