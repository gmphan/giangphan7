$(document).ready(function(){
  const $editedPost = $("textarea[name='editedPost']");
  const url = window.location.href;
  const lastIndexOfUrl = url.substr(url.lastIndexOf('/')+1);
  $('#submitEditedPost').submit(function(e){
    e.preventDefault();
    const sessionKey=window.name;
    const sessionValue=sessionStorage.getItem(sessionKey);
    const submitEditedPost={
      editedPostId:lastIndexOfUrl,
      editedPost:$editedPost.val(),
      sessionKey:sessionKey,
      sessionValue:sessionValue
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
