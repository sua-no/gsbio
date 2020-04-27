$(function () {
    let tabHeight;

    $(window).on('scroll', subScrollManager);
    //page tab이동시 page값 변경
    window.addEventListener('popstate', function () {
        tabContents(history.state.page);
    });

    $('.tab').on('click', tabContents); //탭 클릭시 해당 article 보여줌
    function tabContents(clickTab) {
        if (event.target != window) {
            clickTab = $(this).attr('value');
            historyManager(clickTab);
        }
        $(this).addClass('active').siblings().removeClass('active'); //버튼 색상 변경
        $('.contents').each(function (i) {
            if (clickTab == $('.contents').eq(i).data('tab')) { //tab의 value값과 contents의 data값 비교
                tabHeight = $('.contents').eq(i).height();
                $('.subContents .inner').css({
                    height: tabHeight
                });
                $('.contents').eq(i).show().siblings().hide();
            }
        });
        console.log(event.target != window);

    }
    function historyManager(idx) {
        history.pushState({ page: idx }, 'title', '#' + idx);
    }


    function subScrollManager() {
        console.log($(this).scrollTop());
        if ($(this).scrollTop() != 0) {
            $('header').addClass('active');

        } else {
            $('header').removeClass('active');


        }
    }
});