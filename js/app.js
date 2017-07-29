var Character = function(params) {
  this.sprite = params.sprite || "";
  this.width = params.width || 0;
  this.height = params.height || 0;
  this.x = params.x || 0;
  this.y = params.y || 0;
}

// Draw the enemy on the screen, required method for game
Character.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    var params = {
      sprite: 'images/enemy-bug.png',
      width: 70,
      height: 75
    };
    Character.call(this, params);
    this.reset();
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.reset = function() {
  this.x = -130;
  this.y = randomGenerate(70, 220);
  this.speed = randomGenerate(150, 450);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x > ctx.canvas.width) {
      this.reset();
    }

    this.x += this.speed * dt;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  var params = {
    sprite: 'images/char-horn-girl.png',
    width: 84,
    height: 60
  };
  Character.call(this, params);
  this.reset();
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 410;
}

Player.prototype.update = function() {
  var xLimits = [5, 410];
  var yLimits = [70, 410];
  
  if (this.x < xLimits[0]) {
      this.x = xLimits[0];
  }
  if (this.x > xLimits[1]) {
      this.x = xLimits[1];
  }

  if (this.y < yLimits[0]) {
      this.reset();
  }
  if (this.y > yLimits[1]) {
      this.y = yLimits[1];
  }
}

Player.prototype.handleInput = function(key) {
  if (key) {
    const step = 20;
    switch (key) {
      case 'left':
        this.x -= step;
        break;
      case 'up':
        this.y -= step;
        break;
      case 'right':
        this.x += step;
        break;
      case 'down':
        this.y += step;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 3; i++) {
  allEnemies.push(new Enemy());
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

var interval;
var called = false;

document.addEventListener('keydown', function(e) {
  if(interval == null) {
    called = false;
    interval = setInterval(function() {
      handleKeyEvent(e);
      called = true;
    }, 100);
  }
});
document.addEventListener('keyup', function(e) {
  clearInterval(interval); 
  interval = null;
  if(!called)
    handleKeyEvent(e);
});

function handleKeyEvent(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };
  
  player.handleInput(allowedKeys[e.keyCode]);
}