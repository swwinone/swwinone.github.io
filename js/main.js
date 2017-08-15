$(function() {
    $window = $(window);
    var $header = $('header');
    (function() {
        // 搜索框动画
        var bMark = true;
        $('.searchtext').blur(function(e) {
            e.stopPropagation();
            $(this).val('');
            $header.css('top', '-120px');
            bMark = !bMark;
        });
        $('.contact .icon-sousuo').click(function() {
            bMark ? $header.css('top', '0') : $header.css('top', '-120px');
            bMark = !bMark;
        });
        $('form .icon-chuyidong').click(function() {
            $header.css('top', '-120px');
            bMark = !bMark;
        });
    })();
    // $('body').animate({
    //     scrollTop: 0
    // }, 0);
    // 显示导航菜单
    (function() {
        var $nav = $('nav');
        var $menu = $('ul.menu > li');
        var bMark = true;
        if ($(this).width() < 850) {
            $('a.icon-caidan').click(function(e) {
                e.stopPropagation();
                if (bMark) {
                    $nav.css({
                        'opacity': '1',
                        'transform': 'translateX(0)'
                    });
                } else {
                    $nav.css({
                        'opacity': '0',
                        'transform': 'translateX(100%)'
                    });
                }
                bMark = !bMark;
            });
            // 手机导航判断有ul子元素禁止a跳转
            $menu.each(function() {
                if ($(this).children('ul').length >= 1) {
                    $(this).children('li > a').attr('href', 'javascript:;')
                }
            });
            // 菜单打开与闭合
            $menu.click(function(e) {
                e.stopPropagation();
                $(this).children('ul').slideToggle().parent().siblings().children('ul').slideUp();
            });
        }
    })();
    // 手机端无缝滚动
    (function() {
        var i = 1;
        var timer = null;
        var $bannerBox = $('.roll-banner');
        var $bannerLi = $('li', $bannerBox);
        var $btn = $('.plugin-banner-btn');
        var $li_btn;
        var x, _x;
        $bannerLi.css('width', $bannerBox.parent().width()).parent().css('left', -$bannerLi.width());
        // 复制第一张到最后一张后面
        $bannerLi.eq($bannerLi.length - 1).after($bannerLi.eq(0).clone());
        // 复制最后一张图片到第一张前面
        $bannerLi.eq(0).before($bannerLi.eq($bannerLi.length - 1).clone());
        $bannerLi = $('li', $bannerBox);
        var $bannerLength = $('li', $bannerBox).length;
        // 给图片ul计算宽度
        $bannerBox.css('width', $bannerLength * $bannerLi.width() + 'px');
        for (var j = 0; j < $bannerLength - 2; j++) {
            $btn.append('<li></li>')
        }
        $li_btn = $('li', $btn);
        $li_btn.eq(0).addClass('on');
        $btn.css('margin-left', $btn.width() / -2);
        // 窗口改变大小给图片重新计算宽度
        $window.resize(function() {
            $bannerLi.css('width', $bannerBox.parent().width())
                .parent().css('left', -$bannerLi.width());
            $bannerBox.css('width', $bannerLength * $bannerLi.width() + 'px');
        });
        // 小圆点切换
        $li_btn.click(function() {
            if (!$bannerBox.is(':animated')) {
                i = $(this).index() + 1;
                cut($bannerBox, $(this), 1000);
            }
        });
        $('.mobile-banner').on('touchstart', function(e) {
                x = e.originalEvent.touches[0].pageX;
            })
            .on('touchmove', function(e) {
                e.preventDefault();
                _x = e.originalEvent.touches[0].pageX;
            })
            .on('touchend', function() {
                var differ = x - _x > 0 ? 1 : 0;
                if (differ) {
                    if (!$bannerBox.is(':animated')) {
                        i++;
                        if (i > $bannerLength - 1) {
                            i = 2;
                            $bannerBox.css('left', -$bannerLi.width());
                        } else if (i > $bannerLength - 2) {
                            $li_btn.eq(0).addClass('on').siblings().removeClass('on');
                        }
                        cut($bannerBox, $li_btn.eq(i - 1), 1000);
                    }
                } else {
                    if (!$bannerBox.is(':animated')) {
                        i--;
                        if (i < 0) {
                            i = $bannerLength - 3;
                            $bannerBox.css('left', ($bannerLength - 2) * -$bannerLi.width());
                        }
                        cut($bannerBox, $li_btn.eq(i - 1), 1000);
                    }
                }
            });

        function cut(obj_box, obj_btn, time) {
            obj_btn.addClass('on').siblings().removeClass('on');
            obj_box.animate({
                'left': i * -$bannerLi.width() + 'px'
            }, time);
        }
    })();
    (function() {
        // 返回顶部动画
        var $scroll;
        var $backTop = $('div.icon-xiaohuojian');
        $window.on('scroll', function() {
            var $this = $(this);
            $scroll = $(this).scrollTop();
            if ($scroll > 300) {
                $header.addClass('on');
                $('ul.sub-menu', $header).addClass('bg');
                $backTop.css('right', '30px');
            } else if ($scroll < 300) {
                $header.removeClass('on');
                $('ul.sub-menu', $header).removeClass('bg');
                $backTop.css('right', '-50px');
            }
        });
        $backTop.click(function() {
            $('html,body').animate({
                scrollTop: 0
            }, 800);
        });
    })();
    // 滚动显示
    (function() {
        var windowH = $window.height(),
            scrollT = $window.scrollTop();
        $window.resize(function() {
            windowH = $window.height();
        });
        $window.scroll(function() {
            scrollT = $window.scrollTop();
            $('.main article , .right article').each(function() {
                if (($(this).offset().top - scrollT) < (windowH - $(this).height() / 2)) {
                    $(this).addClass('on');
                }
            });
        });
        $('.main article , .right article').each(function() {
            if (($(this).offset().top - scrollT) < (windowH - $(this).height() / 2)) {
                $(this).addClass('on');
            }
        });
    })();
});