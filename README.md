![CI logo](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png)

# EYE-BRACKER
(By Mirjana Cale)
***

![amiresponsive](readme-img/imgmain.png)







***
### Live pages -
***


 
## Introduction
Eye-bracker is a arcade game where the player controls a paddle to deflect a bouncing eyeball. The goal is to smash a wall of colored bricks by hitting them with the eyeball.The paddle moves horizontally.It's a classic that continues to captivate players of all ages.

***

# Existing Features
***
## Start Page 

### Player Name Input:
* The player can type their name in this input area.

![home](readme-img/img10.png)

### The "Start" button:
 * launches the game.
 * The player must submit a name  before the game can begin.

 ![home](readme-img/img10.png)

### Player Name Storage:
* When a page loads, the player's name is obtained from the browser's local storage.

![home](readme-img/img10.png)


## Game Grid Dimensions:
 * The game grid has a red backdrop and is 560 pixels wide by 300 pixels high.
* Positioning: 
Using CSS flexbox and transform attributes, the grid is centered in the viewport.

![home](readme-img/img10.png)

## Blocks

### Block Creation:
 * A Block class with attributes specifying a block's location and size is used to generate blocks.
 * Block Layout:
  At the top of the gaming area, blocks are organized in a grid. Three rows, each with five blocks, are present.

  ![home](readme-img/img10.png)

* Block Removal:
 When the ball strikes a block, it is taken out of the DOM.

## User Paddle
  * Paddle Element: 
  A rectangular, purple paddle that the user controls.
 * Keyboard Controls: The arrow keys are used to move the paddle left and right.

 ![home](readme-img/img10.png)

## Touch Controls:
 When using a touch device, swipe movements cause the paddle to move left or right.
 * Boundary Constraints: 
 The game grid places restrictions on the paddle's movement.

 ![home](readme-img/img10.png)

## Bouncing Ball (Eyeball)

* A round, yellow ball that bounces around the grid is the eyeball element.

* Movement:
 When the ball collides with walls, blocks, or the paddle, it travels diagonally and changes course.

 ![home](readme-img/img10.png)

* Collision Detection:
 When the ball collides with walls, blocks, or the paddle, the game detects it and modifies the ball's path appropriately.

# Audio Effects
 * The sound effect known as "Bounce Sound" is produced when the ball strikes walls, blocks, or the paddle.
* Lose Sound: When the ball hits the paddle below, a sound effect is heard.

* Mute Functionality: The player may turn sound effects on and off by pressing the mute button.

![home](readme-img/img10.png)

# Scoring Score Display: 
* The top of the grid shows the current score.
Every time a block is broken, the score is increased.

* Winning Condition: 
When every block is broken, the game pauses and shows a winning message.

![home](readme-img/img10.png)

 
# End of game and restart

* Condition of Game Over:
 When the ball touches the paddle below, the game stops and shows a losing message.
* Restart Button:
 This button allows the player to restart the game by reloading it.

 ![home](readme-img/img10.png)


