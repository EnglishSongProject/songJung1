
//mp3 재생 함수
function playAudio(path) {
    var audio = new Audio(path);
    audio.play();
}
//빈칸 체크 첫번째 방법 (해당 questionId(배열)과 answerId(배열) 값을 파라미터로 받는다)
//해당 answerId엔 display:none으로 이미 정답이 들어가 있음.
//단순히 display:block과 none으로 정답을 보여주거나 빼는 방법.
function showAnswer1(questionId, answerId){

    var questionId = document.getElementById(questionId);
    var answerId = document.getElementById(answerId);

    if(questionId.innerHTML =='정답'){
        questionId.innerHTML='다시풀기';
        answerId.style.display='block';
    }else if (questionId.innerHTML =='다시풀기'){
        questionId.innerHTML='정답';
        answerId.style.display='none';
    }
}
//빈칸 체크 두번째 방법 (해당 questionId와 answerId(배열)과 답(배열)을 파라미터로 받는다)
//answerId와 답을 순서대로 매칭하여 파라미터로 넘겨주어야함
//ex)두 개의 문제가 있다면 answerId1+answerId2 로 해당 답이 들어갈 요소를 얻게됨.
//그 요소의 답인 실제 answer은 answerId1에 해당하는 답 + answerId2에 해당하는 답으로 받아와야함.
function showAnswer2(questionId, answerId){

    var questionId = document.getElementById(questionId);
    var answerId = document.getElementById(answerId);

    if(questionId.innerHTML =='정답'){
        questionId.innerHTML='다시풀기';
        answerId.style.display='block';
    }else if (questionId.innerHTML =='다시풀기'){
        questionId.innerHTML='정답';
        answerId.style.display='none';
    }
}