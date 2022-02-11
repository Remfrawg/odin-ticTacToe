var player = (function (name, playerVal) {
    let moves = [];

    function getMoves(){
        return moves; 
    }
    function addNewMove(newMove){
        moves.push(newMove);
    }
    function reset (){
        moves = [];
    }
    return {
        name,
        playerVal,
        getMoves : getMoves,
        addNewMove : addNewMove,
        reset,
    }
});

let player1 = player('', 'X');
let player2 = player('', 'O');

var gameBoard = (function (){
    let squares = [];    
    let container = document.querySelector("#gameContainer");
    let playerTurn = document.querySelector("#playerTurn");
    let startButton = document.querySelector("#submitStart");
    let startForm = document.querySelector('#bgModal');
    let endForm = document.querySelector('#bgCloseForm');
    let resetButton = document.querySelector('#resetButton');
    let newPlayers = document.querySelector('#newPlayers');
    let exitButton = document.querySelector('#exit');

    for (let i = 0; i<9; i++){
        let newDiv = document.createElement('div');
        newDiv.classList.add("gameSquare");
        squares.push(newDiv);
    };
    squares.forEach(element =>{
        container.appendChild(element);
        element.addEventListener('click', () => gameLogic.addNewPlay(squares.indexOf(element)));
    });

    startButton.addEventListener('click', () =>{
        startForm.style.display = 'none';
        const _player1name = document.querySelector('#player1name');
        const _player2name = document.querySelector('#player2name');
        if (_player2name.value == ''){
            player2.name = 'O';
        }
        else{
            player2.name = _player2name.value;
        }
        if (_player1name.value == ''){
            player1.name = 'X';
        }
        else{
            player1.name = _player1name.value;
        }
        changeTurnCard(player1.name);
    });
    resetButton.addEventListener('click', ()=>{
        _reset();
        changeTurnCard(player1.name);
        endForm.style.display = 'none';
    });
    newPlayers.addEventListener('click', ()=>{
        _reset();
        startForm.style.display = 'flex';
        endForm.style.display = 'none';
    });
    exitButton.addEventListener('click', ()=>{
        endForm.style.display = 'none';
        changeTurnCard('',true);
    });

    function _reset(){
        for (let i = 0; i<9; i++){
            squares[i].innerText = '';
        }
        gameLogic.reset();
    }
    function addPlay(i, char){
        squares[i].innerText = char;
    }
    function changeTurnCard(player, quit = false){
        if (quit == false){
        playerTurn.textContent = ` ${(player.toUpperCase())} GO! SEEK! DESTROY!`
        }
        else {
            playerTurn.textContent = `Game Over`;
        }
    }
    function closeOptions(){
        endForm.style.display = 'flex';
    }
    return {
        addPlay,
        changeTurnCard,
        closeOptions,
    };
})();


var gameLogic = (function (){
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let counter = 0;
    let playing = true;
    let _nextPlayer = player2;
    function addNewPlay(index){
         if (!(player1.getMoves().includes(index) || player2.getMoves().includes(index) || playing == false)){
            let _currentPlayer = _whoseTurn();
             _currentPlayer.addNewMove(index);
             gameBoard.addPlay(index, _currentPlayer.playerVal);
             if (counter >=5){_checkWin(_currentPlayer, index)};
             if ((player1.getMoves().length + player2.getMoves().length) >=9 && playing == true){
                alert("tie! you both suck!");
                gameBoard.closeOptions();
             };
             gameBoard.changeTurnCard(_nextPlayer.name);
             _nextPlayer = _currentPlayer;
        };  
    };
    function _whoseTurn (){
        if (counter %2 == 0){
            counter+=1;
            return player1;
        }
        else{
            counter+=1;
            return player2;
        };
    };
    function _checkWin(currentPlayer){
        let playerMoves = currentPlayer.getMoves();
        let winCheck = (arr, target) => target.every(m =>arr.includes(m));
        wins.forEach(win => {
            if (winCheck(playerMoves,win) == true){ 
                alert(`${currentPlayer.name} won! you suck ${_nextPlayer.name}!`)
                playing = false;
                gameBoard.closeOptions();
            };
        });
    };
    function reset(){
        playing = true;
        player1.reset();
        player2.reset();
        counter = 0;
    };

    return {
        addNewPlay,
        reset,
    }
})();