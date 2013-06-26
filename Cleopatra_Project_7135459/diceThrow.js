/* Name: ABGL Cleopatra project
Author: Michael Harley
Date created: 29/10/2011 
last modified 25/06/2013
E-mail: mickoh27@hotmail.com
Purpose: This program will create the logic for the board game resembling snakes and ladders
in a format to test playability of game.
*/

// Function to control player movement called by roll dice button
function getSquare(games)
{
   var limit = 80;
   var players = board.getPlayers();
   
   for (var i = 0; i < numberOfPlayers; i++)
   {
      diceRoll = rollDice(i); 
      var player = players[i];
      var output = document.getElementById(playerArray[i]);
      if (player.getStarted() == true) { 
         player.setSquareNum(diceRoll);
         if (player.getSquareNum() <= limit)
         {
            update(diceRoll, player);
         }
         if (player.getSquareNum() > limit)
         {
            player.setSquareNum(-diceRoll);	
         }	
         player.setSquareNum(SnakeOrLadderTest(player));
         output.innerHTML = player.returnName() + " you are on square " + player.getSquareNum();         
      }
      //Game finishes and and total rolls of the dice are returned for totals
      if (player.getSquareNum() == limit) {
         alert("Congratulations you win game " + player.returnName());
         break;
      }
      if (player.getStarted() == false) {
         if (diceRoll == 6) {
            player.setStarted(true);
            alert("On square " + player.getSquareNum());
            player.drawPlayer();
         }
      }
	}
}


// Function to alert user of dice roll
function rollDice(index)
{
   var players = board.getPlayers();
	var diceRoll = (Math.floor(Math.random() * 6) + 1);
	alert(players[index].returnName() + " rolled a " + diceRoll);
   return diceRoll;
}


// Function that notifies if ladder or snake has been activated
function SnakeOrLadderTest(player)
{
   var x = player.getX();
   var y = player.getY();
   var ladders = board.getLadders();
   var snakes = board.getSnakes();
   //Ladder object identified.
   for (var i = 0; i < ladders.length; i++)
   {
      if (x == ladders[i].getBaseX() && y == ladders[i].getBaseY())
      {
         player.setY(-100);
         alert("You landed on a ladder " + player.returnName());
         drawAllPlayers();
         return 20;
      }
   }
   //Snake object identified.
   for (var j = 0; j < snakes.length; j++)
   {
      if (x == snakes[j].getBaseX() && y == snakes[j].getBaseY())
      {
         player.setY(100);
         alert("You landed on a snake " +player.returnName());
         drawAllPlayers();
         return -20;
      }
   }
   return 0;
}

