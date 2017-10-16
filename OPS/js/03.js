/**
 * Created by sr01-02 on 2017-10-15.
 */

$(document).ready(function () {

    setAudio();
    setPopVideo();
    setShowScriptPopup();


    imageSlide.init();
    $(".btn_play").click(function () {
        imageSlide.closePopup();
    });

    $(".select_name").on("click", function (e) {
        e.preventDefault();
        var idx = $(this).index();
        $(".eg > div").hide();
        $(".eg > div").eq(idx).show();
    });

    $(".btn_tip").on("click", function () {
        $(".tip_con").toggle();
    });

    $(".trans3").on("click", function () {
        $(".correct3").toggle();
    });

    $('.mediabtn_0').on('click', function () {
        layerAclose();
        $('.zoom_img_wrap.a').show();
        mediaInit(0);
    });

    $('.btn_media_close').on('click', function () {
        mediaClose(); //video.js
        AllOff();
        $('.zoom_img_wrap').hide();
    });
});
