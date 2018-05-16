// create a "Customer" model
module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                len: [2, 20]
            }
        }
    });

    Customer.associate = function(models) {
        // Associating Customer with Burger
        // When a Customer is deleted, also delete any associated Burgers
        Customer.hasMany(models.Burger, {
            onDelete: "cascade"
        });
    };

    return Customer;
}