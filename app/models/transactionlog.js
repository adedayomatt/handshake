'use strict';
const {
  Model
} = require('sequelize');
const status = require("../constants/status");
module.exports = (sequelize, DataTypes) => {
  class TransactionLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Transaction, ClientPair }) {
      // define association here
      TransactionLog.belongsTo(Transaction, {
        as: "transaction"
      })

      TransactionLog.belongsTo(ClientPair, {
        foreignKey: "client_pair_id",
        as: "pair"
      })

    }
  }
  TransactionLog.init({
    transaction_id: DataTypes.INTEGER,
    client_pair_id: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: [ status.PENDING, status.FAILED, status.SUCCESS ],
      defaultValue: status.PENDING
    },
    url: DataTypes.STRING,
    request: DataTypes.TEXT,
    response: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TransactionLog',
    tableName: 'transction_logs',
    underscored: true
  });
  return TransactionLog;
};