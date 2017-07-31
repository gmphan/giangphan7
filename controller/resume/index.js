'use strict'

/******resumeHandler*******************/
const resumePage=require('~/view/resume/index.marko')
const resumeHandler=function(req, reply){
  reply(resumePage.stream())
}
/******End resumeHandler***************/
module.exports=[
  {
    method:'GET',
    path:'/resume',
    handler:resumeHandler
  }
]
