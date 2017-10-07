var pageNum = 12; //video.js에서 페이지 이미지 경로로 활용됨
var playMode = 'role';
var roleNum = 0;
var progLimit = [0, 200];
var progBallLeft = 340;
var mediaInfo = [

    {
        //동영상 제목
        title: "Role-Play",

        folder: [
            // 동영상 경로
            './media/video/L01_role_play'
        ],

        role:[['Sumi','수미'],['Mr.Jackson','잭슨'],['Jiwon','지원']],
        rolePos:[100, 0, 110], //'선생님:'의 넓이, 콜론의 x좌표, 대사의 x좌표

        section: [
            // 동영상 구간 재생 [시작시간, 종료시간], 이미지는 규칙적임
            [5.00, 9.00],
            [10.00, 11.00],
            [12.00, 14.00]
        ],

        // 동영상 텍스트 씽크 [순번, 시작시간, 종료시간]
        sync: [
            [1, 3.4, 5],
            [2, 5.4, 7],
            [3, 7.4, 8.2],
            [4, 8.7, 9.8],
            [5, 10.2, 11.8],
            [6, 12.2, 14.9],
            [7, 15.2, 16.5],
            [8, 17, 18],
            [9, 18.4, 19.5],
            [10, 20.2, 23.9],
            [11,24.3,25.9],
            [12,26.3,27.2],
            [13,27.5,29.3],
            [14,29.6,30.9],
            [15,31.2,32.9],
            [16,33.2,34],
            [17,34.5,36]
        ],

        // 동영상 텍스트 [순번, 사람번호, 영어, 한글]
        syncText: [
            [1, 1, 'Hello, Mr.Jackson.', ''],
            [2, 1, "How are you doing?", ''],
            [3, 2, 'Pretty good.', ''],
            [4, 2, 'How about you Sumi?', ''],
            [5, 1, "Great, thanks.", ''],
            [6, 1, 'Mr.Jackson, this is my little sister, Jiwon.', ''],
            [7, 1, 'She\'s 10 years old.', ''],
            [8, 2, "Hi, Jiwon.", ''],
            [9, 2, 'Nice to meet you.', ''],
            [10, 2, 'I am Joe Jackson, and I\'m your sister\'s English teacher.', ''],
            [11, 3, 'Pleased to meet you Mr.Jackson.', ''],
            [12, 3, "I like English.", ''],
            [13, 3, 'English is fun.', ''],
            [14, 3, 'Are you from America?', ''],
            [15, 2, "No, I\'m not.", ''],
            [16, 2, 'I\'m from Canada.', ''],
            [17, 3, 'Oh i see.', '']
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

    //.role_list
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
