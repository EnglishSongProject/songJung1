/**
 * Created by sr01-02 on 2017-10-15.
 */
$(document).ready(function () {
	
    setAudio();
    setPopVideo();
    setShowScriptPopup();

    imageSlide.init();
    $(".btn_play").click(function(){
        imageSlide.closePopup();
    });

    $(".select_name").on("click",function(e){
        e.preventDefault();
        var idx = $(this).index();
        $(".eg > div").hide();
        $(".eg > div").eq(idx).show();
    });

    $(".btn_tip").on("click",function(){
        $(".tip_con").toggle();
    });

    $(".trans3").on("click", function(){
        $(".correct3").toggle();
    });

    
    // 롤 플레잉
    var audio_list = [
        {
            audio: "./media/audio/L01/011/L01_011_LS2_add_03_a.mp3",
            timeLine: [5.35, 8.67]
        },
        {
            audio: "./media/audio/L01/011/L01_011_LS2_add_03_b.mp3",
            timeLine: [4.42, 7.19]
        },
        {
            audio:  "./media/audio/L01/011/L01_011_LS2_add_03_c.mp3",
            timeLine: [4.00, 6.62]
        },
        {
            audio:  "./media/audio/L01/011/L01_011_LS2_add_03_d.mp3",
            timeLine: [4.12, 8.53]
        }
    ];

   role_play(audio_list)
});
