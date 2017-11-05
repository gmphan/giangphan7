'use strict'
const Promise = require('promise')
const mysqlCon = require('~/lib/mysqlCon')
const conngmp = mysqlCon.gmphanCon()


module.exports={
  checkSessionValues:function(sessionKey, sessionValue){
    return new Promise(function(resolve,reject){
      conngmp.query('SELECT * FROM user_accounts WHERE user_name=? AND md5_password=?', [sessionKey, sessionValue], function(error, rows){
        if(error){
          throw error
        }else {
          if(typeof rows[0]=='undefined'){
            console.log("The user didn't go through the login page")
            resolve()
          }else{
            console.log("The user logged in through the login page")
            resolve(rows[0].md5_password)
          }
        }
      })
    })
  }
}
