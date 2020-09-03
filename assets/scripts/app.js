'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')
const gamePlay = require('./game/api.js')

$(() => {
  $(document).ready(gameEvents.onPageLoad)
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-pw-form').on('submit', authEvents.onChangePw)
  $('#sign-out-form').on('submit', authEvents.onSignOut)
  $('#start-game-button').on('submit', gameEvents.onStartGame)
  $('#view-games').on('submit', gameEvents.onViewGames)
  $('#show-game-button').on('submit', gameEvents.onShowGame)
  $('#0').on('click', gamePlay.onBoxClick)
  $('#1').on('click', gamePlay.onBoxClick)
  $('#2').on('click', gamePlay.onBoxClick)
  $('#3').on('click', gamePlay.onBoxClick)
  $('#4').on('click', gamePlay.onBoxClick)
  $('#5').on('click', gamePlay.onBoxClick)
  $('#6').on('click', gamePlay.onBoxClick)
  $('#7').on('click', gamePlay.onBoxClick)
  $('#8').on('click', gamePlay.onBoxClick)
})
