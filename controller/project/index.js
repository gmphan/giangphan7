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

    console.log('testing '+results[0].id);
    for(let i=0; i<results.length; i++){
      id[i]=results[i].id,
      project_name[i]=results[i].project_name,
      added_date[i]=results[i].added_date
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
  }
]
