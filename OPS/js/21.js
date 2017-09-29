$(document).ready(function () {
    imageSlide.init();

    $('#p21_text_pop_btn').on('click', function () {
       $('.p21_text_pop_txt').css('display', 'block');
    });
	   
	$('.close_icon').on('click', function () {
        textClear('ls_4_t_area');
        $('.p21_text_pop_txt').css('display', 'none');
    });
});
