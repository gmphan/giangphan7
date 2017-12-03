$(document).ready(function(){
  $('#new-proj-form1').submit(function(e){
    e.preventDefault();
    if($("input[name='proj-name']").val()==""||$("input[name='description']").val()==""){
      document.getElementById("notifyMessage").innerHTML="<p"+
      "style='color:red'>***Project Name or Description field cannot be blank!</p>"
      return false;
    }else{
      $.ajax({
        type:'post',
        url:'/insert/project',
        data:{
          proj_name:$("input[name='proj-name']").val(),
          due_date:$("input[name='due-date']").val(),
          state:$( "#prj-state option:selected" ).text(),
          description:$("textarea[name='description']").val()
        },
        success:function(){
          window.location.href='/projects';
        },
        error:function(){
          document.getElementById("notifyMessage").innerHTML="<p"+
          "style='color:red'>***Error posting this project!</p>"
        }
      })
    }
  });
});
