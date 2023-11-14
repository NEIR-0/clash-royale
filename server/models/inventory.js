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
      // Inventory.belongsTo(models.User, {
      //   foreignKey: "userId",
      // });
      // Inventory.belongsTo(models.Card, {
      //   foreignKey: "cardId",
      // });

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
