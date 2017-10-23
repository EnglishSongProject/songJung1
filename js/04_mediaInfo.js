/**
 * Created by sr01-02 on 2017-10-15.
 */
var audioPath = './media/audio/L01/011/';
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
        rolePos:[100, 0, 110],

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