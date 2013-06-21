/* Name: ABGL Cleopatra project
Author: Michael Harley
Date created: 29/10/2011 
E-mail: 7135459@student.swin.edu.au
Purpose: This program will create the logic for the board game resembling snakes and ladders
in a format to test playability of game.
*/

function getSquare(games)
{
   var limit = 80;
   diceRoll = rollDice(); 
	if (gameStarted == true) {
      //If that keeps user on square if total greater than the finish target. 
      diceTotal += diceRoll;
      if (diceTotal <= limit)
      {
         player.update(diceRoll);
         alert("On square " + diceTotal);
      }
		if (diceTotal > limit)
		{
			diceTotal -= diceRoll;	
		}	
      diceTotal = SnakeOrLadderTest(diceTotal);
	}
	//Game finishes and and total rolls of the dice are returned for totals
   if (diceTotal == limit) {
      alert("Congratulations you win game");
   }
   if (gameStarted == false) {
      if (diceRoll == 6) {
         gameStarted = true;
         alert("On square " + diceTotal);
         player = new Player();
         player.drawPlayer();
      }
      throwCount++;
	}
	return throwCount;
}

// Function to alert user of dice roll
function rollDice()
{
	alert("Rolling dice");
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