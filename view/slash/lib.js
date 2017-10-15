$(document).ready(function(){
  $('#contactForm').submit(function(e){
    e.preventDefault();
    console.log('testing');
    if($("#name").val()==""||$("#email").val()==""){
      alert("Name and Email can't be blank");
      return false;
    }else{
      $.ajax({
        type:'POST',
        url:'/contact/me',
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

// $(document).ready(function(){
//   console.log('home page');
//   const $about_content = $("input[name='about_content']");
//   const aboutContent = $about_content.val();
//   //$("#aboutContent").html(aboutContent);
//
// });
