import { useEffect, useState } from 'react';
import GeneralButton from '../Ui_kits/GeneralButton';
import UploadWidgets from './UploadWidgets';
import ImageContainer from './ImageContainer';
import InventoryProductUpdate from '../hooks/useInventoryProductUpdate';

const CollapseableForm = ({ isExpanded, setIsExpanded, singleProduct, categoryID }) => {
  const { updateProduct } = InventoryProductUpdate();
  const [formData, setFormData] = useState({
    productID: '',
    name: '',
    price: '',
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
    if (singleProduct) {
      // console.log(singleProduct);
      setFormData(singleProduct);
    }

    // else {
    //   console.log('edit this product nai');
    // }
  }, [singleProduct, isExpanded]);

  const handleInputChange = e => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || null : value,
    }));
  };

  const onDeleteImage = (link) => {
    setFormData(prev => ({
      ...prev,
      imageLinks: prev.imageLinks.filter((_) => _ !== link)
    }));
  };

  const addColor = () => {
    if (colorInput.trim() && !formData.colors.includes(colorInput.trim())) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, colorInput.trim()],
      }));
      setColorInput('');
    }
  };

  const removeColor = colorToRemove => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(color => color !== colorToRemove),
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = tagToRemove => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
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
      price: '',
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
                  {formData.colors.map((color, index) => (
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
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <GeneralButton type="button" onClick={addTag} variant="primary" size="small">
                    Add
                  </GeneralButton>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
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

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <GeneralButton
                  type="submit"
                  variant="primary"
                  size="medium"
                  onClick={async () => {
                    const result = await updateProduct(categoryID, formData.productID, formData);
                    if (result.success) {
                      console.log('Product updated successfully!');
                      setIsExpanded(false);
                    } else {
                      console.error('Update failed:', result.message);
                    }
                  }}
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
