$(document).ready(function(){
  const $editedPost = $("textarea[name='editedPost']");
  const url = window.location.href;
  const lastIndexOfUrl = url.substr(url.lastIndexOf('/')+1);
  $('#submitEditedPost').submit(function(e){
    e.preventDefault();
    const submitEditedPost={
      editedPostId:lastIndexOfUrl,
      editedPost:$editedPost.val()
    }
    $.ajax({
      type:'POST',
      url:'/post/reinsertion',
      data:submitEditedPost,
      success:function(){
        console.log('Successfully ajax reinsertPosthandler')
        window.location.href='/blog';
      },
      error:function(){
        alert('error adding edited post')
      }
    });
  })
});
