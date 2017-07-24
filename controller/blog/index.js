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
    conngmp.query('SELECT * FROM post', function(err, rows){
      const postId = []
      const postName = []
      const postDate = []
      if(err){
        throw err
      }else {
        console.log("Successfully SELECT * FROM post")
        for(var i=0; i<rows.length; i++){
          postId[i] = rows[i].id
          postName[i] = rows[i].post_name
          //console.log(postId[i], postName[i])
        }
        const idAndNameJson = {
          postId,
          postName
        }
        reply(page.stream(idAndNameJson))
        resolve()
      }
    })
  })
}
/*****End postHandler ********************/

/*****postDisplayHandler******************/
const displayPage = require('~/view/post-display/index.marko')
function postDisplayHandler(req, reply){
   const postIdReceiver=req.params.param
   //console.log(postIdReceiver)
  queryPostFile(postIdReceiver, reply)
}
const queryPostFile = function(postIdReceiver, reply){
  return new Promise(function(resolve, reject){
    conngmp.query('SELECT * FROM post WHERE id=?', postIdReceiver, function(err, rows){
      const post = []
      if(err){
        throw err
      }else {
        for(var i=0; i<rows.length; i++){
          post[i] = rows[i].post_content
          console.log('Successfully selected all from post where id = '+rows[i].id)
        }
        const postIndex0 = post[0]
        const postJson={
          postIndex0
        }
        //console.log(postJson.post[0])
        reply(displayPage.stream(postJson))
        resolve()
      }
    })
  })
}
/*****End postDisplayHandler*************/


/******post content insertion****************/
function postInsertHandler(req, reply){
  const postName=req.payload.postName
  const postContent=req.payload.postContent
  insertpostContent(postName, postContent)
  //console.log('from postInsertHandler')
  reply(1)
}
const insertpostContent = function(postName, postContent){
  return new Promise(function(resolve, reject){
    const postValues = {
      id:null,
      post_name:postName,
      post_content:postContent
    }
    conngmp.query('INSERT INTO post SET?', postValues, function(err, res){
      if(err){
        throw err
      }else {
        console.log('Successfully inserted into post table')
        resolve()
      }
    })
  })
}
/****End post content insertion*************/

/********post form handler************************/
const postForm = require('~/view/post-form/index.marko')
function postFormHandler(req, reply){
  //console.log('in post form handler')
  reply(postForm.stream())
}
/********End post form handler************************/

/*******Post update handler**********************************/
function postUpdateHandler(req, reply){
  reply(1)
}


/*******End of Post update handler***************************/

module.exports=[
  {
    method: 'GET',
    path:'/blog',
    handler:blogHandler
  },
  {
    method:'GET',
    path:'/post/display/{param*}',
    handler:postDisplayHandler
  },
  {
    method:'POST',
    path:'/post/insertion',
    handler:postInsertHandler
  },
  {
    method:'GET',
    path:'/post/form',
    handler:postFormHandler
  },
  {
    method:'POST',
    path: '/post/update',
    handler:postUpdateHandler
  }
]
