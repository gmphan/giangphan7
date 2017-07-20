'use strict'

var Promise = require('promise')
const mysqlCon = require('~/lib/mysqlCon');
const conngmp = mysqlCon.gmphanCon();




/******blogHandler*****************/
const page = require('~/view/blog/index.marko')
function blogHandler(req, reply){
  queryIdAndTitle(reply);
}
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
          blogName[i] = rows[i].blog_name
          //console.log(blogId[i], blogName[i])
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
/*****End blogHandler ********************/

/*****blogDisplayHandler******************/
const displayPage = require('~/view/blog-display/index.marko')
function blogDisplayHandler(req, reply){
   const blogIdReceiver=req.params.param
   //console.log(blogIdReceiver)
  queryBlogFile(blogIdReceiver, reply)
}
const queryBlogFile = function(blogIdReceiver, reply){
  return new Promise(function(resolve, reject){
    conngmp.query('SELECT * FROM blog WHERE id=?', blogIdReceiver, function(err, rows){
      const blog = []
      if(err){
        throw err
      }else {
        for(var i=0; i<rows.length; i++){
          blog[i] = rows[i].blog_content
          console.log('Successfully selected all from blog where id = '+rows[i].id)
        }
        const blogIndex0 = blog[0]
        const blogJson={
          blogIndex0
        }
        //console.log(blogJson.blog[0])
        reply(displayPage.stream(blogJson))
        resolve()
      }
    })
  })
}
/*****End blogDisplayHandler*************/


/******blog content insertion****************/
function blogInsertHandler(req, reply){
  const blogName=req.payload.blogName
  const blogContent=req.payload.blogContent
  insertBlogContent(blogName, blogContent)
  //console.log('from blogInsertHandler')
  reply(1)
}
const insertBlogContent = function(blogName, blogContent){
  return new Promise(function(resolve, reject){
    const blogValues = {
      id:null,
      blog_name:blogName,
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
/****End blog content insertion*************/

/********Blog form handler************************/
const blogForm = require('~/view/blog-form/index.marko')
function blogFormHandler(req, reply){
  //console.log('in blog form handler')
  reply(blogForm.stream())
}
/********End Blog form handler************************/

module.exports=[
  {
    method: 'GET',
    path:'/blog',
    handler:blogHandler
  },
  {
    method:'GET',
    path:'/blog/display/{param*}',
    handler:blogDisplayHandler
  },
  {
    method:'POST',
    path:'/blog/insertion',
    handler:blogInsertHandler
  },
  {
    method:'GET',
    path:'/blog-form',
    handler:blogFormHandler
  }
]
