
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

    //OX 리스트 갯수 받아옴
    var count = $('#self_check_ox_count').text();
    //radio 형식 구현하여 click 이벤트에 바운딩
    var selfCheckClass='tf_';
    for(var i=0; i<count;i++){
        var selfCheckParam = selfCheckClass+i;
        var clearForCheck = $('\.'+selfCheckParam);

        var y=0;
        for(y;y<clearForCheck.length;y++){
            $(clearForCheck[y]).on('click', function () {
                for(var z=0; z<2;z++){
                    $('\.'+this.classList[2]).removeClass('on');
                }
                $(this).addClass('on');
            });
        }
    }

    //OX 체크 제거 함수
    $('#true_false_wrap').on('click', function () {
       var trueFalseList = $('.btn_true_false');
        for(i=0; i<trueFalseList.length; i++){
            $(trueFalseList[i]).removeClass('on');
        }
    });

});
