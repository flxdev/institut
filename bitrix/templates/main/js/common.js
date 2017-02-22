document.addEventListener("DOMContentLoaded", function() {
	(function(){
		var mainHeader = document.querySelector('.cd-auto-hide-header'),
			headerHeight = mainHeader.offsetHeight;

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


		function autoHideHeader() {
			var currentTop = document.querySelector('.out').scrollTop;
			window.matchMedia("(max-width: 991px)").matches ? checkSimpleNavigationMobile(currentTop) : checkSimpleNavigation(currentTop);

			previousTop = currentTop;
			scrolling = false;
		}

		function checkSimpleNavigationMobile(currentTop) {
			if (previousTop - currentTop > scrollDelta) {
				mainHeader.classList.remove('is-hidden');
			} else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
				mainHeader.classList.add('is-hidden');
			}
		}
		function checkSimpleNavigation(currentTop) {
			if (currentTop <= 110) {
				mainHeader.classList.remove('is-hidden');
			} else {
				mainHeader.classList.add('is-hidden');
			}
		}
	})();

	function DesktopMenu(){
		var mainCont = $('.page__header-nav-bottom'),
			items = mainCont.find('.js-desktop-hover'),
			targetWrap = $('.page__header-drop'),
			shown = 'is-shown',
			current = 'is-shown';

		items.each(function(){
			var _ = $(this),
				id = parseInt(_.data('id'));
			console.log(id)
			_.on('mouseenter',function(){
				if(targetWrap.find("[data-id="+ id +"]").length){
					_.addClass('active').siblings().removeClass('active');

					targetWrap.addClass(shown);
					targetWrap.find("[data-id="+ id +"]").addClass(current).siblings().removeClass(current);
					var h = targetWrap.find("[data-id="+ id +"]").find('.page__header-drop-list').outerHeight();
					console.log(h)
					targetWrap.css('height',h + 40);
				}else{
					targetWrap.removeClass(shown);
					items.removeClass('active')
				}
			})
		});
		items.add(targetWrap).on('mouseleave',function(){
			setTimeout(function(){
				if ($('.page__header-drop:hover').length != 1 && !$('.js-desktop-hover:hover').length != 0 ) {
					targetWrap.removeClass(shown);
					items.removeClass('active')
				}
			},1)

		})
	} DesktopMenu();

	doctorSlider();
	$('.doctor-slider-add-item-inner').matchHeight({
	 property: 'min-height'
	});
//end of document.ready
});
//end of document.ready

function doctorSlider(){
	$(".js-slider-doctor").each(function() {
		var _this = $(this);
		var parent = _this.closest('.index-aside-inner');
		_this.slick({
			accessibility: true,
			arrows: false,
			draggable: false,
			autoplay: true,
			dots: true,
			appendDots: parent.find('.nav-dots'),
			asNavFor: parent.find('.js-slider-doctor-add'),
			touchMove: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			autoplaySpeed: 8000
		});
	});
	$(".js-slider-doctor-add").each(function() {
		var _this = $(this);
		var parent = _this.closest('.index-aside-inner');
		_this.slick({
			accessibility: true,
			arrows: false,
			draggable: false,
			dots: false,
			asNavFor: parent.find('.js-slider-doctor'),
			touchMove: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1
		});
	});
}
