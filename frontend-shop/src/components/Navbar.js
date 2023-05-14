import React, { useContext, useState } from "react";
import ItemContext from "../ItemContext";
import e_logo from "../assets/e_logo.png";

const Navbar = () => {
  const { cart, removeFromCart } = useContext(ItemContext);
  const [loggedIn, setloggedIn] = useState(localStorage.getItem("loggedIn"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <header className="main-header fixed-menu">
        {/* Start Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav">
          <div className="container">
            {/* Start Header Navigation */}
            <div className="navbar-header">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar-menu"
                aria-controls="navbars-rs-food"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fa fa-bars" />
              </button>
              <a className="navbar-brand" href="/">
                <img
                  src={e_logo}
                  className="logo"
                  alt=""
                  style={{ width: "100px", height: "auto" }}
                />
              </a>
            </div>
            {/* End Header Navigation */}
            {/* Collect the nav links, forms, and other content for toggling */}
            <div className="collapse navbar-collapse" id="navbar-menu">
              <ul
                className="nav navbar-nav ml-auto"
                data-in="fadeInDown"
                data-out="fadeOutUp"
              >
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Strona główna
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Oferta
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/produkty">
                    Produkty
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/kontakt">
                    Kontakt
                  </a>
                </li>
                {loggedIn ? (
                  <li className="dropdown">
                    {}
                    <a
                      href="#"
                      className="nav-link dropdown-toggle arrow"
                      data-toggle="dropdown"
                    >
                      Moje konto
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="#">{email}</a>
                      </li>
                      <li>
                        <a href="#" onClick={logout}>
                          Wyloguj się
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle arrow"
                      data-toggle="dropdown"
                    >
                      Konto
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="/logowanie">Zaloguj się</a>
                      </li>
                      <li>
                        <a href="/rejestracja">Zarejestruj się</a>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
            {/* /.navbar-collapse */}
            {/* Start Atribute Navigation */}
            <div className="attr-nav">
              <ul>
                <li className="side-menu">
                  <a href="#" onClick={toggleSideMenu}>
                    <i className="fa fa-shopping-bag" />
                    <span className="badge">{cart.quantity}</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* End Atribute Navigation */}
          </div>
          {/* Start Side Menu */}
          <div className={isSideMenuOpen ? "side on" : "side"}>
            <a href="#" className="close-side" onClick={closeSideMenu}>
              <i className="fa fa-times" />
            </a>
            <li className="cart-box">
              <ul className="cart-list">
                {cart.products.map((product, index) => (
                  <li className="d-flex justify-space-around align-items-center" key={index}>
                    <a href="#" className="photo">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/convertUploads/${product.image}`}
                        className="cart-thumb"
                        alt={product.name}
                      />
                    </a>
                    <div className="pr-5">
                      <h6>
                        <a href="#">{product.name}</a>
                      </h6>
                      <p>
                        {product.quantity}x -{" "}
                        <span className="price">{product.price} zł</span>
                      </p>
                    </div>
                    <a href="#" onClick={() => removeFromCart(product._id)}>
                      <i className="fas fa-times" />
                    </a>
                  </li>
                ))}

                <li className="total">
                  <a
                    href="/koszyk"
                    className="btn btn-default hvr-hover btn-cart"
                  >
                    KOSZYK
                  </a>
                  <span className="float-right">
                    <strong>Suma</strong>: {cart.total} zł
                  </span>
                </li>
              </ul>
            </li>
          </div>
          {/* End Side Menu */}
        </nav>
        {/* End Navigation */}
      </header>
    </>
  );
};

export default Navbar;
