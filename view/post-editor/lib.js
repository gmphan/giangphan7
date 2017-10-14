$(document).ready(function(){
  const url = window.location.href;
  $('#submitEditedPost').submit(function(e){
    e.preventDefault();
    $.ajax({
      type:'POST',
      url:'/update/post',
      data:{
        postId:url.substr(url.lastIndexOf('/')+1),
        postContent:$("textarea[name='postContent']").val()
      },
      success:function(){
        window.location.href='/post/'+url.substr(url.lastIndexOf('/')+1);
        //console.log('Successfully');
      },
      error:function(){
        alert('Error updating the post');
      }
    });
  });
});
