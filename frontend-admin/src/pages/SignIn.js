import React, { useState } from "react";
import e_logo from "../assets/e_logo.png";

const SignIn = () => {
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
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `email=${email}&password=${password}`,
        }
      );
      const data = await response.json();
      if (data.status === "ok") {
        localStorage.setItem("emailAdmin", data.email);
        localStorage.setItem("tokenAdmin", data.token);
        localStorage.setItem("loggedInAdmin", true);
        // redirect to the main page
        window.location.href = "/strona-glowna";
      } else {
        setInValidDetails(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container pt-5">
      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div
                  className="col-lg-6 d-none d-lg-block"
                  style={{ background: "#4e73df", position: "relative" }}
                >
                  <img
                    src={e_logo}
                    alt="logo"
                    style={{
                      width: "150px",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Witamy w panelu administratora!
                      </h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Wprowadź adres e-mail..."
                          value={email}
                          onChange={changeEmailHandler}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Wprowadź hasło..."
                          value={password}
                          onChange={changePasswordHandler}
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Zapamiętaj mnie
                          </label>
                        </div>
                      </div>
                      {inValidDetails ? (
                        <p class="text-center text-danger small">
                          Nieprawidłowe dane
                        </p>
                      ) : (
                        ""
                      )}
                      <button
                        className="btn btn-primary btn-user btn-block"
                        onClick={handleSubmit}
                      >
                        Zaloguj się
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
