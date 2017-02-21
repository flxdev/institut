document.addEventListener("DOMContentLoaded", function() {
	(function(){
		var mainHeader = $('.cd-auto-hide-header'),
			headerHeight = mainHeader.height();
		
		var scrolling = false,
			previousTop = 0,
			currentTop = 0,
			scrollDelta = 5,
			scrollOffset = 100;

		$(document).add('.out').on('scroll', function(){
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame)
					? setTimeout(autoHideHeader, 250)
					: requestAnimationFrame(autoHideHeader);
			}
		});

		$(window).on('resize', function(){
			headerHeight = mainHeader.height();
		});

		function autoHideHeader() {
			var currentTop = $('.out').scrollTop();
			window.matchMedia("(max-width: 991px)").matches ? checkSimpleNavigationMobile(currentTop) : checkSimpleNavigation(currentTop);
			 
			previousTop = currentTop;
			scrolling = false;
		}

		function checkSimpleNavigationMobile(currentTop) {
				if (previousTop - currentTop > scrollDelta) {
					mainHeader.removeClass('is-hidden');
				} else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
					mainHeader.addClass('is-hidden');
				}
		}
		function checkSimpleNavigation(currentTop) {
			if (currentTop <= 110) {
				mainHeader.removeClass('is-hidden');
			} else {
				mainHeader.addClass('is-hidden');
			}
		}
	})();
})