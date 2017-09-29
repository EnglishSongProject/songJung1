var pageNum = 11; //video.js에서 페이지 이미지 경로로 활용됨
var mediaInfo = [

    {
        //하나의 동영상

        //동영상 제목
        title: "What will the boy say?",

        folder: [
            // 동영상 경로
            './media/video/L01_011_listen2_ani'
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
            [1, 1, 'Sam, this is my dog, Bob.', 'Sam, 이 개는 나의 개, Bob이야.'],
            [2, 2, "Bob, this is Sam.", 'Bob, 이 아이는 Sam이야.'],
            [3, 2, 'Nice to meet you, Bob.', '만나서 반가워, Bob.']
        ]
    }
];
$(document).ready(function () {
    imageSlide.init();

    $(".btn_tip").on("click",function(){
        $(".tip_con").toggle()
    });

    $(".rolling_thumbnail_area button").click(function(e){
        e.preventDefault();
        var $slides = $(".rolling_image_wrap > ul > li");
        var idx = $(this).index();

        $(this).addClass("on").siblings().removeClass("on");
        $slides.eq(idx).show().siblings().hide();

        // 진행중인 오디오 해제
        if($("#myaudio").length > 0) {
            $(".audio-popup").hide().detach();
            currentFile = ''
        }

        if($('.single').length){
            $('.single').detach()
        }
    });

    $(".trans1").on("click", function(){
        $(".correct1").toggle();
    });
    $(".trans2").on("click", function(){
        $(".correct2").toggle();
    });
    $(".trans3").on("click", function(){
        $(".correct3").toggle();
    });
    $(".trans4").on("click", function(){
        $(".correct4").toggle();
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
