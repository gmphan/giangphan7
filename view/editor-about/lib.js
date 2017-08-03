$(document).ready(function(){
  if(sessionStorage.getItem(window.name)==null){
    window.location.href=('/login/edit/about')
  }else{
    const $editedAbOjb = $("textarea[name='ab_content']");
    const url = window.location.href;
    const lastIndexOfUrl = url.substr(url.lastIndexOf('/')+1);
    $('#submitAbout').submit(function(e){
      e.preventDefault();
      const $editedAbValue = $editedAbOjb.val();
      //console.log('value '+$editedAbValue);
      const sessionKey=window.name;
      const sessionValue=sessionStorage.getItem(sessionKey);
      const submitEditedAbout={
        id:lastIndexOfUrl,
        editedAbValue:$editedAbValue,
        sessionKey:sessionKey,
        sessionValue:sessionValue
      }
      $.ajax({
        type:'POST',
        url:'/about/reinsertion',
        data:submitEditedAbout,
        success:function(){
          //console.log('Successfully ajax about/reinsertion')
          window.location.href='/#about';
        },
        error:function(){
          alert('error adding edited post')
        }
      });
    })
  }
});
