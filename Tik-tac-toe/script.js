const gameBoard = document.getElementById('gameBoard');
const cells = Array.from(document.getElementsByClassName('cell'));
const newGameButton = document.getElementById('newGameButton');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const playAgainButton = document.getElementById('playAgainButton');
const playerXScore = document.getElementById('playerXScore');
const playerOScore = document.getElementById('playerOScore');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0 };

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const updateScores = () => {
    playerXScore.innerText = `Player X: ${scores.X}`;
    playerOScore.innerText = `Player O: ${scores.O}`;
};

const checkWin = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};

const checkDraw = () => {
    return board.every(cell => cell !== '');
};

const handleCellClick = (e) => {
    const index = e.target.getAttribute('data-index');

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (checkWin()) {
        scores[currentPlayer]++;
        updateScores();
        resultMessage.innerText = `${currentPlayer} wins!`;
        gameActive = false;
        resultScreen.style.display = 'flex';
    } else if (checkDraw()) {
        resultMessage.innerText = 'Draw!';
        gameActive = false;
        resultScreen.style.display = 'flex';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
    gameActive = true;
    resultScreen.style.display = 'none';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
newGameButton.addEventListener('click', resetGame);
playAgainButton.addEventListener('click', resetGame);

// Initialize scores display
updateScores();
