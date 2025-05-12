
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var started = false
var level = 0


$(document).keydown(function(){
    if(!started){
    $("#level-title").text("level "+ level);
    nextSequence();
    started = true;
    }
});

$(document).on("touchstart", function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function(){
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);

playSound(userChosenColour);
animatePress(userChosenColour);

checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
        setTimeout (function(){
            nextSequence();

        }, 1000);
    }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over Homie,press any key to Restart");
        
        setTimeout (function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
};

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber = Math.floor( Math.random()* 4);
    var randomChosencolour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosencolour);

    $("#" + randomChosencolour).addClass("flash");

    setTimeout(function (){
        $("#" + randomChosencolour).removeClass("flash");
    
    },200
);
playSound(randomChosencolour);
};

function animatePress(currentcolour){
$("."+ currentcolour).addClass("pressed");

setTimeout(function(){
    $("."+ currentcolour).removeClass("pressed");
}, 100);
};

function playSound(name){
    var audio = new Audio("sounds/"+name+ ".mp3");
    audio.play();
    
};


function startOver(){
    level = 0
    gamePattern = [];
    started = false;

};




