'use strict'
const api = require('~/lib/api');

/******resumeHandler*******************/
const projectPage=require('~/view/project/index.marko')
const handleProjects=function(req, reply){
  (async function(){
    const results=await api.get('/projects')
    const id=[];
    const project_name=[];
    const added_date=[];
    //var date = new Date(results[0].added_date);
    //console.log('testing '+date.toLocaleString());
    for(let i=0; i<results.length; i++){
      id[i]=results[i].id,
      project_name[i]=results[i].project_name,
      added_date[i]= (new Date(results[i].added_date)).toLocaleString()
    }

    const projectData={
      id:id,
      project_name:project_name,
      added_date:added_date
    }
    reply(projectPage.stream(projectData));
  })()
  .catch((err)=>{
    throw err;
  })
}
/******End resumeHandler***************/

/********* handleProjectAddNew ********/
const projectAddNewPage=require('~/view/project-add-new/index.marko');
function handleProjectAddNew(req, reply){
  (async function(){

    reply(projectAddNewPage.stream());
  })()
  .catch((err)=>{
    throw err;
  })
}
/****--- end handleProjectAddNew ---****/


/**** handleProject ********/
const projectDisplayPage=require('~/view/project-display/index.marko');
function handleDisplayProject(req, reply){
  (async function(){

    reply(projectDisplayPage.stream());
  })()
  .catch((err)=>{
    throw err;
  })
}
/***-- end handleProject --***/

/****** handleInsertPrj *********/
function handleInsertPrj(req, reply){
  (async function(){
    const {proj_name, due_date, state, description} = req.payload;
    //console.log(description);
    await api.post('/insert/project', {proj_name, due_date, state, description});
    reply(1);
  })()
  .catch((err)=>{
    throw err;
  });
}
/***-- end handleInsertPrj --****/

module.exports=[
  {
    method:'GET',
    path:'/projects',
    handler:handleProjects
  },
  {
    method:'GET',
    path:'/project-add-new',
    handler:handleProjectAddNew
  },
  {
    method:'GET',
    path:'/project/{id}',
    handler:handleDisplayProject
  },
  {
    method:'POST',
    path:'/insert/project',
    handler:handleInsertPrj
  }
]
