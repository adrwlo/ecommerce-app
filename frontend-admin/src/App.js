import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "../src/App.css";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Items from "./pages/Items";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

function App() {
  const isLoggedInAdmin = window.localStorage.getItem("loggedInAdmin");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={isLoggedInAdmin ? <Dashboard /> : <SignIn />}
          />
          <Route path="/logowanie" exact element={<SignIn />} />
          <Route
            path="/strona-glowna"
            exact
            element={isLoggedInAdmin ? <Dashboard /> : <SignIn />}
          />
          <Route
            path="/produkty"
            exact
            element={isLoggedInAdmin ? <Items /> : <SignIn />}
          />
          <Route
            path="/dodaj-produkt"
            exact
            element={isLoggedInAdmin ? <AddItem /> : <SignIn />}
          />
          <Route
            path="/edytuj-produkt"
            exact
            element={isLoggedInAdmin ? <EditItem /> : <SignIn />}
          />
          <Route
            path="/zamowienia"
            exact
            element={isLoggedInAdmin ? <Orders /> : <SignIn />}
          />
          <Route
            path="/uzytkownicy"
            exact
            element={isLoggedInAdmin ? <Users /> : <SignIn />}
          />
          <Route
            path="/ustawienia"
            exact
            element={isLoggedInAdmin ? <Settings /> : <SignIn />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
