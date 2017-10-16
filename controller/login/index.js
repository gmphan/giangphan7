'use strict';


/******** handleLogin *******************/
const loginPage=require('~/view/login/index.marko');
function handleLogin(req, reply){
  (async function(){
    reply(loginPage.stream());
  })()
  .catch((err)=>{
    throw err;
  });
}

/***------ End handleLogin -----------****/

/******* handleValidateLogin *************/
function handleValidateLogin(req, reply){
  (async function(){
    const {usrname, psw} = req.payload;
    console.log(usrname + psw);
  

    reply('testing')




  })()
  .catch((err)=>{
    throw err;
  });
}

/****---- End handleValidateLogin -----****/

module.exports=[
  {
    method:'GET',
    path:'/login',
    handler:handleLogin
  },
  {
    method:'POST',
    path:'/validate/login',
    handler:handleValidateLogin
  }
]
