// JavaScript Document
$(document).ready(function(){
    $(".btn_trans").on("click", function(){
        $(this).parent().parent().next('.correct').toggle();
    });
    $('.img-popup-none-confirm1').on('click',function () {
        $('.img-popup-none-confirm1').toggle();
    });
    $('.btn_play').on('click',function () {
        $('.img-popup-none-confirm1').toggle();
    });
});
