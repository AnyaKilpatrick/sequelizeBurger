$(document).ready(function(){
    $('.parallax').parallax();
  });

// creating new burger
$(".create-form").on("submit", function(event){
    event.preventDefault();
    function validateForm(){
        var isValid = true;
        if($("#newBurgerName").val().trim() === ""){
            isValid=false;
        }
        return isValid;
    }
    if (validateForm()){
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
    //grabbing a unique id to define which burger to update
    var uniqueId = $(this).data("burgerid");
    console.log("data: "+ uniqueId);
    // 
    var eatenBurger = {
        devoured: 1
    }
    $.ajax("/api/burgers/"+uniqueId, {
        type:"PUT",
        data:eatenBurger
    }).then(function(){
        console.log("burger was devoured");
        location.reload();
    })
})


