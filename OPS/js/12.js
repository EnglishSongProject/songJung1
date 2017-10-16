// JavaScript Document

$(document).ready(function(e) {

    setAudio();

    $("#btn_a_c").click(function(e) {
        $("#btn_a_tip").toggleClass("act");
    });
	$("#btn_b_c").click(function(e) {
        $("#btn_b_tip").toggleClass("act");
    });

	$(function () {
	    $("#self_check").click(function(){
	        $("#self_check_div").toggleClass("on");

	        if($("#self_check_div").hasClass("on")){
	            $("#self_check").css('left', '0');
	        }else{
	            $("#self_check").css('left', '720px');
	        }
	    });

	    $("#btn_bochung1").click(function(){
	       $("#bo_1").css("display","block");

	    });

	    $("#btn_bochung2").click(function(){
	        $("#bo_2").show();
	    });

	    $("#btn_simhwa1").click(function(){
	        $("#sim_1").css("display","block");
	    });

	    $("#btn_simhwa2").click(function(){
	        $("#sim_2").show();
	    });



	    $(".btn_pu_close").click(function(){
	       $(".popup").hide();
	    });


	})

});
