const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const restartButton = document.querySelector("#restart-button");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;

//

//create block
class Block {
    constructor(xAxis, yAxis) {
      this.bottomLeft = [xAxis, yAxis];
      this.bottomRight = [xAxis + blockWidth, yAxis];
      this.topLeft = [xAxis, yAxis + blockHeight];
      this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
  }



//my all  blocks
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
