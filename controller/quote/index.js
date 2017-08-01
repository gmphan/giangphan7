'use strict'

/******resumeHandler*******************/
const quotePage=require('~/view/quote/index.marko')
const quoteHandler=function(req, reply){
  reply(quotePage.stream())
}
/******End resumeHandler***************/
module.exports=[
  {
    method:'GET',
    path:'/quote',
    handler:quoteHandler
  }
]
