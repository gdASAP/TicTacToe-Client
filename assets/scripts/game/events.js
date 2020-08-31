const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')

const onStartGame = function (event) {
 event.preventDefault()
 console.log('Game Started')
api.startGame()
.then(ui.onStartGameSuccess)
.catch(ui.onStartGameFailure)
}

const onUpdateGame = function (event) {
 event.preventDefault()
 console.log('Player Move Made')

api.updateGame()
.then(ui.onUpdateGameSuccess)
.catch(ui.onUpdateGameFailure)
}

const onShowGame = function(event) {
  event.preventDefault()
  api.showGame()
  .then(ui.onShowGameSuccess)
  .catch(ui.onShowGameFailure)
}


let currentPlayer = '✕'

// Our box click event handler
const onBoxClick = function (event) {
  console.log('click')

  // Select the box that was clicked, event.target
  const box = $(event.target)
 console.log(event.target)
  // Then set the text to the current player
  box.text(currentPlayer)

  // Change the current player
  currentPlayer = currentPlayer === 'O' ? '✕' : 'O'

  //call update API here
  // api.updateGame()
  // .then(ui.onUpdateGameSuccess)
  // .catch(ui.onUpdateGameFailure)
}





module.exports = {
  onStartGame,
  onUpdateGame,
  onShowGame,
  onBoxClick
}
