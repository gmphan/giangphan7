$(document).ready(function(){
  //this right here will remember the key and value until close the tab.
  //this sessionStorage is only for the browser
  if(sessionStorage.getItem('blog-key') !== 'blog'){
    console.log('word!');
    $("#post-modal").modal('show');
    //window.name = 'key'
    sessionStorage.setItem('blog-key', 'blog');
  }

  console.log('blog page');
});
