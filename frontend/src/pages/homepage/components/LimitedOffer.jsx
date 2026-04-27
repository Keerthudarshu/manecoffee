import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LimitedOffer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [stockCount, setStockCount] = useState(47);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        
        if (totalSeconds <= 0) {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
        
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stockTimer = setInterval(() => {
      setStockCount(prev => {
        if (prev <= 10) return prev;
        return prev - Math.floor(Math.random() * 3);
      });
    }, 30000);

    return () => clearInterval(stockTimer);
  }, []);

  const offers = [
    {
      title: "🔥 Limited Launch Offer",
      discount: "10% OFF",
      description: "On all premium coffee blends",
      code: "LAUNCH10",
      validUntil: "End of month"
    },
    {
      title: "🚚 Free Delivery",
      discount: "FREE SHIPPING",
      description: "On orders above ₹499",
      code: "AUTO",
      validUntil: "Limited time"
    },
    {
      title: "💰 Bundle & Save",
      discount: "20% OFF",
      description: "When you buy 3 or more packs",
      code: "BUNDLE20",
      validUntil: "This week only"
    }
  ];

  const formatTime = (value) => value.toString().padStart(2, '0');

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Urgency Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold text-lg mb-6 animate-pulse">
            <span>⏰</span>
            <span>Limited Time Offer – Don't Miss Out!</span>
          </div>
          
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2a1f0e] mb-4">
            Special Offers Just for You
          </h2>
          <p className="font-body text-lg text-[#2a1f0e]/70 max-w-3xl mx-auto">
            Grab these exclusive deals before they're gone. Premium Coorg coffee at unbeatable prices!
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-[#2a1f0e] mb-2">
              ⏰ Offer Ends In:
            </h3>
            <div className="flex justify-center gap-4">
              <div className="bg-[#C9A227] text-white rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold">{formatTime(timeLeft.hours)}</div>
                <div className="text-sm">Hours</div>
              </div>
              <div className="bg-[#C9A227] text-white rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold">{formatTime(timeLeft.minutes)}</div>
                <div className="text-sm">Minutes</div>
              </div>
              <div className="bg-[#C9A227] text-white rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold">{formatTime(timeLeft.seconds)}</div>
                <div className="text-sm">Seconds</div>
              </div>
            </div>
          </div>

          {/* Stock Urgency */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-red-600 font-bold mb-2">
              <span>🔥</span>
              <span>Only {stockCount} packs left in stock!</span>
              <span>🔥</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className="bg-red-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(stockCount / 50) * 100}%` }}
              />
            </div>
            <p className="text-sm text-red-600">
              Order now before it's too late!
            </p>
          </div>
        </div>

        {/* Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#C9A227] relative overflow-hidden"
            >
              {/* Corner Badge */}
              <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg text-sm font-bold">
                HOT
              </div>

              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{offer.title.split(' ')[0]}</div>
                <h3 className="font-bold text-xl text-[#2a1f0e] mb-2">
                  {offer.title}
                </h3>
                <div className="text-3xl font-bold text-[#C9A227] mb-2">
                  {offer.discount}
                </div>
                <p className="text-[#2a1f0e]/70 mb-3">
                  {offer.description}
                </p>
                <div className="bg-[#efe5d7] rounded-lg px-4 py-2 inline-block">
                  <span className="text-sm font-bold text-[#2a1f0e]">
                    Code: {offer.code}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-red-600 font-medium mb-4">
                  Valid until: {offer.validUntil}
                </p>
                <button className="w-full bg-[#C9A227] text-white py-3 rounded-lg font-bold hover:bg-[#F0C040] transition-all duration-300">
                  🛒 Claim Offer
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-bold text-[#2a1f0e]">Instant Savings</div>
              <div className="text-sm text-[#2a1f0e]/60">Apply code at checkout</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🚚</div>
              <div className="font-bold text-[#2a1f0e]">Fast Delivery</div>
              <div className="text-sm text-[#2a1f0e]/60">3-5 business days</div>
            </div>
            <div>
              <div className="text-3xl mb-2">💰</div>
              <div className="font-bold text-[#2a1f0e]">Best Price</div>
              <div className="text-sm text-[#2a1f0e]/60">Guaranteed lowest</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🔄</div>
              <div className="font-bold text-[#2a1f0e]">Easy Returns</div>
              <div className="text-sm text-[#2a1f0e]/60">30-day policy</div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg">
            <span>⏰</span>
            <span>Shop Now Before Stock Ends!</span>
            <Icon name="ArrowRight" size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedOffer;
