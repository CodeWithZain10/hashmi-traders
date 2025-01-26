import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  setProducts,
  setLoading,
} from "../redux/features/products/productsSlice";
import { addProductToBill } from "../redux/features/bill/billSlice";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";

const AddProductsForBill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State from Redux
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const billProducts = useSelector((state) => state.bill.products);

  // Local state for product input details
  const [productDetails, setProductDetails] = useState({});

  // Fetch products from Firebase
  const fetchProducts = async () => {
    const db = getFirestore();
    dispatch(setLoading(true));
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const fetchedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setProducts(fetchedProducts));
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input changes for product details (price, quantity, ml)
  const handleInputChange = (id, field, value) => {
    setProductDetails((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // Add product to the bill
  const handleAddProduct = (product) => {
    const details = productDetails[product.id] || {};
    const newProduct = {
      ...product,
      price: parseFloat(details.price) || 0,
      quantity: parseInt(details.quantity, 10) || 0,
      ml: parseInt(details.ml, 10) || 0,
      amount:
        (parseFloat(details.price) || 0) *
        (parseInt(details.quantity, 10) || 0),
    };
    dispatch(addProductToBill(newProduct));
  };

  // Save and navigate to Create Bill page
  const handleSaveBill = () => {
    navigate("/create-bill");
  };

  if (loading) return <Spinner />;

  return (
    <div className="relative min-h-screen">
      <div className="p-4 sm:p-6">
        <SearchBar />
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 mt-6 sm:mt-10">
          {products.map((product) => {
            const details = productDetails[product.id] || {}; // Get current details for this product
            return (
              <div
                key={product.id}
                className="bg-gray-700 w-full sm:w-[350px] rounded-lg p-4"
              >
                <h1 className="text-lg font-semibold text-white">
                  {product.name}
                </h1>
                <div className="flex justify-between items-center mb-2">
                  <label className="mr-2 text-white">Price:</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={details.price || ""}
                    className="w-[100px] p-1 rounded outline-none text-black"
                    onChange={(e) =>
                      handleInputChange(product.id, "price", e.target.value)
                    }
                  />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <label className="mr-2 text-white">Quantity:</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={details.quantity || ""}
                    className="w-[100px] p-1 rounded outline-none text-black"
                    onChange={(e) =>
                      handleInputChange(product.id, "quantity", e.target.value)
                    }
                  />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <label className="mr-2 text-white">ML:</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={details.ml || ""}
                    className="w-[100px] p-1 rounded outline-none text-black"
                    onChange={(e) =>
                      handleInputChange(product.id, "ml", e.target.value)
                    }
                  />
                </div>
                <button
                  onClick={() => handleAddProduct(product)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add to Bill
                </button>
              </div>
            );
          })}
        </div>
        <button
          onClick={handleSaveBill}
          className="fixed bottom-4 right-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddProductsForBill;
