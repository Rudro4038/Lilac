import React, { useState, useEffect } from "react";
// import { useAuth } from "../contexts/AuthContext.jsx";
// import { useNavigate } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import IconButton from "./IconButton";

//{ navRef, SingInAndDirectToChatInterface }
function Nav() {
  const [isSticky, setIsSticky] = useState(false);
  const currentUser = null;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="sticky top-0 left-0 z-40 transition-all duration-300">
      <div
        className={`w-full flex justify-between bg-[#400E32] items-center relative text-[#F2CD5C] ${
          isSticky ? "rounded-2xl " : ""
        }`}
        style={{
          width: isSticky ? "93%" : "100%",
          transition: "all 0.3s ease",
          margin: isSticky ? "0 auto" : "0 auto",
        }}
      >
        <IconButton icon={"menu"} />

        {/* absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 */}
        <div className="logo  h-[30px] ">
          <img src="/onlyLilacLogo.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="pr-[15px]">
          {!currentUser ? (
            <>
              {/* <button
                className="rounded-md font-medium bg-(--color-ShaddedWhite) border-2 border-[#f2f2f2] text-(--color-backgroundDark) hover:bg-(--color-backgroundDark) hover:text-(--color-ShaddedWhite)"
                //   onClick={SingInAndDirectToChatInterface}
              >
                Sign In
              </button>
              <button
                className="rounded-md font-medium bg-(--color-ShaddedWhite) border-2 border-[#f2f2f2] text-(--color-backgroundDark) hover:bg-(--color-backgroundDark) hover:text-(--color-ShaddedWhite)"
                //   onClick={SingInAndDirectToChatInterface}
              >
                Sign Up
                </button> */}
              <IconButton icon={"shopping_bag"} />
              {/* <IconButton icon={"account_circle"} /> */}
              <AccountMenu />
            </>
          ) : (
            <div className="flex items-center justify-end gap-2">
              <span className="font-[Montserrat] font-medium">
                {currentUser?.displayName}
              </span>
              {currentUser?.photoURL && (
                <img
                  // onClick={handleGoogleSignOut}
                  src={currentUser.photoURL}
                  alt="Profile"
                  className="w-8 mr-10 h-8 rounded-full border-solid border-[#646cff] border-2 object-cover"
                  onError={(e) => {
                    console.error("Image failed to load:", e);
                    console.log("Attempted URL:", currentUser.photoURL);
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
