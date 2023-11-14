"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.belongsToMany(
      //   models.Card,
      //   { through: models.Inventory }
      //   // {
      //   //   foreignKey: "userId",
      //   // }
      // );
      // Card.belongsToMany(
      //   models.User,
      //   { through: models.Inventory }
      //   // {
      //   //   foreignKey: "cardId",
      //   // }
      // );
    }
  }
  Inventory.init(
    {
      userId: DataTypes.INTEGER,
      cardId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Inventory",
    }
  );
  return Inventory;
};
