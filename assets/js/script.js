const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const restartButton = document.querySelector("#restart-button");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;



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
