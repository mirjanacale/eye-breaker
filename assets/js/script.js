/* jshint esversion: 11 */
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const restartButton = document.querySelector("#restart-button");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
let timerId;
let score = 0;
let xDirection = -2;
let yDirection = 2;
const eyeballDiameter = 20;


const userStart = [230, 10];
let currentPosition = userStart;


const eyeballStart = [270, 40];
let eyeballCurrentPosition = eyeballStart;


//START PAGE

// Get the start page container and button elements
const startPage = document.getElementById(".start-page");
const startButton = document.querySelector("#start-button");
const gameContainer = document.getElementById("game-container");
const orientationMessage = document.getElementById("orientation-message");


let playerName ="";
let gameStarted = false;


startButton.addEventListener("click", startGame);

// Function to start the game
function startGame() {
  gameStarted = true;
  const nameInput = document.querySelector("#player-name");
  playerName = nameInput.value;





  if (playerName.trim() === "") {
    alert("Please enter your name to start the game.");
    return;
  }


// Store the player's name in local storage
localStorage.setItem("playerName", playerName);

// Remove the start page container
startPage.classList.add("hide");
gameContainer.classList.remove("hide");

// Start the game by calling the moveEyeball function and setting the timerId interval
timerId = setInterval(moveEyeball, 10);

}

// Retrieve the player's name from local storage when the page loads
document.addEventListener("DOMContentLoaded", function() {
  const storedPlayerName = localStorage.getItem("playerName");
  if (storedPlayerName) {
    document.querySelector("#player-name").value = storedPlayerName;
  }
});

  
// Check if the device is a mobile 
function checkViewportWidth() {
  if (window.innerWidth <= 650) {
      orientationMessage.classList.remove("hide");
      gameContainer.classList.add("hide");
      startPage.classList.add("hide");
  } else {
      orientationMessage.classList.add("hide");
      if (gameStarted) {
          gameContainer.classList.remove("hide");
      } else {
          startPage.classList.remove("hide");
      }
  }
}

// Check the width when the page loads
window.addEventListener('load', checkViewportWidth);

// Check the width when the window is resized
window.addEventListener('resize', checkViewportWidth);




//create block
class Block {
    constructor(xAxis, yAxis) {
      this.bottomLeft = [xAxis, yAxis];
      this.bottomRight = [xAxis + blockWidth, yAxis];
      this.topLeft = [xAxis, yAxis + blockHeight];
      this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
  }



//   blocks
const blocks = [
  //top row
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  // middle row
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  //bottom row
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),

];



// ADDBLOCKS

//  loop with Array.prototype.forEach
 function addBlocks() {
    blocks.forEach(blockData => {
     const block = document.createElement("div");
      block.classList.add("block");
      block.style.left = `${blockData.bottomLeft[0]}px`;
       block.style.bottom = `${blockData.bottomLeft[1]}px`;
      grid.appendChild(block);
   });
  }
  
  addBlocks();

 // USER
 const user = document.createElement("div");
 user.classList.add("user");

grid.appendChild(user);
drawUser();


function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}


//DRAWEYBALL
function draweyeball() {
  eyeball.style.left = eyeballCurrentPosition[0] + "px";
  eyeball.style.bottom = eyeballCurrentPosition[1] + "px";
}


// Add touch controls
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

let touchStartX = null;

function handleTouchStart(e) {
  const firstTouch = e.touches[0];
  touchStartX = firstTouch.clientX;
}

function handleTouchMove(e) {
  if (!touchStartX) {
    return;
  }

  const touchMoveX = e.touches[0].clientX;
  const touchDiffX = touchStartX - touchMoveX;

  if (touchDiffX > 0) {
    //  left
    moveUserByTouch(-20);
  } else {
    // right
    moveUserByTouch(20);
  }

  touchStartX = null; // Reset 
}

function moveUserByTouch(offset) {
  currentPosition[0] += offset;

  // stays within the grid
  if (currentPosition[0] < 0) {
    currentPosition[0] = 0;
  }
  if (currentPosition[0] > boardWidth - blockWidth) {
    currentPosition[0] = boardWidth - blockWidth;
  }

  drawUser();
}


//USER MOVE

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}




// EYEBALL

const eyeball = document.createElement("div");
eyeball.classList.add("eyeball");
grid.appendChild(eyeball); 
draweyeball();



document.addEventListener("keydown", moveUser);

// MOVEEYEBALL

function moveEyeball() {
  eyeballCurrentPosition[0] += xDirection;
  eyeballCurrentPosition[1] += yDirection;
  draweyeball();

  checkForCollisions();
}


function checkForCollisions() {
  //check for block collision
  for (let i = 0; i < blocks.length; i++){

    if
    (
      (eyeballCurrentPosition[0] > blocks[i].bottomLeft[0] && eyeballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
      ((eyeballCurrentPosition[1] + eyeballDiameter) > blocks[i].bottomLeft[1] && eyeballCurrentPosition[1] < blocks[i].topLeft[1]) 
    )
      {
      const allBlocks = Array.from(document.querySelectorAll('.block'));
      allBlocks[i].classList.remove('block');
      blocks.splice(i,1);
      changeDirection();  
      playBounceSound(); 
      score++;
      scoreDisplay.innerHTML = `Score<br>${score}`;
      if (blocks.length == 0) {
        scoreDisplay.innerHTML = `You Win,<br>${playerName}!`;
        clearInterval(timerId);
        document.removeEventListener('keydown', moveUser);
        showRestartButton();
      }
    }
  }
  // COLLISION WALL
  
  if (eyeballCurrentPosition[0] >= (boardWidth - eyeballDiameter) || eyeballCurrentPosition[0] <= 0 || eyeballCurrentPosition[1] >= (boardHeight - eyeballDiameter))
  {
    changeDirection();
    playBounceSound(); 

  }

  //COLLISION USER
  if
  (
    (eyeballCurrentPosition[0] > currentPosition[0] && eyeballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
    (eyeballCurrentPosition[1] > currentPosition[1] && eyeballCurrentPosition[1] < currentPosition[1] + blockHeight ) 
  )
  {
    changeDirection();
    playBounceSound(); 
  }

//GAME OVER

if (eyeballCurrentPosition[1] <= 0) {
  clearInterval(timerId); 
  scoreDisplay.innerHTML = `You lose ,${playerName}! <br>Your score was: ${score} `;
  playLoseSound();  
  document.removeEventListener('keydown', moveUser);
  showRestartButton();
}


}
const bounceSound = document.getElementById("bounce-sound");


const muteButton = document.getElementById("mute-button");
let isMuted = true;

function playBounceSound() {
  if (!isMuted) {
  bounceSound.currentTime = 0; 
  bounceSound.play();
}


}
muteButton.addEventListener("click", toggleMute);


muteButton.addEventListener("click", toggleMute);

function toggleMute() {
  isMuted = !isMuted;
  muteButton.textContent = isMuted ? "Unmute" : "Mute";
}

//LOSE SOUND

const loseSound = document.getElementById("lose-sound");

function playLoseSound() {
  if (!isMuted) {
    loseSound.currentTime = 0; 
    loseSound.play();
  }
}


function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
  playBounceSound();
}


restartButton.addEventListener("click", restartGame);

function  showRestartButton() {
  restartButton.classList.remove("invisible");
}


function restartGame() {
  document.location.reload();
}