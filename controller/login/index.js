'use strict';
const api = require('~/lib/api');

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

    var results = await api.get('/validate/login');

    for(let i=0; i<results.length; i++){
      if(results[i].user_name===usrname && results[i].user_password===psw){
        const credentials={
          username:usrname,
          password:psw
        }
        const sid = usrname;
        //from the req, get to the server.app.cache to set the cache session
        req.server.app.cache.set(sid, {credentials:credentials}, 0, (err) => {
            if (err) {
                throw err;
            }else{
              req.cookieAuth.set({ sid: sid });
              return reply('Successfull Logged in and authenticate')
            }
        });
      }
    }

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
