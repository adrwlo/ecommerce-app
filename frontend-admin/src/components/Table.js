import React, { useEffect, useState } from "react";
import { MdModeEditOutline, MdOutlineDelete } from "react-icons/md";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Table = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admin/items`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  const editItem = (id) => {
    localStorage.setItem("id", id);
    window.location.href = "/edytuj-produkt";
  };

  const deleteItem = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/admin/items/` + id, {
      method: "DELETE",
    })
      .then((response) => {
        // handle the response
        NotificationManager.success("Pomyślnie usunięto produkt", "Sukces");
        const filteredItems = items.filter((item) => item._id !== id);
        setItems(filteredItems);
      })
      .catch((error) => {
        // handle the error
        NotificationManager.error("Bład usuwania produktu", "Błąd");
      });
  };

  return (
    <>
      <NotificationContainer />
      {/* Begin Page Content */}
      <div className="container-fluid">
        {/* Page Heading */}
        <h1 className="h3 mb-2 text-gray-800">Produkty</h1>
        <p className="mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Tabela przedmiotów
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
                    <th></th>
                    <th>Id</th>
                    <th>Cena</th>
                    <th>Ilość</th>
                    <th>Edytuj</th>
                    <th>Usuń</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td className="text-center align-middle">
                          <img
                            src={`http://localhost:3001/convertUploads/${item.image}`}
                            width="100"
                            height="100"
                            alt=""
                          />
                        </td>
                        <td className="text-center align-middle">
                          <p className="font-weight-bold">{item.name}</p>{" "}
                          {item.desc}
                        </td>
                        <td className="text-center align-middle">{item._id}</td>
                        <td className="text-center align-middle">
                          {item.price}
                        </td>
                        <td className="text-center align-middle">
                          {item.amount}
                        </td>
                        <td className="text-center align-middle">
                          <button
                            className="btn btn-transparent"
                            onClick={() => editItem(item._id)}
                          >
                            <MdModeEditOutline size={30} color="green" />
                          </button>
                        </td>
                        <td className="text-center align-middle">
                          <button
                            className="btn btn-transparent"
                            onClick={() => deleteItem(item._id)}
                          >
                            <MdOutlineDelete size={30} color="red" />
                          </button>
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
      {/* End of Main Content */}
    </>
  );
};

export default Table;
