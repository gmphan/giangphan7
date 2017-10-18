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
          if(returnData==='badUsername'){
            console.log('Wrong Username');
          }else if(returnData==='badPassword'){
            console.log('Wrong Password');
          }else if(returnData==='matched'){
            href:window.location.href='/';
          }
        },
        error:function(){
          alert('Error ajax /validate/login');
        }
      })
    }

  });
});
