//****Variables****//
var myGamePiece;
var myObstacles = [];
var myPowerUp;
var myScore;
var score;
var highScoreText;
var highScore = 0;
var milestone = 1000;
var milestoneMarker;
var milestoneText = ["0", "0", "0", "M", " ", "R", "E", "A", "C", "H", "E", "D",];
var mileStoneNumber = 0;
//color of the game piece
var cubeColor;

//start button 
var startBtn = document.getElementById('start');


function startGame() {
    cubeColor = document.getElementById("playerColor").value;
    score = 0;
    myGamePiece = new component(45, 45, cubeColor, 10, 120);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    highScoreText = new component("20px", "Consolas", "black", 20, 40, "text");
    myPowerUp =  new component(25, 25, "gold", 700, Math.floor((Math.random()) * 380));
    powerUpText = new component ("15px", "Consolas", "black", myPowerUp.x, myPowerUp.y + 20, "text");
    milestoneMarker = new component(40, myGameArea.height, "green", 700, 0, "milestone");   
    myGameArea.start();
}

//function to call canvas elements when the start button is pressed
startBtn.addEventListener("click", function () {
    startBtn.setAttribute("disabled", true);
    startGame();
});

var myGameArea = {
    canvas : document.getElementById("myCanvas"),
    start : function() {
        this.canvas.width = 680;
        this.canvas.height = 450;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {        
        milestone = 1000;
        mileStoneNumber = 0;
        startBtn.removeAttribute("disabled", true);
        clearInterval(this.interval);        
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.globalAlpha = 1;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } 
        else if (this.type == "milestone") {
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.5;
            ctx.fillRect(this.x, this.y, this.width, this.height);   

            ctx.globalAlpha = 1;
            ctx.font = "30px";
            ctx.fillStyle = "white";

            if (mileStoneNumber > 9) {
                
                ctx.fillText(mileStoneNumber, this.x + 4, this.y + 35  + (25 * 0));
                for (i = 0; i < milestoneText.length; ++i) {
                ctx.fillText(milestoneText[i], this.x + 12, this.y + 60  + (25 * i));
                }
            }
            else {                
                ctx.fillText(mileStoneNumber, this.x + 12, this.y + 35  + (25 * 0));
                for (i = 0; i < milestoneText.length; ++i) {
                ctx.fillText(milestoneText[i], this.x + 12, this.y + 60  + (25 * i));
                }
            }
        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        
            if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                crash = false;
            }
       
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    
    //checks for obstacle collisions and stops the game
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {             
            myGameArea.stop();
            myObstacles = [];  
            return;
        }

        //checks if powerup is drawn over an obstacle
        //if true, power up will be redrawn somewhere else
        if (myPowerUp.crashWith(myObstacles[i])) {
            myPowerUp = new component(25, 25, "gold", 700, Math.floor((Math.random()) * 380)); 
        }
    }

    //checks to see if player moved out of bounds and stops the game  
    if (myGamePiece.x >= 640 || myGamePiece.y <= 0 ||  myGamePiece.x <= -5 || myGamePiece.y >= 413) {          
        myGameArea.stop();
        myObstacles = [];
    }  

    //checks for collisions with any power ups
    //and redraws a new one if true
    if (myGamePiece.crashWith(myPowerUp)) {
        console.log("power up");
        score += 10;
        ctx.fillStyle = "";
        ctx.fillRect(myPowerUp.x, myPowerUp.y, 25, 25);
        myPowerUp = new component(25, 25, "gold", 700, Math.floor((Math.random()) * 380));        
    }

    //redraws power up if it goes beyond the bounds
    //of the canvas
    if (myPowerUp.x < -20) {
        myPowerUp = new component(25, 25, "gold", 700, Math.floor((Math.random()) * 380));      
    }   

    if (everyinterval(1000)) {
        if (score > 1000) {
            milestoneMarker = new component(40, 480, "navy", 680, 0, "milestone");
            mileStoneNumber++;
            milestone += 1000;
        }        
    }

    //clears canvas
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    
    //checks for key pressed events and changes the direction
    //based on the key
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -4; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 4; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -4; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 4; }
    myGameArea.frameNo += 1;
    score += 1;
    if (score > highScore) {
        highScore = score;
    }

    //draws randomly-sized obstacles every interval
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 40;
        maxHeight = 400;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 60;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(25, height, "firebrick", 700, 0));
        myObstacles.push(new component(25, x - height - gap, "firebrick", 700, height + gap));
    }

    //updates milestone markers
    milestoneMarker.x += -1;
    milestoneMarker.update();  

    //updates canvas with obstacles
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }

    //updates the score and the highscore
    //every interval
    myScore.text="SCORE: " + score;
    highScoreText.text = "Highscore: " + highScore;
    highScoreText.update();
    myScore.update();

    //updates power up
    myPowerUp.x += -1;
    myPowerUp.update();          

    //updates the game piece
    myGamePiece.newPos();    
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}