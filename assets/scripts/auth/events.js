'use strict'
const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')

const onSignUp = function (event) {
 event.preventDefault()
 const form = event.target //get the form from the event
 const data = getFormFields(form) //get the data from the data
 //console.log('event data is: ', da  ta)
api.signUp(data) //send data in AJAX request
.then(ui.onSignUpSuccess) // handle success response
.catch(ui.onSignUpFailure) // handle erro response
}

const onSignIn = function (event) {
 event.preventDefault()
 const form = event.target
 const data = getFormFields(form)
 console.log ('the data is: ', data)
api.signIn(data)
.then(ui.onSignInSuccess)
.catch(ui.onSignInFailure)
}


const onChangePw = function (event) {
 event.preventDefault()
 const form = event.target
 const data = getFormFields(form)
 console.log('event data is: ', data)
api.changePw(data)
.then(ui.onChangePwSuccess)
.catch(ui.onChangePwFailure)
}

const onSignOut = function (event) {
 event.preventDefault()
 console.log('sign out ran')
api.signOut()
.then(ui.onSignOutSuccess)
.catch(ui.onSignOutFailure)
}


module.exports = {
  onSignUp,
  onSignIn,
  onChangePw,
  onSignOut
}
