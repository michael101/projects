/* Name: ABGL Cleopatra project
Author: Michael Harley
Date created: 29/10/2011 
last modified 25/06/2013
E-mail: mickoh27@hotmail.com
Purpose: This program will create the logic for the board game resembling snakes and ladders
in a format to test playability of game.
*/

// Global variable for board
var playerArray = ["player1", "player2", "player3", "player4"];
var context;
var canvas;
var tempPlayers = [];
var tempColors = ["red", "blue", "green", "black"];
var numberOfPlayers = 0;
var playerName = "";
alert("This is a one to four player game vs a computer. \n" +
      "You need a six before you can move from square \n" +
      "one and you need the correct number to land on the \n" +
      "final square");
var board = new Board();
board.createBoard();
initializeLists();
board.fillSquares();

// Board constuctor
function Board() {
   var squares = [];
   var players = [];
   var ladders = [];
   var snakes = [];
   var leftArrows = [];
   var rightArrows = [];
   
   this.getSquares = function() {
      return squares;
   }
   this.getPlayers = function() {
      return players;
   }
   this.getLadders = function() {
      return ladders;
   }
   this.getSnakes = function() {
      return snakes;
   }   
   this.getLeftArrows = function() {
      return leftArrows;
   }
   this.getRightArrows = function() {
      return rightArrows;
   }
   // Get player numbers and names
   this.createBoard = function() {
      while (numberOfPlayers < 1 || numberOfPlayers > 4 || isNaN(numberOfPlayers) == true)
      {
         numberOfPlayers = prompt("How many players to play? (1 to 4)");
      }
      for (var i = 0; i < numberOfPlayers; i++)
      {
         playerName = prompt("What is your name player "+ tempColors[i] + "?");
         tempPlayers.push(playerName);
      }
   }
   // Set the color for each square
   this.fillSquares = function() {
      var x = 0;
      var y = 0;
      for (var i = 0; i < 8; i++) {
         for (var j = 0; j < 10; j++) {
            if (j % 2 == 0 && i % 2 != 0) {
               squares.push(new Square("white", x, y));
            }
            else if (j % 2 != 0 && i % 2 == 0) {
               squares.push(new Square("white", x, y));
            }
            else {
               squares.push(new Square("grey", x, y));
            }
            x += 50;
         }
         x = 0;
         y += 50;
      }
   }
   // Create the board with squares.
   this.fillBoard = function() {
      var index = 0;
        
      for (var i = 0; i < 8; i++) {
         for (var j = 0; j < 10; j++) {
            squares[index++].drawSquare();
         }
      }
      for (var i = 0; i < ladders.length; i++)
      {
         ladders[i].DrawImage();
      }
      for (var i = 0; i < snakes.length; i++)
      {
         snakes[i].DrawImage();
      }
      for (var i = 0; i < leftArrows.length; i++)
      {
         leftArrows[i].DrawImage();
      }
      for (var i = 0; i < rightArrows.length; i++)
      {
         rightArrows[i].DrawImage();
      }
   }
}

// Resets the board for new players
function clearBoard() {
   numberOfPlayers = 0;
   tempPlayers = new Array();
   board = new Board();
   board.createBoard();
   initializeLists();
   board.fillSquares();
   board.fillBoard();
   for (var i = 0; i < playerArray.length; i++)
   {
      var output = document.getElementById(playerArray[i]);
      output.innerHTML = "Player " + Number(i + 1);
   }
}

// Function that recalls the current board and player positions
function makeBoard() {
   //get the canvas
   canvas = document.getElementById("canvas");
   //give the canvas a width and a height
   canvas.width = 500;
   canvas.height = 400;
   //get a 2d context of the canvas
   context = canvas.getContext("2d");
   initializeLists();
   board.fillSquares();
   board.fillBoard();
}

