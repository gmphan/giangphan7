$(document).ready(function(){
    const $post_content = $("input[name='post_content']");
    const postContent = $post_content.val();
    $("#postContentDiv").html(postContent);

  /*****Update current post with editing************/
    //Edit current post
    $("#editPost").on("click", function editPost(){
        console.log(postContent);
        $("#postAfterEdit").html("<form id='submitEditedPost'>"+
            "Post Content: <textarea type='text' rows='3' cols='100'style='vertical-align:middle'>"+
              postContent +
            "</textarea>"+
            "<input type='submit' value='Submit Change'>"+
          "</form>"
        );
      });
      //End editing post

      //submitting editing post
    $("#submitEditedPost").submit(function(e){
      e.preventDefault();
      $.ajax({
        type:'POST',
        url:'/post/update',
        //data:submitEditedPost,
        success:function(postUpdateReply){
          console.log('Successfully ajax /postUpdateHandler');

        },
        error:function(){
          alert('error update post content')
        }
      });
    });
    //End submiting editing post
  /*****End Update current post with editing************/
});
