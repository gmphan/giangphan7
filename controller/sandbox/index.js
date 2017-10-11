'use strict'

const api = require('~/lib/api')

function sandboxHandler(req, reply){
  console.log("in sandbox controller");

  (async function(){
    console.log("In async in sandbox controller");
    const sandboxData = await api.get('/sandbox');
    reply(sandboxData)
  })()
    .catch((err)=>{
      throw err;
    })
}

module.exports=[
  {
    method:'GET',
    path:'/sandbox',
    handler:sandboxHandler
  }
]
