import React from 'react';
import Icon from '../../../components/AppIcon';

const essentialOils = [
  { id: 39, name: 'Groundnut Oil', img: '/assets/images/esential oils/Ground nut oil bottle.png' },
  { id: 38, name: 'Dry Coconut Oil', img: '/assets/images/esential oils/Dry coconut oil Bottle.png' },
  { id: 18, name: 'Saflower Oil', img: '/assets/images/esential oils/Saflower oil Bottle.png' },
  { id: 19, name: 'Sesame Oil', img: '/assets/images/esential oils/Sesame oil bottle.png' },
  { id: 23, name: 'Mustard Oil', img: '/assets/images/esential oils/Mustard oil bottle.png' },
  { id: 21, name: 'Niger Oil', img: '/assets/images/esential oils/Niger oil Bottle.png' },
  { id: 20, name: 'Flax Seed Oil', img: '/assets/images/esential oils/Flax seed oil.png' },
  { id: 22, name: 'Virgin Coconut Oil', img: '/assets/images/esential oils/V Coconut oil Bottle.png' },
];

const EssentialOilsSection = () => (
  <section className="py-16 lg:py-24 bg-[#120d07]/5">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#120d07] mb-6">
          <span className="text-[#C9A227]">Wood Pressed</span> Oils
        </h2>
        <div className="w-24 h-1 bg-[#C9A227] mx-auto mb-6 rounded-full"></div>
        <p className="font-body text-lg text-[#120d07]/70 max-w-2xl mx-auto">
          Discover our range of pure, traditional Wood-pressed oils crafted for health and wellness using ancient extraction methods.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {essentialOils.map((oil, idx) => (
          <a
            key={oil.id}
            href={`/product-detail-page/${oil.id}`}
            className="group flex flex-col bg-white rounded-3xl border border-[#C9A227]/10 shadow-sm hover:shadow-gold-lg transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
            style={{ textDecoration: 'none' }}
          >
            <div className="relative w-full aspect-[4/5] bg-[#120d07]/5 flex items-center justify-center overflow-hidden">
              <img
                src={oil.img}
                alt={oil.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120d07]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="p-6 flex flex-col items-center justify-center bg-white border-t border-[#C9A227]/5">
              <span className="font-heading text-lg font-bold text-[#120d07] text-center group-hover:text-[#C9A227] transition-colors duration-300">
                {oil.name}
              </span>
              <div className="mt-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-xs font-bold text-[#C9A227] uppercase tracking-widest flex items-center">
                  Shop Now <Icon name="ArrowRight" size={12} className="ml-1" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default EssentialOilsSection;
