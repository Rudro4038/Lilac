import React, { useEffect, useState } from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductShowCard from './ProductShowCard';



const ProductCaseForSingleCategory = ({category}) => {
  // Add CSS animations for mobile responsiveness
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      /* Enhanced touch targets for mobile */
      @media (max-width: 640px) {
        button {
          min-height: 44px;
        }
      }
      
      /* Smooth scrolling for mobile category tabs */
      .category-scroll {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      .category-scroll::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);



  const [activeCategory, setActiveCategory] = useState( category  || 'moneybag');
  const { products: hookProducts, getProducts } = useFetchProducts();

  useEffect(() => {
    // Try to fetch products when component mounts
    getProducts();
  }, [getProducts]);

  // Process the hookProducts data to match expected format
  const processedProducts = React.useMemo(() => {
    if (!hookProducts || hookProducts.length === 0) {
      return {};
    }

    const processed = {};

    hookProducts.forEach(categoryItem => {
      if (categoryItem.categoryID) {
        const categoryID = categoryItem.categoryID;

        // Create a copy without categoryID
        const { categoryID: _, ...categoryData } = categoryItem;

        // If it's an object with numeric/string keys, convert to array
        if (typeof categoryData === 'object' && !Array.isArray(categoryData)) {
          const productsArray = Object.keys(categoryData)
            .filter(key => categoryData[key] && typeof categoryData[key] === 'object')
            .map(key => ({
              id: key,
              ...categoryData[key],
            }));
          processed[categoryID] = productsArray;
        } else if (Array.isArray(categoryData)) {
          processed[categoryID] = categoryData.filter(item => item !== null);
        }
      }
    });

    return processed;
  }, [hookProducts]);

  const categories = [
    { key: 'moneybag', label: 'Wallets' },
    { key: 'shoulderbag', label: 'Backpacks' },
    { key: 'travelbag', label: 'Travel Bags' },
  ];


  return (
    <div className="w-full mt-5 px-3 sm:px-6 lg:px-8">
      {/* Header - Mobile Optimized */}
      <div className="text-center mb-6 sm:mb-8 lg:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#400E32] mb-2 sm:mb-4 px-2">
          Our Collection
        </h2>
        <p className="text-gray-900 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
          Discover our curated selection of premium bags and accessories
        </p>
      </div>


      {/* Category Tabs - Mobile First */}

      <div className="flex overflow-x-auto category-scroll gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 lg:mb-12 px-2 pb-2 sm:pb-0 sm:justify-center">
        {categories.map(category => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 transform active:scale-95 hover:scale-105 min-w-[70px] sm:min-w-[80px] whitespace-nowrap ${
              activeCategory === category.key
                ? 'bg-[#400E32] text-[#F2CD5C] shadow-lg'
                : 'bg-white text-[#400E32] border border-[#400E32] hover:bg-[#400E32] hover:text-[#F2CD5C]'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Products Grid - Enhanced Mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
        {processedProducts[activeCategory]?.map((product, index) => (
          <ProductShowCard key={product.id||index} product={product} index={index}/>
        )) || (
          <div className="col-span-full text-center py-8 sm:py-12">
            <p className="text-gray-500 text-sm sm:text-base">No products found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCaseForSingleCategory;
