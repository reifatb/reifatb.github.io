window.addEventListener('DOMContentLoaded', () => {
    const connect4 = document.getElementById('connect4');
    const turnTrueRegex = /XXXX/;
    const turnFalseRegex = /OOOO/;
    const winnerP = document.getElementById('winner');
    const newgameButton = document.getElementById('newGameButton');
    let turn = true;
    let selectedCol;
    let selectedRow;
    let selectedCell = null;
    let winner = false;
    let diagonals1 = new Array();
    let diagonals2 = new Array();

    function fillTable() {
        const table = document.createElement('table');
        table.setAttribute('id', 'table');
        connect4.appendChild(table);
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            row.setAttribute('id', i);

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                cell.setAttribute('id', `${i}${j}-${6 - j}${i}`);
                row.appendChild(cell);
            }

            table.appendChild(row);
        }
    }

    function cellClick() {
        const cells = document.getElementsByTagName('td');
        for (let cell of cells) {
            cell.addEventListener('click', () => {
                selectClickedCell(cell);
            });
            cell.addEventListener('click', gameLogic);
        }
    }

    function selectClickedCell(cell) {
        selectedCell = cell;
    }

    function selectCol() {
        if (selectedCell) {
            selectedCol = parseInt(selectedCell.getAttribute('id').charAt(1));
        } else {
            selectedCol = null;
        }
    }

    function selectRow() {
        if (selectedCell) {
            selectedRow = parseInt(selectedCell.getAttribute('id').charAt(0));
        } else {
            selectedRow = null;
        }
    }

    function searchBlank() {
        let blanck = true;
        selectedCell = null;

        for (let i = 0; i < 6 && blanck; i++) {
            const cell = document.getElementById(`${i}${selectedCol}-${6 - selectedCol}${i}`);
            if (cell.innerText === '') {
                selectedCell = cell;
            } else {
                blanck = false;
            }
        }
        return selectedCell;
    }

    function draw() {
        if (selectedCell) {
            turn ? selectedCell.innerText = 'X' : selectedCell.innerText = 'O';
            createChip();

            turn ? turn = false : turn = true;
        }
    }

    function checkHorizontal() {
        let connected = 0;
        let col = selectedCol - 3;
        if (col < 0) { col = 0; }

        while (col < 6 && connected < 3) {
            const cell = document.getElementById(`${selectedRow}${col}-${6 - col}${selectedRow}`);
            const nextCell = document.getElementById(`${selectedRow}${col + 1}-${6 - (col + 1)}${selectedRow}`);
            const same = cell.innerText === nextCell.innerText;
            const sameAsSelected = cell.innerHTML === selectedCell.innerText;

            if (same && sameAsSelected) { connected++; }
            col++;
        }

        if (connected === 3) { winner = true; console.log('horizontal'); }
    }

    function checkVertical() {
        let connected = 0;
        let row = selectedRow + 1;

        while (row < 6 && connected < 3) {
            const cell = document.getElementById(`${row}${selectedCol}-${6 - selectedCol}${row}`);
            const sameAsSelected = cell.innerHTML === selectedCell.innerText;

            if (sameAsSelected) { connected++; }
            row++;
        }

        if (connected === 3) { winner = true; console.log('vertical'); }
    }

    function fillDiagonals1() {
        const cells = document.getElementsByTagName('td');
        for (let i = 0; i < 12; i++) {
            const diagonals = new Array();
            for (let cell of cells) {
                const digit0 = parseInt(cell.getAttribute('id').charAt(0));
                const digit1 = parseInt(cell.getAttribute('id').charAt(1));

                if (digit0 + digit1 === i) { diagonals.push(cell); }
            }
            diagonals1.push(diagonals);
        }
    }

    function fillDiagonals2() {
        const cells = document.getElementsByTagName('td');
        for (let i = 0; i < 12; i++) {
            const diagonals = new Array();
            for (let cell of cells) {
                const digit3 = parseInt(cell.getAttribute('id').charAt(3));
                const digit4 = parseInt(cell.getAttribute('id').charAt(4));

                if (digit3 + digit4 === i) { diagonals.push(cell); }
            }
            diagonals2.push(diagonals);
        }
    }

    function checkDiagonals() {
        for (let diagonal of diagonals1) {
            let diagonalContent = '';

            for (let cell of diagonal) {
                diagonalContent += cell.innerText;
            }
            const connected = !turn ? turnTrueRegex.test(diagonalContent) : turnFalseRegex.test(diagonalContent);
            if (connected) { winner = true; console.log('diagonal'); }
        }

        for (let diagonal of diagonals2) {
            let diagonalContent = '';

            for (let cell of diagonal) {
                diagonalContent += cell.innerText;
            }
            const connected = !turn ? turnTrueRegex.test(diagonalContent) : turnFalseRegex.test(diagonalContent);
            if (connected) { winner = true; console.log('diagonal'); }
        }
    }


    function checkWinner() {
        if (winner) {
            // alert("Winner");
            const cells = document.getElementsByTagName('td');
            for (let cell of cells) {
                cell.removeEventListener('click', gameLogic);
            }

            winnerP.innerText = turn ? '¡AMARILLAS GANAN!' : '¡ROJAS GANAN!';
            winnerP.style.color = turn ? 'yellow' : 'red';
        }
    }

    function createChip() {
        const left = selectedCell.offsetLeft;
        const top = selectedCell.offsetTop;
        const chip = document.createElement('div');
        chip.classList.add('chip');
        turn ? chip.classList.add('red') : chip.classList.add('yellow');
        chip.style.position = 'absolute';
        chip.style.left = (left + 2) + 'px';
        chip.style.top = (top + 2) + 'px';
        document.documentElement.style.setProperty('--top', top + 'px')
        chip.classList.add('falling');

        table.appendChild(chip);
    }

    function gameLogic() {
        selectCol();
        searchBlank();
        selectCol();
        selectRow();
        draw();
        checkHorizontal();
        checkVertical();
        fillDiagonals1();
        fillDiagonals2();
        checkDiagonals();
        checkWinner();
    }

    function gameOn() {
        winner = false;
        turn = true;
        connect4.innerHTML = '';
        fillTable();
        cellClick();
        winnerP.innerText = '';
    }

    gameOn();

    newgameButton.addEventListener('click', gameOn);

});