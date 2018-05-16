# sequelizeBurger

# Node Express Handlebars Sequelize

A burger logger with Node, Express, Handlebars and Sequelize. Node and Sequelize are used to query and route data in the app, and Handlebars to generate HTML.

Heroku was used for hosting. And JawsDB was used as a remote database.

Deployed application [here](https://devourthisburger.herokuapp.com/)

* Eat-Da-Burger! is a restaurant app that lets users input the names of burgers they'd like to eat, and names of customers burgers were devoured by.

* Whenever a user submits a burger's name, app will display the burger on the left side of the page.

* Each burger in the waiting area also has a `Devour` button. When the user clicks it, the burger will move to the right side of the page, with the name of cutomer who devoured it.

* Burger can be devoured onlu when the name of Customer was filled in. One customer can have more than one burger.

* App will store every burger in a database, whether devoured or not.


#### Controllers

* `burgers_controllers.js` contains all the routes:

 ```javascript
//  requiring a models
var db = require("../models");

var express = require("express");
var router = express.Router();

var db = require("../models");

router.get("/", function(req, res){
    db.Burger.findAll({
        include:[db.Customer]
    }).then(function(results){
        var hbsObject = {
            burgers: results
        };
        console.log(JSON.stringify(hbsObject));
        res.render("index", hbsObject)
    })
});

router.post("/api/burgers", function(req, res){
    console.log(req.body.name);
    db.Burger.create({
        burger_name: req.body.name
    }).then(function(){
        console.log("new burger added");
        res.status(200).end();
    })
});

router.post("/api/customers", function(req, res){
    console.log(req.body.name + req.body.ate);
    db.Customer.findOrCreate({
        where: {
            id: req.body.name
            }
    }).then(function(results){
        if(results.changedRows == 0){
            return res.status(404).end();
        }else{
            res.status(200).end();       
        }
    })
})

router.put("/api/burgers/:id", function(req, res){
    var id = req.params.id;

    db.Burger.update(
        {
            devoured: req.body.devoured,
            CustomerId: req.body.CustomerId
        },
        {
            where: {
                id: id
            }
        }
    ).then(function(results){
        if(results.changedRows == 0){
            return res.status(404).end();
        }else{
            res.status(200).end();       
        }
    })
})
 ```
Project has a Customer model and Customer association.

Customer can have many burgers

customer.js
```javascript
    Customer.associate = function(models) {
        // Associating Customer with Burger
        // When a Customer is deleted, also delete any associated Burgers
        Customer.hasMany(models.Burger, {
            onDelete: "cascade"
        });
    };
```

burger.js
```javascript
    Burger.associate = function(models) {
        // Burger should belong to a Customer
        Burger.belongsTo(models.Customer)
      };
```

Application logs the name of which Customer ate which Burger.