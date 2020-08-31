'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')

$(() => {
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-pw-form').on('submit', authEvents.onChangePw)
  $('#sign-out-form').on('submit', authEvents.onSignOut)
  $('#start-game-button').on('submit', gameEvents.onStartGame)
  $('#update-game-button').on('submit', gameEvents.onUpdateGame)
  $('#show-game-button').on('submit', gameEvents.onShowGame)
  $('.box').on('click', gameEvents.onBoxClick)
})
