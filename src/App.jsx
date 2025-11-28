import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import MakeSale from "./pages/MakeSale"
import Transactions from "./pages/Transaction";
import Settings from "./pages/Settings";
import Cart from "./pages/Cart";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import Login from "./pages/Login";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path='/manage' element={<AuthenticatedLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path='users' element={<Users />} />
          <Route path="makeSale" element={<MakeSale />} />
          <Route path='cart' element={<Cart />} />
          <Route path='transactions' element={<Transactions />} />
          <Route path='settings' element={<Settings />} />
        </Route>




      </Routes>
    </BrowserRouter>
  );
}

export default App;
