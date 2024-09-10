const cells=document.querySelectorAll(".cell");
const titleHeader=document.getElementById("titleHeader");
const xPLayerDisplay=document.getElementById("xPlayerDisplay");
const oPLayerDisplay=document.getElementById("oPlayerDisplay");
const restartBtn=document.getElementById("restartBtn");

//Initialize variables for the game

let player='X';
let isPauseGame=false;
let isGameStart=false;

//Array of win conditions

const inputCells=['','','',
                  '','','',
                  '','',''];

//Array of ein conditions  
  
const winConditions=[
    [0,1,2],[3,4,5],[6,7,8], //Rows
    [0,3,6],[1,4,7],[2,5,8], //Columns
    [0,4,8],[2,4,6] //Diagonals
];

//Add click event listener to each cell

cells.forEach((cell,index)=>{
    cell.addEventListener('click',()=>tapCell(cell,index) )
})

 function tapCell(cell, index){
    //Ensure that the cell is empty and game isn't pause
    if(cell.textContent =="" &&  !isPauseGame){
        isGameStart=true;
        updateCell(cell,index);

        //Do a random pick if there are no results
        if(!checkWinner()){
            changePlayer();
            randomPick();
        }
        
    }
 }

 function updateCell(cell,index){
    cell.textContent= player;
    inputCells[index]=player;
    cell.style.color=(player == 'X') ? "#1892EA" : "#A737FF";
 }

 function changePlayer(){
    player= (player== 'X') ? 'O' : 'X';
 }

 function randomPick(){
      //Pause the game to allow random pick
      isPauseGame=true

      setTimeout(()=>{
        let randomIndex
        do{
            //Pick a random index
            randomIndex=Math.floor(Math.random() *inputCells.length)
        }
        while(
            //Ensure that the choosen cell is empty
            inputCells[randomIndex] !=''
        )
        //After pressing each cell it will generate randomIndex
        //update the cell with computer move
        updateCell(cells[randomIndex],randomIndex,player)
            //check if computer won
            if(!checkWinner()){
                changePlayer()
                //Switch back to human player 
                isPauseGame=false
                return 
            } 
            player= (player== 'X') ? 'O' : 'X'; //for Change the player initialization
      },1000) //Delay computer move
 }
 function checkWinner(){
    for(const [a,b,c] of winConditions){
        //Check each winning condition
        if(inputCells[a]== player && inputCells[b]== player && inputCells[c]== player ){
            declareWinner([a,b,c]);
            return true;
        }
    }

    // Check for a draw(if all cells are fillled)
    if(inputCells.every(cell=>cell !="")){
        declareDraw();
        return true;
    }
 }

 function declareWinner(winningIndices){
    titleHeader.textContent=`${player} Win`;
    isPauseGame=true;

    //Highligjt wining cells
    winningIndices.forEach((index)=>{
        cells[index].style.background="#2A2343";
    })
    restartBtn.style.visibility = "visible";
}

//Add click event listeners to restart button
restartBtn.addEventListener('click',()=>{
    restartBtn.style.visibility = "hidden";
    inputCells.fill("");
    cells.forEach(cell=>{
        cell.textContent='';
        cell.style.background= "";
    })
    isPauseGame=false;
    isGameStart=true;
    titleHeader.textContent="Choose";
})

function choosePlayer(selectedPlayer){
    //Ensure the game hasn't yet started
    if(!isGameStart){
        // Override the selected player value
        player=selectedPlayer;
        if(player == 'X'){
            //Highlight X display
            xPLayerDisplay.classList.add("player-active");
            oPLayerDisplay.classList.remove("player-active");
        }
        else{
            //Highlight O display
            xPLayerDisplay.classList.remove("player-active");
            oPLayerDisplay.classList.add("player-active")
        }

    }
}

function declareDraw(){
    titleHeader.textContent="Draw!";
    restartBtn.style.visibility="visible";
}