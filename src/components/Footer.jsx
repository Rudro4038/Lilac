import React from 'react';

const Footer = () => {
  const f = () => {
    console.log('f clicked');
  };

  return (
    <>
      <footer className="w-full py-12 bg-[#90165918] text-[black] font-GeneralText">
        <div className="w-[80%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Follow us on */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold mb-4">Follow us on</h3>
            <a
              href="#"
              className="hover:text-[#F2CD5C] hover:scale-[110%] transition-all"
            >
              Facebook
            </a>
            <a
              href="#"
              className="hover:text-[#F2CD5C] hover:scale-[110%] transition-all"
            >
              Instagram
            </a>
          </div>

          {/* Quick links */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold mb-4">Quick links</h3>
            <a
              href="#"
              className="hover:text-[#F2CD5C] hover:scale-[110%] transition-all"
            >
              Search
            </a>
            <a
              href="#"
              className="hover:text-[#F2CD5C] hover:scale-[110%] transition-all duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-[#F2CD5C] hover:scale-[110%] transition-all duration-300"
            >
              Refund Policy
            </a>
            <a
              href="#"
              className="hover:text-[#F2CD5C] hover:scale-[110%] transition-all  duration-300"
            >
              Shipping Policy
            </a>
            <a
              href="#"
              className="hover:text-[#F2CD5C] hover:scale-[110%] transition-all duration-300"
            >
              About us
            </a>
          </div>

          {/* Our mission */}
          <div className="flex flex-col ">
            <h3 className="font-semibold mb-4">Our mission</h3>
            <p className="font-GeneralText ">
              Our mission is to provide our customers with the best products
              that are both stylish and functional, offering modern and timeless
              designs for the everyday user.
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
