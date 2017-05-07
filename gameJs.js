/******************************************************************************** DEFAULTS *****************************************************************/

var turnTotal, playing, game, score, variantTwo, variantThree;
v1Active();
newGame();


/******************************************************************************** MODAL IMPLEMENTATION *****************************************************************/

var modal = document.getElementById('myModal');
modal.style.display = "block";
document.addEventListener('keyup', function(e) {
    if (e.keyCode == 27) {
        modalClose();
    }
});

window.onclick = function(e) {
    if (e.target == modal) {
        modalClose();
    }
}
document.querySelector('.close').addEventListener('click',modalClose);
document.getElementById('play-button').addEventListener('click',modalClose);


/******************************************************************************** EXTRAS *****************************************************************/

document.getElementById('help').addEventListener('click',function () {
    modal.style.display = "block";
});


/******************************************************************************** VARIANT 1 IMPLEMENTATION *****************************************************************/

document.getElementById('v1').addEventListener('click', function () {
    v1Active();
    newGame();
});

/******************************************************************************** VARIANT 2 IMPLEMENTATION *****************************************************************/

document.getElementById('v2').addEventListener('click', function () {
    v2Active();
    newGame();
});

/******************************************************************************** VARIANT 3 IMPLEMENTATION *****************************************************************/

document.getElementById('v3').addEventListener('click', function () {
    v3Active();
    newGame();
});


/******************************************************************************** NEW BUTTON IMPLEMENTATION *****************************************************************/

document.querySelector('.new').addEventListener('click', newGame);

/******************************************************************************** ROLL BUTTON IMPLEMENTATION *****************************************************************/

document.querySelector('.roll').addEventListener('click', function () {
    if (game) {
        var dice1 = Math.floor(Math.random() * 6 + 1);

/************************************************************* TESTING *************************************************************/
        
//        if(dice1 === 1){console.log(dice1);alert('dice1 === 1');}
        
/************************************************************* TESTING *************************************************************/        
        
        document.getElementById('dice-1').classList.remove('dice-1');
        document.getElementById('dice-1').style.display = "block";
        document.getElementById('dice-1').src = 'images/dice-' + dice1 + '.png';
        if(variantTwo){
            document.getElementById('dice-1').classList.add('dice-1');
            var dice2 = Math.floor(Math.random() * 6 + 1);

/************************************************************* TESTING *************************************************************/
            
//            if(dice1 === 1 && dice2 === 1){console.log(dice1);console.log(dice2);alert('dice1 === dice2 === 1');}
//       else if(dice1 === 1 || dice2 === 1){console.log(dice1);console.log(dice2);alert('one of them is 1');}
            
//            if(dice1 === 1 && dice2 === 1){console.log(dice1);console.log(dice2);alert('dice1 === dice2 === 1');}
//       else if(dice1 === dice2){console.log(dice1);console.log(dice2);alert('dice1 === dice2');}
//       else if(dice1 === 1 || dice2 === 1){console.log(dice1);console.log(dice2);alert('one of them is 1');}
            
/************************************************************* TESTING *************************************************************/
                
            document.getElementById('dice-2').style.display = "block";
            document.getElementById('dice-2').src = 'images/dice-' + dice2 + '.png';
            if(!variantThree) {
                if (dice1 === 1 && dice2 === 1) {                                        //console.log('entered 1 ' + turnTotal);
                    score[playing - 1] = 0;
                    document.getElementById('score-' + playing).textContent = 0;
                    next();
                } else if (dice1 !== 1 && dice2 !== 1) {                                 //console.log('entered 2 ' + turnTotal);
                    turnTotal += dice1 + dice2;
                    document.getElementById('turnTotal-' + playing).textContent = turnTotal; 
                } else if((dice1 === 1) || (dice2 === 1)) {                              //console.log('entered 3 ' + turnTotal);
                    next();
                }
            }
            if (variantThree) {
                if (dice1 === 1 && dice2 === 1){                                         //console.log('entered 4 ' + turnTotal);
                    turnTotal += 25;
                    document.getElementById('turnTotal-' + playing).textContent = turnTotal;
                } else if (dice1 === dice2) {                                            //console.log('entered 5 ' + turnTotal);
                    console.log(turnTotal);
                    turnTotal += 2 * (dice1 + dice2);
                    console.log(2 * (dice1 + dice2));
                    console.log(turnTotal);
                    document.getElementById('turnTotal-' + playing).textContent = turnTotal;
                    console.log(turnTotal);
                } else if (dice1 !== 1 && dice2 !== 1) {                                 //console.log('entered 6 ' + turnTotal);
                    turnTotal += dice1 + dice2;
                    document.getElementById('turnTotal-' + playing).textContent = turnTotal; 
                } else if((dice1 === 1) || (dice2 === 1)) {                              //console.log('entered 7 ' + turnTotal);
                    next();
                }
            }
        } else {
            if(dice1 !== 1 ){
                turnTotal += dice1;
                document.getElementById('turnTotal-' + playing).textContent = turnTotal;
            } else {
                next();
            }
        }
    }
});

