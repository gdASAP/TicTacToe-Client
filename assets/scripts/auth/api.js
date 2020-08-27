'use strict'

const config = require('./../config')
const store = require('./../store')

// signUp AJAX call
const signUp = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method:'POST',
    data: data
  })
}

// signIn AJAX call
const signIn = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method:'POST',
    data: data
  })
}

// changePW AJAX call
const changePw = function (data) {
  console.log ('store user token is: ', store.user.token)
  console.log ('password data is : ', data)
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

// signOut AJAX call
const signOut = function () {
console.log('sign out ran for real')
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method:'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}


module.exports = {
 signUp,
 signIn,
 changePw,
 signOut
}
