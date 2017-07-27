$(document).ready(function(){
  $("#signInBox").modal('show');
  /****Add post***************/
  const $post_name = $("input[name='post_name']");
  const $post_content = $("textarea[name='post_content']");
  $('#submitPost').submit(function(e){
    e.preventDefault();
    if($post_name.val()==""||$post_content.val()==""){
      alert('fill out both post name and content');
      return false;
    }else {
      const submitPost ={
        postName:$post_name.val(),
        postContent:$post_content.val()
      }
      $.ajax({
        type:'POST',
        url:'/post/insertion',
        data: submitPost,
        success:function(){
          console.log('Successfully ajax /postInsertHandler');
          document.getElementById("submitPost").reset();
        },
        error:function(){
          alert('error adding new post content');
        }
      });
    }

  });

  /****End Add post***********/
});
