/* 
* Global variables for the game
*/
var input;
var name = "";
var myMessage;
var player;
var game;


/* 
*jQuery functions to present the page
* ready for the player's selection
*/ 
$(document).ready(function(){
   $("#screen").hide();
   $("#gameBegin").click(function() {
      name = window.document.form1.playerName.value;
      input = get_radio_value();
      $("#screen").fadeIn("slow");
      $(".prompt").hide();
      $("#screen").before("<p id=\"player\">Character: "+name+" the "+input+"</p>");
      $("#proceed").fadeIn("fast");
      if (input === "Barbarian") {
         $("#character").before("<img id=\"character\" src=\"barbarian.jpg\" alt=\"barbarian\"/>");
      } else {
         $("#character").before("<img id=\"character\" src=\"dwarf.jpg\" alt=\"dwarf\"/>");
      }
      beginMessage();
      $("#player").after("<p id=\"stats\">Health: " + player.getType().health + 
                         "  Armour: " + player.getType().defence + 
                         "  Weapon: " + player.getType().weapon + "</p>");
      $("#eventImage").after(alertArray[0]);
   });
   $("#proceed").click(function() {
      game.engine();
   });
   $("#reset").click(function() {
      reset();
   });
});

/*
* Array that holds the images for the game
*/
var alertArray = ["<image id=\"alerts\" src=\"begin.jpg\" alt=\"start image\"/>",
                  "<image id=\"alerts\" src=\"shop.jpg\" alt=\"shop\"/>",
                  "<image id=\"alerts\" src=\"armour.jpg\" alt=\"armour\"/>",
                  "<image id=\"alerts\" src=\"health.jpg\" alt=\"potion\"/>",
                  "<image id=\"alerts\" src=\"nothing.jpg\" alt=\"exclamation point\"/>",
                  "<image id=\"alerts\" src=\"trap.jpg\" alt=\"trap picture\"/>",
                  "<image id=\"alerts\" src=\"troll.jpg\" alt=\"troll picture\"/>",
                  "<image id=\"alerts\" src=\"weapon.jpg\" alt=\"weapon\"/>"];

/* 
* Function to check wich radio button the player
* has selected
*/              
function get_radio_value()
{
   for (var i=0; i < document.form1.character.length; i++)
   {
      if (document.form1.character[i].checked)
      {
         return document.form1.character[i].value;
      }
   }
   return undefined;
}

/*
* Hides on shows selections available to player
*/
function reset() {
   var checkExit = confirm("Do you want to reset game?");
   if (checkExit === true) {
      $("#screen").hide();
      $("#player").remove();
      $("#alerts").remove();
      $("#character").remove();
      $(".prompt").fadeIn("slow");
      $("#stats").remove();
      game.nextlevel = true;
   } else {
      myMessage = "\nLets continue your quest: " + name;
      document.form1.textarea3.value = myMessage;
   }
}

/*
* Creates charater and welcome message
*/
function beginMessage() {
   myMessage = window.document.form1.textarea3.value;
   if (input === undefined) {
      alert("Character not selected. Please select character");
      reset();
   } else if (input === "Barbarian") {
      input = new Barbarian();
   } else {
      input = new Dwarf();
   }
   player = new Character(name, input);
   game = new GameBoard(player);
   myMessage = "You have begun your quest: " + name;
   myMessage += "\nYou are in a valley you can move N, E, S, and W";
   document.form1.textarea3.value = myMessage;
}

