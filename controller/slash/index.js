'use strict'
const Promise = require('promise')
const mysqlCon = require('~/lib/mysqlCon')
const conngmp = mysqlCon.gmphanCon()

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
        const testing = 'testing'
        resolve(aboutJson)
      }
    })
  })
}
/**-------end slashHandler-------------**/
module.exports=[
  {
    method:'GET',
    path:'/',
    handler:slashHandler
  }
]
