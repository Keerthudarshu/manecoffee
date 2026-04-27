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
        <>
            {/* Content Only Section - Both Mobile and Desktop */}
            <section className="bg-gradient-to-br from-[#120d07] to-[#2a2218] py-8 md:py-12 px-4">
                <div className="container mx-auto text-center text-white">
                    {/* Trust Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-2 py-1 md:px-3 md:py-1.5 mb-3 md:mb-4 border border-white/30">
                        <span className="text-yellow-300 text-xs md:text-sm">⭐</span>
                        <span className="text-[10px] md:text-xs font-semibold">100% Natural | No Chemicals</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 leading-tight">
                        Authentic Coorg Coffee
                        <span className="block text-base sm:text-lg md:text-2xl lg:text-4xl mt-1 md:mt-2 text-yellow-300">
                            Freshly Roasted, Delivered to Your Door
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 md:mb-6 max-w-2xl md:max-w-3xl mx-auto text-white/90 leading-relaxed px-2">
                        Experience rich aroma and bold taste from premium Arabica & Robusta beans 
                        sourced directly from Coorg estates.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center items-center mb-4 md:mb-6 px-4">
                        <Link
                            to="/product-collection-grid"
                            className="inline-flex items-center gap-1.5 md:gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto justify-center"
                        >
                            <Icon name="ShoppingCart" size={12} className="md:size-16" />
                            🛒 Shop Now
                        </Link>
                        
                        <a
                            href="https://wa.me/919876543210?text=Hi%20Mane%20Coffee,%20I%20want%20to%20order%20coffee"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 md:gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto justify-center"
                        >
                            <Icon name="MessageCircle" size={12} className="md:size-16" />
                            💬 Order on WhatsApp
                        </a>
                    </div>

                    {/* Offer Banner */}
                    <div className="inline-flex flex-col sm:flex-row items-center gap-1.5 md:gap-2 bg-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm animate-pulse max-w-xs sm:max-w-none">
                        <div className="flex items-center gap-1.5">
                            <span>🔥</span>
                            <span>Limited Launch Offer – 10% OFF</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span>🚚</span>
                            <span>Free Delivery Above ₹499</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Banner Only Section - Both Mobile and Desktop */}
            <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
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
                </div>

                {/* Navigation Arrows */}
                {sliderImages.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-xl md:text-2xl text-white hover:bg-white/30 transition-all duration-300"
                            aria-label="Previous Slide"
                        >
                            &#8592;
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-xl md:text-2xl text-white hover:bg-white/30 transition-all duration-300"
                            aria-label="Next Slide"
                        >
                            &#8594;
                        </button>
                    </>
                )}

                {/* Dots */}
                {sliderImages.length > 1 && (
                    <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
                        {sliderImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${idx === current ? 'bg-white scale-125' : 'bg-white/40'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};

export default HeroSection;