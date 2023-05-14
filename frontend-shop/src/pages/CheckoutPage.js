import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CheckoutPage = () => {
  const [clients, setClients] = useState([]);
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [order, setOrder] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: {
      street: "",
      province: "",
      postalCode: "",
    },
    products: [],
    deliveryMethod: "Standardowa przesyłka",
    deliveryCost: 0,
    isPackagePaid: false,
    quantity: 0,
    total: 0,
    totalAfterDelivery: 0,
    discountAmount: 0,
  });

  const [isValidation, setValidation] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    // Fetch clients data
    fetch(`${process.env.REACT_APP_API_URL}/clients`)
      .then((response) => response.json())
      .then((data) => {
        const filteredClients = data.filter((client) => client.email === email);
        setClients(filteredClients);
        setOrder((prevOrder) => ({
          ...prevOrder,
          firstName: filteredClients[0]?.name,
          lastName: filteredClients[0]?.surname,
          email: filteredClients[0]?.email,
          phoneNumber: filteredClients[0]?.number,
        }));
      })
      .catch((error) => console.error(error));

    // Retrieve order data from local storage
    const orderData = JSON.parse(localStorage.getItem("cart"));
    if (orderData) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        products: orderData.products,
        quantity: orderData.quantity,
        total: orderData.total,
        discountAmount: orderData.discountAmount,
        totalAfterDelivery: orderData.total,
      }));
    }
  }, []);

  const handlePaymentOptionChange = (e) => {
    if (e.target.id === "onlinePayment") {
      setIsOnlinePayment(true);
      setOrder({ ...order, isPackagePaid: true });
    } else {
      setIsOnlinePayment(false);
      setOrder({ ...order, isPackagePaid: false });
    }
  };

  const handleDeliveryOptionChange = (e) => {
    if (e.target.id === "freeOption") {
      setOrder({
        ...order,
        deliveryMethod: "Standardowa przesyłka",
        deliveryCost: 0,
        totalAfterDelivery: order.total,
      });
    } else if (e.target.id === "expressOption") {
      setOrder({
        ...order,
        deliveryMethod: "Ekspresowa dostawa",
        deliveryCost: 19.99,
        totalAfterDelivery: order.total + 19.99,
      });
    } else if (e.target.id === "onSecondDayOption") {
      setOrder({
        ...order,
        deliveryMethod: "Na drugi dzień",
        deliveryCost: 39.99,
        totalAfterDelivery: order.total + 39.99,
      });
    }
  };

  const handleStreetChange = (e) => {
    setOrder({
      ...order,
      address: {
        ...order.address,
        street: e.target.value,
      },
    });
  };

  const handleProvinceChange = (e) => {
    setOrder({
      ...order,
      address: {
        ...order.address,
        province: e.target.value,
      },
    });
  };

  const handlePostalCodeChange = (e) => {
    setOrder({
      ...order,
      address: {
        ...order.address,
        postalCode: e.target.value,
      },
    });
  };

  const submitYourOrder = () => {
    if (
      order.firstName.trim() === "" ||
      order.lastName.trim() === "" ||
      order.phoneNumber.trim() === "" ||
      order.email.trim() === "" ||
      order.address.street.trim() === "" ||
      order.address.province.trim() === "" ||
      order.address.postalCode.trim() === "" ||
      order.products.length === 0 ||
      order.deliveryMethod.trim() === ""
    ) {
      setValidation(true);
    } else {
      setValidation(false);
      fetch(`${process.env.REACT_APP_API_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order }),
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = "/zamowienie-potwierdzenie";
          } else {
            throw new Error("Error sending order");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      localStorage.removeItem("cart");
    }
  };

  const provinces = [
    "dolnośląskie",
    "kujawsko-pomorskie",
    "lubelskie",
    "lubuskie",
    "łódzkie",
    "małopolskie",
    "mazowieckie",
    "opolskie",
    "podkarpackie",
    "podlaskie",
    "pomorskie",
    "śląskie",
    "świętokrzyskie",
    "warmińsko-mazurskie",
    "wielkopolskie",
    "zachodniopomorskie",
  ];

  return (
    <>
      <Navbar />
      <div>
        {/* Start All Title Box */}
        <div className="all-title-box">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Kasa</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Sklep</a>
                  </li>
                  <li className="breadcrumb-item active">Kasa</li>
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
              <div className="col-sm-6 col-lg-6 mb-3">
                <div className="checkout-address">
                  <div className="title-left">
                    <h3>Dane do wysyłki</h3>
                  </div>
                  <form className="needs-validation" noValidate>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">Imie *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder
                          defaultValue
                          required
                          readonly="readonly"
                          value={order.firstName}
                        />
                        <div className="invalid-feedback">
                          {" "}
                          Valid first name is required.{" "}
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">Nazwisko *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="surname"
                          placeholder
                          defaultValue
                          required
                          readonly="readonly"
                          value={clients.length > 0 ? clients[0].surname : ""}
                        />
                        <div className="invalid-feedback">
                          {" "}
                          Valid last name is required.{" "}
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email">Email*</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder
                        readonly="readonly"
                        value={clients.length > 0 ? clients[0].email : ""}
                      />
                      <div className="invalid-feedback">
                        {" "}
                        Please enter a valid email address for shipping updates.{" "}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phoneNumber">Telefon</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder
                        readonly="readonly"
                        value={clients.length > 0 ? clients[0].number : ""}
                      />
                      <div className="invalid-feedback">
                        {" "}
                        Please enter a valid email address for shipping updates.{" "}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address">Ulica *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder
                        required
                        value={order.address.street}
                        onChange={handleStreetChange}
                      />
                      <div className="invalid-feedback">
                        {" "}
                        Please enter your shipping address.{" "}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="state">Województwo *</label>
                        <select
                          className="wide w-100"
                          id="state"
                          value={order.address.province}
                          onChange={handleProvinceChange}
                        >
                          <option data-display="Wybierz...">Wybierz...</option>
                          {provinces.map((province) => (
                            <option key={province} value={province}>
                              {province}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          {" "}
                          Please provide a valid state.{" "}
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="zip">Kod pocztowy *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          placeholder
                          required
                          value={order.address.postalCode}
                          onChange={handlePostalCodeChange}
                        />
                        <div className="invalid-feedback">
                          {" "}
                          Zip code required.{" "}
                        </div>
                      </div>
                    </div>

                    <div className="title">
                      {" "}
                      <span>Płatność</span>{" "}
                    </div>
                    <div className="d-block my-3">
                      <div className="custom-control custom-radio">
                        <input
                          id="cashOnDelivery"
                          name="paymentMethod"
                          type="radio"
                          className="custom-control-input"
                          defaultChecked
                          required
                          onChange={handlePaymentOptionChange}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="cashOnDelivery"
                        >
                          Płatność za pobraniem
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          id="onlinePayment"
                          name="paymentMethod"
                          type="radio"
                          className="custom-control-input"
                          required
                          onChange={handlePaymentOptionChange}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="onlinePayment"
                        >
                          Płatność online
                        </label>
                      </div>
                      <strong>
                        Wybrana metoda płatności:{" "}
                        {isOnlinePayment
                          ? "płatność online"
                          : "płatność za pobraniem"}
                      </strong>
                    </div>

                    <div>
                      {isOnlinePayment ? (
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label htmlFor="cc-name">Name on card</label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-name"
                              placeholder
                              required
                            />
                            <small className="text-muted">
                              Full name as displayed on card
                            </small>
                            <div className="invalid-feedback">
                              {" "}
                              Name on card is required{" "}
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="cc-number">
                              Credit card number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-number"
                              placeholder
                              required
                            />
                            <div className="invalid-feedback">
                              {" "}
                              Credit card number is required{" "}
                            </div>
                          </div>
                          <div className="col-md-3 mb-3">
                            <label htmlFor="cc-expiration">Expiration</label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-expiration"
                              placeholder
                              required
                            />
                            <div className="invalid-feedback">
                              {" "}
                              Expiration date required{" "}
                            </div>
                          </div>
                          <div className="col-md-3 mb-3">
                            <label htmlFor="cc-expiration">CVV</label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-cvv"
                              placeholder
                              required
                            />
                            <div className="invalid-feedback">
                              {" "}
                              Security code required{" "}
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="payment-icon">
                              <ul>
                                <li>
                                  <img
                                    className="img-fluid"
                                    src="images/payment-icon/1.png"
                                    alt
                                  />
                                </li>
                                <li>
                                  <img
                                    className="img-fluid"
                                    src="images/payment-icon/2.png"
                                    alt
                                  />
                                </li>
                                <li>
                                  <img
                                    className="img-fluid"
                                    src="images/payment-icon/3.png"
                                    alt
                                  />
                                </li>
                                <li>
                                  <img
                                    className="img-fluid"
                                    src="images/payment-icon/5.png"
                                    alt
                                  />
                                </li>
                                <li>
                                  <img
                                    className="img-fluid"
                                    src="images/payment-icon/7.png"
                                    alt
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <hr className="mb-1" />
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-sm-6 col-lg-6 mb-3">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="shipping-method-box">
                      <div className="title-left">
                        <h3>Sposób dostawy</h3>
                      </div>
                      <div className="mb-4">
                        <div className="custom-control custom-radio">
                          <input
                            id="freeOption"
                            name="shipping-option"
                            className="custom-control-input"
                            defaultChecked
                            type="radio"
                            onChange={handleDeliveryOptionChange}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="freeOption"
                          >
                            Standardowa przesyłka
                          </label>{" "}
                          <span className="float-right font-weight-bold">
                            Za darmo
                          </span>{" "}
                        </div>
                        <div className="ml-4 mb-2 small">(3-7 dni)</div>
                        <div className="custom-control custom-radio">
                          <input
                            id="expressOption"
                            name="shipping-option"
                            className="custom-control-input"
                            type="radio"
                            onChange={handleDeliveryOptionChange}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="expressOption"
                          >
                            Ekspresowa dostawa
                          </label>{" "}
                          <span className="float-right font-weight-bold">
                            19.99 zł
                          </span>{" "}
                        </div>
                        <div className="ml-4 mb-2 small">(2-4 dni)</div>
                        <div className="custom-control custom-radio">
                          <input
                            id="onSecondDayOption"
                            name="shipping-option"
                            className="custom-control-input"
                            type="radio"
                            onChange={handleDeliveryOptionChange}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="onSecondDayOption"
                          >
                            Na drugi dzień
                          </label>{" "}
                          <span className="float-right font-weight-bold">
                            39.99 zł
                          </span>{" "}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-12">
                    <div className="order-box">
                      <div className="title-left">
                        <h3>Twoje zamówienie</h3>
                      </div>
                      <div className="d-flex">
                        <h4>Suma częściowa</h4>
                        <div className="ml-auto font-weight-bold">
                          {order.total} zł
                        </div>
                      </div>
                      <hr className="my-1" />
                      <div className="d-flex">
                        <h4>Zniżka</h4>
                        <div className="ml-auto font-weight-bold">
                          {order.discountAmount} zł
                        </div>
                      </div>
                      <hr className="my-1" />
                      <div className="d-flex">
                        <h4>Koszt dostawy</h4>
                        <div className="ml-auto font-weight-bold">
                          {order.deliveryCost} zł
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex gr-total">
                        <h5>Suma</h5>
                        <div className="ml-auto h5">
                          {order.totalAfterDelivery} zł
                        </div>
                      </div>
                      <hr />{" "}
                    </div>
                  </div>
                  {isValidation ? (
                    <p className="text-danger">Uzupełnij wszystkie pola!</p>
                  ) : (
                    ""
                  )}
                  <div className="col-12 d-flex shopping-box">
                    <button
                      type="button"
                      className="ml-auto btn hvr-hover"
                      onClick={submitYourOrder}
                    >
                      Złóż zamówienie
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Cart */}
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
