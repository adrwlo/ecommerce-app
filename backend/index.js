const express = require("express");
const app = express();
const { port } = require("./config");
const apiRouter = require("./routes/api");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");

//db
require("./db/mongoose");

//parsery
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//fix cors
app.use(cors());

app.use("/convertUploads", express.static(__dirname + "/convertUploads"));

//routes
app.use("/", apiRouter);

//server
app.listen(port, function () {
  console.log("serwer dziala na porcie" + port);
});
