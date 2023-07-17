var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var buttons=$("button");
var userClickedPattern=[];
var level=0;
var started=false;
$("html").click((function() {
    if (!started) {
        $(".container").removeClass("hidden");
        setTimeout(function () {
            nextSequence();
      
      
            started = true;},200);

    }
  }));
$("html").keypress((function() {
    if (!started) {
      nextSequence();
      
      
      started = true;
    }
  }));
//$("html").keypress(function () {level++;});

function nextSequence() {
    level++;
    $("h1").text("Level "+level);
    userClickedPattern=[];
    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //console.log(gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    //buttonAnimation(userChosenColour);
    return randomNumber;
} 
function playSound(names){
    var audio = new Audio("sounds/" + names + ".mp3");
    audio.play();
}

$(".btn").click( function (events) {
    var userChosenColour=events.target.id;
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    buttonAnimation(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}
)
function checkAnswer(currentLevel2) {
    if (userClickedPattern[currentLevel2]===gamePattern[currentLevel2]) {
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            
            nextSequence();},1000);
            
            
        //console.log("right");
    }
    } else {
        gamePattern=[];
        //console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            
            $("body").removeClass("game-over");},600);
        var audio_error = new Audio("sounds/wrong.mp3");
        audio_error.play();
        setTimeout(function () {startOver()},10);
    }
}


function startOver() {
    gamePattern=[];
    $(".container").addClass("hidden");
    $("h1").text("Your last Score = "+ level + ", Press Any Key to Start again");
    level=0;
    started=false;
}
function buttonAnimation(y) {
    var activeButton = $("."+y);
    activeButton.addClass("pressed");
    
    //var activeButton = document.querySelector("."+y);
    //activeButton.classList.add('pressed');
    setTimeout(function () {
        
        activeButton.removeClass("pressed");},100);
}
