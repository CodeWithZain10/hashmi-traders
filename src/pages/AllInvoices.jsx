import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInvoices } from "../redux/features/invoice/invoiceSlice";

const AllInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allInvoices = useSelector((state) => state.invoice.invoices);
  console.log("Redux Invoices:", allInvoices);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "invoice"));

        const invoicesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setInvoices(invoicesData); // Update local state
        dispatch(setInvoices(invoicesData)); // Update Redux state
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, [dispatch]); // Add dispatch as a dependency

  // Function to delete an invoice
  const handleDelete = async (id) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "invoice", id)); // Delete from Firestore
      const updatedInvoices = invoices.filter((invoice) => invoice.id !== id); // Update local state
      setInvoices(updatedInvoices);
      dispatch(setInvoices(updatedInvoices)); // Update Redux state
      console.log(`Invoice with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Invoices</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="p-4 border rounded-lg shadow-md bg-gray-700 text-white"
            >
              <h2 className="font-semibold">Vendor: {invoice.vendorName}</h2>
              {invoice.timestamp ? (
                <p>
                  Date: {new Date(invoice.timestamp.toDate()).toLocaleString()}
                </p>
              ) : (
                <p>Date: Not Available</p>
              )}
              <p>Total: PKR {invoice.totalAmount?.toFixed(2) || "0.00"}</p>
              <button
                onClick={() => navigate(`/invoice/${invoice.id}`)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                View Details
              </button>
              <button
                onClick={() => handleDelete(invoice.id)}
                className="mt-4 bg-red-600 text-white px-8 py-2 ml-4 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-white">No invoices found.</p>
        )}
      </div>
    </div>
  );
};

export default AllInvoices;
