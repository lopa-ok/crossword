# Dynamic Crossword Puzzle

A dynamic crossword puzzle game built with HTML, CSS, and JavaScript. The game fetches words and their definitions from an API to generate a new puzzle each time.



## How to Play

1. **Start the Game**: Open the `index.html` file in your web browser to load the crossword puzzle.
2. **Solve the Puzzle**:
   - A crossword grid will appear with some cells shaded black. These black cells are not part of the puzzle.
   - Read the clues provided on the screen. They are divided into "Across" and "Down" clues.
   - Click on any cell in the grid to start typing your answer. The focus will move to the next cell automatically as you type.
3. **Hints**:
   - If you're stuck, you can use the hint button next to each clue to reveal a letter in the corresponding word.
4. **Check Your Answers**:
   - Correct answers will turn green with a light green background, indicating you’ve filled in the correct word.
   - Incorrect answers will turn red with a light red background, suggesting you may need to try a different word.
5. **Complete the Puzzle**: Continue filling in the grid until all the words are correct.




### Prerequisites

- An API key from [WordsAPI](https://rapidapi.com/dpventures/api/wordsapi) to fetch words and definitions.

### Installation

1. **Clone or download the repository**:
    ```bash
    git clone https://github.com/your-username/crossword-puzzle.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd crossword-puzzle
    ```

3. **Set up the API key**:
    - Open `script.js`.
    - Replace `YOUR_WORDSAPI_KEY` with your actual API key.

4. **Run the game**:
    - Open `index.html` in your web browser.




## Contributing

Contributions are welcome! If you have suggestions for improving the game or find any bugs, please open an issue or submit a pull request.

Enjoy solving puzzles!
