'use strict'

/******resumeHandler*******************/
const trackerPage=require('~/view/tracker/index.marko')
const quoteHandler=function(req, reply){
  reply(trackerPage.stream())
}
/******End resumeHandler***************/
module.exports=[
  {
    method:'GET',
    path:'/tracker',
    handler:quoteHandler
  }
]
