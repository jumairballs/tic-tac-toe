const cells = document.querySelectorAll(".cell");
const statext = document.querySelector("#status");
const rb = document.querySelector("#restart");
const wincond = [
    [0, 1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["","","","","","","","","",];
let currentp = "X";
let running = true;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    rb.addEventListener("click", restartGame);
    statext.textContent = `${currentp}'s turn`;


}
function cellClicked(){
const cellIndex = this.getAttribute("cellIndex");
if(options[cellIndex] != ""|| !running){
    return;
}
updateCell(this, cellIndex);
checkWinner();
}
function updateCell(cell, index){
    options[index] = currentp;
    cell.textContent = currentp;

}
function changePlayer(){
    currentp = (currentp == "X") ? "O" : "X";

    statext.textContent = `${currentp}'s turn`;
}
function checkWinner(){
let roundW = false;
for( let i = 0; i< wincond.length; i++){
    const condition = wincond[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if(cellA == ""|| cellB == ""||cellC == ""){
        continue;
    }
    if(cellA == cellB && cellB == cellC){
        roundW = true;
        break;
    }
}
if(roundW){
    statext.textContent = `${currentp} wins!`;
    running = false;
} else if (!options.includes("")){
    statext.textContent = `Draw!`;
} else{
    changePlayer();
}
}
function restartGame(){
    currentp = "X";
    options = ["","","","","","","","","",];
    statext.textContent = `${currentp}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}