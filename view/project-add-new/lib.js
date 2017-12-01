$(document).ready(function(){
  $('#new-proj-form1').submit(function(e){
    e.preventDefault();
    if($("input[name='proj-name']").val()==""||$("input[name='description']").val()==""){
      document.getElementById("notifyMessage").innerHTML="<p"+
      "style='color:red'>***Project Name or Description field cannot be blank!</p>"
    }
  });
});
