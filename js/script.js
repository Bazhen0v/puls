$(document).ready(function () {
	$(".carousel__inner").slick({
		speed: 1000,
		/*     adaptiveHeight: true, */
		prevArrow:
			'<button type="button" class="slick-prev">&#9668;</button>',
		nextArrow:
			'<button type="button" class="slick-next">&#9658;</button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					dots: true,
					arrows: false,
				},
			},
		],
	});

	$("ul.catalog__tabs").on("click", "li:not(catalog__tab_active)", function () {
		$(this)
			.addClass("catalog__tab_active")
			.siblings()
			.removeClass("catalog__tab_active")
			.closest("div.container")
			.find("div.catalog__content")
			.removeClass("catalog__content_active")
			.eq($(this).index())
			.addClass("catalog__content_active");
	});

	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on("click", function (e) {
				e.preventDefault();
				$(".catalog-item__content")
					.eq(i)
					.toggleClass("catalog-item__content_active");
				$(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
			});
		});
	}

	toggleSlide(".catalog-item__link");
	toggleSlide(".catalog-item__back");

	// Modal

	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close, #close').on('click', function () {
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	});

	function valideForms(form) {
			$(form).validate({
		rules: {
			name: "required",
			phone: "required",
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			name: "Пожалуйста, введите своё имя.",
			phone: "Пожалуйста, введите свой номер телефона.",
			email: {
				required: "Пожалуйста, введите свой адрес электронной почты.",
				email: "Ваш адрес электронной почты введёт неверно."
			}
		}
	});
};

valideForms('#consultation-form');
valideForms('#consultation form');
valideForms('#order form');

$('input[name=phone]').mask("+7 (999) 999-99-99");


/* // Спасибо за заявку окно
	$('[data-modal=thanks]').on('click', function () {
		$('.overlay, #consultation, #order').fadeOut('fast');
		$('.overlay, #thanks').fadeIn('slow');
	}); */

	$('form').submit(function(e) {
		e.preventDefault();
		if (!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");

			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1000) {
			$('.pageup').fadeIn('slow')
		} else {
			$('.pageup').fadeOut('slow')
		}
	});

	$("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
		}
	});

	new WOW().init();
});
