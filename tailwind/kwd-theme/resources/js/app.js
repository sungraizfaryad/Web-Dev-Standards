(function ($) {


    let isVisible = false; // Keep track of banner visibility
    let priceBanner = $('.price-static-banner');

    window.addEventListener('scroll', function () {
        // Check the scroll position from the top
        if (window.scrollY > 200) {
            if (!isVisible) {
                // Slide down if not visible
                priceBanner.stop(true, true).slideDown();
                isVisible = true;
            }
        } else {
            if (isVisible) {
                // Slide up if already visible and scroll position is less than 200
                priceBanner.stop(true, true).slideUp();
                isVisible = false;
            }
        }
    });

    // Add a class to the main-site-header when the page is scrolled
    if ($(window).width() > 768) {
        window.addEventListener('scroll', function () {
            if (!$('body').hasClass('page-template-landing-page')) {
                // Check if the page has been scrolled 130px from the top
                if (window.scrollY >= $('.main-site-header').outerHeight()) {
                    const mainSiteHeader = $('.main-site-header');
                    mainSiteHeader.css('position', 'fixed');
                    mainSiteHeader.css('top', 0);
                    $('body.admin-bar').find(mainSiteHeader).css('top', '32px');

                    $('.main-site-header #menu-header-menu').css('padding-top', '0px');
                    $('.main-site-header .desktop-logo').css('display', 'none');
                    $('.main-site-header .mobile-logo').css('display', 'block');
                } else {
                    $('.main-site-header, .main-site-header #menu-header-menu').removeAttr('style');
                    $('.main-site-header .desktop-logo,.main-site-header .mobile-logo').removeAttr('style');
                }
            }
        });
    }

    // function resizeMapForImage(image) {
    //     let mapId = image.getAttribute('usemap').substring(1);
    //     let mapAreas = document.querySelectorAll('map[name="' + mapId + '"] area');
    //     if (mapAreas.length > 0) {
    //         let width = image.naturalWidth;  // Original width of the image
    //         let height = image.naturalHeight; // Original height of the image
    //         mapAreas.forEach(function (area) {
    //             let coords = area.getAttribute('coords').split(',');
    //             for (let i = 0; i < coords.length; i++) {
    //                 if (i % 2 === 0) { // Even index = x coordinate
    //                     coords[i] = coords[i] / width * image.clientWidth;
    //                 } else { // Odd index = y coordinate
    //                     coords[i] = coords[i] / height * image.clientHeight;
    //                 }
    //             }
    //             area.setAttribute('coords', coords.join(','));
    //         });
    //     }
    // }
    //
    // function resizeAllMaps() {
    //     let images = document.querySelectorAll('.use-map-res-image');
    //     images.forEach(function (image) {
    //         let heroSection = image.closest('.hero-section-wrapper-inner');
    //         if (heroSection && !heroSection.classList.contains('slick-cloned')) {
    //             resizeMapForImage(image);
    //         }
    //     });
    // }
    //
    // window.addEventListener('resize', resizeAllMaps);
    // window.addEventListener('load', resizeAllMaps);

    //if (jQuery().AOS) {
    AOS.init({
        delay: 0,
        duration: 500,
        once: true,
    });
    //}
    window.addEventListener('load', AOS.refresh);
    const windowWidth = $(window).width();

    $('.course-list a:not(.list-close)').on('click', function (e) {
        e.preventDefault();
        $('#course-contents-wrap > div').stop(true, true).slideUp();
        $($(this).attr('href')).stop(true, true).slideDown();
        if (windowWidth < 768) {
            $('.course-list-section').stop(true, true).slideUp();
        }
    });

    $('.next-course-link').on('click', function (e) {
        e.preventDefault();
        $('#course-contents-wrap > div').stop(true, true).slideUp();
        $($(this).attr('href')).stop(true, true).slideDown();
    });

    $('.about-lesson-wrapper > a').on('click', function (e) {
        e.preventDefault();
        $('.about-lesson-wrapper > div').stop(true, true).slideUp();
        $($(this).attr('href')).stop(true, true).slideDown();

        if ($(this).hasClass('review-link')) {

            $('.testimonials-section').slick('unslick');

            $('.testimonials-section').slick({
                slidesToShow: 2,
                slidesToScroll: 2,
                //arrows: false,
                autoplay: true,
                autoplaySpeed: 2000,
                // adaptiveHeight: true,
                prevArrow: '<button type="button" class="slick-prev ag-btn-small"><span class="dashicons dashicons-arrow-left-alt2"></span></button>',
                nextArrow: '<button type="button" class="slick-next ag-btn-small"><span class="dashicons dashicons-arrow-right-alt2"></span></button>',
                responsive: [
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        }
    });

    $('.site-menu-wrap .display-site-menu').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('dashicons-no');
        $(this).siblings('.show-site-menu').stop(true, true).slideToggle();
    });

    // Function to stop all audio elements on the page
    function stopAllAudioVideo() {
        $('audio, video').each(function () {
            if (!$(this).hasClass('autoplay')) {
                this.pause();
            }
        });

        // For iframes with MediaDelivery playerjs
        $('iframe').each(function () {
            const iframe = $(this);

            // Create a player object using playerjs
            const player = new playerjs.Player(iframe[0]);

            // Once the player is ready, check if the video is playing
            player.on('ready', () => {
                player.getPaused(paused => {
                    if (!paused) { // If the video is playing
                        player.pause(); // Pause the video
                    }
                });
            });
        });
    }

    $('a,button').on('click', function (e) {
        // e.preventDefault();
        stopAllAudioVideo();
    });

    $('.quiz .dashicons-controls-volumeon').on('click', function (e) {
        e.preventDefault();
        // Stop all currently playing audio
        stopAllAudioVideo();
        $(this).closest('.quiz').find('.quiz-audio').get(0).play();
    });

    $('.audio-img-wrap .dashicons-controls-volumeon').on('click', function (e) {
        e.preventDefault();
        stopAllAudioVideo();
        $(this).closest('.audio-img-wrap').find('audio').get(0).play();
    });

    $(".student-lesson-wrapper a.title:not('.next-student-lesson')").on('click', function (e) {
        e.preventDefault();

        let $this = $(this);
        let $wrapper = $this.closest('.student-lesson-wrapper');
        let $targetDiv = $wrapper.find($this.attr('href'));

        // If the clicked link is already active, remove the class and slide up the div
        if ($this.hasClass('active')) {
            $this.removeClass('active');
            $targetDiv.stop(true, true).slideUp();
        } else {
            // Remove the active class from all links and add it to the clicked link
            $wrapper.find('a.title').removeClass('active');
            $this.addClass('active');

            // Slide up all divs and slide down the target div
            $wrapper.find('.lesson-details > div:not(".flex")').stop(true, true).slideUp();
            $targetDiv.stop(true, true).slideDown();
        }
    });


    $('.CorrectAlphabetsOrder span.active, .AlphabetOrder span.active').on('click', function (e) {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            let currVal = $(this).text();
            let newAlphaVal = $(this).closest('.quiz').find('.input-fill-check input').val();
            let currOrder = $(this).text();
            let newOrderVal = $(this).closest('.quiz').find('.answer-compare').val();
            $(this).closest('.quiz').find('.input-fill-check input').attr('value', newAlphaVal + $.trim(currVal));
            if ('' === newOrderVal) {
                $(this).closest('.quiz').find('.answer-compare').attr('value', $.trim(newOrderVal) + $.trim(currOrder));
            } else {
                $(this).closest('.quiz').find('.answer-compare').attr('value', $.trim(newOrderVal) + $.trim(currOrder));
            }

        }
    });

    $('.quiz .input-fill-check span').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.quiz').find('.options-wrap span').addClass('active');
        $(this).closest('.quiz').find('.input-fill-check input').attr('value', '');
        $(this).closest('.quiz').find('.answer-compare').attr('value', '');
    });

    $('.quiz .input-fill-check .space-btn').on('click', function (e) {
        e.preventDefault();
        let newAlphaVal = $(this).closest('.quiz').find('.input-fill-check input').val();
        $(this).closest('.quiz').find('.input-fill-check input').attr('value', newAlphaVal + ' ');
    });

    let quizCourse = $('#quizzes-section .quiz');
    quizCourse.find('.options-wrap').slideUp();

    quizCourse.on('click', '.quiz-title', function (e) {
        e.preventDefault();
        quizCourse.find('.options-wrap').stop(true, true).slideUp();
        $(this).siblings('.options-wrap').stop(true, true).slideDown();
    });

    function compareOrderAnswer() {
        $('body').find('.quiz-submitted .answer-compare').each(function (index, value) {
            let stdAns = $(value).data('stu-answer');
            let correctAns = $(value).data('correct-answer');
            if ('' !== stdAns) {
                $('<p>Correct is:' + correctAns + '</p>').insertAfter($(value));
                $('<p>Your Answer is:' + stdAns + '</p>').insertAfter($(value));
            }
        });
    }

    compareOrderAnswer();
    $('#quiz-submit-btn').on('click', function (e) {
        let quizzesAnswers = {};
        let checkBoxVal = [];
        e.preventDefault();
        let that = $(this);
        let currText = that.text();
        $(this).closest('#quizzes-section').find('.quiz').each(function (index, value) {
            let quizId = $(value).data('quiz-id');
            let quizVal = '';
            let selectedEle = $(value).find('.options-wrap');
            if (selectedEle.hasClass('TrueFalseType') || selectedEle.hasClass('TextRadioType') || selectedEle.hasClass('AudioType')) {
                quizVal = $(value).find('.options-wrap').find('input:checked').val();
                if ('' !== quizVal) {
                    quizzesAnswers[quizId] = quizVal;
                }

            } else if (selectedEle.hasClass('CorrectAlphabetsOrder')) {
                quizVal = $(value).find('.answer-compare').val();
                if ('' !== quizVal) {
                    quizzesAnswers[quizId] = quizVal;
                }
            } else {
                selectedEle.find('input:checked').each(function (index2, value2) {
                    checkBoxVal.push($(value2).val());
                });
                if (checkBoxVal.length > 0) {
                    quizzesAnswers[quizId] = checkBoxVal;
                }
            }
        });


        $.ajax({
            url: localizeStrings.ajax_url,
            type: 'POST',
            data: {
                action: 'ag_student_quizzes_updates',
                lesson_id: that.data('lesson-id'),
                student_id: that.data('student-id'),
                quizzes: quizzesAnswers,
            },
            beforeSend: function () {
                $('body').find('#quiz-error-response').remove();
                that.text('Submitting Quiz...');
            },
            success: function (response) {
                if (response.success) {
                    $('<p id="quiz-success-response">' + response.data.message + '</p>').insertAfter(that);
                    that.remove();
                    $('#quizzes-section').addClass('quiz-submitted');
                    $('body').find('.quiz-submitted .options-wrap').slideDown();
                    compareOrderAnswer();
                } else {
                    that.text(currText);
                    $('<p id="quiz-error-response">' + response.data.message + '</p>').insertAfter(that);
                }
            },
            error: function (xhr, status, error) {
                that.text(currText);
                $('<p id="quiz-error-response">' + xhr.responseJSON.message + '</p>').insertAfter(that);
            }
        });
    });

    $('.call-student-data').on('click', function (e) {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
        let studentId = $(this).data('student-id');
        let offset = 0;
        if (studentId) {
            $.ajax({
                url: localizeStrings.ajax_url,
                type: 'POST',
                data: {
                    action: 'ag_get_student_audios_by_id',
                    student_id: studentId,
                    offset: offset,
                },
                beforeSend: function () {
                    $('#students-data').html('<p class="p-10 text-3xl font-bold">Loading</p>');
                },
                success: function (response) {
                    $('#students-data').html(response);
                    $('body').find('#load-more-audio').attr('data-offset', offset + 10);
                },
                error: function (xhr, status, error) {
                    $('#students-data').append('<p id="student-error-response">' + xhr.responseJSON.message + '</p>');
                }
            });
        }
    });

    $('body').on('click', '#load-more-audio', function (e) {
        e.preventDefault();
        let $button = $(this);
        let studentId = $button.data('student-id');
        let offset = parseInt($('body').find('#load-more-audio').attr('data-offset'));

        if (studentId) {
            $.ajax({
                url: localizeStrings.ajax_url,
                type: 'POST',
                data: {
                    action: 'ag_get_student_audios_by_id',
                    student_id: studentId,
                    offset: offset,
                },
                beforeSend: function () {
                    $button.html('Loading....');
                },
                success: function (response) {
                    $(response).insertBefore($button);

                    $('body').find('#load-more-audio').attr('data-offset', offset + 10);
                    $button.text('Load More');
                },
                error: function (xhr, status, error) {
                    $button.before('<p id="student-error-response">' + xhr.responseJSON.message + '</p>');
                    $button.text('Load More');
                }
            });
        }
    });


    $('body').on('click', '.stu-con-quiz-filter button', function () {

        $(this).siblings('button').removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('student-audios')) {
            $('.student-quiz-inner').addClass('hidden');
            $('.student-details-inner').removeClass('hidden');
        } else {
            $('.student-quiz-inner').removeClass('hidden');
            $('.student-details-inner').addClass('hidden');
        }
    });

    let hwTitle = $('#home-work-section .home-work-title');
    hwTitle.siblings('div').slideUp();
    hwTitle.on('click', function (e) {
        e.preventDefault();

        let $this = $(this);
        let $siblingsDiv = $this.siblings('div');

        // Check if the clicked title is already active
        if ($siblingsDiv.is(':visible')) {
            $this.find('span').removeClass('dashicons-arrow-right-alt2');
            $siblingsDiv.stop(true, true).slideUp();
        } else {
            hwTitle.find('span').removeClass('dashicons-arrow-right-alt2');
            $this.find('span').toggleClass('dashicons-arrow-right-alt2');

            hwTitle.siblings('div').stop(true, true).slideUp();
            $siblingsDiv.stop(true, true).slideDown();

            if ($this.next('div').hasClass('video-main-wrapper')) {
                $('.video-main-wrapper .inner-wrapper').slick('refresh');
            }
        }
    });


    $('.next-student-lesson').on('click', function (e) {
        e.preventDefault();
        let that = $(this);
        let currText = that.text();

        $.ajax({
            url: localizeStrings.ajax_url,
            type: 'POST',
            data: {
                action: 'ag_next_student_lesson',
                lesson_id: that.data('lesson-id'),
                student_id: that.data('student-id'),
            },
            beforeSend: function () {
                $('body').find('#course-error-response').remove();
                that.text('Loading Next Lesson...');
            },
            success: function (response) {
                if (response.success) {
                    location.reload();
                } else {
                    that.text(currText);
                    $('<p id="course-error-response">' + response.data.message + '</p>').insertAfter(that);
                }
            },
            error: function (xhr, status, error) {
                that.text(currText);
                $('<p id="course-error-response">' + xhr.responseJSON.message + '</p>').insertAfter(that);
            }
        });
    });

    $('body').on('click', '#audio-player-wraper .close', function (e) {
        stopAllAudioVideo();
        $(this).closest('#audio-player-wraper').hide();
        $(this).closest('.azan-guru-audio-record').find('#agSendButton').hide();

    });

    setTimeout(_ => {
        const elem = document.createElement('script');
        elem.src = localizeStrings.ag_tmp_dir + '/js/lite-yt-embed.js';
        document.head.append(elem);
    }, 2000);

    $('body').on('click', '.pre-recorded-ans .pre-record-audio', function (e) {
        e.preventDefault();
        let parentClass = $(this).closest('.pre-recorded-ans');
        $(this).siblings('.pre-record-audio').removeClass('selected');
        $(this).addClass('selected');
        parentClass.find('.send-pre-rec-btn').show();
    });


    $('body').on('click', '.send-pre-rec-btn', function (e) {
        e.preventDefault();
        let parentClass = $(this).closest('.azan-guru-audio-record');
        let preRecAudioId = $(parentClass).find('.pre-record-audio.selected').attr('data-pre-rec-audio-id');
        let repliedAudioId = $(parentClass).find('.feedback').attr('data-replied-id');
        let allowRecordAgain = $(parentClass).find('.allow-record-again.active').attr('data-home-work-id');
        let dontAllowRecordAgain = '';
        if (allowRecordAgain === undefined) {
            dontAllowRecordAgain = $(parentClass).find('.allow-record-again').attr('data-home-work-id');
            allowRecordAgain = '';
            if (dontAllowRecordAgain === undefined) {
                dontAllowRecordAgain = '';
            }
        }

        $.ajax({
            url: localizeStrings.ajax_url,
            type: 'post',
            data: {
                action: 'ag_send_pre_record_audio',
                pre_rec_audio_id: preRecAudioId,
                replied_audio_id: repliedAudioId,
                allow_record_again: allowRecordAgain,
                dont_allow_record_again: dontAllowRecordAgain,
            },
            beforeSend: function () {
                $(this).text('Sending');
            },
            success: function (response) {
                if (response.success) {
                    const audioUrl = response.audio_url;
                    const audioTime = response.audio_time;
                    const picUrl = response.pic_url;
                    $(parentClass).find(".audio-rec-msg").text('Your Audio Sent Successfully!');
                    $('<div class="student-audio-wrap"><div class="audio-inner-wrap"><audio class="w-full inline-block clear-both" controls><source src="' + audioUrl + '"></audio><div class="audio-inner-right flex items-center gap-4"><time class="audio-time">' + audioTime + '</time><img alt="Student Pic" class="rounded-full w-12" src="' + picUrl + '"></div></div></div>').insertBefore($(parentClass));
                    $(this).text('Reply');
                    parentClass.find('.send-pre-rec-btn').hide();
                    $(parentClass).find('.pre-record-audio').removeClass('selected');
                } else {
                    const errorMessage = response.message;
                    // Handle an error message
                    $(parentClass).find(".audio-rec-msg").text("Error:" + errorMessage);
                    $(this).text('Reply');
                    parentClass.find('.send-pre-rec-btn').hide();
                }
            },
            error: function (xhr, status, error) {
                $(parentClass).find(".audio-rec-msg").text("AJAX Error::" + status + error);
                $(this).text('Reply');
                parentClass.find('.send-pre-rec-btn').hide();
            }
        });
    });


    if (jQuery().slick) {
        $('.hero-section-wrapper').slick({
            autoplay: true,
            prevArrow: '<button type="button" class="slick-prev ag-btn-small"><span class="dashicons dashicons-arrow-left-alt2"></span></button>',
            nextArrow: '<button type="button" class="slick-next ag-btn-small"><span class="dashicons dashicons-arrow-right-alt2"></span></button>',
            autoplaySpeed: 3000,
            // adaptiveHeight: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
        $('.news-images').slick({
            autoplay: true,
            prevArrow: '<button type="button" class="slick-prev ag-btn-small"><span class="dashicons dashicons-arrow-left-alt2"></span></button>',
            nextArrow: '<button type="button" class="slick-next ag-btn-small"><span class="dashicons dashicons-arrow-right-alt2"></span></button>',
            autoplaySpeed: 0,
            speed: 3000,
            cssEase: 'linear',
            infinite: true,
            pauseOnHover: true,
            slidesToShow: 5,
            slide: 'img',
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,

                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                }
            ]
        });

        $('.home-our-features-inner').slick({
            vertical: true,
            // autoplay: true,
            prevArrow: '<button type="button" class="slick-prev ag-btn-small"><span class="dashicons dashicons-arrow-left-alt2"></span></button>',
            nextArrow: '<button type="button" class="slick-next ag-btn-small"><span class="dashicons dashicons-arrow-right-alt2"></span></button>',
            autoplaySpeed: 3000,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 3000,
                    settings: 'unslick'
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        arrows: true,
                        dots: false
                    }
                }
            ]
        });
        $('.landing-testimonials-wrapper .container').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
            autoplay: true,
            dots: true,
            autoplaySpeed: 4000,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });

        $('.reviews-section .inner,.instant-whatsapp-support .inner-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            // arrows: false,
            autoplay: true,
            autoplaySpeed: 3000,
            adaptiveHeight: true,
            lazyLoad: 'ondemand',
            prevArrow: '<button type="button" class="slick-prev ag-btn-small"><span class="dashicons dashicons-arrow-left-alt2"></span></button>',
            nextArrow: '<button type="button" class="slick-next ag-btn-small"><span class="dashicons dashicons-arrow-right-alt2"></span></button>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });


        $('.audio-img-wrapper').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2000,
        });

        $('.video-main-wrapper .inner-wrapper').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: false,
            dots: true,
        });

        $('.testimonials-section').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            //adaptiveHeight: true,
            prevArrow: '<button type="button" class="slick-prev ag-btn-small"><span class="dashicons dashicons-arrow-left-alt2"></span></button>',
            nextArrow: '<button type="button" class="slick-next ag-btn-small"><span class="dashicons dashicons-arrow-right-alt2"></span></button>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
        $('.user-ratings .team-inner').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            prevArrow: '<button type="button" class="slick-prev ag-btn-small"><span class="dashicons dashicons-arrow-left-alt2"></span></button>',
            nextArrow: '<button type="button" class="slick-next ag-btn-small"><span class="dashicons dashicons-arrow-right-alt2"></span></button>',

            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        autoplaySpeed: 2000,
                        vertical: true,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        arrows: true,
                        dots: false
                    }
                },
            ]
        });
        $('.our-team-wrapper:not(.user-ratings) .team-inner').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            //  arrows: false,
            autoplay: true,
            autoplaySpeed: 2000,
            //adaptiveHeight: true,
            prevArrow: '<button type="button" class="slick-prev ag-btn-small"><span class="dashicons dashicons-arrow-left-alt2"></span></button>',
            nextArrow: '<button type="button" class="slick-next ag-btn-small"><span class="dashicons dashicons-arrow-right-alt2"></span></button>',

            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    }

    // FancyBox
    document.addEventListener('DOMContentLoaded', function () {
        if (typeof Fancybox !== 'undefined') {
            Fancybox.bind('[data-fancybox]', {});
            document.querySelectorAll('.pricing-popup').forEach(function (element) {
                element.addEventListener('click', function (el) {
                    el.preventDefault();

                    // Get the href attribute value
                    const hrefText = element.getAttribute('href');

                    // Show the Fancybox popup
                    Fancybox.show([{src: '#site-pricing-section', type: 'inline'}]);
                    const fancybox = Fancybox.getInstance();
                    // Access the node inside the popup and append the text
                    fancybox.on('done', function (fancybox) {
                        const popupContent = fancybox.carousel.pages[0].slides[0].el;
                        const linkNodes = popupContent.querySelectorAll('a.ag-btn-small');
                        linkNodes.forEach(function (linkNode) {
                            let $href = linkNode.getAttribute('href');
                            linkNode.setAttribute('href', $href + hrefText);
                        });
                    });
                });
            });
            document.querySelectorAll('.subscription-popup').forEach(function (element) {
                element.addEventListener('click', function (el) {
                    el.preventDefault();
                    Fancybox.show([
                        {
                            src: '#site-subscription-section',
                            type: 'inline'
                        }
                    ]);
                });
            });
        }
        $('#account_password').val($('#billing_phone').val());
    });

    let mediaRecorder;
    let audioChunks = [];
    let audioBlob = [];
    let isRecording = false;

    $('body').on('click', '.azan-guru-audio-record #recordButton', function (e) {
        e.preventDefault();
        let thisParent = $(this).closest('.azan-guru-audio-record');
        startRecording(thisParent);
    });
    $('body').on('click', '.azan-guru-audio-record #stopButton', function (e) {
        e.preventDefault();
        let thisParent2 = $(this).closest('.azan-guru-audio-record');
        stopRecording(thisParent2);
    });

    $('body').on('click', '.azan-guru-audio-record #agSendButton', function (e) {
        e.preventDefault();
        let thisParent3 = $(this).closest('.azan-guru-audio-record');
        agSendRecording(thisParent3);
    });

    const startRecording = async (that) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({audio: true, audioCapture: true});
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                audioBlob = new Blob(audioChunks, {type: "audio/webm;codecs=opus"});
                const audioUrl = URL.createObjectURL(audioBlob);

                $(that).find("#recordButton").text("Record Again");
                $(that).find("#stopButton").css("display", "none");
                $(that).find("#agSendButton").css("display", "inline-block");
                $(that).find("#audio-player-wraper").css("display", "inline-block");
                $(that).find("#audioPlayer").attr("src", audioUrl);

                audioChunks = [];
            });

            mediaRecorder.start();
            isRecording = true;

            $(that).find("#recordButton").text("Recording...");
            $(that).find("#stopButton").css("display", "inline-block");
            $(that).find("#agSendButton").css("display", "none");
            $(that).find("#audio-player-wraper").css("display", "none");
        } catch (error) {
            alert("Error accessing microphone and audioCapture:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            isRecording = false;
        }
    };

    const agSendRecording = (that) => {

        // Get the current date and time
        let currentDate = new Date();

        // Create a timestamp string with milliseconds
        let timestamp = currentDate.getFullYear() +
            ('0' + (currentDate.getMonth() + 1)).slice(-2) +
            ('0' + currentDate.getDate()).slice(-2) +
            ('0' + currentDate.getHours()).slice(-2) +
            ('0' + currentDate.getMinutes()).slice(-2) +
            ('0' + currentDate.getSeconds()).slice(-2) +
            ('00' + currentDate.getMilliseconds()).slice(-3);
        let allowRecordAgain = $(that).find('.allow-record-again.active').attr('data-home-work-id');
        let dontAllowRecordAgain = '';
        if (allowRecordAgain === undefined) {
            dontAllowRecordAgain = $(that).find('.allow-record-again').attr('data-home-work-id');
            allowRecordAgain = '';
            if (dontAllowRecordAgain === undefined) {
                dontAllowRecordAgain = '';
            }
        }

        let formData = new FormData();
        formData.append("action", "ag_upload_audio");
        formData.append("file_description", $(that).find(".feedback").val());
        formData.append("student_timestamp", timestamp);
        formData.append("homework_id", $(that).find(".feedback").attr('data-homework-id'));
        formData.append("replied_audio_id", $(that).find(".feedback").attr('data-replied-id'));
        formData.append("allow_record_again", allowRecordAgain);
        formData.append("dont_allow_record_again", dontAllowRecordAgain);
        formData.append("audio", audioBlob, "audio" + timestamp + ".webm");
        $.ajax({
            url: localizeStrings.ajax_url,
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $(that).find("#agSendButton").text("Sending");
            },
            success: function (response) {
                if (response.success) {
                    const audioUrl = response.audio_url;
                    const audioTime = response.audio_time;
                    const picUrl = response.pic_url;
                    // Perform further actions with the audio URL and user ID
                    $(that).find("#agSendButton").hide();
                    $(that).find("#agSendButton").text("Send");
                    $(that).find("#audio-player-wraper").hide();
                    $(that).find(".feedback").val('');
                    $(that).find(".audio-rec-msg").removeClass('text-red-600');
                    $(that).find(".audio-rec-msg").text('Your Audio Sent Successfully!');
                    $('<div class="student-audio-wrap"><div class="audio-inner-wrap"><audio class="w-full inline-block clear-both" controls><source src="' + audioUrl + '"></audio><div class="audio-inner-right flex items-center gap-4"><time class="audio-time">' + audioTime + '</time><img alt="Student Pic" class="rounded-full w-12" src="' + picUrl + '"></div></div></div>').insertBefore($(that));
                } else {
                    const errorMessage = response.message;
                    // Handle an error message
                    $(that).find(".audio-rec-msg").text("Error:" + errorMessage);
                }
            },
            error: function (xhr, status, error) {
                $(that).find(".audio-rec-msg").text("AJAX Error::" + status + error);
            }
        });
    };

    $('.student-audio-wrap button').on('click', function (e) {
        e.preventDefault();
        let audioID = $(this).data('audio-id-reply');
        $(this).closest('.azan-guru-audio-record').find('.feedback').attr('data-replied-id', audioID);
    });

    $('body').on('click', '.student-audio-wrap a.del-student-audio', function (e) {
        e.preventDefault();

        let thisParent = $(this).closest('.student-audio-wrap');
        let audioId = $(this).attr('data-audio-id');

        if (confirm('Are you sure you want to delete this audio file?')) {
            $.ajax({
                url: localizeStrings.ajax_url,
                type: 'POST',
                data: {
                    action: 'ag_delete_audio_file',
                    audio_id: audioId
                },
                success: function (response) {
                    // Check if the server returned a success response
                    if (response.success) {
                        alert(response.data.message);
                        $(thisParent).slideUp("slow", function () {
                            $(thisParent).remove();
                        });

                    } else {
                        // If the request failed, show the error message returned from the server
                        alert('Error: ' + response.data.message);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // Provide more specific feedback if the AJAX request itself fails
                    alert('An error occurred while deleting the audio file. Please try again.');
                    console.error('AJAX error:', textStatus, errorThrown); // Log the error for debugging
                }
            });
        }
    });


    $('body').on('click', '#students-data .allow-record-again', function (e) {
        $(this).toggleClass('active');
    });

    $('body').on('click', '#students-data .reply-to-audio-btn', function (e) {
        e.preventDefault();
        stopAllAudioVideo();
        $('.audio-player-wraper').hide();
        $('.audio-cancel-btn').hide();
        $('.reply-to-audio-btn').show();
        $('.audio-rec-msg').empty();
        $('#recordButton').text('Record');
        let audioID = $(this).data('audio-id-reply');
        let audioReplyDiv = $('.azan-guru-audio-record');
        let thisParent = $(this).closest('.student-audio-wrap');
        $(this).closest('#students-data').find('.feedback').attr('data-replied-id', audioID);
        audioReplyDiv.appendTo(thisParent);
        audioReplyDiv.css('display', 'flow-root');
        $(this).hide();
        $(this).next().show();
    });

    $('body').on('click', '#students-data .audio-cancel-btn', function (e) {
        e.preventDefault();
        let audioReplyDiv = $('.azan-guru-audio-record');
        let thisParent = $(this).closest('.student-details-inner');
        $(this).closest('#students-data').find('.feedback').attr('data-replied-id', '');
        audioReplyDiv.appendTo(thisParent);
        audioReplyDiv.css('display', 'none');
        $(this).hide();
        $(this).prev().show();
    });

    $('.questions-wrapper .question:first-of-type').slideDown();

    $('.questions-wrapper .options-wrap > span').on('click', function () {
        if ($(this).hasClass('order-item')) {
            let answerCompare = $(this).closest('.question').find('.answer-compare');
            let ansCompareCorrectVal = answerCompare.val();
            let ansCompareInputVal = answerCompare.data('correct-answer');
            let nextField = $(this).closest('.question').find('.next-field');
            let inputVal = $(this).closest('.question').find('.incorrect-next').val();
            nextField.attr('data-next-question', inputVal);
            $(this).closest('.question').find('.next-field').slideDown();
            if (ansCompareCorrectVal === ansCompareInputVal) {
                inputVal = $(this).closest('.question').find('.correct-next').val();
                nextField.attr('data-next-question', inputVal);
            }

        } else {
            let inputVal = $(this).find('input').val();
            $(this).closest('.question').find('span.radio,span.audio').removeClass('selected');
            $(this).closest('.question').find('input').prop('checked', false);
            $(this).addClass('selected');
            $(this).find('input').prop('checked', true);
            $(this).closest('.question').find('.next-field').slideDown();
            $(this).closest('.question').find('.next-field').attr('data-next-question', inputVal);
        }
    });

    $('.questions-wrapper .next-field').on('click', function () {
        $('.questions-for-course h4.head-info').slideUp();
        let valNow = $(this).data('next-question');
        let attrName = $(this).closest('.question').find('span.selected input').attr('data-courses-list');
        if (typeof attrName !== 'undefined' && attrName !== false) {
            let arrayLessons = attrName.split(',');
            $.each(arrayLessons, function (index, value) {
                $('.questions-wrapper input.' + value).each(function (index2, value2) {
                    $(value2).attr('value', value);
                });
            });
        }
        $(this).closest('.question').slideUp();
        if (valNow.indexOf('course-id-') !== -1) {
            $('.questions-for-course h4.head-info').slideUp();
            $('.congratulation').slideDown('slow', courseChooseProgress);
            $('.questions-for-course .' + valNow).removeClass('hidden');
        } else {
            $('.questions-for-course .' + valNow).slideDown('slow', courseChooseProgress);
        }
    });

    function courseChooseProgress() {
        const hiddenQuestions = document.querySelectorAll('.questions-wrapper .question[style*="display: none"]');
        const question = document.querySelector('.questions-wrapper .question[style*="display: block"]');
        if (hiddenQuestions && question) {
            let currentQuiz = hiddenQuestions.length / 12 * 100;
            $('.questions-for-course .quiz-progress .progress').animate({
                width: currentQuiz + '%'
            }, 1000);
        } else {
            $('.questions-for-course .quiz-progress .progress').animate({
                width: '100%'
            }, 1000);
        }
    }


    document.addEventListener("DOMContentLoaded", (event) => {
        if ($('body').hasClass('page-template-teachers-page')) {
            $('.students-list .call-student-data:first-of-type').trigger('click');
        }
    });


    if (windowWidth < 768) {

        $('#show-course-list').on('click', function () {
            $('.course-list-section').stop(true, true).slideDown();
        });

        $('.course-list .list-close').on('click', function (e) {
            e.preventDefault();
            $('.course-list-section').stop(true, true).slideUp();
        });

        $('.students-list .list-title').on('click', function (e) {
            $('.students-list .call-student-data').css('display', 'grid');
        });
        $('.students-list .call-student-data').on('click', function (e) {
            $('.students-list .call-student-data').stop(true, true).slideUp();
        });
    }

    $('.landing-courses-section button').on('click', function () {
        const $this = $(this);
        let showCourse = $(this).attr('data-show-course');
        const $parent = $this.closest('.landing-courses-section');
        $parent.find('button').removeClass('active');
        $parent.find('.kids-course,.adults-course').addClass('hidden');
        $this.addClass('active');
        $(showCourse).removeClass('hidden');
    });

    $('.single-qa h3').on('click', function () {
        $(this).closest('.landing-qa-wrapper').find('.qa-contents').addClass('hidden');
        $(this).next().removeClass('hidden');
    });
    $('.student-user-nav a').on('click', function (e) {
        if (!$(this).closest('li').hasClass('redirect-to-link')) {
            e.preventDefault();
        }

        $('.student-user-nav li').removeClass('active');
        $(this).closest('li').addClass('active');
        $('#students-info > div').addClass('hidden');
        $($(this).attr('href')).removeClass('hidden');
    });

    // window.addEventListener('load', (event) => {
    //     if (windowWidth < 768) {
    //         $('.intro-video.first .intro-play-vid').trigger('click');
    //         setTimeout(() => {
    //             $('body').find('.intro-video.first iframe').trigger('click');
    //         }, '3000');
    //     }
    // });


    // Set initial time to 20 minutes
    var timeLeft = 20 * 60;

    // Update the timer every second
    var timerInterval = setInterval(function () {
        // Calculate minutes and seconds
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;

        // Add leading zero if needed
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // Display the time in the elements with class 'mints' and 'seconds'
        $('.timer .mints').text(minutes + ' Min');
        $('.timer .seconds').text(seconds + ' Sec');

        // Decrement timeLeft
        timeLeft--;

        // If countdown reaches zero, clear the interval
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            // Optionally, you can perform any action when the countdown reaches zero
            $('.timer .mints').text('00 Min'); // Update minutes to show 00 Min when it reaches zero
            $('.timer .seconds').text('00 Sec'); // Update seconds to show 00 Sec when it reaches zero
            //alert('Countdown has finished!');
        }
    }, 1000); // Update every 1 second (1000 milliseconds)

    $('a.scroll-to-link').click(function (e) {
        e.preventDefault(); // prevent default anchor behavior

        var targetId = $(this).attr('href'); // get the target ID from href attribute
        var $target = $(targetId); // find the target element by ID

        // check if the target element exists
        if ($target.length) {
            // scroll to the target element
            $('html, body').animate({
                scrollTop: $target.offset().top
            }, 1000);
        }
    });

    document.addEventListener('DOMContentLoaded', (event) => {
        const mediaElements = document.querySelectorAll('audio, video');
        const stopMediaElements = document.querySelectorAll('a');

        function stopAllMedia() {
            mediaElements.forEach(media => {
                if (!media.classList.contains('autoplay')) {
                    media.pause();
                    // Optionally reset the media to the beginning if needed
                    // media.currentTime = 0;
                }
                // Optionally reset the media to the beginning if needed
                // media.currentTime = 0;
            });
        }

        // Add event listeners to anchor links to stop media on click
        stopMediaElements.forEach(link => {
            link.addEventListener('click', stopAllMedia);
        });

        // Add event listeners to media elements to stop all other media on play
        mediaElements.forEach(media => {
            media.addEventListener('play', () => {
                mediaElements.forEach(otherMedia => {
                    if (otherMedia !== media && !otherMedia.classList.contains('autoplay')) {
                        otherMedia.pause();
                    }
                });
            });
        });
        let studentProgress = $('.student-progress').data('student-progress');
        $('.student-progress .progress').animate({
            width: studentProgress + '%'
        }, 1000);

        const agAdvForm = document.querySelector('.ag-adv-search-filter'); // Target the form with the correct selector

        agAdvForm.addEventListener('submit', function (event) {
            const inputs = agAdvForm.querySelectorAll("input, select, textarea"); // Target form elements within agAdvForm

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.disabled = true; // Temporarily disable empty inputs
                }
            });

            // Re-enable inputs after submission to allow further edits if needed
            setTimeout(() => {
                inputs.forEach(input => input.disabled = false);
            }, 500);
        });
    });

    if ($('body').hasClass('woocommerce-checkout')) {
        // Listen for keyup events on the #billing_phone input
        $('#billing_phone').on('keyup', function () {
            // Get the value of #billing_phone input
            var phoneNumber = $(this).val();
            // Set the value of #account_password input to the phone number
            $('#account_password').val(phoneNumber);
        });
    }

    $('.woocommerce-form-login input[type="password"]').each(function () {
        let $passwordField = $(this);
        let $toggleButton = $('<span class="dashicons dashicons-visibility absolute right-2 top-7 z-30 !text-2xl cursor-pointer"></span>');

        $passwordField.after($toggleButton);
        $passwordField.closest('.woocommerce-form-row').css('position', 'relative');

        $toggleButton.on('click', function () {
            if ($passwordField.attr('type') === 'password') {
                $passwordField.attr('type', 'text');
                $toggleButton.removeClass('dashicons-visibility');
                $toggleButton.addClass('dashicons-hidden');
            } else {
                $passwordField.attr('type', 'password');
                $toggleButton.removeClass('dashicons-hidden');
                $toggleButton.addClass('dashicons-visibility');
            }
        });
    });

    $('.course-list-section .course-list a').on('click', function (e) {
        e.preventDefault();
        let $this = $(this);
        let $target = $($this.attr('href'));
        $target.siblings('div').slideUp();
        $target.slideDown();
    });

    if ($('body').hasClass('page-template-download-app')) {
        let ua = navigator.userAgent.toLowerCase();
        let isAndroid = ua.indexOf("android") > -1; // android check
        let isIphone = ua.indexOf("iphone") > -1; // ios check

        if (isIphone) {
            let app = {
                launchApp: function () {
                    setTimeout(function () {
                        window.location.href = "https://apps.apple.com/app/azanguru-the-learning-app/id6476610276";
                    }, 25);
                    window.location.href = "azanguru://download-app"; // which page to open (now from mobile, check its authorization)
                },
                openWebApp: function () {
                    window.location.href = "https://apps.apple.com/app/azanguru-the-learning-app/id6476610276";
                }
            };
            app.launchApp();
        } else if (isAndroid) {
            let app = {
                launchApp: function () {
                    window.location.replace("azanguru://download-app"); // which page to open (now from mobile, check its authorization)
                    setTimeout(this.openWebApp, 500);
                },
                openWebApp: function () {
                    window.location.href = "https://play.google.com/store/apps/details?id=com.azanguru.learners";
                }
            };
            app.launchApp();
        }
    }
    document.getElementById('print-student-certificate').addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default link behavior
        window.print(); // Trigger the print dialog
    });

})(jQuery)
