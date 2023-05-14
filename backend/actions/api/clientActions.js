const Client = require("../../db/models/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class ClientActions {
  async register(req, res) {
    try {
      const { name, surname, email, password, number } = req.body;

      const encryptedPassword = await bcrypt.hash(password, 10);
      let newClient;

      const oldClient = await Client.findOne({ email });

      if (oldClient) {
        return res.status(409).send("Client already exists");
      }
      newClient = new Client({
        name,
        surname,
        email,
        password: encryptedPassword,
        number,
      });
      await newClient.save();
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
  }

  async login(req, res) {
    const JWT_SECRET =
      "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

    try {
      const { email, password } = req.body;

      const client = await Client.findOne({ email });
      if (!client) {
        return res.json({ error: "Client Not found" });
      }

      if (await bcrypt.compare(password, client.password)) {
        const token = jwt.sign({ email: client.email }, JWT_SECRET, {
          expiresIn: "15m",
        });

        return res.json({ status: "ok", token: token, email: email });
      } else {
        return res.json({ status: "error", error: "Invalid Password" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Invalid Request" });
    }
  }

  //pobieranie przedmiotów
  async getAllClients(req, res) {
    let client = await Client.find({});
    res.status(200).json(client);
  }

  //pobieranie okreslonego przedmiotu
  async getClient(req, res) {
    const email = req.params.email;
    const client = await Client.findOne({ email: email });

    res.status(200).json(client);
  }
}

module.exports = new ClientActions();
