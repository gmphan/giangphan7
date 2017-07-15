$(document).ready(function(){
  console.log('test from component/get-log');
  $('#includedContent').html('<p>hllo</p>');
  $("#includedContent").load("/assets/html-in-html.html");
  $("#btn1").on("click", function(){
       $("#test1").text("Hello world!");
   });
   $("#btn2").click(function(){
       $("#test2").html("<b>Hello world!</b>");
   });
   $("#btn3").click(function(){
       $("#test3").val("Dolly Duck");
   });
   $("#includedContent").load("/assets/html-in-html.html");
});
