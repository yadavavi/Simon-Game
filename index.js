let gamePattern = [];
let userClickedPattern = [];
let trig = false;
let buttonColours = ["red","blue","green","yellow"];
let level = 0;
function nextSequence(){
    userClickedPattern = [];
level++;

let randomNumber = Math.floor(Math.random()*4);
 
let randomChosenColours = buttonColours[randomNumber];

gamePattern.push(randomChosenColours);

$("#"+ randomChosenColours).fadeOut(100).fadeIn(100).fadeIn(100);

playSound(randomChosenColours);

$("h1").text("Level " + level);


}


$(".btn").click(function(){
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  
  });


  function playSound(name){
    
     let audio = new Audio("sounds/"+name+".mp3");
     audio.play();

  }
 
  function animatePress(currentColour){
     
     $("#"+currentColour).addClass("pressed");
     setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
     },200)

  }


  $(document).on("keydown",function(event){
         let val = $("h1").text();
         
        if( !trig){
            nextSequence();
            trig= true;
            
        }

  })

function checkAnswer(currentLevel){

   if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
       console.log("success");
       if(userClickedPattern.length == gamePattern.length){
           setTimeout(function(){nextSequence()},1000);
       }
   }else {
      let audio = new Audio("sounds/wrong.mp3")
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
     }

}



function startOver(){
    trig = false;
    gamePattern=[];
    level = 0;

}