/**
 * Created by sr01-02 on 2017-09-19.
 */
var pageNum = 10; //video.js에서 페이지 이미지 경로로 활용됨
var playMode = 'normal';
var roleNum = 0;
var progLimit = [0, 373];
var progBallLeft = 120;
var mediaInfo = [

    {
        //동영상 제목
        title: "What will the girl say?",

        folder: [
            // 동영상 경로
            './media/video/L01_010_listen1_ani'
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
            [1, 2.5, 4],
            [2, 4.3, 6.5],
            [3, 7, 10]
        ],

        // 동영상 텍스트 [순번, 사람번호, 영어, 한글]
        syncText: [
            [1, 1, 'How are you doing?', '어떻게 지내니?'],
            [2, 2, "I'm good.", '좋아.'],
            [3, 2, 'Not so good.', '별로 좋지 않아']
        ]
    }
];
$(document).ready(function () {
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
