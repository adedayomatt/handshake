'use strict';
const {
  Model
} = require('sequelize');
const status = require("app/constants/status");
const { generateRandomCharacter } = require("app/utils")
module.exports = (sequelize, DataTypes) => {
  class ClientPair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( { Client, TransactionLog }) {
      // define association here
      ClientPair.belongsTo(Client, {
        foreignKey: "client_id",
        as: "client"
      });

      ClientPair.belongsTo(Client, {
        foreignKey: "partner_client_id",
        as: "partner"
      });

      ClientPair.hasMany(TransactionLog, {
        foreignKey: "client_pair_id",
        as: "transactionLogs"
      })

    }
  }
  ClientPair.init({
    client_id: DataTypes.INTEGER,
    partner_client_id: DataTypes.INTEGER,
    secret: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: [status.ENABLED, status.DISABLED],
      defaultValue: status.ENABLED
    },
  }, {
    sequelize,
    modelName: 'ClientPair',
    tableName: "client_pairs",
    underscored: true,
    hooks: {
      beforeCreate(pair, options) {
        pair.secret = generateRandomCharacter(12)
      }
    }
  });
  return ClientPair;
};