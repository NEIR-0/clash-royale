"use strict";
const { Model } = require("sequelize");
const { hashing } = require("../helper/bycryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Inventory, {
      //   // foreignKey: 'userId'
      // });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "email cant empty",
          },
          notNull: {
            msg: "email cant null",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "email cant empty",
          },
          notNull: {
            msg: "email cant null",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  // hooks
  User.addHook("beforeCreate", (instance, options) => {
    instance.password = hashing(instance.password);
  });
  return User;
};

// npx sequelize-cli model:generate --name Inventory --attributes userId:integer,cardId:integer
