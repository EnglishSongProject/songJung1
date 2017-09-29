$(document).ready(function () {
    imageSlide.init();

    $("#p19_btn_bochung").on("click",function() {
        $(".bo_4").fadeToggle(200);
    })
    $("#p19_btn_bochung_2").on("click",function() {
        $(".bo_5").fadeToggle(200);
    })
    $("#p19_btn_sim").on("click",function() {
        $(".sim_4").fadeToggle(200);
    })
    $("#p19_btn_sim_2").on("click",function() {
        $(".sim_5").fadeToggle(200);
    })

    $(".btn_close").on("click",function() {
        $(".bo, .sim").hide();
    })

});
