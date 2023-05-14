import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Users = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/clients`)
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            {/* Page Heading */}
            <h1 className="h3 mb-2 text-gray-800">Użytkownicy</h1>
            <p className="mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            {/* DataTales Example */}
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Tabela użytkowników
                </h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellSpacing={0}
                  >
                    <thead>
                      <tr>
                        <th></th>
                        <th>Id</th>
                        <th>Imię i nazwisko</th>
                        <th>E-mail</th>
                        <th>Numer telefonu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client) => {
                        return (
                          <tr key={client._id}>
                            <td className="text-center align-middle">
                              <img
                                className="img-profile rounded-circle"
                                src="img/undraw_profile.svg"
                                style={{ width: "100px" }}
                                alt=""
                              />
                            </td>
                            <td className="text-center align-middle">
                              {client._id}
                            </td>
                            <td className="text-center align-middle font-weight-bold">
                              {client.name} {client.surname}
                            </td>
                            <td className="text-center align-middle">
                              {client.email}
                            </td>
                            <td className="text-center align-middle">
                              {client.number}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </div>
      </div>
    </>
  );
};

export default Users;
