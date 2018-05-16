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

    Burger.associate = function(models) {
        // Burger should belong to a Customer
        Burger.belongsTo(models.Customer)
      };
        
    return Burger;
}