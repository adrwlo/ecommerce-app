import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CompleteOrder = () => {
  return (
    <>
      <Navbar />
      {/* Start All Title Box */}
      <div className="all-title-box" style={{ marginTop: "5px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Zamówienie</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Strona główna</a>
                </li>
                <li className="breadcrumb-item active">Złożone zamówienie</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End All Title Box */}
      <div
        className="container p-5 d-flex justify-content-center align-items-center"
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        <span class="d-block text-center fs-5 fs-sm-4">
          Gratulacje! Złożono pomyślnie zamówienie.{" "}
          <a href="/">Powrót do sklepu</a>
        </span>
      </div>
      <Footer />
    </>
  );
};

export default CompleteOrder;
