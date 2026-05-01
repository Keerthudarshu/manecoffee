import React from 'react';
import Icon from '../../../components/AppIcon';

const OurStory = () => {
  const timeline = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Started with a small roastery in the heart of Coorg, with a mission to bring authentic coffee to every home.",
      image: "/assets/images/coffee-estate.jpg"
    },
    {
      year: "2020",
      title: "Growing Family",
      description: "Expanded to serve over 1,000 customers across India, building trust through quality and consistency.",
      image: "/assets/images/coffee-roasting.jpg"
    },
    {
      year: "2023",
      title: "Digital Journey",
      description: "Launched online platform to reach coffee lovers nationwide, maintaining the same farm-fresh quality.",
      image: "/assets/images/coffee-packaging.jpg"
    },
    {
      year: "2024",
      title: "Coffee Excellence",
      description: "Today, we're proud to serve over 10,000 happy customers with premium Coorg coffee delivered fresh.",
      image: "/assets/images/coffee-delivery.jpg"
    }
  ];

  const values = [
    {
      icon: 'Heart',
      title: 'Passion for Quality',
      description: 'Every bean is selected with care and roasted to perfection'
    },
    {
      icon: 'Users',
      title: 'Farmer First',
      description: 'We work directly with Coorg farmers to ensure fair prices'
    },
    {
      icon: 'Globe',
      title: 'Sustainable Practices',
      description: 'Eco-friendly farming and packaging for a greener future'
    },
    {
      icon: 'Award',
      title: 'Award Winning',
      description: 'Recognized for excellence in coffee quality and taste'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2a1f0e] mb-4">
            From Coorg Farms to Your Cup
          </h2>
          <p className="font-body text-lg text-[#2a1f0e]/70 max-w-3xl mx-auto">
            At Mane Coffee, we source premium beans directly from Coorg estates. Every batch is carefully roasted to preserve its natural aroma and richness, bringing you a truly authentic coffee experience.
          </p>
        </div>

        {/* Hero Image with Overlay */}
        <div className="relative mb-16 rounded-2xl overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-[#efe5d7] to-[#d7bea8] flex items-center justify-center">
            <div className="text-center text-white p-8">
              <div className="text-6xl mb-4">☕</div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                The Mane Coffee Promise
              </h3>
              <p className="text-xl max-w-2xl mx-auto">
                Authentic • Fresh • Premium
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="font-heading text-3xl font-bold text-[#2a1f0e] text-center mb-12">
            Our Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="relative group"
              >
                {/* Year Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-[#C9A227] text-white px-4 py-2 rounded-full font-bold text-sm">
                    {item.year}
                  </div>
                </div>
                
                {/* Timeline Card */}
                <div className="bg-[#efe5d7] rounded-xl p-6 pt-8 text-center group-hover:bg-[#C9A227] group-hover:text-white transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                    <span className="text-2xl">📅</span>
                  </div>
                  <h4 className="font-bold text-lg mb-3 group-hover:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed group-hover:text-white/90">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="font-heading text-3xl font-bold text-[#2a1f0e] text-center mb-12">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto bg-[#efe5d7] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#C9A227] transition-all duration-300">
                  <Icon 
                    name={value.icon} 
                    size={32} 
                    className="text-[#2a1f0e] group-hover:text-white transition-colors duration-300" 
                  />
                </div>
                <h4 className="font-bold text-lg text-[#2a1f0e] mb-3 group-hover:text-[#C9A227] transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="text-sm text-[#2a1f0e]/60 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default OurStory;
