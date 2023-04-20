const { sequelize } = require("app/models/index");

console.log("Syncing DB...");

sequelize.sync({ force: true })

console.log("All models were synchronized successfully.");