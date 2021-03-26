// const { sequelize, Sequilize } = require(".");

module.exports = (sequelize, Sequilize) => {
    const order = sequelize.define("orders", {
        order: Sequilize.STRING,
        status:  Sequilize.STRING,
        batchTypeOrder: Sequilize.STRING
    });

    return order;
};