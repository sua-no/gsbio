$(function () {
    let clickTab,tabHeight;

    //page tab이동시 page값 변경
    window.addEventListener('popstate', function () {
      // historyManager(history.state.page);
    });
    $('.tab').on('click', tabContents); //탭 클릭시 해당 article 보여줌
    function tabContents(){
        clickTab = $(this).attr('value');
        $('.contents').each(function (i) {
            if (clickTab == $('.contents').eq(i).data('tab')) { //tab의 value값과 contents의 data값 비교
                tabHeight =  $('.contents').eq(i).height();
                $('.subContents .inner').css({
                    height : tabHeight
                });
                $('.contents').eq(i).show().siblings().hide();
                historyManager(idx);
            }
        });
    }
    function historyManager(idx){
        history.pushState({page : idx},'title', 'company.html');
    }
    
});