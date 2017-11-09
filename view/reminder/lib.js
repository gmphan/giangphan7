$(document).ready(function(){
  //this right here will remember the key and value until close the tab.
  //this sessionStorage is only for the browser
  if(sessionStorage.getItem('reminder-key') !== 'reminder'){
    $("#myModal").modal('show');
    //window.name = 'key'
    sessionStorage.setItem('reminder-key', 'reminder');
  }

  console.log('blog page');
});
