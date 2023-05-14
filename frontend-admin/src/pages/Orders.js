import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/order`);
      const data = await response.json();
      setOrders(data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const formatOrderDate = (dateString) => {
    const createdAt = new Date(dateString);
    const year = createdAt.getFullYear();
    const month = String(createdAt.getMonth() + 1).padStart(2, "0");
    const day = String(createdAt.getDate()).padStart(2, "0");
    const hours = String(createdAt.getHours()).padStart(2, "0");
    const minutes = String(createdAt.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <>
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            {/* Page Heading */}
            <h1 className="h3 mb-2 text-gray-800">Zamówienia</h1>
            <p className="mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            {/* DataTales Example */}
            <div className="card shadow mb-4">
              {orders.map((order, index) => (
                <React.Fragment key={order._id}>
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Zamówienie nr. {order._id}
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <p>
                            Imię i nazwisko: {order.firstName} {order.lastName}
                          </p>
                        </div>
                        <div>
                          <p>Numer telefonu: {order.phoneNumber}</p>
                        </div>
                        <div>
                          <p>Email: {order.email}</p>
                        </div>
                        <div>
                          <p>
                            Adres: {order.address.postalCode}{" "}
                            {order.address.province} {order.address.street}
                          </p>
                        </div>
                        <div>
                          <p>
                            Dostawa: {order.deliveryMethod} -{" "}
                            {order.deliveryCost} zł
                          </p>
                        </div>
                        <div>
                          <p>
                            Data zamówienia: {formatOrderDate(order.createdAt)}
                          </p>
                        </div>
                        <div>
                          <p>
                            Paczka opłacona:{" "}
                            {order.isPackagePaid ? "Tak" : "Nie"}
                          </p>
                        </div>
                        <div>
                          <p>Zniżka: {order.discountAmount} zł</p>
                        </div>
                        <div>
                          <p>Suma: {order.totalAfterDelivery} zł</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="table-responsive">
                          <table
                            className="table table-bordered"
                            id="dataTable"
                            width="100%"
                            cellSpacing={0}
                          >
                            <thead>
                              <tr>
                                <th>Zdjęcie</th>
                                <th>Nazwa</th>
                                <th>Cena</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.products.map((product, index) => (
                                <tr key={index}>
                                  <td className="text-center align-middle">
                                    <img
                                      src={`http://localhost:3001/convertUploads/${product.image}`}
                                      width="100"
                                      height="100"
                                      alt={product.name}
                                    />
                                  </td>
                                  <td className="text-center align-middle">
                                    <strong>{product.name}</strong>
                                    <br />
                                    {product.desc}
                                  </td>
                                  <td className="text-center align-middle">
                                    {product.price} zł
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* /.container-fluid */}
        </div>
      </div>
    </>
  );
}

export default Orders;
