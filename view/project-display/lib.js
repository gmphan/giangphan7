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
  var tskId;
  $('#slt-tsk').on('change', function() {
      tskId = this.value;
      var tskNoteElement  = document.getElementById('tsk_note_textarea');
      var textareaFrag = document.createDocumentFragment();
      //alert(tskId);
      $.ajax({
        type:'get',
        url:'/get/task-note/'+tskId,
        success:function(tskNoteData){
          document.getElementById('work_note_textarea').innerHTML=
          '<textarea class="form-control" name="work_note" rows="5" cols="40" placeholder="Fill out your new note here">'+
          '</textarea>';
          document.getElementById('noteSubmit').innerHTML=
          '<button type="submit" class="btn btn-default btn-sm">Post Note</button>';
          /*
            I will need to add the textarea in the html first
            then some how append the content to it because textarea only
            accept string and not for loop
          */
          for(var i=0; i<tskNoteData.length; i++){
            var obj=document.getElementById('tsk_note_textarea');
            //var txt=document.createTextNode(tskNoteData[i].note);

            obj.append('<p>tskNoteData[i].note</p>');

            //document.getElementById('tsk_note_textarea').value=tskNoteData[i].note;
            //document.getElementById('tsk_note_textarea').append=tskNoteData[i].note;
          }

        },
        error:function(){
          alert("couldn't get task note")
        }
      });
    });

    $('#note-form1').submit(function(e){
      e.preventDefault();
      if($("textarea[name='work_note']").val()==""){
        alert('fill out note before you can submit it');
        return false;
      }else{
        //console.log($("textarea[name='work_note']").val());
        //console.log(tskId);
        $.ajax({
          type:'post',
          url:'/post/note',
          data:{
            work_note:$("textarea[name='work_note']").val(),
            tskId:tskId
          },
          success:function(result){
            if(result==1){
              console.log('success post note');
              document.getElementById('note-form1').reset();
            }else{
              alert('data get to the API but could not be inserted');
            }
          },
          error:function(){
            alert("error posting note");
          }

        });
      }

    });

});
