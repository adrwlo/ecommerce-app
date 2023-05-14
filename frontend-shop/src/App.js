import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import CompleteOrder from "./pages/CompleteOrder";
import { ItemProvider } from "./ItemContext";

function App() {
  const loggedIn = useState(localStorage.getItem("loggedIn"));
  return (
    <>
      <ItemProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
            <Route path="/logowanie" exact element={<LoginPage />} />
            <Route path="/rejestracja" exact element={<RegisterPage />} />
            <Route path="/produkty" exact element={<ProductsPage />} />
            <Route path="/produkt" exact element={<ProductDetailPage />} />
            <Route path="/kontakt" exact element={<ContactPage />} />
            <Route path="/koszyk" exact element={<CartPage />} />
            <Route
              path="/zamowienie-potwierdzenie"
              exact
              element={<CompleteOrder />}
            />
            {loggedIn ? (
              <Route path="/kasa" element={<CheckoutPage />} />
            ) : (
              <Route path="/*" element={<Navigate to="/logowanie" />} />
            )}
          </Routes>
        </BrowserRouter>
      </ItemProvider>
    </>
  );
}

export default App;
