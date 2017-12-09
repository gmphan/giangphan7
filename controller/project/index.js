'use strict'
const api = require('~/lib/api');

/******resumeHandler*******************/
const projectPage=require('~/view/project/index.marko')
const handleProjects=function(req, reply){
  (async function(){
    const rows=await api.get('/projects')
    const id=[];
    const project_name=[];
    const added_date=[];
    const state=[];
    //var date = new Date(rows[0].added_date);
    //console.log('testing '+date.toLocaleString());
    for(let i=0; i<rows.length; i++){
      id[i]=rows[i].id;
      project_name[i]=rows[i].project_name;
      added_date[i]= (new Date(rows[i].added_date)).toLocaleString();
      state[i]=rows[i].state;
    }

    const projectData={
      id:id,
      project_name:project_name,
      added_date:added_date,
      state:state
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
    const row=await api.get('/project/'+req.params.id);
    console.log(row[1]);
    // for(let i=0; i<row.length; i++){
    //   proj_name[i] = row[i].project_name;
    //   state[i] = row[i].state;
    //   completion_date:row[0].completion_date;
    //   description:row[0].description;
    //   task_id[i] = row[i].id;
    //   task_name:row[0].task_name;
    //   //due_date:(new Date(row[0].due_date)).toLocaleString();
    //
    //
    // }

    const projData={
      prj_id:row[0].id,
      proj_name:row[0].project_name,
      state:row[0].state,
      due_date:(new Date(row[0].due_date)).toLocaleString(),
      completion_date:row[0].completion_date,
      description:row[0].description,
      task_name:row[0].task_name
    }
    reply(projectDisplayPage.stream(projData));
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
    //console.log('date '+due_date);
    await api.post('/insert/project', {proj_name, due_date, state, description});
    reply(1);
  })()
  .catch((err)=>{
    throw err;
  });
}
/***-- end handleInsertPrj --****/

/******* handleAddTask ************/
function handleAddTask(req, reply){
  (async function(){
    const {prj_id, task_name, state, description} = req.payload;
    //console.log('handleAddTask: '+task_name + ' '+ description+ ' ' + state + '  '+prj_id);
    await api.post('/add/task', {prj_id, task_name, state, description});
    reply(1);
  })()
  .catch((err)=>{
    throw err;
  });
}
/******* end handleAddTask **************/



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
  },
  {
    method:'POST',
    path:'/add/task',
    handler:handleAddTask
  }
]
