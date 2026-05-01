import React, { useEffect } from 'react';
import SEO from '../../components/SEO';
import Header from '../../components/ui/Header';
import Footer from '../homepage/components/Footer';
import CustomerReviews from '../homepage/components/CustomerReviews';
import { useCart } from '../../contexts/CartContext';

const ReviewsPage = () => {
  const { cartItems, getCartItemCount } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#efe5d7] flex flex-col">
      <SEO 
        title="Customer Reviews - Mane Coffee"
        description="Read real feedback from our customers about their experience with Mane Coffee's premium Coorg coffee."
        keywords="the best specialty coffee, gourmet coffee place, the speciality coffee shop, the specialty coffee, the specialty coffee shop, coffee specialty shop, coffee speciality shop, coffee shop specialty"
        canonical="/reviews"
      />
      
      <Header 
        cartItemCount={getCartItemCount()}
        cartItems={cartItems}
        onSearch={() => {}}
      />

      <main className="flex-grow pt-24 pb-16">
        <CustomerReviews />
      </main>

      <Footer />
    </div>
  );
};

export default ReviewsPage;
