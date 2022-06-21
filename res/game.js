
const player = (name, move) => {
    let score = 0;
    return {
        name,
        score,
        move
    }
};

const player1 = player("Ashay", "X")
const player2 = player("Rahul", "O")

const gameBoard = (() => {
    const _gameArr = [];

    let currentTurn = player1; //First player to begin
    let continueGame = true;

    const makeMove = (move, position) => {
        _gameArr[position] = move;
        console.log(_gameArr)
    };

    const gameResult = () => {
        
        if (!continueGame) return false;

        let matchCount = {'X': 0, 'O': 0}; //initiate matches object

        for (let i=0; i<= 2; i++){ //check vertical matches
            matchCount = {'X': 0, 'O': 0}; //reset matches
            for (let j=i; j<=i+6; j+=3){
                if (_gameArr[i] === _gameArr[j]){
                    matchCount[_gameArr[i]]++;
                }
                if (matchCount['X'] === 3) return 'X';
                if (matchCount['O'] === 3) return 'O';
            }

            if (i === 0 || i === 2){ //check diagonal matches
                matchCount = {'X': 0, 'O': 0}; //reset matches
                let addFactor = 0;
                i === 0 ? addFactor = 4 : addFactor = 2;
                for (let x = i; x <= i+addFactor*2; x+=addFactor){
                    if (_gameArr[i] === _gameArr[x]){
                        matchCount[_gameArr[i]]++;
                    }
                    if (matchCount['X'] === 3) return 'X';
                    if (matchCount['O'] === 3) return 'O';
                }
            }


        }

        for (let i=0; i<= 6; i+=3){  //check horizontal matches
            matchCount = {'X': 0, 'O': 0}; //reset matches
            for (let j=i; j<=i+2; j++){
                if (_gameArr[i] === _gameArr[j]){
                    matchCount[_gameArr[i]]++;
                }

                if (matchCount['X'] === 3) return 'X';
                if (matchCount['O'] === 3) return 'O';
            }


        }
        if (Object.values(_gameArr).length == _gameArr.length) return "Tie";

        return false;

    }

    const getResult = () => {
        let currentResult = gameResult();
        if (player1.move === currentResult){
            player1.score += 1;
            continueGame = false;
        }else if(player2.move === currentResult){
            player2.score += 1;
            continueGame = false;
        }
        return currentResult;
    }

    const getGameStatus = () => continueGame;

    return {
        makeMove,
        getResult,
        currentTurn,
        getGameStatus
    }
})();

const displayController = (() => {

    const restartBut = document.querySelector(".restart-game");
    const gameGrids = document.querySelectorAll(".game-grid");
    const gameGridsArr = [...gameGrids];
    const playerScoreCard = document.querySelector(".player-score");
    const opponentScoreCard = document.querySelector(".opponent-score");
    const gameMsg = document.querySelector(".game-message");

    const displayTurn = () => {
        gameMsg.innerText = `${gameBoard.currentTurn.name}'s turn!`;
    }

    const toggleTurn = () => {
        gameBoard.currentTurn === player1 ? gameBoard.currentTurn = player2 : gameBoard.currentTurn = player1;
    }

    const updateResult = () => {
        let currentResult = gameBoard.getResult();
        if (currentResult === 'X'){
            playerScoreCard.innerText = `(${player1.score})`
            gameMsg.innerText = `${player1.name} won this round !`;
        }else if (currentResult === 'O'){
            playerScoreCard.innerText = `(${player2.score})`
            gameMsg.innerText = `${player2.name} won this round !`;

        }else if (currentResult === 'Tie'){
            gameMsg.innerText = `It's a Tie`;
        }
    }

    const markMove = (elm, position) => {
        if (!gameBoard.getGameStatus()) return;

        if (elm.innerText === "X" || elm.innerText === "O") return;
        elm.innerText = gameBoard.currentTurn.move;
        gameBoard.makeMove(gameBoard.currentTurn.move, position)
        toggleTurn();
        displayTurn();
        updateResult();
    
    }

    gameGridsArr.forEach((grid, index) => grid.addEventListener('click', (event) => {
        markMove(event.target, index);
    }))

})();

