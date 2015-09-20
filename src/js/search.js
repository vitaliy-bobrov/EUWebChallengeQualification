(function(document, undefined) {
	'use strict';

	var searchToggle = document.querySelectorAll('.js-search-toggle')[0],
		activeClass = 'active';
	searchToggle.addEventListener('click', function() {
		if (this.classList) {
		  this.classList.toggle(activeClass);
		} 
		else {
		  var classes = this.className.split(' ');
		  var existingIndex = classes.indexOf(activeClass);

		  if (existingIndex >= 0) {
		    classes.splice(existingIndex, 1);
		  }
		  else {
		    classes.push(activeClass);
		  }

		  this.className = classes.join(' ');
		}
	});
})(document, undefined);