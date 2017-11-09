'use strict';
const api = require('~/lib/api');
var bcrypt = require('bcrypt');

/******** handleLogin *******************/
const signinComponent=require('~/components/sign-in/index.marko');
function handleSignin(req, reply){
  //console.log(req.cookieAuth);
  (async function(){
    reply(signinComponent.stream());
  })()
  .catch((err)=>{
    throw err;
  });
}

/***------ End handleLogin -----------****/

module.exports=[
  {
    method:'GET',
    path:'/sign-in',
    handler:handleSignin
  }
]
