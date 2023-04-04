import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Product from "../pages/Product";
import Site from "../pages/Site";
import Thanks from "../pages/Thanks";

export default function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="" element={<Site />}>
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thanks" element={<Thanks />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
