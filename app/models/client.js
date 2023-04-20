'use strict';
const {
  Model
} = require('sequelize');
const status = require("app/constants/status");
const { generateRandomCharacter } = require("app/utils")
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( { Transaction, ClientConfig, RequestLog, ClientPair }) {
      // define association here
      Client.hasMany(Transaction, {
        foreignKey: "client_id",
        as: "transactions"
      });

      Client.hasMany(ClientConfig, {
        foreignKey: "client_id",
        as: "config"
      });

      Client.hasMany(RequestLog, {
        foreignKey: "client_id",
        as: "requestLogs"
      })

      Client.hasMany(ClientPair, {
        foreignKey: "client_id",
        as: "partners"
      })

      Client.hasMany(ClientPair, {
        foreignKey: "partner_client_id",
        as: "connectors"
      })
    }
  }
  Client.init({
    name: DataTypes.STRING,
    base_url: DataTypes.STRING,
    request_path: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: [status.ENABLED, status.DISABLED ],
      defaultValue: status.ENABLED
    },
    secret: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
    tableName: "clients",
    underscored: true,
    hooks: {
      beforeCreate(client, options) {
        client.secret = generateRandomCharacter(12)
      }
    }
  });
  return Client;
};