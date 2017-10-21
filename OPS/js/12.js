// JavaScript Document

$(document).ready(function(e) {
    setAudio();
    //textDrag p12_droppable, p12_draggable
    setTextDrag('p12');

    $("#btn_a_c").click(function(e) {
        $("#btn_a_tip").toggleClass("act");
    });
	$("#btn_b_c").click(function(e) {
        $("#btn_b_tip").toggleClass("act");
    });

    var $currentPopup = null;

    $("#btn_bochung1").click(function(){
        openPopup($("#bo_1"));
    });

    $("#btn_bochung2").click(function(){
        openPopup($("#bo_2"));
    });

    $("#btn_simhwa1").click(function(){
        openPopup($("#sim_1"));
    });

    $("#btn_simhwa2").click(function(){
        openPopup($("#sim_2"));
    });

    $(".btn_pu_close").on('click',function(){
        if($currentPopup){
            closePopup($currentPopup)
        }
    });

    function openPopup($Item){
        if($currentPopup){
            $currentPopup.hide();
        }
        $Item.show();
        $currentPopup = $Item;
    }

    function closePopup($Item){
        $Item.hide();
        $Item = null;
    }
});
