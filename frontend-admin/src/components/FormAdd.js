import React, { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const FormAdd = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState("");

  const changeNameHandler = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const changePriceHandler = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const changeDescHandler = (event) => {
    const value = event.target.value;
    setDesc(value);
  };

  const changeAmountHandler = (event) => {
    const value = event.target.value;
    setAmount(value);
  };

  const changeImageHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const validateForm = () => {
    if (!name || !price || !desc || !amount || !image) {
      NotificationManager.error("Proszę uzupełnij wszystkie pola!", "Błąd");
      return false;
    }
    return true;
  };

  const addItem = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("desc", desc);
    formData.append("amount", amount);
    formData.append("image", image);

    fetch(`${process.env.REACT_APP_API_URL}/admin/items`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // handle the response
        NotificationManager.success("Pomyślnie dodano produkt", "Sukces");
        setName("");
        setPrice("");
        setDesc("");
        setAmount("");
        document.getElementById("amount").value = "Choose amount";
        setImage("");
        document.getElementById("image").value = "";
      })
      .catch((error) => {
        // handle the error
        NotificationManager.error("Błąd dodawania produktu", "Błąd");
      });
  };

  return (
    <>
      <NotificationContainer />
      <form encType="multipart/form-data" className="pl-5 pr-5 pt-2">
        <h2 className="pb-4">Dodaj produkt</h2>
        <div className="form-group">
          <label htmlFor="name">Nazwa:</label>
          <input
            className="form-control"
            type="text"
            id="name"
            placeholder="np. Komputer"
            value={name}
            onChange={changeNameHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Cena:</label>
          <input
            className="form-control"
            type="text"
            id="price"
            placeholder="np. 1500"
            value={price}
            onChange={changePriceHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Opis:</label>
          <textarea
            className="form-control"
            id="desc"
            placeholder="np. Lorem Ipsum is simply dummy text of the pndard dummy..."
            value={desc}
            onChange={changeDescHandler}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Ilość:</label>
          <select
            className="form-control"
            id="amount"
            defaultValue={amount}
            onChange={changeAmountHandler}
          >
            <option>Wybierz ilość</option>
            {[...Array(50)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Zdjęcie:</label>
          <input
            className="form-control-file"
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg, image/jpg"
            onChange={changeImageHandler}
          />
        </div>
        <p className="validation_active">Uzupełnij wszystkie pola!</p>
        <button className="btn btn-primary" onClick={addItem}>
          Dodaj produkt
        </button>
      </form>
    </>
  );
};

export default FormAdd;
