// JavaScript Document
$(function () {
    setAudio();
    setDictionary();
	setPopVideo();

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

	//롤플레이
	$('#role_1, #role_2, #role_3').on('click',function () {
		//뮤트온
		if (!$(this).hasClass('on')) {
			$(this).addClass('on');
			//뮤트 오프
		} else {
			$(this).removeClass('on');
		}
		setRoles();
	});

	$('.btn_sounds').on('click', function () {
		$(this).hide();
		$('.sounds_bk').show();
	});

	$('.close_sounds_pop').on('click', function () {
		$('.sounds_bk').hide();
		$('.btn_sounds').show();
	});
});


