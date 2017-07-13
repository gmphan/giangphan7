'use strict'

var Promise = require('promise')
const page = require('~/view/blog/index.marko')

function blogHandler(req, reply){
  reply(page.stream())
}


module.exports=[
  {
    method: 'GET',
    path:'/blog',
    handler:blogHandler
  }
]
