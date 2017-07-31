$(document).ready(function(){
  $('#contactForm').submit(function(e){
    e.preventDefault();
    if($("#name").val()==""||$("#email").val()==""){
      alert("Name and Email can't be blank");
      return false;
    }else {
      const contactInfo={
        name:$("#name").val(),
        email:$("#email").val(),
        phone:$("#phone").val(),
        message:$("#message").val()        
      }
      $.ajax({
        type:'POST',
        url:'/contact/me',
        data:contactInfo,
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
