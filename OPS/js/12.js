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

        var whoNum = this.id.substr(this.id.length -1, 1);
        var info = mediaInfo[idxr];
        var text = info.syncText;
        var sync = info.sync;
        var arrayForMute = new Array();

        //해당 싱크 텍스트의 순서만 받아와 배열에 푸시해준다.
        for(var i=0; i<text.length;i++){
            if(text[i][1] == whoNum){
                var y=0
                for(y; y<sync.length;y++){
                    if(sync[y][0] == text[i][0]){
                        arrayForMute.push(sync[y]);
                    }
                }
            }
        }
        //어레이 뮤트로 온과 오프 이벤트를 걸어주면 됨.
        console.log(arrayForMute);
        //뮤트온
        if(!$(this).hasClass('on')){
            $(this).addClass('on');
            var vObj = $("#vdo");
            vObj[0].addEventListener("timeupdate", function () {
/*                for(var i=0; i<arrayForMute.length;i++){
                        console.log(vObj[0].currentTime);
                }*/
                for(var i=0; i<arrayForMute.length;i++){
                    if(arrayForMute[i][1]<vObj[0].currentTime&&vObj[0].currentTime<arrayForMute[i][2]){
                        vObj.prop('muted', true);
                        console.log(arrayForMute[i]);
                    }else{
                        vObj.prop('muted', false);
                        console.log(arrayForMute[i]);
                    }
                }
/*                if(5<vObj[0].currentTime&&vObj[0].currentTime<10){
                    vObj.prop('muted', true);
                }else{
                    vObj.prop('muted', false);
                }*/
            }, false);

            //뮤트 오프
        }else{
            $(this).removeClass('on');
        }

        /*var vdo = document.querySelector('#vdo');
        var vObj = $("#vdo");
        var ctime = vdo.currentTime;
        var info = mediaInfo[idxr]; //sync:, syncText:
        var txtInfo = null;
        var seq = -1;
        //17번의 반복문을 돌린다.(현재 진행되고 있는 플레이 구간)
        for (var i=0;i<info.sync.length;i++){
            //싱크 [i]번째의 두번째 값(재생시작시간)이 현재 진행 시각보다 이하이고
            //싱크 [i]번째의 세번째 값(재생 종료시간)이 현재 진행
            if (ctime>=info.sync[i][1] && ctime<=info.sync[i][2]){
                seq = i;
                txtInfo = info.syncText[i];
                console.log(txtInfo);
                break;
            }
        }
        var whoNum = txtInfo[1];
        console.log(whoNum);

        var muteClassList = $('.role_list');
        var muteChilds = muteClassList[0].children;

        for(var i=0; i<muteChilds.length; i++){
            if($(muteChilds[i]).hasClass('on')){
                //id 뒤의 숫자만 따로 추출
      /!*          arrayForMute.push(muteChilds[i].id.substr(muteChilds[i].id.length -1,1));*!/
                if(whoNum == muteChilds[i].id.substr(muteChilds[i].id.length -1,1)){
                    vObj.prop('muted', true); //mute
                }else {
                    vObj.prop('muted', false);
                    roleMute.on = false;
                }
            }
        }*/
    });
});
