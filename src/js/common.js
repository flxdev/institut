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
			blocks = $('.page__header-drop-item'),
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
							targetWrap.css('height',h + 65);
					}else{
						targetWrap.removeClass(shown);
						items.removeClass('active')
					}
				})
		});
		items.add(targetWrap).on('mouseleave',function(){
			setTimeout(function(){
					if ($('.page__header-drop:hover').length != 1 && !$('.js-desktop-hover:hover').length != 0 ) {
						targetWrap.removeClass(shown).attr('style','');
						blocks.removeClass(current);
						items.removeClass('active');
				}
			},1)

		})
	} DesktopMenu();

	doctorSlider();
	rombSlider();
	partnerSlider();
	$('.doctor-slider-add-item-inner').matchHeight({
		property: 'min-height'
	});
	$('.doc-card-inner').matchHeight({
		property: 'min-height'
	});
	$('.doc-card-text .text2').matchHeight({
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

function rombSlider(){
	$(".romb-slider-main").each(function() {
		var _this = $(this);
		var parent = _this.closest('.romb-slider-wrap');
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			autoplay: true,
			dots: false,
			touchMove: false,
			infinite: false,
			appendArrows: parent.find('.nav-arrows'),
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplaySpeed: 8000,
			nextArrow:'<button type="button" class="carousel-next"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			prevArrow:'<button type="button" class="carousel-prev"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			responsive: [
					{
				breakpoint: 906,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
				breakpoint: 630,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
			]
		}); 
	});
}
function partnerSlider(){
	$(".partner-slider-inner").each(function() {
		var _this = $(this);
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			dots: false,
			touchMove: true,
			infinite: false,
			appendArrows: _this.parent().find('.nav-arrows'),
			slidesToShow: 6,
			slidesToScroll: 1,
			nextArrow:'<button type="button" class="carousel-next"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			prevArrow:'<button type="button" class="carousel-prev"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			responsive: [
					{
				breakpoint: 1210,
					settings: {
						slidesToShow: 5,
					}
				},
				{
				breakpoint: 991,
					settings: {
						slidesToShow: 4,
					}
				},
				{
				breakpoint: 768,
					settings: {
						slidesToShow: 3,
					}
				},
				{
				breakpoint: 600,
					settings: {
						slidesToShow: 2,
					}
				},
				{
				breakpoint: 480,
					settings: {
						slidesToShow: 1,
					}
				},
			]
		}); 
	});
}