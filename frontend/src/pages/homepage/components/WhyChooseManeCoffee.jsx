import React, { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';

const WhyChooseManeCoffee = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoSlideRef = useRef(null);

  const features = [
    {
      icon: 'Leaf',
      title: 'Sourced from Coorg Farms',
      description: 'Direct sourcing from premium coffee estates in the heartland of India\'s finest coffee',
      emoji: '🌱'
    },
    {
      icon: 'Flame',
      title: 'Freshly Roasted in Small Batches',
      description: 'Every batch is carefully roasted to preserve natural aroma and maximum flavor',
      emoji: '🔥'
    },
    {
      icon: 'XCircle',
      title: 'No Additives or Chemicals',
      description: 'Made with carefully selected coffee and 5–10% chicory. No artificial flavors, colors, or harmful chemicals.',
      emoji: '🚫'
    },
    {
      icon: 'Truck',
      title: 'Fast Delivery Across India',
      description: 'Quick and reliable delivery to your doorstep within 3-7 business days',
      emoji: '🚚'
    }
  ];

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide on mobile
  const startAutoSlide = useCallback(() => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 3000);
  }, [features.length]);

  useEffect(() => {
    if (isMobile) {
      startAutoSlide();
    }
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [isMobile, startAutoSlide]);

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    // Pause auto-slide while touching
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) {
      // Swipe left → next
      setCurrentSlide((prev) => (prev + 1) % features.length);
    } else if (diff < -threshold) {
      // Swipe right → previous
      setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
    }

    // Resume auto-slide
    startAutoSlide();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    startAutoSlide();
  };

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2a1f0e] mb-3 md:mb-4">
            Why Customers Love Mane Coffee
          </h2>
          <p className="font-body text-sm sm:text-base md:text-lg text-[#2a1f0e]/70 max-w-2xl md:max-w-3xl mx-auto px-2">
            From farm to cup, we ensure every step delivers the perfect coffee experience that keeps our customers coming back.
          </p>
        </div>

        {/* Desktop: Grid Layout (lg and above) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="mb-6 relative">
                <div className="w-20 h-20 mx-auto bg-[#efe5d7] rounded-full flex items-center justify-center group-hover:bg-[#C9A227] transition-all duration-300">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {feature.emoji}
                  </span>
                </div>
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#2a1f0e] mb-3 group-hover:text-[#C9A227] transition-colors duration-300 px-2">
                {feature.title}
              </h3>
              <p className="font-body text-base text-gray-600 leading-relaxed px-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet: Banner-style Carousel (below lg) */}
        <div
          className="lg:hidden relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="bg-[#fdf8e7] rounded-2xl p-6 sm:p-8 text-center border border-[#C9A227]/10 shadow-sm">
                  {/* Icon */}
                  <div className="mb-4 sm:mb-5">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-[#efe5d7] rounded-full flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl">
                        {feature.emoji}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg sm:text-xl font-semibold text-[#2a1f0e] mb-2 sm:mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm sm:text-base text-gray-600 leading-relaxed max-w-xs mx-auto">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-7 h-2.5 bg-[#C9A227]'
                    : 'w-2.5 h-2.5 bg-[#C9A227]/25 hover:bg-[#C9A227]/50'
                }`}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 md:mt-16 bg-[#efe5d7] rounded-xl md:rounded-2xl p-4 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#C9A227] mb-1 md:mb-2">10,000+</div>
              <div className="text-xs sm:text-sm text-[#2a1f0e]/60 font-medium">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#C9A227] mb-1 md:mb-2">4.8/5</div>
              <div className="text-xs sm:text-sm text-[#2a1f0e]/60 font-medium">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#C9A227] mb-1 md:mb-2">100%</div>
              <div className="text-xs sm:text-sm text-[#2a1f0e]/60 font-medium">Natural Coffee</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#C9A227] mb-1 md:mb-2">24/7</div>
              <div className="text-xs sm:text-sm text-[#2a1f0e]/60 font-medium">Customer Support</div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default WhyChooseManeCoffee;
