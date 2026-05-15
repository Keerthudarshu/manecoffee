import React, { useState, useEffect, lazy, Suspense } from 'react';
import SEO from '../../components/SEO';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import { LazySection, LoadingSkeleton } from '../../components/LazyLoad';

// Lazy load components that are below the fold
const FeaturedProductsSection = lazy(() => import('./components/FeaturedProductsSection'));
const WhyChooseManeCoffee = lazy(() => import('./components/WhyChooseManeCoffee'));



const BannerShowcase = lazy(() => import('./components/BannerShowcase'));
const GallerySection = lazy(() => import('./components/GallerySection'));

import ShopByCategorySection from './components/ShopByCategorySection';

import EdibleOilsSection from './components/EdibleOilsSection';
import ExperienceTraditionCTA from './components/ExperienceTraditionCTA';

import NewsletterSection from './components/NewsletterSection';
import TrustCertificates from '../../components/TrustCertificates';
import Footer from './components/Footer';

import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const Homepage = () => {
  const { addToCart, getCartItemCount, cartItems } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock cart data for demonstration
  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        name: "Traditional Mysore Pak",
        price: 399,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop",
        variant: "250g",
        quantity: 2
      },
      {
        id: 2,
        name: "Homemade Mango Pickle",
        price: 280,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
        variant: "500g",
        quantity: 1
      }
    ];
    // The original code had setCartItems(mockCartItems) here which would be incorrect if CartContext doesn't manage initial state this way.
    // Assuming addToCart handles adding items and the context maintains the state.
    // If initial cart state is needed, it should be handled within CartContext.
  }, []);

  const handleAddToCart = (product) => {
    // If product has a selectedVariantId, use that variant
    let variant = null;
    if (product.selectedVariantId && product.variants) {
      variant = product.variants.find(v => v.id === product.selectedVariantId);
    } else if (product.variants && product.variants.length > 0) {
      variant = product.variants[0];
    }
    const cartItem = {
      id: variant ? `${product.id}-${variant.id}` : `${product.id}-default`,
      productId: product.id,
      name: product.name,
      price: variant ? variant.price : (product.salePrice || product.price),
      originalPrice: variant ? variant.originalPrice : (product.originalPrice || product.price),
      image: product.image,
      variant: variant ? (variant.label || variant.weightValue + (variant.weightUnit || '')) : 'Default',
      category: product.category,
      brand: product.brand,
      variantId: variant ? variant.id : undefined,
      weightValue: variant ? variant.weightValue : undefined,
      weightUnit: variant ? variant.weightUnit : undefined,
      stockQuantity: variant ? variant.stockQuantity : product.stockQuantity
    };
    addToCart(cartItem, 1);
    console.log('Added to cart:', cartItem);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Navigate to product collection with search query
    window.location.href = `/collections?search=${encodeURIComponent(query)}`;
  };

  return (
    <>
      <SEO 
        title="Premium Shade-Grown Coorg Coffee Online — Arabica & Robusta"
        description="Shop authentic single-origin Arabica and Robusta coffee from Coorg's misty Western Ghats. Farm-to-cup freshness, free shipping across India. Order Mane Coffee today."
        keywords="Coorg coffee, Kodagu coffee, buy coffee online India, Arabica beans, Robusta beans, filter coffee powder, artisan coffee roasting, shade grown coffee, Mane Coffee, best coffee from Coorg, specialty coffee, specialty coffee shop, coffee speciality, gourmet coffee shop, specialty coffee website, best cafe coffee, coffee bistros, café coffee shop, gourmet coffee cafe, mane coffee shop, the best specialty coffee, atmosphere coffee shop, best coffee stores near me, best coffeehouse near me, coffee shop indoor seating, coffee shop with indoor seating, indoor coffee shop, upscale coffee shop near me"
        canonical="/"
        ogTitle="Mane Coffee | Premium Coorg Coffee, Arabica & Robusta"
        ogDescription="Shop authentic single-origin Arabica and Robusta coffee from Coorg's misty Western Ghats. Farm-to-cup freshness, free shipping across India."
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Mane Coffee",
          "url": "https://manecoffeee.com",
          "logo": "https://manecoffeee.com/assets/images/logo.jpeg",
          "description": "Premium shade-grown Coorg coffee — Arabica and Robusta beans from the Western Ghats",
          "foundingLocation": "Coorg, Karnataka, India",
          "sameAs": [
            "https://instagram.com/manecoffee",
            "https://facebook.com/manecoffee"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "areaServed": "IN"
          }
        }}
      />

      <div className="min-h-screen bg-coffee-primary">
        {/* Header */}
        <Header
          cartItemCount={getCartItemCount()}
          isLoggedIn={!!user}
          onSearch={handleSearch}
          cartItems={cartItems}
        />

        {/* Main Content */}
        <main>
          {/* Hero Section - High-converting hero with strong CTA */}
          <HeroSection />

          {/* Best Sellers - Our top selling coffee products */}
          <LazySection>
            <Suspense fallback={<LoadingSkeleton />}>
              <FeaturedProductsSection onAddToCart={handleAddToCart} />
            </Suspense>
          </LazySection>

          {/* Why Choose Mane Coffee - Key benefits and trust factors */}
          <LazySection>
            <Suspense fallback={<LoadingSkeleton />}>
              <WhyChooseManeCoffee />
            </Suspense>
          </LazySection>          {/* Brand Gallery Showcase */}
          <LazySection>
            <Suspense fallback={<LoadingSkeleton />}>
              <GallerySection />
            </Suspense>
          </LazySection>
          
          {/* Shop by Category - Browse all product categories */}
          <ShopByCategorySection />
          


          {/* Newsletter Section */}
          <NewsletterSection />

          {/* Trust Certificates Section */}
          <TrustCertificates />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Homepage;