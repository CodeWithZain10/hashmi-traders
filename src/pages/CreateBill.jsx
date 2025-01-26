import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { addInvoice } from "../redux/features/invoice/invoiceSlice";
import toast from "react-hot-toast";

const CreateBill = () => {
  const navigate = useNavigate();
  const bill = useSelector((state) => state.bill.products);
  const [vendorName, setVendorName] = useState("");
  const dispatch = useDispatch();

  const totalAmount = bill.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const saveBill = async () => {
    if (!vendorName.trim()) {
      toast.error("Vendor name is required.");
      return;
    }
    if (bill.length === 0) {
      toast.error("Please add at least one product.");
      return;
    }

    const db = getFirestore();
    try {
      // Prepare the invoice data
      const invoiceData = {
        vendorName: vendorName.trim(),
        products: bill.map((product) => ({
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          ml: product.ml,
          amount: product.price * product.quantity,
        })),
        totalAmount,
        timestamp: new Date(), // Server timestamp to track when it was created
      };

      // Save the invoice to Firestore
      const docRef = await addDoc(collection(db, "invoice"), invoiceData);

      // Dispatch to Redux (optional, for local state management)
      dispatch(addInvoice({ id: docRef.id, ...invoiceData }));

      // Show success toast and navigate to the invoice details page
      toast.success("Invoice saved successfully!");
      navigate(`/invoice/${docRef.id}`);
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error("Failed to save the invoice. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="w-full flex justify-between items-center p-2">
        <h1 className="font-semibold p-2 text-2xl">Create Bill</h1>
        <button
          onClick={() => navigate("/add-product-for-bill")}
          className="text-xl bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600"
        >
          Add Products
        </button>
      </div>

      <div className="mt-6 mb-4">
        <label className="block text-lg font-semibold">Vendor Name:</label>
        <input
          type="text"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          className="w-full p-2 border border-gray-400 text-black rounded-md"
          placeholder="Enter Vendor Name"
        />
      </div>

      {bill.length > 0 ? (
        <div className="mt-6 overflow-auto">
          <table className="min-w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-600">
                <th className="border border-gray-400 p-2">S.No</th>
                <th className="border border-gray-400 p-2">Quantity</th>
                <th className="border border-gray-400 p-2">Name</th>
                <th className="border border-gray-400 p-2">Price</th>
                <th className="border border-gray-400 p-2">ML</th>
                <th className="border border-gray-400 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bill.map((product, index) => (
                <tr key={product.id} className="text-center">
                  <td className="border border-gray-400 p-2">{index + 1}</td>
                  <td className="border border-gray-400 p-2">
                    {product.quantity}
                  </td>
                  <td className="border border-gray-400 p-2">{product.name}</td>
                  <td className="border border-gray-400 p-2">
                    {product.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-400 p-2">{product.ml}</td>
                  <td className="border border-gray-400 p-2">
                    {(product.price * product.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-6 text-lg text-gray-600">No products added yet.</p>
      )}

      <div className="mt-4 text-right">
        <p className="font-semibold text-lg">
          Total Amount:{" "}
          <span className="text-green-500">{totalAmount.toFixed(2)}</span>
        </p>
      </div>

      <div className="fixed bottom-6 right-6">
        <button
          onClick={saveBill}
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Save Bill
        </button>
      </div>
    </div>
  );
};

export default CreateBill;
