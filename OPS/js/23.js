
/* CSS Document */
/*$(function () {

    $('.self_check').on('click',function () {
        $('.img-popup-none-confirm1').toggle();
    });
    $('.img-popup-none-confirm1').on('click',function () {
        $('.img-popup-none-confirm1').toggle();
    });
    $('.self_check2').on('click',function () {
        $('.img-popup-none-confirm2').toggle();
    });
    $('.img-popup-none-confirm2').on('click',function () {
        $('.img-popup-none-confirm2').toggle();
    });
    $('.bochung').on('click',function () {
        $('.img-popup-none-confirm3').toggle();
    });
    $('.img-popup-none-confirm3').on('click',function () {
        $('.img-popup-none-confirm3').toggle();
    });
    $('.simhwa').on('click',function () {
        $('.img-popup-none-confirm4').toggle();
    });
    $('.img-popup-none-confirm4').on('click',function () {
        $('.img-popup-none-confirm4').toggle();
    });
});*/

$(document).ready(function () {
    imageSlide.init();

    $('#p23_text_pop_btn').on('click', function () {
       $('.p23_text_pop_txt').css('display', 'block');
    });

    var count = $('#self_check_ox_count').text();
    var selfCheckClass='self_check_ox_';
    for(var i=0; i<count;i++){
        var selfCheckParam = selfCheckClass+i;
        var clearForCheck = $('\.'+selfCheckParam);
        console.log(clearForCheck);
        $(clearForCheck).on('click', function () {
            for(var y=0; y<2;y++){
                $(clearForCheck).css('color', 'red');
            }
            $(this).css('color', 'red');
        });
    }

});
