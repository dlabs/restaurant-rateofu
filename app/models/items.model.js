
module.exports = (sequelize, Sequilize) => {
    const item = sequelize.define("items", {
        name: Sequilize.STRING,
        type: Sequilize.STRING,
        price: Sequilize.FLOAT
    });

    // item.associate = models => {
    //     item.belongsToMany(models.itemTypes, {
    //         hooks: true,
    //         through: 'item_types'
    //     })
    // };

    return item;
};