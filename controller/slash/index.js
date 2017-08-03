'use strict'
const Promise = require('promise')
const mysqlCon = require('~/lib/mysqlCon')
const conngmp = mysqlCon.gmphanCon()
const validateKeySession = require('~/lib/validateKeySession')

/***+++++++slashHandler++++++++++++++++*/
const slashPage = require('~/view/slash/index.marko');

function slashHandler(req, reply){
  queryAbout()
    .then(function(aboutJson){
      reply(slashPage.stream(aboutJson))
    })
}
const queryAbout=function(){
  return new Promise(function(resolve,reject){
    conngmp.query('SELECT * FROM about', function(err, rows){
      const aboutId=[]
      const aboutTopic=[]
      const aboutContent=[]
      if(err){
        throw err
      }else {
        console.log('Successfully SELECT * FROM about')
        for(var i=0; i<rows.length; i++){
          aboutId[i]=rows[i].id
          aboutContent[i]=rows[i].about_content
        }
        const aboutJson={
          aboutId,
          aboutContent
        }
        //const testing = 'testing'
        resolve(aboutJson)
      }
    })
  })
}

/**-------end slashHandler-------------**/


/**+++++++++++editorHandler+++++++++++++++++++++**/
const editAboutPage=require('~/view/editor-about/index.marko')
function editAboutHandler(req, reply){
  const id=req.params.param
  if (id === 'assets/GP-favicon.png') {
    return false
  }else{
    //console.log(req)
    console.log('id in in editAboutPage '+id)
    const comon={
      name:'giang'
    }
     queryOnAb(id)
      .then(function(aboutJson){
        reply(editAboutPage.stream(aboutJson))
        //console.log(testing)
      })
    //reply(id)
  }
}

const queryOnAb=function(id){
  return new Promise(function(resolve,reject){
    conngmp.query('SELECT * FROM about WHERE id=?', id, function(err, rows){
      const aboutId=[]
      const aboutTopic=[]
      const aboutContent=[]
      if(err){
        throw err
      }else {
        console.log('Successfully SELECT * FROM about WHERE id= '+id)
        for(var i=0; i<rows.length; i++){
          aboutId[i]=rows[i].id
          aboutContent[i]=rows[i].about_content
        }
        console.log(aboutContent[0])
        const aboutJson={
          aboutId:aboutId,
          aboutContent:aboutContent
        }

        resolve(aboutJson)
      }
    })
  })
}

/**----------end editorHandler-------------------**/



/**++++++++++++abReinsertHandler++++++++++++++**/

function abReinsertHandler(req,reply){
  const id=req.payload.id
  const editedAbValue=req.payload.editedAbValue
  const sessionKey=req.payload.sessionKey
  const sessionValue=req.payload.sessionValue

  validateKeySession.checkSessionValues(sessionKey,sessionValue)
    .then(function(result){
      if(result==sessionValue){
        updateAbout(editedAbValue,id)
      }else {
        console.log("User sessionValue was not matching with result")
      }
    })
  reply(1)
}
const updateAbout = function(editedAbValue, id){
  return new Promise(function(resolve, reject){
    conngmp.query("UPDATE about SET about_content=?, updated_date=? WHERE id=?", [editedAbValue, new Date, id], function(error, rows){
      if(error){
        throw error
      }else {
        console.log('Successfully UPDATE about ')
      }
    })
  })
}
/**-----end abReinsertHandler------------------**/

module.exports=[
  {
    method:'GET',
    path:'/',
    handler:slashHandler
  },
  {
    method:'GET',
    path:'/edit/about/{param*}',
    handler:editAboutHandler
  },
  {
    method:'POST',
    path:'/about/reinsertion',
    handler:abReinsertHandler
  }
]
