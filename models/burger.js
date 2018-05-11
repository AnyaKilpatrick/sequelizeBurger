// create a "Burger" model
module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 100]
            }
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    return Burger;
}