'use strict'

const api = require('~/lib/api');

/***+++++++slashHandler++++++++++++++++*/
const slashPage = require('~/view/slash/index.marko');

function slashHandler(req, reply){
  (async function(){
    const idOfAbout=[]
    const topicOfAbout=[]
    const contentOfAbout=[]
    const DataOfAbout=await api.get('/about');
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

/**+++++handleAboutEditor++++++++++++++**/
const aboutEditorPage=require('~/view/slash-about-editor/index.marko')
function handleAboutEditor(req,reply){
  let id=req.params.id;
  (async function(){
    if(id==='assets/GP-favicon.png'){
      return false;
    }else{
      console.log('ID of request to edit about: '+id);
    }
    let contentOfAbout=[];
    let idOfAbout = [];
    const data4IdOfAbout=await api.get('/about/'+id);
    for(let i=0; i<data4IdOfAbout.length; i++){
      contentOfAbout[i] = data4IdOfAbout[i].about_content;
      idOfAbout[i]=data4IdOfAbout[i].id;
    }
    const jsonOfAbout={
      contentOfAbout:contentOfAbout[0],
      idOfAbout:idOfAbout[0]
    }
    reply(aboutEditorPage.stream(jsonOfAbout))
  })()
  .catch((err)=>{
    throw err;
  })

}
/**------end handleAboutEditor---------**/


/**+++++handleAboutEditor++++++++++++++**/
function handleUpdateAbout(req,reply){
  const {id, about_content, updated_by} = req.payload;
  //console.log(about_content);
  (async function(){
    const result=await api.post('/update/about/'+id, {about_content, updated_by});
    //console.log(result);
    reply(result);
  })()
  .catch((err)=>{
    throw err
  })

}
/**-----end handleAboutEditor----------**/


/******* handleInsertContact ***************/
function handleInsertContact(req, reply){
  (async function(){
    const {name, email, phone, message} = req.payload;
    //when setting from UI to API, I use {} json,
    //from sql in API to the table I use [] array.
    await api.post('/insert/contact', {name, email, phone, message});
    reply(1)
  })()
  .catch((err)=>{
    throw err;
  })
}
/**------ end handleInsertContact -------**/


/******* handleContactList ****************/
const listOfContactPage = require('~/view/slash-contact-list/index.marko');
function handleContactList(req, reply){
  (async function(){
    const result = await api.get('/contact/list');
    reply(listOfContactPage.stream(result));
  })()
  .catch((err)=>{
    throw err;
  })
}
/**----- End handleContactList ----------**/

module.exports=[
  {
    method:'GET',
    path:'/',
    handler:slashHandler
  },
  {
    method:'GET',
    path:'/about-editor/{id}',
    // config:{
    //   auth:'simple',
    //   handler:handleAboutEditor
    // }
    handler:handleAboutEditor
  },
  {
    method:'POST',
    path:'/update/about',
    // config:{
    //   auth:'simple',
    //   handler:handleUpdateAbout
    // }
    handler:handleUpdateAbout
  },
  {
    method:'POST',
    path:'/insert/contact',
    // config:{
    //   auth:'simple',
    //   handler:handleInsertContact
    // }
    handler:handleInsertContact
  },
  {
    method:'GET',
    path:'/contact/list',
    // config:{
    //   auth:'simple',
    //   handler:handleContactList
    // }
    handler:handleContactList
  }
]
