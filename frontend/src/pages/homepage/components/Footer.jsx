import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const popularSearches = [
    "Arabica Coffee", "Robusta Coffee", "Filter Coffee", "Roasted Beans",
    "Instant Coffee", "Coorg Special", "Green Coffee", "Coffee Powder",
    "Premium Blend", "Dark Roast", "Medium Roast", "Espresso Beans"
  ];

  const footerLinks = {
    company: [
      { label: "About Us", path: "/about" },
      { label: "Our Blog", path: "/blog" },
      { label: "Our Story", path: "/about#heritage-story" },
      { label: "Contact Us", path: "/contact" }
    ],
    customer: [
      { label: "My Account", path: "/user-account-dashboard" },
      { label: "Order History", path: "/user-account-dashboard?tab=orders" },
      { label: "Track Order", path: "/user-account-dashboard?tab=orders" },
      { label: "Help & Support", path: "/contact" }
    ],
    policies: [
      { label: "Shipping Policy", path: "/shipping-policy" },
      { label: "Return Policy", path: "/return-policy" },
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms of Service", path: "/terms-of-service" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "#" },
    { name: "Instagram", icon: "Instagram", url: "#" },
    { name: "Twitter", icon: "Twitter", url: "#" },
    { name: "YouTube", icon: "Youtube", url: "#" }
  ];

  const contactInfo = {
    phone: "+91 90194 45168",
    whatsapp: "+91 90194 45168",
    email: "support@manecoffeee.com",
    address: "Chennangi Village and Chennayan Kote Post, Polibetta Chennangi, Virajpet, Kodagu, Karnataka- 571215"
  };

  return (
    <footer className="bg-[#1e1509] border-t border-[#C9A227]/20 text-[#f5e6c8]">
      {/* Popular Searches Section */}
      <div className="border-b border-[#C9A227]/10 py-8">
        <div className="container mx-auto px-4">
          <h3 className="font-heading font-bold text-lg text-[#C9A227] mb-4">
            Popular Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches?.map((search, index) => (
              <Link
                key={index}
                to={`/product-collection-grid?search=${encodeURIComponent(search)}`}
                className="bg-[#C9A227]/10 hover:bg-[#C9A227] text-[#f5e6c8]/80 hover:text-[#1e1509] px-3 py-1 rounded-full text-sm font-caption transition-all duration-300 border border-[#C9A227]/20"
              >
                {search}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/homepage" className="flex items-center space-x-3 mb-4 group">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img
                    src="/assets/images/logo.jpeg"
                    alt="Mane Coffee"
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="font-heading font-bold text-xl text-[#C9A227]">
                  Mane Coffee
                </span>
              </Link>
              <p className="font-body text-[#f5e6c8]/60 mb-6 max-w-md">
                Experience the rich legacy of Coorg's finest coffee beans, expertly roasted and blended for the perfect cup. Handcrafted with passion using time-honored methods to bring you the authentic taste of tradition in every sip.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-[#C9A227]" />
                  <a
                    href={`tel:${contactInfo?.phone}`}
                    className="font-body text-sm text-[#f5e6c8]/80 hover:text-[#C9A227] transition-colors duration-200"
                  >
                    {contactInfo?.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MessageCircle" size={16} className="text-success" />
                  <a
                    href={`https://wa.me/${contactInfo?.whatsapp?.replace(/\s/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-foreground hover:text-success transition-colors duration-200"
                  >
                    WhatsApp: {contactInfo?.whatsapp}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-[#C9A227]" />
                  <a
                    href={`mailto:${contactInfo?.email}`}
                    className="font-body text-sm text-[#f5e6c8]/80 hover:text-[#C9A227] transition-colors duration-200"
                  >
                    {contactInfo?.email}
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="MapPin" size={16} className="text-[#C9A227] mt-0.5" />
                  <span className="font-body text-sm text-[#f5e6c8]/60">
                    {contactInfo?.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-heading font-bold text-[#C9A227] mb-4 uppercase text-xs tracking-widest">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks?.company?.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link?.path}
                      className="font-body text-sm text-[#f5e6c8]/60 hover:text-[#C9A227] transition-colors duration-200"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-heading font-bold text-[#C9A227] mb-4 uppercase text-xs tracking-widest">
                Customer Service
              </h4>
              <ul className="space-y-3">
                {footerLinks?.customer?.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link?.path}
                      className="font-body text-sm text-[#f5e6c8]/60 hover:text-[#C9A227] transition-colors duration-200"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="font-heading font-bold text-[#C9A227] mb-4 uppercase text-xs tracking-widest">
                Policies
              </h4>
              <ul className="space-y-3">
                {footerLinks?.policies?.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link?.path}
                      className="font-body text-sm text-[#f5e6c8]/60 hover:text-[#C9A227] transition-colors duration-200"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Footer */}
      <div className="border-t border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="font-caption text-sm text-[#f5e6c8]/40 text-center md:text-left">
              © {currentYear} Mane Coffee. All rights reserved.
              <span className="mx-2">|</span>

            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="font-caption text-sm text-muted-foreground hidden md:block">
                Follow us:
              </span>
              {socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#C9A227]/10 hover:bg-[#C9A227] text-[#C9A227] hover:text-[#1e1509] rounded-full flex items-center justify-center transition-all duration-300 border border-[#C9A227]/20"
                  aria-label={`Follow us on ${social?.name}`}
                >
                  <Icon name={social?.icon} size={16} />
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <span className="font-caption text-xs text-muted-foreground">
                We accept:
              </span>
              <div className="flex items-center space-x-1">

                <div className="w-8 h-5 bg-muted rounded border flex items-center justify-center">
                  <Icon name="CreditCard" size={12} />
                </div>
                <div className="w-8 h-5 bg-muted rounded border flex items-center justify-center">
                  <Icon name="Smartphone" size={12} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;