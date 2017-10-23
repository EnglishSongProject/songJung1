// JavaScript Document
$(function () {
    setAudio();
    // setDictionary();
	setPopVideo();

/*	//퀴즈체크 함수
	 Text.init('05', 'quiz');*/
	//클리어 함수.
	Text.init('05', 'clear');

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


