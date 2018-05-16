$(document).ready(function(){
    $('.parallax').parallax();
  });

// creating new burger
$(".create-form").on("submit", function(event){
    event.preventDefault();
    function validateFormOne(){
        var isValid = true;
        if($("#newBurgerName").val().trim() === ""){
            isValid=false;
        }
        return isValid;
    }
    if (validateFormOne()){
        // grabbing input
        var newBurger = {
            name:$("#newBurgerName").val().trim()
        }
        console.log($("#newBurgerName").val().trim());
        //sending post request
        $.ajax("/api/burgers", {
            type: "POST",
            data:newBurger
        }).then(function(){
            console.log("added new burger");
            location.reload();
        })
    }
})

// updating burger (setting devoured to true)
$(".eatBurger").on("click", function(){
    function validateFormTwo(){
        var isValid=true;
        var customerLength = $("#customerName").val().trim().length;
        if($("#customerName").val().trim() === ""){
            isValid=false;
        }
        if(customerLength <=1 || customerLength >=21){
            isValid=false;
        }
        return isValid;
    }
    if(validateFormTwo()){
        //grabbing a unique id to define which burger to update
        var uniqueId = $(this).data("burgerid");
        console.log("data: "+ uniqueId);
        var customerName = $("#customerName").val().trim();

        // creating object for burger put request
        // Burger can't be updated before customer was created, because customer is a parent model.
        // we are wrapping request in a function and call it when customer is created
        function updateBurger(){
            var eatenBurger = {
                devoured: 1,
                CustomerId: customerName
            }
            $.ajax("/api/burgers/"+uniqueId, {
                type:"PUT",
                data:eatenBurger
            }).then(function(req, res){
                console.log("burger was devoured");
            })
        }

        // creating object for customer post request
        var customer = {
            name: customerName
        }
        $.ajax("/api/customers", {
            type:"POST",
            data:customer
        }).then(function(){
            console.log("customer was added");
            // updating the burger info
            updateBurger();
            location.reload();
        })
    }
})


