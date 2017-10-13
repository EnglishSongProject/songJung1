
var pageNum = 21; //video.js에서 페이지 이미지 경로로 활용됨
var playMode = 'normal';
var roleNum = 0;
var progLimit = [0, 373];
var progBallLeft = 120;
var mediaInfo = [

    {
        //하나의 동영상

        //동영상 제목
        title: "",

        folder: [
            // 동영상 경로
            './media/video/L01_021_Work_Ani-1'
        ],
        rolePos:[100, 0, 110], //'선생님:'의 넓이, 콜론의 x좌표, 대사의 x좌표

        section: [
        ],

        // 동영상 텍스트 씽크 [순번, 시작시간, 종료시간]
        sync: [
        ],

        // 동영상 텍스트 [순번, 사람번호, 영어, 한글]
        syncText: [
        ]
    }
];
$(document).ready(function () {
    imageSlide.init();

    $('#p21_text_pop_btn').on('click', function () {
       $('.p21_text_pop_txt').css('display', 'block');
    });
	   
	$('.close_icon').on('click', function () {
        textClear('ls_4_t_area');
        $('.p21_text_pop_txt').css('display', 'none');
    });

    $('.mediabtn_0').on('click',function(){
        layerAclose();
        $('.zoom_img_wrap.a').show();
        mediaInit(0);
    });

    $('.btn_media_close').on('click',function(){
        mediaClose(); //video.js
        AllOff();
        $('.zoom_img_wrap').hide();
    });
});
