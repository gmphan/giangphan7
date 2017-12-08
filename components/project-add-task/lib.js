$(document).ready(function(){
  $('#add-task-form-1').submit(function(e){
    e.preventDefault();
    if($("input[name='task-name']").val()==""||$("input[name='description']").val()==""){
      document.getElementById("msg1").innerHTML="<p"+
      "style='color:red'>***All fields are need to be filled!</p>"
      return false;
    }else{
      $.ajax({
        type:'post',
        url:'/add/task',
        data:{
          task_name:$("input[name='task-name']").val(),
          description:$("input[name='description']").val()
        },
        success:function(){
          window.location.href='/projects';
        },
        error:function(){
          document.getElementById("notifyMessage").innerHTML="<p"+
          "style='color:red'>***Error posting this project!</p>"
        }
      });
    }
  });
})
