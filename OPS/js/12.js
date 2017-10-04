// JavaScript Document
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

    $('#role_1, #role_2, #role_3').on('click',function () {
        //뮤트온
        if (!$(this).hasClass('on')) {
            $(this).addClass('on');
            //뮤트 오프
        } else {
            $(this).removeClass('on');
        }

        //롤리스트 아래의 on인 것들을 배열로 받는다.(다중 뮤트 기능 구현)
        var role_List = $('.role_list');
        var arrayFormuteOn = new Array();

        for (var z = 0; z < role_List[0].childNodes.length; z++) {
            if ($(role_List[0].childNodes[z]).hasClass('on')) {
                arrayFormuteOn.push(role_List[0].childNodes[z]);
            }
        }

        var info = mediaInfo[idxr];
        var text = info.syncText;
        var sync = info.sync;
        var arrayForMute = new Array();
        var vObj = $("#vdo");
        var muteForRoleList = new Array();

        //해당 싱크 텍스트의 순서만 받아와 배열에 푸시해준다.
        for (var i = 0; i < text.length; i++) {
            //뮤트할 롤 배열만큼 반복문을 돌려준다.
            for (var y = 0; y < arrayFormuteOn.length; y++) {
                var whoNum = arrayFormuteOn[y].id.substr(this.id.length - 1, 1);
                if (text[i][1] == whoNum) {
                    muteForRoleList.push(whoNum);
                    arrayForMute.push(sync[i]);
                }
            }
        }
        //요소 중복제거 스크립트
        muteForRoleList = muteForRoleList.reduce(function (a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);

        //어레이 뮤트로 온과 오프 이벤트를 걸어주면 됨.
        console.log('뮤트할 롤 넘버' + muteForRoleList + '뮤트할 것' + arrayForMute + ' 뮤트할 갯수' + arrayForMute.length);

        //뮤트 조건 넣는 로직
        if(arrayForMute.length != 0){
            var textForEval = 'if(';
            for (var i = 0; i < arrayForMute.length; i++) {
                textForEval += '(' + arrayForMute[i][1].toString() + '<vObj[0].currentTime&&vObj[0].currentTime<' + arrayForMute[i][2].toString() + ')||';
            }
            textForEval = textForEval.substr(0, textForEval.length - 2);
            textForEval += '){vObj.prop(\'muted\', true);}else{vObj.prop(\'muted\', false);}'

            console.log(textForEval);
            vObj[0].addEventListener("timeupdate", function () {
                eval(textForEval);
            });
        }else{
            vObj[0].addEventListener("timeupdate", function () {
                vObj.prop('muted', false);
            });
        }
    });
});
