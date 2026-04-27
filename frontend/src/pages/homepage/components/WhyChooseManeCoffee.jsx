import React from 'react';
import Icon from '../../../components/AppIcon';

const WhyChooseManeCoffee = () => {
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
      description: '100% pure coffee with no artificial flavors, preservatives, or chemicals',
      emoji: '🚫'
    },
    {
      icon: 'Truck',
      title: 'Fast Delivery Across India',
      description: 'Quick and reliable delivery to your doorstep within 3-5 business days',
      emoji: '🚚'
    }
  ];

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

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="mb-4 md:mb-6 relative">
                {/* Background Circle */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto bg-[#efe5d7] rounded-full flex items-center justify-center group-hover:bg-[#C9A227] transition-all duration-300">
                  <span className="text-2xl sm:text-2.5xl md:text-3xl group-hover:scale-110 transition-transform duration-300">
                    {feature.emoji}
                  </span>
                </div>
              </div>

              <h3 className="font-heading text-base sm:text-lg md:text-xl font-semibold text-[#2a1f0e] mb-2 md:mb-3 group-hover:text-[#C9A227] transition-colors duration-300 px-2">
                {feature.title}
              </h3>
              <p className="font-body text-sm sm:text-base text-gray-600 leading-relaxed px-2">
                {feature.description}
              </p>
            </div>
          ))}
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

        {/* CTA Section */}
        <div className="mt-8 md:mt-12 text-center px-2">
          <h3 className="text-xl sm:text-2xl font-bold text-[#2a1f0e] mb-3 md:mb-4">
            Ready to Experience the Best Coffee?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            Join thousands of satisfied customers who have discovered the perfect balance of flavor, aroma, and quality in every cup.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button className="bg-[#C9A227] hover:bg-[#F0C040] text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-base w-full sm:w-auto">
              Shop Our Collection
            </button>
            <button className="border-2 border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 text-sm md:text-base w-full sm:w-auto">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseManeCoffee;
