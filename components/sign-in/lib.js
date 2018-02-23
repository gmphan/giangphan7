
/*
problem: modal would on same background as main page -> dark and can't be clicking;
reason: because somewhere in my css has relative or fixed position for Nav or the menu.
I can move the modal out of the div where it contain that css setting, or remove
the fixed and relative css, but that will messup the page display.

Best solution:
Use custom js to change the way it appear to body:
The below tell the browser, show the modal as it is belong to the <body> and
not other <div>

$('#myModal').appendTo("body").modal('show');
Or, if you launch modal using buttons, drop the .modal('show'); and just do:

$('#myModal').appendTo("body")
This will keep all normal functionality, allowing you to show the modal using a button.
*/



(function($){
  "use strict";
  $('#signin1').appendTo("body");

  //need to convert the below functions into jquery, when the link is clicked
  //I auth modal will pop up, after submit, authLink will change
  // function open_fun() {
  //   document.getElementById('authLink').innerHTML =
  //     "<a href='javascript:clo_fun()'>CLOSE</a>";
  // }

  // function clo_fun() {
  //   document.getElementById('authLink').innerHTML =
  //     "<a id='signin1link' data-toggle='modal' data-target='#signout1' href='javascript:open_fun()'>OPEN</a>";
  // }

  $('#authComp1').submit(function(e){
    if($('#usrname').val()==""||$('#psw').val()==""){
      document.getElementById("msg1").innerHTML=
      "<p>***Login field cannot be blank!</p>";
    }else{
      $.ajax({
        type:'POST',
        url:'/sign-in',
        data:{
          usrname:$('#usrname').val(),
          psw:$('#psw').val()
        },
        success:function(response){
          if(response==='badUsername'||response==='badPassword'){
            document.getElementById("msg1").innerHTML=
            "<p>***No match found!</p>";
          }else if(response==='matched'){
            alert('Successfully Authenticated!!!');

            //problem: the below change/add the innerHTML inside <a> and not
            //<a>'s attributes
            //document.getElementById("signin1link").innerHTML=
            //"<a id='signin1link' data-toggle='modal' data-target='#signout1'>Sign-Out</a>"

            //to dismiss modal
            $("#signin1").modal("hide");

            document.getElementById("authLink").innerHTML=
               "<a id='signin1link' data-toggle='modal' data-target='#signout1'>Sign-out</a>";

           //need to call sign-out controller to clear the cookie
           //and then change the innerHTML to sign-in again.

          }
        },
        error:function(){
          alert('Error ajax /sign-in');
        }
      });
    }
    e.preventDefault();
  });


})(jQuery);
