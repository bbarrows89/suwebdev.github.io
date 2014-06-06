$(document).on('ready', function() {
    // correct overscroll on anchors
    'use strict';
    $('a[data-toggle="scrollcontrol"]').on('click',function (e) {
        e.preventDefault();
        var target = this.hash;
        var targetJq = $(target);
        var scrollVal = targetJq.offset().top - 100;
        $('html, body').stop().animate({
            'scrollTop': scrollVal
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
    // scroll on page refresh/load to anchors
    if (window.location.hash) {
        var target = window.location.hash;
        var targetJq = $(target);
        var scrollVal = targetJq.offset().top - 100;
        $('html, body').stop().animate({
            'scrollTop': scrollVal
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    }

    // Handle show/hide of header
    // Technique borrowed from: https://medium.com/design-startups/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('nav').outerHeight();

    $(window).scroll(function(){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(window).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta) {
            return;
        }
        
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('nav').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('nav').removeClass('nav-up').addClass('nav-down');
            }
        }
        
        lastScrollTop = st;
    }
    
});
