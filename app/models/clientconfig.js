'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Client }) {
      // define association here
      ClientConfig.belongsTo(Client, {
        as: "client"
      })
    }
  }
  ClientConfig.init({
    client_id: DataTypes.INTEGER,
    key: DataTypes.STRING,
    value: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ClientConfig',
    tableName: 'client_config',
    underscored: true
  });
  return ClientConfig;
};