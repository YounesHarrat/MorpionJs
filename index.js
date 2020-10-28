//get the canvas
/*
let cvs = document.querySelector('canvas#game')
let ctx = cvs.getContext('2d')
*/


//my gameboard wil be an array 3x3 
let gameboards = []
let gameboard = [];
let gameSize = 3;

let players = ["X","O"];

let pXIsPlaying = true;
let cell_size = 100;

let cells = document.querySelectorAll('button.cell')
let whoIsPlaying = document.querySelector('p#player')

//Select a player buttons
let playerXbutton = document.querySelector('#playerX')
let playerObutton = document.querySelector('#playerO')


let gagne = false;

const init = ()=>{
    for(let i=0; i<9 ; i++){
        for(let i =0 ; i< gameSize *3 ; i++){          
            gameboard[i]=' ';   
        }
        gameboards.push(gameboard)
    }
    console.table(gameboards)     

    fill()
}

const addGameBoard = () =>{
    let newGB = gameboard
    gameboards.push()
}

const fill = () => {
    for(let i =0; i<cells.length ; i++){
        cells[i].innerHTML = gameboard[i];
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

const verify = () => {
    //verifier la case central
    if(cells[4].innerHTML != " "){
        // si la ligne du milieu OR la colonne du milieu
        if( 
            ( cells[3].innerHTML === cells[4].innerHTML && cells[4].innerHTML === cells[5].innerHTML )      //ligne central
            || ( cells[1].innerHTML === cells[4].innerHTML && cells[4].innerHTML === cells[7].innerHTML )   //colonne central
            || ( cells[0].innerHTML === cells[4].innerHTML && cells[4].innerHTML === cells[8].innerHTML )   //diagonale haut-gauche to bas-droite
            || ( cells[2].innerHTML === cells[4].innerHTML && cells[4].innerHTML === cells[6].innerHTML )   //diagonale haut-droite to bas-gauche
            ) {
                resetGame()
            }
    }
    if(cells[0].innerHTML != " " ) {
        if(
            ( cells[0].innerHTML === cells[1].innerHTML && cells[0].innerHTML === cells[2].innerHTML )      //1er ligne 
            || ( cells[0].innerHTML === cells[3].innerHTML && cells[0].innerHTML === cells[6].innerHTML )      //1er colonne 
        ){
            resetGame()
        }
    }
    if(cells[8].innerHTML != " "){
        if(
            ( cells[8].innerHTML === cells[7].innerHTML && cells[8].innerHTML === cells[6].innerHTML )      //3eme ligne 
            || ( cells[8].innerHTML === cells[5].innerHTML && cells[8].innerHTML === cells[2].innerHTML )      //3eme colonne 
        ){
            resetGame()
        }
    }
    
    return gagne;
}

const resetGame = () => {
    let winner = pXIsPlaying ?  "O" : "X";
    alert("The Winner is Player "+ winner)
    window.location.reload()
}

const fillIn = (event) =>{
    console.log(event.target)
    event.target.innerHTML= playMove();
    whoIsPlaying.innerHTML = pXIsPlaying ? "Current Player is : "+players[0] : "Current Player is : "+players[1] ;
    verify() 
}

cells.forEach( elem => {
    elem.addEventListener('click',fillIn)
})

playerXbutton.addEventListener('click', ()=>{  pXIsPlaying=true; fill()})

playerObutton.addEventListener('click', ()=>{  pXIsPlaying=false;fill()})

init()




// two players : 'O' and 'X' 


