

import React, { useState, useEffect } from 'react';

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
        // Preload all images
        sliderImages.forEach(image => {
            const img = new Image();
            img.src = image;
        });

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % sliderImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [sliderImages]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % sliderImages.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

    return (
        <section className="relative h-[85vh] md:h-[90vh] overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#efe5d7] to-[#d7bea8]">
            {sliderImages.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Hero Slide ${index + 1}`}
                    className={`w-full h-full object-cover transition-opacity duration-1000 absolute inset-0 ${index === current ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{ zIndex: index === current ? 1 : 0 }}
                    loading="eager"
                    fetchPriority={index === 0 ? "high" : "auto"}
                />
            ))}
            {/* Navigation Arrows */}
            {sliderImages.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#C9A227]/20 border border-[#C9A227]/30 rounded-full flex items-center justify-center text-2xl text-[#F0C040] hover:bg-[#C9A227]/40 transition-all duration-300 backdrop-blur-md"
                        aria-label="Previous Slide"
                    >
                        &#8592;
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#C9A227]/20 border border-[#C9A227]/30 rounded-full flex items-center justify-center text-2xl text-[#F0C040] hover:bg-[#C9A227]/40 transition-all duration-300 backdrop-blur-md"
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
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? 'bg-[#C9A227] scale-125' : 'bg-white/40'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default HeroSection;