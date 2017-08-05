'use strict'

const Promise = require('promise')
const mysqlCon = require('~/lib/mysqlCon')
const conngmp = mysqlCon.gmphanCon()

/****contactMeHandler*************/
function contactMeHandler(req, reply){
  const name=req.payload.name
  const email=req.payload.email
  const phone=req.payload.phone
  const message=req.payload.message
  //console.log(name, email, phone, message)
  insertContactInfo(name, email, phone, message)
  reply()
}

const insertContactInfo = function(name, email, phone, message){
  return new Promise(function(resolve, reject){
    const contactValues={
      name:name,
      email:email,
      phone:phone,
      message:message
    }
    conngmp.query('INSERT INTO contact_me SET?', contactValues, function(err, rows){
      if(err){
        throw err
      }else {
        console.log('Successfully inserted into contact_me table')
        resolve()
      }
    })
  })
}

/****end contactMeHandler*********/

/****contactMeHandler************/
const contactListPage=require('~/view/contact-me-list/index.marko')
function contactListHandler(req, reply){

  qryContact().then(function(result){
    reply(contactListPage.stream(result))
  })
}

const qryContact=function(){
  return new Promise(function(resolve,reject){
    conngmp.query('SELECT * FROM contact_me', function(error,rows){
      if(error){
        throw error
      }else{
        console.log('Successfully SELECT * FROM contact_me')
        console.log(rows[0])
        const result=rows[0]

        console.log(result.id)
        resolve(result)
      }
    })
  })
}

/****End contactMeHandler**********/

module.exports=[
  {
    method:'POST',
    path:'/contact/me',
    handler:contactMeHandler
  },
  {
    method:'GET',
    path:'/contact/me/list',
    handler:contactListHandler
  }
]
