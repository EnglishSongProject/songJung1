$(document).ready(function () {
    imageSlide.init();

    $(".btn_tip").on("click",function(){
        $(".tip_con").toggle()
    });

    $(".rolling_thumbnail_area button").click(function(e){
        e.preventDefault();
        var $slides = $(".rolling_image_wrap > ul > li");
        var idx = $(this).index();

        $(this).addClass("on").siblings().removeClass("on");
        $slides.eq(idx).show().siblings().hide()
    });

    $(".trans1").on("click", function(){
        $(".correct1").toggle();
    });
    $(".trans2").on("click", function(){
        $(".correct2").toggle();
    });
    $(".trans3").on("click", function(){
        $(".correct3").toggle();
    });
    $(".trans4").on("click", function(){
        $(".correct4").toggle();
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
