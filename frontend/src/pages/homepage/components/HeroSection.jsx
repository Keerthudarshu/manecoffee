import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const desktopImages = [
    '/assets/banner/3.png',
    '/assets/banner/1.png',
    '/assets/banner/2.png',
    '/assets/banner/4.png'
];
const mobileImages = [
    '/assets/banner/mobile1.png',
    '/assets/banner/mobile2.png',
    '/assets/banner/mobile3.png',
    '/assets/banner/mobile4.png'
];

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return isMobile;
}

const HeroSection = () => {
    const isMobile = useIsMobile();
    const sliderImages = isMobile ? mobileImages : desktopImages;
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        // Only preload the first image, lazy load others
        const firstImage = new Image();
        firstImage.src = sliderImages[0];
        
        // Preload next image after first loads
        firstImage.onload = () => {
            if (sliderImages.length > 1) {
                const nextImage = new Image();
                nextImage.src = sliderImages[1];
            }
        };

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % sliderImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [sliderImages]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % sliderImages.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

    return (
        <section className="relative h-[85vh] md:h-[90vh] overflow-hidden bg-gradient-to-br from-[#efe5d7] to-[#d7bea8]">
            {/* Background Image Slider */}
            <div className="absolute inset-0">
                {sliderImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Hero Slide ${index + 1}`}
                        className={`w-full h-full object-cover transition-opacity duration-1000 absolute inset-0 ${index === current ? 'opacity-100' : 'opacity-0'}`}
                        style={{ zIndex: index === current ? 1 : 0 }}
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "low"}
                        decoding="async"
                    />
                ))}
                {/* Dark Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40" style={{ zIndex: 2 }} />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 h-full flex items-center justify-center">
                <div className="container mx-auto px-4 text-center text-white">
                    {/* Trust Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/30">
                        <span className="text-yellow-300">⭐</span>
                        <span className="text-sm font-semibold">100% Natural | No Chemicals</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Authentic Coorg Coffee
                        <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 text-yellow-300">
                            Freshly Roasted, Delivered to Your Door
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-white/90 leading-relaxed">
                        Experience rich aroma and bold taste from premium Arabica & Robusta beans 
                        sourced directly from Coorg estates.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <Link
                            to="/product-collection-grid"
                            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                        >
                            <Icon name="ShoppingCart" size={20} />
                            🛒 Shop Now
                        </Link>
                        
                        <a
                            href="https://wa.me/919876543210?text=Hi%20Mane%20Coffee,%20I%20want%20to%20order%20coffee"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                        >
                            <Icon name="MessageCircle" size={20} />
                            💬 Order on WhatsApp
                        </a>
                    </div>

                    {/* Offer Banner */}
                    <div className="inline-flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-full font-bold text-lg animate-pulse">
                        <span>🔥</span>
                        <span>Limited Launch Offer – 10% OFF</span>
                        <span>🚚</span>
                        <span>Free Delivery Above ₹499</span>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            {sliderImages.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-2xl text-white hover:bg-white/30 transition-all duration-300"
                        aria-label="Previous Slide"
                    >
                        &#8592;
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-2xl text-white hover:bg-white/30 transition-all duration-300"
                        aria-label="Next Slide"
                    >
                        &#8594;
                    </button>
                </>
            )}

            {/* Dots */}
            {sliderImages.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                    {sliderImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? 'bg-white scale-125' : 'bg-white/40'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default HeroSection;