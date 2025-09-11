import React from 'react';
import { Link } from 'react-router-dom';

const LilacLink = ({ children , link, style }) => {
  return (
    <>
      <Link to={link}>
        {/* <p className="underline decoration-[#400E32] hover:no-underline transition-all duration-300 ease-in-out" style={style}>{children}</p> */}
        <div className="underline decoration-[#400E32] underline-offset-[0.2em] transition-all duration-300 hover:scale-[105%] hover:decoration-[#7c174f] hover:underline-offset-[0.2em]" style={style}>{children}</div>
      </Link>
    </>
  );
};

export default LilacLink;
