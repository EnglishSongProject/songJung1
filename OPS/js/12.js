// JavaScript Document
var pageNum = 12; //video.js에서 페이지 이미지 경로로 활용됨
var playMode = 'normal';
var roleNum = 0;
var progLimit = [0, 200];
var progBallLeft = 340;
var mediaInfo = [

    {
        //하나의 동영상

        //동영상 제목
        title: "",

        folder: [
            // 동영상 경로
            './media/video/L01_role_play'
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
$(document).ready(function() {
      imageSlide.init();
      $("ul.Tab_area > li").click(function(){
        $("ul.Tab_area > li").removeClass("li_on")
        $(this).addClass("li_on");

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
