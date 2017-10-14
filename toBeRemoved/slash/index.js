'use strict'
const Promise = require('promise')
const mysqlCon = require('~/lib/mysqlCon')
const conngmp = mysqlCon.gmphanCon()
const validateKeySession = require('~/lib/validateKeySession')
const api = require('~/lib/api');

/***+++++++slashHandler++++++++++++++++*/
const slashPage = require('~/view/slash/index.marko');

function slashHandler(req, reply){
  (async function(){
    const idOfAbout=[]
    const topicOfAbout=[]
    const contentOfAbout=[]
    const DataOfAbout=await api.get('/');
    for(let i=0; i<DataOfAbout.length; i++){
      idOfAbout[i]=DataOfAbout[i].id;
      contentOfAbout[i]=DataOfAbout[i].about_content;
    }
    const JsonOfAbout={
      idOfAbout,
      contentOfAbout
    }
    reply(slashPage.stream(JsonOfAbout))
  })()
      .catch((err)=>{
        throw(err)
      })

}

/**-------end slashHandler-------------**/


/**+++++++++++editorHandler+++++++++++++++++++++**/
const editAboutPage=require('~/view/editor-about/index.marko')
function editAboutHandler(req, reply){
  let idOfReqOnAbout=req.params.param;
  (async function(){
    if(idOfReqOnAbout==='assets/GP-favicon.png'){
      return false;
    }else{
      console.log('Id of request on about: '+idOfReqOnAbout);
    }
    let idOfAbout=[];
    let topicOfAbout=[];
    let contentOfAbout=[];
    let data4IdOfAbout=await api.get('/edit/about/'+idOfReqOnAbout);
    console.log('Successfully SELECT * FROM about WHERE id= '+idOfReqOnAbout)
    for(let i=0; i<data4IdOfAbout.length; i++){
      idOfAbout[i]=data4IdOfAbout[i].id;
      contentOfAbout[i]=data4IdOfAbout[i].about_content;
    }
    let JsonOfAbout={
      idOfAbout:idOfAbout,
      contentOfAbout:contentOfAbout
    }

    reply(editAboutPage.stream(JsonOfAbout));
  })()
    .catch((err)=>{
      throw(err)
    })
}
//   const id=req.params.param
//   if (id === 'assets/GP-favicon.png') {
//     return false
//   }else{
//     //console.log(req)
//     console.log('id in in editAboutPage '+id)
//     const comon={
//       name:'giang'
//     }
//      queryOnAb(id)
//       .then(function(aboutJson){
//         reply(editAboutPage.stream(aboutJson))
//         //console.log(testing)
//       })
//     //reply(id)
//   }
// }

// const queryOnAb=function(id){
//   return new Promise(function(resolve,reject){
//     conngmp.query('SELECT * FROM about WHERE id=?', id, function(err, rows){
//       const aboutId=[]
//       const aboutTopic=[]
//       const aboutContent=[]
//       if(err){
//         throw err
//       }else {
//         console.log('Successfully SELECT * FROM about WHERE id= '+id)
//         for(var i=0; i<rows.length; i++){
//           aboutId[i]=rows[i].id
//           aboutContent[i]=rows[i].about_content
//         }
//         //console.log(aboutContent[0])
//         const aboutJson={
//           aboutId:aboutId,
//           aboutContent:aboutContent
//         }
//
//         resolve(aboutJson)
//       }
//     })
//   })
// }

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
