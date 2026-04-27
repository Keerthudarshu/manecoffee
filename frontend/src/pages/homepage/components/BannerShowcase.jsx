import React from 'react';
import { Link } from 'react-router-dom';
import BannerImageSlider from '../../../components/ui/BannerImageSlider';

const BannerShowcase = () => {
  const bannerImages = [
    '/assets/banner/1.png',
    '/assets/banner/2.png',
    '/assets/banner/3.png',
    '/assets/banner/4.png'
  ];

  const featuredCategories = [
    {
      title: "Arabica Coffee",
      description: "Premium Arabica beans from the high-altitude estates of Coorg",
      images: [
        '/assets/banner/Arabica.png'
      ],
      link: "/product-collection-grid?category=1",
      badge: ""
    },
    {
      title: "Robusta Coffee",
      description: "Strong and bold Robusta beans with an intense flavor and high caffeine",
      images: ['/assets/banner/robusta.png'],
      link: "/product-collection-grid?category=3",
      badge: "  "
    },
    {
      title: "Arabica + Robusta",
      description: "A perfectly balanced blend of Arabica and Robusta for the ideal daily brew",
      images: ['/assets/banner/arabicaand robusta.png'],
      link: "/product-collection-grid?category=4",
      badge: ""
    }
  ];

  return (
    <section className="section-coffee-light">
      <div className="container mx-auto px-4">
        {/* Main Banner Slider */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="heading-coffee text-4xl">
              Premium Coffee, Authentic Taste
            </h2>
            <p className="subheading-coffee text-lg max-w-2xl mx-auto">
              Experience the rich legacy of Coorg's finest coffee beans,
              expertly roasted and blended for the perfect cup.
            </p>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCategories.map((category, index) => (
            <div key={index} className="group">
              <div className="card-coffee group">
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {category.badge}
                  </span>
                </div>

                {/* Image Slider */}
                <div className="h-48">
                  <BannerImageSlider
                    images={category.images}
                    className="h-full w-full"
                    autoSlide={category.images.length > 1}
                    interval={4000}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                   <h3 className="text-xl font-bold text-coffee-primary mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-coffee-secondary mb-4">
                    {category.description}
                  </p>
                  <Link
                    to={category.link}
                    className="inline-flex items-center text-primary hover:text-coffee-primary font-semibold group-hover:underline"
                  >
                    Explore Collection
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BannerShowcase;