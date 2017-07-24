$(document).ready(function(){
    const $post_content = $("input[name='post_content']");
    $("#postContentDiv").html($post_content.val());
    
    /**
      since the $post_content already have the value,
      I can out put it in an text area for now,
      when I click on edit button, I will kick off
      a click even and have code put the content in to an text area.
      the text area will be right underneath of the content,
      after editing, there will be a save button/submit button
      the data will be send down to blog controller for the time being,
      I will use alter column to replace the field with the new content.
      and the page should be refresh by calling an event.
    **/
});
