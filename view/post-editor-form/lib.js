$(document).ready(function(){
  const $editedPost = $("textarea[name='editedPost']");
  $('#submitEditedPost').submit(function(e){
    e.preventDefault();
    const submitEditedPost={
      editedPost:$editedPost.val()
    }
    $.ajax({
      type:'POST',
      url:'/update/post',
      data:submitEditedPost,
      success:function(){
        console.log('Successfully ajax updatePosthandler')
      },
      error:function(){
        alert('error adding edited post')
      }
    });
  })
});
