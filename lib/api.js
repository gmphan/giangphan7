'use strict'

const request = require('request');

const API={
  makeHttpRequest:(method, path, body)=>{
    return new Promise((resolve,reject)=>{
      request({
          method:method, //default as GET, so only need to send in when it is not get
          url:'http://0.0.0.0:8000'+path,
          json:body ? true:undefined,
          body:body
        },
        //body in the above is different then the body in the callback function
        //the above body is send in from request
        //body in callback function is return from after request() finish
        function(error, response, body){
          if(error){
            throw error;
          }else{
            //console.log(body)
            //if I receive "Unexpected token s in JSON" error
            //it is because of the JSON.parse(body) can't parse
            //the reply from API -- check API reply for this
            //The reply probably an incorrect string      
            //if the return body is a string then use JSON.parse(body)
            //to turn that string into javascript object (JSON).
            //or else the data already JSON type
            //!!!important the string still have to be in json format.
            //if confused read more from here
            //https://www.w3schools.com/js/js_json_parse.asp
            resolve(typeof body==='string' ? JSON.parse(body):body);
          }
          //response parameter has to be there even we don't use it
          //with out it the parameter order will be wrong
      })
    })
  },
  get:(path)=>{
    //console.log("In get function in api.js")
    return API.makeHttpRequest('get', path)
  },
  post:(path, body)=>{
    return API.makeHttpRequest('post', path, body)
  }
}

module.exports = API
