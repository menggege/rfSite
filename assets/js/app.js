var App = function() {

    function handleIEFixes() {
        //fix html5 placeholder attribute for ie7 & ie8
        if (jQuery.browser.msie && jQuery.browser.version.substr(0, 1) < 9) { // ie7&ie8
            jQuery('input[placeholder], textarea[placeholder]').each(function() {
                var input = jQuery(this);

                jQuery(input).val(input.attr('placeholder'));

                jQuery(input).focus(function() {
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });

                jQuery(input).blur(function() {
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        input.val(input.attr('placeholder'));
                    }
                });
            });
        }
    }

    function handleBootstrap() {
        jQuery('.carousel').carousel({
            interval: 15000,
            pause: 'hover'
        });
        jQuery('.tooltips').tooltip();
        jQuery('.popovers').popover();
    }

    function handleMisc() {
        jQuery('.top').click(function() {
            jQuery('html,body').animate({
                scrollTop: jQuery('body').offset().top
            }, 'slow');
        }); //move to top navigator
    }

    function handleSearch() {
        jQuery('.search').click(function() {
            if (jQuery('.search-btn').hasClass('icon-search')) {
                jQuery('.search-open').fadeIn(500);
                jQuery('.search-btn').removeClass('icon-search');
                jQuery('.search-btn').addClass('icon-remove');
            } else {
                jQuery('.search-open').fadeOut(500);
                jQuery('.search-btn').addClass('icon-search');
                jQuery('.search-btn').removeClass('icon-remove');
            }
        });
        $('div.search-open button:submit').on('click', function() {
            var word = $('div.search-open input:text').val();
            if (word) {
                if (location.pathname == '/newslist.html') {
                    $('#txtKeyword').val(word)
                    $("#btnSearch").click();
                } else {
                    location.href = 'newslist.html?keyword=' + word;
                }
            }
            return false;
        });
    }

    function handleSwitcher() {
        var panel = $('.style-switcher');

        $('.style-switcher-btn').click(function() {
            $('.style-switcher').show();
        });

        $('.theme-close').click(function() {
            $('.style-switcher').hide();
        });

        $('li', panel).click(function() {
            var color = $(this).attr("data-style");
            var data_header = $(this).attr("data-header");
            setColor(color, data_header);
            $('.unstyled li', panel).removeClass("theme-active");
            $(this).addClass("theme-active");
        });

        var setColor = function(color, data_header) {
            $('#style_color').attr("href", "assets/css/themes/" + color + ".css");
            if (data_header == 'light') {
                $('#style_color-header-1').attr("href", "assets/css/themes/headers/header1-" + color + ".css");
                $('#logo-header').attr("src", "assets/img/logo1-" + color + ".png");
                $('#logo-footer').attr("src", "assets/img/logo2-" + color + ".png");
            } else if (data_header == 'dark') {
                $('#style_color-header-2').attr("href", "assets/css/themes/headers/header2-" + color + ".css");
                $('#logo-header').attr("src", "assets/img/logo2-" + color + ".png");
                $('#logo-footer').attr("src", "assets/img/logo2-" + color + ".png");
            }
        }
    }

    var browser = {
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                google: u.indexOf('Chrome') > -1
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    // 绩效红手机端替换成手机域名 临时解决方案
    if (browser.versions.mobile) {
        $("a[href='http://www.jxh01.com']").attr('href', 'http://m.jxh01.com');
    }

    return {
        init: function() {
            handleBootstrap();
            handleIEFixes();
            handleMisc();
            handleSearch();
            handleSwitcher();
        },

        initSliders: function() {
            $('#clients-flexslider').flexslider({
                animation: "slide",
                easing: "swing",
                animationLoop: true,
                itemWidth: 1,
                itemMargin: 1,
                minItems: 2,
                maxItems: 9,
                controlNav: false,
                directionNav: false,
                move: 2
            });

            $('#photo-flexslider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                itemWidth: 80,
                itemMargin: 0
            });

            $('#testimonal_carousel').collapse({
                toggle: false
            });
        },

        initFancybox: function() {
            jQuery(".fancybox-button").fancybox({
                groupAttr: 'data-rel',
                prevEffect: 'none',
                nextEffect: 'none',
                closeBtn: true,
                helpers: {
                    title: {
                        type: 'inside'
                    }
                }
            });
        },

        initBxSlider: function() {
            $('.bxslider').bxSlider({
                minSlides: 3,
                maxSlides: 3,
                slideWidth: 360,
                slideMargin: 10
            });
        },

        initBxSlider1: function() {
            $('.bxslider').bxSlider({
                minSlides: 4,
                maxSlides: 4,
                slideWidth: 360,
                slideMargin: 10
            });
        },

        browser: browser
    };
}();
