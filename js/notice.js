$(function () {
    $('.faqList li').on('click',faqSlide);
    function faqSlide(){
        $(this).toggleClass('active').siblings().removeClass('active');
        if($(this).hasClass('active')){
            $(this).find('.faqContent').slideDown();
            $(this).siblings().find('.faqContent').slideUp();
        }else{
            $(this).find('.faqContent').slideUp();
        }
    }
});