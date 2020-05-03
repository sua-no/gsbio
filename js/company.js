$(function () {
    const interStart = $('.history2020').offset().top - $(window).innerHeight();
    let years = 1000,countOnce = true;

    $(window).on('scroll',countStart); // 스크롤 도착시 숫자 2020까지 커지는 함수
    function countStart(){
        if(interStart <= $(this).scrollTop()){
            if(countOnce){
                countOnce = false; // 인터벌 함수 한번만 실행
                const yearCount = setInterval(function(){
                    years += 2;
                    $('.history2020 h4').text(years);
                    if(years == 2020){
                        clearInterval(yearCount);
                    }
                },5);
            }
        }
    }
});