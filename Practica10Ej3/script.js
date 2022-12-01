window.addEventListener('DOMContentLoaded', () => {
    const connect4 = document.getElementById('connect4');
    const table = document.getElementById('table');
    const turnTrueRegex = /XXXX/;
    const turnFalseRegex = /OOOO/;
    let turn = true;
    let selectedCol;
    let selectedRow;
    let selectedCell = null;
    let winner = false;
    let diagonals1 = new Array();
    let diagonals2 = new Array();

    function fillTable() {
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
            alert("Winner")
            const cells = document.getElementsByTagName('td');
            for (let cell of cells) {
                cell.removeEventListener('click', gameLogic);
            }
        }
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
        fillTable();
        cellClick();
    }

    gameOn();

});