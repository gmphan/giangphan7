$(document).ready(function(){
  //this right here will remember the key and value until close the tab.
  //this sessionStorage is only for the browser
  if(sessionStorage.getItem('proj-key') !== 'proj'){
    $("#proj-modal").modal('show');
    //window.name = 'key'
    sessionStorage.setItem('proj-key', 'proj');
  }

  //console.log('project page');
});
