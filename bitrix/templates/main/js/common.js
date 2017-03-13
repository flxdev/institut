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
			checkSimpleNavigation(currentTop);
			previousTop = currentTop;
			scrolling = false;
		}

		// function checkSimpleNavigationMobile(currentTop) {
		// 		if (previousTop - currentTop > scrollDelta) {
		// 			mainHeader.classList.remove('is-hidden');
		// 		} else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
		// 			mainHeader.classList.add('is-hidden');
		// 		}
		// }
		function checkSimpleNavigation(currentTop) {
			if (currentTop <= 110) {
				mainHeader.classList.remove('is-hidden');
			} else {
				mainHeader.classList.add('is-hidden');
			}
		}
	})();
	function MobileMenu(){

		var maintogle = $('.js-menu'),
			target = $('.page__header-mobmenu'),
			subtogle = $('.js-sub-toggle');

		subtogle.children('a').on('click',function(e){
			if($(this).parent().find('ul').length){
				e.preventDefault();
	 				$(this).parent().toggleClass('active').siblings().removeClass('active');
	 			}
		});
		maintogle.on('click',function(){
			$(this).add(target).add('body').toggleClass('open');
			subtogle.removeClass('active');
		})
	} MobileMenu();
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
	function MobileDropdown(trigger,parent,target){
		var trg = $(trigger),
			prnt = $(parent),
			trgt = $(target);
		trg.each(function(){
			$(this).on('click', function(){

				var item = prnt.find(trgt);
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
	setTimeout(function(){
		$('.doctor-slider-add-item-inner').matchHeight({
			property: 'min-height'
		});
		$('.doc-card-inner').matchHeight({
			property: 'min-height'
		});
		$('.doc-card-text .text2').matchHeight({
			property: 'min-height'
		});
		$('.partner-elem-inner').matchHeight({
			property: 'min-height'
		});
	},300)


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
	function stars(){
		var parent = $('.js-stars'),
			items = parent.find('.star-item');

		items.click(function(e) {
			$(this).closest('.input-wrapper').removeClass('has-error').addClass('has-success');
			e.preventDefault();
			num = parseInt($(this).data("num"));
			i = 1;
			for (i = 1; i <= num; i++) {
				$("#rev-star-" + i).addClass('active');
			}
			for (i = num + 1; i <= 5; i++) {
				$("#rev-star-" + i).removeClass('active');
			}
			$(".rev-hidden").val(num);

			return false;
		});
	}stars();
	$(".js-scroll-to").on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var elementClick = $(this).attr("href");
		$(".aside-stick").trigger("sticky_kit:recalc");
		if($(elementClick)){
			var destination = $(elementClick).offset().top,
				pad = window.matchMedia('(max-width: 991px)').matches ? 70 : 90;
			$("html, body:not(:animated), .out:not(:animated)").animate({scrollTop: destination - pad}, 500);
			setTimeout(function(){
				window.location.hash= elementClick;
			},400)
		}else{
			e.preventDefault();
		}
	});
	jQuery.fn.toggleText = function() {
		var altText = this.data("alt-text");

		if (altText) {
			this.data("alt-text", this.text());
			this.find('a').text(altText);

		}
	};
	function listhide(){
		var target = $('.js-slidelist');
		target.each(function(){
			var _ = $(this),
				len = _.data('items'),
				items = _.find('li'),
				itemsl = items.length,
				text = 'Свернуть'
			trigger = _.parent().find('.js-list-more');
			if(len >= itemsl){
				trigger.css('display', 'none');
			}else{
				items.slice(len).slideUp();
				initclick();
			}
			function initclick(){
				trigger.on('click', function(e){
					e.preventDefault();
					items.slice(len).fadeToggle(300);
					$(this).toggleText();
					$(".aside-stick").trigger("sticky_kit:recalc");
				});
			}
		})
	}listhide();
	function Accordeon(){
		if($('.offerlist-section').length){
			// $(".aside-stick").trigger("sticky_kit:detach");
			$(".aside-stick").stick_in_parent({
				offset_top : 73,
				recalc_every: 1
			});
			var maintrigger = $('.js-accordion-trigger'),
				body = $('.js-accordion-body'),
				truetrigger = maintrigger.children('.table-item').not('.table-status').not('.table-btn');
			maintrigger.not('.active').find(body).hide();
			truetrigger.on('click',function(event){
				var parent = $(this).parent(),
					target = parent.find(body);

				if(parent.hasClass('active')){
					parent.siblings().removeClass('active').find(body).slideUp(200);
					parent.removeClass('active').find(body).slideUp(300);

				}else{
					parent.siblings().removeClass('active').find(body).slideUp(200);
					parent.addClass('active').find(body).slideDown(300, function(){
						var pos = parent.offset().top;
						jQuery("body:not(:animated)").animate({scrollTop: pos -80}, 500);
					});
				}
				setTimeout(function(){
					$('body').trigger('scroll')
				},801)
			});
		}
	}Accordeon();
	function stars(){
		var parent = $('.js-stars'),
			items = parent.find('.star-item');

		items.click(function(e) {
			$(this).closest('.input-wrapper').removeClass('has-error').addClass('has-success');
			e.preventDefault();
			num = parseInt($(this).data("num"));
			i = 1;
			for (i = 1; i <= num; i++) {
				$("#rev-star-" + i).addClass('active');
			}
			for (i = num + 1; i <= 5; i++) {
				$("#rev-star-" + i).removeClass('active');
			}
			$(".rev-hidden").val(num);

			return false;
		});
	}stars();
	DesktopMenu();
	doctorSlider();
	rombSlider();
	partnerSlider();
	contentSlider();
	aside();
	diplomSlider();
	moreSlider();
	productSlider();
	popUpsInit();
	validateForms();
	masktel();
	initCustomSelectList();
//end of document.ready
});
//end of document.ready
function masktel(){
	var nodes = document.querySelectorAll("input[type=tel]");
	var im = new Inputmask("+7 (999) 999 99 99",{ showMaskOnHover: false});
	im.mask(nodes);
}
function initCustomSelectList() {
	var _conf = {
			initClass: 'cs-active',
			f: {}
		},
		_items = $('.js-select-custom');
	$.each(_items, function () {
		var _select = $(this),
			_button = _select.find('button'),
			placeholder = _button.data('placeholder'),
			_list = _select.find('.select-list');
		_select.on('reinit', function() {
			var _active = _list.find('input:checked');
			if(_active.length) {
				_button.children('.btn-text').addClass('active').text(''+_active.siblings('span').text()+'').parent().addClass('is-checked')
			}
			else {
				_button.children('.btn-text').removeClass('active').text(_button.data('placeholder')).parent().removeClass('is-checked');
			}
			CheckForSelect($(this).parents('form'));
		});
		_button.on('click', function() {
		   _button.parent().toggleClass('active').siblings().removeClass('active');
			return(false);
		});
		_select.on('click', 'label', function() {
		   var _label = $(this),
			   _input = _label.find('input');
			_input.prop('checked', true);
			_select.trigger('reinit');
			_button.parent().removeClass('active');
		});
		_select.trigger('reinit');
		_select.addClass(_conf.initClass);
		 $(document).on('mouseup', function (e){
			if (!_select.is(e.target)
				&& _select.has(e.target).length === 0) {
				_select.removeClass('active');
			}
		});
	});
}
function aside(){
	function stickinit(){
		setTimeout(function(){
			$(".aside-stick").stick_in_parent({
				parent: ".aside-menu",
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
		if(_this.find('.cocoen').length){
			_this.slick('slickSetOption', 'swipe', false,false);
		}
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
		var _this = $(this),
			parent = _this.parents('.more-content-wrapper'),
			arrs = parent.find('.nav-arrows'),
			count = parent.hasClass('gray') ? 2 : 3;
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			dots: false,
			touchMove: true,
			infinite: false,
			autoplay: true,
			autoplaySpeed: 4500,
			appendArrows: arrs,
			slidesToShow: count,
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
		var _this = $(this),
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
		var _this = $(this),
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

function mapinit(elem){
	var cords = $("#"+elem).data('cords');
	var myMap;
	ymaps.ready(init);

	function init () {

		myMap = new ymaps.Map(elem, {
			center: cords,
			zoom: 14,
			controls: ['zoomControl', 'fullscreenControl']
		}, {

		}),
			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
			}, {
				iconLayout: 'default#image',
				iconImageHref: 'images/myIcon.gif',
				iconImageHref: 'img/map.svg',
			// Размеры метки.
				iconImageSize:[30, 44],
				iconImageOffset: [-15, -44]
			});
		myMap.geoObjects.add(myPlacemark);
		myMap.behaviors.disable(['rightMouseButtonMagnifier','ruler','scrollZoom']);
		myMap.controls.remove('typeSelector');
		myMap.controls.remove('searchControl');
		myMap.controls.remove('GeolocationControl');
	}
}
function validateForms(){
	var form_form = $('.js-validate');
	if (form_form.length) {
		form_form.each(function () {
			var form_this = $(this);
			var parent = form_this.parent();
			$.validate({
				form : form_this,
				modules : 'security',
				borderColorOnError : true,
				scrollToTopOnError : false,
				onSuccess : function($form) {
					// ajaxSubmit(form_this);
					formResponse(form_this);
					return false;
				},
				onValidate : function($form) {
					CheckForSelect(form_this);
					checkStars(form_this);

				},
			});
		});
	}
}
function CheckForSelect(form){
	if(form.find('.select-check').length){
		var wrap = form.find('.select-check');

		wrap.each(function(){
			var _ = $(this),
				btn = _.find('.selects'),
				option = _.find('.option.has-error');
			if(option.length){
				_.addClass('error');

			}else{
				_.removeClass('error');
			}
		});
		wrap.hasClass('error') ? false : true
	}
}
function checkStars(form){
	if(form.find('.star-item').length){
		var stars = $('.js-stars');
		if(stars.hasClass('has-success')){
			return true
		}else{
			stars.addClass('has-error');
			return false
		}
	}
}

function popUpsInit() {
	var _this = this;
	_this.b = {open: $('.js-popup-button')};
	_this.c = {
		popup: $('.js-popup-container'),
		body: $('body')
	};
	_this.f = {};
	_this.conf = {
		body_class: 'modal_open',
		active_class: 'active',
		close_selector: '.closePopup',
		initial_class: 'popup-initialed'
	};
	_this.f.initModalActions = function (_popup) {
		/**
		 * Close buttons.
		 */
		$(".modal-layout .modal-container").click(function(e) {
			e.stopPropagation();
		});
		_popup.find(_this.conf.close_selector).add(_popup).off('click.popup').on('click.popup', function () {
			_this.f.closePopup(_popup);
		});
	};
	_this.f.closePopup = function (_popup) {
		var _h = parseInt(_this.c.body.css('top')),
			_res = Math.abs(_h),
			_cont = _popup.find('.modal-container:not(.response)')
		_response = _popup.find('.response');


		_popup.removeClass(_this.conf.active_class);
		_this.c.body.removeClass(_this.conf.body_class).removeAttr('style');
		$(window).scrollTop(_res);
		setTimeout(function(){
			_cont.removeAttr('style');
			_response.css('display','none');
		},500)
	};
	_this.f.openPopup = function (_popup) {
		var _h = _this.c.body.scrollTop();
		_popup.addClass(_this.conf.active_class);
		_this.c.body.addClass(_this.conf.body_class).css('top',-_h);
	};
	/**
	 * Initial.
	 */
	$.each(_this.c.popup.not('.' + _this.conf.initial_class), function () {
		var _popup = $(this);
		_this.f.initModalActions(_popup);
		_popup.off('reinit').on('reinit', function() {
			_this.f.initModalActions(_popup);
		});
		_popup.addClass(_this.conf.initial_class);
	});
	_this.b.open.off('click.popup').on('click.popup', function () {
		var _b = $(this),
			_popup = _this.c.popup.filter('[data-modal="' + _b.data('modal') + '"]');
		_this.f.openPopup(_popup);
		return false;
	});
}
// function ajaxSubmit(form){
// 	var formsubscrube = $(form).serialize(),
// 		target_block = $(form).data('block'),
// 		target_php = $(form).data('php');
// 	ajaxpostshow(target_php, formsubscrube, target_block, form);
// 	return false;
// }
function formResponse(form){
	if(form.closest('.modal-container').length){
		var cont = form.closest('.modal-container'),
			resp = cont.next('.response');
		cont.fadeOut("slow",function(){
			resp.fadeIn("slow");
		});
	}
}
// function ajaxpostshow(urlres, datares, wherecontent, form){
// 	$.ajax({
// 		type: "POST",
// 		url: urlres,
// 		data: datares,
// 		dataType: "html",
// 		//для теста
// 		error: function(fillter){
// 			validateForms();
// 		},
// 		success: function(fillter){
// 			validateForms();
// 		}
// 	});
// }