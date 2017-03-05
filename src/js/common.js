document.addEventListener("DOMContentLoaded", function() {
	(function(){
		var mainHeader = document.querySelector('.cd-auto-hide-header'),
			headerHeight = mainHeader.offsetHeight;
		
		var scrolling = false,
			previousTop = 0,
			currentTop = 0,
			scrollDelta = 5,
			scrollOffset = 100;

		$(window).on('scroll', function(){
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame)
					? setTimeout(autoHideHeader, 250)
					: requestAnimationFrame(autoHideHeader);
			}
		});


		function autoHideHeader() {
			var currentTop = $(document).scrollTop();
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
	} 
	DesktopMenu();
	doctorSlider();
	rombSlider();
	partnerSlider();
	contentSlider();
	aside();
	diplomSlider();
	moreSlider();
	productSlider();
	function MobileDropdown(trigger,parent,target){
		var trg = $(trigger),
			prnt = $(parent),
			trgt = $(target);
		trg.each(function(){
			$(this).on('click', function(){

				var item = prnt.find(trgt);
				console.log(item.length)
				if(item.hasClass('active')){

					item.removeClass('active');
				}else{
					prnt.siblings().find(trgt).removeClass('active');
					item.addClass('active');				
				}
			});
		});
	}
	MobileDropdown('.js-dropdown','.js-dropdown-parent','.js-dropdown-target')
	$('.doctor-slider-add-item-inner').matchHeight({
		property: 'min-height'
	});
	$('.doc-card-inner').matchHeight({
		property: 'min-height'
	});
	$('.doc-card-text .text2').matchHeight({
		property: 'min-height'
	});
	function player(){
		// var players = document.querySelectorAll('video-wrap');
		// var lngth = players.length;
		// for (var i = 1, i<= lngth, i++){
		// 	var video = player[i].querySelector('iframe');

		// }
		var players = $('.video-wrap');
		players.each(function(){
			var _ = $(this);
			_.on('click', function(e){
				_.addClass('played').find('iframe')[0].src += "?&autoplay=1";
				e.preventDefault();
			});
		});
	}player();
	function checkListHeight(){
		var _this = this;
		_this.eventHandler = function(){
			_this.trigger.addeventListener('click', _this.expand, false);
		}
		_this.getHeight = function(){
			var h = $(window).height() - 80;
			var menuh = _this.menu.height() + 90;
		}
	}
//end of document.ready
});
//end of document.ready

function aside(){
	function stickinit(){
		setTimeout(function(){
			$(".aside-stick").stick_in_parent({
				offset_top : 73
			});		
		},1)		
	}stickinit();
	
	$(window).on('resize', function(){
		if(window.matchMedia("(max-width: 735px)").matches){
			$(".aside-stick").trigger("sticky_kit:detach");
		}else{
			stickinit()
		}
	});
}

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
function diplomSlider(){
	$(".diplom-slider-inner").each(function() {
		var _this = $(this);
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			autoplay: false,
			dots: false,
			fade: false,
			touchMove: false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
		});
	});
}
function contentSlider(){
	$(".content-slider-slider").each(function() {
		var _this = $(this);
		var parent = _this.closest('.content-slider-wrap');
		_this.on('init reinit afterChange', function(event, slick, currentSlide, nextSlide){
		  	var active = _this.find('.slick-current');
		  		active.find('.cocoen').cocoen();
		});
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			autoplay: false,
			dots: true,
			fade: false,
			touchMove: false,
			infinite: false,
			appendArrows: parent.find('.nav-arrows'),
			appendDots: parent.find('.nav-dots'),
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow:'<button type="button" class="carousel-next"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			prevArrow:'<button type="button" class="carousel-prev"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
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
function moreSlider(){
	$(".more-content-slider").each(function() {
		var _this = $(this);
			parent = _this.parents('.more-content-wrapper');
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			dots: false,
			touchMove: true,
			infinite: false,
			autoplay: true,
			autoplaySpeed: 4500,
			appendArrows: parent.find('.nav-arrows'),
			slidesToShow: parent.hasClass('gray') ? 2 : 3,
			slidesToScroll: 1,
			nextArrow:'<button type="button" class="carousel-next"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			prevArrow:'<button type="button" class="carousel-prev"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			responsive: [
				{
				breakpoint: 991,
					settings: {
						slidesToShow: 2,
					}
				},
				{
				breakpoint: 735,
					settings: {
						slidesToShow: 1,
					}
				},
			]
		}); 
	});
}
function productSlider(){
	$(".product-container-slider-main").each(function() {
		var _this = $(this);
			parent = _this.closest('.product-container-slider');
		_this.slick({
			accessibility: true,
			arrows: false,
			draggable: true,
			dots: false,
			touchMove: true,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			focusOnSelect: true,
			asNavFor: parent.find(".product-container-slider-add")
		}); 
	});
	$(".product-container-slider-add").each(function() {
		var _this = $(this);
			parent = _this.closest('.product-container-slider');
		_this.slick({
			accessibility: true,
			arrows: false,
			draggable: true,
			dots: false,
			touchMove: true,
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			focusOnSelect: true,
			asNavFor: parent.find(".product-container-slider-main")
		}); 
	});
}