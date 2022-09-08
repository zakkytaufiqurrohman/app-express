"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Category, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
      });
    }
  }
  Transaction.init(
    {
      balance: DataTypes.INTEGER,
      description: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      category_type: DataTypes.ENUM("income", "outcome"),
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
