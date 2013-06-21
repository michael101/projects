/* Name: ABGL Cleopatra project
Author: Michael Harley
Date created: 29/10/2011 
E-mail: mickoh27@hotmail.com
Purpose: This program will create the logic for the board game resembling snakes and ladders
in a format to test playability of game.
*/

// Global variable for board
var squares = [];
var gameStarted = false;
var throwCount = 0;
var diceTotal = 1;
var player;
var context;
var reverse = false;

function makeBoard() {
   //get the canvas
   var canvas = document.getElementById("canvas");
   //give the canvas a width and a height
   canvas.width = 500;
   canvas.height = 400;
   //get a 2d context of the canvas
   context = canvas.getContext("2d");
   
   var x = 0;
   var y = 0;
   var num = 0;
   
   for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 10; j++) {
         if (j % 2 == 0 && i % 2 != 0) {
            squares.push(new Square(num, "grey", x, y));
         }
         else if (j % 2 != 0 && i % 2 == 0) {
            squares.push(new Square(num, "grey", x, y));
         }
         else {
            squares.push(new Square(num, "white", x, y));
         }
         x += 50;
         num++;
      }
      x = 0;
      y += 50;
   }
   fillBoard();
}

// Object for creating squares on board
function Square(num, newColor, x, y){
   this.index = num;
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
   this.x = 25,
   this.y = canvas.height - 25,
   this.radius = 20,
   this.color = "blue";
   
   
   this.drawPlayer = function() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI );
      context.fillStyle = this.color;
      context.fill();
   }
   // Game loop update function
   this.update = function(moves) {    
      for (var i = 0; i < moves; i++)
      {
         if (this.x == 25 && reverse == true)
         {
            this.y -= 50;
            reverse = false;
         }
         else if (reverse == true)
         {
            this.x -= 50;
         }
         else if (this.x >= canvas.width - 25)
         {
            this.y -= 50;
            reverse = true;
         }         
         else if (reverse == false)  
         {
            this.x += 50;
         }
         makeBoard();
         this.drawPlayer();
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

