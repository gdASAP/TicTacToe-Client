const store = require('./../store')
const config = require('./../config')
const events = require('./events')
const ui = require('./ui')




// startGame AJAX call
const startGame = function (data) {
//console.log('start game API called')
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
    console.log('testing', `${store.game.cells[currentIndex]}`)
    if (store.game.cells[currentIndex] === '') {
      box.text(currentPlayer)
      callUpdate = true
    }
  }
  //gameData.game.cell.value = currentPlayer
  console.log('index is: ', currentIndex, 'current player: ', currentPlayer)
//events.onUpdateGame()
if (callUpdate && !gameOver) {
  currentPlayer = currentPlayer === 'O' ? '✕' : 'O'
  updateGame()
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
  //  currentPlayer = currentPlayer === 'O' ? '✕' : 'O'
} else {
  $('#gameMessage').text('Invalid move. Try again.')
}
}


//Update Game API
  const updateGame = function (data) {
  //console.log('update game API called', store.game._id)
  callUpdate = false
  console.log(data)
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
  onBoxClick
  }
