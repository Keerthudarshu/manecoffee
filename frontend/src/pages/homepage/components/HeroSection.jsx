import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import { getImage } from '../../../utils/image';

const desktopImages = [
    "https://res.cloudinary.com/dletwba1e/image/upload/f_auto,q_auto,w_1200/v1777972840/3_ddyj3h.jpg",
    "https://res.cloudinary.com/dletwba1e/image/upload/v1777967742/1_x8c9mh.png",
    "https://res.cloudinary.com/dletwba1e/image/upload/v1777968591/2_fu8pv0.png",
    "https://res.cloudinary.com/dletwba1e/image/upload/v1777969531/4_sznvj7.jpg"
];
const mobileImages = [
    "https://res.cloudinary.com/dletwba1e/image/upload/f_auto,q_auto,w_768/v1777961483/mobile1_pydvyy.png",
    "https://res.cloudinary.com/dletwba1e/image/upload/f_auto,q_auto,w_768/v1777961533/mobile2_lpylrh.png",
    "https://res.cloudinary.com/dletwba1e/image/upload/f_auto,q_auto,w_768/v1777967792/mobile3_rnwd0r.png",
    "https://res.cloudinary.com/dletwba1e/image/upload/f_auto,q_auto,w_768/v1777967769/mobile4_hrrvur.png"
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
            {/* Content Only Section - Both Mobile and Desktop */}
            <section style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://res.cloudinary.com/dletwba1e/image/upload/f_auto,q_auto,w_1200/v1777961162/hero_bg_blewyr.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                padding: '100px 20px',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '42px', fontWeight: 800, textShadow: '2px 2px 4px rgba(0,0,0,0.5)', marginBottom: '15px' }}>
                    Experience Authentic Coorg Coffee at Home
                </h1>
                <p style={{ fontSize: '20px', marginTop: '10px', fontWeight: 500, letterSpacing: '1px' }}>
                    Freshly Roasted | 100% Pure | No Chicory
                </p>

                <Link to="/product-collection-grid"
                    style={{
                        display: 'inline-block', marginTop: '20px', padding: '12px 30px',
                        background: '#c49b63', color: '#000', textDecoration: 'none', fontWeight: 600, borderRadius: '5px'
                    }}>
                    Shop Now
                </Link>
            </section>

            {/* Trust Badges Section */}
            <section style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', background: '#f9f9f9', padding: '20px', textAlign: 'center', color: '#000' }}>
                <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600' }}>☕ Freshly Roasted</h3>
                </div>
                <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600' }}>🌱 100% Natural</h3>
                </div>
                <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600' }}>🚚 Fast Delivery</h3>
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