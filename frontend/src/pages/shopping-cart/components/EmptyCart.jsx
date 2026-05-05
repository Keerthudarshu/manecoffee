import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EmptyCart = () => {
  const suggestedCategories = [
    {
      name: 'Sweets',
      path: '/product-collection-grid?category=sweets',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop',
      description: 'Traditional handmade sweets'
    },
    {
      name: 'Savouries',
      path: '/product-collection-grid?category=savouries',
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop',
      description: 'Crispy and flavorful snacks'
    },
    {
      name: 'Pickles',
      path: '/product-collection-grid?category=pickles',
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=200&fit=crop',
      description: 'Authentic homemade pickles'
    },
    {
      name: 'Kitchen Essentials',
      path: '/product-collection-grid?category=kitchen-essentials',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop',
      description: 'Natural oils and spices'
    }
  ];

  const popularProducts = [
    {
      id: 1,
      name: 'Organic Turmeric Powder',
      price: 149,
      originalPrice: 199,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200&h=200&fit=crop',
      rating: 4.8,
      reviews: 156
    },
    {
      id: 2,
      name: 'Homemade Mango Pickle',
      price: 299,
      originalPrice: 349,
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&h=200&fit=crop',
      rating: 4.9,
      reviews: 203
    },
    {
      id: 3,
      name: 'Cold Pressed Coconut Oil',
      price: 399,
      originalPrice: 499,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop',
      rating: 4.7,
      reviews: 89
    }
  ];

  return (
    <div className="text-center py-12">
      {/* Empty Cart Icon */}
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
        </div>
        <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">
          Your cart is empty
        </h2>
        <p className="font-body text-muted-foreground max-w-md mx-auto">
          Looks like you haven't added any items to your cart yet. Start shopping to fill it up with natural goodness!
        </p>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Link to="/homepage">
          <Button variant="default" size="lg" iconName="Home" iconPosition="left">
            Go to Homepage
          </Button>
        </Link>
        <Link to="/product-collection-grid">
          <Button variant="outline" size="lg" iconName="Search" iconPosition="left">
            Browse Products
          </Button>
        </Link>
      </div>
      {/* Suggested Categories */}
      
      {/* Popular Products */}
      
    </div>
  );
};

export default EmptyCart;