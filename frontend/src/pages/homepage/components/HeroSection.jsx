

import React, { useState, useEffect } from 'react';

const desktopImages = [
    '/assets/banner/second.png',
    '/assets/banner/3.png',
    '/assets/banner/4.png',
    '/assets/banner/5.png',
    '/assets/banner/6.png'


];
const mobileImages = [
    '/assets/banner/mobilefirst.png',
    '/assets/banner/mobileseccond.png',
    '/assets/banner/mobilethird.png',
    '/assets/banner/mobilefourth.png'

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
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % sliderImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [sliderImages.length]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % sliderImages.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

    return (
        <section className="relative h-[85vh] md:h-[90vh] overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#120d07] to-[#2a1f0e]">
            <img
                src={sliderImages[current]}
                alt={`Hero Slide ${current + 1}`}
                className="w-full h-full object-cover transition-all duration-1000 absolute inset-0"
                style={{ zIndex: 1 }}
            />
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