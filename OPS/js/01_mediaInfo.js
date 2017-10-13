/**
 * Created by wonhui.ryu on 2017-10-13.
 */
//오디오 경로
var audioPath = './media/audio/L01/008/';
var videoPath = './media/video/';

//class 명 = audio_play / data-type : multi(플레이어), noColor(색 변하지 않는 문장재생), 그 이외기본 재생은 비워두어도 무관.
// datasrc = 현재 디폴트는 직각위치 (left, right, top-left) 택가능 플레이어가 페이지를 벗어나는 경우 직접적으로 변경해줘야함.
// 비워둘 시 기본 직각
$(function () {
   setAudio();
});