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

  const updateGame = function () {
  console.log('update game API called', store.game._id)
  const gameDelta = {
  {
     game: {
    cell: {
      index: 0,
      value: "x"
    },
    over: false
  }
}
 console.log(gameDelta)
  //console.log(url)
    return $.ajax({
      url: config.apiUrl + '/games/' + store.game._id,
      method:'PATCH',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      gameDelta: gameDelta
    })
}
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
    updateGame,
    showGame
  }
