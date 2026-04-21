import React from 'react';
import { Link } from 'react-router-dom';

const ExperienceTraditionCTA = () => {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="bg-hero-gradient rounded-3xl p-12 text-center border border-[#C9A227]/20 shadow-gold-lg relative overflow-hidden">
                    {/* Decorative gold shimmer overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    
                    <h3 className="text-4xl font-heading font-bold mb-6 text-gold-gradient relative z-10">
                        Experience the Taste of Tradition
                    </h3>
                    <p className="text-xl mb-10 text-[#f5e6c8]/80 font-body max-w-2xl mx-auto relative z-10">
                        Shop our complete collection of premium traditional products crafted with care and authentic recipes.
                    </p>
                    <Link
                        to="/product-collection-grid"
                        className="inline-flex items-center px-10 py-4 bg-[#C9A227] text-white font-heading font-bold rounded-full hover:bg-[#F0C040] transition-all duration-300 shadow-gold-md hover:scale-105 relative z-10"
                    >
                        Shop All Products
                        <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ExperienceTraditionCTA;
