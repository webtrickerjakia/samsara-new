(function ($) {
    $(function () {

        $(window).on('load resize', function () {
            var totalHeight = $('#scroll-container').outerHeight()

            var footerHeight = 0
            if ($(window).width() > 767) {
                var footerHeight = $('.main-footer-section').outerHeight()
            }
            $('body').css('height', totalHeight + footerHeight);
        })


        var $animation_elements = $('.js-text-visibility');
        var $window = $(window);

        function check_if_in_view() {
            var window_height = $window.height() / 1.1;
            var insetAmount = window_height / 10 // fifth of the screen
            var window_top_position = $window.scrollTop();
            var window_bottom_position = (window_top_position + window_height) - insetAmount;

            $.each($animation_elements, function () {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);

                //check to see if this current container is within viewport
                if (element_top_position <= window_bottom_position) {
                    $element.addClass('is-visible');

                }
            });
        }
        $window.on('scroll orientationchange resize', check_if_in_view);
        $window.trigger('scroll');
        /*        if ($('.package-component-wrap').length) {
                    $('.package-component-wrap').slick({
                        autoplay: false,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: true,
                        dots:false,
                        infinite: true,
                        responsive: [
                            {
                                breakpoint: 769,
                                settings: {
                                    slidesToShow: 1,
                                }
                            }
                        ]
                    })
                
                    $(window).on('resize', function () {
                        $('.package-component-wrap').slick('resize');
                    });
                }*/


        if ($('.exceptional-guidance-content-wrap').length) {
            $('.exceptional-guidance-content-wrap').slick({
                autoplay: true,
                speed: 800,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                infinite: true,
                fade: true,
                asNavFor: '.exceptional-guidance-thumb-wrap'
            })

            $(window).on('resize', function () {
                $('.exceptional-guidance-content-wrap').slick('resize');
            });
        }

        if ($('.exceptional-guidance-thumb-wrap').length) {
            $('.exceptional-guidance-thumb-wrap').slick({
                autoplay: true,
                speed: 800,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                infinite: true,
                fade: true,
                asNavFor: '.exceptional-guidance-content-wrap',
            })

            $(window).on('resize', function () {
                $('.exceptional-guidance-thumb-wrap').slick('resize');
            });
        }


        //ticking machine
        var percentTime;
        var tick;
        var time = .1;
        var progressBarIndex = 0;

        $('.progressBarContainer .progressBar').each(function (index) {
            var progress = "<div class='inProgress inProgress" + index + "'></div>";
            $(this).html(progress);
        });

        function startProgressbar() {
            resetProgressbar();
            percentTime = 0;
            tick = setInterval(interval, 10);
        }

        function interval() {
            if (($('.exceptional-guidance-content-wrap .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
                progressBarIndex = $('.exceptional-guidance-content-wrap .slick-track div[aria-hidden="false"]').data("slickIndex");
                startProgressbar();
            } else {
                percentTime += 1 / (time + 2);
                $('.inProgress' + progressBarIndex).css({
                    width: percentTime + "%"
                });
                if (percentTime >= 100) {
                    $('.exceptional-guidance-content-wrap').slick('slickNext');
                    progressBarIndex++;
                    if (progressBarIndex > 2) {
                        progressBarIndex = 0;
                    }
                    startProgressbar();
                }
            }
        }

        function resetProgressbar() {
            $('.inProgress').css({
                width: 0 + '%'
            });
            clearInterval(tick);
        }
        startProgressbar();
        // End ticking machine

        $('.item').click(function () {
            clearInterval(tick);
            var goToThisIndex = $(this).find("span").data("slickIndex");
            $('.exceptional-guidance-content-wrap').slick('slickGoTo', goToThisIndex, false);
            startProgressbar();
        });


        $(".private-services-accordion-item").each(function () {
            var $this = $(this);
            $this.find(" > h5").on("click touch", function () {
                $(".private-services-accordion-item").removeClass("active")
                $(".private-services-accordion-item .private-services-accordion-item-content").slideUp();
                if ($this.find(".private-services-accordion-item-content:visible").length) {
                    $(".private-services-accordion-item").removeClass("active")
                    $(".private-services-accordion-item .private-services-accordion-item").slideUp();
                } else {
                    $this.addClass("active")
                    $(".private-services-accordion-item .private-services-accordion-item-content").slideUp();
                    $this.find(" > .private-services-accordion-item-content").slideDown();
                }
            })
        })


        if ($(".swiper-slider-one").length) {
            var swiper = new Swiper(".swiper-slider-one.mySwiper", {
                slidesPerView: 2.468,
                spaceBetween: 40,
                speed: 1100,
                effect: "slide",
                loop: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    280: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    480: {
                        slidesPerView: 1.1895,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2.2,
                        spaceBetween: 28,
                    },
                    980: {
                        slidesPerView: 2.2,
                        spaceBetween: 28,
                    },
                    1280: {
                        slidesPerView: 2.468,
                        spaceBetween: 32,
                    }
                },
            })

        }
        if ($(".swiper-slider-two").length) {
            var swiper = new Swiper(".swiper-slider-two.mySwiper", {
                slidesPerView: 2.468,
                spaceBetween: 40,
                speed: 1100,
                effect: "slide",
                loop: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    280: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    480: {
                        slidesPerView: 1.1895,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2.2,
                        spaceBetween: 28,
                    },
                    980: {
                        slidesPerView: 2.2,
                        spaceBetween: 28,
                    },
                    1280: {
                        slidesPerView: 2.468,
                        spaceBetween: 32,
                    }
                },
            })

        }

        $(window).on('load', function () {
            $('.parallax-image-wrap').each(function () {
                var $this = $(this);
                var offsetTop = $this.offset().top;
                var offsetTopWHeight = offsetTop - $(window).outerHeight();
                var offsetTopHeight = offsetTop + $this.outerHeight();
                var parallaxClass = $this.find('.item-thumb')
                $(window).on('scroll', function () {
                    var scrollY = $(this).scrollTop();
                    var parallaxMoves = scrollY - offsetTopWHeight
                    var parallaxMovesTotal = parallaxMoves / 20

                    if (scrollY > offsetTopWHeight && scrollY < offsetTopHeight) {
                        parallaxClass.css("transform", `translateY(${parallaxMovesTotal}px)`);

                    } else {}
                })
            })
        })


        // reservations page
        if ($("select.styled-select").length) {
            $("select.styled-select").selectric({});
        }

        // Experience
        $('.menubar').click(function () {
            var replcText = $(this).find('span').attr('data')
            var showedText = $(this).find('span').text()
            console.log(replcText, showedText)
            $(this).find('span').attr('data', showedText)
            $(this).find('span').text(replcText)
            $('body').toggleClass('navShown')

        })

        if ($('.cape-wrap').length) {

            var btnDistance = $('.new-discoveries-wrap').offset().top;
            var totalHeight = $('#scroll-container').outerHeight() - $(window).outerHeight();
            $(window).on('scroll', function () {
                var scrollY = $(this).scrollTop();
                if (scrollY > btnDistance != scrollY > totalHeight) {
                    $('.cape-wrap').fadeIn();
                } else {
                    $('.cape-wrap').fadeOut();
                }

            })
        }


        $(window).on('load resize', function () {
            var totalHeight = $('#scroll-container').outerHeight()
            var footerHeight = $('.main-footer-section').outerHeight()
            $('body').css('height', (totalHeight + footerHeight) + "!important");
            console.log(totalHeight + footerHeight)
        })



        var header = new Headroom(document.querySelector('header'), {
            tolarence: 80,
            offset: 155,
            classes: {

                initial: 'headroom',
                pinned: 'slidedown',
                unpinned: 'slideup'
            }
        });
        header.init();

        //Animate heading
        if ($('.split-heading').length) {
            var res = Splitting({
                target: '.split-heading',
                by: 'lines',
            });

            Splitting();

            res.forEach((splitResult) => {
                const wrappedLines = splitResult.lines.map((wordsArr) => `
            <span class="line"><span class="mask-up">
            ${wordsArr.map((word) => `${word.outerHTML}<span class="whitespace">
            </span>`).join('')}
            </span></span>`).join('');
                splitResult.el.innerHTML = wrappedLines;
            });
        }



        // Start About JS
        $(".scroll-to-bottom").click(function() {
            $('html,body').animate({                                                          //  fine in moz, still quicker in chrome. 
                scrollTop: $(".about-guidelines-wrap").offset().top},
                'slow');
        });

        //    End About JS

    }) // End ready function.

        
    



})(jQuery)