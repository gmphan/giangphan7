'use strict'
const api = require('~/lib/api');

/******resumeHandler*******************/
const projectPage=require('~/view/projects/index.marko')
const handleProjects=function(req, reply){
  (async function(){
    const results=await api.get('/projects')
    const projectData={
      project_name:results[0].project_name,
      percent_complete:results[0].percent_complete,
      state:results[0].state,
      due_date:results[0].due_date,
      completion_date:results[0].completion_date,
      description:results[0].description,
      work_notes:results[0].work_notes
    }
    reply(projectPage.stream(projectData));
  })()
  .catch((err)=>{
    throw err;
  })
}
/******End resumeHandler***************/

/**** handleProject ********/
const projectDisplayPage=require('~/view/project-display/index.marko')
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
    path:'/project/{id}',
    handler:handleDisplayProject
  }
]
