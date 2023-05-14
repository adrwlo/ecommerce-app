const express = require("express");
const app = express();
const router = express.Router();
const itemActions = require("../actions/api/itemActions");
const userActions = require("../actions/api/userActions");
const clientActions = require("../actions/api/clientActions");
const orderActions = require("../actions/api/orderActions");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: "uploads/" });

//ADMIN PANEL

//rejestrowanie użytkowników panelu administratora
router.post("/admin/register", userActions.register);

//logowanie do systemu panelu administratora
router.post("/admin/login", userActions.login);

//pobieranie przedmiotów panelu administratora
router.get("/admin/items", itemActions.getAllItems);

//pobieranie przedmiotu panelu administratora
router.get("/admin/items/:id", itemActions.getItem);

//zapisywanie przedmiotów panelu administratora
router.post("/admin/items", upload.single("image"), itemActions.saveItem);

//edytowanie przedmiotu panelu administratora
router.put("/admin/items/:id", upload.single("image"), itemActions.updateItem);

//usuwanie przedmiotu panelu administratora
router.delete("/admin/items/:id", itemActions.deleteItem);

//SHOP

//rejestrowanie klienta sklepu internetowego
router.post("/register", clientActions.register);

//logowanie do systemu sklepu internetowego
router.post("/login", clientActions.login);

//pobieranie klientów sklepu internetowego
router.get("/clients", clientActions.getAllClients);

//pobieranie klienta sklepu internetowego
router.get("/clients/:id", clientActions.getClient);

//ORDERS

//złóż zamówienie
router.post("/order", orderActions.saveOrder);

//pobierz zamówienia
router.get("/order", orderActions.getAllOrders);

//pobierz konkretne zamówienie
router.get("/order/:id", orderActions.getOrder);

module.exports = router;
