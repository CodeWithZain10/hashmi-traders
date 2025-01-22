import React, { useState } from "react";
import Modal from "../components/Modal";

const CreateBill = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full flex justify-between p-2">
        <h1 className="font-semibold p-2 text-2xl">Create Bill</h1>
        <button
          onClick={handleOpenModal}
          className="text-xl bg-orange-500 p-2 rounded-lg mr-4"
        >
          Add Products
        </button>
      </div>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </>
  );
};

export default CreateBill;
