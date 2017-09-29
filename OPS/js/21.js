
var pageNum = 21; //video.js에서 페이지 이미지 경로로 활용됨
var mediaInfo = [

    {
        //하나의 동영상

        //동영상 제목
        title: "What will the boy say?",

        folder: [
            // 동영상 경로
            './media/video/L01_021_Work_Ani-1'
        ],

        role:[['Man','남자'],['Woman','여자'],['Animal','동물']],
        rolePos:[100, 0, 110], //'선생님:'의 넓이, 콜론의 x좌표, 대사의 x좌표

        section: [
            // 동영상 구간 재생 [시작시간, 종료시간], 이미지는 규칙적임
            [5.00, 9.00],
            [10.00, 11.00],
            [12.00, 14.00]
        ],

        // 동영상 텍스트 씽크 [순번, 시작시간, 종료시간]
        sync: [
            [1, 2.5, 5],
            [2, 5.5, 7.5],
            [3, 8, 11]
        ],

        // 동영상 텍스트 [순번, 사람번호, 영어, 한글]
        syncText: [
            [1, 1, "We'd like to introduce our group members.", 'Sam, 이 개는 나의 개, Bob이야.'],
            [2, 2, "This is Jina. Her nickname is Good Listener. She is active", 'Bob, 이 아이는 Sam이야.'],
            [3, 2, 'Her birthday is November 5th.', '만나서 반가워, Bob.'],
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
