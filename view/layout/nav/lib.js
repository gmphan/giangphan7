$(document).ready(function(){
  console.log(window.location.href);
  const url = window.location.href;
  const lastIndexOfUrl = url.substr(url.lastIndexOf('/')+1);
  console.log(lastIndexOfUrl);
});
