# sequelizeBurger

# Node Express Handlebars Sequelize

A burger logger with Node, Express, Handlebars and Sequelize. Node and Sequelize are used to query and route data in the app, and Handlebars to generate HTML.

Heroku was used for hosting. And JawsDB was used as a remote database.
Deployed application [here](#)

* Eat-Da-Burger! is a restaurant app that lets users input the names of burgers they'd like to eat.

* Whenever a user submits a burger's name, app will display the burger on the left side of the page.

* Each burger in the waiting area also has a `Devour` button. When the user clicks it, the burger will move to the right side of the page.

* App will store every burger in a database, whether devoured or not.


#### Controllers

* `burgers_controllers.js` contains all the routes:

 ```javascript
//  requiring a models
var db = require("../models");

router.get("/", function(req, res){
    console.log("strating opening route..")
    // displaying all data
    db.Burger.findAll({}).then(function(results){
        var hbsObject = {
            burgers: results
        };
        console.log(hbsObject);
        res.render("index", hbsObject)
    })
});

router.post("/api/burgers", function(req, res){
    console.log(req.body.name);
    // adding new burger
    db.Burger.create({
        burger_name: req.body.name
    }).then(function(){
        console.log("new burger added");
        res.status(200).end();
    })
});

router.put("/api/burgers/:id", function(req, res){
    var id = req.params.id;
    // updating burger (setting property devoured to true)

    db.Burger.update(
        {
            devoured: req.body.devoured
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
