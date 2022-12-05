'use strict'

const PACMAN = '👉'
// const PACMAN = '😷'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        deg: '0'
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhost(nextLocation)
        } else {
            gameOver()
            return
        }
    }
    else if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return

        gPacman.isSuper = true
        for (var i = 0; i < gGhosts.length; i++) {
            var currGhost = gGhosts[i]
            renderCell(currGhost.location, getGhostHTML(currGhost))
        }
        // setTimeout(function () {
        //     gPacman.isSuper = false
        //     reviveGhost()
        // }, 5000);
        setTimeout(() => {
            gPacman.isSuper = false
            reviveGhost()
        }, 5000)
    }
    else if (nextCell === FOOD) {
        gFoodCount--
        updateScore(1)
        checkVictory()
    }
    else if (nextCell === CHERRY) {
        updateScore(10)
    }
    
    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, getPacmanHTML(gPacman.deg))
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            gPacman.deg = '-90'
            nextLocation.i--
            break;
        case 'ArrowRight':
            gPacman.deg = '0'
            nextLocation.j++
            break;
        case 'ArrowDown':
            gPacman.deg = '90'
            nextLocation.i++
            break;
        case 'ArrowLeft':
            gPacman.deg = '180'
            nextLocation.j--
            break;
    }
    return nextLocation
}

function getPacmanHTML(deg) {
    return `<div class="pacman" style="transform: rotate(${deg}deg)">${PACMAN}</div>`
}