$(document).ready(function(){
  //this right here will remember the key and value until close the tab.
  //this sessionStorage is only for the browser
  if(sessionStorage.getItem('key') !== 'value'){
    $("#myModal").modal('show');
    //window.name = 'key';
    sessionStorage.setItem('key', 'value');
  }

  console.log('blog page');
});
