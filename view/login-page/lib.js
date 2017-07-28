$(document).ready(function(){

  $('#loginBox').submit(function(e){
    e.preventDefault();
    if($('#usrname').val()==""||$('#psw').val()==""){
      document.getElementById("notifyMessage").innerHTML="<p"+
      "style='color:red'>fill out your credential</p>"
    }else{
      //console.log($('#usrname').val() + $('#psw').val())
      const loginInfo={
        usrname:$('#usrname').val(),
        psw:$('#psw').val()
      }
      $.ajax({
        type:'POST',
        url:'/login/validate',
        data:loginInfo,
        success:function(validateResult){
          console.log('Successfully ajax /login/validate');
          //console.log(validateResult);
          const validateValue = validateResult;
          if(validateValue==0){
            document.getElementById("notifyMessage").innerHTML="<p"+
            ">Incorrect username or password!";
            document.getElementById("loginBox").reset();
          }else {
            document.getElementById("notifyMessage").innerHTML="<p"+
            ">Correct username or password!";
            document.getElementById("loginBox").reset();
            //console.log(validateResult.usrname + validateResult.validatePw);
            const sessionKey = validateResult.usrname;
            const sessionValue = validateResult.validatePw
            sessionStorage.setItem(sessionKey, sessionValue);
          }
        },
        error:function(){
          alert('Error sending in your credential')
        }
      });
    }
  });
});
