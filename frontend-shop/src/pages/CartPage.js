import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemContext from "../ItemContext";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const CartPage = () => {
  const {
    cart,
    removeAllFromCart,
    updateQuantityChange,
    addDiscount,
    inValidDetails,
  } = useContext(ItemContext);
  const [couponCode, setCouponCode] = useState("");
  const [loggedIn, setloggedIn] = useState(localStorage.getItem("loggedIn"));

  const changeCouponCodeHandler = (e) => {
    setCouponCode(e.target.value);
  };

  return (
    <>
      <Navbar />
      <NotificationContainer />
      <div>
        {/* Start All Title Box */}
        <div className="all-title-box">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Koszyk</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Sklep</a>
                  </li>
                  <li className="breadcrumb-item active">Koszyk</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* End All Title Box */}
        {/* Start Cart  */}
        <div className="cart-box-main">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="table-main table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Zdjęcie</th>
                        <th>Nazwa</th>
                        <th>Cena</th>
                        <th>Ilość</th>
                        <th>Suma</th>
                        <th>Usuń</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.products.map((product) => (
                        <tr key={product._id}>
                          <td className="thumbnail-img">
                            <a href="#">
                              <img
                                className="img-fluid"
                                src={`${process.env.REACT_APP_API_URL}/convertUploads/${product.image}`}
                                alt
                              />
                            </a>
                          </td>
                          <td className="name-pr">
                            <a href="#">{product.name}</a>
                          </td>
                          <td className="price-pr">
                            <p>{product.price} zł</p>
                          </td>
                          <td className="quantity-box">
                            <input
                              type="number"
                              style={{ width: "100px" }}
                              value={product.quantity}
                              min={1}
                              step={1}
                              max={product.amount}
                              className="c-input-text qty text"
                              onChange={(e) =>
                                updateQuantityChange(
                                  product._id,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                          </td>
                          <td className="total-pr">
                            <p>
                              {parseInt(product.price) *
                                parseInt(product.quantity)}{" "}
                              zł
                            </p>
                          </td>
                          <td className="remove-pr">
                            <a
                              href="#"
                              onClick={() => removeAllFromCart(product._id)}
                            >
                              <i className="fas fa-times" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row my-5">
              <div className="col-lg-6 col-sm-6">
                <div className="coupon-box">
                  <div className="input-group input-group-sm">
                    <input
                      id="couponCode"
                      className="form-control"
                      placeholder="Wprowadź swój kod kuponu"
                      aria-label="Coupon code"
                      type="text"
                      onChange={changeCouponCodeHandler}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-theme"
                        type="button"
                        onClick={() => addDiscount(couponCode)}
                      >
                        Zatwierdź
                      </button>
                    </div>
                  </div>
                </div>
                {inValidDetails ? (
                  <p class="text-center text-danger small pt-2">
                    Niepoprawny kod kuponu
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row my-5">
              <div className="col-lg-8 col-sm-12" />
              <div className="col-lg-4 col-sm-12">
                <div className="order-box">
                  <h3>Podsumowanie zamówienia</h3>
                  <div className="d-flex">
                    <h4>Suma częściowa</h4>
                    <div className="ml-auto font-weight-bold">
                      {cart.total} zł
                    </div>
                  </div>
                  <div className="d-flex">
                    <h4>Zniżka</h4>
                    <div className="ml-auto font-weight-bold">
                      {cart.discountAmount} zł
                    </div>
                  </div>
                  <hr className="my-1" />
                  <div className="d-flex gr-total">
                    <h5>Suma</h5>
                    <div className="ml-auto h5">{cart.total} zł</div>
                  </div>
                </div>
              </div>
              <div className="col-12 pt-4 d-flex shopping-box">
                <a
                  href={loggedIn ? "/kasa" : "/logowanie"}
                  className="ml-auto btn hvr-hover"
                >
                  Do kasy
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
        {/* End Cart */}
        <Footer />
      </div>
    </>
  );
};

export default CartPage;
