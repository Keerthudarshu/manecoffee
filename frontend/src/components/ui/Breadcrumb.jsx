import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const pathMap = {
    '/homepage': 'Home',
    '/product-collection-grid': 'Products',
    '/product-detail-page': 'Product Details',
    '/shopping-cart': 'Shopping Cart',
    '/user-account-dashboard': 'My Account',
    '/checkout-process': 'Checkout'
  };

  const generateBreadcrumbs = () => {
    if (customItems) return customItems;
    
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/homepage' }];
    
    let currentPath = '';
    pathSegments?.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = pathMap?.[currentPath] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      breadcrumbs?.push({ label, path: currentPath });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs?.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-[#C9A227]/40 mx-2" 
              />
            )}
            {index === breadcrumbs?.length - 1 ? (
              <span className="font-body font-medium text-[#C9A227]">
                {crumb?.label}
              </span>
            ) : (
              <Link
                to={crumb?.path}
                className="font-body text-[#C9A227]/60 hover:text-[#C9A227] transition-colors duration-200"
              >
                {crumb?.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;