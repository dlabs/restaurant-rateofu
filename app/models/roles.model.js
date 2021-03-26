
module.exports = (sequelize, Sequilize) => {
    const role = sequelize.define("roles", {
        role: Sequilize.STRING,
        description: Sequilize.STRING,
    });

    role.associate = models => {
        user.belongsToMany(models.users, {
            hooks: true,
            through: 'user_roles'
        })
    };

    return role;
};