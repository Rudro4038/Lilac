import React from "react";

const IconButton = ({ icon, onClick, styleClass }) => {
  return (
    <button
      className={`material-symbols-outlined px-[12px] py-[5px] cursor-pointer text-[#F2CD5C] hover:text-[#e6b414] hover:scale-120 transition-all duration-200 ${styleClass}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
