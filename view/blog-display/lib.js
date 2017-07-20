$(document).ready(function(){
    const $blog_content = $("input[name='blog_content']");
    //console.log($blog_content.val());
    $("#blogContentDiv").html($blog_content.val());
});
