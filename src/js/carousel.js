(function($, document, undefined) {
	'use strict';

	$(document).ready(function() {
		$('.js-owl-carousel-slider').owlCarousel({
			items: 1,
			loop: true,
			nav: true,
			navText: ['Next', 'Previous'],
			dots: false,
			autoplay: true,
			autoplayTimeout: 8000,
			autoplayHoverPause: true,
			animateOut: 'fadeOut',
		});
	});
	
})(window.jQuery, document, undefined);