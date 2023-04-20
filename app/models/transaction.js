'use strict';
const {
  Model
} = require('sequelize');
const status = require("app/constants/status");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Client, TransactionLog }) {
      // define association here
      Transaction.belongsTo(Client, {
        as: "client"
      });

      Transaction.hasMany(TransactionLog, {
        foreignKey: "transaction_id",
        as: "logs"
      });

    }
  }
  Transaction.init({
    client_id: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    reference: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: [ status.PENDING, status.FAILED, status.SUCCESS ],
      defaultValue: status.PENDING
    },
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    underscored: true
  });
  return Transaction;
};