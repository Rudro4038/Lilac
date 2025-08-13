import React, { useState } from 'react';
import image from '../assets/bag1.png';

const ProductShow = () => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-[5rem] py-8 md:py-[2.5rem]">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Left Side - Product Image */}
        <div className="w-full h-auto md:w-[60%] lg:w-[65%] xl:w-full max-w-[600px] mx-auto md:mx-0 bg-transparent rounded-lg overflow-hidden">
          <img
            src={image}
            alt="Branded Backpack"
            className="w-[80%] mx-auto object-contain rounded-md shadow-md"
          />

          {/* Small Images Row */}
          <div className="flex gap-2 p-4 justify-center">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="w-16 h-16 border border-[#400E32] rounded-md cursor-pointer overflow-hidden"
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="w-full md:w-[40%] lg:w-[35%] flex flex-col gap-4 text-black">
          <h1 className="text-2xl md:text-3xl font-bold">
            Branded Glowy Backpack
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-[#400E32]">TK 129.99</span>
            <span className="text-lg line-through text-red-300">TK 159.99</span>
            <span className="bg-[#F2CD5C] px-2 py-1 rounded-md text-sm font-bold">
              Save 20%
            </span>
          </div>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <span key={star} className="text-[#F2CD5C] text-xl">
                ★
              </span>
            ))}
            <span className="text-black ml-2">(28 reviews)</span>
          </div>

          <div className="my-4">
            <h2 className="font-bold mb-2">Description</h2>
            <p className="text-black">
              Premium quality backpack perfect for everyday use. Made with
              water-resistant material, multiple compartments for organization,
              padded laptop sleeve, and comfortable shoulder straps.
            </p>
          </div>

          <div className="my-4">
            <h2 className="font-bold mb-2">Colors</h2>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-black border-2 border-[#400E32] cursor-pointer"></div>
              {/* <div className='w-8 h-8 rounded-full bg-[#521140] cursor-pointer'></div>
                            <div className='w-8 h-8 rounded-full bg-[#F2CD5C] cursor-pointer'></div> */}
            </div>
          </div>

          <div className="my-4">
            <h2 className="font-bold mb-2">Quantity</h2>
            <div className="flex items-center border border-gray-300 rounded-md w-fit">
              <button
                onClick={decrementQuantity}
                className="px-3 py-1 text-xl font-bold hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-l border-r border-gray-300">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="px-3 py-1 text-xl font-bold hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 py-3 bg-[#400E32] text-[#F2CD5C] font-bold rounded-md hover:bg-[#521140] transition-colors">
              Add to Cart
            </button>
            <button className="flex-1 py-3 border-2 border-[#400E32] text-[#400E32] font-bold rounded-md hover:bg-[#400E32] hover:text-[#F2CD5C] transition-colors">
              Buy Now
            </button>
          </div>

          <div className="mt-4 text-sm text-black">
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined">local_shipping</span>
              Free shipping on orders over 5000 BDT
            </p>
            <p className="flex items-center gap-2 mt-1">
              <span className="material-symbols-outlined">update</span>7 -day
              return policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShow;
