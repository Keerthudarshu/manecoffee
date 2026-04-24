import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Header from '../../components/ui/Header';
import Footer from '../homepage/components/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';

// Mock data for individual posts
const blogData = {
    'coorg-coffee-guide': {
        title: "The Ultimate Guide to Coorg's Arabica and Robusta",
        date: "April 15, 2024",
        category: "Coffee Education",
        readTime: "6 min read",
        author: "Mane Coffee Roasters",
        image: "/assets/store/store1.png",
        content: [
            { type: 'paragraph', text: "In the mist-covered hills of Kodagu (Coorg), coffee isn't just a drink—it's a tradition. Understanding the two primary pillars of this heritage, Arabica and Robusta, is the first step for any coffee lover." },
            { type: 'heading', text: "Arabica: The Aromatic Queen" },
            { type: 'paragraph', text: "Grown at higher altitudes, our Coorg Arabica is known for its smooth, sweet profile. It carries subtle notes of chocolate and berries, with a bright acidity that defines premium specialty coffee. Because it thrives under the shade of silver oak and jackfruit trees, the beans mature slowly, developing complex aromatic compounds." },
            { type: 'image', src: "/assets/store/store2.png", alt: "Freshly harvested Arabica beans from Coorg" },
            { type: 'heading', text: "Robusta: The Bold Strength" },
            { type: 'paragraph', text: "Kodagu is world-renowned for its high-quality Robusta. Unlike the bitter variants found elsewhere, Coorg Robusta is full-bodied, earthy, and intense. It offers a rich crema and a powerful caffeine kick, making it the perfect base for traditional Indian filter coffee or a strong morning espresso." },
            { type: 'paragraph', text: "At Mane Coffee, we masterfully blend these two varieties to create our signature Arabica+Robusta mixes, bringing you the 'best of both worlds'—the aroma of the hills and the strength of the soil." }
        ],
        seoDescription: "Learn the differences between Arabica and Robusta coffee grown in Coorg and how Mane Coffee crafts the perfect blend.",
        seoKeywords: "Arabica vs Robusta, Coorg coffee varieties, Kodagu coffee beans, best indian coffee blend, pure coffee powders"
    },
    'shade-grown-heritage': {
        title: "Why Shade-Grown Coffee from Coorg is Superior",
        date: "April 20, 2024",
        category: "Our Heritage",
        readTime: "5 min read",
        author: "Kodagu Estate Desk",
        image: "/assets/store/store4.png",
        content: [
            { type: 'paragraph', text: "While much of the world's coffee is grown on open sun-scorched plantations, the coffee of Coorg tells a different story. Here, coffee bushes live in harmony with a diverse canopy of jungle trees, creating what we call 'Shade-Grown Heritage'." },
            { type: 'heading', text: "Biodiversity in Every Bean" },
            { type: 'paragraph', text: "The shade trees—jackfruit, rosewood, and wild fig—not only protect the coffee from direct sunlight but also provide a habitat for over 300 species of birds and bees. This ecosystem naturally enriches the soil, eliminating the need for heavy chemical fertilizers." },
            { type: 'image', src: "/assets/store/store6.png", alt: "Lush shade-grown coffee estate in Kodagu" },
            { type: 'heading', text: "The Microclimate Advantage" },
            { type: 'paragraph', text: "The canopy maintains a consistent temperature and moisture level, allowing the coffee cherries to ripen at a natural, slower pace. This results in beans that are denser, more flavorful, and packed with the authentic 'terroir' of the Western Ghats." },
            { type: 'paragraph', text: "By choosing Mane Coffee, you are supporting a sustainable farming legacy that has protected the Coorg landscape for over 150 years." }
        ],
        seoDescription: "Discover the benefits of shade-grown coffee and how the biodiversity of Coorg's estates produces India's finest beans.",
        seoKeywords: "shade grown coffee Coorg, sustainable coffee farming, Kodagu estates, biodiversity in coffee, eco friendly coffee beans"
    },
    'traditional-sun-drying': {
        title: "The Art of Sun-Drying: Preserving the Kodava Flavor",
        date: "May 5, 2024",
        category: "Traditional Processes",
        readTime: "7 min read",
        author: "Artisan Processing Unit",
        image: "/assets/store/store5.png",
        content: [
            { type: 'paragraph', text: "Modern industrial coffee processing often relies on mechanical dryers to speed up production. But at Mane Coffee, we stick to the time-honored Kodava method of sun-drying coffee cherries on traditional brick yards (kallu-kala)." },
            { type: 'heading', text: "Nature's Slow Perfection" },
            { type: 'paragraph', text: "Sun-drying is a slow, meticulous process that takes anywhere from 10 to 15 days. The coffee cherries are spread in thin layers and turned by hand several times a day to ensure even drying. This allow the natural sugars in the cherry fruit to soak into the bean, enhancing its body and sweetness." },
            { type: 'image', src: "/assets/store/store3.png", alt: "Coffee cherries drying under the Coorg sun" },
            { type: 'heading', text: "Why We Wait" },
            { type: 'paragraph', text: "Mechanical drying can sometimes 'cook' the bean or strip it of its essential oils. Sun-drying, while labor-intensive, preserves the delicate volatile compounds that give Coorg coffee its signature earthy and spicy notes." },
            { type: 'paragraph', text: "It is this patience and respect for nature's rhythm that makes every sip of Mane Coffee a pure, authentic experience." }
        ],
        seoDescription: "Examine the traditional sun-drying methods used in Coorg estates to produce authentic, flavorful coffee beans.",
        seoKeywords: "coffee sun drying Coorg, traditional coffee processing, Kodava coffee culture, sun dried coffee beans, artisan coffee processing"
    }
};

