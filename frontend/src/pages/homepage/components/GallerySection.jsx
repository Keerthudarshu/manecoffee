import React from 'react';
import { getImage } from '../../../utils/image';

const GallerySection = () => {
  const photos = [
    {
      src: "https://res.cloudinary.com/dletwba1e/image/upload/v1777961168/photo1_nu9twr.jpg",
      title: 'Our Heritage',
      description: 'The rich legacy of Coorg estates',
      type: 'image'
    },
    {
      src: "https://res.cloudinary.com/dletwba1e/video/upload/v1777961218/video_rkn7w3.mp4",
      title: 'Perfect Roast',
      description: 'Artisanal roasting for peak flavor',
      type: 'video'
    },
    {
      src: "https://res.cloudinary.com/dletwba1e/image/upload/v1777961178/photo3_hx5mhv.jpg",
      title: 'Fresh Brew',
      description: 'The ultimate coffee experience',
      type: 'image'
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-[#efe5d7]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-[#2a1f0e] mb-4">
            The Mane Coffee Experience
          </h2>
          <div className="w-24 h-1 bg-[#C9A227] mx-auto mb-6"></div>
          <p className="font-body text-base md:text-xl text-[#2a1f0e]/70 max-w-3xl mx-auto px-4">
            Glimpses into our world of premium beans, authentic brewing traditions, and the mist-covered hills of Coorg.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl md:rounded-[2rem] shadow-2xl aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]"
            >
              {/* Image or Video */}
              {photo.type === 'video' ? (
                <video
                  src={photo.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
              )}

              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1509]/90 via-[#1e1509]/20 to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-10">
                <div className="transform translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-white font-heading text-xl md:text-3xl font-bold mb-2 md:mb-3">
                    {photo.title}
                  </h3>
                  <p className="text-white/80 font-body text-sm md:text-lg leading-relaxed">
                    {photo.description}
                  </p>
                </div>
              </div>

              {/* Decorative Border on Hover */}
              <div className="absolute inset-4 border border-white/20 rounded-[1.5rem] md:rounded-[1.8rem] opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-16 text-center md:hidden">
          <p className="text-[#C9A227] font-heading italic text-lg font-medium">
            ~ Est. 1994 ~
          </p>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
