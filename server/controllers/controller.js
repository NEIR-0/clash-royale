const { Card, User, Inventory, Coin, Order } = require("../models");
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

  // cardId
  static async cardId(req, res, next) {
    try {
      const { id } = req.params;
      // console.log(id);
      const card = await Card.findOne({
        where: {
          id: id,
        },
      });
      if (!card) throw { name: "notFound" };

      res.status(200).json(card);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // deleteCard
  static async deleteCard(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);

      await Card.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: `card with id: ${id}, has been removed` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // inventory
  static async inventory(req, res, next) {
    try {
      const { id } = req.user;
      const user = await User.findOne({
        where: {
          id: id,
        },
        include: {
          model: Card,
        },
      });
      console.log(user);

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // addCard
  static async addCard(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id, "<<<<<<<<<<<<<");
      const card = await Card.findByPk(id);
      if (!card) throw { name: "notFound" };
      // check
      const duplicate = await User.findOne({
        include: {
          model: Card,
          where: {
            id: id,
          },
        },
      });
      if (!duplicate) {
        const data = await Inventory.create({ userId: req.user.id, cardId: id });
        res.status(201).json(data);
      } else {
        throw { name: "duplicateCard" };
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // listCoins
  static async listCoins(req, res, next) {
    try {
      const coin = await Coin.findAll();

      res.status(200).json(coin);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // listOrders
  static async listOrders(req, res, next) {
    try {
      const order = await Order.findAll({
        where: {
          userId: req.user.id,
        },
      });
      console.log(order);

      res.status(200).json(order);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // addOrder
  static async addOrder(req, res, next) {
    try {
      const { coinId } = req.params;
      console.log(coinId, "<<<<<<<<<<<<<");

      const listCoin = await Coin.findByPk(coinId);
      if (!listCoin) throw { name: "notFound" };
      // console.log(req.user.id, "<>>>>>>>>>>>>");
      const order = await Order.create({ coinId, userId: req.user.id });
      console.log(order);

      res.status(201).json(order);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // dataUser
  static async dataUser(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // updateUser
  static async updateUser(req, res, next) {
    try {
      console.log("masuk <<<<<<<<<<");
      const user = await User.findByPk(req.user.id);
      if (!user) throw { name: "notFound" };

      const { username, email, password } = req.body;
      console.log(username, email, password);
      const updateUser = await User.update(
        { username, email, password },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      console.log(updateUser);

      res.status(201).json({ message: "user successfull updated" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controllers;
