import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { addProductToBill } from "../redux/features/bill/billSlice";

const AddProductsForBill = () => {
  const products = useSelector((state) => state.products.products);
  const [productDetails, setProductDetails] = useState({});
  const dispatch = useDispatch();
  const bill = useSelector((state) => state.bill.products);
  console.log(bill);

  console.log(products);

  const handleInputChange = (id, field, value) => {
    setProductDetails((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleAddProduct = (item) => {
    const details = productDetails[item.id] || {};
    const newProduct = {
      ...item,
      price: parseFloat(details.price) || 0,
      quantity: parseInt(details.quantity, 10) || 0,
      ml: parseInt(details.ml, 10) || 0,
    };
    dispatch(addProductToBill(newProduct));
  };

  useEffect(() => {
    console.log("Available products:", products);
  }, [products]);

  return (
    <div className="relative min-h-screen">
      <div className="p-4 sm:p-6">
        <SearchBar />
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 mt-6 sm:mt-10">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-gray-700 w-full sm:w-[350px] rounded-lg p-4"
            >
              <h1 className="text-lg font-semibold text-white">{item.name}</h1>
              <div className="flex justify-between items-center mb-2">
                <label className="mr-2 text-white">Price:</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-[100px] p-1 rounded outline-none text-black"
                  onChange={(e) =>
                    handleInputChange(item.id, "price", e.target.value)
                  }
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <label className="mr-2 text-white">Quantity:</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-[100px] p-1 rounded outline-none text-black"
                  onChange={(e) =>
                    handleInputChange(item.id, "quantity", e.target.value)
                  }
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <label className="mr-2 text-white">ML:</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-[100px] p-1 rounded outline-none text-black"
                  onChange={(e) =>
                    handleInputChange(item.id, "ml", e.target.value)
                  }
                />
              </div>
              <button
                onClick={() => handleAddProduct(item)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProductsForBill;
