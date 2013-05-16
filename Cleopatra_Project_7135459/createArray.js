/* Name: ABGL Cleopatra project
Author: Michael Harley
Date created: 29/10/2011 
E-mail: 7135459@student.swin.edu.au
Purpose: This program will creates the array resembling snakes and ladders
in a format to test playability of game.
*/

function createArray()
{
	//Variables and array specifics created.
	var title = 0;                   var square = 1;         
	var set = 0;                     var index = 0;
	var gameBoard = new Array(100);     
   var limit = gameBoard.length-2;      
   var quit = gameBoard.length;
	//Creating window headings for objects.
	if (title == 0)
	{
		boardDetails();
		title++;
	}	
	beginPrompt(quit);
	for (square = 1; square < gameBoard.length; square++)
	{	
		//User sets the index for a square, if statement in loop to validate index.
		index = getIndex(square, limit, quit);
		//Sets value of 0 to the squares less than the index.
		if (index > square)
		{
			while (index > square)
			{
				gameBoard[square] = 0;
				square++;
			}
		}
		//Sets index to quit setup.
		if (index >= limit)
		{
			index = quit;
		}
		//While loop to validate snake's and ladder's objects if skipset ==0.
		if (index != quit)
		{
			set = prompt("Enter number of target from " + index);
			set = checkEntry(gameBoard, set, limit, square, index);
         gameBoard[square] = set;
			//Exits set up from within the set value to square process.
			if (set == quit)
			{
				gameBoard[index] = 0;
				index = quit;
			}
		}
		//Quiting set up by filling the rest of the array with the value 0.
		if (index == quit || set == quit)
		{
			while (index >= square)
			{
				gameBoard[square] = 0;
				square++;
			}
		}
		//Writing objects as they are created using if statements.
		if (gameBoard[square] > index)
		{
			writeLadder(gameBoard, square);
		}
		if (gameBoard[square] < index)
		{
			writeSnake(gameBoard, square);
		}
	}
	alert("Set up complete");
	//Game board returned to function calling it.
	return gameBoard;
}

//Creating title for ladder objects in form.
function boardDetails()
{
   var myMessage = window.document.form1.textarea1.value;
   var ladder = "Ladder objects are: ";
   myMessage = myMessage + ladder;
   document.form1.textarea1.value = myMessage;
   //Creating title for snake objects in form.
   var message2 = window.document.form1.textarea2.value;
   var snake = "Snake objects are: " + "\n";
   message2 = message2 + snake;
   document.form1.textarea2.value = message2;
   //Starting new line for objects.
   var myMessage = window.document.form1.textarea1.value;
   myMessage = myMessage + "\n";
   document.form1.textarea1.value = myMessage;
}

//Message on setting board
function beginPrompt(quit)
{
	alert("Please Read: \n 1. Change board code each time \n 2. Set sqaures in ascending order \n" +
		" 3. Set up best at 1280 x 800 resolution \n 4. Maximise window (alert box issues)");
	alert("Enter " + quit + " to exit set up when entering numbers");
}

// check index for valid entry
function getIndex(square, limit, quit)
{
   var index = prompt("Enter square number equal to or greater than " + square + 
                     " and less than " + limit);
	index = parseInt(index);
	while (isNaN(index) == true || index < square || index > limit && index != quit)
   {
		index = indexErrorPrompt(index, square, limit);
	}
   return index;
}

//Writing ladder objects to form.
function writeLadder(gameBoard, square)
{
   var output = window.document.form1.textarea1.value;
   var ladderObj = "Square " + square + " has ladder to square " + 
   gameBoard[square] + "\n";
   output = output + ladderObj;
   document.form1.textarea1.value = output;
}

//Writing snake objects to form using for loop.
function writeSnake(gameBoard, square)
{
   var output2 = window.document.form1.textarea2.value;
   var snakeObj = "Square " + square + " has snake to square " + 
   gameBoard[square] + "\n";
   output2 = output2 + snakeObj;
   document.form1.textarea2.value = output2;
}

//If statement checks square if value has been set to or from square.
function checkEntry(gameBoard, set, limit, square, index)
{
   //Validation re-entry if object already on square.
   do {
      for (var check = 0; check < gameBoard.length; check++)
      {  
         if (gameBoard[check] == set || set == index || gameBoard[set] > 0)
         {
            set = setErrorprompt(set, index, limit);
            check = 0;
         }
      }
   } while (isNaN(set) == true || set >= limit && set != quit || set <= 1 || set == index);
   return set;
}

// Error message for index setting errors
function indexErrorPrompt(index, square, limit)
{
   alert(index + " is an invalid entry, please try again");
	index = prompt("Enter square number greater or equal to " + square + 
                  " and less than " + limit);
	index = parseInt(index);
   return index;
}

// Error message for target of index setting errors
function setErrorprompt(set, index, limit)
{
   alert(set + " already used or is equal to current square, please try again");
	set = prompt("Enter number of target to move from " + index + " and less than " 
                + limit);
	set = parseInt(set);
   return set;
}
