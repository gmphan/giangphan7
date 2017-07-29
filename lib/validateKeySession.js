'use strict'

const mysqlCon = require('~/lib/mysqlCon')
const conngmp = mysqlCon.gmphanCon()

module.exports={
    keyValidation:function(sessionKey, sessionValue){
    //console.log(sessionKey+sessionValue)
    conngmp.query('SELECT * FROM user_accounts WHERE user_name=? AND md5_password=?', [sessionKey, sessionValue], function(error, rows){
      if(error){
        throw error
      }else {
        if(typeof rows[0]=='undefined'){
          console.log("The user didn't go through the login page")
          const test = 'hello';
          return test;
        }else{
          console.log("The user logged in through the login page")
          console.log(rows[0].md5_password)
          return 1;
        }
        //console.log('Successfully connect to user_accounts table')
      }
    })
    //return validatedResult
  }
}
