const { Card, User, Inventory } = require("../models");
const { hashing, compare } = require("../helper/bycryptjs");
const { createToken, verifyToken } = require("../helper/jwt");

class Controllers {
  // login
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // console.log(email, password);
      if (!email) throw { name: "invalidEmail" };
      if (!password) throw { name: "invalidPassword" };

      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      // console.log(user);
      if (!user) throw { name: "Unauthenticated" };

      const compared = compare(password, user.password);
      if (!compared) throw { name: "Unauthenticated" };

      const token = createToken({ id: user.id }); // pakai "{id:}" biar panjang

      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // register
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      console.log(username, email, password);
      const user = await User.create({ username, email, password });

      res.status(201).json({ user });
    } catch (error) {
      console.log(error.name);
      next(error);
    }
  }

  
  // list card
  static async listCard(req, res, next) {
    try {
      const card = await Card.findAll();
      res.status(200).json(card);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controllers;
