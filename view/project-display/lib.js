$(document).ready(function(){
  const prjId = 1;
  $.ajax({
    type:'get',
    url:'/get/task/'+prjId,
    success:function(taskData){
      //still need data from task table to display
      var sltTsk = document.getElementById('slt_tsk');
      var option = document.createElement("option");
        for(let i=0; i<taskData.length; i++){
          //taskData[i];
          //'<option value="">'+taskData[i]+'</option>'+
          option.text = taskData[i].id;
          sltTsk.add(option);
          //console.log(taskData[i].id);
        }

      // for(let i=0; i<taskData.length; i++){
      //   console.log(taskData[i]);
      // }
      //console.log(taskData);
    },
    error:function(){
      alert("Could not get project's tasks to display");
    }
  });
});
