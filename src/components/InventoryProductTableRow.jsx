import React, { useState } from 'react';
import CollapseableForm from './CollapseableForm';
import ImageContainer from './ImageContainer';
import InventoryProductUpdate from '../hooks/useInventoryProductUpdate';
import {getFallbackImageUrl} from '../utility/CloudinaryUtility';


const InventoryProductTableRow = ({ singleProduct, categoryID }) => {
  const { deleteProduct } = InventoryProductUpdate();
  /*
  
  {"productID":"product1","colors":["olive","gray","beige"],"currency":"BDT","description":"Stylish shoulderbag made from durable canvas, ideal for daily use and casual outings.","discount":15,"name":"Urban Canvas Shoulderbag","price":1299.99,"rating":4.5,"reviews":58,"stock":85,"tags":["canvas","urban","lightweight"],"imageLinks":["link1","link2","link3"]}
  
  */

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const openImageModal = () => {
    setIsImageModalOpen(true);
    // setCurrentImageIndex(0);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const formatPrice = (price, discount) => {
    const discountedPrice = price - (price * discount) / 100;
    return {
      original: price.toFixed(2),
      final: discountedPrice.toFixed(2),
      savings: (price - discountedPrice).toFixed(2),
    };
  };

  const getStockStatus = stock => {
    if (stock === 0) return { status: 'Out of Stock', color: 'text-red-600 bg-red-100' };
    if (stock < 10) return { status: 'Low Stock', color: 'text-orange-600 bg-orange-100' };
    if (stock < 50) return { status: 'In Stock', color: 'text-blue-600 bg-blue-100' };
    return { status: 'Well Stocked', color: 'text-green-600 bg-green-100' };
  };

  const priceInfo = formatPrice(singleProduct.price, singleProduct.discount);
  const stockInfo = getStockStatus(singleProduct.stock);

  return (
    <>
      <table className="w-full border-collapse">
        <tbody>
          <tr className="border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm">
            {/* Image */}
            <td className="p-4 w-20 align-middle">
              <div className="relative group">
                <img
                  src={getFallbackImageUrl(singleProduct.imageLinks?.[0] || '/placeholder-image.jpg')}
                  alt={singleProduct.name}
                  className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity border border-gray-200"
                  onClick={openImageModal}
                />
                {singleProduct.imageLinks?.length > 1 && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                    +{singleProduct.imageLinks.length - 1}
                  </div>
                )}
                {/* Floating View Button */}
                <button
                  onClick={openImageModal}
                  className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <span className="text-white text-sm font-medium">View</span>
                </button>
              </div>
            </td>

            {/* Name & ID */}
            <td className="p-4 w-56 align-middle">
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{singleProduct.name}</h3>
                <p className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                  ID: {singleProduct.productID}
                </p>
              </div>
            </td>

            {/* Price & Discount */}
            <td className="p-4 w-32 align-middle text-center">
              <div className="flex flex-col items-center">
                {singleProduct.discount > 0 ? (
                  <>
                    <span className="text-lg font-bold text-gray-900 mb-1">৳{priceInfo.final}</span>
                    <span className="text-sm text-gray-500 line-through mb-1">৳{priceInfo.original}</span>
                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                      Save ৳{priceInfo.savings}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900">৳{priceInfo.original}</span>
                )}
              </div>
            </td>

            {/* Colors & Tags */}
            <td className="p-4 w-40 align-middle">
              <div className="flex flex-col space-y-3">
                {/* Colors */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 font-medium min-w-max">Colors:</span>
                  <div className="flex flex-wrap gap-1">
                    {singleProduct.colors?.slice(0, 3).map((color, index) => (
                      <span
                        key={index}
                        className="inline-block w-4 h-4 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                    {singleProduct.colors?.length > 3 && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-1 rounded">
                        +{singleProduct.colors.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 font-medium min-w-max">Tags:</span>
                  <div className="flex flex-wrap gap-1">
                    {singleProduct.tags?.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                    {singleProduct.tags?.length > 2 && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-1 rounded">
                        +{singleProduct.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </td>

            {/* Stock Status */}
            <td className="p-4 w-28 align-middle text-center">
              <div className="flex flex-col items-center space-y-2">
                <span className={`inline-block px-3 py-1.5 text-xs rounded-full font-medium ${stockInfo.color}`}>
                  {stockInfo.status}
                </span>
                <span className="text-sm text-gray-600 font-medium">{singleProduct.stock} units</span>
              </div>
            </td>

            {/* Rating & Reviews */}
            <td className="p-4 w-24 align-middle text-center">
              <div className="flex flex-col items-center space-y-1">
                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                  <span className="text-yellow-500 text-sm">★</span>
                  <span className="text-sm font-medium text-gray-900 ml-1">{singleProduct.rating?.toFixed(1)}</span>
                </div>
                <span className="text-xs text-gray-500">{singleProduct.reviews} reviews</span>
              </div>
            </td>

            {/* Description */}
            <td className="p-4 max-w-xs align-top">
              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{singleProduct.description}</p>
            </td>

            {/* Actions */}
            <td className="p-4 w-24 align-middle">
              <div className="flex flex-col space-y-2">
                <button
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 text-sm font-medium py-2 px-3 rounded transition-colors"
                  onClick={() => setIsExpanded(prev => !prev)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 text-sm font-medium py-2 px-3 rounded transition-colors"
                  onClick={async () => {
                    const isConfirmed = window.confirm(
                      `Are you sure you want to delete "${singleProduct.name}"? This action cannot be undone.`
                    );

                    if (isConfirmed) {
                      // eslint-disable-next-line no-console
                      console.log('User confirmed deletion');

                      const result = await deleteProduct(categoryID, singleProduct.productID);

                      if (result.success) {
                        // eslint-disable-next-line no-console
                        console.log('Product deleted successfully!');
                        // You could add a success notification here
                      } else {
                        // eslint-disable-next-line no-console
                        console.error('Delete failed:', result.message);
                        alert('Failed to delete product: ' + result.message);
                      }
                    } else {
                      // eslint-disable-next-line no-console
                      console.log('User cancelled deletion');
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <CollapseableForm
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        singleProduct={singleProduct}
        categoryID={categoryID}
      />

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg max-w-4xl max-h-[90vh] w-full mx-4">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ×
            </button>

            <ImageContainer singleProduct={singleProduct} deletable={false} />
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryProductTableRow;
