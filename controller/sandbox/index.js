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

/**********handleSandboxSearch*******************/
function handleSandboxSearch(req, reply){

  let id=req.params.id;
  (async function(){
    const result=await api.get('/sandbox/'+id);
    reply(result)
  })()
  .catch((err)=>{
    throw err;
  })

}

/**-------end handleSandboxSearch--------------**/

/******** handleUpdateSandbox *************/
function handleUpdateSandbox(req,reply){
  console.log(req.session);
  let id=req.params.id;
  let testing='testing from ui'
  let body={
    biography:'this is from UI handleUpdateSandbox',
    update_by:'gphan'
  };
  (async function(){
    const sandboxPOST = await api.post('/update/sandbox/'+id, body)
    reply(1)
  })()
  .catch((err)=>{
    throw err;
  })

}
/***------end handleUpdateSandbox-------****/

module.exports=[
  {
    method:'GET',
    path:'/sandbox',
    config: {
      auth: 'simple',
      handler:sandboxHandler
    }
  },
  {
    method:'GET',
    path:'/sandbox/{id}',
    handler:handleSandboxSearch
  },
  {
    method:'POST',
    path:'/update/sandbox/{id}',
    handler:handleUpdateSandbox
  }
]
