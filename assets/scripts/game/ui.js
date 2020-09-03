const store = require('./../store')
const api = require('./api')



const onStartGameSuccess = function (response) {
  store.game = response.game
  $('#message').text('Game Started successfully')
  //console.log('response is: ', response)
  $('.container').show()
  $('#playerMessage').text('')
  $('#gameMessage').text('')
}

const onStartGameFailure = function (error) {
  $('#message').text('Game failed to start')
  //console.log('error is: ', error)
}

const onUpdateGameSuccess = function (response) {
  $('#gameMessage').text('Valid move. Nice Job!')
  //console.log('response is: ', response)
  store.game = response.game

}

const onUpdateGameFailure = function (error) {
  $('#message').text('Board failed to update')
  //console.error('update Failure ran. Error is :', error)
}

const onShowGameSuccess = function (response) {
  $('#message').text('Game Shown successfully')
  //console.log('response is: ', response)

}

const onShowGameFailure = function (error) {
  $('#message').text('Board failed to show')
//console.error('show Failure ran. Error is :', error)
}

const onViewGamesSuccess = function (response) {
  $('#message').text('Game History Shown successfully')
//  console.log('response is: ', response)
  store.view = response.games
  $('#gameMessage').text(`You have played ${store.view.length} games` )
  //console.log(store.finished)

}

const onViewGamesFailure = function (error) {
  $('#message').text('Game History failed to show')
//  console.error('show Failure ran. Error is :', error)
}



module.exports = {
onStartGameSuccess,
onStartGameFailure,
onUpdateGameSuccess,
onUpdateGameFailure,
onShowGameSuccess,
onShowGameFailure,
onViewGamesSuccess,
onViewGamesFailure
}
