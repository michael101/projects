/* Name: ABGL Cleopatra project
Author: Michael Harley
Date created: 29/10/2011 
last modified 25/06/2013
E-mail: mickoh27@hotmail.com
Purpose: This program will create the logic for the board game resembling snakes and ladders
in a format to test playability of game.
*/

// Function to control player movement called by roll dice button
function getSquare()
{
   var limit = 80;
   var players = board.getPlayers();
   var player = players[index];
   var output = document.getElementById(playerArray[index]);
   
   diceRoll = rollDice(player);
   if (player.getStarted() == true) 
   { 
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
   if (player.getSquareNum() == limit) 
   {
      alert("Congratulations you win game " + player.returnName());
      player.setGamesWon();
      gamesPlayed++;
      displayGamesLeader(players);
      if (gamesPlayed == numberOfGames) 
      {
         displayGamesWinner(players);
      }
   }
   if (player.getStarted() == false) 
   {
      if (diceRoll == 6) 
      {
         player.setStarted(true);
         alert("On square " + player.getSquareNum());
         player.drawPlayer();
      }
   }
   if (index >= numberOfPlayers -1) 
   {
      index = 0;
   } 
   else 
   {
      index++;
   }
}

function displayGamesLeader(players) 
{
   var highest = 0;
   var output = document.getElementById("stats");
   var player;
   makeBoard();
   for (var i = 0; i < players.length-1; i++)
   {
      players[i].resetX(25);
      players[i].resetY(375);
      players[i].resetSquareNum();
      players[i].setStarted(false);
      players[i].setReverse(false);
      if (players[i].getGamesWon() > highest)
      {
         highest = players[i].getGamesWon();
         player = players[i];
      }
   }
   output.innerHTML = player.returnName() + " is winning on " + player.getGamesWon() + " games won!" ;
}

function displayGamesWinner(players) 
{
   var highest = 0;
   var output = document.getElementById("stats");
   var player;
   makeBoard();
   for (var i = 0; i < players.length; i++)
   {
      players[i].resetX(25);
      players[i].resetY(375);
      players[i].resetSquareNum();
      players[i].setStarted(false);
      players[i].setReverse(false);
      if (players[i].getGamesWon() > highest)
      {
         highest = players[i].getGamesWon();
         player = players[i];
      }
   }
   output.innerHTML = player.returnName() + " won";
}
// Function to alert user of dice roll
function rollDice(player)
{
   var players = board.getPlayers();
	var diceRoll = (Math.floor(Math.random() * 6) + 1);
	alert(player.returnName() + " rolled a " + diceRoll);
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

