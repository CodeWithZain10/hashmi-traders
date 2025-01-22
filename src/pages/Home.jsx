import React from "react";
import Products from "./Products";
import SalesCard from "../components/SalesCard";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <>
      <div className="px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <SalesCard />
          <SalesCard />
          <SalesCard />
        </div>
        <ProductList />
      </div>
    </>
  );
};

export default Home;
