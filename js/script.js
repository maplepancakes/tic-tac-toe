const selectionScreen = (function()
{
    // Loads contents of shape selection screen
    const loadScreen = function()
    {
        const body = document.querySelector(`body`);

        const center = document.createElement(`center`);
        const selectionContainer = document.createElement(`div`);
        const selectionDescription = document.createElement(`label`);
        const selection1 = document.createElement(`div`);
        const selection2 = document.createElement(`div`);
        const o = document.createElement(`label`);
        const x = document.createElement(`label`);

        selectionContainer.setAttribute(`id`, `selection-container`);

        selectionDescription.setAttribute(`id`, `selection-description`);
        selectionDescription.textContent = `Choose a shape`;

        selection1.classList.add(`selection`);
        selection1.setAttribute(`id`, `selection-1`);

        selection2.classList.add(`selection`);
        selection2.setAttribute(`id`, `selection-2`);

        o.classList.add(`shape-label`);
        o.setAttribute(`id`, `o`);
        o.textContent = `O`;

        x.classList.add(`shape-label`);
        x.setAttribute(`id`, `x`);
        x.textContent = `X`;

        body.appendChild(center);

        center.appendChild(selectionContainer);
        selectionContainer.appendChild(selectionDescription);
        selectionContainer.appendChild(selection1);
        selectionContainer.appendChild(selection2);
        selection1.appendChild(o);
        selection2.appendChild(x);
    }

    // Unloads contents of shape selection screen
    const unloadScreen = function()
    {
        const center = document.querySelector(`center`);
        const selectionContainer = document.querySelector(`#selection-container`);
        const selectionDescription = document.querySelector(`#selection-description`);
        const selection1 = document.querySelector(`#selection-1`);
        const selection2 = document.querySelector(`#selection-2`);
        const o = document.querySelector(`#o`);
        const x = document.querySelector(`#x`);

        center.remove();
    }

    return {loadScreen, unloadScreen}
})();

const playScreen = (function()
{
    // Loads playing area
    const loadScreen = function()
    {
        const body = document.querySelector(`body`);

        const center = document.createElement(`center`);
        const gridContainer = document.createElement(`div`);
        const gameDescription = document.createElement(`label`);
        const grid0 = document.createElement(`div`);
        const grid1 = document.createElement(`div`);
        const grid2 = document.createElement(`div`);
        const grid3 = document.createElement(`div`);
        const grid4 = document.createElement(`div`);
        const grid5 = document.createElement(`div`);
        const grid6 = document.createElement(`div`);
        const grid7 = document.createElement(`div`);
        const grid8 = document.createElement(`div`);
        const br = document.createElement(`br`);

        gridContainer.setAttribute(`id`, `grid-container`);
        gameDescription.setAttribute(`id`, `game-description`);
        gameDescription.textContent = `Player 1's turn!`;

        let gridArray = [grid0, grid1, grid2, grid3, grid4, grid5, grid6, grid7, grid8]

        for (let i = 0; i < gridArray.length; i++)
        {
            gridArray[i].classList.add(`grid`);
            gridArray[i].setAttribute(`id`, `${i}`);
        }

        body.appendChild(center);
        center.appendChild(gridContainer);
        center.appendChild(gameDescription);

        for (let i = 0; i < gridArray.length; i++)
        {
            gridContainer.appendChild(gridArray[i]);
        }

        center.appendChild(br);
    }

    // Loads reset button
    const resetButton = function()
    {
        const center = document.querySelector(`center`);

        const resetButton = document.createElement(`button`);

        resetButton.setAttribute(`id`, `reset-button`);
        resetButton.textContent = `RESTART`;

        center.appendChild(resetButton);

        resetButton.addEventListener(`click`, function(e)
        {
            window.location.reload();
        });
    }

    // Appends shape to grid based on player selection of grid
    const appendShapeToGrid = function(idValue, textInput, parentNode)
    {
        const inputShape = document.createElement(`label`);

        inputShape.classList.add(`input-shape`);
        inputShape.setAttribute(`id`, idValue);
        inputShape.textContent = textInput;

        parentNode.appendChild(inputShape);
    }

    // Displays game message below the playing area
    const updateGameMessage = function(message)
    {
        const gameDescription = document.querySelector(`#game-description`);

        gameDescription.textContent = message;
    }

    // Disables entire playing area
    const disableGrid = function()
    {
        const grid = document.querySelectorAll(`.grid`);

        for (let i = 0; i < grid.length; i++)
        {
            grid[i].setAttribute(`id`, `disabled-grid`);
        }
    }

    return {loadScreen, resetButton, appendShapeToGrid, updateGameMessage, disableGrid};
})();

const gameBoard = (function()
{
    // Array to store shape based on player input
    let inputArray = [``, ``, ``, ``, ``, ``, ``, ``, ``,]

    const getArray = function()
    {
        return inputArray;
    }

    return {getArray};
})();

