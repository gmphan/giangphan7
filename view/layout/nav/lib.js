(function($){
  "use strict";
  const url = window.location.href;
  const lastIndexOfUrl = url.substr(url.lastIndexOf('/')+1);

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('.page-scroll a').on('click', function(event) {
    var $anchor = $(this);
    if(lastIndexOfUrl === '' || lastIndexOfUrl === '#portfolio' || lastIndexOfUrl === '#about' || lastIndexOfUrl === '#contact'){
      $('html, body').stop().animate({
          scrollTop: ($($anchor.attr('href')).offset().top - 50)
      }, 1250, 'easeInOutExpo');
      event.preventDefault();
    }else if(lastIndexOfUrl !== ""){
      href:window.location.href='/'+$anchor.attr('href');
      console.log($anchor.attr('href'));
      $('html, body').stop().animate({
          scrollTop: ($($anchor.attr('href')).offset().top - 50)
      }, 1250, 'easeInOutExpo');
      event.preventDefault();
    }
  });

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
