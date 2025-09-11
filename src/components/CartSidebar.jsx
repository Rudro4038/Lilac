import React, { useState } from 'react';
import IconButton from './IconButton';
import Cart from './Cart'; // Assuming you have a Cart component

const CartSideBar = () => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => setVisible(!visible);

  return (
    <>
      <IconButton
        icon={'shopping_bag'}
        onClick={toggleMenu}
        styleClass="icon-button bg-transparent border-none cursor-pointer "
      />

      <div
        className={`fixed top-0 right-0 h-screen bg-[#f9e19b] shadow-xl transition-transform duration-300 ease-in-out z-[100] 
                   w-full sm:w-[600px] 
                   sm:rounded-l-3xl 
                   ${visible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Flex container to manage layout and scrolling */}
        <div className="flex flex-col h-full">
          {/* Updated header with flex layout and close button */}
          <div className="p-4 border-b border-black/10 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#400E32]">Cart</h2>
            {/* Close button - visible on ALL devices with animations */}
            <button
              onClick={toggleMenu}
              className="w-8 h-8 flex items-center justify-center text-2xl font-bold text-[#400E32] leading-none hover:text-white hover:bg-red-500 hover:scale-110 active:scale-95 transition-all duration-200 ease-in-out rounded-full border-2 border-[#400E32] hover:border-red-500 transform hover:rotate-90"
              aria-label="Close cart"
            >
              &times;
            </button>
          </div>

          {/* Content area is now scrollable */}
          <div className="flex-grow p-4 overflow-y-auto">
            <Cart />
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {visible && (
        <div
          className="fixed inset-0 bg-black/30 z-[50]"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default CartSideBar;
