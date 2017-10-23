// JavaScript Document
$(document).ready(function () {


    $("#btnSupplementchung1").on("click",function() {
        $(".bo_1").fadeToggle(200);
    })
    $("#btnSupplementchung2").on("click",function() {
        $(".bo_2").fadeToggle(200);
    })
    $("#btnSupplementchung3").on("click",function() {
        $(".bo_3").fadeToggle(200);
    })
    $("#btnDeepen1").on("click",function() {
        $(".sim_1").fadeToggle(200);
    })
    $("#btnDeepen2").on("click",function() {
        $(".sim_2").fadeToggle(200);
    })
    $("#btnDeepen3").on("click",function() {
        $(".sim_3").fadeToggle(200);
    })

    $(".sim .btn_close, .bo .btn_close").on("click",function() {
        $(".sim, .bo").hide();
    })
});
