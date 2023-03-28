/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // KEY object that assigns the key number to their respective keys
  // needs w, s, up and down
  var KEY = {
    'W': 87, 
    'S': 83,
    'UP': 38,
    'DOWN': 40
  };
  const BOARD_WIDTH = $('#board').width();
  const BOARD_HEIGHT= $('#board').height();
  // Game Item Objects
  function GameItem(x, y, speedX, speedY, id){
    var item = {
      x: x,
      y: y,
      speedX: speedX,
      speedY: speedY,
      h: $(id).height(),
      w: $(id).width(),
      id: id,
    };
    return item;
  }

  var paddleLeft = GameItem(BOARD_WIDTH-860-$('#paddleLeft').width(), 160, 0, 0, '#paddleLeft');
  var paddleRight = GameItem(BOARD_WIDTH -20- $('#paddleRight').width(), 160, 0, 0, '#paddleRight');
  var ball = GameItem(BOARD_HEIGHT/2, BOARD_HEIGHT/2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3), '#ball');

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  // event listener for keyDown
  $(document).on('keydown', handleKeyDown);                           
  var updatedScore1 = 0;
  var updatedScore2 = 0;
  $('.playAgainButton').hide();
  $('#playerWin').hide();
  //create an event listener for keyup
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame(){
    drawItem(ball);
    drawItem(paddleLeft);
    drawItem(paddleRight);
    updatePosition(paddleLeft);
    updatePosition(paddleRight);
    updatePosition(ball);
    topBottomBoundsBall(ball);
    ballColor();
    doCollide(ball, paddleLeft);
    doCollide(ball, paddleRight);
    ballDirection();
    topBottomBoundsPaddles(paddleRight);
    topBottomBoundsPaddles(paddleLeft);
    rightLeftBoundsBall();
    drawScore();
    handleWinnerInstance();
  }
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.W){
      paddleLeft.speedY = -6;
    }
    if(event.which === KEY.S){
      paddleLeft.speedY = 6;
    }
    if(event.which === KEY.UP){
      paddleRight.speedY = -6;
    }
    if(event.which === KEY.DOWN){
      paddleRight.speedY = 6;
    }
  }
  // function that handles keyup
  function handleKeyUp(event){
    if(event.which === KEY.W || event.which === KEY.S){
      paddleLeft.speedY = 0;
    }
    if(event.which === KEY.UP || event.which === KEY.DOWN){
      paddleRight.speedY = 0;
    }
  }
  // function that handles button click
  $(".playAgainButton").click(function(){
    resetGame();
  });
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function drawItem(obj){
    $(obj.id).css('top', obj.y); // draw an object in the new location on the y axis
    $(obj.id).css('left', obj.x); // draw an object in the new location on the x axis
  }
  // update the position of the object on every frame
  function updatePosition(obj){
    obj.x = obj.x + obj.speedX;
    obj.y = obj.y + obj.speedY;
  }

  //////////////BOUNDS HELPER FUNCTIONS/////////////////

  // function that checks the boundaries of the top and bottom walls
    // ball changes direction
  function topBottomBoundsBall(){
    if(ball.y >= BOARD_HEIGHT - ball.h){
      ball.speedY = ball.speedY*-1;
    }
    else if(ball.y <= BOARD_HEIGHT - BOARD_HEIGHT){
      ball.speedY = ball.speedY*-1;
    }
  }
  // function that checks the boundaries of the right and left walls
    // ball doesnt bounce but it awards a point to the other player
    // ball resets in the middle with default speed
    
  function rightLeftBoundsBall(){
    if (ball.x <= 0){
      updatedScore2++;
      ball.x = BOARD_WIDTH/2;
      ball.y = BOARD_HEIGHT/2;
      ball.speedX = (Math.random() > 0.5 ? -3 : 3);
      ball.speedY = (Math.random() > 0.5 ? -3 : 3);
    }
    if (ball.x >= BOARD_WIDTH - ball.w){
      updatedScore1++;
      ball.x = BOARD_WIDTH/2;
      ball.y = BOARD_HEIGHT/2;
      ball.speedX = (Math.random() > 0.5 ? -3 : 3);
      ball.speedY = (Math.random() > 0.5 ? -3 : 3);
    }
  }
    // function that checks the boundaries for the paddles 
  function topBottomBoundsPaddles(obj){
    if(obj.y >= BOARD_HEIGHT - obj.h){
      obj.speedY = 0;
      obj.y = BOARD_HEIGHT - obj.h;
    }
    if(obj.y <= BOARD_HEIGHT - BOARD_HEIGHT){
      obj.speedY = 0;
      obj.y = BOARD_HEIGHT - BOARD_HEIGHT;
    }
  }
     // do collide function to determine if two objects have collided
  function doCollide(obj1, obj2){
    if(obj1.x <= obj2.x+obj2.w && obj1.x+obj1.w >= obj2.x && obj1.y <= obj2.y+obj2.h
    && obj1.y+obj1.h >= obj2.y){
      return true;
    }
    else{
      return false;
    }
  }
    ////////BALL DIRECTION HELPER FUNCTIONS//////////// 
    // function that checks the signs of the ball speeds and adds if positive then subtracts if negative
  function ballSpeedXY(){
    if(ball.speedX >= 0){
      ball.speedX+=.5;
    }
    else{
      ball.speedX-=.5;
    }
    if(ball.speedY >= 0){
      ball.speedY+=.5;
    }
    else{
      ball.speedY-=.5;
    }
  }

    // function that changes the ball speed/direction when it hits a paddle
  function ballDirection(){
    if(doCollide(ball, paddleLeft)){
      ball.speedX = ball.speedX*-1;                              
      ballSpeedXY();
    }
    else if(doCollide(ball, paddleRight)){
      ball.speedX = ball.speedX*-1;
      ballSpeedXY();
    }
  }

    /////////SCORING FUNCTIONS/////////////////
    // function that will display the score 
  function drawScore(){
    $('#player1Score').text(updatedScore1);
    $('#player2Score').text(updatedScore2);
  }

    //function that will handle winner instance
  function handleWinnerInstance(){
    if (updatedScore1 === 10){
      endGame();
      $('#playerWin').fadeIn(1000);
      $('#playerWin').text("PLAYER 1 WINS!");
      $('.playAgainButton').show();
    }
  
    else if(updatedScore2 === 10){
      endGame();
      $('#playerWin').fadeIn(1500);
      $('#playerWin').text("PLAYER 2 WINS!");
      $('.playAgainButton').show();
    }
  }
  // function that changes the color of the ball to a random color 
  function ballColor(){
    var randomColor = [Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)];
    var rgbArrayToString = randomColor.toString();
    if (doCollide(ball, paddleLeft)){
      $('#ball').css('background-color', 'rgb'+'('+rgbArrayToString+')');
    }
    if (doCollide(ball, paddleRight)){
      $('#ball').css('background-color', 'rgb'+'('+rgbArrayToString+')');
    }
  }

    ///////ENDGAME FUNCTIONS/////////
  function resetGame(){
    paddleLeft = GameItem(BOARD_WIDTH-860-$('#paddleLeft').width(), 160, 0, 0, '#paddleLeft');
    paddleRight = GameItem(BOARD_WIDTH -20- $('#paddleRight').width(), 160, 0, 0, '#paddleRight');
    ball = GameItem(BOARD_HEIGHT/2, BOARD_HEIGHT/2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3), '#ball');
  }

  function endGame(){
    // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
  }
}
