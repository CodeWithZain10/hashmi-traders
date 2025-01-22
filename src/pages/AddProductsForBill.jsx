import React from "react";
import SearchBar from "../components/SearchBar";

const AddProductsForBill = () => {
  return (
    <div className="relative h-full">
      <div className="p-6">
        <SearchBar />
        <div className="flex justify-start mt-10 gap-10 flex-wrap">
          <div className="bg-gray-700 w-[350px] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg font-semibold">Product Name</h1>
            </div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="price" className="mr-2">
                Price:
              </label>
              <input
                id="price"
                type="number"
                placeholder="0"
                className="w-[100px] p-1 rounded outline-none text-black"
              />
            </div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="qty" className="mr-2">
                Quantity:
              </label>
              <input
                id="qty"
                type="number"
                placeholder="0"
                className="w-[100px] p-1 rounded outline-none text-black"
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <label htmlFor="ml" className="mr-2">
                ML:
              </label>
              <input
                id="ml"
                type="number"
                placeholder="0"
                className="w-[100px] p-1 rounded outline-none text-black"
              />
            </div>
            <div className="flex justify-end">
              <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-10 right-10 ">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg">
          Save
        </button>
      </div>
    </div>
  );
};

export default AddProductsForBill;
