import React from "react";
import { NavLink } from "react-router-dom";

const Drawer = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex">
      {/* Overlay */}
      <div className="w-full bg-black opacity-50" onClick={onClose}></div>

      {/* Drawer Panel */}
      <div className="w-64 h-full bg-gray-700 text-white p-4">
        <h2 className="text-xl mb-4 font-bold">Menu</h2>
        <hr className="mb-4" />
        <ul className="flex flex-col gap-4">
          <NavLink to={"/"} className="mb-2 cursor-pointer" onClick={onClose}>
            Dashboard
          </NavLink>
          <NavLink
            to={"/products"}
            className="mb-2 cursor-pointer"
            onClick={onClose}
          >
            Products
          </NavLink>
          <NavLink
            to={"/create-bill"}
            className="mb-2 cursor-pointer"
            onClick={onClose}
          >
            Create Bill
          </NavLink>
          <NavLink to={"/sales"} className="cursor-pointer" onClick={onClose}>
            Sales
          </NavLink>
          <NavLink to={"/invoice"} className="cursor-pointer" onClick={onClose}>
            Invoice
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
