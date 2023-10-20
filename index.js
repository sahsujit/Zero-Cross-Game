const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//let`s crete a function to initialise the game

function initGame() {
    currentPlayer = "x";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGameBtn.classList.remove("active");
   
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        newGameBtn.classList.remove("active");

        box.classList = `box box${index+1}`;


    })
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]] !==  "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
         &&(gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            if (gameGrid[position[0] == "x"])
            answer = "o";
        else
        answer = "x";

        boxes.forEach((box)=>{
            box.style.pointerEvents = "none";
        })
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
        }

       

    });

    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    let fillcount = 0;
    gameGrid.forEach((box)=>{
        if(box !== "")
        fillcount++;
    })
    if(fillcount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
    
}

function swapturn() {
    if (currentPlayer === "x") {
        currentPlayer = "o";
    }
    else {
        currentPlayer = "x"
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        swapturn();
        checkGameOver();
    }

}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

newGameBtn.addEventListener('click', initGame);
