import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useDispatch } from "react-redux";
import { addInvoice } from "../redux/features/invoice/invoiceSlice";

const Invoice = () => {
  const { invoiceId } = useParams(); // Assuming the URL contains 'invoiceId'
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, "invoice", invoiceId); // Reference to 'invoice' collection
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setInvoice(docSnap.data());
        } else {
          console.error("No such document!");
          setInvoice(null);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  const downloadPDF = () => {
    const pdf = new jsPDF();

    // Header with "HASHMI TRADERS" on the left and date/time on the right
    pdf.setFontSize(16);
    pdf.text("HASHMI TRADERS", 14, 20); // Left-side header
    pdf.setFontSize(12);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    pdf.text(`Date: ${formattedDate} ${formattedTime}`, 140, 20, {
      align: "right",
    });

    // Vendor and total amount details
    pdf.setFontSize(14);
    pdf.text(`Vendor: ${invoice?.vendorName}`, 14, 40);
    pdf.text(`Total: PKR ${invoice?.totalAmount.toFixed(2)}`, 14, 50);

    // Add a line to separate header and table
    pdf.line(14, 55, 200, 55);

    // Add table for products
    const tableColumnHeaders = [
      "S.No",
      "Quantity",
      "Name",
      "ML",
      "Price",
      "Amount",
    ];
    const tableRows = invoice?.products.map((product, index) => [
      index + 1,
      product.quantity,
      product.name,
      product.ml,
      product.price.toFixed(2),
      product.amount.toFixed(2),
    ]);

    pdf.autoTable({
      head: [tableColumnHeaders],
      body: tableRows,
      startY: 60,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10 },
    });

    // Footer with "Thank You" message
    const finalY = pdf.lastAutoTable.finalY || 60; // Get the position after the table
    pdf.setFontSize(12);
    pdf.text("Thank you for doing business with us!", 14, finalY + 10);
    pdf.text("HASHMI TRADERS", 14, finalY + 20);

    pdf.save("invoice.pdf");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading invoice...</p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Invoice not found.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Invoice Details</h1>
        <div className="mb-4">
          <p className="text-lg">
            <strong>Vendor Name:</strong> {invoice.vendorName}
          </p>
          <p className="text-lg">
            <strong>Total Amount:</strong> PKR {invoice.totalAmount.toFixed(2)}
          </p>
        </div>

        {/* Table for products */}
        <table className="min-w-full border-collapse border border-gray-400 mb-6">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="border border-gray-400 p-2">S.No</th>
              <th className="border border-gray-400 p-2">Quantity</th>
              <th className="border border-gray-400 p-2">Name</th>
              <th className="border border-gray-400 p-2">Price</th>
              <th className="border border-gray-400 p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.products.map((product, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-400 p-2">{index + 1}</td>
                <td className="border border-gray-400 p-2">
                  {product.quantity}
                </td>
                <td className="border border-gray-400 p-2">{product.name}</td>
                <td className="border border-gray-400 p-2">
                  {product.price.toFixed(2)}
                </td>
                <td className="border border-gray-400 p-2">
                  {product.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={downloadPDF}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Invoice;
