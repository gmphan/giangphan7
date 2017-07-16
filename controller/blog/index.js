'use strict'

var Promise = require('promise')
const mysqlCon = require('~/lib/mysqlCon');
const conngmp = mysqlCon.gmphanCon();

const page = require('~/view/blog/index.marko')
const displayPage = require('~/view/blog-display/index.marko')

const queryIdAndTitle = function(reply){
  return new Promise(function(resolve, reject){
    conngmp.query('SELECT * FROM blog', function(err, rows){
      const blogId = []
      const blogName = []
      const blogDate = []
      if(err){
        throw err
      }else {
        console.log("Successfully SELECT * FROM blog")
        for(var i=0; i<rows.length; i++){
          blogId[i] = rows[i].id
          blogName[i] = rows[i].name
          console.log(blogId[i], blogName[i])
        }
        const idAndNameJson = {
          blogId,
          blogName
        }
        reply(page.stream(idAndNameJson))
        resolve()
      }
    })
  })
}

function blogHandler(req, reply){
  queryIdAndTitle(reply);
}


const queryBlogFile = function(reply){
  return new Promise(function(resolve, reject){
    conngmp.query('SELECT * FROM blog WHERE id=?', 1, function(err, rows){
      const blogFile = []
      if(err){
        throw err
      }else {
        console.log('yeah')
        for(var i=0; i<rows.length; i++){
          blogFile[i] = rows[i].file
          //console.log(blogFile[i])
        }
        console.log(blogFile[0])
        const blogFileJson={
          blogFile
        }
        console.log(blogFileJson.blogFile[0])
        reply(displayPage.stream(blogFileJson))
        resolve()
      }
    })
  })
}

function getBlogFile(req, reply){
  console.log('here')
  queryBlogFile(reply)
   //will reply the code of the page
  //reply('hello')
}

module.exports=[
  {
    method: 'GET',
    path:'/blog',
    handler:blogHandler
  },
  {
    method:'POST',
    path:'/getBlogFile',
    handler:getBlogFile
  }
]
