var gameBoard = (function (){
    let squares = [];
    let container = document.querySelector("#gameContainer");
        for (let i = 0; i<9; i++){
            let newDiv = document.createElement('div');
            newDiv.classList.add("gameSquare");
            squares.push(newDiv);
        };

    function render(){
        squares.forEach(element =>{
            container.appendChild(element);
            element.addEventListener('click', () => gameLogic.addNewPlay(squares.indexOf(element)))
        });
    };
    function clear(){
        while (container.lastChild){
            container.removeChild(container.lastChild);
        }
    }

    function addPlay(i, char){
        squares[i].innerText = char;
        //clear();
        //render();

    }
    return {
        render : render,
        addPlay : addPlay,

    };
})();

var gameLogic = (function (){
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let counter = 0;
    function addNewPlay(index){
         if (!(player1.getMoves().includes(index) || player2.getMoves().includes(index))){
            let currentPlayer = _whoseTurn();
             currentPlayer.addNewMove(index);
             gameBoard.addPlay(index, currentPlayer.playerVal);
             _checkWin(currentPlayer, index);
             
        }
        
    }
    function _whoseTurn (){
        if (counter %2 == 0){
            counter+=1;
            return player1;
        }
        else{
            counter+=1;
            return player2;
        }
    }
    function _checkWin(currentPlayer, index){
        let playerMoves = currentPlayer.getMoves();
        let winCheck = (arr, target) => target.every(m =>arr.includes(m));
        wins.forEach(win => {
            //console.log(win);
            //console.log(playerMoves);
            if (winCheck(playerMoves,win) == true){ 
                gameBoard.addPlay(index, currentPlayer.name);
            }
        });
    }

    return {
        addNewPlay : addNewPlay,
    }
})();

var player = (function (name, playerVal) {
    let moves = [];
    let score = 0;

    function addPlay (){
        moves.push(1)
        moves.push(9)
        moves.push(5)
    }
    function getMoves(){
        return moves; 
    }

    function addNewMove(newMove){
        moves.push(newMove);
        console.log(moves);
    }
 
    return {
        getMoves : getMoves,
        addNewMove : addNewMove,
        playerVal : playerVal,
        name : name,

    }
});
gameBoard.render();
let player1 = player('Remy', 'X');
let player2 = player('Lily', 'O');
console.log(player1.playerVal)
console.log(player2.playerVal)
