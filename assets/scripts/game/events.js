const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')
const gameplay = require('./gameplay')

const onStartGame = function (event) {
 event.preventDefault()
 //console.log('Game Started')
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

// let currentPlayer = '✕'
// let currentMove = ''
// // Our box click event handler
// const onBoxClick = function (event) {
//   // Select the box id that was clicked, event.target
//   const box = $(event.target)
//   const cell = $(event.target.id)
//
//   // Then set the text to the current player
//   box.text(currentPlayer)
//   let index = `${event.target.id}`
//   console.log('index is: ', index, 'current player: ', currentPlayer)
//
//   // Change the current player
//   currentPlayer = currentPlayer === 'O' ? '✕' : 'O'
//
// }





module.exports = {
  onStartGame,
  onUpdateGame,
  onShowGame
}
