$(document).ready(function(){
  $('#submitReminder').submit(function(e){
    e.preventDefault();
    if($("input[name='reminder_name']").val()=="" || $("textarea[name='reminder_quote']").val()=="" || $("input[name='written_by']").val()==""){
      alert('Fill out all fields');
      return false;
    }else{
      $.ajax({
        type:'POST',
        url:'/insert/reminder',
        data:{
          reminder_name:$("input[name='reminder_name']").val(),
          reminder_quote:$("textarea[name='reminder_quote']").val(),
          written_by:$("input[name='written_by']").val()
        },
        success:function(){
          window.location.href='/reminder';
        },
        error:function(){
          alert("error inserting new post");
        }
      });
    }
  });
});
