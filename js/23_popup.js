$(document).ready(function() {
    imageSlide.init();

    $(".btn_selfcheck").on("click",function() {
        $(".SelfCheck").fadeToggle(200);
    })

    $(".close_icon").on("click",function() {
        $(".SelfCheck").hide();
    })

});
