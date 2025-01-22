import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from "./Drawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <nav className="flex justify-between items-center w-full h-14 p-4 mb-4 bg-gray-700">
      <div className="flex items-center gap-4">
        <GiHamburgerMenu
          size={24}
          className="cursor-pointer text-white"
          onClick={handleDrawer}
        />
        <h1 className="text-white text-lg sm:text-2xl font-bold">
          Hashmi Traders
        </h1>
      </div>
      {drawerOpen && <Drawer onClose={handleDrawer} />}
    </nav>
  );
};

export default Navbar;
