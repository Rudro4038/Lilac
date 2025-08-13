import React, { useState } from 'react';
import {getFallbackImageUrl} from '../utility/CloudinaryUtility';


const ImageContainer = ({ singleProduct, deletable, onDeleteImage }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDeleteImage = (index,link) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete this image?`);
    
    if (isConfirmed) {
      // console.log('Delete image at index:', index);
      
      // Call the parent's delete function to update the actual data
      if (onDeleteImage) {
        onDeleteImage(link);
      }
      
      if (index === currentImageIndex) {
        if (singleProduct.imageLinks.length === 1) {
          // If this is the last image, reset to 0
          setCurrentImageIndex(0);
        } else if (index === singleProduct.imageLinks.length - 1) {
          // If deleting the last image, show the previous one
          setCurrentImageIndex(index - 1);
        }
        // If deleting from middle or beginning, currentImageIndex stays the same
        // (the next image will automatically shift into the current position)
      } else if (index < currentImageIndex) {
        // If deleting an image before the current one, adjust the index
        setCurrentImageIndex(currentImageIndex - 1);
      }
    }
  };
  // console.log(deletable);

  return (
    <>
      {singleProduct && singleProduct.imageLinks && singleProduct.imageLinks.length > 0 ? (
        <>
          <div className="relative">
            <img
              src={getFallbackImageUrl(singleProduct.imageLinks?.[currentImageIndex])}
              alt={`${singleProduct.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
          </div>

          {/* Image Info*/}
          <div className="p-4 border-t">
            <h3 className="font-semibold text-lg">{singleProduct.name}</h3>
            <p className="text-gray-600 text-sm mt-1">
              Image {currentImageIndex + 1} of {singleProduct.imageLinks?.length}
            </p>

            {/* Thumbnail Navigation */}
            {singleProduct.imageLinks?.length > 1 && (
              <div className="flex space-x-4 mt-3 overflow-x-auto">
                {singleProduct.imageLinks.map((link, index) => (
                  <div key={index} className="relative group">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        setCurrentImageIndex(index);
                      }}
                      className={`flex-shrink-0 w-20 h-20 rounded border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <img src={getFallbackImageUrl(link)} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded" />
                    </button>

                    {deletable && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          e.preventDefault();

                          handleDeleteImage(index,link);
                        }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-md"
                        title="Delete image"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <h3 className="font-semibold text-lg">No Image Available</h3>
      )}
    </>
  );
};

export default ImageContainer;

/*

<div className="relative">
        <img
          src={singleProduct.imageLinks?.[currentImageIndex]}
          alt={`${singleProduct.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
        />
      </div>

      {/* Image Info}
      <div className="p-4 border-t">
        <h3 className="font-semibold text-lg">{singleProduct.name}</h3>
        <p className="text-gray-600 text-sm mt-1">
          Image {currentImageIndex + 1} of {singleProduct.imageLinks?.length}
        </p>

        {/* Thumbnail Navigation }
        {singleProduct.imageLinks?.length > 1 && (
          <div className="flex space-x-2 mt-3 overflow-x-auto">
            {singleProduct.imageLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-12 h-12 rounded border-2 transition-all ${
                  index === currentImageIndex
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <img src={link} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded" />
              </button>
            ))}
          </div>
        )}
      </div>



*/
