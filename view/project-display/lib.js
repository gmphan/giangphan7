$(document).ready(function(){

  const prjId = $("input[name='prj_id']").val();
  var tskId;

  /*********** get all the taks of a proj into the task list ***************/
  $.ajax({
    type:'get',
    url:'/get/task-name/'+prjId,
    success:function(taskData){
      var j = 1;
      var sltTsk = document.getElementById('slt-tsk');
        for(var i=0; i<taskData.length; i++){
          /*
            create options, add text and value to the options
            then add those option to sltTsk elements
          */
          var option = document.createElement("option");
          option.text = j+'. '+taskData[i].task_name;
          option.value= taskData[i].id;
          sltTsk.add(option);
          j++;
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
    document.getElementById('recent-added-note-label').innerHTML='';
    document.getElementById('recent-added-note').innerHTML='';
    return false;
  }
  //empty the div below when a task is selected
  document.getElementById('tsk-activity').innerHTML='';
  $.ajax({
    type:'get',
    url:'/get/task-note/'+tskId,
    success:function(tskData){
      //set the below to empty when a task is selected
      document.getElementById('recent-added-note-label').innerHTML='';
      document.getElementById('recent-added-note').innerHTML='';

      //labeling and configuring the divs
      document.getElementById('work-note-label').innerHTML='Work note:';
      document.getElementById('noteSubmit').innerHTML=
      '<button type="submit" class="btn btn-default btn-sm btn-sm2">Post Note</button>';
      document.getElementById('work-note-textarea').innerHTML='<textarea'+
      ' class="form-control" name="work-note" rows="5" cols="40" placeholder='+
        '"Add new note for this task">'+
      '</textarea>';

      //displaying the result note of a task
      var k = tskData.id.length - 1; //id is an array in tskData json
      do{
        document.getElementById('activity-label').innerHTML='Activity:';
        if(tskData.id[k] == null){
          document.getElementById('tsk-activity').innerHTML=
          '<div class="gray-border">'+
            '<p id="noteLabel">This task has no previous added note.</p>'
          '</div>';
        }else{
          document.getElementById('tsk-activity').innerHTML+=
            '<div class="gray-border">'+
              '<p id="noteLabel">Activity on '+tskData.added_date[k]+'</p>'+
              '<p><xmp style="white-space: pre-wrap">'+ tskData.note[k]+'</xmp></p>'
            '</div>';
        }
        k--;
      }while(k >= 0)


    },
    error:function(){
      alert("couldn't get task note")
    }
  });
});

/*********** end select and display note *******************/


/************ submit a note of a task ********************/
    $('#note-form1').submit(function(e){
      e.preventDefault();
      if($("textarea[name='work-note']").val()==""){
        alert('fill out note before you can submit it');
        return false;
      }else{
        //document.getElementById('tsk-activity').innerHTML='';
        $.ajax({
          type:'post',
          url:'/post/note',
          data:{
            work_note:$("textarea[name='work-note']").val(),
            tskId:tskId
          },
          success:function(result){
            if(result==1){
              console.log('successfully posted note');
              document.getElementById('recent-added-note-label').innerHTML='Recent notes:';
              document.getElementById('recent-added-note').innerHTML+=
                '<div class="gray-border">'+
                  '<p id="noteLabel">Activity on '+Date()+'</p>'+
                  '<p><xmp style="white-space: pre-wrap">'+$("textarea[name='work-note']").val()+'</xmp></p>'
                '</div>';
              document.getElementById('note-form1').reset();
            }else{
              alert('Ajax post/note was good but data was not inserted');
            }
          },
          error:function(){
            alert("error posting note");
          }

        });
      }

    });
  /************ end submit a note of a task ********************/

  /********** update project status ***********/
  $('#update-proj-form-1').submit(function(e){
    e.preventDefault();
    //$("textarea[name='description']").val();
    if($("textarea[name='description']").val()==""){
      alert('Description Cannot be blanked');
      return false;
    }else{
      $.ajax({
        type:'post',
        url:'/update/project',
        data:{
          prjId:$("input[name='prj_id']").val(),
          description:$("textarea[name='description']").val(),
          state:$("#prj-state").val(),
          dueDate:$("input[name='due_date']").val(),
          completeDate:$("input[name='complete_date']").val()
        },
        success:function(result){
          if(result==1){
            alert('successfully updated project '+prjId);
          }else{
            alert('fail to update project at API level');
          }
        },
        error:function(){
          alert('error ajax /update/project');
        }
      });
    }

  });

  /********** end update proj status **********/


});
