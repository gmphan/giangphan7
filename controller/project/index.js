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

/**** handleProject ********/
const projectDisplayPage=require('~/view/project-display/index.marko');
function handleDisplayProject(req, reply){
  (async function(){
    const row=await api.get('/project/'+req.params.id);
    console.log(row[1]);
    const projData={
      prj_id:row[0].id,
      proj_name:row[0].project_name,
      state:row[0].state,
      due_date:(new Date(row[0].due_date)).toLocaleString(),
      completion_date:row[0].completion_date,
      description:row[0].description
    }
    reply(projectDisplayPage.stream(projData));
  })()
  .catch((err)=>{
    throw err;
  })
}
/***-- end handleProject --***/



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

/********* handleGetTask ****************/
function handleGetTaskName(req, reply){
  (async function(){
    //console.log(req.params.prjId);
    //console.log('I am here');
    const row=await api.get('/get/task-name/'+req.params.prjId);
    reply(row)
  })()
  .catch((err)=>{
    throw err;
  });
}
/******** end handleGetTask ************/

/******** handleGetTskNote **************/
function handleGetTskNote(req, reply){
  (async function(){
    console.log(req.params.tskId);
    const row=await api.get('/get/task-note/{tskId}');
    reply(row);
  })()
  .catch((err)=>{
    throw err;
  });
}
/******* End handleGetTskNote **************/

module.exports=[
  {
    method:'GET',
    path:'/projects',
    handler:handleProjects
  },
  {
    method:'POST',
    path:'/insert/project',
    handler:handleInsertPrj
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
    method:'GET',
    path:'/get/task-name/{prjId}',
    handler:handleGetTaskName
  },
  {
    method:'POST',
    path:'/add/task',
    handler:handleAddTask
  },
  {
    method:'GET',
    path:'/get/task-note/{tskId}',
    handler:handleGetTskNote
  }

]
