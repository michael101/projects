/* Name: ABGL Cleopatra project
Author: Michael Harley
Date created: 29/10/2011 
E-mail: 7135459@student.swin.edu.au
Purpose: This program will create the logic for the board game resembling snakes and ladders
in a format to test playability of game.
*/

function getSquare(gameBoard, games)
{
	//Creating the variables that are used to determine square and statistics.
	var throwCount = 0;
	var diceTotal = 0;
   var diceRoll = 0;
	var limit = gameBoard.length-1;
	//While loop that takes the user to square 0 and then begins game.
	alert("Rolling dice for game " + games);
	while (diceRoll != 6)
	{
      diceRoll = rollDice();
      throwCount++;
	}
	//A while loop that gets the accumulated total and checks condition for win.
	while (diceTotal != limit)
	{
      //Alerting user to diceroll amount and square landed on.
		alert("On square " + diceTotal);
      diceRoll = rollDice();
      throwCount++;
      diceTotal += Number(diceRoll);
		diceTotal = SnakeOrLadderTest(diceTotal, gameBoard);
		//If that keeps user on square if total greater than the finish target. 
		if (diceTotal > limit)
		{
			diceTotal -= diceRoll;	
		}	
	}
	//Game finishes and and total rolls of the dice are returned for totals
	alert("Congratulations you win game");
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
function SnakeOrLadderTest(diceTotal, gameBoard)
{
   //Ladder object identified.
   if (diceTotal < gameBoard[diceTotal] && gameBoard[diceTotal] != 0)
   {
      alert("Square " + diceTotal + " = landed on ladder");
      diceTotal = gameBoard[diceTotal];
   }
   //Snake object identified.
   else if	(diceTotal > gameBoard[diceTotal] && gameBoard[diceTotal] != 0)
   {
      alert("Square " + diceTotal + " = landed on snake");
      diceTotal = gameBoard[diceTotal];
   }
   return Number(diceTotal);
}