const dbConfig = require("../config/db.config");

const Sequilize = require("sequelize");
const sequelize = new Sequilize(
    {
        dialect: dbConfig.dialect,
        storage: '../../database.sqlite'
    });

    const db = {};

    db.Sequilize = Sequilize.Op;
    db.sequelize = sequelize;

    // db.itemTypes = require("./itemTypes.model.js")(sequelize,Sequilize);
    db.items = require("./items.model.js")(sequelize,Sequilize);
    db.orders = require("./orders.model.js")(sequelize,Sequilize);
    // db.roles = require("./roles.model.js")(sequelize,Sequilize);
    db.users = require("./users.model.js")(sequelize,Sequilize);

    module.exports = db;