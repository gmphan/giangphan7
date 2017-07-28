'use strict'

const Promise = require('promise')
const mysqlCon = require('~/lib/mysqlCon')
const conngmp = mysqlCon.gmphanCon()

/*******signInHandler*****************/
function signInHandler(req, reply){
  const usrname=req.payload.usrname
  const psw=req.payload.psw
  console.log(usrname + psw)

  reply(1)
}
/*******End signInHandler************/

module.exports=[
  {
    method:'POST',
    path:'/sign-in',
    handler:signInHandler
  }
]
