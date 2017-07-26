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
const postEditor = require('~/view/post-editor-form/index.marko')
function postUpdateHandler(req, reply){
  const postUpdatedId=req.params.param
  queryPost4edit(postUpdatedId, reply)
  //reply(postEditor.stream())
}
const queryPost4edit = function(postUpdatedId, reply){
  return new Promise(function(resolve, reject){
    conngmp.query('SELECT * FROM post WHERE id=?', postUpdatedId, function(err, rows){
      const post4Update = []
      //const post4UpdateId = []
      if(err){
        throw err
      }else {
        for(var i=0; i<rows.length; i++){
          post4Update[i] = rows[i].post_content
          //post4UpdateId[i] = rows[i].id
        }
        const post4Update0 = post4Update[0]
        const postJson4Update={
          post4Update0
        }
        reply(postEditor.stream(postJson4Update))
        resolve()
      }
    })
  })
}


function reinsertPosthandler(req, reply){
  const postId = req.payload.editedPostId
  const editedPost = req.payload.editedPost
  updatePost(postId, editedPost)
  reply(1)
}

const updatePost = function(postId, editedPost){
  return new Promise(function(resolve, reject){
    conngmp.query("UPDATE post SET post_content=?, updated_date=? WHERE id=?", [editedPost, new Date, postId], function(error, rows){
      if(error){
        throw error
      }else {
        console.log('Successfully UPDATE post')
      }
    })
  })
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
    //will merge this with pos/display/{param*} as a component
    method:'GET',
    path:'/post/update/{param*}',
    handler:postUpdateHandler
  },
  {
    //will merge this with pos/form as a component
    method:'POST',
    path:'/post/reinsertion',
    handler:reinsertPosthandler
  }
]
