function parallax(){
	/* detect touch */
	if("ontouchstart" in window){
	    document.documentElement.className = document.documentElement.className + " touch";
	}
	if(!$("html").hasClass("touch")){
	    /* background fix */
	    $(".parallax").css("background-attachment", "fixed");
	}

	/* resize background images */
	function backgroundResize(){
	    var windowH = $(window).height();
	    $(".background").each(function(i){
	        var path = $(this);
	        // variables
	        var contW = path.width();
	        var contH = path.height();
	        var imgW = path.attr("data-img-width");
	        var imgH = path.attr("data-img-height");
	        var ratio = imgW / imgH;
	        // overflowing difference
	        var diff = parseFloat(path.attr("data-diff"));
	        diff = diff ? diff : 0;
	        // remaining height to have fullscreen image only on parallax
	        var remainingH = 0;
	        if(path.hasClass("parallax") && !$("html").hasClass("touch")){
	            var maxH = contH > windowH ? contH : windowH;
	            remainingH = windowH - contH;
	        }
	        // set img values depending on cont
	        imgH = contH + remainingH + diff;
	        imgW = imgH * ratio;
	        // fix when too large
	        if(contW > imgW){
	            imgW = contW;
	            imgH = imgW / ratio;
	        }
	        //
	        path.data("resized-imgW", imgW);
	        path.data("resized-imgH", imgH);
	        path.css("background-size", imgW + "px " + imgH + "px");
	    });
	}
	$(window).resize(backgroundResize);
	$(window).focus(backgroundResize);
	backgroundResize();

	/* set parallax background-position */
	function parallaxPosition(e){
	    var heightWindow = $(window).height();
	    var topWindow = $(window).scrollTop();
	    var bottomWindow = topWindow + heightWindow;
	    var currentWindow = (topWindow + bottomWindow) / 2;
	    $(".parallax").each(function(i){
	        var path = $(this);
	        var height = path.height();
	        var top = path.offset().top;
	        var bottom = top + height;
	        // only when in range
	        if(bottomWindow > top && topWindow < bottom){
	            var imgW = path.data("resized-imgW");
	            var imgH = path.data("resized-imgH");
	            // min when image touch top of window
	            var min = 0;
	            // max when image touch bottom of window
	            var max = - imgH + heightWindow;
	            // overflow changes parallax
	            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
	            top = top - overflowH;
	            bottom = bottom + overflowH;
	            // value with linear interpolation
	            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
	            // set background-position
	            var orizontalPosition = path.attr("data-oriz-pos");
	            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
	            $(this).css("background-position", orizontalPosition + " " + value + "px");
	        }
	    });
	}
	if(!$("html").hasClass("touch")){
	    $(window).resize(parallaxPosition);
	    //$(window).focus(parallaxPosition);
	    $(window).scroll(parallaxPosition);
	    parallaxPosition();
	}

}
parallax();
	/* parallax.js code */

$(document).ready(function(){

	// remove fragment as much as it can go without adding an entry in browser history:
	window.location.replace("#");

	// slice off the remaining '#' in HTML5:    
	if (typeof window.history.replaceState == 'function') {
	  history.replaceState({}, '', window.location.href.slice(0, -1));
	}

	/* run function on resize */

	var windowHeight = $(window).innerHeight();

	function setCoverPhotoSize(){
		$('.hero').css('height' , windowHeight - 70);
	}
	setCoverPhotoSize();
	/* set cover photo size to full height if VH fails*/ 

	/* set parallax scroll speed for text */
	$(function(){
	  var boxes = $('[data-scroll-speed]'),
	  $window = $(window);
	  $window.on('scroll', function(){
	    var scrollTop = $window.scrollTop();
	    boxes.each(function(){
	      var $this = $(this),
	          scrollspeed = parseInt($this.data('scroll-speed')),
	          val = - scrollTop / scrollspeed;
	      $this.css('transform', 'translateY(' + val + 'px)');
	    });
	  });
	}) /* parallax scroll speed */



	function centerSectionText(){
		$('.section').each(function(){
			var textWrapper = $(this).find('.text-wrapper');
			var imageWrapper = $(this).find('.image-wrapper');
			if(textWrapper.height() < imageWrapper.height()){
				var offsetText = ($(this).height() - textWrapper.height()) /2;
				textWrapper.css('top', offsetText);
			}

			else{
				var offsetImage = ($(this).height() - imageWrapper.height()) /2;
				imageWrapper.css('top', offsetImage);
			}

		});

	}
	centerSectionText();

	$(window).resize(function(){
		centerSectionText();	
	});

});