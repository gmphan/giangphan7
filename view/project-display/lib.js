$(document).ready(function(){
  const prjId = $("input[name='prj_id']").val();
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
  $('#slt-tsk').on('change', function() {
      var tskId = this.value;
      var workNoteElement = document.getElementById('work_note_textarea');
      var workNoteFrag = document.createDocumentFragment();

      var tskNoteElement  = document.getElementById('tsk_note_textarea');
      var textareaFrag = document.createDocumentFragment();
      //alert(tskId);
      $.ajax({
        type:'get',
        url:'/get/task-note/'+tskId,
        success:function(tskNoteData){
          //console.log(tskNoteData);
          /*create a fragment for work notes*/
          // var workNoteTextarea = document.createElement('textarea');
          // workNoteTextarea.className = 'form-control';
          // workNoteTextarea.name = 'work-notes';
          // workNoteTextarea.rows = '5';
          // workNoteTextarea.cols = '40';
          // workNoteFrag.appendChild(workNoteTextarea);
          // workNoteElement.appendChild(workNoteFrag);

          document.getElementById('work_note_textarea').innerHTML=
          '<textarea class="form-control" name="activity" rows="5" cols="40">'+
          '</textarea>';

          for(var i=0; i<tskNoteData.length; i++){

            /*
              create newTextarea element, add class, name and value to that
              the new textarea element, insert the element into a fragment
              (textareaFrag) that I created earlier. After all, insert that
              fragment into an exisiting element (element) that I got earlier
              from the current exisitng DOM tree
            */
            var newTextarea = document.createElement('textarea');
            // newTextarea.id = 'sltTskOpt'+taskData[i].id;
            newTextarea.className = 'form-control';
            newTextarea.name='activity';
            newTextarea.rows="5";
            newTextarea.cols='40';
            newTextarea.value=tskNoteData[i].note;
            // newTextarea.value = taskData[i].description;
            textareaFrag.appendChild(newTextarea);
            tskNoteElement.appendChild(textareaFrag);
          }

        },
        error:function(){
          alert("couldn't get task note")
        }
      });
    });
});
