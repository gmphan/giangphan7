'use strict';

const loginBasicPage=require('~/view/sandbox/login-basic/index.marko');
function handleLogin(req, reply){
  (async function(){
    reply(loginBasicPage.stream());
  })()
  .catch((err)=>{
    throw err;
  });
}

module.exports=[
  {
    method:'get',
    path:'/sandbox/login-basic',
    handler:handleLogin
  }
]
