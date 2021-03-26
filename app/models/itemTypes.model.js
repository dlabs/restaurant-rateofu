
module.exports = (sequelize, Sequilize) => {
    const itemType = sequelize.define("itemTypes", {
        name: Sequilize.STRING,
    });

    itemType.associate = models => {
        itemType.belongsToMany(models.items, {
            hooks: true,
            through: 'item_types'
        })
    };

    return itemType;
};