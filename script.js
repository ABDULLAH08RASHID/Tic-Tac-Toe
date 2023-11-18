let heading = document.getElementById('h1')
let restartBtn = document.getElementById('restart')
let boxes = Array.from(document.getElementsByClassName("box"))
let winningIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_Text = "O"
const X_Text = "X"
let currentPlayer = X_Text;
let spaces = Array(9).fill(null)
let countPlays = 0

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id
    
    if(!spaces[id] && countPlays < 9) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if (playerHasWon() !== false) {
            heading.innerHTML = `${currentPlayer} has won`
            let winningBlocks = playerHasWon()
            countPlays = 10
            winningBlocks.map( box => boxes[box].style.backgroundColor = winningIndicator)
            return
        }
        countPlays++

        currentPlayer = currentPlayer == X_Text ? O_Text : X_Text
    }

    if(countPlays === 9) {
        heading.innerHTML = 'Game Draw !'
    }

}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)
    countPlays = 0

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    heading.innerHTML = "Tic Tac Toe"

    currentPlayer = X_Text
}

startGame();