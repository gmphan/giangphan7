$(document).ready(function(){
  $('#signInBox').submit(function(e){
    e.preventDefault();
    if($('#usrname').val()==""||$('#psw').val()==""){
      document.getElementById("missingLogin").innerHTML="<p"+
      "style='color:red'>fill out your credential</p>"
    }else{
      //console.log($('#usrname').val() + $('#psw').val())
      const loginInfo={
        usrname:$('#usrname').val(),
        psw:$('#psw').val()
      }
      $.ajax({
        type:'POST',
        url:'/sign-in',
        data:loginInfo,
        success:function(){
          console.log('Successfully ajax /sign-in');
        },
        error:function(){
          alert('Error sending in your credential')
        }
      });
    }
  });
});
