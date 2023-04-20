const { database } = require("app/config/config");
module.exports = {
  development: {
    username: database.username,
    password: database.password,
    database: database.database,
    host: database.host,
    dialect: "mysql"
  },
  test: {
    username: database.username,
    password: database.password,
    database: database.database,
    host: database.host,
    dialect: "mysql"
  },
  production: {
    username: database.username,
    password: database.password,
    database: database.database,
    host: database.host,
    dialect: "mysql"
  }
}
