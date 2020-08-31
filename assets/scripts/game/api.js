const store = require('./../store')
const config = require('./../config')
const events = require('./events')
const ui = require('./ui')




// startGame AJAX call
const startGame = function (data) {
console.log('start game API called')
  return $.ajax({
    url: config.apiUrl + '/games',
    method:'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: ""
  })
}


let currentPlayer = 'O'
let currentIndex = ''
let gameOver = false



// Our box click event handler
const onBoxClick = function (event) {
  // Select the box id that was clicked, event.target
  //change player
  currentPlayer = currentPlayer === 'O' ? '✕' : 'O'
  const box = $(event.target)
  const cell = $(event.target.id)

  // Then set the text to the current player
  box.text(currentPlayer)
  currentIndex = `${event.target.id}`
  //gameData.game.cell.value = currentPlayer
  console.log('index is: ', currentIndex, 'current player: ', currentPlayer)
//events.onUpdateGame()
  updateGame()
  .then(ui.onUpdateGameSuccess)
  .catch(ui.onUpdateGameFailure)
}



//Update Game API
  const updateGame = function (data) {
  console.log('update game API called', store.game._id)
  console.log(currentIndex, currentPlayer)
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
