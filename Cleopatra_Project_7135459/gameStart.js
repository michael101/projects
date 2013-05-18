/* Name: ABGL Cleopatra project
Author: Michael Harley
Date created: 29/10/2011 
E-mail: 7135459@student.swin.edu.au
Purpose: This program will create the logic for the board game resembling snakes and ladders
in a format to test playability of game.
*/

function makeBoard() {
   //get the canvas
   var canvas = document.getElementById("canvas");
   //give the canvas a width and a height
   canvas.width = 500;
   canvas.height = 400;
   //get a 2d context of the canvas
   var x = 0;
   var y = 0;
   var context = canvas.getContext("2d");
   for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
         if (j % 2 == 0 && i % 2 != 0) {
            context.fillStyle = 'grey';
            context.fillRect(x,y,50,50);
         }
         else if (j % 2 != 0 && i % 2 == 0) {
            context.fillStyle = 'grey';
            context.fillRect(x,y,50,50);
         }
         else {
            context.fillStyle = 'white';
            context.fillRect(x,y,50,50);
         }
         x += 50;
      }
      x = 0;
      y += 50;
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

//Function that creates array and returns results at end.
function createGame_onclick()
{
   var gameBoard = createArray();
   gameBegin(gameBoard);
}

//Function used to determine stats for user.
function gameBegin(gameBoard)
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
      var throwCount = getSquare(gameBoard, games);
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
