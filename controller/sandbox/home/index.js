'use strict'

const homePage=require('~/view/sandbox/home/index.marko');
function handleHome(req, reply){
  (async function(){
    reply(homePage.stream());
  })()
  .catch((err)=>{
    throw(err)
  })
}

module.exports=[
  {
    method:'GET',
    path:'/sandbox/home',
    handler:handleHome
  }
]
