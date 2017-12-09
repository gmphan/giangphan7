$(document).ready(function(){
  const prjId = 1;
  $.ajax({
    type:'get',
    url:'/get/task/'+prjId,
    success:function(taskData){
      //still need data from task table to display
      console.log(taskData);
    },
    error:function(){
      alert("Could not get project's tasks to display");
    }
  });
});
