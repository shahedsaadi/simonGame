
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

//to keep track whether if the game has started or not, so only call nextSequence() on the first keypress.
var gameHasStarted = false;

// counter, at which level is the user 
var level = 0;

$(document).keydown(function(){
   if(!gameHasStarted){        //gameHasStarted = false , so if statement will excute
    $("#level-title").text("Level " + level); // change h1
    
    nextSequence();
    gameHasStarted = true;
   }
});

$(".btn").click(function(){
    // console.log($(this).attr("id"));
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);   //index of the last item in the user's array.
  })

  function checkAnswer(currentLevel){    // currentLevel = index of last item in userClickedPattern array
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    //  console.log("success");
     if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
     }

    }else{
      // console.log("wrong");

      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);

      startOver();   
    }
}

function nextSequence(){
    //reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++ ; 
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);  
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameHasStarted = false;
}