/******************************************************************************** ADD BUTTON IMPLEMENTATION *****************************************************************/

document.querySelector('.add').addEventListener('click', function () {
    if (game) {
        score[playing - 1] += turnTotal;
        document.getElementById('score-' + playing).textContent = score[playing - 1];
        var winningScore;
        var inputScore = document.querySelector('.winning-score').value;
        if (inputScore) {
            winningScore = inputScore;
        } else {
            winningScore = 50;
            document.querySelector('.winning-score').value = 50;
        }
        if (score[playing - 1] >= winningScore) {
            document.getElementById('name-' + playing).textContent = "winner!";
            document.querySelector('.player-' + playing).classList.add('winner');
            document.querySelector('.player-' + playing).classList.remove('playing');
            diceHide();
            game = false;
        } else {
            next();
        }
    }
});


/******************************************************************************** FUNCTIONS *****************************************************************/

function newGame() {
    turnTotal = 0;
    playing = 1;
    score = [ 0, 0 ];
    game = true;
    ScoreZero();
    turnTotalZero();
    diceHide();
    document.getElementById('name-1').textContent = "Player 1";
    document.getElementById('name-2').textContent = "Player 2";
    document.querySelector('.player-1').classList.remove('winner');
    document.querySelector('.player-2').classList.remove('winner');
    document.querySelector('.player-1').classList.remove('playing');
    document.querySelector('.player-2').classList.remove('playing');
    document.querySelector('.player-1').classList.add('playing');
    document.querySelector('.winning-score').value='';
}

function next () {
    playing === 1 ? playing = 2 : playing = 1;
    turnTotal = 0;
    turnTotalZero();
    document.querySelector('.player-1').classList.toggle('playing');
    document.querySelector('.player-2').classList.toggle('playing');
    diceHide();
}

function diceHide() {
    document.getElementById('dice-1').style.display = "none";
    document.getElementById('dice-2').style.display = "none";
}

function ScoreZero() {
    document.getElementById('score-1').textContent = 0;
    document.getElementById('score-2').textContent = 0;
}

function turnTotalZero() {
    document.getElementById('turnTotal-1').textContent = 0;
    document.getElementById('turnTotal-2').textContent = 0;
}

function v1Active() {
    document.getElementById('v1').classList.add('active');
    document.getElementById('v2').classList.remove('active');
    document.getElementById('v3').classList.remove('active');
    document.querySelector('.variant').textContent="Simple pig";
    variantTwo = false;
    variantThree = false;
}

function v2Active() {
    document.getElementById('v1').classList.remove('active');
    document.getElementById('v2').classList.add('active');
    document.getElementById('v3').classList.remove('active');
    document.querySelector('.variant').textContent="Two-dice pig";
    variantTwo = true;
    variantThree = false;
}

function v3Active() {
    document.getElementById('v1').classList.remove('active');
    document.getElementById('v2').classList.remove('active');
    document.getElementById('v3').classList.add('active');
    document.querySelector('.variant').textContent="Big pig";
    variantTwo = true;
    variantThree = true;
}

function modalClose() {
    modal.style.display = "none";
}