const BlogPost = () => {
    const { id } = useParams();
    const post = blogData[id];

    if (!post) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl font-heading font-bold text-primary mb-6">Blog Post Not Found</h1>
                    <p className="font-body text-lg text-muted-foreground mb-8">Sorry, the article you are looking for does not exist.</p>
                    <Link to="/blog" className="bg-primary text-white px-8 py-3 rounded-full font-heading font-bold">Back to Blog</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const breadcrumbItems = [
        { label: 'Home', path: '/homepage' },
        { label: 'Our Blog', path: '/blog' },
        { label: post.title, path: `/blog/${id}` }
    ];

    const normalizedPublishedDate = new Date(post.date).toISOString();
    const estimatedWordCount = post.content
        .filter((item) => item.type === 'paragraph' || item.type === 'heading')
        .map((item) => item.text || '')
        .join(' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    return (
        <>
            <SEO 
                title={post.title}
                description={post.seoDescription}
                keywords={`${post.seoKeywords}, Mane Coffee blog, Coorg coffee stories`}
                canonical={`/blog/${id}`}
                ogTitle={`${post.title} - Mane Coffee`}
                ogDescription={post.seoDescription}
                ogImage={post.image}
                ogType="article"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": `https://manecoffeee.com/blog/${id}`
                    },
                    "headline": post.title,
                    "description": post.seoDescription,
                    "image": `https://manecoffeee.com${post.image}`,
                    "datePublished": normalizedPublishedDate,
                    "dateModified": normalizedPublishedDate,
                    "articleSection": post.category,
                    "wordCount": estimatedWordCount,
                    "author": {
                        "@type": "Organization",
                        "name": "Mane Coffee"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "Mane Coffee",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://manecoffeee.com/assets/images/logo.jpeg"
                        }
                    }
                }}
            />

            <div className="min-h-screen bg-background">
                <Header />

                <main className="pt-6">
                    <div className="container mx-auto px-4">
                        <Breadcrumb customItems={breadcrumbItems} />
                    </div>

                    <article className="py-16">
                        <div className="container mx-auto px-4 max-w-4xl">
                            {/* Header */}
                            <header className="mb-12 text-center">
                                <span className="bg-accent/10 text-accent text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6 inline-block">
                                    {post.category}
                                </span>
                                <h1 className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-8 leading-tight">
                                    {post.title}
                                </h1>

                                <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground border-y border-border py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">SP</div>
                                        <span className="font-medium text-foreground">{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Icon name="Calendar" size={18} />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Icon name="Clock" size={18} />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </header>

                            {/* Featured Image */}
                            <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl aspect-[16/9]">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="prose prose-lg prose-primary max-w-none font-body">
                                {post.content.map((item, idx) => {
                                    if (item.type === 'paragraph') return <p key={idx} className="text-muted-foreground leading-relaxed mb-6 text-lg whitespace-pre-line">{item.text}</p>;
                                    if (item.type === 'heading') return <h2 key={idx} className="text-primary font-heading font-bold text-3xl mt-12 mb-6">{item.text}</h2>;
                                    if (item.type === 'image') return (
                                        <figure key={idx} className="my-10">
                                            <img src={item.src} alt={item.alt} className="rounded-2xl w-full shadow-lg" />
                                            <figcaption className="text-center text-sm text-muted-foreground mt-4 italic">{item.alt}</figcaption>
                                        </figure>
                                    );
                                    return null;
                                })}
                            </div>

                            {/* Sharing & Navigation */}
                            <div className="mt-16 pt-12 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-8">
                                <div className="flex items-center gap-4">
                                    <span className="font-heading font-bold text-primary">Share:</span>
                                    <div className="flex gap-3">
                                        {['Facebook', 'Twitter', 'Linkedin', 'Share2'].map(social => (
                                            <button key={social} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                                <Icon name={social} size={18} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-heading font-bold hover:text-accent transition-colors duration-200">
                                    <Icon name="ArrowLeft" size={20} />
                                    Back to All Stories
                                </Link>
                            </div>
                        </div>
                    </article>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default BlogPost;
