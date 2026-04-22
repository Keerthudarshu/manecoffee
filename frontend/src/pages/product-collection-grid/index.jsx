import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import SEO from '../../components/SEO';
import { useCart } from '../../contexts/CartContext';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterSidebar from './components/FilterSidebar';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';
import ProductGrid from './components/ProductGrid';
import QuickViewModal from './components/QuickViewModal';
import Button from '../../components/ui/Button';
import dataService from '../../services/dataService';
import productApi from '../../services/productApi';
import categoryApi from '../../services/categoryApi';
import apiClient from '../../services/api';
import { resolveImageUrl } from '../../lib/resolveImageUrl';

const ProductCollectionGrid = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { addToCart, getCartItemCount, cartItems, addToWishlist, removeFromWishlist, isInWishlist, wishlistItems: wishlistState } = useCart();

  // Check if this is a categories view and redirect to dedicated page
  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam === 'categories') {
      window.location.href = '/categories';
    }
  }, [searchParams]);

  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('best-selling');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  // Derive wishlist ids from CartContext to drive heart fill state
  const wishlistItems = (wishlistState || []).map(w => w.id);

  // Filter state
  const [filters, setFilters] = useState({
    priceRange: [],
    weight: [],
    categories: [],
    coffeeType: []
  });

  // Auto-apply category filter from URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
  }, [searchParams]);

  // Initialize products and apply URL filters (category, search)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        let allProducts = [];
        let normalizedProducts = [];
        let searchParamRaw = searchParams.get('search') || '';
        if (searchParamRaw) {
          // Try direct API search if available
          try {
            allProducts = await productApi.search(searchParamRaw);
            console.log('API search returned:', allProducts.length);
          } catch (e) {
            console.warn('API search failed, falling back to getAll:', e?.message);
            allProducts = await productApi.getAll();
          }
        } else {
          try {
            allProducts = await productApi.getAll();
          } catch (e) {
            console.warn('Public API failed, falling back to local data:', e?.message);
            const response = await dataService.getProducts();
            allProducts = response?.data || [];
          }
        }

        // Normalize backend products to UI shape
        normalizedProducts = allProducts.map((p) => {
          const variants = Array.isArray(p?.variants) ? p.variants : [];
          const firstVariant = variants[0];
          const formatVariantWeight = (variant) => {
            if (!variant) return null;
            if (variant.weight) return variant.weight;
            if (variant.weightValue) return `${variant.weightValue}${variant.weightUnit || ''}`;
            return null;
          };
          return {
            id: p?.id,
            name: p?.name || p?.title,
            category: p?.category || p?.categoryId || p?.subcategory || 'misc',
            categoryId: p?.categoryId ?? (p?.category && typeof p.category === 'object' && p.category?.id ? p.category.id : undefined),
            categoryName: p?.categoryName ?? (p?.category && typeof p.category === 'object' && p.category?.name ? p.category.name : (typeof p?.category === 'string' ? p.category : undefined)),
            subcategory: p?.subcategory,
            brand: p?.brand || p?.manufacturer || 'Brand',
            price: p?.price ?? p?.salePrice ?? p?.mrp ?? 0,
            salePrice: p?.salePrice ?? p?.price ?? p?.mrp ?? 0,
            originalPrice: p?.originalPrice ?? p?.mrp ?? p?.price ?? 0,
            rating: p?.rating ?? p?.ratingValue ?? 0,
            bestseller: Boolean(p?.bestseller),
            image: resolveImageUrl(p?.imageUrl),
            description: p?.description || '',
            stockQuantity: p?.stockQuantity ?? null,
            inStock: p?.inStock !== false,
            weight: formatVariantWeight(firstVariant) || 'N/A',
            variants
          };
        });

        setProducts(normalizedProducts);
        setFilteredProducts(normalizedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [location.search]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply filters
    if (filters?.priceRange?.length > 0) {
      filtered = filtered?.filter(product => {
        return filters?.priceRange?.some(range => {
          switch (range) {
            case 'under-200':
              return product?.salePrice < 200;
            case '200-500':
              return product?.salePrice >= 200 && product?.salePrice <= 500;
            case '500-1000':
              return product?.salePrice >= 500 && product?.salePrice <= 1000;
            case 'above-1000':
              return product?.salePrice > 1000;
            default:
              return true;
          }
        });
      });
    }

    if (filters?.weight?.length > 0) {
      filtered = filtered?.filter(product =>
        filters?.weight?.some(w => String(product?.weight || '').toLowerCase().includes(w.toLowerCase()))
      );
    }

    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(product => {
        return filters?.categories?.some(cat => {
          const productCat = String(product?.categoryName || product?.category || '').toLowerCase();
          return productCat.includes(cat.toLowerCase());
        });
      });
    }

    if (filters?.coffeeType?.length > 0) {
      filtered = filtered?.filter(product => {
        const textToSearch = `${product.name} ${product.description}`.toLowerCase();
        return filters?.coffeeType?.some(type => {
          if (type === 'Arabica + Robusta') {
            return textToSearch.includes('arabica') && textToSearch.includes('robusta');
          }
          return textToSearch.includes(type.toLowerCase());
        });
      });
    }

    // Apply sorting
    switch (currentSort) {
      case 'price-low-high':
        filtered?.sort((a, b) => a?.salePrice - b?.salePrice);
        break;
      case 'price-high-low':
        filtered?.sort((a, b) => b?.salePrice - a?.salePrice);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      case 'oldest':
        filtered?.sort((a, b) => a?.id - b?.id);
        break;
      case 'name-a-z':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case 'name-z-a':
        filtered?.sort((a, b) => b?.name?.localeCompare(a?.name));
        break;
      case 'rating-high-low':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'best-selling':
      default:
        filtered?.sort((a, b) => (b?.bestseller ? 1 : 0) - (a?.bestseller ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters, currentSort]);

  // Handle filter changes
  const handleFilterChange = (filterType, newValue) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: newValue
    }));
  };

  const handleRemoveFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev?.[filterType]?.filter(item => item !== value)
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      priceRange: [],
      weight: [],
      categories: [],
      coffeeType: []
    });
  };

  // Handle product actions
  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = (product, variant = null, quantity = 1) => {
    const formatVariantLabel = (variant) => {
      if (!variant) return null;
      if (variant.weight) return variant.weight;
      if (variant.weightValue) return `${variant.weightValue}${variant.weightUnit || ''}`;
      return null;
    };

    if (!product || !product.id) {
      console.error('Cannot add to cart: product or product.id is undefined', { product, variant });
      return;
    }

    // If variant is not an object (e.g., a number), show error and do not proceed
    if (variant && typeof variant !== 'object') {
      alert('Invalid product variant selected. Please try again.');
      console.error('Invalid variant type for add to cart:', { product, variant });
      return;
    }

    let variantId = null;
    let weightValue = null;
    let weightUnit = null;
    let variantLabel = formatVariantLabel(variant) || 'Default';
    if (variant && typeof variant === 'object') {
      variantId = variant.id || null;
      weightValue = variant.weightValue || null;
      weightUnit = variant.weightUnit || null;
    } else if (product.variants && Array.isArray(product.variants) && product.variants[0]) {
      const v = product.variants[0];
      variantId = v.id || null;
      weightValue = v.weightValue || null;
      weightUnit = v.weightUnit || null;
      if (!variantLabel || variantLabel === 'Default') {
        variantLabel = formatVariantLabel(v) || 'Default';
      }
    }

    const productToAdd = {
      id: product.id,
      productId: product.id,
      variantId: variantId,
      name: product.name,
      image: product.image,
      price: (variant && variant.price) ? variant.price : product.price,
      originalPrice: (variant && variant.originalPrice) ? variant.originalPrice : product.originalPrice,
      variant: variantLabel,
      category: product.category,
      brand: product.brand,
      weightValue: weightValue,
      weightUnit: weightUnit
    };

    console.log('handleAddToCart debug:', { product, variant, productToAdd });
    addToCart(productToAdd, quantity);
    // Show success feedback
    console.log('Added to cart:', productToAdd);
  };

  const handleAddToWishlist = (productOrId) => {
    const product = typeof productOrId === 'object' ? productOrId : products.find(p => p.id === productOrId);
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
        // pass stock info when available
        ...(product.stockQuantity !== undefined ? { stockQuantity: product.stockQuantity } : {}),
        ...(product.inStock !== undefined ? { inStock: product.inStock } : {})
      });
    }
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage' },
    { label: 'Products', path: '/product-collection-grid' }
  ];

  // Category mapping for display - Coffee Heritage
  const categoryMap = {
    '1': { name: 'Signature Arabica', badge: 'Premium' },
    '2': { name: 'Pure Robusta', badge: 'Strong' },
    '3': { name: 'Artisan Blends', badge: 'Best Seller' },
    '4': { name: 'Filter Coffee', badge: 'Traditional' },
    '5': { name: 'Estate Specials', badge: 'Limited' },
    '6': { name: 'Medium Roast', badge: 'Balanced' },
    '7': { name: 'Dark Roast', badge: 'Intense' },
    '8': { name: 'Green Coffee', badge: 'Healthy' },
    '9': { name: 'Other Specials', badge: '' }
  };

  const categoryId = searchParams?.get('category');
  const categoryTitle = categoryId && categoryMap[categoryId]?.name ? categoryMap[categoryId].name : (searchParams?.get('category')?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase()) || 'All Products');
  const categoryBadge = categoryId && categoryMap[categoryId]?.badge ? categoryMap[categoryId].badge : '';
  // Detect if woodpressed oils category is selected
  const isWoodPressedOils = (() => {
    const param = (searchParams?.get('category') || '').toLowerCase().replace(/\s+/g, '-');
    return [
      'wood-pressed-oils',
      'woodpressed-oils',
      'wood pressed oils',
      'wood-pressed-oil',
      'woodpressedoil',
      'wood pressed oil'
    ].some(v => param === v.replace(/\s+/g, '-')) || (param.includes('wood') && param.includes('oil'));
  })();

  return (
    <>
      <SEO 
        title={categoryTitle}
        description={`Explore our ${categoryTitle} collection. Pure, shade-grown coffee from Coorg estates, roasted to bring out the authentic Kodagu flavor.`}
        keywords={`buy ${categoryTitle}, Coorg coffee online, Arabica Robusta blends, Kodagu coffee beans, fresh roasted coffee India, Mane Coffee products`}
        canonical="/product-collection-grid"
        ogTitle={`${categoryTitle} - Mane Coffee Finest Collection`}
        ogDescription={`Discover the best of ${categoryTitle} from the hills of Coorg. Premium quality beans delivered to your doorstep.`}
      />
      <div className="min-h-screen bg-[#efe5d7]">
      <Header 
        cartItemCount={getCartItemCount()}
        cartItems={cartItems}
        onSearch={(query) => console.log('Search:', query)}
      />
      <main className="w-full py-0">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0 border-r border-[#2a1f0e]/10 bg-white">
            <FilterSidebar
              isOpen={false}
              onClose={() => {}}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearAllFilters}
              products={products}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 px-8 py-4 space-y-6 overflow-y-auto">
            <Breadcrumb customItems={breadcrumbItems} className="mb-4" />
            
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="font-heading font-bold text-3xl text-[#2a1f0e]">
                  {categoryTitle}
                </h1>
                {categoryBadge && (
                  <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold shadow border border-accent/20">
                    {categoryBadge}
                  </span>
                )}
              </div>
              <p className="font-body text-[#2a1f0e]/70">
                Discover our collection of natural, handmade products crafted with love and tradition.
              </p>
            </div>

            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setIsMobileFilterOpen(true)}
                iconName="Filter"
                iconPosition="left"
                className="lg:hidden text-[#2a1f0e] border-[#2a1f0e]/20"
              >
                Filters
              </Button>

              <div className="flex items-center gap-4">
                <span className="font-body text-sm text-[#2a1f0e]/60">
                  {filteredProducts?.length} products
                </span>
                <SortDropdown
                  currentSort={currentSort}
                  onSortChange={setCurrentSort}
                />
              </div>
            </div>

            {/* Active Filter Chips */}
            <FilterChips
              activeFilters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />

            {/* Product Grid */}
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              onQuickView={handleQuickView}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              wishlistItems={wishlistItems}
            />

            {/* Load More Button */}
            {!loading && filteredProducts?.length > 0 && hasMoreProducts && (
              <div className="text-center pt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Simulate loading more products
                    setCurrentPage(prev => prev + 1);
                    // In real app, this would load more products
                    if (currentPage >= 3) {
                      setHasMoreProducts(false);
                    }
                  }}
                >
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearAllFilters}
        products={products}
        isMobile={true}
      />
      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => {
          setIsQuickViewOpen(false);
          setQuickViewProduct(null);
        }}
        onAddToCart={handleAddToCart}
      />
    </div>
    </>
  );
};

export default ProductCollectionGrid;