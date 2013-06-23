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
         //If that keeps user on square if total greater than the finish target. 
         players[i].setSquareNum(diceRoll);
         if (players[i].getSquareNum() <= limit)
         {
            if (i == 0)
            {
               players[0].update(diceRoll);
            }
            else
            {
               players[1].update(diceRoll);
            }
         }
         if (players[i].getSquareNum() > limit)
         {
            players[i].setSquareNum(-diceRoll);	
         }	
         players[i].setSquareNum(SnakeOrLadderTest(players[i]));
      }
      //Game finishes and and total rolls of the dice are returned for totals
      if (players[i].getSquareNum() == limit) {
         var player = Number(i + 1);
         alert("Congratulations you win game player " + player);
         return throwCount;
      }
      if (players[i].getStarted() == false) {
         if (diceRoll == 6) {
            players[i].setStarted(true);
            alert("On square " + players[i].getSquareNum());
            players[i].drawPlayer();
         }
         throwCount++;
      }
	}
	return throwCount;
}

// Function to alert user of dice roll
function rollDice(index)
{
   var player = Number(index +1);
	alert("Rolling dice for player " + player);
	var diceRoll = (Math.floor(Math.random() * 6) + 1);
	alert(diceRoll);
   return diceRoll;
}

// Function that notifies if ladder or snake has been activated
function SnakeOrLadderTest(player)
{
   var x = player.getX();
   var y = player.getY();
   //Ladder object identified.
   if ((x == 175 && y == 375) || (x == 75 && y == 175) ||
       (x == 425 && y == 225))
   {
      player.setY(-100);
      player.update(0);
      return 20;
   }
   //Snake object identified.
   else if((x == 275 && y == 275) || (x == 175 && y == 25) || 
           (x == 325 && y == 75))
   {
      player.setY(100);
      player.update(0);
      return -20;
   }
   return 0;
}