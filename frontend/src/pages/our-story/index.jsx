import React, { useEffect } from 'react';
import SEO from '../../components/SEO';
import Header from '../../components/ui/Header';
import Footer from '../homepage/components/Footer';
import OurStory from '../homepage/components/OurStory';
import { useCart } from '../../contexts/CartContext';

const OurStoryPage = () => {
  const { cartItems, getCartItemCount } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#efe5d7] flex flex-col">
      <SEO 
        title="Our Story - Mane Coffee"
        description="Learn about our journey from a small roastery in the heart of Coorg to bringing authentic coffee to every home, and the values that drive us."
        canonical="/our-story"
      />
      
      <Header 
        cartItemCount={getCartItemCount()}
        cartItems={cartItems}
        onSearch={() => {}}
      />

      <main className="flex-grow pt-24 pb-16">
        <OurStory />
      </main>

      <Footer />
    </div>
  );
};

export default OurStoryPage;
