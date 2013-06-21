/* Name: ABGL Cleopatra project
Author: Michael Harley
Date created: 29/10/2011 
E-mail: mickoh27@hotmail.com
Purpose: This program will create the logic for the board game resembling snakes and ladders
in a format to test playability of game.
*/

// Global variable for board
var squares = [];
var throwCount = 0;
var players = [];
var context;
var canvas;

function makeBoard() {
   //get the canvas
   canvas = document.getElementById("canvas");
   //give the canvas a width and a height
   canvas.width = 500;
   canvas.height = 400;
   //get a 2d context of the canvas
   context = canvas.getContext("2d");
   
   players.push(new Player("blue"));
   players.push(new Player("red"));
   
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

// Object for creating squares on board
function Square(newColor, x, y){
   this.color = newColor;
   this.x = x;
   this.y = y;
   
   //Draw the square 
   this.drawSquare = function() {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, 50,50);
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
}

function Player(color) 
{
   var x = 25;
   var y = canvas.height - 25;
   var radius = 20;
   var color = color;
   var started = false;
   var diceTotal = 1;
   this.reverse = false;
   
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
         if (x == 25 && this.reverse == true)
         {
            y -= 50;
            this.reverse = false;
         }
         else if (this.reverse == true)
         {
            x -= 50;
         }
         else if (x >= canvas.width - 25)
         {
            y -= 50;
            this.reverse = true;
         }         
         else if (this.reverse == false)  
         {
            x += 50;
         }
         makeBoard();
         players[0].drawPlayer();
         players[1].drawPlayer();
      }
   }
}

//Function to change amount of times game played.
function times_onchange()
{
   var times = document.form1.times;
   if (isNaN(times.value) == true)
   {
      alert("Please enter a valid amount as integer");
      times.focus();
      times.select();	
   }
}


//Function used to determine stats for user note not a part of the game yet.
function gameBegin()
{
   var highest = 0;
   var lowest = 1000;
   var games = 1;
   var total = 0;
   var count = 0;
   //Board specifics read and array created
   var times = document.form1.times.value;
   var boardCode = document.form1.boardCode.value;
   //Loop begins till all games played.
   while (games <= times)
   {
      var throwCount = getSquare(squares, games);
      total += throwCount;
      if (throwCount > highest)
      {
         highest = throwCount;
      }
      if (throwCount < lowest)
      {
         lowest = throwCount;
      }	
      games++;
   }
   
   //Statistics written to form.
   games = games - 1;
   var sum = total/games;
   var average = sum.toFixed(1);
   var myMessage = window.document.form1.textarea3.value;
   var output = "From " + games + " games created the following statistics :" + "\n"; 
   var output1 = "Highest amount of turns is " + highest + "\n";
   var output2 = "Lowest amount of turns is " + lowest + "\n";
   var output3 = "Average amount of turns for "+ boardCode+ " is " + average;
   myMessage = myMessage + output + output1 + output2 + output3;
   document.form1.textarea3.value = myMessage;
}

