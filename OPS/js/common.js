
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
//개별 라디오 체크(쓰일 일이 많이 없음)
//해당 정답버튼, 해당 라디오버튼이름, 그에대한 답이 파라미터로 들어온다.
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
//라디오 다중 체크 (하나의 라디오체크라도 틀릴 시 오답처리함)
//라디오문제가 몇개씩 동시에 들어와도 처리할 수 있음
//answers 파라미터는 해당 name의 라디오가 어떤것이 답인지 알려줌
//html에서 순서로 구분 0과 1이 들어오게됨
//ex) <input type="radio" name="test1"/>
//<input type="radio" name="test1"/>
//위의 라디오에서 정답이 첫번째 것이라고 할 경우, 파라미터로는 0이 들어오게됨.
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