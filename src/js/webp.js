(function(document, undefined) {
	'use strict';

	function testWepP(callback) {
    var webP = new Image();
      webP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMw' +
'AgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
    webP.onload = webP.onerror = function() {
      callback(webP.height === 2);
    };
  }

  testWepP(function(supported) {
    if (supported) {
    	var el = document.getElementsByTagName('body')[0],
    	webpClass = 'webp';

    	if (el.classList) {
	    	el.classList.add(webpClass);
	    }  
			else {
				el.className += ' ' + webpClass;
			}  
    }    
  });
})(document, undefined);