import React, { useState, useEffect } from 'react';
// import { useAuth } from "../contexts/AuthContext.jsx";
import { Link, useNavigate } from 'react-router-dom';
import CartSidebar from './CartSidebar';
import IconButton from './IconButton';
import MenuSideBar from './MenuSideBar';

//{ navRef, SingInAndDirectToChatInterface }
function Nav() {
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  // const currentUser = null;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="sticky top-0 left-0 z-40 transition-all duration-300 ">
      <div
        className={`w-full flex justify-between bg-[#400E32] items-center relative text-[#F2CD5C] h-[35px] ${
          isSticky ? 'rounded-2xl ' : ''
        }`}
        style={{
          width: isSticky ? '93%' : '100%',
          transition: 'all 0.3s ease',
          margin: isSticky ? '0 auto' : '0 auto',
        }}
      >
        <MenuSideBar />

        {/* absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 */}
        <Link
          to="/home"
          className="logo h-[20px] sm:h-[25px] md:h-[30px] max-w-[120px] sm:max-w-[150px] md:max-w-[180px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
        >
          <img src="/onlyLilacLogo.png" alt="Lilac Logo" className="w-full h-full object-contain" />
        </Link>
        <div className="">
          <>
            <CartSidebar />
            <IconButton icon={'account_circle'} styleClass={'hidden sm:block'} onClick={() => navigate('/profile')}/>
          </>
        </div>
      </div>
    </div>
  );
}

export default Nav;
