$(document).ready(function(){

	SS = {
		init: function(){
			SS.addControls();
			SS.prevSlide();
			SS.nextSlide();
			SS.thumbnailClick();
			SS.ignoreHashAnchor();
		},

		ignoreHashAnchor: function() {
			$('body').on('click', 'a[href="#"]', function() {
				event.preventDefault();
			});
		},

		addControls: function(){
			$('.slideshow').each(function() {
				slideCount = $(this).find('.slide').length;
				var thumbnails = '';

				for (x = 0; x < slideCount; x++) {
					thumbnails += '<a href="#" class="thumbnail"></a>';
				}

				var slideControls = '<div class="controls"><a href="#" class="prev">PREV</a><span class="thumbs">' + thumbnails + '</span><a href="#" class="next">NEXT</a></div>'

				$(this).after(slideControls);
				SS.startSlideshow($(this));
			});
		},

		startSlideshow: function(ele){
			ele.find('.slide:first-child').addClass('active');
			ele.next().find('.thumbnail:first-child').addClass('current');
		},

		thumbnailClick: function(){
			$('body').on('click', '.thumbnail', function() {
				var curSlide = SS.findCurrentSlide($(this));
				SS.removeCurrentThumb($(this).parent());
				curSlide.removeClass('active');

				var newSlide = $(this).index() + 1;
				console.log(newSlide);
				$(this).closest('.controls').prev('.slideshow').find('.slide:nth-child(' + newSlide + ')').addClass('active');
				SS.addCurrentThumb($(this))

			});
		},

		prevSlide: function() {
			$('body').on('click', '.prev', function() {
				var curSlide = SS.findCurrentSlide($(this));
				SS.removeCurrentThumb($(this).parent());
				if (SS.checkForFirst(curSlide)) {
					SS.addCurrentThumb($(this).next().find('.thumbnail:last-child'));
					curSlide.removeClass('active').closest('.slideshow').find('.slide:last-child').addClass('active');
				} else {
					curSlide.removeClass('active').prev('.slide').addClass('active');
					SS.addCurrentThumb($(this).next().find('.thumbnail:nth-child(' + curSlide.index() + ')'));
				}
			});
		},

		nextSlide: function(){
			$('body').on('click', '.next', function() {
				var curSlide = SS.findCurrentSlide($(this));
				SS.removeCurrentThumb($(this).parent());
				if (SS.checkForLast(curSlide)) {
					SS.addCurrentThumb($(this).prev().find('.thumbnail:first-child'));
					curSlide.removeClass('active').closest('.slideshow').find('.slide:first-child').addClass('active');
				} else {
					curSlide.removeClass('active').next('.slide').addClass('active');
					SS.addCurrentThumb($(this).prev().find('.thumbnail:nth-child(' + (curSlide.index() + 2) + ')'));
				}
			});
		},

		findCurrentSlide: function(ele){
			return ele.closest('.controls').prev('.slideshow').find('.active');
		},

		checkForLast: function(slide){
			return slide.is(':last-child');
		},

		checkForFirst: function(slide){
			return slide.is(':first-child');
		},

		addCurrentThumb: function(ele){
			ele.addClass('current');
		},

		removeCurrentThumb: function(ele){
			ele.find('.current').removeClass('current');
		}

	}


	
	SS.init();


});