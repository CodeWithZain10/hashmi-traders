import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setLoading,
  removeProduct,
} from "../redux/features/products/productsSlice";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { selectSearch } from "../redux/features/search/searchSlice";

const ProductList = () => {
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const searchQuery = useSelector(selectSearch);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const productCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productCollection);
      const productList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setProducts(productList));
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Failed to fetch products:", error);
      dispatch(setLoading(false)); // Handle errors and stop loading
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);

      dispatch(removeProduct(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const filteredItems = searchQuery
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  if (loading) return <Spinner />; // Show the loading spinner when loading is true

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length > 0 ? (
        filteredItems.map((product) => (
          <div
            className="bg-gray-700 p-4 rounded-lg shadow-md"
            key={product.id}
          >
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-2xl font-semibold text-white">
                {product.name}
              </h1>
              <h3 className="text-white font-semibold text-md">
                Quantity: {product.quantity}
              </h3>
            </div>
            <div className="flex justify-between text-white">
              <p className="font-semibold text-sm">
                Retail: {product.retailPrice}
              </p>
              <p className="font-semibold text-sm">
                Wholesale: {product.wholesalePrice}
              </p>
              <p className="font-semibold text-sm">
                Purchase: {product.purchasePrice}
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => handleEdit(product.id)}
                className="bg-blue-500 px-3 py-1 text-sm rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 px-3 py-1 text-sm rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
