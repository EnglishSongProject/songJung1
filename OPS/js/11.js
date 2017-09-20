$(document).ready(function () {
    imageSlide.init();

    $(".btn_tip").on("click",function(){
        $(".tip_con").toggle()
    });

    $(".rolling_thumbnail_area a").click(function(e){
        e.preventDefault();
        var $slides = $(".rolling_image_wrap > ul > li");
        var idx = $(this).index();

        $(this).addClass("on").siblings().removeClass("on");
        $slides.eq(idx).show().siblings().hide()
    })
});
