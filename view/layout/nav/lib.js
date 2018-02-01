(function($){
  "use strict";
  const url = window.location.href;
  const lastIndexOfUrl = url.substr(url.lastIndexOf('/')+1);

  /**** set session for scrolling-key or else will get compile error
  @scrollTop: ($(sessionStorage.getItem('scrolling-key')).offset().top - 50)
  because null.offset is not acceptable *****/
  if(sessionStorage.getItem('scrolling-key') == null){
    sessionStorage.setItem('scrolling-key', "#page-top");
  }

  /* make sure scrolling animation work when jump from a menu page to home page */
  if(lastIndexOfUrl == "" && sessionStorage.getItem('scrolling-key') !== ""){
    $('html, body').stop().animate({
        scrollTop: ($(sessionStorage.getItem('scrolling-key')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    sessionStorage.setItem('scrolling-key', "");
  }

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('.page-scroll a').on('click', function(event) {
    var $anchor = $(this);
    sessionStorage.setItem('scrolling-key', $anchor.attr('href'));
    if(lastIndexOfUrl !== ""){
      window.location.href='/';
    }else{
      $('html, body').stop().animate({
          scrollTop: ($(sessionStorage.getItem('scrolling-key')).offset().top - 50)
      }, 1250, 'easeInOutExpo');
    }
  });
/* end of make sure scrolling animation work when jump from a menu page to home page */

  // Highlight the top nav as scrolling occurs
  $('body').scrollspy({
      target: '.navbar-fixed-top',
      offset: 51
  });

  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a').click(function(){
          $('.navbar-toggle:visible').click();
  });

  // Offset for Main Navigation
  $('#mainNav').affix({
      offset: {
          top: 100
      }
  })

  // Floating label headings for the contact form
  $(function() {
      $("body").on("input propertychange", ".floating-label-form-group", function(e) {
          $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
      }).on("focus", ".floating-label-form-group", function() {
          $(this).addClass("floating-label-form-group-with-focus");
      }).on("blur", ".floating-label-form-group", function() {
          $(this).removeClass("floating-label-form-group-with-focus");
      });
  });

})(jQuery);
