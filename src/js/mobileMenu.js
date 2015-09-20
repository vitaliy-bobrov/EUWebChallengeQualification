(function(document, undefined) {
	'use strict';

	function classToggle(element, classString) {
		if (element.classList) {
		  element.classList.toggle(classString);
		} 
		else {
		  var classes = element.className.split(' ');
		  var existingIndex = classes.indexOf(classString);

		  if (existingIndex >= 0) {
		    classes.splice(existingIndex, 1);
		  }
		  else {
		    classes.push(classString);
		  }

		  element.className = classes.join(' ');
		}

		return element;
	}

	if (window.innerWidth < 1024) {
		var hamburger = document.querySelectorAll('.js-menu-toggle')[0],
			menu = document.querySelectorAll('.js-menu')[0],
			links = document.querySelectorAll('.js-menu-link'),
			open = 'open';

		hamburger.addEventListener('click', function() {
			classToggle(hamburger, open);
			classToggle(menu, open);
		});

		Array.prototype.forEach.call(links, function(element, index) {
			element.addEventListener('click', function() {
				classToggle(hamburger, open);
				classToggle(menu, open);
			});
		});
	}	
})(document, undefined);