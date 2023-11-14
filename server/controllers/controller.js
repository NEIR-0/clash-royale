const { Card, User, Inventory } = require("../models");
class Controllers {
  // login
  static async login(req, res, next) {
    try {
      const {}
      // res.status(200).json();
    } catch (error) {
      console.log(error);
    }
  }
  // list card
  static async listCard(req, res, next) {
    try {
      const card = await Card.findAll();
      res.status(200).json(card);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controllers;
