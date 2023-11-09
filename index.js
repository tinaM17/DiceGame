
//console.log(randomNumber);
const rollDice=document.querySelector('.rollDice')
const hold=document.querySelector('.hold')
const results=document.querySelector('.results')
const h2=document.createElement('h2')
const newGame=document.querySelector('#newGame')
let image=document.querySelector('img')

let score1=document.querySelector('.score1')
let score2=document.querySelector('.score2')
let current1=document.querySelector('.currentP1')
let current2=document.querySelector('.currentP2')

let holdScore1=0;
let holdScore2=0;

let player1Score=0;
let player2Score=0;

let currentPlayer="player1"

let playGame=true
if(playGame){
    rollDice.addEventListener('click',(e)=>{
        const audio=new Audio('dice_audio.mp3');
        const randomNumber= Math.floor((Math.random()*6)+1)
       // const image=document.querySelector('img')
        audio.play()
        image.src=`./images/dice${randomNumber}.png`
        image.style.transform="rotate(360deg)";
        if(randomNumber===1){
            if(currentPlayer==="player1"){
                currentPlayer="player2"
                player1Score=0;
                current1.innerHTML = '0'
            }
            else {
                currentPlayer="player1";
                player2Score=0;
                current2.innerHTML = '0'
            }
        }
        else {
            calculateScore(currentPlayer,randomNumber)
        }
   })
   hold.addEventListener('click',(e)=>{
          if(currentPlayer==="player1"){
            holdScore1+=player1Score;
            player1Score=0;
            score1.innerHTML=`${holdScore1}`
            current1.innerHTML = '0'
            checkWinner(currentPlayer,holdScore1)
            currentPlayer="player2"
          }
          else {
            holdScore2+=player2Score;
            player2Score=0;
            score2.innerHTML=`${holdScore2}`
            current2.innerHTML = '0'
            checkWinner(currentPlayer,holdScore2)
            currentPlayer="player1"
          }
   })
}

function calculateScore(currentPlayer,randomNumber) {
    if(currentPlayer==="player1"){
        player1Score +=randomNumber
        current1.innerHTML = `${player1Score}`
    }
    else {
        player2Score +=randomNumber
        current2.innerHTML = `${player2Score}`
    }
    
}

function checkWinner(currentPlayer,holdScore) {
    if(holdScore>=100){
        display(`Congratulations!! ${currentPlayer} is won the match`)
        endGame()
    }
}

function display(message) {
    h2.innerHTML=`${message}`
    results.appendChild(h2);
    document.body.style.backgroundImage='url("./images/congrats.gif")'
}

function endGame(){
   rollDice.setAttribute('disabled','')
   hold.setAttribute('disabled','')
   playGame=false;
   startGame()
}

function startGame() {
    newGame.addEventListener('click',(e)=>{
        document.body.style.backgroundImage='none'
        rollDice.removeAttribute('disabled')
        hold.removeAttribute('disabled')
        results.removeChild(h2)
        current1.innerHTML='0'
        current2.innerHTML='0'
        score1.innerHTML='0'
        score2.innerHTML='0' 
        player1Score=0;
        player2Score=0;
        holdScore1=0;
        holdScore2=0;
        playGame=true
    })
}