'use strict'

var Promise = require('promise')
const mysqlCon = require('~/lib/mysqlCon');
const conngmp = mysqlCon.gmphanCon();

const page = require('~/view/blog/index.marko')

const queryIdAndTitle = function(reply){
  return new Promise(function(resolve, reject){
    conngmp.query('SELECT * FROM blog', function(err, rows){
      const blogId = []
      const blogName = []
      if(err){
        throw err
      }else {
        console.log("Successfully SELECT * FROM blog")
        for(var i=0; i<rows.length; i++){
          blogId[i] = rows[i].id
          blogName[i] = rows[i].name
          console.log(blogId[i], blogName[i])
        }
        reply(page.stream(blogId, blogName))
        resolve()
      }
    })
  })
}

function blogHandler(req, reply){
  queryIdAndTitle(reply);
  //reply(page.stream())
}


module.exports=[
  {
    method: 'GET',
    path:'/blog',
    handler:blogHandler
  }
]
