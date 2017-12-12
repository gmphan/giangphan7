$(document).ready(function(){
  const prjId = 1;
  $.ajax({
    type:'get',
    url:'/get/task/'+prjId,
    success:function(taskData){
      var sltTsk = document.getElementById('slt_tsk');
      const tskId=[];
        for(var i=0; i<taskData.length; i++){
          var option = document.createElement("option");
          option.text = taskData[i].task_name;
          sltTsk.add(option);
          tskId[i]=taskData[i].description;
          //first try to add the below for each task by getElementById.innerHTML
          /*
              <div class="row proj-rows">
                <div class="col-sm-2 proj-left-divs">Activity:</div>
                <div class="col-sm-8">
                  <textarea class="form-control" name="activity" rows="5" cols="40"></textarea>
                </div>
                <div class="col-sm-2"><button class="btn btn-gphan btn-sm">Add Note</button></div>
              </div>
          */
          //after that I will have to hide the content, and show the content by selecting value.
          //console.log(tskId[i]);
          //document.getElementById().innerHTML =
        }
    },
    error:function(){
      alert("Could not get project's tasks to display");
    }
  });
  var x = document.getElementById("slt_tsk").selectedIndex;
  console.log(x);
});
