/* Name: ABGL Cleopatra project
Author: Michael Harley
Date created: 29/10/2011 
E-mail: mickoh27@hotmail.com
Purpose: This program will create the logic for the board game resembling snakes and ladders
in a format to test playability of game.
*/


function getSquare(games)
{
   var limit = 80;
   for (var i = 0; i < 2; i++)
   {
      diceRoll = rollDice(i); 
      if (players[i].getStarted() == true) { 
         players[i].setSquareNum(diceRoll);
         if (players[i].getSquareNum() <= limit)
         {
            players[i].update(diceRoll);
         }
         if (players[i].getSquareNum() > limit)
         {
            players[i].setSquareNum(-diceRoll);	
         }	
         players[i].setSquareNum(SnakeOrLadderTest(players[i]));
      }
      //Game finishes and and total rolls of the dice are returned for totals
      if (players[i].getSquareNum() == limit) {
         alert("Congratulations you win game " + players[i].returnName());
         break;
      }
      if (players[i].getStarted() == false) {
         if (diceRoll == 6) {
            players[i].setStarted(true);
            alert("On square " + players[i].getSquareNum());
            players[i].drawPlayer();
         }
      }
	}
}


// Function to alert user of dice roll
function rollDice(index)
{
	var diceRoll = (Math.floor(Math.random() * 6) + 1);
	alert(players[index].returnName() + " rolled a " + diceRoll);
   return diceRoll;
}


// Function that notifies if ladder or snake has been activated
function SnakeOrLadderTest(player)
{
   var x = player.getX();
   var y = player.getY();
   //Ladder object identified.
   for (var i = 0; i < ladders.length; i++)
   {
      if (x == ladders[i].getBaseX() && y == ladders[i].getBaseY())
      {
         player.setY(-100);
         alert("You landed on a ladder " +player.returnName());
         makeBoard();
         players[0].drawPlayer();
         players[1].drawPlayer();
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
         makeBoard();
         players[0].drawPlayer();
         players[1].drawPlayer();
         return -20;
      }
   }
   return 0;
}

