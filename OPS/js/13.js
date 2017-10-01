
var pageNum = 13; //video.js에서 페이지 이미지 경로로 활용됨
var mediaInfo = [

    {
        //하나의 동영상

        //동영상 제목
        title: "",

        folder: [
            // 동영상 경로
            './media/video/L01_013_Communication_Ani-1'
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
    $(".btn_play").click(function(){
        imageSlide.closePopup();
    });

    $("#p13_self_check_pen_1_1, #p13_self_check_pen_1_2, #p13_self_check_pen_1_3, #p13_self_check_pen_1_4, #p13_self_check_pen_1_5").on("click",function(){
        var obj = $(this);
        var str = obj.context.id;
        var idStr = str.substr(0, str.length-1);
        var idTh = str.substr(str.length -1, 1);
        idTh = parseInt(idTh);
        //opacity 0 초기화
        for(var i=1;i<6;i++){
            $("#"+idStr+i.toString()).css('opacity', '0');
        }
        //해당 클릭 수 만큼 opacity넣기
        for(var i=1;i<idTh+1;i++){
            $("#"+idStr+i.toString()).css('opacity', '0.3');
        }
    });

    $("#p13_self_check_pen_2_1, #p13_self_check_pen_2_2, #p13_self_check_pen_2_3, #p13_self_check_pen_2_4, #p13_self_check_pen_2_5").on("click",function(){
        var obj = $(this);
        var str = obj.context.id;
        var idStr = str.substr(0, str.length-1);
        var idTh = str.substr(str.length -1, 1);
        idTh = parseInt(idTh);
        //opacity 0 초기화
        for(var i=1;i<6;i++){
            $("#"+idStr+i.toString()).css('opacity', '0');
        }
        //해당 클릭 수 만큼 opacity넣기
        for(var i=1;i<idTh+1;i++){
            $("#"+idStr+i.toString()).css('opacity', '0.3');
        }
    });


    $('.img-popup-none-confirm1').on('click',function () {
        $('.img-popup-none-confirm1').toggle();
    });
    $('.btn_play').on('click',function () {
        $('.img-popup-none-confirm1').toggle();
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

