$(function () {
    $('header').load('../header.html');
    $('footer').load('../footer.html');

    setTimeout(function () {
        $('.depth2,.gnbBox').slideUp();
        $('.familySite ul').slideUp(); 

        //글로벌내비 마우스오버 시 2depth menu down
        $('.depth1>li').on('mouseenter', depth2Down);
        $('.depth1').on('mouseleave', depth2Down);
        //패밀리 사이트 클릭이벤트
        $('.familySite > a').on('click', familyClick);
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
