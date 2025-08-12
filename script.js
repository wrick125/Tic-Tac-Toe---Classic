// Select all box elements in the grid
let boxes = document.querySelectorAll(".box");

// Variable to store whose turn it is (X starts first)
let turn = "X";

// Boolean to track if the game is over
let isGameOver = false;

let audioTurn = new Audio("ting.mp3")
let music = new Audio("music.mp3")
let gameOver = new Audio("gameover.mp3")

// Loop through each box and add a click event listener
boxes.forEach(e =>{
    // Initially clear all boxes
    e.innerHTML = ""
    e.addEventListener("click", ()=>{
        // Only allow move if game is not over and the box is empty
        if(!isGameOver && e.innerHTML === ""){
            audioTurn.play();
            e.innerHTML = turn; // Place current player's symbol
            checkWin();         // Check if the current move wins the game
            checkDraw();        // Check if the game is a draw
            changeTurn();       // Switch the turn to the other player
        }
    })
})

// Function to change the player's turn
function changeTurn(){
    if(turn === "X"){
        turn = "O"; // Switch to O
        document.querySelector(".bg").style.left = "85px"; // Move turn indicator
    }
    else{
        turn = "X"; // Switch back to X
        document.querySelector(".bg").style.left = "0";    // Move turn indicator
    }
}

// Function to check if any player has won
function checkWin(){
    // All possible winning combinations (index positions in the grid)
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ]

    // Loop through each win condition
    for(let i = 0; i < winConditions.length; i++){
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        // If all three positions are filled with the same symbol
        if(v0 != "" && v0 === v1 && v0 === v2){
            isGameOver = true; // Stop further moves
            gameOver.play();
            document.querySelector("#results").innerHTML = turn + " wins!"; // Show winner
            document.querySelector("#play-again").style.display = "inline" // Show play again button
            document.querySelector("#reset-game").style.display = "none"

            // Highlight the winning boxes
            for(let j = 0; j < 3; j++){
                boxes[winConditions[i][j]].style.backgroundColor = "#6BCB77";
                boxes[winConditions[i][j]].style.color = "#e8decfff";
            }
        }
    }
}

// Function to check if the game is a draw
function checkDraw(){
    if(!isGameOver){
        let isDraw = true; // Assume draw until proven otherwise

        // If any box is still empty, it's not a draw
        boxes.forEach(e =>{
            if(e.innerHTML === "") isDraw = false;
        })

        // If all boxes are filled and no winner, it's a draw
        if(isDraw){
            isGameOver = true;
            gameOver.play();
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline"
            document.querySelector("#reset-game").style.display = "none"
        }
    }
}

// Event listener for "Play Again" button
document.querySelector("#play-again").addEventListener("click", ()=>{
    // Reset game state
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0"; // Reset turn indicator
    document.querySelector("#results").innerHTML = ""; // Clear result text
    document.querySelector("#play-again").style.display = "none"; // Hide button
    document.querySelector("#reset-game").style.display = "inline"

    // Reset all boxes
    boxes.forEach(e =>{
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#222";
    })
})

// Event listener for "Reset the game" button
document.querySelector("#reset-game").addEventListener("click", ()=>{
    // Reset game state
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0"; // Reset turn indicator
    document.querySelector("#results").innerHTML = ""; // Clear result text
    document.querySelector("#play-again").style.display = "none"; // Hide button

    // Reset all boxes
    boxes.forEach(e =>{
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#222";
    })
})

audioTurn.play();
music.loop = true; 
music.volume = 0.05;


let isMuted = true;

document.querySelector("#mute-unmute").addEventListener("click", () => {
    let img = document.querySelector("#mute-unmute img");

    if (!isMuted) {
        // Mute
        music.pause();
        img.src = "mute.svg";
        img.alt = "mute";
        isMuted = true;
    } else {
        // Unmute
        music.play();
        img.src = "unmute.svg";
        img.alt = "unmute";
        isMuted = false;
    }
});