const player = function()
{
    // Stores shape value (either `O` or `X`)
    let shape = ``;

    const getPlayerShape = function()
    {
        return shape;
    }

    const assignPlayerShape = function(value)
    {
        shape = value;
    }

    return {getPlayerShape, assignPlayerShape}
}

// ============ //
// Main program //
// ============ //
// Initializes variables that stores the player function for player 1 and player 2
let player1 = player();
let player2 = player();

// Loads contents of the shape selection screen
selectionScreen.loadScreen();

const userSelection = document.querySelectorAll(`.selection`);

for (let i = 0; i < userSelection.length; i++)
{
    // Nested code runs when user selects a shape on screen
    userSelection[i].addEventListener(`click`, function(e)
    {
        // Assigns player 1 to selected shape
        player1.assignPlayerShape(userSelection[i].textContent);

        // Assigns value of `shape` variable
        let p1s = player1.getPlayerShape();

        // Assigns `X` to `shape` variable of player2 if `O` is selected in the shape selection screen
        if (p1s === `O`)
        {
            player2.assignPlayerShape(`X`);
        }
        // Assigns `O` to `shape` variable of player2 if `X` is selected in the shape selection screen
        else if (p1s === `X`)
        {
            player2.assignPlayerShape(`O`);
        }

        // Assigns value of player2 `shape` variable to p2s
        let p2s = player2.getPlayerShape();

        // Unloads contents of shape selection screen
        selectionScreen.unloadScreen();
        // Loads contents of main playing screen
        playScreen.loadScreen();

        const gridSelection = document.querySelectorAll(`.grid`);

        // Retrieves array that stores values based on user input on tic tac toe grids
        let array = gameBoard.getArray();
        let player1Count = 0;
        let player2Count = 0;

        for (let i = 0; i < gridSelection.length; i++)
        {   
            // Nested code runs when user clicks on one of the nine tic tac toe grids
            gridSelection[i].addEventListener(`click`, function(e)
            {
                if (player1Count === player2Count && gridSelection[i].textContent === ``)
                {
                    // Appends `shape` variable of player1 to array
                    array[i] = p1s;

                    // Appends shape to tic tac toe grid
                    playScreen.appendShapeToGrid(`play-${p1s}`, p1s, gridSelection[i]);
                    
                    // Updates game message below tic tac toe grid
                    playScreen.updateGameMessage(`Player 2's turn!`);

                    player1Count++;
                }
                else if (player1Count > player2Count && gridSelection[i].textContent === ``)
                {
                    array[i] = p2s;

                    playScreen.appendShapeToGrid(`play-${p2s}`, p2s, gridSelection[i]);
                
                    playScreen.updateGameMessage(`Player 1's turn!`);

                    player2Count++;
                }
                
                if ((array[0] === p1s && array[1] === p1s && array[2] === p1s) ||
                    (array[3] === p1s && array[4] === p1s && array[5] === p1s) ||
                    (array[6] === p1s && array[7] === p1s && array[8] === p1s) ||
                    (array[0] === p1s && array[3] === p1s && array[6] === p1s) ||
                    (array[1] === p1s && array[4] === p1s && array[7] === p1s) ||
                    (array[2] === p1s && array[5] === p1s && array[8] === p1s) ||
                    (array[0] === p1s && array[4] === p1s && array[8] === p1s) ||
                    (array[2] === p1s && array[4] === p1s && array[6] === p1s))
                {
                    playScreen.updateGameMessage(`Player 1 wins!`);
                    // Loads reset button below game display message
                    playScreen.resetButton();
                    // Disables tic tac toe grid from user input
                    playScreen.disableGrid();
                }
                else if ((array[0] === p2s && array[1] === p2s && array[2] === p2s) ||
                    (array[3] === p2s && array[4] === p2s && array[5] === p2s) ||
                    (array[6] === p2s && array[7] === p2s && array[8] === p2s) ||
                    (array[0] === p2s && array[3] === p2s && array[6] === p2s) ||
                    (array[1] === p2s && array[4] === p2s && array[7] === p2s) ||
                    (array[2] === p2s && array[5] === p2s && array[8] === p2s) ||
                    (array[0] === p2s && array[4] === p2s && array[8] === p2s) ||
                    (array[2] === p2s && array[4] === p2s && array[6] === p2s))
                {
                    playScreen.updateGameMessage(`Player 2 wins!`);
                    playScreen.resetButton();
                    playScreen.disableGrid();
                }
                else if (player1Count === 5 && player2Count === 4)
                {
                    playScreen.updateGameMessage(`It's a tie!`);
                    playScreen.resetButton();
                    playScreen.disableGrid();
                }
            });
        }
    });
}

