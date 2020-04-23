$(function () {
    $('header').load('../header.html');
    $('footer').load('../footer.html');


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

});
