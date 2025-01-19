import React from "react";
import Products from "./Products";
import SalesCard from "../components/SalesCard";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <>
      <div className="px-4">
        <div className="flex justify-evenly mb-4">
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
