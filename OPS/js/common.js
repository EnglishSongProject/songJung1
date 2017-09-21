/**
 * Created by sr01-02 on 2017-09-15.
 */
/**
 * Created by wonhuiryu on 2017-09-09.
 */
    // Global variable to track current file name.
    //OS 분기처리
var ipadOS = false;
if (navigator.appVersion.indexOf("iPad")!=-1) ipadOS = true;

var AndroidOS = false;
if ( navigator.userAgent.toLowerCase().indexOf("android") != -1 ) AndroidOS = true;

var isPc = (AndroidOS == false && ipadOS ) ? true : false;

var WindowsTenOS = false;
if ( navigator.userAgent.toLowerCase().indexOf("webview") != -1 ) WindowsTenOS = true;


var currentFile = "";
function playAudio(path, btnId, target, imgId) {
    // Check for audio element support.
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            oAudio.style.position = "absolute";
            oAudio.style.width = "200px";

            //Skip loading if current file hasn't changed.
            if (path !== currentFile) {
                oAudio.src = path;
                currentFile = path;
            }
            if(btnId == 'single'){
                if(imgId != null && imgId != 'undefined'){
                    var imgClassForNone = document.getElementsByClassName('class-for-none');
                    for(var i=0; i<imgClassForNone.length; i++){
                        imgClassForNone[i].style.display='none';
                    }
                    var imgId = document.getElementById(imgId);
                    imgId.style.display='block';
                }
                removePopup();
                oAudio.style.display='none';
                if (oAudio.paused){
                    oAudio.play();
                }else{
                    return;
                }
            }else {
                // Tests the paused attribute and set state.
                if (oAudio.paused) {
                    oAudio.play();

                    /*팝업*/
                    removePopup();
                    popup = document.createElement("div");
                    popup.className = "popup";
                    target.parentNode.appendChild(popup);
                    popup.style.top = (target.offsetTop - 10) + "px";
                    popup.style.left = (target.offsetLeft + 40) + "px";
                    oAudio.style.top = (target.getBoundingClientRect().top - 6 +  window.scrollY) + "px";
                    oAudio.style.left = (target.getBoundingClientRect().left + 45 ) + "px";
                    oAudio.style.display='block';
                }
                else {
                    removePopup();
                    oAudio.pause();

                }
                oAudio.addEventListener("ended", function (e) {
                    removePopup();
                    oAudio.style.display='none';
                });
            }
        }
        catch (e) {
            // Fail silently but show in F12 developer tools console
            //if(window.console && console.error("Error:" + e));
        }
    }
}
//슬라이더 js
var imageSlide = {

    init : function(){

        var slide_content = document.getElementsByClassName('slider_content');
        for(var i=0,j=slide_content.length; i<j; i++){
            var slider_image = slide_content[i].getElementsByClassName('slider_image')[0];
            var image = slider_image.children;
            var thumbnail = slide_content[i].getElementsByClassName('slider_thumbnail')[0];
            var thumbnail_list = thumbnail.children;
            slider_image.firstElementChild.classList.add('on');
            for(var m=0,n=thumbnail_list.length; m<n; m++){
                if(m===0) thumbnail_list[m].classList.add('on');
                thumbnail_list[m].addEventListener('mousedown',imageSlide.showImg,false);
                image[m].addEventListener('touchstart', imageSlide.swipe.swiper, false);
                image[m].addEventListener('touchmove', imageSlide.swipe.swiper, false);
                image[m].addEventListener('touchend',imageSlide.swipe.swiper, false);
            }
        }
    },


    showImg  : function(){
        var content =  this.parentNode.parentNode.parentNode;
        var index = parseInt(this.getAttribute('data-num'));
        var slide = content.getElementsByClassName('slider_image')[0];
        this.parentNode.getElementsByClassName('on')[0].classList.remove('on');
        this.classList.add('on');
        slide.getElementsByClassName('on')[0].classList.remove('on');
        slide.children[index-1].classList.add('on');
    },

    buttonAction : {

        prevImageShow : function(){
            console.log(this)
            var slide = this.getElementsByClassName('slider_image')[0];
            var thumbnail = this.getElementsByClassName('slider_thumbnail')[0];
            var index = parseInt(thumbnail.getElementsByClassName('on')[0].getAttribute('num'));
            if(index === 1) {
                return false;
            }else{
                slide.getElementsByClassName('on')[0].classList.remove('on');
                slide.children[index-2].classList.add('on');
                thumbnail.getElementsByClassName('on')[0].classList.remove('on');
                thumbnail.children[index-2].classList.add('on');
            }


        },

        nextImageShow : function(){
            var slide = this.getElementsByClassName('slider_image')[0];
            var thumbnail = this.getElementsByClassName('slider_thumbnail')[0];
            var index = parseInt(thumbnail.getElementsByClassName('on')[0].getAttribute('num'));

            if(index === slide.children.length) {
                return false;
            }
            else {
                slide.getElementsByClassName('on')[0].classList.remove('on');
                slide.children[index].classList.add('on');
                thumbnail.getElementsByClassName('on')[0].classList.remove('on');
                thumbnail.children[index].classList.add('on');
            }
        }
    },
    swipe : {
        touch : null,
        start_x : null,
        start_y : null,
        end_x : null,
        end_y : null,
        move : false,
        swiper : function(event){
            if (typeof event !== 'undefined') {
                if (typeof event.touches !== 'undefined') {
                    imageSlide.swipe.touch = event.touches[0];
                    if(event.type === 'touchstart'){
                        imageSlide.swipe.start_x = Math.floor(imageSlide.swipe.touch.pageX);
                        imageSlide.swipe.start_y = Math.floor(imageSlide.swipe.touch.pageY);
                        imageSlide.swipe.move = false;
                    }else if(event.type === 'touchmove'){
                        imageSlide.swipe.move = true;
                        imageSlide.swipe.end_x = Math.floor(imageSlide.swipe.touch.pageX);
                        imageSlide.swipe.end_y = Math.floor(imageSlide.swipe.touch.pageY);
                    }else if(event.type === 'touchend'){
                        if(imageSlide.swipe.move) imageSlide.swipe.start_x - imageSlide.swipe.end_x > 0 ? imageSlide.buttonAction.prevImageShow.call(this.parentNode.parentNode.parentNode.parentNode) : imageSlide.buttonAction.nextImageShow.call(this.parentNode.parentNode.parentNode.parentNode)

                    }
                }
            }
        }
    }
}
function removePopup(){
    var popup = document.querySelector(".popup");
    if(popup){
        popup.parentNode.removeChild(popup);
    }
}

