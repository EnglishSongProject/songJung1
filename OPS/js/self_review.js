$(document).ready(function () {
    imageSlide.init();

    $(".btn_selfcheck").on("click",function() {
        $(".popup_self_review").fadeToggle(200);
    })

    $(".popup_self_review .btn_close").on("click",function() {
        $(".popup_self_review").hide();
    })
});
