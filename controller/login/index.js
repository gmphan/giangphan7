'use strict'

const Promise = require('promise')
const mysqlCon = require('~/lib/mysqlCon')
const conngmp = mysqlCon.gmphanCon()

/*******signInHandler*****************/
const loginPage = require('~/view/login-page/index.marko')
function loginHandler(req, reply){


  reply(loginPage.stream())
}
/*******End signInHandler************/

/********validationHandler**********/
function validationHandler(req, reply){
  const usrname=req.payload.usrname
  const psw=req.payload.psw
  //console.log(usrname + psw)
  queryOnUsrInfo(usrname, psw, reply)

}
const queryOnUsrInfo=function(usrname, psw, reply){
  return new Promise(function(resolve, reject){
    conngmp.query('SELECT * FROM user_accounts WHERE user_name=? and user_password=?', [usrname, psw], function(error, rows){
      if(error){
        throw error
      }else {
        if(typeof rows[0] == 'undefined'){
          console.log('The user input the wrong user_name or user_password ')
          reply(0)
        }else{
          console.log('The user input correct user_name and user_password')
          const return4validate={
            usrname:rows[0].user_name,
            validatePw:rows[0].md5_password
          }
          reply(return4validate)
        }

      }
      resolve()
    })
  })
}
/*******End validationHandler******/


module.exports=[
  {
    method:'GET',
    path:'/login/{param*}',
    handler:loginHandler
  },
  {
    method:'POST',
    path:'/login/validate',
    handler:validationHandler
  }
]
