window.addEventListener('DOMContentLoaded', function () {
    let datas;
    $.ajax({
        url: "main.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            datas = data;
            slideNext();
        }
    });
    let liIdx, slide, slideNum = 1, slideTime = 1;



    //글로벌내비 2depth
    $('.depth1>li').on('mouseenter', depth2Down);
    $('.depth1').on('mouseleave', depth2Up);
    function depth2Down() {
        $('header').addClass('active');
        $('.depth2').addClass('active');
        $('.gnbBox').addClass('active');
        $('.navLine').css({
            left: $(this).offset().left
        }, 350);
    }
    function depth2Up() {
        $('header').removeClass('active');
        $('.depth2').removeClass('active');
        $('.gnbBox').removeClass('active');
    }

    //비주얼 리스트 정렬
    $('.visualSlide ul li').first().clone().appendTo($('.visualSlide ul'));
    $('.visualSlide ul li').each(function (i) {
        liIdx = $(this).index();
        $(this).css({
            left: 100 * liIdx + "%"
        });
    });

    function slideNext() {
        console.log(datas);
        slide = setTimeout(function () {
            slideAni(".5s");
            slideTime = 1;

            if (slideNum == 5) {
                slideTime = 0.000001;
                slideNum = 0;
                slideAni("0s");
            }

            slideNum++;
            slideNext();
        }, slideTime * 3000);

        function slideAni(time) {
            $('.visualSlide ul').css({
                left: -100 * slideNum + "%",
                transition: `${time}`
            });
        }

    }

    $('.pause').on('click', pause);
    function pause() {
        $(this).toggleClass('active');
        if (!$(this).hasClass('active')) {
            slideNext();
        } else {
            clearInterval(slide);

        }
    }

});