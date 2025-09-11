import React, { useEffect, useRef, useState } from 'react';
import { getFallbackImageUrl } from '../utility/CloudinaryUtility';

const ProductShowCard = ({ product, index }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef(null);

  const formatPrice = price => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace('BDT', '৳');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (cardRef.current && !hasAnimated) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array to prevent re-running

  return (
    <div
      ref={cardRef}
      className={`group bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm sm:shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden ${
        hasAnimated ? 'fade-in-up-animated' : 'fade-in-up-hidden'
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageLinks?.[0] ? getFallbackImageUrl(product.imageLinks[0]) : '/onlyLilacIcon.png'}
          alt={product.name || 'Product'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={e => {
            e.target.src = '/onlyLilacIcon.png';
          }}
        />
        <div className="absolute inset-0 bg-[#400e3200] group-hover:bg-[#400e3210] transition-all duration-300 flex items-center justify-center">
          <button className="bg-white text-[#400E32] px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-xs sm:text-sm font-medium hover:bg-[#F2CD5C] hover:text-[#400E32] active:scale-95">
            View
          </button>
        </div>
        {product.discount > 0 && (
          <div className="absolute top-1.5 sm:top-2 lg:top-3 right-1.5 sm:right-2 lg:right-3 bg-[#A61F69] text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}
      </div>
      <div className="p-2 sm:p-3 lg:p-4">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-[#400E32] mb-1 sm:mb-2 group-hover:text-[#A61F69] transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="text-sm sm:text-lg lg:text-xl font-bold text-[#400E32] order-2 sm:order-1">
            {formatPrice(product.price)}
          </div>
          <button className="w-full sm:w-auto bg-[#400E32] text-[#F2CD5C] px-2 sm:px-3 py-1.5 sm:py-1.5 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium hover:bg-[#A61F69] hover:text-white transition-all duration-300 transform active:scale-95 hover:scale-105 order-1 sm:order-2">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductShowCard;