function GameBoard(player) {
   var newPlayer = player;
   this.level = new Level(0);
   var score = 0;
   var nextLevel = true;
   this.foes;
   this.getNewPlayer = function() {
      return newPlayer;
   }
   this.getScore = function() {
      return score;
   }
   // Main call to test level, directions and combat
   this.engine = function() {
      var travel;
      if (nextLevel === true) {
         var newLevel = this.level.getLevel() + 1;
         nextLevel = false;
         newPlayer.getType().health += 5;
         newPlayer.getType().skill += 1;
         this.level = new Level(newLevel);
         this.updateStats();
      }
      do {
         travel = prompt("Which direction will you travel?").toUpperCase();
      } while (travel === null);
      var fight = this.level.testDirection(travel);
      if (fight === 3) {
         this.foes = new Foes(this.level.getLevel(), new Troll());
         myMessage = "You have encountered " + this.foes.getTrollNum() + " trolls";
         document.form1.textarea3.value = myMessage;
         this.combat(this.foes);
      }
      this.updateStats();
      if (newPlayer.getType().health > 0) {
         if (this.level.testLevel() === true) {
            nextLevel = true;
         }
      }
      if (newPlayer.getType().health <= 0) {
         $("#proceed").hide();
         myMessage += "\nYou have run out of health, better luck next time";
         document.form1.textarea3.value = myMessage;
      }
   }   
   // Call to combat with trolls
   this.combat = function(foes){
      var fight = confirm("Do you wish to fight? (confirm)");
      while(fight) {
         var playerDamage = newPlayer.attack();
         alert("You have done " + playerDamage + " to the trolls");
         score += playerDamage;
         foes.health -= playerDamage;
         if (foes.health <= 0) {
            myMessage = "You have defeated the " + foes.getTrollNum() + " trolls";
            break;
         }
         var trollDamage = foes.trollAttack() - newPlayer.getType().defence;
         if (trollDamage < 0) {
            trolldamage = 0;
         }
         alert("The trolls do " + trollDamage + " damage");
         newPlayer.getType().health -= trollDamage;
         if (newPlayer.getType().health <= 0) {
            myMessage += "\nYou have been defeated by the trolls! You scored " + score;
            $("#proceed").hide();
            break;
         }
         this.updateStats();
         fight = confirm("Do you wish to fight? (confirm)");
      }
      document.form1.textarea3.value = myMessage;
   }
   // Update health, weapon and armour stats to screen
   this.updateStats = function() {
      $("#stats").remove();
      $("#player").after("<p id=\"stats\">Health: " + newPlayer.getType().health + 
                         "  Armour: " + newPlayer.getType().defence + 
                         "  Weapon: " + newPlayer.getType().weapon + "</p>");
   }
}
/* 
* Generates level and returns if level has been cleared
* Also returns random items found on successful searches
*/
function Level(number) {
   var level = number;
   var room = 0;
   
   var level1 = ["N", "N", "E", "N", "W", "W", "S"];
   var level2 = ["W", "W", "N", "W", "S", "S", "W"]; 
   var level3 = ["N", "E", "E", "S", "W", "N", "N"];
   var level4 = ["E", "S", "S", "S", "W", "S", "S"];
   var level5 = ["E", "N", "W", "W", "W", "N", "E"];
   
   var levelArray = [level1, level2, level3, level4, level5];
   
   // Returns the level player is on
   this.getLevel = function() {
      return level;
   }
   //Test if a new level is needed
   this.testLevel = function() {
      var count = 0;
      var nextLevel = false;
      if (room == levelArray[level -1].length) {
         myMessage += "\nCongratulations you have cleared level " + this.getLevel();
         nextLevel = true;
         if (level > 5) {
            $("#proceed").hide();
            myMessage += "\nYou have completed all the levels for the game. You scored " + game.getScore();
         }
         document.form1.textarea3.value = myMessage;
      }
      return nextLevel;
   }
   // test if direction has beeen travelled and calls search of item
   this.testDirection = function(travel) {
      var currentLevel = levelArray[level -1];
      if (travel == currentLevel[room]) {
         room++;
         return randomFind();
      } else {
         myMessage = "You can not go this way.";
      } 
      document.form1.textarea3.value = myMessage;
   }
}

/*
* Functions return random elements of an array as 
* reward for searching in a given turn
*/
function randomFind() {
   var thingsToFind = ["You found a new weapon!", "You found better armour!", 
                        "You found a health potion!", "You encounter Trolls!",
                        "You found an item shop", "You fell into a trap!", 
                        "You have found nothing!", "You have found nothing"]; 
   var size = thingsToFind.length -1;
   var finding = Math.floor(Math.random() * size);
   myMessage = thingsToFind[finding];
   $("#alerts").remove();
   switch(finding) {
      case 0:
         $("#eventImage").after(alertArray[7]);
         game.getNewPlayer().getType().weapon += 1;
         break;
      case 1:
         $("#eventImage").after(alertArray[2]);
         game.getNewPlayer().getType().defence += 1;
         break;
      case 2:
         $("#eventImage").after(alertArray[3]);
         game.getNewPlayer().getType().health += 3;
         break;
      case 3:
         $("#eventImage").after(alertArray[6]);
         break;
      case 4:
         $("#eventImage").after(alertArray[1]);
         doShopping();
         break;
      case 5:
         $("#eventImage").after(alertArray[5]);
         game.getNewPlayer().getType().health -= 2;
         break;
      case 6:
         $("#eventImage").after(alertArray[4]);
         break;
      case 7:
         $("#eventImage").after(alertArray[4]);
         break;
      default:
         break;
   }
   document.form1.textarea3.value = myMessage;
   return finding;
}

/* 
* Loop that lets the player upgrade with items
*/
function doShopping() {
   var q;
   do {
      q = prompt("Do you want \"A\" armour \"H\" health or \"W\" weapon?").toUpperCase();   
   }while (q !== 'A' && q !== 'H' && q !== 'W'); 
   switch (q) {
      case 'A':
         game.getNewPlayer().getType().defence += 1;
         myMessage = "You have purchased armour!";
         break;
      case 'H':
         game.getNewPlayer().getType().health += 5;
         myMessage = "You have purchased a health potion!";
         break;
      case 'W':
         game.getNewPlayer().getType().weapon += 1;
         myMessage = "You have purchased a new Weapon!";
         break;
      default:
         break;
   }
   document.form1.textarea3.value = myMessage;
   game.updateStats();
}





