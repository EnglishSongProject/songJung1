/**
 * Created by sr01-02 on 2017-10-15.
 */

$(document).ready(function () {

    setAudio();
    setPopVideo();
    setShowScriptPopup();


    imageSlide.init();
    $(".btnMoviePlay").click(function () {
        imageSlide.closePopup();
    });

    $(".select_name").on("click", function (e) {
        e.preventDefault();
        var idx = $(this).index();
        $(".eg > div").hide();
        $(".eg > div").eq(idx).show();
    });

   
    $(".trans3").on("click", function () {
        $(".correct3").toggle();
    });

    $('.btn_media_close').on('click', function () {
        mediaClose(); //video.js
        AllOff();
        $('.zoom_img_wrap').hide();
    });


    // 롤 플레잉
    var audio_list = [
        {
            audio: "./media/audio/L01/010/L01_010_LS1_add_03_a.mp3",
            timeLine: [2.69]
        },
        {
            audio: "./media/audio/L01/010/L01_010_LS1_add_03_b.mp3",
            timeLine: [2.55]
        },
        {
            audio:  "./media/audio/L01/010/L01_010_LS1_add_03_c.mp3",
            timeLine: [2.80]
        },
        {
            audio:  "./media/audio/L01/010/L01_010_LS1_add_03_d.mp3",
            timeLine: [2.20]
        }
    ];
    role_play(audio_list)
});
