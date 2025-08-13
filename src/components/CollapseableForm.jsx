import { useEffect, useState } from 'react';
import GeneralButton from '../Ui_kits/GeneralButton';
import UploadWidgets from './UploadWidgets';
import ImageContainer from './ImageContainer';
import InventoryProductUpdate from '../hooks/useInventoryProductUpdate';

const CollapseableForm = ({ 
  isExpanded = false, 
  setIsExpanded = () => {}, 
  singleProduct = null, 
  categoryID = null 
}) => {
  const { updateProduct } = InventoryProductUpdate();
  const [formData, setFormData] = useState({
    productID: '',
    name: '',
    price: 0,
    currency: 'BDT',
    discount: 0,
    rating: 0,
    reviews: 0,
    description: '',
    colors: [],
    stock: 0,
    tags: [],
    imageLinks: [],
  });

  const [colorInput, setColorInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (singleProduct && typeof singleProduct === 'object') {
      // Ensure arrays are always arrays (Firebase might return null for empty arrays)
      setFormData({
        productID: singleProduct.productID || '',
        name: singleProduct.name || '',
        price: typeof singleProduct.price === 'number' ? singleProduct.price : 0,
        currency: singleProduct.currency || 'BDT',
        discount: typeof singleProduct.discount === 'number' ? singleProduct.discount : 0,
        rating: typeof singleProduct.rating === 'number' ? singleProduct.rating : 0,
        reviews: typeof singleProduct.reviews === 'number' ? singleProduct.reviews : 0,
        description: singleProduct.description || '',
        colors: Array.isArray(singleProduct.colors) ? singleProduct.colors : [],
        tags: Array.isArray(singleProduct.tags) ? singleProduct.tags : [],
        imageLinks: Array.isArray(singleProduct.imageLinks) ? singleProduct.imageLinks : [],
        stock: typeof singleProduct.stock === 'number' ? singleProduct.stock : 0,
      });
    }
  }, [singleProduct, isExpanded]);

  useEffect(() => {
    // console.log(formData);
  }, [formData]);

  // Render early error if critical props are missing
  if (!categoryID) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600 text-sm">Error: Category ID is required</p>
      </div>
    );
  }

  const handleInputChange = e => {
    const { name, value, type } = e.target;
    
    let processedValue = value;
    
    // Type-safe number conversion
    if (type === 'number') {
      processedValue = value === '' ? 0 : parseFloat(value);
      // Ensure it's a valid number
      if (isNaN(processedValue)) {
        processedValue = 0;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const submitCollapsableForm = async (e) => {
    e.preventDefault();

    // Comprehensive validation
    const validationErrors = [];

    if (!formData.productID || typeof formData.productID !== 'string' || formData.productID.trim() === '') {
      validationErrors.push('Product ID is required');
    }
    
    if (!formData.name || typeof formData.name !== 'string' || formData.name.trim() === '') {
      validationErrors.push('Product name is required');
    }
    
    if (!formData.price || typeof formData.price !== 'number' || formData.price <= 0) {
      validationErrors.push('Price must be greater than 0');
    }
    
    if (typeof formData.discount === 'number' && (formData.discount < 0 || formData.discount > 100)) {
      validationErrors.push('Discount must be between 0 and 100');
    }
    
    if (typeof formData.rating === 'number' && (formData.rating < 0 || formData.rating > 5)) {
      validationErrors.push('Rating must be between 0 and 5');
    }
    
    if (typeof formData.stock === 'number' && formData.stock < 0) {
      validationErrors.push('Stock cannot be negative');
    }

    // Show validation errors
    if (validationErrors.length > 0) {
      alert('Please fix the following errors:\n' + validationErrors.join('\n'));
      return;
    }

    try {
      const result = await updateProduct(categoryID, formData.productID, formData);
      if (result && result.success) {
        setIsExpanded(false);
        // Reset form for new product creation
        if (!singleProduct) {
          setFormData({
            productID: '',
            name: '',
            price: 0,
            currency: 'BDT',
            discount: 0,
            rating: 0,
            reviews: 0,
            description: '',
            colors: [],
            stock: 0,
            tags: [],
            imageLinks: [],
          });
        }
      } else {
        alert('Update failed: ' + (result?.message || 'Unknown error'));
      }
    } catch (error) {
      alert('An error occurred: ' + (error.message || 'Unknown error'));
    }
  };

  const onDeleteImage = link => {
    setFormData(prev => ({
      ...prev,
      imageLinks: Array.isArray(prev.imageLinks) ? prev.imageLinks.filter(_ => _ !== link) : [],
    }));
  };

  const addColor = () => {
    if (!colorInput || typeof colorInput !== 'string') return;
    
    const trimmedColor = colorInput.trim();
    if (!trimmedColor) return;
    
    const currentColors = Array.isArray(formData.colors) ? formData.colors : [];
    if (currentColors.includes(trimmedColor)) return;
    
    setFormData(prev => ({
      ...prev,
      colors: [...currentColors, trimmedColor],
    }));
    setColorInput('');
  };

  const removeColor = colorToRemove => {
    if (!colorToRemove || typeof colorToRemove !== 'string') return;
    
    setFormData(prev => ({
      ...prev,
      colors: Array.isArray(prev.colors) ? prev.colors.filter(color => color !== colorToRemove) : [],
    }));
  };

  const addTag = () => {
    if (!tagInput || typeof tagInput !== 'string') return;
    
    const trimmedTag = tagInput.trim();
    if (!trimmedTag) return;
    
    const currentTags = Array.isArray(formData.tags) ? formData.tags : [];
    if (currentTags.includes(trimmedTag)) return;
    
    setFormData(prev => ({
      ...prev,
      tags: [...currentTags, trimmedTag],
    }));
    setTagInput('');
  };

  const removeTag = tagToRemove => {
    if (!tagToRemove || typeof tagToRemove !== 'string') return;
    
    setFormData(prev => ({
      ...prev,
      tags: Array.isArray(prev.tags) ? prev.tags.filter(tag => tag !== tagToRemove) : [],
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // if (onAddProduct) {
    //   onAddProduct(formData);
    // }
    // Reset form

    // console.log(formData);

    setFormData({
      productID: '',
      name: '',
      price: 0,
      currency: 'BDT',
      discount: 0,
      rating: 0,
      reviews: 0,
      description: '',
      colors: [],
      stock: 0,
      tags: [],
      imageLinks: [],
    });
    setIsExpanded(false);
  };
  return (
    <>
      {isExpanded && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-6 bg-transparent text-black">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product UID *</label>
                <input
                  type="text"
                  name="productID"
                  value={formData.productID}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#400E32] focus:border-transparent"
                  placeholder="Enter products UID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#400E32] focus:border-transparent"
                  placeholder="Enter products name"
                />
              </div>

              {/* Price and Currency */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#400E32] focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium  mb-1">Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#400E32] focus:border-transparent"
                  >
                    <option value="BDT">BDT</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              {/* Discount and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#400E32] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#400E32] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#400E32] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Reviews</label>
                  <input
                    type="number"
                    name="reviews"
                    value={formData.reviews}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border  border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#400E32] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#400E32] focus:border-transparent"
                  placeholder="Enter products description"
                />
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Colors</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={colorInput}
                    onChange={e => setColorInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#400E32] focus:border-transparent"
                    placeholder="Enter color (e.g., black, brown)"
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addColor())}
                  />
                  <GeneralButton type="button" onClick={addColor} variant="primary" size="small">
                    Add
                  </GeneralButton>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(formData.colors) &&
                    formData.colors.length > 0 &&
                    formData.colors.map((color, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#400E32] text-[#F2CD5C]"
                      >
                        {color}
                        <button
                          type="button"
                          onClick={() => removeColor(color)}
                          className="ml-2 text-[#F2CD5C] hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#400E32] focus:border-transparent"
                    placeholder="Enter tag (e.g., leather, compact)"
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <GeneralButton type="button" onClick={addTag} variant="primary" size="small">
                    Add
                  </GeneralButton>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(formData.tags) &&
                    formData.tags.length > 0 &&
                    formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#F2CD5C] text-[#400E32]"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-[#400E32] hover:text-gray-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
              </div>

              <ImageContainer singleProduct={formData} deletable={true} onDeleteImage={onDeleteImage} />
              <UploadWidgets categoryID={categoryID} formData={formData} setFormData={setFormData} />

              {/* Submit Button - Fixed positioning */}
              <div className="flex justify-end pt-6 mt-6  -mx-6 px-6 py-4 sticky bottom-0 z-10">
                <GeneralButton
                  type="submit"
                  variant="primary"
                  size="medium"
                  className="shadow-lg"
                  onClick={submitCollapsableForm}
                >
                  {singleProduct ? 'Update Product' : 'Add Product'}
                </GeneralButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CollapseableForm;
