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
      added_date[i]= (new Date(rows[i].added_date)).toDateString();
      state[i]=rows[i].state;
    }
    //console.log('testing '+added_date[2]);
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
    //console.log(row[1]);
    //fix empty completion_date display as 1969 or 1970
    var completion_date;
    if(row[0].completion_date == null){
      completion_date = 'yyyy-mm-dd';
    }else{
      completion_date = (new Date(row[0].completion_date)).toLocaleDateString();
    }
    const projData={
      prj_id:row[0].id,
      proj_name:row[0].project_name,
      state:row[0].state,
      due_date:(new Date(row[0].due_date)).toLocaleDateString(),
      completion_date:completion_date,
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
    reply(prj_id);
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
    //console.log(req.params.tskId);
    const row=await api.get('/get/task-note/'+req.params.tskId);
    //console.log('This is task state: '+ row[0].tsk_id);
    const id=[];
    const tsk_id=[];
    const note=[];
    const added_date=[];
    for(let i=0; i<row.length; i++){
      id[i]=row[i].id;
      tsk_id[i]=row[i].tsk_id;
      note[i]=row[i].note;
      //added_date[i]=(new Date(row[i].added_date)).toLocaleString();
      added_date[i]=(new Date(row[i].added_date)).toString();
    }
    //console.log('This is task state: '+ row[0].state)
    const tskData={
      id:id,
      tsk_id:tsk_id,
      note:note,
      added_date:added_date,
    }
    reply(tskData);
  })()
  .catch((err)=>{
    throw err;
  });
}
/******* End handleGetTskNote **************/

/****** handlerPostNote ******************/
function handlePostNote(req, reply){
  (async function(){
    const{tskId, work_note} = req.payload;
    //console.log('show work and it: '+work_note + ' ' +tskId);
    const result=await api.post('/post/note', {tskId, work_note});
    reply(result);
  })()
  .catch((err)=>{
    throw err;
  });
}
/******* End handlerPostNote *************/

/******* handleProject *******************/
function handleUpdateProject(req, reply){
  (async function(){
    const{prjId, description, state, dueDate, completeDate} = req.payload;
    //console.log(prjId + description + state + dueDate + completeDate);
    const result=await api.post('/update/project', {prjId, description, state, dueDate, completeDate});
    reply(result);
  })()
  .catch((err)=>{
    throw err;
  })
}
/******* end handleProject ***************/

/******* handleUpdateTaskState **********/
function handleUpdateTaskState(req, reply){
  (async function(){
    const {tskState, tskId} = req.payload;
    //console.log('here is task state: '+tskState);
    const result=await api.post('/update/task-state',{tskState,tskId});
    reply(result);
  })()
  .catch((err)=>{
    throw err;
  })
}
/******* end handleUpdateTaskState ******/

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
    config: {
      auth: {
        strategy: 'base'
      },
        handler:handleProjectAddNew
    }
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
    //handler:handleAddTask
    config: {
      auth: {
        strategy: 'base'
      },
        handler:handleAddTask
    }
  },
  {
    method:'GET',
    path:'/get/task-note/{tskId}',
    handler:handleGetTskNote
  },
  {
    method:'POST',
    path:'/post/note',
    //handler:handlerPostNote
    config: {
      auth: {
        strategy: 'base'
      },
        handler:handlePostNote
    }
  },
  {
    method:'POST',
    path:'/update/project',
    //handler:handleUpdateProject
    config: {
      auth: {
        strategy: 'base'
      },
        handler:handleUpdateProject
    }
  },
  {
    method:'POST',
    path:'/update/task-state',
    config: {
      auth: {
        strategy: 'base'
      },
        handler:handleUpdateTaskState
    }
  }

]