function blankCheck(questionId, Ids, answers){

    var questionId = document.getElementById(questionId);
    var answerIdArray;
    var answerArray;
    var answerId;
    //해당 문자가 + 기호를 포함하고 있는가 확인한다.
    //+기호를 포함하고 있다면 다중 라디오 체크이기 때문에 split함수를 사용하여 배열로 만들고
    //포함하고 있지 않다면 단일 빈칸 체크임
    if(Ids.indexOf("+") != -1){//배열일경우(다중 빈칸체크일 경우)
        answerIdArray =  Ids.split('+');
        answerArray =  answers.split('+');
    }else{//단일일경우(단일 빈칸체크일 경우
        answerIdArray = [Ids];
        answerArray = [answers];
    }
    if(questionId.innerHTML =='정답'){
        questionId.innerHTML='다시풀기';
        for(var i=0; i<answerIdArray.length; i++){
            answerId = document.getElementById(answerIdArray[i]);
            answerId.innerHTML = answerArray[i];
        }
    }else if (questionId.innerHTML =='다시풀기'){
        questionId.innerHTML='정답';
        for(var i=0; i<answerIdArray.length; i++){
            answerId = document.getElementById(answerIdArray[i]);
            answerId.innerHTML = '';
        }
    }
}

function blankCheckByCss(questionId, Ids, clearId, type){
    var questionId = document.getElementById(questionId);
    var answerIdArray;
    var clearArray;
    var answerId;
    var score = 0;
    //해당 문자가 + 기호를 포함하고 있는가 확인한다.
    //+기호를 포함하고 있다면 다중 라디오 체크이기 때문에 split함수를 사용하여 배열로 만들고
    //포함하고 있지 않다면 단일 빈칸 체크임
    if(Ids.indexOf("+") != -1){//배열일경우(다중 빈칸체크일 경우)
        answerIdArray =  Ids.split('+');
        clearArray = clearId.split('+');
    }else{//단일일경우(단일 빈칸체크일 경우
        answerIdArray = [Ids];
        clearArray = [clearId];
    }
    if(questionId.title =='답안'){
        $(questionId).removeClass('btn_answer');
        $(questionId).addClass('btn_repeat');
        questionId.title ='다시풀기';
        for(var i=0; i<answerIdArray.length; i++){
            inputId = document.getElementById(clearArray[i]);
            answerId = document.getElementById(answerIdArray[i]);

            if(inputId.value.trim() == answerId.innerHTML) {
                score++
            }

            answerId.style.display='inline';
        }
        var notice = score === 3 ? "정답" : "오답"
        if(type == "type01"){
            alert(notice + "입니다")
        }
        

    }else if (questionId.title == '다시풀기'){
        $(questionId).removeClass('btn_repeat');
        $(questionId).addClass('btn_answer');
        questionId.title = '답안';
        for(var i=0; i<answerIdArray.length; i++){
            clearId = document.getElementById(clearArray[i]);
            if(clearId.value != null && clearId.value != ''){
                clearId.value='';
            }
            answerId = document.getElementById(answerIdArray[i]);
            answerId.style.display='none';
        }
    }
}
function radioCheck(questionId, names, answers) {
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

    if(questionId.title =='답안') {
        $(questionId).removeClass('btn_answer');
        $(questionId).addClass('btn_repeat');
        questionId.title ='다시풀기';
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
        for(var i=0; i<answerNameArray.length;i++) {
            var name = document.getElementsByName(answerNameArray[i]);
            for(var y=0; y<name.length;y++){
                if(name[y].checked){
                    name[y].checked=false;
                }
            }
            name[answerArray[i]].checked=true;
            $(name[answerArray[i]]).removeClass('correct');
            $(name[answerArray[i]]).addClass('false');
        }

    }else if (questionId.title == '다시풀기'){
        $(questionId).removeClass('btn_repeat');
        $(questionId).addClass('btn_answer');
        questionId.title = '답안';
        for(var i=0; i<answerNameArray.length;i++) {
            var name = document.getElementsByName(answerNameArray[i]);
            for(var y=0; y<name.length;y++){
                if($(name[y]).hasClass('false')){
                    $(name[y]).removeClass('false');
                }
                $(name[y]).addClass('correct');
                if(name[y].checked){
                    name[y].checked=false;
                }
            }
        }
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
//클리어할 텍스트박스 아이디
//클리어할 체크박스 이름
//정답을 보여줄 Id
//버튼 Id
//소스가 개판이라 죄송합니다.
function textClear(idForClear, nameForClear, Id_a, btnId_q) {
    var id = document.getElementById(btnId_q);
    var answer = document.getElementById(Id_a);
    if($(id).hasClass('btn_answer')){
        $(id).removeClass('btn_answer');
        $(id).addClass('btn_repeat');
        $(answer).css('display','inline-block');
    }else if($(id).hasClass('btn_repeat')){
        //singleClear
        if(idForClear != null && idForClear != '' && idForClear !='undefined'){
            var idForC = document.getElementById(idForClear);
            idForC.value='';
            console.log(id);
        }
        //checkWithCheckBox
        var checkBoxNamesForClear =document.getElementsByName(nameForClear);
        console.log(checkBoxNamesForClear);
        for(var i=0;i<checkBoxNamesForClear.length;i++){
            checkBoxNamesForClear[i].checked = false;
        }
        $(id).removeClass('btn_repeat');
        $(id).addClass('btn_answer');
        $(answer).css('display','none');
    }
}
function textClearByNames(name,ck_list) {
    var nameArray = document.getElementsByName(name);
    var ckArray = document.getElementsByName(ck_list);
    for(var i=0; i<nameArray.length; i++){
        nameArray[i].value='';
    }
    for(var i=0; i<ckArray.length; i++){
        ckArray[i].checked= false;
    }

}
function listenAndNumberCheck(questionId, inputId, answer) {
    var questionId = document.getElementById(questionId);
    var answerArray;
    if(inputId.indexOf("+") != -1){//배열일경우(다중 빈칸체크일 경우)
        answerArray = answer.split('+');
        inputId = inputId.split('+');
    }
    if(questionId.title =='답안'){
        $(questionId).removeClass('btn_answer');
        $(questionId).addClass('btn_repeat');
        questionId.title ='다시풀기';
        var correctCheck = 0;
        for(var i=0; i<inputId.length; i++){
            var id = document.getElementById(inputId[i]);
            if(id.value==answerArray[i]){
                correctCheck +=1
            }
        }
        for(var i=0;i<inputId.length;i++){
            var id = document.getElementById(inputId[i]);
            if(id.value != null && id.value != ''){
                $(id).addClass('color-red');
            }
        }
        if(correctCheck == 3){
            alert('정답입니다.');
        }else{
            alert('오답입니다.');
            for(var i=0; i<inputId.length; i++){
                var id = document.getElementById(inputId[i]);
                id.value=answerArray[i];
                if(!$(id).hasClass('color-red')){
                    $(id).addClass('color-red');
                }
            }
        }
    }else if (questionId.title == '다시풀기'){
        $(questionId).removeClass('btn_repeat');
        $(questionId).addClass('btn_answer');
        questionId.title = '답안';
        for(var i=0;i<inputId.length;i++){
            var id = document.getElementById(inputId[i]);
            if(id.value != null && id.value != ''){
                id.value='';
                if($(id).hasClass('color-red')){
                    $(id).removeClass('color-red');
                }
            }
        }
    }
}