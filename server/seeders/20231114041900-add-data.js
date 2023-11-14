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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Users", admin);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cards", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
