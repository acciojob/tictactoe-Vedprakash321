//your JS code here. If required.
document.addEventListener('DOMContentLoaded', function() {
    const player1Input = document.getElementById('player-1');
    const player2Input = document.getElementById('player-2');
    const submitButton = document.getElementById('submit');
    const messageDiv = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = '';
    let board = ['', '', '', '', '', '', '', '', ''];

    submitButton.addEventListener('click', function() {
        const player1 = player1Input.value.trim();
        const player2 = player2Input.value.trim();

        if (player1 && player2) {
            currentPlayer = player1;
            messageDiv.textContent = `${player1}, you're up`;

            document.getElementById('input-container').style.display = 'none';
            document.getElementById('board').style.display = 'grid';
        }
    });

    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            const cellId = parseInt(cell.id) - 1;

            if (board[cellId] === '' && currentPlayer) {
                board[cellId] = currentPlayer === player1Input.value.trim() ? 'X' : 'O';
                cell.textContent = board[cellId];
                if (checkWinner()) {
                    messageDiv.textContent = `${currentPlayer} congratulations, you won!`;
                    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
                } else {
                    currentPlayer = currentPlayer === player1Input.value.trim() ? player2Input.value.trim() : player1Input.value.trim();
                    messageDiv.textContent = `${currentPlayer}, you're up`;
                }
            }
        });
    });

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }

        if (board.every(cell => cell !== '')) {
            messageDiv.textContent = `It's a draw!`;
            return true;
        }

        return false;
    }
});
