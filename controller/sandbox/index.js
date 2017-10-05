'use strict'

const api = require('~/lib/api')

function sandboxHandler(req, reply){
  console.log("in sandbox controller");

  (async function(){
    console.log("In async in sandbox controller");

    //try to get the whole path to send in from here
    const sandboxData = await api.get('/sanbox');
    reply(2)
  })()
    .catch((err)=>{
      throw err;
    })
  // reply(2)
}


module.exports=[
  {
    method:'GET',
    path:'/sandbox',
    handler:sandboxHandler
  }
]
