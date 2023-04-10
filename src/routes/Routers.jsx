import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddProducts from "../Admin/AddProducts";
import AllProducts from "../Admin/AllProducts";
import Dashboard from "../Admin/Dashboard";
import User from "../Admin/User";
import Error from "../components/Ui/Error";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PlaceOrder from "../pages/PlaceOrder";
import ProductDetails from "../pages/ProductDetails";
import Shop from "../pages/Shop";
import Signup from "../pages/Signup";
import ProtectedRoutes from "./ProtectedRoutes";

const Routers = () => {
  return (
    <Routes>
      {/* General Route settings */}
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="/shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="placeOrder" element={<PlaceOrder />} />
      {/* <Route
        path="/checkout"
        element={
          <ProtectedRoutes>
          <Checkout />
          </ProtectedRoutes>
        }
      /> */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      {/* only match this when no other routes match */}
      <Route path="*" element={<Error />} />

      {/* Private route setup for admin dashboard */}
      <Route path="/*" element={<ProtectedRoutes />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/all-products" element={<AllProducts />} />
        <Route path="dashboard/users" element={<User />} />
        <Route path="dashboard/add-product" element={<AddProducts />} />
      </Route>
    </Routes>
  );
};

export default Routers;
