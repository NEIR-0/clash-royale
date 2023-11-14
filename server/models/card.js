"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Card.hasMany(models.Inventory, {
      //   foreignKey: "cardId",
      // });
      Card.belongsToMany(models.User, { through: models.Inventory, foreignKey: "cardId" });
    }
  }
  Card.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      elixir: DataTypes.STRING,
      rarity: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Card",
    }
  );
  return Card;
};
