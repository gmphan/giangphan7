$(document).ready(function(){
  const prjId = $("input[name='prj_id']").val();
  $.ajax({
    type:'get',
    url:'/get/task/'+prjId,
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
    alert( tskId);
    $.ajax({
      type:'get',
      url:'/get/task/'+tskId,

    })


    })


});
