import React, { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RegisterPage = () => {
  const [inValidDetails, setInValidDetails] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    number: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data = await response.json();
      setFormValues({
        name: "",
        surname: "",
        email: "",
        password: "",
        number: "",
      });
      NotificationManager.success("Pomyślna rejestracja!", "Success");
      setInValidDetails(false);
      setTimeout(() => {
        window.location.href = "/logowanie";
      }, 1000);
    } catch (error) {
      setInValidDetails(true);
    }
  };
  return (
    <>
      <Navbar />
      <NotificationContainer />
      {/* Start All Title Box */}
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Rejestracja</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Strona główna</a>
                </li>
                <li className="breadcrumb-item active">Rejestracja</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End All Title Box */}
      {/* Start Register form  */}
      <div className="contact-box-main">
        <div className="container">
          <div className="contact-form-right">
            <h2>REJESTRACJA</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Imie</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Nazwisko</label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  name="surname"
                  value={formValues.surname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Hasło</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="number">Numer telefonu</label>
                <input
                  type="tel"
                  className="form-control"
                  id="number"
                  name="number"
                  value={formValues.number}
                  onChange={handleChange}
                  required
                />
              </div>
              {inValidDetails ? (
                <p class="text-center text-danger small">
                  Konto z takim adresem e-mail już istnieje
                </p>
              ) : (
                ""
              )}
              <button type="submit" className="btn hvr-hover">
                Zarejestruj się
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* End Register form */}
      <Footer />
    </>
  );
};

export default RegisterPage;
