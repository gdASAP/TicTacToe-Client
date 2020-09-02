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
//store.newGame = true
let callUpdate = false
let endOfGame = false

const onStartGame = function (event) {
 event.preventDefault()
$('#0').text('')
$('#1').text('')
$('#2').text('')
$('#3').text('')
$('#4').text('')
$('#5').text('')
$('#6').text('')
$('#7').text('')
$('#8').text('')
$('#gameMessage').text('')
//console.log('new game ', newGame)
api.startGame()
.then(ui.onStartGameSuccess)
.catch(ui.onStartGameFailure)
}


// Our box click event handler
const onBoxClick = function (event) {
  // Select the box id that was clicked, event.target
  //change player
   //currentPlayer = currentPlayer === 'O' ? '✕' : 'O'
  const box = $(event.target)
  // Then set the text to the current player
  currentIndex = `${event.target.id}`
  if (store.newGame) {
    //add this for messaging
    //  $('#gameMessage').text(`Player ` + `${currentPlayer}` + ` Make a selection.`)
    box.text(currentPlayer)
    store.newGame = false
    endOfGame = false
    callUpdate = true
  } else {
    //console.log('testing', `${store.game.cells[currentIndex]}`)
    if (store.game.cells[currentIndex] === '' && !endOfGame) {
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
  if(!endOfGame) {
  $('#gameMessage').text('Invalid move. Try again')
} else {
  $('#gameMessage').text('Please start a new game to continue playing.')
}
}
//gameOverCheck()
currentPlayer = currentPlayer === 'O' ? 'X' : 'O'
$('#playerMessage').text(`Player ${currentPlayer}, it's your turn.`)
if(endOfGame || store.newGame){
$('#playerMessage').text('')
}
}


//Update Game API
  const updateGame = function (data) {
  //console.log('end of game', endOfGame)
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
        over: endOfGame
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
  endOfGame = true
  updateGame()
  $('#gameMessage').text(`Game over. Player ${cellArray[0].symbol} WINS!`)
  $('#playerMessage').text('')
} else if (cellArray[0].symbol === cellArray[3].symbol &&
  cellArray[0].symbol === cellArray[6].symbol &&
  cellArray[0].symbol !=='') {
  endOfGame = true
    updateGame()
  $('#gameMessage').text(`Game over. Player ${cellArray[0].symbol} WINS!`)
  $('#playerMessage').text('')
} else if (cellArray[0].symbol === cellArray[4].symbol &&
  cellArray[0].symbol === cellArray[8].symbol &&
  cellArray[0].symbol !=='') {
  endOfGame = true
    updateGame()
  $('#gameMessage').text(`Game over. Player ${cellArray[0].symbol} WINS!`)
  $('#playerMessage').text('')
} else if (cellArray[3].symbol === cellArray[4].symbol &&
    cellArray[3].symbol === cellArray[5].symbol &&
    cellArray[3].symbol !=='') {
    endOfGame = true
      updateGame()
    $('#gameMessage').text(`Game over. Player ${cellArray[3].symbol} WINS!`)
    $('#playerMessage').text('')
} else if (cellArray[1].symbol === cellArray[4].symbol &&
    cellArray[1].symbol === cellArray[7].symbol &&
    cellArray[1].symbol !=='') {
    endOfGame = true
      updateGame()
    $('#gameMessage').text(`Game over. Player ${cellArray[1].symbol} WINS!`)
    $('#playerMessage').text('')
} else if (cellArray[2].symbol === cellArray[4].symbol &&
    cellArray[2].symbol === cellArray[6].symbol &&
    cellArray[2].symbol !=='') {
    endOfGame = true
      updateGame()
    $('#gameMessage').text(`Game over. Player ${cellArray[2].symbol} WINS!`)
    $('#playerMessage').text('')
} else if (cellArray[6].symbol === cellArray[7].symbol &&
    cellArray[6].symbol === cellArray[8].symbol &&
    cellArray[6].symbol !=='') {
    endOfGame = true
      updateGame()
    $('#gameMessage').text(`Game over. Player ${cellArray[6].symbol} WINS!`)
    $('#playerMessage').text('')
} else if (cellArray[2].symbol === cellArray[5].symbol &&
    cellArray[2].symbol === cellArray[8].symbol &&
    cellArray[2].symbol !=='') {
    endOfGame = true
      updateGame()
    $('#gameMessage').text(`Game over. Player ${cellArray[2].symbol} WINS!`)
    $('#playerMessage').text('')
} else if (cellArray[0].symbol !=='' && cellArray[1].symbol !=='' &&
    cellArray[2].symbol !=='' && cellArray[3].symbol !=='' &&
    cellArray[4].symbol !=='' && cellArray[5].symbol !=='' &&
    cellArray[6].symbol !==''&& cellArray[7].symbol !=='' &&
    cellArray[8].symbol !=='') {
    $('#gameMessage').text(`Game over. Tie Game.`)
    $('#playerMessage').text('')
    endOfGame = true
      updateGame()
}

}
  // Game API
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

const viewFinished = function () {
//console.log('show finished games')
  return $.ajax({
    url: config.apiUrl + '/games/?over=true',
    method:'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })

}

const viewUnfinished = function () {
//console.log('show finished games')
  return $.ajax({
    url: config.apiUrl + '/games/?over=false',
    method:'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })

}

//$('#playerMessage').text('')

//$('#playerStatsMessage').text(`Finished Games: ${store.finished.index}`)


  module.exports = {
  startGame,
  showGame,
  updateGame,
  onBoxClick,
  gameOverCheck,
  onStartGame,
  viewFinished,
  viewUnfinished
  }
