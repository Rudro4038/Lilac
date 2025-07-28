import React from "react";
import Nav from "./Nav";
import DiscountUpNav from "./DiscountUpNav";
import Footer from "./Footer"

const LayOut = ({children}) => {
  return (
    <div className=" bg-fixed bg-gradient-to-tr from-[#282525] to-gray-500 min-h-screen w-full bg-no-repeat bg-cover bg-center">
      <DiscountUpNav />
      <Nav />
      <div className="main">
        {children}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default LayOut;
