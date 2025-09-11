import React from 'react';
import { Icon } from 'lucide-react';
import { Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import LilacLink from './LilacLink';

const Footer = () => {
  const f = () => {
    // console.log('f clicked');
  };

  return (
    <>
      <footer className="w-full py-12 bg-[#90165942] text-[black] font-GeneralText">
        <div className="w-[80%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Follow us on */}
          <div className="flex flex-col">
            <h3 className="text-md font-semibold mb-4">Follow us on</h3>
            <LilacLink link="https://www.facebook.com/61579658034389">
              <div className="flex gap-1 items-center">
                <Facebook size={20} />
                Facebook
              </div>
            </LilacLink>
            <LilacLink link="#">
              <div className="flex gap-1 items-center">
                <Instagram size={20} />
                Instagram
              </div>
            </LilacLink>
          </div>

          {/* Quick links */}
          <div className="flex flex-col">
            <h3 className="text-md font-semibold mb-4">Quick links</h3>
            <LilacLink link="#">Search</LilacLink>
            <LilacLink link="#">Privacy Policy</LilacLink>
            <LilacLink link="#">Refund Policy</LilacLink>
            <LilacLink link="#">Shipping Policy</LilacLink>
            <LilacLink link="#">About us</LilacLink>
          </div>

          {/* Our mission */}
          <div className="flex flex-col ">
            <h3 className="text-md font-semibold mb-4">Our Values</h3>
            <p className="font-GeneralText ">
              Our mission is to provide our customers with the best products that are both stylish and functional,
              offering modern and timeless designs for the everyday user.
            </p>
          </div>
        </div>
      </footer>
      <div className="w-full text-center bg-[#400E32] font-GeneralText text-[#e3d4a7] ">
        {' '}
        <span className="cursor-pointer text-gray-100" onClick={f}>
          &copy; 2025 Web Studio.
        </span>{' '}
      </div>
    </>
  );
};

export default Footer;
