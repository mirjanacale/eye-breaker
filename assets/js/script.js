const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const restartButton = document.querySelector("#restart-button");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
let timerId



const userStart = [230, 10];
let currentPosition = userStart;

// Get the start page container and button elements
const startPage = document.querySelector(".start-page");
const startButton = document.querySelector("#start-button");
const gameContainer = document.getElementById("game-container");



let playerName ="";


startButton.addEventListener("click", startGame);

// Function to start the game
function startGame() {
  const nameInput = document.querySelector("#player-name");
  playerName = nameInput.value;





  if (playerName.trim() === "") {
    alert("Please enter your name to start the game.");
    return;
  }


  // Remove the start page container
  startPage.style.display = "none";
  gameContainer.style.display = "block";
  
// Start the game by calling the moveEyeball function and setting the timerId interval
timerId = setInterval(moveEyeball, 10);

}




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
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),

  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),

  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),



]











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


//move user

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        //fixiranje da user ostane u gridu
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
grid.appendChild(eyeball); //stavljanje lopte u parrent
draweyeball();



document.addEventListener("keydown", moveUser);