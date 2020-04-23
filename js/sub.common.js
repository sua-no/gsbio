$(function () {
    // console.log($('.contents').eq(0).data('tab'));
    let clickTab;
    $('.tab').on('click', function () {
        clickTab = $(this).attr('value');
        $('.contents').each(function (i) {
            if (clickTab == $('.contents').eq(i).data('tab')) {
                $('.contents').eq(i).show().siblings().hide();
            }

        });
    });
    // history.pushState({key:idx},'','all');

    // window.onpopstate = function(e){
    //     //e.state.key
    //     func(e.state.key)
    // }
});