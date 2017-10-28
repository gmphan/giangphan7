'use strict';
const api = require('~/lib/api');
var bcrypt = require('bcrypt');

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
    let usernameMatch = false;
    let hash_pw = false;
    var results = await api.get('/validate/login');
    for(let i=0; i<results.length; i++){
      //since I made user_name unique, there is not duplicate user_name
      if(results[i].user_name===usrname){
        usernameMatch = true;
        hash_pw = results[i].hash_pw;
        break;
      }
    }
    //console.log(usernameMatch); //scare this might happen before for loop
    if(usernameMatch==false){
      reply('badUsername')
    }else if(usernameMatch==true){
      // bcrypt.hash('o1', 10, function(err, hash) {
      //   console.log(hash);
      // }); //I used this to create my hash password
      bcrypt.compare(psw, hash_pw, function(err, res){

        if(err){
          throw err;
        }else if(res == false){
          reply ('badPassword');
        }else if(res == true){
              const credentials={
                username:usrname,
                password:hash_pw
              }
              const sid = usrname;

              req.server.app.cache.set(sid, {credentials:credentials}, 0, (err) => {
                  if (err) {
                      throw err;
                  }else{
                    //set cookieAuth Object with session id
                    req.cookieAuth.set({ sid: sid });
                    return reply('matched');
                  }
              });
        }
      })
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
