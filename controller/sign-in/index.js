'use strict';

/****** handleSignin ********/
function handleSignin(req, reply){
  (async function(){
    const {usrname, psw}=req.payload;
    console.log(usrname, psw);
  })()
  .catch((err)=>{
    throw err;
  });
}
/**---- end handleSignin------**/

module.exports=[
  {
    method:'POST',
    path:'/sign-in',
    handler:handleSignin
  }
]
