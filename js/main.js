window.addEventListener('DOMContentLoaded', function () {
    const headerActive = $('header,.depth2,.gnbBox'),
        visualTxt = $('.visualTxt p');
    let datas, liIdx, slideNum = 1, slideTimer = true, jsonCopy1, jsonCopy2;

    init(); //초기화 함수
    //제이슨 데이터 로드
    $.ajax({
        url: "main.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            datas = data;
            slideAni("0s"); //두번째 슬라이드(=첫번째 비주얼)부터 시작
            slideLoop(); //슬라이드 루프 함수 실행
        }
    });

    function init() { // 2depth 슬라이드업, 비주얼 슬라이드 정렬
        $('.depth2,.gnbBox').slideUp();
        $('.visualSlide ul li').each(function (i) {
            liIdx = $(this).index();
            $(this).css({
                left: 100 * liIdx + "%"
            });
        });
    }
    //글로벌내비 마우스오버
    $('.depth1>li').on('mouseenter', depth2Down);
    $('.depth1').on('mouseleave', depth2Down);
    //슬라이드 버튼 클릭
    $('.next').on('click', slideClick);
    $('.prev').on('click', slideClick);
    $('.pause').on('click', pause);
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
    function slideClick() {
        if (slideTimer) { //슬라이드 이동하는 중 중복 클릭 방지
            slideTimer = false;

            clearInterval(slideInterval);
            slideManager($(this).attr('class').replace(' arrowBtn', ""));
            slideLoop();

            setTimeout(function () {
                slideTimer = true;
            }, 800);
        }
    }
    function slideLoop() { //슬라이드 루프 함수
        slideInterval = setInterval(slideManager, 5000);
    }
    function slideManager(typeName) {
        let limitNum = 0, resetNum = 0;

        if (typeName == "prev") {
            slideNum--;
            limitNum = 0;
            resetNum = 4;
        }
        else {
            slideNum++;
            limitNum = 5;
            resetNum = 1;
        }
        copyInnerHtml();
        if (slideNum == limitNum) {
            slideAni(".8s");
            setTimeout(function () {
                slideNum = resetNum;
                slideAni("0s");
            }, 800);
        }
        else {
            slideAni(".8s");
        }
    }
    function slideAni(time) { //비주얼 메인카피, 슬라이드 넘버 변경 애니메이션
        if (time == "0s") {
            $('.visualTxt').show();
        } else {
            $('.visualTxt').hide();
            $('.visualTxt').fadeIn(1000);
            if (slideNum == 0) {
                $('.visualNum').text(4);
            } else if (slideNum == 5) {
                $('.visualNum').text(1);
            } else {
                $('.visualNum').text(slideNum);
            }
        }
        $('.visualSlide ul').css({
            left: -100 * slideNum + "%",
            transition: `${time}`
        });
    }
    function pause() {
        $(this).toggleClass('active');
        if (!$(this).hasClass('active')) {
            slideLoop();
        } else {
            clearInterval(slideInterval);
        }
    }
    function copyInnerHtml() { //메인카피 변경 함수
        jsonCopy1 = datas.mainCopy[slideNum].copy1;
        jsonCopy2 = datas.mainCopy[slideNum].copy2;
        visualTxt.eq(0).html(jsonCopy1);
        visualTxt.eq(1).html(jsonCopy2);
    }

});