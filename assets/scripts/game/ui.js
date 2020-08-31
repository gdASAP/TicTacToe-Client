const store = require('./../store')


const onStartGameSuccess = function (response) {
  store.game = response.game
  $('#message').text('Game Started successfully')
  console.log('response is: ', response)
  $('.board').show()
  // $('#message').addClass('success')
  // $('form').trigger('reset')
  // $('#sign-in-form').show()
  // $('#sign-up-form').show()
  // $('#sign-out-form').hide()
  // $('#change-pw-form').hide()
  //console.log('signOutSuccess ran and nothing was returned!')
  // store.user = null
}

const onStartGameFailure = function (error) {
  $('#message').text('Game failed to start')
  // $('#message').removeClass()
  // $('#message').addClass('failure')
  //console.error('signOutFailure ran. Error is :', error)
}

const onUpdateGameSuccess = function (response) {
  $('#message').text('Game Updated successfully')
  console.log('response is: ', response)

}

const onUpdateGameFailure = function (error) {
  $('#message').text('Board failed to update')
  console.error('update Failure ran. Error is :', error)
}

const onShowGameSuccess = function (response) {
  $('#message').text('Game Shown successfully')
  console.log('response is: ', response)

}

const onShowGameFailure = function (error) {
  $('#message').text('Board failed to show')
  console.error('show Failure ran. Error is :', error)
}


module.exports = {
onStartGameSuccess,
onStartGameFailure,
onUpdateGameSuccess,
onUpdateGameFailure,
onShowGameSuccess,
onShowGameFailure
}
