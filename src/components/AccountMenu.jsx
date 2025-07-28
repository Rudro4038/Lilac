import React, { useState } from "react";
import IconButton from "./IconButton";

const AccountMenu = () => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => setVisible(!visible);

  return (
    <>
      <IconButton
        icon={"account_circle"}
        onClick={toggleMenu}
        styleClass="icon-button bg-transparent border-none cursor-pointer "
      />

      <div
        className={`fixed top-0 right-0 w-[250px] h-screen bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out p-4 z-[100] ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul class="list-none p-0">
          <li class="my-4 font-bold cursor-pointer">Profile</li>
          <li class="my-4 font-bold cursor-pointer">Orders</li>
          <li class="my-4 font-bold cursor-pointer">Settings</li>
          <li class="my-4 font-bold cursor-pointer">Logout</li>
        </ul>
      </div>

      {/* Optional backdrop to close on outside click */}
      {visible && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.3)] z-[50]"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default AccountMenu;
