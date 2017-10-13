$(document).ready(function(){
	"use strict";
    $(".btn_trans").on("click", function(){
        $(this).parent().parent().next('.correct').toggle();
        console.log('a')
    });
	// $(".btn_wd").on("click", function(){
    //     $(".txt01").toggle();
    // });
	// $(".btn_repeat").on("click", function(){
    //     $(".txt02").toggle();
    // });
	// $(".btn_answer").on("click", function(){
    //     $(".a_text").toggle();
    // });

function openPopup(popupId){
    $("#"+popupId).show();
    function initEvent(){
        $(".popup .btn_repeat").on('click',function(){
            var $this = $(this).parent();
            $this.find("textarea").val("");
        });
        $(".popup .btn_close").on('click',function(){
            var $this = $(this).parent();
            $this.hide();
        });
    }
    initEvent();
}


});