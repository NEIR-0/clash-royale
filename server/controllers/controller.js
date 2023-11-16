const { Card, User, Inventory, Coin, Order } = require("../models");
const { hashing, compare } = require("../helper/bycryptjs");
const { createToken, verifyToken } = require("../helper/jwt");
const { OAuth2Client } = require("google-auth-library");
// midtrans
const midtransClient = require("midtrans-client");
// nodemailer
const { createTransport } = require("nodemailer");
const { Op, where } = require("sequelize");
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
      // nodemailer
      const sending = createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        // secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.EMAIL_NODEMAILER,
          pass: process.env.PASSWORD_NODEMAILER,
        },
      });

      const { username, email, password } = req.body;
      // console.log(username, email, password);
      if (!email) throw { name: "invalidEmail" };
      if (!password) throw { name: "invalidPassword" };
      const user = await User.create({ username, email, password });

      // nodemailer;
      await sending.sendMail({
        from: "royale-lite@gmail.com",
        to: email,
        subject: "Welocme Royales",
        text: "Plaintext version of the message",
        html: "<p>HTML version of the message</p>",
      });

      res.status(201).json({ user });
    } catch (error) {
      console.log(error.name);
      next(error);
    }
  }

  // list card
  static async listCard(req, res, next) {
    try {
      const card = await Card.findAll({
        limit: 3,
        order: [["id", "DESC"]],
      });

      res.status(200).json(card);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // market
  static async market(req, res, next) {
    try {
      const { filter } = req.query;
      // console.log(filter);

      let option = {
        where: {},
      };

      if (filter) {
        option.where.name = {
          [Op.iLike]: `%${filter}%`,
        };
      }
      // const card = await Card.findAll(option);
      const card = await Card.findAll(option);

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

      const card = await Card.findOne({
        where: {
          id: id,
        },
      });
      if (!card) throw { name: "notFound" };

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
      console.log(error, "<<<<<<<<<<<>>>>>>>>>>>>>>>>>><<<<<<<<<<>>>>>>>>");
      next(error);
    }
  }

  // addCard
  static async addCard(req, res, next) {
    try {
      const { id } = req.params;
      // console.log(id, "<<<<<<<<<<<<<");
      const card = await Card.findByPk(id);
      if (!card) throw { name: "notFound" };
      const user = await User.findByPk(req.user.id);
      // console.log(card, user);
      // check
      const duplicate = await User.findOne({
        where: {
          id: req.user.id,
        },
        include: {
          model: Card,
          where: {
            id: id,
          },
        },
      });
      // console.log(duplicate);
      if (!duplicate) {
        const coins = user.wallet - card.cardPrice;
        if (coins <= 0) throw { name: "notEnough" };
        else {
          // console.log("masuk <<<<<<<<<<");
          await User.update(
            { wallet: coins },
            {
              where: {
                id: req.user.id,
              },
            }
          );
          const data = await Inventory.create({ userId: req.user.id, cardId: id });
          res.status(201).json({ data });
        }
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
      // console.log(order);

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
      // console.log(order);

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
      await User.findByPk(req.user.id);

      const { username } = req.body;
      // console.log(username, email, password);
      const updateUser = await User.update(
        { username },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      // console.log(updateUser);

      res.status(201).json({ message: "user successfull updated" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // getMidtransToken
  static async getMidtransToken(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const order = await Order.findOne({
        limit: 1,
        where: {
          userId: req.user.id,
        },
        include: {
          model: Coin,
        },
        order: [["createdAt", "DESC"]],
      });
      // console.log(order);

      let parameter = {
        transaction_details: {
          order_id: order.id,
          userId: order.userId,
          gross_amount: order.Coin.price,
          status: "panding",
        },
      };

      const response = await snap.createTransaction(parameter);
      res.json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // notifications
  static async notifications(req, res, next) {
    try {
      // console.log(req.body);
      const { transaction_status, fraud_status, order_id } = req.body;
      const successProcess = async () => {
        try {
          const order = await Order.update(
            { status: true },
            {
              where: {
                id: order_id,
              },
              returning: true,
            }
          );
          // console.log(order);
          // console.log(order[1][0].userId);
          const userId = order[1][0].userId;
          const coinId = order[1][0].coinId;
          const coin = await Coin.findByPk(coinId);
          const user = await User.findByPk(userId);

          const wallet = user.wallet + coin.amount;
          console.log(user.wallet, coin.amount);
          console.log(wallet);
          console.log("wallet <<<<<<<>>>>>>>>>>>");

          await User.update(
            { wallet: wallet },
            {
              where: {
                id: userId,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      };
      // await successProcess();

      if (transaction_status == "capture") {
        if (fraud_status == "accept") {
          await successProcess();
        }
      } else if (transaction_status == "settlement") {
        await successProcess();
      } else if (transaction_status == "cancel" || transaction_status == "deny" || transaction_status == "expire") {
        await Order.update(
          { status: false },
          {
            where: {
              id: order_id,
            },
          }
        );
      }

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // googleLogin
  static async googleLogin(req, res, next) {
    // console.log(req.body.data);
    const { googletoken } = req.body.data;
    // console.log(googletoken);
    // console.log(process.env.GOOGLE_CLIENT_ID);
    try {
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: googletoken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      // console.log(ticket.payload);

      const { email, sub } = ticket.payload;
      // console.log(email, sub);
      let user = await User.findOne({
        where: { email },
      });
      if (!user) {
        user = await User.create(
          {
            username: sub,
            email,
            password: sub + new Date(),
          },
          {
            hooks: false,
          }
        );
        // console.log(user);
      }

      const token = createToken({ id: user.id });
      // console.log(token);
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controllers;
