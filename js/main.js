window.addEventListener('DOMContentLoaded', function () {
    const visualTxt = $('.visualTxt p');
    let datas, windowScroll, liIdx, jsonCopy1, 
    jsonCopy2, docHeight, scrollLength, faqInterval, 
    slideInterval, indiIdx,
        slideNum = 1, slideTimer = true,
        businessTop = $('.business').offset().top,
        windowHeight = $(window).innerHeight();

    init(); // 초기화 : 비주얼 슬라이드 정렬, FAQ 루프 실행

    $.ajax({ //제이슨 데이터 로드
        url: "main.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            datas = data;
            slideAni("0s"); //두번째 슬라이드(=첫번째 비주얼)부터 시작
            slideLoop(); //슬라이드 루프 함수 실행
        }
    });


    //스크롤 이벤트
    $(window).on('scroll', scrollManager);
    
    //FAQ 마우스오버 시 포즈
    $('.questionList').on('mouseenter', faqMouse);
    $('.questionList').on('mouseleave', faqMouse);
    //슬라이드 버튼 클릭 - 슬라이드 이동
    $('.next').on('click', slideClick);
    $('.prev').on('click', slideClick);
    $('.pause').on('click', pause);
    $('.indicator span').on('click', scrollMove); //인디게이터 클릭시 해당위치로 스크롤 이동
    $('.top').on('click', scrollTop);


    function init() { 
        $('.visualSlide ul li').each(function (i) {
            liIdx = $(this).index();
            $(this).css({
                left: 100 * liIdx + "%"
            });
        });
        faqLoop();
    }
    function scrollManager() {
        docHeight = $(document).height();
        windowScroll = $(this).scrollTop();
        scrollLength = docHeight - windowHeight;
        headerFixed(); // 스크롤 비주얼 아래로 내려오면 헤더 고정
        contentsUp(); //서브카피 애니메이션
        contentsIn(); //비즈니스 컨텐츠 애니메이션
        topBtnShow(); //스크롤 양이 문서전체 70% 넘으면 top버튼 show
        indiChange(); //현재 스크롤 위치에 따라 인디게이터 변경
    }
    function headerFixed() {
        if (businessTop <= windowScroll) {
            $('header').addClass('active');
            $('header').css({
                position: 'fixed'
            });
        } else {
            $('header').removeClass('active');
            $('header').css({
                position: 'absolute'
            });
        }
    }
    function contentsUp() {
        $('.up').each(function () {
            if ($(this).offset().top - windowHeight <= windowScroll) {
                $(this).css({
                    transform: 'translateY(0)',
                    opacity: 1
                });
            }
        });
    }
    function contentsIn() { 
        $('.leftIn,.rightIn').each(function () {
            if ($(this).offset().top - windowHeight <= windowScroll) {
                $(this).css({
                    transform: 'translateX(0)',
                    opacity: 1
                });
            }
        });
    }
    function topBtnShow() {
        if (scrollLength * 0.7 <= windowScroll) {
            $('.top').show(500);
        } else {
            $('.top').hide(500);
        }
    }
    function indiChange() {
        $('section').each(function (i) {
            indiIdx = i;
            if ($(this).offset().top / 1.5 < windowScroll) {
                $('.indicator span').eq(indiIdx).addClass('active').siblings().removeClass('active');
            }
        });
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
        copyInnerHtml(); //메인카피 변경 함수
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
        if ($(this).hasClass('active')) {
            clearInterval(slideInterval);
        } else {
            slideLoop();
        }
    }
    function copyInnerHtml() {
        jsonCopy1 = datas.mainCopy[slideNum].copy1;
        jsonCopy2 = datas.mainCopy[slideNum].copy2;
        visualTxt.eq(0).html(jsonCopy1);
        visualTxt.eq(1).html(jsonCopy2);
    }
    function faqMouse() { //FAQ 마우스 오버시 루프 일시정지
        if (event.type == "mouseover") {
            clearInterval(faqInterval);
        } else {
            faqLoop();
        }
    }
    function faqLoop() { //FAQ 루프 함수
        faqInterval = setInterval(faqAni, 3500);
    }
    function faqAni() { //FAQ 루프 애니메이션
        $('.questionList').animate({
            top: -100 + '%'
        }, function () {
            $('.questionList').append($('.questionList li').eq(0));
            $('.questionList').css({
                top: 0 + '%'
            });
        });
    }
    function scrollTop() {
        event.preventDefault();
        $("html").animate({ 
            scrollTop: 0
        }, 800);
    }
    function scrollMove() {
        indiIdx = $(this).index();
        sectionOffset = $('section').eq(indiIdx).offset().top;
        $("html").animate({ 
            scrollTop: sectionOffset
        }, 500);
    }


    // history.pushState({key:idx},'','all');

    // window.onpopstate = function(e){
    //     //e.state.key
    //     func(e.state.key)
    // }
});