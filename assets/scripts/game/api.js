const store = require('./../store')
const config = require('./../config')
const events = require('./events')
const ui = require('./ui')

//cell prototype
function cell(name, symbol) {
  this.name = name
  this.symbol = symbol
}

let zero = new cell('zero', '')
let one = new cell('one', '')
let two = new cell('two', '')
let three = new cell('three', '')
let four = new cell('four', '')
let five = new cell('five', '')
let six = new cell('six', '')
let seven = new cell('seven', '')
let eight = new cell('eight', '')

let cellArray = [zero, one, two, three, four, five, six, seven, eight]


// startGame AJAX call
const startGame = function (data) {


  return $.ajax({
    url: config.apiUrl + '/games',
    method:'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: ""
  })
}


let currentPlayer = 'X'
let currentIndex = ''
let gameOver = false
let newGame = true
let callUpdate = false



// Our box click event handler
const onBoxClick = function (event) {
  // Select the box id that was clicked, event.target
  //change player
   //currentPlayer = currentPlayer === 'O' ? '✕' : 'O'
  const box = $(event.target)
  // Then set the text to the current player
  currentIndex = `${event.target.id}`
  if (newGame) {
    //add this for messaging
    //  $('#gameMessage').text(`Player ` + `${currentPlayer}` + ` Make a selection.`)
    box.text(currentPlayer)
    newGame = false
    callUpdate = true
  } else {
    //console.log('testing', `${store.game.cells[currentIndex]}`)
    if (store.game.cells[currentIndex] === '' && !gameOver) {
      box.text(currentPlayer)
      callUpdate = true
    }
  }
  //console.log('index is: ', currentIndex, 'current player: ', currentPlayer)
if (callUpdate) {

  updateGame()
    .then(ui.onUpdateGameSuccess)
    .then(gameOverCheck)
    .catch(ui.onUpdateGameFailure)

//gameOverCheck()
  //  currentPlayer = currentPlayer === 'O' ? '✕' : 'O'
} else {
  if(!gameOver) {
  $('#gameMessage').text('Invalid move. Try again')
} else {
  $('#gameMessage').text('Please start a new game to continue playing.')
}
}
//gameOverCheck()
currentPlayer = currentPlayer === 'O' ? 'X' : 'O'
}


//Update Game API
  const updateGame = function (data) {
  //console.log('update game API called', store.game._id)
  callUpdate = false
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game._id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      game: {
        cell: {
          index: currentIndex,
          value: currentPlayer
        },
        over: false
      }
    }
  })
}

// if (gameOver === false) {
//   updateGame(data)
// }

const gameOverCheck = function () {
for (let i = 0; i < store.game.cells.length; i++) {
  cellArray[i].symbol = store.game.cells[i]
  //console.log(cellArray[i].symbol)
  }
if (cellArray[0].symbol === cellArray[1].symbol &&
  cellArray[0].symbol === cellArray[2].symbol &&
  cellArray[0].symbol !=='') {
  gameOver = true
  $('#gameMessage').text(`Game over. Player ${cellArray[0].symbol} WINS!`)
} else if (cellArray[0].symbol === cellArray[3].symbol &&
  cellArray[0].symbol === cellArray[6].symbol &&
  cellArray[0].symbol !=='') {
  gameOver = true
  $('#gameMessage').text(`Game over. Player ${cellArray[0].symbol} WINS!`)
} else if (cellArray[0].symbol === cellArray[4].symbol &&
  cellArray[0].symbol === cellArray[8].symbol &&
  cellArray[0].symbol !=='') {
  gameOver = true
  $('#gameMessage').text(`Game over. Player ${cellArray[0].symbol} WINS!`)
} else if (cellArray[3].symbol === cellArray[4].symbol &&
    cellArray[3].symbol === cellArray[5].symbol &&
    cellArray[3].symbol !=='') {
    gameOver = true
    $('#gameMessage').text(`Game over. Player ${cellArray[3].symbol} WINS!`)
} else if (cellArray[1].symbol === cellArray[4].symbol &&
    cellArray[1].symbol === cellArray[7].symbol &&
    cellArray[1].symbol !=='') {
    gameOver = true
    $('#gameMessage').text(`Game over. Player ${cellArray[1].symbol} WINS!`)
} else if (cellArray[2].symbol === cellArray[4].symbol &&
    cellArray[2].symbol === cellArray[6].symbol &&
    cellArray[2].symbol !=='') {
    gameOver = true
    $('#gameMessage').text(`Game over. Player ${cellArray[2].symbol} WINS!`)
} else if (cellArray[6].symbol === cellArray[7].symbol &&
    cellArray[6].symbol === cellArray[8].symbol &&
    cellArray[6].symbol !=='') {
    gameOver = true
    $('#gameMessage').text(`Game over. Player ${cellArray[6].symbol} WINS!`)
} else if (cellArray[2].symbol === cellArray[5].symbol &&
    cellArray[2].symbol === cellArray[8].symbol &&
    cellArray[2].symbol !=='') {
    gameOver = true
    $('#gameMessage').text(`Game over. Player ${cellArray[2].symbol} WINS!`)
}
}

//Show Game API
    const showGame = function () {
  console.log('show game API called', store.game._id)
      return $.ajax({
        url: config.apiUrl + '/games/' + store.game._id,
        method:'GET',
        headers: {
          Authorization: 'Token token=' + store.user.token
        }
      })

}




  module.exports = {
  startGame,
  showGame,
  updateGame,
  onBoxClick,
  gameOverCheck
  }
