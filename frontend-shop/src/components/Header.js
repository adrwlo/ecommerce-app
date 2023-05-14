import React from "react";
import header_img from "../assets/header_img.jpg";

const Header = () => {
  return (
    <>
      <header>
        {/* Background image */}
        <div
          className="p-5 text-center bg-image"
          style={{
            backgroundImage: `url(${header_img})`,
            height: 400,
            backgroundSize: "cover",
          }}
        >
          <div className="mask">
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <h1 className="mb-3 text-light pt-5">
                  Witaj w naszym sklepie elektronicznym!
                </h1>
                <a
                  className="btn btn-outline-light btn-lg"
                  href="#!"
                  role="button"
                >
                  Sprawdź
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Background image */}
      </header>
    </>
  );
};

export default Header;
