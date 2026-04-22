import React, { useState, useEffect } from 'react';
import productApi from '../../../services/productApi';

const EdibleOilsSection = () => {
    const [edibleOils, setEdibleOils] = useState([
        { id: 101, name: 'Arabica', img: '/assets/images/coffee/Arabica.png' },
        { id: 102, name: 'Robusta', img: '/assets/images/coffee/Robusta.png' },
        { id: 103, name: 'Arabica + Robusta', img: '/assets/images/coffee/Arabica+robusta.png' },
    ]);

    useEffect(() => {
        const fetchProductIds = async () => {
            try {
                const updatedOils = await Promise.all(edibleOils.map(async (oil) => {
                    try {
                        const results = await productApi.search(oil.name);
                        if (results && results.length > 0) {
                            // Find the best match by name
                            const match = results.find(p =>
                                p.name.toLowerCase().includes(oil.name.toLowerCase()) ||
                                oil.name.toLowerCase().includes(p.name.toLowerCase())
                            );
                            if (match) {
                                return { ...oil, id: match.id };
                            }
                        }
                    } catch (err) {
                        console.error(`Error fetching ID for ${oil.name}:`, err);
                    }
                    return oil;
                }));
                setEdibleOils(updatedOils);
            } catch (error) {
                console.error("Error updating Edible Oils with backend IDs:", error);
            }
        };

        fetchProductIds();
    }, []);

    return (
        <section className="py-16 lg:py-24 bg-[#efe5d7]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#2a1f0e] mb-6">
                        <span className="text-[#C9A227]">Mane Coffee Products</span>
                    </h2>
                    <div className="w-24 h-1 bg-[#C9A227] mx-auto mb-6 rounded-full"></div>
                    <p className="font-body text-lg text-[#2a1f0e]/60 max-w-2xl mx-auto">
                        Experience the purity of our premium Mane Coffee products, crafted for health and wellness using traditional methods.
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-3 md:gap-10 max-w-6xl mx-auto">
                    {edibleOils.map((oil) => (
                        <a
                            key={oil.id}
                            href={`/product-detail-page/${oil.id}`}
                            className="group flex flex-col bg-[#120d07]/5 rounded-3xl shadow-sm hover:shadow-gold-lg transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="relative w-full aspect-[4/5] flex items-center justify-center overflow-hidden">
                                <img
                                    src={oil.img}
                                    alt={oil.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#120d07]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <div className="p-2 sm:p-8 flex items-center justify-center bg-white border-t border-[#C9A227]/5">
                                <span className="font-heading text-xs sm:text-xl font-bold text-[#2a1f0e] text-center group-hover:text-[#C9A227] transition-colors duration-300">
                                    {oil.name}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EdibleOilsSection;
