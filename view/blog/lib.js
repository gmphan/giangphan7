$(document).ready(function(){
  /*****get blog content***/
  $("#ulBlog").on('click', 'a', function(){

    $.ajax({
      type:'POST',
      url:'/getBlog',
      success:function(blogPage){
        console.log('Successfully POST to getBlogHandler');
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

  /****Add blog***************/
  const $blog_name = $("input[name='blog_name']");
  const $blog_content = $("textarea[name='blog_content']");
  $('#submitBlog').submit(function(e){
    e.preventDefault();
    if($blog_name.val()==""||$blog_content.val()==""){
      alert('flill the blog name and blog content');
      return false;
    }else {
      const submitBlog ={
        blogName:$blog_name.val(),
        blogContent:$blog_content.val()
      }
      $.ajax({
        type:'POST',
        url:'/blog/insertion',
        data: submitBlog,
        success:function(){
          console.log('Successfully ajax /blogInsertHandler');
          document.getElementById("submitBlog").reset();
        },
        error:function(){
          alert('error adding new blog content');
        }
      });
    }

  });

  /****End Add blog***********/
});
