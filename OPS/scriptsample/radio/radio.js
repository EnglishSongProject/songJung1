
//개별/라디오 다중 체크 (하나의 라디오체크라도 틀릴 시 오답처리함)
//라디오문제가 몇개씩 동시에 들어와도 처리할 수 있음
//answers 파라미터는 해당 name의 라디오가 어떤것이 답인지 알려줌
//html에서 순서로 구분 0과 1이 들어오게됨
//ex) <input type="radio" name="test1"/>
//<input type="radio" name="test1"/>
//위의 라디오에서 정답이 첫번째 것이라고 할 경우, 파라미터로는 0이 들어오게됨.
//names, answers은 순서대로 들어와야 함 (answerArray와 매칭) 구분자 +
function radioCheckAll(questionId, names, answers) {
    var questionId = document.getElementById(questionId);
    var answerNameArray;
    var answerArray;
    //해당 문자가 + 기호를 포함하고 있는가 확인한다.
    //+기호를 포함하고 있다면 다중 라디오 체크이기 때문에 split함수를 사용하여 배열로 만들고
    //포함하고 있지 않다면 단일 라디오 체크이기 때문에 split함수 사용 시 에러를 출력한다
    if(names.indexOf("+") != -1){//배열일경우(다중 라디오체크일 경우)
        answerNameArray =  names.split('+');
        answerArray =  answers.split('+');
    }else{//단일일경우(단일 라디오체크일 경우
        answerNameArray = [names];
        answerArray = [answers];
    }
    var totalForCorrect=0;

    if(questionId.innerHTML =='정답') {

        for(var i=0; i<answerNameArray.length;i++){
            //answerNameArray의 갯수만큼 나와야함.
            totalForCorrect += radioCorrectCheckSeperForAll(answerNameArray[i], answerArray[i]);
        }
        if (totalForCorrect == answerNameArray.length) {
            alert('정답입니다.');
            //정답일때 radiobox 컨트롤
        } else {
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
