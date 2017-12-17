$(document).ready(function(){

  const prjId = $("input[name='prj_id']").val();
  var tskId;

  /*********** get all the taks of a proj into the task list ***************/
  $.ajax({
    type:'get',
    url:'/get/task-name/'+prjId,
    success:function(taskData){
      var sltTsk = document.getElementById('slt-tsk');
      //const tskId=[];
        for(var i=0; i<taskData.length; i++){
          /*
            create options, add text and value to the options
            then add those option to sltTsk elements
          */
          var option = document.createElement("option");
          option.text = taskData[i].task_name;
          option.value= taskData[i].id;
          sltTsk.add(option);
        }
    },
    error:function(){
      alert("Could not get project's tasks to display");
    }
  });

/*********** end get all the taks of a proj into the task list ***************/

/*********** select and disply note ************************/
$('#slt-tsk').on('change',function(){
  tskId = this.value;
  //set the below to empty and do nothing on Select a Task to view selection
  if(tskId == 0){
    document.getElementById('work-note-label').innerHTML=''
    document.getElementById('work-note-textarea').innerHTML='';
    document.getElementById('noteSubmit').innerHTML='';
    document.getElementById('activity-label').innerHTML='';
    document.getElementById('tsk-activity').innerHTML='';
    return false;
  }
  //when a task is selected empty the div below
  document.getElementById('tsk-activity').innerHTML='';
  $.ajax({
    type:'get',
    url:'/get/task-note/'+tskId,
    success:function(tskData){
      document.getElementById('work-note-label').innerHTML='Work note:';
      document.getElementById('noteSubmit').innerHTML=
      '<button type="submit" class="btn btn-default btn-sm">Post Note</button>';
      document.getElementById('work-note-textarea').innerHTML='<textarea'+
      ' class="form-control" name="work-note" rows="5" cols="40" placeholder='+
      '"Fill out your new note here"></textarea>';
      for(var i=0; i<tskData.id.length; i++){
        document.getElementById('activity-label').innerHTML='Activity:';
        document.getElementById('tsk-activity').innerHTML+=
          '<div id="activity-note">'+
            '<p id="noteLabel">Activity on '+tskData.added_date[i]+':</p>'+
            '<p>'+ tskData.note[i]+'</p>'
          '</div>';
      }

    },
    error:function(){
      alert("couldn't get task note")
    }
  });
});

/*********** end select and display note *******************/



// $('#slt-tsk').on('change', function(){
//   tskId = this.value;
//   //set the below to empty and do nothing on Select a Task to view selection
//   if(tskId == 0){
//     document.getElementById('work-note-label').innerHTML=''
//     document.getElementById('work-note-textarea').innerHTML='';
//     document.getElementById('noteSubmit').innerHTML='';
//     document.getElementById('activity-label').innerHTML='';
//     document.getElementById('tsk-activity').innerHTML='';
//     return false;
//   }
//   //when a task is selected empty the div below
//   document.getElementById('tsk-activity').innerHTML='';
//
//   $.ajax({
//     type:'get',
//     url:'/get/task-note/'+tskId,
//     //returning json file not array
//     success:function(tskData){
//       document.getElementById('work-note-label').innerHTML='Work note:';
//
//       document.getElementById('work-note-textarea').innerHTML='<textarea'+
//       ' class="form-control" name="work-note" rows="5" cols="40" placeholder='+
//       '"Fill out your new note here"></textarea>';
//
//       document.getElementById('noteSubmit').innerHTML=
//       '<button type="submit" class="btn btn-default btn-sm">Post Note</button>';
//
//       for(var i=0; i<tskData.id.length; i++){
//         document.getElementById('activity-label').innerHTML='Activity:';
//         document.getElementById('tsk-activity').innerHTML+='<textarea class="form-control test" rows="5" cols="40">'+
//           tskData.added_date[i]+':  '+ tskData.note[i]+
//         '</textarea>';
//
//       }
//     },
//     error:function(){
//       alert("couldn't get task note")
//     }
//   });
// })

/************ submit a note of a task ********************/
    $('#note-form1').submit(function(e){
      e.preventDefault();
      if($("textarea[name='work-note']").val()==""){
        alert('fill out note before you can submit it');
        return false;
      }else{
        //console.log($("textarea[name='work_note']").val());
        //console.log(tskId);
        $.ajax({
          type:'post',
          url:'/post/note',
          data:{
            work_note:$("textarea[name='work-note']").val(),
            tskId:tskId
          },
          success:function(result){
            //console.log(result);
            document.getElementById('note-form1').reset();
            if(result==1){
              console.log('successfully posted note')
              window.location.href='/project/'+prjId;
            }else{
              console.log('Ajax post/note was good but data was not inserted')
            }
          },
          error:function(){
            alert("error posting note");
          }

        });
      }

    });
/************ end submit a note of a task ********************/
});
