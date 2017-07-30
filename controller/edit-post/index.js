'use strict'
const Promise = require('promise')
const mysqlCon = require('~/lib/mysqlCon');
const conngmp = mysqlCon.gmphanCon();
const validateKeySession = require('~/lib/validateKeySession')
/*******editpostHandler***************/
const postEditor = require('~/view/post-editor-form/index.marko')
function editpostHandler(req, reply){
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
  const sessionKey=req.payload.sessionKey
  const sessionValue=req.payload.sessionValue

  validateKeySession.checkSessionValues(sessionKey,sessionValue)
    .then(function(result){
      if(result==sessionValue){
        updatePost(postId, editedPost)
      }else {
        console.log("User sessionValue not matching with result md5")
      }
    })
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

/******end editpostHandler***********/

module.exports=[
  {
    method:'GET',
    path:'/editpost/{param*}',
    handler:editpostHandler
  },
  {
    //will merge this with pos/form as a component
    method:'POST',
    path:'/post/reinsertion',
    handler:reinsertPosthandler
  }
]
