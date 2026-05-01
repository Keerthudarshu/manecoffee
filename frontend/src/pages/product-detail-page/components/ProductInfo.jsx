import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product, onAddToCart, onAddToWishlist, isInWishlist }) => {
  // Initialize with first variant or create a default one from product fields
  const initialVariant = useMemo(() => {
    if (product?.variants?.length > 0) {
      return product.variants[0];
    }
    // Fallback: create variant from product top-level fields
    return {
      id: product?.id,
      weight: product?.weightValue ? `${product.weightValue}${product.weightUnit || 'g'}` : 'Default',
      weightValue: product?.weightValue,
      weightUnit: product?.weightUnit || 'g',
      price: product?.price || 0,
      originalPrice: product?.originalPrice || product?.price || 0,
      stock: product?.stockQuantity || 0
    };
  }, [product]);

  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [quantity, setQuantity] = useState(1);

  // Determine available stock from variant or product
  const availableStock = (selectedVariant?.stock ?? selectedVariant?.stockQuantity ?? product?.stockQuantity ?? 0) || 0;
  const inStock = availableStock > 0 && (product?.inStock ?? true);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setQuantity(1); // Reset quantity when variant changes
  };

  // Calculate per-100g price
  const computePer100Label = (variant) => {
    if (!variant?.weightValue) return 'N/A';
    const weight = parseFloat(variant.weightValue);
    if (weight <= 0) return 'N/A';
    const per100 = (variant?.price || 0) / weight * 100;
    return `₹${per100.toFixed(2)}/100g`;
  };

  // Calculate discount percentage
  const computeDiscount = (variant) => {
    if (!variant?.originalPrice || !variant?.price) return 0;
    const original = parseFloat(variant.originalPrice);
    const current = parseFloat(variant.price);
    if (original <= current) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    // Cap quantity between 1 and available stock
    if (newQuantity >= 1 && newQuantity <= Math.max(availableStock, 0)) {
      setQuantity(newQuantity);
    } else if (newQuantity > availableStock) {
      alert('Stock limit exceeded');
      setQuantity(Math.max(availableStock, 1));
    }
  };

  const handleAddToCart = () => {
    if (!inStock || availableStock <= 0) {
      alert('This product is out of stock');
      return;
    }
    if (quantity > availableStock) {
      alert('Stock limit exceeded');
      return;
    }
    // Provide comprehensive info for both server and guest carts
    onAddToCart({
      id: product?.id,
      productId: product?.id,
      name: product?.name,
      variant: selectedVariant?.weight || `${selectedVariant?.weightValue}${selectedVariant?.weightUnit || 'g'}` || 'Default',
      price: selectedVariant?.price ?? 0,
      originalPrice: selectedVariant?.originalPrice ?? selectedVariant?.price ?? 0,
      image: product?.images?.[0] || product?.imageUrl || product?.image,
      stockQuantity: availableStock,
      variantId: selectedVariant?.id,
      quantity: quantity,
      weight: selectedVariant?.weight,
      weightValue: selectedVariant?.weightValue,
      weightUnit: selectedVariant?.weightUnit
    });
  };

  const discountPercentage = computeDiscount(selectedVariant);

  // Get all variants to display, or fallback to single product
  const allVariants = product?.variants?.length > 0 ? product.variants : [initialVariant];

  return (
    <div>
      <div className="space-y-6">
        {/* Product Info */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>
            Authentic Coorg Filter Coffee – Rich Aroma & Bold Taste
          </h2>

          <ul style={{ listStyleType: 'none', padding: 0, margin: 0, marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>✔️ Premium quality beans sourced from Coorg</li>
            <li>✔️ Strong, rich and aromatic flavor</li>
            <li>✔️ No added chicory – 100% pure coffee</li>
            <li>✔️ Perfect for traditional South Indian filter coffee</li>
          </ul>

          <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '20px' }}>
            🔥 Limited Stock – Order Now
          </p>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-success' : 'bg-destructive'}`}></div>
            <span className={`text-sm font-medium ${inStock ? 'text-success' : 'text-destructive'}`}>
              {inStock ? `In Stock (${availableStock} units available)` : 'Out of Stock'}
            </span>
          </div>
          {/* Product Badges */}
          <div className="flex flex-wrap gap-2">
            {product?.badges?.map((badge, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-caption font-medium bg-accent/10 text-accent border border-accent/20"
              >
                {badge}
              </span>
            ))}
          </div>
          {/* Pricing - Dynamic based on selected variant */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-heading font-bold text-2xl text-foreground">
                ₹{selectedVariant?.price?.toFixed(2)}
              </span>
              {selectedVariant?.originalPrice && selectedVariant?.originalPrice > selectedVariant?.price && (
                <>
                  <span className="font-data text-lg text-muted-foreground line-through">
                    ₹{selectedVariant?.originalPrice?.toFixed(2)}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium bg-success/10 text-success">
                      Save {discountPercentage}%
                    </span>
                  )}
                </>
              )}
            </div>
            <p className="font-caption text-sm text-muted-foreground">
              Inclusive of all taxes
            </p>
          </div>

          {/* Variant Selection - Card-based UI matching reference design */}
          <div>
            <label className="block font-body font-semibold text-foreground mb-3">
              Select Weight
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allVariants.map((variant) => {
                const isSelected = selectedVariant?.id === variant?.id;
                const variantStock = variant?.stock ?? variant?.stockQuantity ?? 0;
                const variantAvailable = variantStock > 0;
                const discount = computeDiscount(variant);
                const per100Label = computePer100Label(variant);

                return (
                  <button
                    key={variant?.id}
                    onClick={() => variantAvailable && handleVariantChange(variant)}
                    disabled={!variantAvailable}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${isSelected
                        ? 'border-primary bg-primary/5 shadow-md'
                        : variantAvailable
                          ? 'border-border hover:border-primary/50 bg-background hover:bg-muted/30'
                          : 'border-border bg-muted/50 opacity-50 cursor-not-allowed'
                      }`}
                  >
                    {/* Weight Label & Most Popular Badge */}
                    <div className="font-heading font-bold text-foreground mb-2 flex flex-col items-start gap-1">
                      <span>{variant?.weight || `${variant?.weightValue}${variant?.weightUnit || 'g'}`}</span>
                      {(variant?.weight?.includes('500') || variant?.weightValue === '500' || variant?.weightValue === 500) && (
                        <span className="text-[10px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 border border-yellow-200">
                          ⭐ Most Popular
                        </span>
                      )}
                    </div>

                    {/* Pricing Info */}
                    <div className="space-y-1 text-sm">
                      {/* Sale Price */}
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-semibold text-foreground">
                          ₹{variant?.price?.toFixed(0)}
                        </span>
                        {variant?.originalPrice && variant?.originalPrice > variant?.price && (
                          <span className="text-muted-foreground line-through text-xs">
                            ₹{variant?.originalPrice?.toFixed(0)}
                          </span>
                        )}
                      </div>

                      {/* Discount Badge */}
                      {discount > 0 && (
                        <div className="text-xs font-caption font-medium text-success">
                          {discount}% OFF
                        </div>
                      )}

                      {/* Per 100g Price */}
                      {per100Label !== 'N/A' && (
                        <div className="text-xs text-muted-foreground">
                          {per100Label}
                        </div>
                      )}

                      {/* Stock Status */}
                      <div className={`text-xs font-caption ${variantAvailable ? 'text-success' : 'text-destructive'
                        }`}>
                        {variantAvailable ? `${variantStock} in stock` : 'Out of stock'}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="mt-2 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground">
                        <Icon name="Check" size={14} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-body font-medium text-foreground">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Icon name="Minus" size={16} />
                </button>
                <span className="w-12 text-center font-data font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= availableStock}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Icon name="Plus" size={16} />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="default"
                onClick={handleAddToCart}
                iconName="ShoppingCart"
                iconPosition="left"
                className="flex-1"
                disabled={!inStock}
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={onAddToWishlist}
                iconName={isInWishlist ? "Heart" : "Heart"}
                size="icon"
                className={isInWishlist ? "text-destructive" : ""}
              >
              </Button>
            </div>

            <a
              href={`https://wa.me/919019445168?text=Hi%20Mane%20Coffee,%20I%20want%20to%20order%20${encodeURIComponent(product?.name || 'Coffee')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md"
            >
              <Icon name="MessageCircle" size={20} />
              Order via WhatsApp
            </a>

            {/* Trust + Conversion Boosters */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="text-green-600">✔️</span> Cash on Delivery
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="text-green-600">✔️</span> Free shipping above ₹499
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="text-green-600">✔️</span> Easy returns
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="text-green-600">✔️</span> Secure Payments
              </div>
            </div>

            <section style={{ padding: '30px', marginTop: '20px', background: '#f9f9f9', borderRadius: '10px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Customer Reviews</h3>

              <p style={{ marginBottom: '10px' }}>⭐⭐⭐⭐⭐ "Amazing aroma! Tastes just like Coorg coffee." – Rahul</p>
              <p style={{ marginBottom: '10px' }}>⭐⭐⭐⭐⭐ "Best filter coffee I’ve tried online." – Sneha</p>
              <p>⭐⭐⭐⭐⭐ "Strong and fresh. Worth every rupee!" – Kiran</p>
            </section>
          </div>
          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-success' : 'bg-destructive'}`}></div>
            {inStock ? (
              <span className="font-caption text-sm text-success font-medium">
                In Stock ({availableStock} units available)
              </span>
            ) : (
              <span className="font-caption text-sm text-destructive font-medium">
                Out of Stock
              </span>
            )}
          </div>
        </div>
        {/* Oil Essentials sticker for Wood Pressed Oils and Essential Oils - moved above tabs */}
        {(function () {
          const cat = (product?.category || '').toString().toLowerCase().trim();
          const subcat = (product?.subcategory || '').toString().toLowerCase().trim();
          const ids = ["1", "2"];
          const names = ["wood pressed oils", "essential oils"];
          if (
            ids.includes((product?.categoryId || product?.category || '').toString()) ||
            ids.includes((product?.subcategoryId || product?.subcategory || '').toString()) ||
            names.some(n => cat === n || subcat === n)
          ) {
            return (
              <div className="w-full mt-8 mb-4" style={{ width: '100%', background: '#FFF8E1', overflow: 'visible', margin: '0 auto' }}>
                <img
                  src="/assets/images/esential%20oils/oilessentials.jpeg"
                  alt="Oils Essentials Sticker"
                  className="w-full h-auto object-cover rounded"
                  style={{ width: '100%', maxWidth: '100%', display: 'block', margin: '0 auto' }}
                />
              </div>
            );
          }
          return null;
        })()}
      </div>
    </div>
  );
};

export default ProductInfo;