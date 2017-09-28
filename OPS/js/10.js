/**
 * Created by sr01-02 on 2017-09-19.
 */
var pageNum = 10; //video.js에서 페이지 이미지 경로로 활용됨
var mediaInfo = [
/*    {
        //하나의 동영상

        //동영상 제목
        title: "동영상 제목1",

        folder: [
            // 동영상 경로
            './media/video/L01_010_listen1_ani'
        ],

        role:[['Who','누구'],['Jack','잭'],['Mina','미나']],
        rolePos:[100, 0, 110], //'선생님:'의 넓이, 콜론의 x좌표, 대사의 x좌표

        section: [
            // 동영상 구간 재생 [시작시간, 종료시간], 이미지는 규칙적임
            [4.50, 9.00],
            [10.00, 11.00],
            [12.00, 14.00]
        ],

        sync: [
            // 동영상 텍스트 씽크 [순번, 시작시간, 종료시간]
            [1, 5.00, 9.00],
            [2, 10.00, 11.00],
            [3, 12.00, 14.00]
        ],

        syncText: [
            // 동영상 텍스트 [순번, 사람번호, 영어, 한글]
            [1, 1, 'Jack, This is Mina. Mina, This is Jack.', '잭, 얘는 미나야. 미나, 얘는 잭이야.'],
            [2, 2, 'Hello, Mina.', '미나, 안녕.'],
            [3, 3, 'Hello, Jack.', '잭, 안녕.']
        ]
    },*/



    {
        //하나의 동영상

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
    }/*,

    {
        //하나의 동영상

        //동영상 제목
        title: "동영상 제목3",

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
            [1, 0.600, 1.000],
            [2, 15.600, 18.800]
        ],

        // 동영상 텍스트 [순번, 사람번호, 영어, 한글]
        syncText: [
            [1, 1, 'English', '한글자막'],
            [2, 2, 'Say', '말하다.']
        ]
    }*/

];
$(document).ready(function () {
    imageSlide.init();
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
