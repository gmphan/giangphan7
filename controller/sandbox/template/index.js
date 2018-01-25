'use strict'

const templatePage=require('~/view/sandbox/layout/template/index.marko');
function handleHome(req, reply){
  (async function(){
    reply(templatePage.stream());
    //reply(1);

  })()
  .catch((err)=>{
    throw(err)
  })
}

module.exports=[
  {
    method:'GET',
    path:'/sandbox/layout/template',
    handler:handleHome
  }
]
