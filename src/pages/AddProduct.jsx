import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/features/products/productsSlice";
import { db } from "../firebase/firebase";
import { collection, addDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    retailPrice: "",
    wholesalePrice: "",
    purchasePrice: "",
    quantity: "",
    variants: "",
    weight: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProductToFirebase = async (product) => {
    try {
      const productCollectionRef = collection(db, "products");
      const docRef = await addDoc(productCollectionRef, product);
      console.log("Document written with id", docRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (!product.name || !product.retailPrice) {
      alert("fill the field");
      return;
    }

    dispatch(addProduct({ id: Date.now(), ...product }));
    addProductToFirebase(product);
    setProduct({
      name: "",
      retailPrice: "",
      wholesalePrice: "",
      purchasePrice: "",
      quantity: "",
      variants: "",
      weight: "",
    });
    navigate("/products");
    toast.success("Product Added successfully");
  };

  return (
    <div className="px-4 py-4 bg-gray-800 text-black rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="font-bold text-3xl text-white mb-6">Add Product</h1>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="text-white w-full sm:w-1/4">Product Name:</label>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            type="text"
            placeholder="Enter Product Name"
            className="w-full sm:w-3/4 p-2 rounded-lg border border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="text-white w-full sm:w-1/4">Retail Price:</label>
          <input
            name="retailPrice"
            value={product.retailPrice}
            onChange={handleChange}
            type="number"
            placeholder="Enter Retail Price"
            className="w-full sm:w-3/4 p-2 rounded-lg border border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="text-white w-full sm:w-1/4">Wholesale Price:</label>
          <input
            name="wholesalePrice"
            value={product.wholesalePrice}
            onChange={handleChange}
            type="number"
            placeholder="Enter Wholesale Price"
            className="w-full sm:w-3/4 p-2 rounded-lg border border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="text-white w-full sm:w-1/4">Purchase Price:</label>
          <input
            name="purchasePrice"
            value={product.purchasePrice}
            onChange={handleChange}
            type="number"
            placeholder="Enter Purchase Price"
            className="w-full sm:w-3/4 p-2 rounded-lg border border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="text-white w-full sm:w-1/4">Quantity:</label>
          <input
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            type="number"
            placeholder="Enter Quantity"
            className="w-full sm:w-3/4 p-2 rounded-lg border border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="text-white w-full sm:w-1/4">Variants:</label>
          <input
            name="variants"
            value={product.variants}
            onChange={handleChange}
            type="text"
            placeholder="Enter Variants (comma-separated)"
            className="w-full sm:w-3/4 p-2 rounded-lg border border-gray-300 outline-none"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="text-white w-full sm:w-1/4">Weight/Volume:</label>
          <input
            name="weight"
            value={product.weight}
            onChange={handleChange}
            type="text"
            placeholder="Enter Weight or Volume (e.g., 500ml, 200gm)"
            className="w-full sm:w-3/4 p-2 rounded-lg border border-gray-300 outline-none"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
