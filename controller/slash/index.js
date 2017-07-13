'use strict'


const page = require('~/view/slash/index.marko');



function slashHandler(req, reply){
  reply(page.stream())

}

module.exports=[
  {
    method:'get',
    path:'/',
    handler:slashHandler
  }
]
