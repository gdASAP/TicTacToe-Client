const config = require('./../config')
const store = require('./../store')


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

  const updateGame = function (currentGame) {
  console.log('update game API called', store.game._id)
  console.log(currentGame)
  //console.log(url)
    return $.ajax({
      url: config.apiUrl + '/games/' + store.game._id,
      method:'PATCH',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      currentGame: currentGame
    })
}
    const showGame = function (currentGame) {
      return $.ajax({
        url: config.apiUrl + '/games/' + store.game._id,
        method:'GET',
        headers: {
          Authorization: 'Token token=' + store.user.token
        },
        currentGame: currentGame
    })

}
  module.exports = {
    startGame,
    updateGame,
    showGame
  }
