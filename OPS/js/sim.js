// JavaScript Document
$(document).ready(function () {


    $("#btn_bochung1").on("click",function() {
        $(".bo_1").fadeToggle(200);
    })
    $("#btn_bochung2").on("click",function() {
        $(".bo_2").fadeToggle(200);
    })
    $("#btn_bochung3").on("click",function() {
        $(".bo_3").fadeToggle(200);
    })
    $("#btn_sim1").on("click",function() {
        $(".sim_1").fadeToggle(200);
    })
    $("#btn_sim2").on("click",function() {
        $(".sim_2").fadeToggle(200);
    })
    $("#btn_sim3").on("click",function() {
        $(".sim_3").fadeToggle(200);
    })

    $(".sim .btn_close, .bo .btn_close").on("click",function() {
        $(".sim, .bo").hide();
    })
});
