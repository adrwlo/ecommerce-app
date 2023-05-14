import React, { useContext, useState } from "react";
import ItemContext from "../ItemContext";

const Offer = () => {
  const { items } = useContext(ItemContext);
  const { addToCart } = useContext(ItemContext);

  return (
    <>
      {/* Start Products  */}
      <div className="products-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-all text-center">
                <h1>Nasza oferta</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sit amet lacus enim.
                </p>
              </div>
            </div>
          </div>
          <div className="row special-list pt-4">
            {items.slice(0, 4).map((item) => {
              return (
                <div
                  className="col-lg-3 col-md-6 special-grid best-seller"
                  key={item._id}
                >
                  <div className="products-single fix">
                    <div className="box-img-hover p-2">
                      <div className="type-lb">
                        <p className="sale">Sale</p>
                      </div>
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
      <div className="text-center pb-5">
        <a className="btn_offer" href="/produkty">
          Zobacz więcej!
        </a>
      </div>
      {/* End Products  */}
    </>
  );
};

export default Offer;
