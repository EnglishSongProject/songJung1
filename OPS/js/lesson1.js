/*
정답 / 다시보기를 구현한 함수
시작은 0이다 (아직 정답 버튼을 누르지 않음)
*/
function playAudio(path) {
    var audio = new Audio(path);
    audio.play();
}
function showAnswer(questionId, answerId){

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
function radioCheckSeper(questionId, name, answer){

    var questionId = document.getElementById(questionId);
    var name = document.getElementsByName(name);

    if(questionId.innerHTML =='정답'){

        //radio true/false
        if(name[answer].checked){
            //정답일시의 효과
            alert('정답입니다.');
        }else{
            //오답일시의 효과
            alert('오답입니다.');
        }

        questionId.innerHTML='다시풀기';

    }else if (questionId.innerHTML =='다시풀기'){

        for(var i=0; i<name.length;i++){
            if(name[i].checked){
                name[i].checked=false;
            }
        }

        questionId.innerHTML='정답';
    }
}

//names, answers은 순서대로 들어와야 함 (answerArray와 매칭) 구분자 +
function radioCheckAll(questionId, names, answers) {
    var questionId = document.getElementById(questionId);
    //구분자로 쪼개서 넣어줌
    //question1, question2
    var answerNameArray =  names.split('+');
    //answer1, answer2
    var answerArray =  answers.split('+');
    var totalForCorrect=0;


    if(questionId.innerHTML =='정답') {

        for(var i=0; i<answerNameArray.length;i++){
            //둘 다 맞았을 경우 2가 나와야함
            totalForCorrect += radioCorrectCheckSeperForAll(answerNameArray[i], answerArray[i]);
        }
        if (totalForCorrect == 2) {
            alert('정답입니다.');
            //정답일때 radiobox 컨트롤
        } else if (totalForCorrect != 2) {
            alert('오답입니다.');
            //오답일때 radiobox 컨트롤
        }
        questionId.innerHTML='다시풀기';

    }else if (questionId.innerHTML =='다시풀기'){
        for(var i=0; i<answerNameArray.length;i++) {
            var name = document.getElementsByName(answerNameArray[i]);
            for(var y=0; y<name.length;y++){
                if(name[y].checked){
                    name[y].checked=false;
                }
            }
        }
        questionId.innerHTML='정답';
    }
}
//radio 정답 체크 1과 0을 반환해줌.
function radioCorrectCheckSeperForAll(name, answer){
    var name = document.getElementsByName(name);
    if(name[answer].checked){
        return 1;
    }else{
        return 0;
    }
}


