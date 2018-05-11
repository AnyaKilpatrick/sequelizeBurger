var express = require("express");
var router = express.Router();

var db = require("../models");

router.get("/", function(req, res){
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
    db.Burger.create({
        burger_name: req.body.name
    }).then(function(){
        console.log("new burger added");
        res.status(200).end();
    })
});

router.put("/api/burgers/:id", function(req, res){
    var id = req.params.id;

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

module.exports = router;