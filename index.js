
//my gameboard wil be an array 3x3 
let gameboard = [];
let gameSize = 3;

// cells are the button to play the game
let cells = document.querySelectorAll('button.cell')
let cell_size = 100;

//Players 
let players = ["X","O"];

// by default first Player is X
let pXIsPlaying = true;
let whoIsPlaying = document.querySelector('p#player')

//Select a player buttons
let playerXbutton = document.querySelector('#playerX')
let playerObutton = document.querySelector('#playerO')

let gagne = false;

const init = ()=>{
    for(let i =0 ; i< gameSize *3 ; i++){          
        gameboard[i]=' ';   
    }   
    fill()
}

const fill = () => {
    for(let i =0; i<cells.length ; i++){
        cells[i].innerHTML = gameboard[i];
        cells[i].value =""
    }
    whoIsPlaying.innerHTML = pXIsPlaying ? "Current Player is : X" : "Current Player is : O" ;
}

const playMove = ()=> {
    if(pXIsPlaying){
        pXIsPlaying = !pXIsPlaying;
        return players[0];
    }else {
        pXIsPlaying = !pXIsPlaying;
        return players[1];
    }
}

const gotCellToPlay = ()=>{
    let anyCellOpen = false;
    cells.forEach( cell =>{
        console.log(cell.value)
        if(cell.value == "") anyCellOpen = true;
    })
    return anyCellOpen;    
}

const verify = () => {
    //verifier la case central
    if(cells[4].innerHTML != " "){
        if( 
            ( cells[3].innerHTML === cells[4].innerHTML && cells[4].innerHTML === cells[5].innerHTML )      //ligne central
            || ( cells[1].innerHTML === cells[4].innerHTML && cells[4].innerHTML === cells[7].innerHTML )   //colonne central
            || ( cells[0].innerHTML === cells[4].innerHTML && cells[4].innerHTML === cells[8].innerHTML )   //diagonale haut-gauche to bas-droite
            || ( cells[2].innerHTML === cells[4].innerHTML && cells[4].innerHTML === cells[6].innerHTML )   //diagonale haut-droite to bas-gauche
            ) {
                alertWin()
                resetGame()
            }
    }
    if(cells[0].innerHTML != " " ) {
        if(
            ( cells[0].innerHTML === cells[1].innerHTML && cells[0].innerHTML === cells[2].innerHTML )      //1er ligne 
            || ( cells[0].innerHTML === cells[3].innerHTML && cells[0].innerHTML === cells[6].innerHTML )      //1er colonne 
        ){
            alertWin()
            resetGame()
        }
    }
    if(cells[8].innerHTML != " "){
        if(
            ( cells[8].innerHTML === cells[7].innerHTML && cells[8].innerHTML === cells[6].innerHTML )      //3eme ligne 
            || ( cells[8].innerHTML === cells[5].innerHTML && cells[8].innerHTML === cells[2].innerHTML )      //3eme colonne 
        ){
            alertWin()
            resetGame()
        }
    }
    console.log(gotCellToPlay())
    if(!gotCellToPlay()){
        alert("Match nul")
        resetGame()
    }

    return gagne;
}

const alertWin = ()=>{
    let winner = pXIsPlaying ?  "O" : "X";
    alert("The Winner is Player "+ winner)
}

const resetGame = () => {

    window.location.reload()
}

const fillIn = (event) =>{
    if(event.target.value == ""){
        event.target.value= pXIsPlaying ? "X" : "O";
        event.target.textContent= playMove();
        whoIsPlaying.textContent = pXIsPlaying ? "Current Player is : "+players[0] : "Current Player is : "+players[1] ;
        verify()  
    }
    else{
        alert('You cant play here !')
    }
}

cells.forEach( cell => { cell.addEventListener('click',fillIn) })
playerXbutton.addEventListener('click', ()=>{  pXIsPlaying=true; fill(); playerXbutton.disabled = true; playerObutton.disabled = true;})
playerObutton.addEventListener('click', ()=>{  pXIsPlaying=false;fill(); playerXbutton.disabled = true; playerObutton.disabled = true;})

init()