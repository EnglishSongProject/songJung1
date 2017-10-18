// JavaScript Document
$(function () {
    setAudio();
    setDictionary();
	setPopVideo();
	setVideoRoles();

	$(".tabArea>li").click(function(){
		$(".tabArea>li").removeClass("on");
		$(this).addClass("on");
	});

	$(".TabBt_L,.TabBt_LA").click(function(e) {
		$(".roleplay_video").css("display","block")
	});
	$(".TabBt_G").click(function(e) {
		$(".roleplay_video").css("display","none");
		PageStop();
	});


	$('.btn_sounds').on('click', function () {
		$(this).hide();
		$('.sounds_bk').show();
	});

	$('.close_sounds_pop').on('click', function () {
		$('.sounds_bk').hide();
		$('.btn_sounds').show();
	});
	$(".trans3").on("click", function(){
        $(".correct3").toggle();
    });
});


