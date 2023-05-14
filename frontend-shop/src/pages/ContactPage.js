import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      {/* Start All Title Box */}
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Strona główna</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Kontakt</a>
                </li>
                <li className="breadcrumb-item active">Kontakt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End All Title Box */}

      {/* Start Contact Us  */}
      <div className="contact-box-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-12">
              <div className="contact-info-left">
                <h2>INFORMACJE KONTAKTOWE</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent urna diam, maximus ut ullamcorper quis, placerat id
                  eros. Duis semper justo sed condimentum rutrum. Nunc tristique
                  purus turpis. Maecenas vulputate.{" "}
                </p>
                <ul>
                  <li>
                    <p>
                      <i className="fas fa-map-marker-alt" />
                      Address: Michael I. Days 3756 <br />
                      Preston Street Wichita,
                      <br /> KS 67213{" "}
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-phone-square" />
                      Phone: <a href="tel:+1-888705770">+1-888 705 770</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-envelope" />
                      Email:{" "}
                      <a href="mailto:contactinfo@gmail.com">
                        electronics_store@gmail.com
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8 col-sm-12">
              <div className="contact-form-right">
                <h2>SKONTAKTUJ SIE Z NAMI</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  odio justo, ultrices ac nisl sed, lobortis porta elit. Fusce
                  in metus ac ex venenatis ultricies at cursus mauris.
                </p>
                <form id="contactForm">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Twoje imie"
                          required
                          data-error="Wprowadź swoje imie"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Twój email"
                          id="email"
                          className="form-control"
                          name="name"
                          required
                          data-error="Wprowadź swój adres e-mail"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          name="name"
                          placeholder="Temat"
                          required
                          data-error="Wprowadź temat"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="message"
                          placeholder="Twoja wiadomość"
                          rows={4}
                          data-error="Napisz swoją wiadomość"
                          required
                          defaultValue={""}
                        />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="submit-button text-center">
                        <button
                          className="btn hvr-hover"
                          id="submit"
                          type="submit"
                        >
                          Wyślij
                        </button>
                        <div id="msgSubmit" className="h3 text-center hidden" />
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Cart */}

      <Footer />
    </>
  );
};

export default ContactPage;
