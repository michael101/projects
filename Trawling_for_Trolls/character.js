function Barbarian() {
   this.health = 8;
   this.weapon = 2;
   this.defence = 1;
   this.skill = 3;
}

function Dwarf() {
   this.health = 10;
   this.weapon = 1;
   this.defence = 2;
   this.skill = 2;
}

function Troll() {
   this.health = 3 + game.level.getLevel();
   this.weapon = 3;
}

function Character(name, input) {
   var name = name;
   var type = input;
   this.getName = function() {
      return name;
   };
   this.getType = function() {
      return type;
   };
   this.attack = function() {
      return Math.floor(Math.random() * this.getType().skill) + this.getType().weapon;  
   };
}

function Foes(level, foe) {
   var numTrolls = Math.floor(Math.random() * level) + 1;
   this.health = numTrolls * foe.health;
   this.weapon = foe.weapon + level;
   this.trollAttack = function() {
      return Math.floor(Math.random() * numTrolls) + this.weapon;
   };
   this.getTrollNum = function() {
      return numTrolls;
   };
}   