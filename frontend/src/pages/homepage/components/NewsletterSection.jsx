import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import apiClient from '../../../services/api';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email?.trim()) return;

    setIsLoading(true);

    try {
      const response = await apiClient.post('/send-subscription-confirmation', { email });

      // check status if apiClient doesn't throw, although interceptor usually throws on error
      if (response.status === 200 || response.status === 201) {
        setIsSubscribed(true);
        setEmail('');
      } else {
        console.error('Failed to send subscription confirmation');
      }
    } catch (error) {
      console.error('Error in subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: "Gift",
      title: "Exclusive Offers",
      description: "Get 10% off on your first order"
    },
    {
      icon: "Bell",
      title: "Early Access",
      description: "Be first to know about new products"
    },
    {
      icon: "Truck",
      title: "Free Shipping",
      description: "Special shipping deals for subscribers"
    }
  ];

  if (isSubscribed) {
    return (
    <section className="py-16 lg:py-20 bg-[#120d07]/5">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-[#C9A227] rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Check" size={32} color="white" />
          </div>
          <h2 className="font-heading font-bold text-3xl text-[#120d07] mb-4">
            Welcome to the Family!
          </h2>
          <p className="font-body text-lg text-[#120d07]/70 mb-6">
            Thank you for subscribing! Check your email for a special welcome offer.
          </p>
          <Button
            variant="outline"
            onClick={() => setIsSubscribed(false)}
            className="border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-white"
          >
            Subscribe Another Email
          </Button>
        </div>
      </div>
    </section>
    );
  }

  return (
    <section className="py-16 lg:py-20 bg-[#120d07]/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#F0C040] mb-4">
                Join Our Natural Family
              </h2>
              <p className="font-body text-lg text-white mb-6">
                Subscribe to our newsletter and get exclusive access to new products, special offers, and traditional recipes straight to your inbox.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                {benefits?.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#C9A227]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={benefit?.icon} size={20} className="text-[#C9A227]" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-body font-bold text-[#F0C040]">
                        {benefit?.title}
                      </h4>
                      <p className="font-caption text-sm text-white/70">
                        {benefit?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="bg-white border border-[#C9A227]/20 rounded-3xl p-6 lg:p-8 shadow-gold-lg">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#C9A227]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={24} className="text-[#C9A227]" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#120d07] mb-2">
                  Get 10% Off Your First Order
                </h3>
                <p className="font-body text-[#120d07]/60">
                  Plus exclusive recipes and health tips
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#120d07] uppercase tracking-wider ml-1">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                    required
                    className="w-full bg-gray-50 border-gray-200 text-[#120d07] py-6"
                  />
                </div>

                <Button
                  type="submit"
                  fullWidth
                  loading={isLoading}
                  iconName="ArrowRight"
                  iconPosition="right"
                  disabled={!email?.trim()}
                  className="bg-[#C9A227] hover:bg-[#F0C040] text-[#120d07] py-6 rounded-xl shadow-gold-md font-bold text-lg"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe & Save 10%'}
                </Button>
              </form>

              <p className="font-caption text-xs text-[#120d07]/60 text-center mt-4">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-4 mt-6 pt-6 border-t border-[#120d07]/10">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={16} className="text-green-600" />
                  <span className="font-caption text-xs text-[#120d07]/60 font-medium">
                    Secure
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={16} className="text-[#C9A227]" />
                  <span className="font-caption text-xs text-[#120d07]/60 font-medium">
                    5000+ Subscribers
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="X" size={16} className="text-[#120d07]/40" />
                  <span className="font-caption text-xs text-[#120d07]/60 font-medium">
                    No Spam
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;