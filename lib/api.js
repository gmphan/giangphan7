'use strict'

const request = require('request');

const API={
  makeHttpRequest:(method, path)=>{
    return new Promise((resolve,reject)=>{
      request('http://localhost:8000/sandbox', function(error, response, body){
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
      })
      resolve()
    })
  },
  get:(path)=>{
    console.log("In get function in api.js")
    return API.makeHttpRequest('get', path)
  }
}

module.exports = API
