const User = require("../../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserActions {
  async register(req, res) {
    const name = "Adrian";
    const surname = "Włodarski";
    const email = "test1234@o2.pl";
    const password = "test1234";

    const encryptedPassword = await bcrypt.hash(password, 10);
    let newUser;

    try {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.json({ error: "User Exists" });
      }
      newUser = new User({
        name,
        surname,
        email,
        password: encryptedPassword,
      });
      await newUser.save();
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

      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ error: "User Not found" });
      }

      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
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
}

module.exports = new UserActions();
