import React, { createContext, useState, useEffect } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const ItemContext = createContext();

export function ItemProvider({ children }) {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || {
      products: [],
      quantity: 0,
      total: 0,
      discountAmount: 0,
    }
  );
  const [inValidDetails, setInValidDetails] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admin/items`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id) => {
    // Tworzymy kopię obecnej zawartości koszyka
    const cartCopy = { ...cart };
    // Szukamy produktu o podanym ID w liście produktów
    const productToAdd = items.find((item) => item._id === id);
    // Dodajemy produkt do koszyka, jeśli istnieje
    if (productToAdd) {
      // Sprawdzamy, czy produkt już istnieje w koszyku
      const existingProductIndex = cartCopy.products.findIndex(
        (item) => item._id === id
      );

      if (existingProductIndex !== -1) {
        // Jeśli produkt już istnieje, zwiększamy jego liczbę i aktualizujemy cenę
        cartCopy.products[existingProductIndex].quantity += 1;
        cartCopy.total += productToAdd.price;
      } else {
        // Jeśli produkt nie istnieje, dodajemy go z liczbą 1 i aktualizujemy cenę
        cartCopy.products.push({ ...productToAdd, quantity: 1 });
        cartCopy.total += productToAdd.price;
      }

      // Aktualizujemy stan koszyka
      cartCopy.quantity += 1;
      setCart(cartCopy);
    }
  };

  const removeFromCart = (id) => {
    // Tworzymy kopię obecnej zawartości koszyka
    const cartCopy = { ...cart };
    // Szukamy indeksu produktu o podanym ID w liście produktów
    const productIndex = cartCopy.products.findIndex((item) => item._id === id);

    // Usuwamy produkt z koszyka, jeśli istnieje
    if (productIndex !== -1) {
      const productToRemove = cartCopy.products[productIndex];
      if (productToRemove.quantity > 1) {
        // zmniejszamy ilość tylko jeśli większa od 1
        cartCopy.products[productIndex].quantity -= 1;
        cartCopy.quantity -= 1;
        cartCopy.total -= productToRemove.price;
        setCart(cartCopy);
      } else {
        cartCopy.products.splice(productIndex, 1);
        cartCopy.quantity -= productToRemove.quantity;
        cartCopy.total -= productToRemove.price * productToRemove.quantity;
        setCart(cartCopy);
      }
    }
  };

  const removeAllFromCart = (id) => {
    // Tworzymy kopię obecnej zawartości koszyka
    const cartCopy = { ...cart };
    // Szukamy indeksu produktu o podanym ID w liście produktów
    const productIndex = cartCopy.products.findIndex((item) => item._id === id);

    // Usuwamy produkt z koszyka, jeśli istnieje
    if (productIndex !== -1) {
      const productToRemove = cartCopy.products[productIndex];
      // Usuwamy produkt z koszyka
      cartCopy.products.splice(productIndex, 1);
      cartCopy.quantity -= productToRemove.quantity;
      cartCopy.total -= productToRemove.price * productToRemove.quantity;
      setCart(cartCopy);
    }
  };

  const updateQuantityChange = (id, newQuantity) => {
    const cartCopy = { ...cart };
    const productIndex = cartCopy.products.findIndex((item) => item._id === id);

    if (productIndex !== -1) {
      const product = cartCopy.products[productIndex];
      const difference = newQuantity - product.quantity;
      const newTotal = cartCopy.total + difference * product.price;

      if (newQuantity <= 0) {
        cartCopy.products.splice(productIndex, 1);
      } else {
        cartCopy.products[productIndex].quantity = newQuantity;
      }

      cartCopy.quantity += difference;
      cartCopy.total = newTotal;
      setCart(cartCopy);
      localStorage.setItem("cart", JSON.stringify(cartCopy));
    }
  };

  const addDiscount = (couponCode) => {
    const correctCouponCode = "ZNIZKA20";
    const discountPercent = 0.2;
    const INPUT_COUPON_CODE = document.getElementById("couponCode");
    const cartCopy = { ...cart };

    if (couponCode === correctCouponCode) {
      cartCopy.discountAmount = cartCopy.total * discountPercent;
      cartCopy.total = cartCopy.total - cartCopy.discountAmount;
      setCart(cartCopy);
      NotificationManager.success("Prawidłowy kod zniżkowy!");
      setInValidDetails(false);
      INPUT_COUPON_CODE.value = "";
    } else {
      cartCopy.discountAmount = 0;
      setCart(cartCopy);
      setInValidDetails(true);
      INPUT_COUPON_CODE.value = "";
    }
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        cart,
        addToCart,
        removeFromCart,
        removeAllFromCart,
        updateQuantityChange,
        addDiscount,
        inValidDetails,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export default ItemContext;
