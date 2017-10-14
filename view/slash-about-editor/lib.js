$(document).ready(function(){
  const about_content = $("textarea[name='ab_content']");
  const url=window.location.href;
  const aboutId=
  $('#submitAbout').submit(function(e){
    e.preventDefault();
    // const jsonEditedAbout={
    //   about_content:about_content.val(),
    //   id:url.substr(url.lastIndexOf('/')+1)
    // }
    console.log(about_content.val());
    $.ajax({
      type:'POST',
      url:'/update/about',
      data:{
        about_content:about_content.val(),
        id:url.substr(url.lastIndexOf('/')+1)
      },
      success:function(){
        console.log('Successfully ajax about/updateAbout');

      },
      error:function(){
        alert('error updating content of about')
      }
    });

  });
});
