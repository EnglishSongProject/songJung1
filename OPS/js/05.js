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
});

