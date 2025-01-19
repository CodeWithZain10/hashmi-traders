import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from "./Drawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="flex justify-between items-center w-full h-14 p-4 mb-4 bg-gray-700">
      <div className="w-[45%]">
        <GiHamburgerMenu
          size={24}
          className="cursor-pointer text-white"
          onClick={handleDrawer}
        />
      </div>
      <div className="w-[55%]">
        <h1 className="text-white text-2xl font-bold">Hashmi Traders</h1>
      </div>
      {drawerOpen && <Drawer onClose={handleDrawer} />}
    </div>
  );
};

export default Navbar;
