$(document).ready(function(){
  $('#submitPost').submit(function(e){
    e.preventDefault();
    if($("input[name='post_name']").val()=="" || $("textarea[name='post_content']").val()==""){
      alert('Fill out both post name and content');
      return false;
    }else{
      $.ajax({
        type:'POST',
        url:'/insert/post',
        data:{
          post_name:$("input[name='post_name']").val(),
          post_content:$("textarea[name='post_content']").val()
        },
        success:function(){
          window.location.href='/blog';
        },
        error:function(){
          alert("error inserting new post");
        }
      });
    }
  });
});
