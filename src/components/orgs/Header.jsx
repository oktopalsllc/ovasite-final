import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileMenu from "./MobileMenu";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="bg-white px-10 h-20 flex items-center justify-end">
      <div className="w-10 h-10 rounded-full bg-gray-400 border-3 border-[#001333]"></div>
      <div className="block lg:hidden">
        <GiHamburgerMenu
          onClick={() => setShowMenu(!showMenu)}
          className="w-8 h-8 cursor-pointer md:block"
        />
        <div
          className={`${showMenu ? "block" : "hidden"}`}
        >
          <MobileMenu />
        </div>
      </div>
    </div>
  );
}

export default Header;
