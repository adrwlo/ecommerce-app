import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Offer from "../components/Offer";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      {/* Start All Title Box */}
      <div
        className="all-title-box d-flex justify-content-center align-items-center"
        style={{ height: "400px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Witamy w sklepie elektronicznym!</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Strona główna</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End All Title Box */}
      <Offer />
      <Footer />
    </>
  );
};

export default LandingPage;
