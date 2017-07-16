$(document).ready(function(){
  $("#ulBlog").on('click', 'a', function(){

    $.ajax({
      type:'POST',
      url:'/getBlogFile',
      success:function(fromGetBlogFileHdler){
        console.log('Successfully POST to getBlogFile handler');
        document.open();
        document.write(fromGetBlogFileHdler);
        document.close();
      },
      error:function(){
        alert('error get blog file');
      }
    });
  });

});
