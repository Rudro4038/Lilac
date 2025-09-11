import React, { useEffect, useState, useMemo } from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductShowCard from './ProductShowCard';

const ProductCaseForAllTogerther = () => {
  // State to manage how many products are visible
  const [visibleCount, setVisibleCount] = useState(8);
  const { products: hookProducts, getProducts } = useFetchProducts();

  // Fetch products when the component mounts
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Process and flatten products from all categories into a single array
  const allProducts = useMemo(() => {
    if (!hookProducts || hookProducts.length === 0) {
      return [];
    }

    let flatProducts = [];
    hookProducts.forEach(categoryItem => {
      if (categoryItem.categoryID) {
        const { categoryID: _, ...categoryData } = categoryItem;
        if (typeof categoryData === 'object' && !Array.isArray(categoryData)) {
          const productsArray = Object.keys(categoryData)
            .filter(key => categoryData[key] && typeof categoryData[key] === 'object')
            .map(key => ({
              id: `${categoryItem.categoryID}-${key}`, // Create a unique ID
              ...categoryData[key],
            }));
          flatProducts = [...flatProducts, ...productsArray];
        }
      }
    });
    return flatProducts;
  }, [hookProducts]);

  // Shuffle the flattened array of products once
  const shuffledProducts = useMemo(() => {
    const array = [...allProducts];
    // Fisher-Yates shuffle algorithm for random order
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, [allProducts]);

  // Function to show all remaining products
  const handleLoadMore = () => {
    setVisibleCount(shuffledProducts.length);
  };

  return (
    <div className="w-full mt-5 px-3 sm:px-6 lg:px-8">
      <div className="text-center mb-6 sm:mb-8 lg:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#400E32] mb-2 sm:mb-4 px-2">
          Explore Our Products
        </h2>
        <p className="text-gray-900 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
          A curated selection of our finest bags and accessories, just for you.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
        {shuffledProducts.slice(0, visibleCount).map((product, index) => (
          <ProductShowCard key={product.id || index} product={product} index={index} />
        ))}
      </div>

      {/* Load More Button - shows only if there are more products to load */}
      {shuffledProducts.length > visibleCount && (
        <div className="text-center mt-8 sm:mt-12">
          <button
            onClick={handleLoadMore}
            className="bg-gradient-to-r from-[#400E32] to-[#A61F69] text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCaseForAllTogerther;
