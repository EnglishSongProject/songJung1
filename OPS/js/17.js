$(document).ready(function(){
    $(".btntrans_1").on("click", function(){
        $(".transfer_t").toggle();
    });
	$(".btntrans_2").on("click", function(){
        $(".transfer_b").toggle();
    });
	$(".btn_wd").on("click", function(){
        $(".txt01").toggle();
    });
	$(".btn_repeat").on("click", function(){
        $(".txt02").toggle();
    });
	$(".btn_answer").on("click", function(){
        $(".a_text").toggle();
    });
});