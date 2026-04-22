import React from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../homepage/components/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';

const AboutPage = () => {
  const breadcrumbItems = [
    { label: 'Home', path: '/homepage' },
    { label: 'About Us', path: '/about' }
  ];

  const coreValues = [
    {
      icon: 'Coffee',
      title: 'Coorg Heritage',
      description: 'Grown in the mist-covered hills of Kodagu, our beans carry the unique spirit and soil of India’s coffee capital.'
    },
    {
      icon: 'Leaf',
      title: 'Sustainable Sourcing',
      description: 'We partner directly with traditional estates that practice shade-grown cultivation to preserve biodiversity.'
    },
    {
      icon: 'Sparkles',
      title: 'Artisan Roasting',
      description: 'Our beans are slow-roasted in small batches to unlock the complex aromatic profiles of Arabica and Robusta.'
    },
    {
      icon: 'Heart',
      title: 'Perfect Blending',
      description: 'Masterfully crafting the ideal balance between Arabica’s sweetness and Robusta’s bold strength.'
    }
  ];

  const traditionalProcesses = [
    {
      icon: 'Hands',
      title: 'Selective Handpicking',
      description: 'Only the ripest coffee cherries are hand-selected by skilled plantation workers to ensure peak flavor.'
    },
    {
      icon: 'Sun',
      title: 'Estate Sun-Drying',
      description: 'Cherries are sun-dried on traditional brick yards to naturally develop their sweetness and body.'
    },
    {
      icon: 'Flame',
      title: 'Traditional Roasting',
      description: 'Using time-honored roasting techniques that respect the bean’s origin and preserve essential coffee oils.'
    },
    {
      icon: 'GlassWater',
      title: 'Pure Kodagu Essence',
      description: 'Processed without any artificial chicory or additives, delivering the pure taste of Coorg in every cup.'
    }
  ];

  const galleryImages = [
    { src: '/assets/store/mane coffee store.png', alt: 'Mane Coffee Store Front' },
    { src: '/assets/store/store1.png', alt: 'Mane Coffee Store Interior 1' },
    { src: '/assets/store/store2.png', alt: 'Mane Coffee Store Interior 2' },
    { src: '/assets/store/store3.png', alt: 'Mane Coffee Store Interior 3' },
    { src: '/assets/store/store4.png', alt: 'Mane Coffee Store Interior 4' },
    { src: '/assets/store/store5.png', alt: 'Mane Coffee Store Interior 5' },
    { src: '/assets/store/store6.png', alt: 'Mane Coffee Store Interior 6' },
  ];

  return (
    <>
      <SEO 
        title="About Us - Coorg's Finest Coffee Heritage"
        description="Discover Mane Coffee's journey in preserving Coorg's rich coffee heritage. Experience the authentic taste of Arabica, Robusta, and artisan blends from the hills of Kodagu."
        keywords="Coorg coffee, Kodagu coffee, Arabica coffee, Robusta coffee, artisan coffee blends, Indian coffee heritage, shade grown coffee, Mane Coffee story, about Mane Coffee"
        canonical="/about"
        ogTitle="About Mane Coffee - Preserving Coorg's Coffee Legacy"
        ogDescription="Experience the purest coffee from the mist-covered hills of Coorg. Hand-picked, sun-dried, and slow-roasted for the perfect cup."
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-6">
          <div className="container mx-auto px-4">
            <Breadcrumb customItems={breadcrumbItems} />
          </div>

          {/* Hero Section */}
          <section className="py-20 bg-[#efe5d7]">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h1 className="font-heading text-5xl lg:text-6xl font-bold text-[#8a6a1a] mb-8 leading-tight">
                    Mane Coffee
                  </h1>
                  <p className="font-body text-lg lg:text-xl text-[#1e1509]/80 mb-10 leading-relaxed max-w-2xl">
                    Experience the purest traditional foods following ancient Indian wisdom.
                    We preserve the timeless culinary heritage through authentic recipes,
                    natural ingredients, and traditional processing methods that have been
                    cherished for generations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-5">
                    <Link
                      to="/product-collection-grid"
                      className="bg-[#C9A227] text-[#120d07] hover:bg-[#F0C040] px-10 py-4 rounded-full font-heading font-bold transition-all duration-300 text-center text-lg shadow-xl hover:scale-105"
                    >
                      Explore Products
                    </Link>
                    <Link
                      to="/contact"
                      className="border-2 border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-[#120d07] px-10 py-4 rounded-full font-heading font-bold transition-all duration-300 text-center text-lg shadow-xl hover:scale-105"
                    >
                      Connect With Us
                    </Link>
                  </div>
                </div>

                <div className="order-1 lg:order-2 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#C9A227] to-[#F0C040] rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                  <img
                    src="/assets/images/mane coffee store.png"
                    alt="Mane Coffee Store"
                    className="relative w-full h-[450px] object-cover rounded-xl shadow-2xl border border-[#C9A227]/20"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[#C9A227] mb-6">
                  The Legacy of Coorg Coffee
                </h2>
                <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
                <div className="space-y-6 text-left text-[#C9A227]/90">
                  <p className="font-body text-lg leading-relaxed">
                    <strong className="text-[#C9A227]">Mane Coffee</strong> was born in the heart of Kodagu (Coorg), a region where coffee isn't just a crop, but a way of life. Our journey began amidst the emerald hills and silver oak trees, where the cool mountain air creates the perfect environment for the world's finest shade-grown coffee.
                  </p>
                  <p className="font-body text-lg leading-relaxed">
                    We specialize in the two pillars of Indian coffee: the smooth, aromatic <strong className="text-[#C9A227]">Arabica</strong> and the bold, full-bodied <strong className="text-[#C9A227]">Robusta</strong>. By working directly with estate owners who have nurtured these lands for generations, we bring you beans that reflect the unique "terroir" of Coorg.
                  </p>
                  <p className="font-body text-lg leading-relaxed">
                    From our signature <strong className="text-[#C9A227]">Arabica+Robusta blends</strong> to our single-origin offerings, Mane Coffee is dedicated to preserving the artisan methods of Kodava coffee culture. Every batch is a tribute to the craftsmanship of the planters and the rich legacy of the hills.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values Section */}
          <section className="py-16 bg-gradient-to-b from-green-50 to-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-6">
                  Our Core Values
                </h2>
                <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
                <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
                  These fundamental principles guide everything we do, from sourcing ingredients
                  to delivering the final product to your doorstep.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {coreValues.map((value, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center group hover:shadow-2xl transition-all duration-300">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Icon name={value.icon} size={24} />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-primary mb-4">
                      {value.title}
                    </h3>
                    <p className="font-body text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Traditional Processes Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-6">
                  Traditional Methods We Preserve
                </h2>
                <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
                <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
                  Our commitment to authenticity is reflected in the traditional processing methods
                  we've carefully preserved and continue to practice.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {traditionalProcesses.map((process, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="flex-shrink-0">
                      <div className="bg-accent/10 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                        <Icon name={process.icon} size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-primary mb-3">
                        {process.title}
                      </h3>
                      <p className="font-body text-muted-foreground leading-relaxed">
                        {process.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Store Gallery Section */}
          <section className="py-16 bg-gradient-to-b from-accent/10 to-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-6">
                  Our Store Gallery
                </h2>
                <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
                <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
                  Take a glimpse at our store and the authentic environment where our traditional products are crafted and displayed.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {galleryImages.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-xl shadow-lg group relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quality Promise Section */}
          <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-6">
                Our Quality Promise
              </h2>
              <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
              <div className="max-w-4xl mx-auto">
                <p className="font-body text-xl text-white/90 mb-8 leading-relaxed">
                  We pledge to deliver coffee that honors the rich traditions of Coorg. Every bean
                  undergoes rigorous inspection, and we stand behind the freshness and authentic
                  Kodagu flavor of every batch we roast.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <Icon name="Shield" size={32} className="mx-auto mb-4" />
                    <h3 className="font-heading font-bold text-lg mb-2">100% Pure Coffee</h3>
                    <p className="font-body text-white/80">Zero chicory, additives, or artificial flavorings</p>
                  </div>

                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <Icon name="Coffee" size={32} className="mx-auto mb-4" />
                    <h3 className="font-heading font-bold text-lg mb-2">Freshly Roasted</h3>
                    <p className="font-body text-white/80">Roasted in small batches for peak aromatic profile</p>
                  </div>

                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <Icon name="MapPin" size={32} className="mx-auto mb-4" />
                    <h3 className="font-heading font-bold text-lg mb-2">Coorg Origin</h3>
                    <p className="font-body text-white/80">Sourced directly from premium estates in Kodagu</p>
                  </div>
                </div>

                <Link
                  to="/product-collection-grid"
                  className="inline-block bg-white text-primary hover:bg-green-50 px-10 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Experience Our Products
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;