// Hardcoded objects and adding player objects
function initializeLists()
{
   var ladder = new Image();
   ladder.src = "ladder.gif";
   var snake = new Image();
   snake.src = "snake.gif";
   var left = new Image();
   left.src = "left.gif";
   var right = new Image();
   right.src = "right.gif";
   var ladders = board.getLadders();
   var snakes = board.getSnakes();
   var players = board.getPlayers();
   var arrowsLeft = board.getLeftArrows();
   var arrowsRight = board.getRightArrows();
   if (numberOfPlayers == 1) {
      players.push(new Player("red", tempPlayers[0]));
      players.push(new Player("blue", "Computer"));
      numberOfPlayers = 2;
   }
   else {
      for (var i = 0; i < numberOfPlayers; i++)
      {
         players.push(new Player(tempColors[i], tempPlayers[i]));
      }
   }
   ladders.push(new Ladder(ladder, 60, 75, 30, 110));
   ladders.push(new Ladder(ladder, 160, 275, 30, 110));
   ladders.push(new Ladder(ladder, 410, 125, 30, 110));
   snakes.push(new Snake(snake, 260, 275, 30, 110));
   snakes.push(new Snake(snake, 310, 75, 30, 110));
   snakes.push(new Snake(snake, 160, 25, 30, 110));
   arrowsLeft.push(new LeftArrow(left, 460, 10, 30, 30));
   arrowsLeft.push(new LeftArrow(left, 460, 110, 30, 30));
   arrowsLeft.push(new LeftArrow(left, 460, 210, 30, 30));
   arrowsLeft.push(new LeftArrow(left, 460, 310, 30, 30));
   arrowsRight.push(new RightArrow(right, 10, 60, 30, 30));
   arrowsRight.push(new RightArrow(right, 10, 160, 30, 30));
   arrowsRight.push(new RightArrow(right, 10, 260, 30, 30));
   arrowsRight.push(new RightArrow(right, 10, 360, 30, 30));
}


// Object for creating squares on board
function Square(newColor, x, y){
   var color = newColor;
   var x = x;
   var y = y;
      
   //Draw the square 
   this.drawSquare = function() {
      context.fillStyle = color;
      context.fillRect(x, y, 50,50);
   }
}         

function LeftArrow(image, x, y, xs, ys) {
   var image = image;
   var x = x;
   var y = y;
   var xs = xs;
   var ys = ys;
   
   this.DrawImage = function() {
      context.drawImage(image, x, y, xs, ys);
   }
}

function RightArrow(image, x, y, xs, ys) {
   var image = image;
   var x = x;
   var y = y;
   var xs = xs;
   var ys = ys;
   
   this.DrawImage = function() {
      context.drawImage(image, x, y, xs, ys);
   }
}

// Object to manage ladder images
function Ladder(image, x, y, xs, ys) {
   var image = image;
   var x = x;
   var y = y;
   var xs = xs;
   var ys = ys;
   var baseX = x + 15;
   var baseY = y + 100;
   
   this.getBaseX = function() {
      return baseX;
   }
   this.getBaseY = function() {
      return baseY;
   }
   this.DrawImage = function() {
      context.drawImage(image, x, y, xs, ys);
   }
}

// Object to mange snake images
function Snake(image, x, y, xs, ys) {
   var image = image;
   var x = x;
   var y = y;
   var xs = xs;
   var ys = ys;
   var baseX = x + 15;
   var baseY = y;
   
   this.getBaseX = function() {
      return baseX;
   }
   this.getBaseY = function() {
      return baseY;
   }
   this.DrawImage = function() {
      context.drawImage(image, x, y, xs, ys);
   }
}

// Player constructor
function Player(color, name) 
{
   var name = name;
   var x = 25;
   var y = 375;
   var radius = 20;
   var color = color;
   var started = false;
   var diceTotal = 1;
   var reverse = false;
   
   this.returnName = function() {
      return name;
   }
   this.getX = function() {
      return x;
   }   
   this.setX = function(value) {
      x += value;
   }
   this.getY = function() {
      return y;
   }
   this.setY = function(value) {
      y += value;
   }
   this.getStarted = function() {
      return started;
   }
   this.setStarted = function(start) {
      started = start;
   }
   this.getSquareNum = function() {
      return diceTotal;
   }
   this.setSquareNum = function(total) {
      diceTotal += total;
   }
   this.getReverse = function() {
      return reverse;
   }
   this.setReverse = function(value) {
      reverse = value;
   }
   this.drawPlayer = function() {
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI );
      context.fillStyle = color;
      context.fill();
   }
}
   // Game loop update function
function update(moves, player) {   

   for (var i = 0; i < moves; i++)
   {
      if (player.getX() == 25 && player.getReverse() == true)
      {
         player.setY(-50);
         player.setReverse(false);
      }
      else if (player.getReverse() == true)
      {
         player.setX(-50);
      }
      else if (player.getX() >= canvas.width - 25)
      {
         player.setY(-50);
         player.setReverse(true);
      }         
      else if (player.getReverse() == false)  
      {
         player.setX(50);
      }
      drawAllPlayers();
   }
}

// Draws the appropriate amount of players positions
function drawAllPlayers() {
   var players = board.getPlayers();
   makeBoard();
   players[0].drawPlayer();
   players[1].drawPlayer();
   if (numberOfPlayers > 2) {
      players[2].drawPlayer();
   } 
   if (numberOfPlayers == 4) {
      players[3].drawPlayer();
   }
}


