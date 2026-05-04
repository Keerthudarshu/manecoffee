import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CustomerReviews = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Bangalore",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      product: "Filter Coffee Blend",
      review: "Strong aroma and authentic taste. Reminds me of real filter coffee at home. The quality is consistent and the packaging is excellent. Will definitely order again!",
      helpful: 24
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Bangalore",
      rating: 5,
      date: "1 month ago",
      verified: true,
      product: "Premium Arabica",
      review: "Much better than store brands. Worth the price. The smoothness and rich flavor profile is exactly what I was looking for. My morning coffee routine has transformed!",
      helpful: 18
    },
    {
      id: 3,
      name: "Amit Patel",
      location: "Bangalore",
      rating: 5,
      date: "3 weeks ago",
      verified: true,
      product: "Strong Robusta Blend",
      review: "Perfect for my daily filter coffee! Strong and bold flavor that wakes me up every morning. The delivery was fast and the coffee was fresh. Highly recommend!",
      helpful: 31
    },
    {
      id: 4,
      name: "Sneha Reddy",
      location: "Bangalore",
      rating: 4,
      date: "2 months ago",
      verified: true,
      product: "Arabica + Robusta Blend",
      review: "Good quality coffee with nice aroma. The blend is well-balanced and not too bitter. Only wish they had more subscription options. Overall very satisfied!",
      helpful: 12
    },
    {
      id: 5,
      name: "Vikram Singh",
      location: "Bangalore",
      rating: 5,
      date: "1 week ago",
      verified: true,
      product: "Filter Coffee Blend",
      review: "Authentic Coorg coffee! The taste takes me back to my childhood days in Coorg. Freshly roasted and perfectly ground. Thank you Mane Coffee for this quality!",
      helpful: 27
    },
    {
      id: 6,
      name: "Anjali Nair",
      location: "Bangalore",
      rating: 5,
      date: "3 days ago",
      verified: true,
      product: "Premium Arabica",
      review: "Excellent coffee! The aroma fills the entire house when brewing. Smooth, rich, and no bitterness at all. Worth every penny for coffee lovers like me.",
      helpful: 15
    }
  ];

  const filteredReviews = activeFilter === 'all'
    ? reviews
    : activeFilter === '5star'
      ? reviews.filter(r => r.rating === 5)
      : reviews.filter(r => r.verified);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={`${i < rating ? 'text-[#C9A227] fill-current' : 'text-gray-200'}`}
      />
    ));
  };

  return (
    <section className="py-8 md:py-16 bg-[#efe5d7]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2a1f0e] mb-3 md:mb-4">
            Customer Reviews
          </h2>
          <p className="font-body text-sm sm:text-base md:text-lg text-[#2a1f0e]/70 max-w-2xl md:max-w-3xl mx-auto mb-6 md:mb-8 px-2">
            Real feedback from real coffee lovers. See what our customers have to say about their Mane Coffee experience.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 ${activeFilter === 'all'
                ? 'bg-[#C9A227] text-white'
                : 'bg-white text-[#2a1f0e] hover:bg-[#C9A227] hover:text-white'
                }`}
            >
              All ({reviews.length})
            </button>
            <button
              onClick={() => setActiveFilter('5star')}
              className={`px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 ${activeFilter === '5star'
                ? 'bg-[#C9A227] text-white'
                : 'bg-white text-[#2a1f0e] hover:bg-[#C9A227] hover:text-white'
                }`}
            >
              5★ ({reviews.filter(r => r.rating === 5).length})
            </button>
            <button
              onClick={() => setActiveFilter('verified')}
              className={`px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 ${activeFilter === 'verified'
                ? 'bg-[#C9A227] text-white'
                : 'bg-white text-[#2a1f0e] hover:bg-[#C9A227] hover:text-white'
                }`}
            >
              Verified Only ({reviews.filter(r => r.verified).length})
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 border border-[#C9A227]/10"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#efe5d7] rounded-full flex items-center justify-center">
                    <span className="text-sm sm:text-lg font-bold text-[#C9A227]">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      <h4 className="font-semibold text-[#2a1f0e] text-sm sm:text-base">{review.name}</h4>
                      {review.verified && (
                        <span className="bg-green-100 text-green-700 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-[#2a1f0e]/60 mt-0.5">
                      <span>{review.location}</span>
                      <span>•</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="flex items-center">
                  {renderStars(review.rating)}
                </div>
                <span className="text-xs sm:text-sm text-[#2a1f0e]/60 font-medium">
                  {review.rating}.0
                </span>
              </div>

              {/* Product */}
              <div className="mb-2 sm:mb-3">
                <span className="text-xs sm:text-sm text-[#C9A227] font-medium">
                  📦 {review.product}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-[#2a1f0e]/80 leading-relaxed mb-3 sm:mb-4">
                {review.review}
              </p>

              {/* Helpful Button */}
              <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-[#efe5d7]">
                <button className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#2a1f0e]/60 hover:text-[#C9A227] transition-colors duration-200">
                  <Icon name="ThumbsUp" size={12} className="sm:size-14" />
                  Helpful ({review.helpful})
                </button>
                <button className="text-xs sm:text-sm text-[#2a1f0e]/60 hover:text-[#C9A227] transition-colors duration-200">
                  Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating Summary */}
        <div className="mt-8 md:mt-16 bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#C9A227] mb-2">4.8</div>
              <div className="flex justify-center items-center gap-1 mb-2">
                {renderStars(5)}
              </div>
              <div className="text-sm sm:text-base md:text-lg text-[#2a1f0e]/60 font-medium">
                Based on {reviews.length} reviews
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter(r => r.rating === star).length;
                const percentage = (count / reviews.length) * 100;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm text-[#2a1f0e]/60 w-8">{star}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#C9A227] h-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#2a1f0e]/60 w-12 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
