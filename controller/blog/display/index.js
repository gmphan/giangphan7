'use strict'

var Promise = require('promise')
const page = require('~/view/blog-display/index.marko')

const htmlpage = '<p>to includ html code in a webpage</p>'

function blogHandler(req, reply){


  reply(page.stream())
}


module.exports=[
  {
    method: 'GET',
    path:'/blog/display',
    handler:blogHandler
  }
]
