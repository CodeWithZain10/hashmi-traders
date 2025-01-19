import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setCurrentProduct,
  updateProduct,
} from "../redux/features/products/productsSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentProduct = useSelector((state) => state.products.currentProduct);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch(
      setCurrentProduct({
        ...currentProduct,
        [e.target.name]: e.target.value,
      })
    );
  };  

  const handleUpdate = async () => {
    try {
      const productRef = doc(db, "products", currentProduct.id);
      await updateDoc(productRef, {
        name: currentProduct.name,
        retailPrice: currentProduct.retailPrice,
        wholesalePrice: currentProduct.wholesalePrice,
        purchasePrice: currentProduct.purchasePrice,
        quantity: currentProduct.quantity,
        variants: currentProduct.variants,
        weight: currentProduct.weight,
      });
      console.log("Product updated successfully");
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
          dispatch(
            setCurrentProduct({
              id: productSnapshot.id,
              ...productSnapshot.data(),
            })
          );
        } else {
          console.log("No product found!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, dispatch]);

  return (
    <>
      <div className="px-6 py-4 bg-gray-800 text-black rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="font-bold text-3xl text-white mb-6">Add Product</h1>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <label className="text-white w-1/4">Product Name:</label>
            <input
              name="name"
              value={currentProduct.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter Product Name"
              className="w-3/4 p-2 rounded-lg border border-gray-300 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-white w-1/4">Retail Price:</label>
            <input
              name="retailPrice"
              value={currentProduct.retailPrice}
              onChange={handleChange}
              type="number"
              placeholder="Enter Retail Price"
              className="w-3/4 p-2 rounded-lg border border-gray-300 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-white w-1/4">Wholesale Price:</label>
            <input
              name="wholesalePrice"
              value={currentProduct.wholesalePrice}
              onChange={handleChange}
              type="number"
              placeholder="Enter Wholesale Price"
              className="w-3/4 p-2 rounded-lg border border-gray-300 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-white w-1/4">Purchase Price:</label>
            <input
              name="purchasePrice"
              value={currentProduct.purchasePrice}
              onChange={handleChange}
              type="number"
              placeholder="Enter Purchase Price"
              className="w-3/4 p-2 rounded-lg border border-gray-300 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-white w-1/4">Quantity:</label>
            <input
              name="quantity"
              value={currentProduct.quantity}
              onChange={handleChange}
              type="number"
              placeholder="Enter Quantity"
              className="w-3/4 p-2 rounded-lg border border-gray-300 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-white w-1/4">Variants:</label>
            <input
              name="variants"
              value={currentProduct.variants}
              onChange={handleChange}
              type="text"
              placeholder="Enter Variants (comma-separated)"
              className="w-3/4 p-2 rounded-lg border border-gray-300 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-white w-1/4">Weight/Volume:</label>
            <input
              name="weight"
              value={currentProduct.weight}
              onChange={handleChange}
              type="text"
              placeholder="Enter Weight or Volume (e.g., 500ml, 200gm)"
              className="w-3/4 p-2 rounded-lg border border-gray-300 outline-none"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
      );
    </>
  );
};

export default EditProduct;
