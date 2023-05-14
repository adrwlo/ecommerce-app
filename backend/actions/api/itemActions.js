const Item = require("../../db/models/item");
const fs = require("fs");

class ItemActions {
  //pobieranie przedmiotów
  async getAllItems(req, res) {
    let item = await Item.find({});
    res.status(200).json(item);
  }

  //pobieranie okreslonego przedmiotu
  async getItem(req, res) {
    const id = req.params.id;
    const item = await Item.findOne({ _id: id });

    res.status(200).json(item);
  }

  //dodawanie przedmiotu
  async saveItem(req, res) {
    const name = req.body.name;
    const price = req.body.price;
    const desc = req.body.desc;
    const amount = req.body.amount;
    const image_obj = req.file;

    let item;

    try {
      let fileName = image_obj.filename;
      let fileType = image_obj.mimetype.split("/")[1];
      let newFileName = image_obj.filename + "." + fileType;
      let image = newFileName;

      fs.rename(
        `uploads/${fileName}`,
        `convertUploads/${newFileName}`,
        function () {
          console.log("callback");
        }
      );

      item = new Item({ name, price, desc, amount, desc, image });
      await item.save();
    } catch (err) {
      console.log(err.message);
      return res.status(422).json({ message: err.message });
    }

    res.status(201).json(item);
  }

  //edytowanie przedmiotu
  async updateItem(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const desc = req.body.desc;
    const amount = req.body.amount;
    const image_obj = req.file;

    let item;

    try {
      let fileName = image_obj.filename;
      let fileType = image_obj.mimetype.split("/")[1];
      let newFileName = image_obj.filename + "." + fileType;
      let image = newFileName;

      fs.rename(
        `uploads/${fileName}`,
        `convertUploads/${newFileName}`,
        function () {
          console.log("callback");
        }
      );

      item = await Item.findById(id);

      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      item.name = name;
      item.price = price;
      item.desc = desc;
      item.amount = amount;
      item.image = image;

      await item.save();
    } catch (err) {
      console.log(err.message);
      return res.status(422).json({ message: err.message });
    }

    res.status(200).json(item);
  }

  //usuwanie przedmiotu
  async deleteItem(req, res) {
    const id = req.params.id;
    await Item.deleteOne({ _id: id });

    res.sendStatus(204);
  }
}

module.exports = new ItemActions();
