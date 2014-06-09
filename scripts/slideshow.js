$(document).ready(function(){

	SS = {
		init: function(){
			SS.addControls();
			SS.prevSlide();
			SS.nextSlide();
			SS.thumbnailClick();
		},

		addControls: function(){
			$('.slideshow').each(function() {
				slideCount = $(this).find('.slide').length;
				var thumbnails = '';

				for (x = 1; x <= slideCount; x++) {
					thumbnails += '<span class="thumbnail" rel="' + x + '"></span>';
				}

				var controls = '<div class="controls"><span class="prev">PREV</span><span class="thumbs">' + thumbnails + '</span><span class="next">NEXT</span></div>'

				$(this).after(controls);
				SS.startSlideshow($(this));
			});
		},

		startSlideshow: function(ele){
			ele.find('.slide:first-child').fadeIn();
		},

		thumbnailClick: function(){
			$('body').on('click', '.thumbnail', function() {
				curSlide = $(this).closest('.controls').prev('.slideshow').find('.slide:visible');
				curSlide.fadeOut();
				var newSlide = $(this).attr('rel');
				$(this).closest('.controls').prev('.slideshow').find('.slide:nth-child(' + newSlide + ')').fadeIn();
				
			});
		},

		prevSlide: function() {
			$('body').on('click', '.prev', function() {
				var curSlide = $(this).closest('.controls').prev('.slideshow').find('.slide:visible');
				if (SS.checkForFirst(curSlide)) {
					curSlide.fadeOut().closest('.slideshow').find('.slide:last-child').fadeIn();
				} else {
					curSlide.fadeOut().next('.slide').fadeIn();;
				}
			});
		},

		nextSlide: function(){
			$('body').on('click', '.next', function() {
				var curSlide = $(this).closest('.controls').prev('.slideshow').find('.slide:visible');
				if (SS.checkForLast(curSlide)) {
					curSlide.fadeOut().closest('.slideshow').find('.slide:first-child').fadeIn();
				} else {
					curSlide.fadeOut().next('.slide').fadeIn();;
				}
			});
		},


		checkForLast: function(slide){
			return slide.is(':last-child');
		},

		checkForFirst: function(slide){
			return slide.is(':first-child');
		}

	}


	
	SS.init();


});