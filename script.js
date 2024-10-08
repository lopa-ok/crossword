const apiKey = 'YOUR_WORDSAPI_KEY';
const apiBaseUrl = 'https://wordsapiv1.p.rapidapi.com/words/';
const headers = {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
};

const fallbackPuzzle = {
    grid: [
        ['C', 'A', 'T', '', '', ''],
        ['', '', 'O', '', '', ''],
        ['', '', 'W', 'I', 'N', 'D'],
        ['', '', '', '', '', ''],
        ['', '', 'D', 'O', 'G', ''],
        ['', '', '', '', '', '']
    ],
    clues: [
        { direction: 'across', number: 1, clue: 'A common pet', word: 'CAT' },
        { direction: 'across', number: 2, clue: 'A strong breeze', word: 'WIND' },
        { direction: 'across', number: 3, clue: 'Another common pet', word: 'DOG' },
        { direction: 'down', number: 4, clue: 'What a pet says', word: 'COW' }
    ]
};

async function fetchWord() {
    const response = await fetch(`${apiBaseUrl}?random=true`, { headers });
    return await response.json();
}

async function fetchDefinition(word) {
    const response = await fetch(`${apiBaseUrl}${word}/definitions`, { headers });
    return await response.json();
}

async function generateCrossword() {
    try {
        const words = [];
        const clues = [];

        for (let i = 0; i < 5; i++) {
            const wordData = await fetchWord();
            const word = wordData.word;
            const definitionData = await fetchDefinition(word);
            const definition = definitionData.definitions[0].definition;

            words.push(word.toUpperCase());
            clues.push({ word, definition });
        }

        createGrid(words);
        displayClues(clues);
    } catch (error) {
        console.error("API request failed, loading fallback crossword:", error);
        loadFallbackCrossword();
    }
}

function createGrid(words) {
    const crosswordTable = document.getElementById('crossword');
    crosswordTable.innerHTML = '';

    const gridSize = 10;
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));

    // Logic to place words on the grid with overlaps
    words.forEach((word, index) => {
        const startRow = Math.floor(Math.random() * gridSize);
        const startCol = Math.floor(Math.random() * gridSize);

        let placed = false;

        for (let attempt = 0; attempt < 100; attempt++) {
            const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            const row = direction === 'horizontal' ? startRow : Math.floor(Math.random() * (gridSize - word.length));
            const col = direction === 'vertical' ? startCol : Math.floor(Math.random() * (gridSize - word.length));

            if (canPlaceWord(grid, word, row, col, direction)) {
                placeWord(grid, word, row, col, direction);
                placed = true;
                break;
            }
        }

        if (!placed) {
            console.log(`Failed to place word: ${word}`);
        }
    });

    renderGrid(grid);
}

function renderGrid(grid) {
    const crosswordTable = document.getElementById('crossword');
    crosswordTable.innerHTML = '';

    grid.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach((cell, colIndex) => {
            const td = document.createElement('td');
            if (cell !== '') {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.dataset.letter = cell;
                input.addEventListener('input', () => validateInput(input));
                td.appendChild(input);
            } else {
                td.classList.add('black');
            }
            tr.appendChild(td);
        });
        crosswordTable.appendChild(tr);
    });
}

function canPlaceWord(grid, word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        const r = direction === 'horizontal' ? row : row + i;
        const c = direction === 'vertical' ? col : col + i;

        if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
            return false;
        }
        return true;
    }
}

function placeWord(grid, word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        const r = direction === 'horizontal' ? row : row + i;
        const c = direction === 'vertical' ? col : col + i;

        grid[r][c] = word[i];
    }
}

function loadFallbackCrossword() {
    renderGrid(fallbackPuzzle.grid);
    displayClues(fallbackPuzzle.clues);
}

function displayClues(clues) {
    const cluesDiv = document.getElementById('clues');
    cluesDiv.innerHTML = '';

    clues.forEach((clue, index) => {
        const div = document.createElement('div');
        div.classList.add('clue');
        div.textContent = `${clue.number}. ${clue.clue} (${clue.word.length} letters)`;

        const hintButton = document.createElement('button');
        hintButton.textContent = 'Hint';
        hintButton.classList.add('hint-button');
        hintButton.addEventListener('click', () => {
            alert(`Hint: The word starts with "${clue.word[0]}"`);
        });

        div.appendChild(hintButton);
        cluesDiv.appendChild(div);
    });
}

function validateInput(input) {
    const expectedLetter = input.dataset.letter;
    if (input.value.toUpperCase() === expectedLetter) {
        input.classList.add('correct');
        input.classList.remove('incorrect');
    } else {
        input.classList.add('incorrect');
        input.classList.remove('correct');
    }
}


generateCrossword();
