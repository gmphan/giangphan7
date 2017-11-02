'use strict'


'use strict'

const api = require('~/lib/api');

/******** handleReminders *******************/
const reminderPage=require('~/view/reminder/index.marko')
function handleReminders(req, reply){
  (async function(){
    const results=await api.get('/reminder');
    const reminderId=[];
    const reminderQuote=[];
    const writtenBy=[];
    for(let i=0; i<results.length; i++){
        reminderId[i]=results[i].id,
        reminderQuote[i]=results[i].reminder_quote,
        writtenBy[i]=results[i].written_by
    }
    //console.log(postDate);
    const reminderData={
      reminderId:reminderId,
      reminderQuote:reminderQuote,
      writtenBy:writtenBy
    }
    reply(reminderPage.stream(reminderData));
  })()
  .catch((err)=>{
    throw err;
  })
}
/***-----End handleReminders --------------**/




/****** handleNewPostEditor ****************/
const addNewReminderPage=require('~/view/reminder-add-new/index.marko');
function handleAddNewReminderPage(req, reply){
  (async function(){
    reply(addNewReminderPage.stream())
  })()
  .catch((err)=>{
    throw err;
  })
}
/**----- End handleNewPostEditor --------***/




module.exports=[
  {
    method:'GET',
    path:'/reminder',
    handler:handleReminders
  },
  {
    method:'GET',
    path:'/add-new-reminder',
    handler:handleAddNewReminderPage
  }
]
