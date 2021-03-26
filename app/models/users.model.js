
module.exports = (sequelize, Sequilize) => {
    const user = sequelize.define("users", {
        username: Sequilize.STRING,
        role: Sequilize.STRING
    });

    return user;
};