$(function () {
    $('header').load('../header.html');
    $('footer').load('../footer.html');

    setTimeout(function () {
        //글로벌내비 마우스오버 시 2depth menu
        $('.depth1>li').on('mouseenter', depth2Down);
        $('.depth1').on('mouseleave', depth2Down);
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
    }, 500);

});
