import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import productApi from '../../../services/productApi';
import { resolveImageUrl } from '../../../lib/resolveImageUrl';

const CategoryProductsSection = ({ onAddToCart }) => {
    const [activeCategory, setActiveCategory] = useState('Chemical Free Jaggery');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);

    const categories = [
        { name: 'Chemical Free Jaggery', icon: 'Candy' },
        { name: 'Essential Oils', icon: 'Droplets' },
        { name: 'Ghee', icon: 'Heart' },
        { name: 'Honey', icon: 'Flower' },
        { name: 'Papads', icon: 'Cookie' },
        { name: 'Pickles', icon: 'Jar' },
        { name: 'Spice Powders', icon: 'Sparkles' },
        { name: 'Wood Pressed Oils', icon: 'Droplets' }
    ];

    const mapProductData = (dbProduct) => {
        const variants = dbProduct.variants || [];
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

        const imageUrl = dbProduct.imageUrl || dbProduct.image || '';
        const resolvedImage = imageUrl
            ? resolveImageUrl(imageUrl)
            : '/assets/images/no_image.png';

        return {
            id: dbProduct.id,
            name: dbProduct.name,
            price: price,
            originalPrice: originalPrice,
            rating: dbProduct.rating || 0,
            reviews: dbProduct.reviewCount || 0,
            image: resolvedImage,
            badge: dbProduct.badge || 'New',
            variants: variantObjects,
            category: dbProduct.category,
            inStock: dbProduct.stockQuantity > 0 || (variantObjects.length > 0 && variantObjects.some(v => v.stockQuantity > 0)),
            discount: discount,
            stockQuantity: dbProduct.stockQuantity
        };
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log(`Fetching products for category: ${activeCategory}`);
                const data = await productApi.getByCategory(activeCategory, { limit: 8 });
                setProducts(Array.isArray(data) ? data.map(mapProductData) : []);
            } catch (err) {
                console.error('Error fetching products by category:', err);
                setError('Failed to load products for this category');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [activeCategory]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const handleQuickAdd = (product) => {
        if (onAddToCart) {
            const firstVariant = product.variants[0];
            onAddToCart({
                ...product,
                variant: firstVariant.label,
                price: firstVariant.price,
                originalPrice: firstVariant.originalPrice,
                selectedVariantId: firstVariant.id
            });
        }
    };

    return (
        <section className="py-16 bg-background relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="font-heading text-4xl font-bold text-primary mb-4">
                            Our Traditional Treasures
                        </h2>
                        <p className="font-body text-lg text-muted-foreground">
                            Discover the authentic taste of tradition across our curated categories. Handpicked for quality and purity.
                        </p>
                    </div>
                    <Link
                        to={`/product-collection-grid?category=${encodeURIComponent(activeCategory)}`}
                        className="flex items-center text-primary font-semibold hover:text-accent transition-colors duration-300 group"
                    >
                        Explore All {activeCategory}
                        <Icon name="ArrowRight" size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Category Scroll Container */}
                <div className="relative mb-12 group/scroll">
                    {/* Scroll Buttons - Hidden on mobile, visible on hover on desktop */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-primary border border-border opacity-0 group-hover/scroll:opacity-100 transition-opacity hidden md:flex"
                    >
                        <Icon name="ChevronLeft" size={20} />
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar"
                        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 border-2 whitespace-nowrap ${activeCategory === cat.name
                                    ? 'bg-primary text-white border-primary shadow-lg scale-105'
                                    : 'bg-white text-muted-foreground border-border hover:border-primary/30 hover:bg-primary/5'
                                    }`}
                            >
                                <div className={`p-2 rounded-xl ${activeCategory === cat.name ? 'bg-white/20' : 'bg-primary/5'}`}>
                                    <Icon name={cat.icon} size={20} className={activeCategory === cat.name ? 'text-white' : 'text-primary'} />
                                </div>
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-primary border border-border opacity-0 group-hover/scroll:opacity-100 transition-opacity hidden md:flex"
                    >
                        <Icon name="ChevronRight" size={20} />
                    </button>
                </div>

                {/* Products Display */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl border border-border p-4 animate-pulse">
                                <div className="aspect-square bg-muted rounded-2xl mb-4"></div>
                                <div className="h-6 bg-muted rounded-md w-3/4 mb-3"></div>
                                <div className="h-4 bg-muted rounded-md w-1/2 mb-6"></div>
                                <div className="flex justify-between items-center">
                                    <div className="h-8 bg-muted rounded-md w-1/4"></div>
                                    <div className="h-10 bg-muted rounded-full w-10"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
                        <Icon name="AlertCircle" size={48} className="mx-auto text-muted-foreground mb-4" />
                        <p className="text-xl font-medium text-foreground">{error}</p>
                        <button
                            onClick={() => setActiveCategory(activeCategory)}
                            className="mt-4 text-primary font-semibold hover:underline"
                        >
                            Try again
                        </button>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
                        <Icon name="Sparkles" size={48} className="mx-auto text-muted-foreground mb-4" />
                        <p className="text-xl font-medium text-foreground">No products found in this category yet.</p>
                        <p className="text-muted-foreground">Check back soon for new arrivals!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white rounded-3xl border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden flex flex-col"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-square overflow-hidden bg-muted/10 p-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop';
                                        }}
                                    />

                                    {/* Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                                            {product.badge}
                                        </span>
                                    </div>

                                    {/* Add to Wishlist */}
                                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-accent transition-all duration-300 shadow-lg scale-0 group-hover:scale-100 origin-center translate-y-[-10px] group-hover:translate-y-0">
                                        <Icon name="Heart" size={18} />
                                    </button>

                                    {/* Quick Add Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <button
                                            onClick={() => handleQuickAdd(product)}
                                            disabled={!product.inStock}
                                            className="w-full bg-white/95 backdrop-blur-sm text-primary py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl border border-white/50 hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                                        >
                                            <Icon name="ShoppingCart" size={18} />
                                            Quick Purchase
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="mb-2">
                                        <div className="flex items-center gap-1 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Icon
                                                    key={i}
                                                    name="Star"
                                                    size={12}
                                                    className={`${i < Math.floor(product.rating)
                                                        ? 'text-yellow-500 fill-current'
                                                        : 'text-gray-200'
                                                        }`}
                                                />
                                            ))}
                                            <span className="text-[10px] text-muted-foreground font-medium ml-1">
                                                ({product.reviews})
                                            </span>
                                        </div>
                                        <Link to={`/product-detail-page/${product.id}`}>
                                            <h3 className="font-heading text-lg font-bold text-foreground line-clamp-2 hover:text-primary transition-colors">
                                                {product.name}
                                            </h3>
                                        </Link>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-heading text-xl font-black text-primary">₹{product.price}</span>
                                                {product.discount > 0 && (
                                                    <span className="text-xs text-muted-foreground line-through opacity-70">₹{product.originalPrice}</span>
                                                )}
                                            </div>
                                            <p className="text-[10px] font-bold text-accent">{product.discount}% SAVINGS</p>
                                        </div>

                                        <Link
                                            to={`/product-detail-page/${product.id}`}
                                            className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                                        >
                                            <Icon name="ArrowRight" size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section >
    );
};

export default CategoryProductsSection;
