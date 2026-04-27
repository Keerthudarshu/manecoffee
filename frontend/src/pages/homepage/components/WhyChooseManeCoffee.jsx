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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2a1f0e] mb-4">
            Why Customers Love Mane Coffee
          </h2>
          <p className="font-body text-lg text-[#2a1f0e]/70 max-w-3xl mx-auto">
            From farm to cup, we ensure every step delivers the perfect coffee experience that keeps our customers coming back.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="mb-6 relative">
                {/* Background Circle */}
                <div className="w-20 h-20 mx-auto bg-[#efe5d7] rounded-full flex items-center justify-center group-hover:bg-[#C9A227] transition-all duration-300">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {feature.emoji}
                  </span>
                </div>
                {/* Hover Effect Ring */}
                <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-2 border-[#C9A227] opacity-0 group-hover:opacity-100 scale-110 transition-all duration-300"></div>
              </div>
              
              <h3 className="font-heading text-xl font-bold text-[#2a1f0e] mb-3 group-hover:text-[#C9A227] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="font-body text-[#2a1f0e]/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-[#efe5d7] rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#C9A227] mb-2">10,000+</div>
              <div className="text-sm text-[#2a1f0e]/60 font-medium">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#C9A227] mb-2">4.8/5</div>
              <div className="text-sm text-[#2a1f0e]/60 font-medium">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#C9A227] mb-2">100%</div>
              <div className="text-sm text-[#2a1f0e]/60 font-medium">Natural Coffee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#C9A227] mb-2">5+ Years</div>
              <div className="text-sm text-[#2a1f0e]/60 font-medium">Coffee Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseManeCoffee;
