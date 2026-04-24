import React from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../homepage/components/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';

const blogPosts = [
    {
        id: 'coorg-coffee-guide',
        title: "The Ultimate Guide to Coorg's Arabica and Robusta",
        excerpt: "Understand the soul of Kodagu coffee. From the aromatic sweetness of Arabica to the bold strength of Robusta, discover which blend defines your morning.",
        image: "/assets/store/store1.png",
        date: "April 15, 2024",
        category: "Coffee Education",
        readTime: "6 min read"
    },
    {
        id: 'shade-grown-heritage',
        title: "Why Shade-Grown Coffee from Coorg is Superior",
        excerpt: "Explore how the biodiversity of Kodagu's high-altitude hills creates a unique microclimate for producing India's finest, most sustainable beans.",
        image: "/assets/store/store2.png",
        date: "April 20, 2024",
        category: "Our Heritage",
        readTime: "5 min read"
    },
    {
        id: 'traditional-sun-drying',
        title: "The Art of Sun-Drying: Preserving the Kodava Flavor",
        excerpt: "Learn about the time-honored traditional processing methods where coffee cherries are naturally dried under the Coorg sun to lock in the pure essence.",
        image: "/assets/store/store3.png",
        date: "May 5, 2024",
        category: "Traditional Processes",
        readTime: "7 min read"
    }
];

const BlogIndex = () => {
    const breadcrumbItems = [
        { label: 'Home', path: '/homepage' },
        { label: 'Our Blog', path: '/blog' }
    ];

    return (
        <>
            <SEO 
                title="Mane Coffee Blog - Coorg Coffee Guides and Brewing Tips"
                description="Read Mane Coffee blog articles on Coorg coffee culture, Arabica vs Robusta, brewing tips, and traditional estate processing methods."
                keywords="Mane Coffee blog, Coorg coffee guide, Arabica vs Robusta, coffee brewing tips India, Kodagu coffee stories"
                canonical="/blog"
                ogTitle="Mane Coffee Blog | Coorg Coffee Insights"
                ogDescription="Explore coffee guides, brewing knowledge, and stories from Coorg."
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "Blog",
                    "name": "Mane Coffee Blog",
                    "url": "https://manecoffeee.com/blog",
                    "publisher": {
                        "@type": "Organization",
                        "name": "Mane Coffee",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://manecoffeee.com/assets/images/logo.jpeg"
                        }
                    },
                    "blogPost": blogPosts.map((post) => ({
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "url": `https://manecoffeee.com/blog/${post.id}`,
                        "datePublished": new Date(post.date).toISOString(),
                        "image": `https://manecoffeee.com${post.image}`,
                        "description": post.excerpt
                    }))
                }}
            />

            <div className="min-h-screen bg-background">
                <Header />

                <main className="pt-6">
                    <div className="container mx-auto px-4">
                        <Breadcrumb customItems={breadcrumbItems} />
                    </div>

                    <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
                        <div className="container mx-auto px-4 text-center">
                            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-6">
                                Our Blog
                            </h1>
                            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                Exploring the mist-covered hills of Kodagu through stories of heritage coffee,
                                artisan roasting, and the pure essence of Coorg's finest beans.
                            </p>
                        </div>
                    </section>

                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {blogPosts.map((post) => (
                                    <article key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-border">
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-8 flex-grow flex flex-col">
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Icon name="Calendar" size={14} />
                                                    <span>{post.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Icon name="Clock" size={14} />
                                                    <span>{post.readTime}</span>
                                                </div>
                                            </div>

                                            <h2 className="font-heading font-bold text-2xl text-primary mb-4 line-clamp-2 min-h-[4rem]">
                                                <Link to={`/blog/${post.id}`} className="hover:text-accent transition-colors duration-200">
                                                    {post.title}
                                                </Link>
                                            </h2>

                                            <p className="font-body text-muted-foreground mb-6 line-clamp-3 flex-grow">
                                                {post.excerpt}
                                            </p>

                                            <Link
                                                to={`/blog/${post.id}`}
                                                className="inline-flex items-center gap-2 text-accent font-heading font-bold hover:text-primary transition-colors duration-200 group-btn"
                                            >
                                                Read More
                                                <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Newsletter Section */}
                    <section className="py-16 bg-green-50">
                        <div className="container mx-auto px-4 max-w-4xl">
                            <div className="bg-primary rounded-3xl p-12 text-center text-white shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Icon name="Mail" size={120} />
                                </div>
                                <h2 className="font-heading text-3xl font-bold mb-6">Join the Coffee Club</h2>
                                <p className="font-body text-xl mb-8 text-white/90">
                                    Subscribe to our newsletter for coffee brewing guides, estate updates from Coorg, and exclusive blog stories.
                                </p>
                                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                                    <input
                                        type="email"
                                        placeholder="Your Email Address"
                                        className="flex-grow px-6 py-4 rounded-full text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="bg-accent hover:bg-white hover:text-accent text-white px-8 py-4 rounded-full font-heading font-bold transition-all duration-300 shadow-lg"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default BlogIndex;
