'use strict';
// selecting score 1 and score 0 elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const btnNew = document.querySelector(`.btn--new`);
const btnHold = document.querySelector(`.btn--hold`);
const btnRoll = document.querySelector(`.btn--roll`);
const diceEl = document.querySelector(`.dice`);
const curren0El = document.getElementById(`current--0`);
const curren1El = document.getElementById(`current--1`);

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle(`player--active`);
    player1El.classList.toggle(`player--active`);
}

//setting scores to 0
//declaring the variables outside the fucntion
let currentScore,activePlayer,scores,playing;
const init = function(){
    score0El.textContent = 0;
    score1El.textContent = 0;
    curren0El.textContent= 0;
    curren1El.textContent= 0;

    player0El.classList.remove(`player--winner`);
    player1El.classList.remove(`player--winner`);
    player0El.classList.add(`player--active`);
    player1El.classList.remove(`player--active`);

    btnHold.classList.remove(`hidden`);
    btnRoll.classList.remove(`hidden`);
    diceEl.classList.remove(`hidden`);
    
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

}
init()

diceEl.classList.add(`hidden`);

 //Rolling the functionality

btnRoll.addEventListener(`click`,function(){
    if(playing){
        //1.generate a random dice
        const dice = Math.trunc(Math.random()* 6) +1;

        //2.display the dice
        diceEl.classList.remove(`hidden`);

        diceEl.textContent = diceEl.src = `dice-${dice}.png`;
        //3.Check for rolled 1:if true,switch to the next player 
        if (dice !== 1 ){
        //4.add dice to current score
            currentScore +=dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        
    }   else{
            //switch to next player 
            switchPlayer()
        } 
    }
    
})
//Holding button 
btnHold.addEventListener(`click`, function(){
    if(playing){
    //when user click to hold
        //1. add current score to active plahyer`s scores
        scores[activePlayer] +=currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


        //2. check if score higher than 100
        if(scores[activePlayer]>=100){
            //finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--active`);
            btnHold.classList.add(`hidden`);
            btnRoll.classList.add(`hidden`);
            diceEl.classList.add(`hidden`)
        }   
        else {
           //3.switch to the next player
            switchPlayer()
        }
    }
}
)

btnNew.addEventListener(`click`,init)