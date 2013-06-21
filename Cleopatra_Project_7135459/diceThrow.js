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
               players[1].update();
            }
            else
            {
               players[1].update(diceRoll);
               players[0].update();
            }
         }
         if (players[i].getSquareNum() > limit)
         {
            players[i].setSquareNum(-diceRoll);	
         }	
         //players[i].setSquareNum(SnakeOrLadderTest(player[i].getSquareNum()));
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
function SnakeOrLadderTest(diceTotal)
{
   //Ladder object identified.
   if (diceTotal < squares[diceTotal] && squares[diceTotal] != 0)
   {
      alert("Square " + diceTotal + " = landed on ladder");
      diceTotal = squares[diceTotal];
   }
   //Snake object identified.
   else if	(diceTotal > squares[diceTotal] && squares[diceTotal] != 0)
   {
      alert("Square " + diceTotal + " = landed on snake");
      diceTotal = squares[diceTotal];
   }
   return Number(diceTotal);
}