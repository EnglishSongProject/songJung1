$(document).ready(function(){
    $(".btn_trans").on("click", function(){
        $(".correct").toggle();
    });
    $('.img-popup-none-confirm1').on('click',function () {
        $('.img-popup-none-confirm1').toggle();
    });
    $('.btn_play').on('click',function () {
        $('.img-popup-none-confirm1').toggle();
    });
    $(".btn_write").on("click",function(){
        $("#a_text").toggle();
        $("#ap_aws").hide();
    });

    $(".btn_wp").on("click",function(){
        var idx = $(this).index();
        $('.wpopup').eq(idx).toggle().siblings('.wpopup').hide()
    })
});
