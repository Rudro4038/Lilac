import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation links
import IconButton from './IconButton';
import SideMenu from './SideMenu';

const MenuSidebar = () => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => setVisible(!visible);

  return (
    <>
      {/* Menu Icon Button */}
      <IconButton
        icon={'menu'} // Assuming 'menu' is a valid icon name
        onClick={toggleMenu}
        styleClass="icon-button bg-transparent border-none cursor-pointer"
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#f9e19b] shadow-xl transition-transform duration-300 ease-in-out z-[100] 
                   w-full sm:w-[300px] 
                   sm:rounded-r-3xl 
                   ${visible ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-black/10 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#400E32]">Menu</h2>
            {/* Close button - visible only on mobile */}
            <button
              onClick={toggleMenu}
              className="sm:hidden text-3xl font-light text-[#400E32] leading-none hover:text-red-600 transition-colors"
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow p-4 overflow-y-auto">
            <SideMenu toggleMenu={toggleMenu} />
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {visible && <div className="fixed inset-0 bg-black/30 z-[50]" onClick={toggleMenu}></div>}
    </>
  );
};

export default MenuSidebar;
