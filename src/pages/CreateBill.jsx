import React from "react";
import Modal from "../components/Modal";

const CreateBill = () => {
  return (
    <>
      <div className="w-full flex justify-between p-2">
        <h1 className="font-semibold p-2 text-2xl">Create Bill</h1>
        <button className="text-xl bg-orange-500 p-2 rounded-lg mr-4">
          Add Products
        </button>
      </div>
    </>
  );
};

export default CreateBill;
