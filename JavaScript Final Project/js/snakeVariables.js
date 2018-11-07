//**VARIABLES**//

//canvas
var mycanvas = document.getElementById("canvas"),

//canvas context
ctx = mycanvas.getContext("2d"),

//width and height of the canvas
canvasWidth = 450,
canvasHeight = 450,

//variable for the score
score = 0,

//variable for the snake
snake = [],
length = 4,

//int used to set to size of the snake and food
snakeSize = 15,

//variable for food
food,

//color vars
fillColor = ["red", "blue", "chartreuse", "green", "yellow", "orange", "purple", "cyan", "darkcyan", "darksalmon", "mediumspringgreen", "royalblue", "skyblue" , "deeppick", "fuchsia", "gold", "turquoise "],
snakeFill = fillColor[Math.floor(Math.random()*fillColor.length)],
foodFill = fillColor[Math.floor(Math.random()*fillColor.length)];