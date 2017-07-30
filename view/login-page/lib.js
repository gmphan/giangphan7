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
            const sessionKey = validateResult.usrname;
            const sessionValue = validateResult.validatePw;
            window.name = sessionKey;
            sessionStorage.setItem(sessionKey, sessionValue);
            const url = window.location.href;
            //console.log(url.substr(url.lastIndexOf('login/')+5));
            const urlAfterLogin = url.substr(url.lastIndexOf('login/')+5);
            window.location.href=urlAfterLogin
          }
        },
        error:function(){
          alert('Error sending in your credential')
        }
      });
    }
  });
});
