'use strict';
const api = require('~/lib/api');
var bcrypt = require('bcrypt');

/****** handleSignin ********/
function handleSignin(req, reply){
  (async function(){
    const {usrname, psw}=req.payload;
    //console.log(usrname, psw);
    let usernameMatch = false;
    let hash_pw = null;
    var results = await api.get('/sign-in');
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
/**---- end handleSignin------**/

/***---- handleSignout -----*****/
function handleSignout(req, reply){
  //request.auth.session.clear();
  //return reply(‘Logout Successful!’);
  reply('hello');
}
/***--- end handleSignout ---***/

module.exports=[
  {
    method:'POST',
    path:'/sign-in',
    handler:handleSignin
  },
  {
    method:'GET',
    path:'/sign-out',
    handler:handleSignout
  }
]
