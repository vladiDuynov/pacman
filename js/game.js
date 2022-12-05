'use strict'

// TODO Create a modal
// TODO Random ghost colors
// TODO Super-food at the corners
// TODO Cherry every 15 seconds
// TODO When all foods is over - gameOver()

// TODO Super-food for 5 seconds, ghosts changes color
// TODO If pacman meets a ghost it kills it (ghosts are back to life)
// TODO Cannot eat more super-food while in super mode

// TODO Bonus: rotate pacman

const WALL = '🗄'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🍬'
const CHERRY = '🍒'

var gPowerFoodIntervalId
var gAddCherryIntervalId
var gFoodCount = 0
var gGame
var gBoard

function onInit() {
    gGame = {
        score: 0,
        isOn: false,
        isVictory: false,
        deadGhosts: []
    }
    gGhosts = []
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gAddCherryIntervalId = setInterval(addCherry, 3000)
    toggleModal('', false)
    // document.querySelector('.game-over-modal').style.opacity = '0'
    // document.querySelector('.victory-modal').style.opacity = '0'
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            } else {
                board[i][j] = FOOD
                gFoodCount++
            }
        }
    }
    board[1][1] = POWER_FOOD
    board[8][8] = POWER_FOOD
    board[8][1] = POWER_FOOD
    board[1][8] = POWER_FOOD
    gFoodCount -= 5
    console.log(gFoodCount)
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function addCherry() {
    var randEmptyCell = getEmptyCell(gBoard)
    if(!randEmptyCell) return
 
    // Update Model
    gBoard[randEmptyCell.i][randEmptyCell.j] = CHERRY

    // Update DOM
    renderCell(randEmptyCell, CHERRY)
}

function getEmptyCell(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if (currCell === EMPTY) {
                emptyCells.push({ i, j })
            }
        }
    }
    if(!emptyCells.length) return null

    var randIdx = getRandomIntInclusive(0, emptyCells.length - 1)
    return emptyCells[randIdx]
}

function gameOver() {
    // TODO
    clearInterval(gIntervalGhosts)
    clearInterval(gAddCherryIntervalId)
    gGame.isOn = false
    if (gGame.isVictory) {
        renderCell(gPacman.location, '👑')
        toggleModal('You Won!!!', true)
        // document.querySelector('.victory-modal').style.opacity = '1'
    } else {
        renderCell(gPacman.location, '💥')
        toggleModal('Game Over', true)
        // document.querySelector('.game-over-modal').style.opacity = '1'
    }
}


function checkVictory() {
    if (gFoodCount === 0) {
        gGame.isVictory = true
        gameOver()
    }

}


function toggleModal(msg, isOpen){
    const opacity = isOpen ? '1' : '0'
    const elModal = document.querySelector('.modal')
    const elSpan = elModal.querySelector('.msg')
    elSpan.innerText = msg
    elModal.style.opacity = opacity
}