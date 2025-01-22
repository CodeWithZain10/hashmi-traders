import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import { RouterProvider } from "react-router";
import Products from "./pages/Products";
import CreateBill from "./pages/CreateBill";
import Invoice from "./pages/Invoice";
import Sales from "./pages/Sales";
import Error404 from "./pages/Error404";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AddProductsForBill from "./pages/AddProductsForBill";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/create-bill" element={<CreateBill />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-product-for-bill/" element={<AddProductsForBill />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
