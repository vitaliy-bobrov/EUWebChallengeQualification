(function($, document, undefined) {
	'use strict';

	$('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var target = $(this.hash);

      if (target.length) {
        $('html, body').animate({
        	scrollTop: target.offset().top,
      	}, 800);

      	return false;
      }
    }
  });
})(window.jQuery, document, undefined);