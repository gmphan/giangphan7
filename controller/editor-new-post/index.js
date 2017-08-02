'use strict'
const Promise = require('promise')
const mysqlCon = require('~/lib/mysqlCon');
const conngmp = mysqlCon.gmphanCon();
const validateKeySession = require('~/lib/validateKeySession')

/********newpostHandler*******************/
const postForm = require('~/view/editor-post/index.marko')
function newpostHandler(req, reply){
    //console.log('in post form handler')
    reply(postForm.stream())
}
/*******End newpostHandler****************/

/******postInsertHandler****************/
function postInsertHandler(req, reply){
  const postName=req.payload.postName
  const postContent=req.payload.postContent
  const sessionKey=req.payload.sessionKey
  const sessionValue=req.payload.sessionValue

  validateKeySession.checkSessionValues(sessionKey,sessionValue)
    .then(function(result){
      if(result==sessionValue){
        insertpostContent(postName,postContent)
      }else {
        console.log("User sessionValue not matching with result md5")
      }
    })
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


/****End postInsertHandler*************/
module.exports=[
  {
    method:'GET',
    path:'/newpost',
    handler:newpostHandler
  },
  {
    method:'POST',
    path:'/post/insertion',
    handler:postInsertHandler
  }
]
