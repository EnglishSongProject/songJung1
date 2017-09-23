/**
 * Created by sr01-02 on 2017-09-19.
 */
$(document).ready(function () {
    imageSlide.init();
    $(".select_name").on("click",function(e){
        e.preventDefault();
        var idx = $(this).index();
        $(".eg > div").hide();
        $(".eg > div").eq(idx).show();
    });

    $(".btn_tip").on("click",function(){
        $(".tip_con").toggle();
    });

    $(".trans3").on("click", function(){
        $(".correct3").toggle();
    });

    $(function () {

        $('.img-popup-none-confirm1').on('click',function () {
            $('.img-popup-none-confirm1').toggle();
        });
        $('.btn_play').on('click',function () {
            $('.img-popup-none-confirm1').toggle();
        });
        $('.img-popup-none-confirm2').on('click',function () {
            $('.img-popup-none-confirm2').toggle();
        });
        $('.btn_role').on('click',function () {
            $('.img-popup-none-confirm2').toggle();
        });
    });
});