$(function () {
    let docHeight, scrollLength, windowHeight = $(window).innerHeight();

    $('header').load('header.html'); //헤더 로드
    $('footer').load('footer.html'); //푸터 로드


    $(window).on('scroll', scrollManager);
    $('.top').on('click', scrollTop); // top버튼 클릭시 scrolltop : 0

    setTimeout(function () { //html로드 후 적용
        const navClone = $('nav').html();

        mediaCheck(); //screen 크기 확인
        $(window).on('resize', mediaCheck);
        $('.menuBtn').on('click', gnbShow);
        //패밀리 사이트 클릭이벤트
        $('.familySite > a').on('click', familyClick);

        function mediaCheck() {
            const media1100 = window.matchMedia('screen and (min-width: 1100px)');
            if (media1100.matches) { //screen 1100px이상 일 때
                $('nav').html('');
                $('nav').html(navClone);
                //글로벌내비 마우스오버 시 2depth menu down                
                $('.depth1>li').on('mouseenter', depth2Down);
                $('.depth1').on('mouseleave', depth2Down);
            } else {
                $('nav').html('');
                $('nav').html(navClone);
                //글로벌내비 클릭 이벤트 : 2depth메뉴 슬라이드 토글
                $('.depth1>li').on('click', gnbClick);
            }
        }
        function depth2Down() {
            if (event.type == "mouseover") {
                $('header').addClass('active');
                $('.navLine').css({
                    left: $(this).offset().left
                }, 350);
                $('.depth2,.gnbBox').slideDown(350);
            } else {
                $('header').removeClass('active');
                $('.depth2,.gnbBox').slideUp(350);
            }
        }
        function gnbShow() {
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                $('nav').css({ transform: 'translateX(0%)' });
            } else {
                $('nav').css({ transform: 'translateX(100%)' });
            }
        }
        function gnbClick() {
            event.preventDefault();
            $(this).toggleClass('active').siblings().removeClass('active');
            if ($(this).hasClass('active')) {
                $('.depth2').slideUp();
                $(this).find($('.depth2')).slideDown();
            } else {
                $(this).find($('.depth2')).slideUp();
            }
        }
        function familyClick() {
            event.preventDefault();
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                $('.familySite ul').slideDown();
            } else {
                $('.familySite ul').slideUp();
            }
        }
    }, 300);
    function scrollManager() {
        docHeight = $(document).height();
        windowScroll = $(this).scrollTop();
        scrollLength = docHeight - windowHeight;
        contentsUp(); //서브카피 애니메이션
        contentsIn(); //비즈니스 컨텐츠 애니메이션
        topBtnShow(); //스크롤 양이 문서전체 70% 넘으면 top버튼 show
    }
    function contentsUp() {
        $('.up').each(function () {
            if ($(this).offset().top - windowHeight <= windowScroll) {
                $(this).css({
                    transform: 'translateY(0)',
                    opacity: 1
                });
            }
        });
    }
    function contentsIn() {
        $('.leftIn,.rightIn').each(function () {
            if ($(this).offset().top - windowHeight <= windowScroll) {
                $(this).css({
                    transform: 'translateX(0)',
                    opacity: 1
                });
            }
        });
    }
    function topBtnShow() {
        if (scrollLength * 0.7 <= windowScroll) {
            $('.top').show(500);
        } else {
            $('.top').hide(500);
        }
    }
    function scrollTop() {
        event.preventDefault();
        $("html").animate({
            scrollTop: 0
        }, 800);
    }
});
function resetStlyle() {
    $('.up').each(function () {
        $(this).attr('style', '');
    });
    $('.leftIn,.rightIn').each(function () {
        $(this).attr('style', '');
    });
}