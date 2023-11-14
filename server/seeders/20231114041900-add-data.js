"use strict";

/** @type {import('sequelize-cli').Migration} */

const { hashing } = require("../helper/bycryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const cards = require("../data/dataCOR.json").map((el) => {
      delete el.key;
      delete el.sc_key;
      delete el.arena;
      delete el.id;
      delete el.evolved_spells_sc_key;
      delete el.is_evolved;

      if (el.rarity === "Common") {
        el.cardPrice = 3;
      } else if (el.rarity === "Rare") {
        el.cardPrice = 5;
      } else if (el.rarity === "Epic") {
        el.cardPrice = 7;
      } else if (el.rarity === "Legendary") {
        el.cardPrice = 20;
      } else if (el.rarity === "Champion") {
        el.cardPrice = 45;
      }

      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    // console.log(cards);
    await queryInterface.bulkInsert("Cards", cards);

    const admin = [
      {
        username: "admin",
        email: "admin@gmail.com",
        password: hashing("admin"),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Users", admin);

    const coin = require("../data/coin.json").map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Coins", coin);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cards", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Coins", null, {});
  },
};
