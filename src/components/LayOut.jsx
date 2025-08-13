import React from 'react';
import Nav from './Nav';
import DiscountUpNav from './DiscountUpNav';
import Footer from './Footer';

const LayOut = ({ children, viewer }) => {
  return (
    <div
      className=" bg-fixed bg-gradient-to-tr from-[#729b8c] via-[#879176] to-[#907767] 
      min-h-screen w-full bg-no-repeat bg-cover bg-center"
    >
      {/* 
       from-[#729b8c] via-[#879176] to-[#907767] 
        from-[#a8e6cf] via-[#dcedc1] to-[#ffd3b6] 
        from-[#d0e7ff] via-[#dfffd6] to-[#fffacc]

        from-[#e6f0ec] via-[#c7d2c0] to-[#a3b18a]
      } */}

      {viewer === 'Customer' ? <DiscountUpNav /> : null}

      <Nav />
      <div className="main min-h-screen">{children}</div>

      <Footer></Footer>
    </div>
  );
};

export default LayOut;
