import React from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";

const Products = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between p-2 ">
        <SearchBar /> 
        <button
          onClick={() => navigate("/add-product")}
          className="text-xl bg-orange-500 p-2 rounded-lg mr-4"
        >
          Add Products
        </button>
      </div>
      <div className="p-4">
        <ProductList />
      </div>
    </>
  );
};

export default Products;
