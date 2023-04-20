'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Client, Transaction }) {
      // define association here
      RequestLog.belongsTo(Client, {
        as: "client"
      })
    }
  }
  RequestLog.init({
    client_id: DataTypes.INTEGER,
    endpoint: DataTypes.STRING,
    method: DataTypes.STRING,
    request: DataTypes.TEXT,
    response: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'RequestLog',
    tableName: "request_logs",
    underscored: true
  });
  return RequestLog;
};