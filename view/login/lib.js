$(document).ready(function(){
  $('#loginBox').submit(function(e){
    e.preventDefault();
    if($('#usrname').val()==""||$('#psw').val()==""){
      document.getElementById("notifyMessage").innerHTML="<p"+
      "style='color:red'>***Login field cannot be blank!</p>"
    }else{
      $.ajax({
        type:'POST',
        url:'/validate/login',
        data:{
          usrname:$('#usrname').val(),
          psw:$('#psw').val()
        },
        success:function(returnData){
          console.log(returnData);
          console.log('Successfully ajax /validate/login');
          href:window.location.href='/';
        },
        error:function(){
          alert('Error ajax /validate/login');
        }
      })
    }

  });
});
