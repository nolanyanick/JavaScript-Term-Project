//function to draw the canvas and all other elements 
var canvasElements = (function () {

  //function to draw the snake body
  var bodySnake = function(x, y) {
    ctx.fillStyle = snakeFill;
    ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);    
  }

  //function to draw food
  var powerUp = function(x, y) {

    //outline color
    ctx.fillStyle = foodFill;
    ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);

  }

  //function to draw score
  var scoreText = function() {
    var score_text = "Score: " + score;
    ctx.fillStyle = 'blue';
    ctx.font="15px Impact";
    ctx.fillText(score_text, 10, 20);
  }

  //funciton to draw game over text
  var gameOverText = function() {    
    ctx.fillStyle = "red";
    ctx.font="30px Impact";
    ctx.fillText("GAME OVER", 159, (canvasHeight / 2) - 40);
    ctx.fillStyle = "blue";
    ctx.fillText("Your Score: " + score , 148, (canvasHeight / 2) + 16);
  }

  //function to draw the initial snake
  var drawSnake = function() {    
    snake = [];
    for (var i = length-1; i>=0; i--) {
      snake.push({
        x:(i + 11), y:28
      });
    }  
  }

  //function to draw everything each interval
  var paint = function(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeStyle = 'ligthblue';
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
    
    //disable button while playing
    startBtn.setAttribute('disabled', true);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    //changes the direction of snake
    if (direction == 'right') { 
      snakeX++; 
    }
    else if (direction == 'left') { 
      snakeX--; 
    }
    else if (direction == 'up') { 
      snakeY--; 
    } 
    else if(direction == 'down') { 
      snakeY++; 
    }

    //checks to see has any collisions with boundries or with the snake
    if (snakeX == -1 || snakeX == canvasWidth/snakeSize || snakeY == -1 || snakeY == canvasHeight/snakeSize || checkCollision(snakeX, snakeY, snake)) {
        //reset button to allow a restart
        startBtn.removeAttribute('disabled', true);
        
        //remove canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        gameOverText();

        //reset score
        console.log("Score: " + score)
        score = 0;
        

        //set new colors for a new snake and food
        snakeFill = fillColor[Math.floor(Math.random()*fillColor.length)];
        foodFill = fillColor[Math.floor(Math.random()*fillColor.length)];


        //stop gameloop and return
        gameloop = clearInterval(gameloop);
        return;          
    }
    
    //checks to see if the snake eats food
    //and then creates a new food if true
    if(snakeX == food.x && snakeY == food.y) {
    
      var tail = {x: snakeX, y: snakeY};

      //increment score
      score ++;
      
      //change snake colors
      snakeFill = foodFill;

      //change food colors
      foodFill = fillColor[Math.floor(Math.random()*fillColor.length)];

      createFood();
    }
    else {
      var tail = snake.pop();
      tail.x = snakeX; 
      tail.y = snakeY;
    }
    
    //moves last square to the front of the sanke body
    snake.unshift(tail);

    for(var i = 0; i < snake.length; i++) {
      bodySnake(snake[i].x, snake[i].y);
    } 
    
    powerUp(food.x, food.y); 
    scoreText();
  }

  //draws food using random coordimates
  //and verifys it's location
  var createFood = function() {
    food = {
      x: Math.floor((Math.random() * 30)),
      y: Math.floor((Math.random() * 30))
    }

    for (var i=0; i>snake.length; i++) {
      var snakeX = snake[i].x;
      var snakeY = snake[i].y;
    
      if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
        food.x = Math.floor((Math.random() * 30));
        food.y = Math.floor((Math.random() * 30));
      }
    }
  }

  //checks for any collisions
  var checkCollision = function(x, y, array) {
    for(var i = 0; i < array.length; i++) {
      if(array[i].x === x && array[i].y === y)
      return true;
    } 
    return false;
  }

  //intializes the direction, draws the initial snake,
  //draws the first food item, and starts the game loop
   var init = function(){
    direction = 'up';
    drawSnake();
    createFood();
    gameloop = setInterval(paint, 100);
  }
  
  return {
    init : init
  };  

}());