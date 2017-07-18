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
    conngmp.query('SELECT * FROM blog WHERE id=?', 3, function(err, rows){
      const blog = []
      if(err){
        throw err
      }else {
        console.log('Successfully selected all from blog where id =')
        for(var i=0; i<rows.length; i++){
          blog[i] = rows[i].blog_content
        }
        console.log(blog[0])
        const blogJson={
          blog
        }
        //console.log(blogFileJson.blogFile[0])
        reply(displayPage.stream(blogJson))
        resolve()
      }
    })
  })
}

function getBlogHandler(req, reply){
  //console.log('here')
  queryBlogFile(reply)
   //will reply the code of the page
  //reply('hello')
}

/******blog content insertion****************/
const insertBlogContent = function(blogName, blogContent){
  return new Promise(function(resolve, reject){
    const blogValues = {
      id:null,
      name:blogName,
      date: new Date(),
      blog_content:blogContent
    }
    conngmp.query('INSERT INTO blog SET?', blogValues, function(err, res){
      if(err){
        throw err
      }else {
        console.log('Successfully inserted into blog table')
        resolve()
      }
    })
  })
}
function blogInsertHandler(req, reply){
  const blogName=req.payload.blogName
  const blogContent=req.payload.blogContent
  insertBlogContent(blogName, blogContent)
  console.log('from blogInsertHandler')
  reply(1)
}
/****End blog content insertion*************/

module.exports=[
  {
    method: 'GET',
    path:'/blog',
    handler:blogHandler
  },
  {
    method:'POST',
    path:'/getBlog',
    handler:getBlogHandler
  },
  {
    method:'POST',
    path:'/blog/insertion',
    handler:blogInsertHandler
  }
]
