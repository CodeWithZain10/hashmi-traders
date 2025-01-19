import React from "react";

const SalesCard = () => {
  return (
    <>
      <div className="flex justify-evenly">
        <div className="bg-gray-700 w-[320px] h-[120px] rounded-lg">
          <div className="p-4">
            <h2 className="text-white text-xl font-bold">Total Sales</h2>
            <p className="text-white text-3xl font-bold">Rs. 100,000</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesCard;
