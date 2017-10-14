$(document).ready(function(){
    const $post_content = $("input[name='post_content']");
    const postContent = $post_content.val();
    $("#postContentDiv").html(postContent);
    
});
