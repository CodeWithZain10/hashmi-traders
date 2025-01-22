import React from "react";
import SearchBar from "./SearchBar";

const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Panel */}
      <div className="bg-gray-700 w-[80%] h-[40%] p-6 rounded-lg shadow-lg relative flex flex-col justify-between">
        <div>
          <h2 className="text-xl mb-4 font-bold">Add Products</h2>
          <SearchBar />
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
