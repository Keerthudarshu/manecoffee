import React from 'react';
import { Link } from 'react-router-dom';
import BannerImageSlider from '../../../components/ui/BannerImageSlider';
import { getImage } from '../../../utils/image';

const BannerShowcase = () => {
  const bannerImages = [
    "https://res.cloudinary.com/dletwba1e/image/upload/f_auto,q_auto,w_1200/v1777972840/3_ddyj3h.jpg",
    "https://res.cloudinary.com/dletwba1e/image/upload/f_auto,q_auto,w_1200/v1777967742/1_x8c9mh.png",
    "https://res.cloudinary.com/dletwba1e/image/upload/f_auto,q_auto,w_1200/v1777968591/2_fu8pv0.png",
    "https://res.cloudinary.com/dletwba1e/image/upload/f_auto,q_auto,w_1200/v1777969531/4_sznvj7.jpg"
  ];
  const featuredCategories = [
    {
      title: "Arabica Coffee",
      description: "Premium Arabica beans from the high-altitude estates of Coorg",
      images: [
        "https://res.cloudinary.com/dletwba1e/image/upload/f_auto,q_auto,w_600/v1777961505/Arabica_cogrvg.png"
      ],
      link: "/product-collection-grid?category=1",
      badge: ""
    },
    {
      title: "Robusta Coffee",
      description: "Strong and bold Robusta beans with an intense flavor and high caffeine",
      images: ["https://res.cloudinary.com/dletwba1e/image/upload/v1777961494/robusta_llxiu2.png"],
      link: "/product-collection-grid?category=3",
      badge: "  "
    },
    {
      title: "Arabica + Robusta",
      description: "A perfectly balanced blend of Arabica and Robusta for the ideal daily brew",
      images: ["https://res.cloudinary.com/dletwba1e/image/upload/v1777961488/arabicaand_robusta_h5x2jr.png"],
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