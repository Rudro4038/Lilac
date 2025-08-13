import React, { useEffect } from 'react';
import { useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import {getFallbackImageUrl} from '../utility/CloudinaryUtility'

import CloudinaryUploadWidget from './CloudinaryUploadWidget';

// eslint-disable-next-line no-unused-vars
const UploadWidgets = ({ formData, setFormData, categoryID }) => {
  const cloudName = 'dxabfyao8';
  const uploadPreset = 'lilacImages';
  const [publicId, setPublicId] = useState('');
  const [imageError, setImageError] = useState(false);

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  useEffect(() => {
    if (publicId) {
      console.log('Adding publicId to imageLinks:', publicId);
      setFormData(prev => ({
        ...prev,
        imageLinks: [...prev.imageLinks, publicId],
      }));
    }
  }, [publicId, setFormData]);


  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
    cropping: false,
    showAdvancedOptions: false,
    sources: ['local'],
    multiple: false,
    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'ico'],
    maxImageFileSize: 10000000, // 10MB
    maxImageWidth: 4000,
    maxImageHeight: 4000,
    theme: '',
    resourceType: 'image',
    folder: 'lilac_products', // Optional: organize uploads in folders
  };

  return (
    <div className="">
      <h3 className="text-xl font-bold mb-4">Add image of the product</h3>

      <div className="mb-4">
        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
      </div>

      {publicId ? (
        <div className="image-preview border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Uploaded Image (Public ID: {publicId}):</p>
          <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
            {!imageError ? (
              <AdvancedImage
                className="max-w-full max-h-full object-contain"
                cldImg={
                  cld
                    .image(publicId)
                    .format('auto') // Auto-optimize format (WebP, AVIF when supported)
                    .quality('auto') // Auto-optimize quality
                }
                plugins={[responsive(), placeholder()]}
                onError={error => {
                  console.error('AdvancedImage error:', error);
                  console.log('Failed publicId:', publicId);
                  console.log('Switching to fallback image...');
                  setImageError(true);
                }}
                onLoad={() => {
                  console.log('AdvancedImage loaded successfully');
                  console.log('Loaded publicId:', publicId);
                }}
                alt={`Uploaded image: ${publicId}`}
              />
            ) : (
              <img
                src={getFallbackImageUrl(publicId)}
                alt={`Uploaded image: ${publicId}`}
                className="max-w-full max-h-full object-contain"
                onError={e => {
                  console.error('Fallback image also failed:', e);
                }}
                // onLoad={() => {
                //   console.log('Fallback image loaded successfully');
                // }}
              />
            )}
          </div>

          {/* Debug Info */}
          <div className="mt-2 text-xs text-gray-500">
            <p>Cloud Name: {cloudName}</p>
            <p>Public ID: {publicId}</p>
            <p>Direct URL: {getFallbackImageUrl(publicId)}</p>
            <p>Using: {imageError ? 'Fallback IMG' : 'AdvancedImage'}</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-500">No image uploaded yet. Click the upload button above.</p>
        </div>
      )}
    </div>
  );
};

export default UploadWidgets;
