$(document).ready(function(){
  $('.NA').click(function(){
    alert("The page is under development.");
  });

  $('#contactForm').submit(function(e){
    e.preventDefault();
    console.log('testing');
    if($("#name").val()==""||$("#email").val()==""){
      alert("Name and Email can't be blank");
      return false;
    }else{
      $.ajax({
        type:'POST',
        url:'/insert/contact',
        data:{
          name:$("#name").val(),
          email:$("#email").val(),
          phone:$("#phone").val(),
          message:$("#message").val()
        },
        success:function(){
          console.log('Successfully ajax contact/me');
          document.getElementById('contactForm').reset();
          alert('Your information was received, Thank you!');
        },
        error:function(){
          alert('Error adding Contact Info to the database');
        }
      });
    }
  });
});
