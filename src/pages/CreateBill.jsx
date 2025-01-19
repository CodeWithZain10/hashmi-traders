import React, { useState } from "react";

const CreateBill = () => {
  const [items, setItems] = useState([
    { serialNo: "", itemName: "", quantity: "", variant: "", price: "" },
  ]);
  const [vendorName, setVendorName] = useState("");

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { serialNo: "", itemName: "", quantity: "", variant: "", price: "" },
    ]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotalAmount = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return total + price * quantity;
    }, 0);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-6">Create Bill</h1>
      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">
          Vendor Name
        </label>
        <input
          type="text"
          placeholder="Enter Vendor Name"
          className="w-full p-2 rounded-lg border text-black border-gray-300 outline-none"
        />
      </div>

      <table className="w-full text-left text-black  border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-3 border border-gray-600">Serial No</th>
            <th className="p-3 border border-gray-600">Item Name</th>
            <th className="p-3 border border-gray-600">Quantity</th>
            <th className="p-3 border border-gray-600">Variant</th>
            <th className="p-3 border border-gray-600">Price</th>
            <th className="p-3 border border-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr key={""}>
            <td className="p-3 border border-gray-600">
              <input
                type="text"
                className="w-full p-1 rounded border border-gray-300 outline-none"
                placeholder="Serial No"
              />
            </td>
            <td className="p-3 border border-gray-600">
              <input
                type="text"
                className="w-full p-1 rounded border border-gray-300 outline-none"
                placeholder="Item Name"
              />
            </td>
            <td className="p-3 border border-gray-600">
              <input
                type="number"
                className="w-full p-1 rounded border border-gray-300 outline-none"
                placeholder="Quantity"
              />
            </td>
            <td className="p-3 border border-gray-600">
              <input
                type="number"
                className="w-full p-1 rounded border border-gray-300 outline-none"
                placeholder="Variant"
              />
            </td>
            <td className="p-3 border border-gray-600">
              <input
                type="number"
                className="w-full p-1 rounded border border-gray-300 outline-none"
                placeholder="Price"
              />
            </td>
            <td className="p-3 border border-gray-600">
              <button className="bg-red-500 text-white px-2 rounded hover:bg-red-600">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6">
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
          Add Item
        </button>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
          Create Bill
        </button>
      </div>

      <div className="text-white font-semibold mt-4">
        <h2>Total Amount: PKR {calculateTotalAmount().toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default CreateBill;
