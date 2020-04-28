$(function () {
    let tabHeight;

    $(window).on('scroll', subScrollManager);
    // 페이지 이동 시 history 변경
    window.addEventListener('popstate', function () {
        tabContents(history.state.page);
    });

    $('.tab').on('click', tabContents); //탭 클릭시 해당 article 보여줌
    function tabContents(clickTab) {
        if (event.target != window) { // 탭 클릭시 history.push, 내용변경
            clickTab = $(this).attr('value');
            $(this).addClass('active').siblings().removeClass('active'); //버튼 색상 변경
            historyManager(clickTab);
        } else {
            $('.tab').each(function (i) {
                if (clickTab == $('.tab').eq(i).attr('value')) {
                    $('.tab').eq(i).addClass('active').siblings().removeClass('active');
                }
            });
        }
        tabChange(clickTab); //tab하거나 페이지 이동 시 컨텐츠 내용 변경
    }
    function historyManager(idx) {
        history.pushState({ page: idx }, 'title', '#' + idx);
    }
    function tabChange(clickTab) {
        $('.contents').each(function (i) {
            if (clickTab == $('.contents').eq(i).data('tab')) { //tab의 value값과 contents의 data값 비교
                tabHeight = $('.contents').eq(i).height();
                $('.subContents .inner').css({
                    height: tabHeight
                });
                $('.contents').eq(i).show().siblings().hide();
            }
        });
    }
    function subScrollManager() {
        headerChange();
    }
    function headerChange() {
        if ($(this).scrollTop() != 0) {
            $('header').addClass('active');

        } else {
            $('header').removeClass('active');
        }
    }
});