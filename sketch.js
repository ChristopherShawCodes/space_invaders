// A classic twist on space invaders 
// by Christopher Shaw 

let ship;
let aliens = [];//array to hold alien objects
let lasers = []; //array to hold laser objects
let points = 0; // sets the initial score to 0 when the game starts

function preload() {
  alien1a = loadImage('img/alien1a.png');
  alien1b = loadImage('img/alien1b.png');
  alien2a = loadImage('img/alien2a.png');
  alien2b = loadImage('img/alien2b.png');

}




function setup() {
  createCanvas(600, 400);
  // slows down the frame rate to make the animation look similar to the classic game ! 
  frameRate(10);
  imageMode(CENTER);
  // Use the constructor method of the ship class to create a new ship 
  ship = new Ship();
  //create bottom row of aliens
  let startX = 80;
  let startY = 80;
  for (var i = 0; i < 6; i++){
    aliens[i] = new Alien(i * startX +80, startY, alien1a, alien1b, 5);
  }
  //create top row of aliens
  startY = 40;
  let offset = 0;
  for (var j = 6; j < 12; j++){
    aliens[j] = new Alien(offset * startX +80, startY, alien2a, alien2b, 10);
    offset ++;
  }
  // console.log(aliens);
}

function draw() {
  background(50);
  ship.show();
  ship.move();
  
  //show and move the aliens
  var edge = false;
  for (var i = 0; i < aliens.length; i++){
    aliens[i].show();
    aliens[i].move();
    if (aliens[i].x > width || aliens[i].x < 0){
      edge = true;
    }
  }
  if (edge === true){
    for (var k = 0; k < aliens.length; k++) {
      aliens[k].shiftDown();
    }
  }
  // display and move the laser
  for(var las = 0; las < lasers.length; las++){
    lasers[las].show();
    lasers[las].move();
    // collision detection
    for (var j = 0; j < aliens.length; j++){
      if (lasers[las].hits(aliens[j])){
        lasers[las].remove();
        points = points + aliens[j].pts;
        aliens.splice(j, 1); // removes an alien from the array
      }
    }//end of the alien loop
  }//end of the laser loop #1

  // loop through lasers & remove lasers with flag
  for (var z = lasers.length -1; z>= 0; z--){
    if (lasers[z].toDelete === true){
      lasers.splice(z, 1); // remove laser from array
    }
  }// end of the laser loop #2
  //update Heads Up Display 
  updateHUD();
  //check if game is over
  if (aliens.length <=0){
    gameOver();
  }
} //end of draw function



// key event handlers 
function keyReleased () {
  //this is needed to stop the ship when key pressed is released
  ship.setDir(0);
}

function keyPressed() {
  if (key === ' '){
    var laser = new Laser(ship.x +(ship.width/2), ship.y);
    //push adds objects to the end of the array
    lasers.push(laser);
  }
  if (keyCode === RIGHT_ARROW) {
    //1 is positive on the x axis moving the position to the right by 1 and vice versa for -1
    ship.setDir(2);
  } else if (keyCode === LEFT_ARROW){
    ship.setDir(-2);
  }
}


function updateHUD() {
  fill(0,255,0);
  text("Score: " + points, 10,20);
  text("Aliens Remaining: " + aliens.length,70,20);
}

function gameOver() {
background(0);
fill(0,255,0);
textSize(48);
textAlign(CENTER);
text("Game Over", width/2, height/2);
text("Your Score   " + points, width/2, height/2+50);
noLoop();
}