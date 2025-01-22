import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBill = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between p-2">
        <h1 className="font-semibold p-2 text-2xl">Create Bill</h1>
        <button
          onClick={() => navigate("/add-product-for-bill")}
          className="text-xl bg-orange-500 p-2 rounded-lg mr-4"
        >
          Add Products
        </button>
      </div>
    </>
  );
};

export default CreateBill;
