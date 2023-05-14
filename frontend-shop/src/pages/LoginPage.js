import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inValidDetails, setInValidDetails] = useState(false);

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const changePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${email}&password=${password}`,
      });
      const data = await response.json();
      if (data.status === "ok") {
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedIn", true);
        // redirect to the main page
        window.location.href = "/";
      } else {
        setInValidDetails(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      {/* Start All Title Box */}
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Logowanie</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Strona główna</a>
                </li>
                <li className="breadcrumb-item active">Logowanie</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End All Title Box */}

      {/* Start Login form  */}
      <div className="contact-box-main">
        <div className="container">
          <div className="contact-form-right">
            <h2>LOGOWANIE</h2>
            <form className="client">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={changeEmailHandler}
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
                  value={password}
                  onChange={changePasswordHandler}
                  required
                />
                {inValidDetails ? (
                  <p class="text-center text-danger small">
                    Niepoprawne dane logowania
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="pb-2">
                <span>
                  Nie masz konta?<a href="/rejestracja"> Zarejstruj się!</a>
                </span>
              </div>
              <button
                type="submit"
                className="btn hvr-hover"
                onClick={handleSubmit}
              >
                Zaloguj się
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* End login form */}
      <Footer />
    </>
  );
};

export default LoginPage;
