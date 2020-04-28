$(function () {
    let tabHeight, searches;


    locations(); //서브 페이지로 들어왔을 때 location값 string으로 받아오는 함수
    // 페이지 이동 시 history 변경
    window.addEventListener('popstate', function () {
        tabContents(history.state.page);
    });
    $(window).on('scroll', subScrollManager);
    $('.tab').on('click', tabContents); //탭 클릭시 해당 article 보여줌


    function locations() {
        searches = location.search.substring(1);
        historyManager(searches);
        tabChange(searches);
        tabBtnChange(searches);
    }
    function tabContents(clickTab) {
        if (event.target == window) { // 탭 클릭시 history.push, 내용변경
            tabBtnChange(clickTab);
        } else {
            clickTab = $(this).attr('value');
            $(this).addClass('active').siblings().removeClass('active'); //버튼 색상 변경
            historyManager(clickTab);
        }
        tabChange(clickTab); //tab하거나 페이지 이동 시 컨텐츠 내용 변경
        resetStlyle();//스크롤 애니메이션 초기화
    }
    function historyManager(idx) {
        history.pushState({ page: idx }, 'title', '?' + idx);
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

    function tabBtnChange(pageName) {
        $('.tab').each(function (i) {
            if (pageName == $('.tab').eq(i).attr('value')) {
                $('.tab').eq(i).addClass('active').siblings().removeClass('active');
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