import React, { useContext } from "react";
import ItemContext from "../ItemContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductsPage = () => {
  const { items } = useContext(ItemContext);
  const { addToCart } = useContext(ItemContext);

  return (
    <>
      <Navbar />
      {/* Start All Title Box */}
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Produkty</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Strona główna</a>
                </li>
                <li className="breadcrumb-item active">Produkty</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End All Title Box */}
      <div className="product-box p-5">
        <div className="container">
          <div className="row special-list pt-4">
            {items.map((item) => {
              return (
                <div
                  className="col-lg-3 col-md-6 special-grid best-seller"
                  key={item._id}
                >
                  <div className="products-single fix">
                    <div className="box-img-hover p-2">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/convertUploads/${item.image}`}
                        className="img-fluid"
                        alt="Image"
                        style={{ width: "300px", height: "auto" }}
                      />
                      <div className="mask-icon">
                        <a
                          className="cart"
                          href="#"
                          onClick={() => addToCart(item._id)}
                        >
                          Dodaj do koszyka
                        </a>
                      </div>
                    </div>
                    <div className="why-text">
                      <h4>{item.name}</h4>
                      <h5>{item.price} zł</h5>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
