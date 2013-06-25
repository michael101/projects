/* Name: ABGL Cleopatra project
Author: Michael Harley
Date created: 29/10/2011 
E-mail: mickoh27@hotmail.com
Purpose: This program will create the logic for the board game resembling snakes and ladders
in a format to test playability of game.
*/


// Global variable for board
var squares = [];
var players = [];
var context;
var canvas;
var ladders = [];
var snakes = [];
alert("This is a one player game vs a computer. \n" +
      "You need a six before you can move from square \n" +
      "one and you need the correct number to land on the \n " +
      " final square");
var playerName = prompt("What is your name?");

function makeBoard() {
   //get the canvas
   canvas = document.getElementById("canvas");
   //give the canvas a width and a height
   canvas.width = 500;
   canvas.height = 400;
   //get a 2d context of the canvas
   context = canvas.getContext("2d");
   
   initializeLists();
   
   var x = 0;
   var y = 0;
   
   for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 10; j++) {
         if (j % 2 == 0 && i % 2 != 0) {
            squares.push(new Square("grey", x, y));
         }
         else if (j % 2 != 0 && i % 2 == 0) {
            squares.push(new Square("grey", x, y));
         }
         else {
            squares.push(new Square("white", x, y));
         }
         x += 50;
      }
      x = 0;
      y += 50;
   }
   fillBoard();
}

function initializeLists()
{
   var ladder = new Image();
   ladder.src = "ladder.gif";
   var snake = new Image();
   snake.src = "snake.gif";
   players.push(new Player("blue", playerName));
   players.push(new Player("red", "computer"));
   ladders.push(new Ladder(ladder, 60, 75, 30, 110));
   ladders.push(new Ladder(ladder, 160, canvas.height -125, 30, 110));
   ladders.push(new Ladder(ladder, 410, 125, 30, 110));
   snakes.push(new Snake(snake, 260, 275, 30, 110));
   snakes.push(new Snake(snake, 310, 75, 30, 110));
   snakes.push(new Snake(snake, 160, 25, 30, 110));
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


// Create the board with squares.
function fillBoard() {
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
}

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

function Player(color, name) 
{
   var name = name;
   var x = 25;
   var y = canvas.height - 25;
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
   this.getY = function() {
      return y;
   }
   this.setY = function(object) {
      y += object;
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
   this.drawPlayer = function() {
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI );
      context.fillStyle = color;
      context.fill();
   }
   // Game loop update function
   this.update = function(moves) {    
      for (var i = 0; i < moves; i++)
      {
         if (x == 25 && reverse == true)
         {
            y -= 50;
            reverse = false;
         }
         else if (reverse == true)
         {
            x -= 50;
         }
         else if (x >= canvas.width - 25)
         {
            y -= 50;
            reverse = true;
         }         
         else if (reverse == false)  
         {
            x += 50;
         }
         makeBoard();
         players[0].drawPlayer();
         players[1].drawPlayer();
      }
   }
}

