'use strict'

const Promise = require('promise')
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
      const postId = []
      if(err){
        throw err
      }else {
        for(var i=0; i<rows.length; i++){
          post[i] = rows[i].post_content
          postId[i] = rows[i].id
          console.log('Successfully selected all from post where id = '+postId[i])
        }
        const postIndex0 = post[0]
        const postIdIndex0 = postId[0]
        const postJson={
          postIndex0,
          postIdIndex0
        }
        //console.log(postJson.post[0])
        reply(displayPage.stream(postJson))
        resolve()
      }
    })
  })
}
/*****End postDisplayHandler*************/





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
  }
]
