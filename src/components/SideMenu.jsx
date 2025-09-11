import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = ({ toggleMenu }) => {
  // Placeholder menu items


  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Wallets', path: '/category/moneybag' },
    { label: 'Bagpacks', path: '/category/shoulderbag' },
    { label: 'Travel Bags', path: '/category/travelbag' },
    { label: 'Shop All', path: '/shop' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];
  return (
    <ul className="space-y-2">
      {menuItems.map(item => (
        <li key={item.label}>
          <Link
            to={item.path}
            onClick={toggleMenu} // Close menu on link click
            className="block w-full p-3 rounded-lg text-[#400E32] font-medium hover:bg-[#400E32]/10 transition-colors"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SideMenu;
