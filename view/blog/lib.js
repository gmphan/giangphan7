$(document).ready(function(){
  /*****get blog content***/
  $("#ulBlog").on('click', 'a', function(){
    console.log('All blog link object array: '+$('a'));
    var blogId = $(this).attr('id');
    console.log('Selected link id: '+blogId);
    $.ajax({
      type:'POST',
      url:'/getBlog',
      data:{blogId:blogId},
      success:function(blogPage){
        console.log('Successfully POST to getBlogHandler');
        //need improment here
        document.open();
        document.write(blogPage);
        document.close();
      },
      error:function(){
        alert('error get blog file');
      }
    });
  });
  /*****end get blog content***/


});
