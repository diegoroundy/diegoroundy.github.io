/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var WALKER1 = $("#walker1");
  var WALKER2 = $("#walker2");
  var WALKER_WIDTH = $("#walker1").width();
  var WALKER_HEIGHT = $("#walker1").height();
  var WALKER2_WIDTH = $("#walker2").width();
  var WALKER2_HEIGHT = $("#walker2").height();
  var BOARD_WIDTH = $("#board").width();
  var BOARD_HEIGHT = $("#board").height();
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
    "W": 87,
    "A": 65,
    "S": 83,
    "D": 68,
  };
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);    // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;
  var positionX2 = 0;
  var positionY2 = 0;
  var speedX2 = 0;
  var speedY2 = 0;
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    borderLimit();
    collide(WALKER1, WALKER2);
  }
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT){
      speedX = -5;
    }
    else if (event.which === KEY.UP){
      speedY = -5;
    }
    else if (event.which === KEY.RIGHT){
      speedX = 5;
    }
    else if (event.which === KEY.DOWN){
      speedY = 5;
    }
    else if (event.which === KEY.W){
      speedY2 = -5;
    }
    else if (event.which === KEY.A){
      speedX2 = -5;
    }
    else if (event.which === KEY.S){
      speedY2 = 5; 
    }
    else if (event.which === KEY.D){
      speedX2 = 5;
    }
  }
 
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
  }
  function repositionGameItem(){
    positionX += speedX;
    positionY += speedY;
    positionX2 += speedX2;
    positionY2 += speedY2;
  }
  function redrawGameItem(){
    WALKER1.css("top", positionY);
    WALKER1.css("left", positionX);
    WALKER2.css("top", positionY2);
    WALKER2.css("left", positionX2);
  }
  function handleKeyUp(event){
    speedX = 0;
    speedY = 0;
    speedX2 = 0;
    speedY2 = 0;

  }
  function borderLimit(){
    if (positionX > BOARD_WIDTH - WALKER_WIDTH){
      positionX = BOARD_WIDTH - WALKER_WIDTH;
    }
    else if (positionX < 0){
      positionX = 0;
    }
    else if (positionY > BOARD_HEIGHT - WALKER_HEIGHT){
      positionY = BOARD_HEIGHT - WALKER_HEIGHT;
    }
    else if (positionY < 0){
      positionY = 0;
    }
    else if (positionX2 > BOARD_WIDTH - WALKER2_WIDTH){
      positionX2 = BOARD_WIDTH - WALKER2_WIDTH;
    }
    else if (positionX2 < 0){
      positionX2 = 0;
    }
    else if (positionY2 > BOARD_HEIGHT - WALKER2_HEIGHT){
      positionY2 = BOARD_HEIGHT - WALKER2_HEIGHT;
    }
    else if (positionY2 < 0){
      positionY2 = 0;
    }
  };
  // 3rd challenge code.
    function collide(walker1, walker2){
      walker1.leftX = walker1.positionX;
      walker1.rightX = walker1.positionX + WALKER_WIDTH;
      walker1.topY = walker1.positionY;
      walker1.bottomY = walker1.positionY + WALKER_HEIGHT;

      walker2.leftX = walker2.positionX2;
      walker2.rightX = walker2.positionX2 + WALKER2_WIDTH;
      walker2.topY = walker2.positionY2;
      walker2.bottomY = walker2.positionY2 + WALKER2_HEIGHT;

     if (walker2.rightX > walker1.leftX
      && walker2.leftX < walker1.rightX &&
      walker2.bottomY > walker1.topY &&
      walker2.topY < walker1.bottomY){
        console.log("collision");
     }
    }

}
