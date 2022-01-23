const cellsDiv = document.querySelectorAll('.cell');
const gameStatus = document.querySelector('.game--status');
const resetBtn = document.querySelector('.game--restart');
const colors = {
	X: '#00cec9',
	O: '#ff7675',
	end: '#6c5ce7',
};
let cellData = new Array(9);
for (let i = 0; i < 9; i++) {
	cellData[i] = i;
}
let counter = 0;
gameStatus.innerHTML = "It's X 's turn";
gameStatus.style.color = colors.X;
let gs = 'X';

cellsDiv.forEach((item) => {
	item.addEventListener('click', cellClicked);
});
function cellClicked(e) {
	let flag = false;
	let cellIndex = cellData[e.target.getAttribute('data-cell-index')];
	if (gs === 'X' && typeof cellIndex === 'number') {
		cellIndex = e.target.getAttribute('data-cell-index');
		cellData[cellIndex] = gs;
		e.target.innerHTML = gs;
		e.target.style.color = colors.X;
		counter++;
		flag = ifWon('X');
	}
	if (gs === 'O' && typeof cellIndex === 'number') {
		cellIndex = e.target.getAttribute('data-cell-index');
		cellData[cellIndex] = gs;
		e.target.innerHTML = gs;
		e.target.style.color = colors.O;
		counter++;
		flag = ifWon('O');
	}

	if (counter === 9 && flag === false && (gs === 'X' || gs === 'O')) {
		gameStatus.innerHTML = 'Game ended in a draw';
		gameStatus.style.color = colors.end;
	}
}

resetBtn.addEventListener('click', () => {
	counter = 0;
	cellData = [];
	cellData = new Array(9);
	for (let i = 0; i < 9; i++) {
		cellData[i] = i;
		cellsDiv[i].innerHTML = '';
	}
	gameStatus.innerHTML = "It's X 's turn";
	gameStatus.style.color = colors.X;
	gs = 'X';
});

function ifWon(player) {
	let another = player === 'X' ? 'O' : 'X';

	const hors = {
		'012': cellData[0] === cellData[1] && cellData[1] === cellData[2],
		'345': cellData[3] === cellData[4] && cellData[4] === cellData[5],
		'678': cellData[6] === cellData[7] && cellData[7] === cellData[8],
	};
	const horizontal = hors['012'] || hors['345'] || hors['678'];

	const vers = {
		'036': cellData[0] === cellData[3] && cellData[3] === cellData[6],
		'147': cellData[1] === cellData[4] && cellData[4] === cellData[7],
		'258': cellData[2] === cellData[5] && cellData[5] === cellData[8],
	};
	const vertical = vers['036'] || vers['147'] || vers['258'];

	const diags = {
		'048': cellData[0] === cellData[4] && cellData[4] === cellData[8],
		'246': cellData[2] === cellData[4] && cellData[4] === cellData[6],
	};
	const diagonal = diags['048'] || diags['246'];

	if (horizontal || vertical || diagonal) {
		for (let hvd of [hors, vers, diags]) {
			for (let logicCell in hvd) {
				if (hvd[logicCell] === true) {
					cellsDiv[logicCell[0]].style.color = colors.end;
					cellsDiv[logicCell[1]].style.color = colors.end;
					cellsDiv[logicCell[2]].style.color = colors.end;
				}
			}
		}
		gs = `Player ${player} has won`;
		gameStatus.innerHTML = gs;
		gameStatus.style.color = colors.end;
		return true;
	} else {
		gameStatus.innerHTML = `It's ${another} 's turn`;
		gameStatus.style.color = colors[another];
		gs = another;
		return false;
	}
}
