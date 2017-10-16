/**
 * Created by wonhui.ryu on 2017-10-13.
 */
//오디오 경로
var audioPath = './media/audio/L01/012/';
var roleImgPath = './images/role_play_real/';
//class 명 = audio_play / data-type : multi(플레이어), noColor(색 변하지 않는 문장재생), 그 이외기본 재생은 비워두어도 무관.
// datasrc = 현재 디폴트는 직각위치 (left, right, top-left) 택가능 플레이어가 페이지를 벗어나는 경우 직접적으로 변경해줘야함.
// 비워둘 시 기본 직각
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
        //인물번호, 시작시간, 종료시간
        arrayForMute:[
            [1, 3, 6.5],
            [2, 6.8, 9.2],
            [1, 9.5, 15.7],
            [2, 16, 23],
            [3, 23.5, 30.9],
            [2, 31, 34],
            [3, 34.5, 36]
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