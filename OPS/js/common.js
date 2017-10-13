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

$(document).ready(function(){
    checkAskAnswer();
    toggleWord();
    setSpellcheck();
})

// 오디오 팝업
var currentFile = "";
var currentAudio = null;

function playAudio(path, btnId, target, imgId, direction) {
    var isPlaying = false;

    // Check for audio element support.
    if (window.HTMLAudioElement) {
        
        //  열려 있는 사운드 닫기
        if (path !== currentFile && currentFile !== "") {
            
            // 싱글 듣기 닫기
            if ($('.single').length) {
                $('.single').detach();
            }

            // 전체 듣기 닫기
            if (currentAudio != 'single') {
                var audio = $("#myaudio").get(0);
                audio.currentTime = 0;
                audio.pause();
                $(audio).detach();
                $(".audio-popup").hide().detach();
            }
        }
        var single_on = document.getElementsByClassName('single_on');

        //  싱글 듣기 
        if(btnId == 'single'){
            var oAudio = document.getElementById('myaudio');
            var wrapper = document.querySelector('.wrapper');
            currentAudio = 'single';
            if (path !== currentFile){
                oAudio = document.createElement('audio');
                oAudio.className = "single";
                oAudio.id = "myaudio";
                oAudio.src = path;
                currentFile = path;
                wrapper.appendChild(oAudio);
                $(single_on).css('color', '#2B2E34');
                $(single_on).removeClass('single_on');
            }
            try {
                if(!oAudio.paused){
                    oAudio.currentTime = 0;
                }else{
                    oAudio.play();
                    if(imgId != 'undefined') {
                        $(target).addClass('single_on');
                        $(target).css('color', '#9a01cd');
                    }
                }

                oAudio.addEventListener("ended", function (e) {
                    if (currentAudio == 'single') {
                        if(imgId != 'undefined') {
                            $(target).css('color', '#2B2E34');
                            $(target).removeClass('single_on');
                        }
                    }
                });
            }
            catch (e) {
                // Fail silently but show in F12 developer tools console
                if(window.console && console.error("Error:" + e));
            }

            if(imgId != null && imgId != 'undefined'){
                var imgClassForNone = document.getElementsByClassName('class-for-none');
                for(var i=0; i<imgClassForNone.length; i++){
                    imgClassForNone[i].style.display='none';
                }
                var imgId = document.getElementById(imgId);
                imgId.style.display='block';
            }
            
            // 전체 듣기 팝업
        }else {
            $(single_on).css('color', '#2B2E34');
            $(single_on).removeClass('single_on');
            var oAudio = document.getElementById("myaudio");
            var popup = document.querySelector(".audio-popup");

            if (path != currentFile){
                popup = document.createElement('div');
                oAudio = document.createElement('audio');
                popup.className = 'audio-popup';
                popup.style.display = "none";
                oAudio.id = "myaudio";
                oAudio.controls = false;
                oAudio.src = path;
                currentFile = path;

                var audioControls = document.createElement('div');
                audioControls.className = 'audio_controls';

                var play = document.createElement('button');
                play.className = "btn_play_toggle btn_audio_pause";
                play.textContent = "play";

                var stop = document.createElement('button');
                stop.className = "btn_audio_stop";
                stop.textContent = "stop";

                var close = document.createElement('button');
                close.className = "btn_audio_close";
                close.textContent = "close";

                var progressBar = document.createElement('div');
                progressBar.className = "progress_bar";

                var controllBar = document.createElement('div');
                controllBar.className ="controll_bar";

                audioControls.appendChild(play);
                audioControls.appendChild(stop);
                audioControls.appendChild(progressBar);
                audioControls.appendChild(controllBar);
                audioControls.appendChild(close);

                popup.appendChild(oAudio);
                popup.appendChild(audioControls);
                popup.style.zIndex=1000000000;

                var wrapper = document.querySelector('.wrapper');
                wrapper.appendChild(popup);
            }

            // 전체 듣기 팝업창 토글
            if (oAudio.paused && popup.style.display == "none") {
                var $target = $(target);
                
                // 팝업 위치 설정
                if(direction == 'left'){
                    popup.style.left = ($target.offset().left -216) + "px";
                    popup.style.top = ($target.offset().top - 10) + "px";
                }
                else if(direction == 'right'){
                    popup.style.left = ($target.offset().left + 36) + "px";
                    popup.style.top = ($target.offset().top - 6) + "px";
                }
                else if(direction == 'top-left'){
                    popup.style.left = ($target.offset().left - 50) + "px";
                    popup.style.top = ($target.offset().top -42) + "px";
                }
                else{
                    popup.style.left = ($target.offset().left) + "px";
                    popup.style.top = ($target.offset().top -42) + "px";
                }
                
                popup.style.display='block';
                audioPlay();
            }else {
                popup.style.display='none';
                audioStop();
            }
            
            // 재생 끝나면 자동닫기
            oAudio.addEventListener("ended", function (e) {
                if(parseInt(oAudio.currentTime) >=  parseInt(oAudio.duration)){
                    popup.style.display='none';
                    oAudio.pause();
                    oAudio.currentTime = 0;
                }
            });
            currentAudio = 'all';
            audioEvent();
        }
    }

    function audioPlay(){
        oAudio.play();
        isPlaying = true;
        $(".btn_play_toggle").removeClass("btn_audio_play").addClass("btn_audio_pause")
    }
    function audioPause(){
        oAudio.pause();
        isPlaying = false;
        $(".btn_play_toggle").removeClass("btn_audio_pause").addClass("btn_audio_play")
    }
    function audioStop(){
        try {
            oAudio.pause();
            isPlaying = false;
            oAudio.currentTime  = 0;
            $(".btn_play_toggle").removeClass("btn_audio_pause").addClass("btn_audio_play")
        }
        catch (e) {
            // Fail silently but show in F12 developer tools console
            if(window.console && console.error("Error:" + e));
        }
    }
    function audioClose(){
        popup.style.display='none';
        audioStop();
        $(".audio-popup").detach();
    }
    function updateProgress(){
        //   (음성진행시간 / 전체시간 *  (진행바 넓이 - 컨트롤바  크기)) + 진행바 좌표
        if(popup.style.display !== "none"){
            var curX = (oAudio.currentTime / oAudio.duration * ($('.progress_bar').width() - $('.controll_bar').width())) + $('.progress_bar').offset().left

            $('.controll_bar').offset({
                left:curX
            })
        }
    }

    function audioEvent(){
        /*오디오 재생 이벤트*/
        $(audioControls).on("click","button",function(e){
            var btn = $(e.target);
            if(btn.hasClass("btn_audio_play")){
                audioPlay()
            }else if(btn.hasClass("btn_audio_pause")){
                audioPause()
            }else if(btn.hasClass("btn_audio_stop")){
                audioStop()
            }else if(btn.hasClass("btn_audio_close")){
                audioClose();
                currentFile = ""
            }
        });
        oAudio.addEventListener("timeupdate",updateProgress);

        var progressBar = document.querySelector(".progress_bar");
        progressBar.addEventListener("click",function(e){
            try {
                var moveX = e.pageX -  $('.controll_bar').width() / 2
                $('.controll_bar').offset({
                    left:moveX
                })
                oAudio.currentTime = getCerrentTime(moveX)
            }
            catch (e) {
                // Fail silently but show in F12 developer tools console
                if(window.console && console.error("Error:" + e));
            }
        })

        /* 마우스 드래그, 터치 이벤트 */
        var controllBar = document.querySelector(".controll_bar");
        controllBar.addEventListener('mousedown', mouseDown, false);
        controllBar.addEventListener('touchstart', mouseDown, false);

        window.addEventListener('mouseup', mouseUp, false);
        window.addEventListener('touchend', mouseUp, false);
    }


    var activeControl = false;
    function mouseDown() {
        activeControl = true;
        window.addEventListener('mousemove', moveControll, true);
        window.addEventListener('touchmove', moveControll, true);
        oAudio.removeEventListener('timeupdate', updateProgress, false);
        oAudio.pause();
    }

    function mouseUp(event) {
        if (activeControl == true) {
            var posX = 0;
            if (event.touches) {
                posX = event.changedTouches[0].pageX;
            }
            else {
                posX = event.pageX;
            }

            window.removeEventListener('mousemove', moveControll, true);
            window.removeEventListener('touchmove', moveControll, true);

            // change current time
            posX -=  $('.controll_bar').width() / 2;

            try {
                oAudio.currentTime = getCerrentTime(posX);
                oAudio.addEventListener("timeupdate",updateProgress,false);
                if(isPlaying){
                    oAudio.play();
                }
            }
            catch (e) {
                // Fail silently but show in F12 developer tools console
                if(window.console && console.error("Error:" + e));
            }
        }
        activeControl = false;
    }

    function moveControll(event){
        var $progressBar = $(".progress_bar");
        var $controllBar = $(".controll_bar")
        var moveX = 0;
        if (event.touches) {
            moveX = event.touches[0].pageX;
        }
        else {
            event.preventDefault();
            moveX = event.pageX;
        }

        moveX -=  $('.controll_bar').width() / 2;

        var startX =$progressBar.offset().left
        var endX = $progressBar.offset().left + $progressBar.width() - $controllBar.width()

        if(moveX < startX){
            moveX = startX
        }else if(moveX > endX){
            moveX = endX
        }

        $('.controll_bar').offset({
            left:moveX
        })
    }

    function getCerrentTime(posX) {
        return (posX - $('.progress_bar').offset().left) / ($('.progress_bar').width() - $('.controll_bar').width()) * oAudio.duration
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

        imageSlide.closePopup()
    },

    buttonAction : {

        prevImageShow : function(){
            var slide = this.getElementsByClassName('slider_image')[0];
            var thumbnail = this.getElementsByClassName('slider_thumbnail')[0];
            var index = parseInt(thumbnail.getElementsByClassName('on')[0].getAttribute('data-num'));
            if(index === 1) {
                return false;
            }else{
                slide.getElementsByClassName('on')[0].classList.remove('on');
                slide.children[index-2].classList.add('on');
                thumbnail.getElementsByClassName('on')[0].classList.remove('on');
                thumbnail.children[index-2].classList.add('on');
            }

            imageSlide.closePopup()

        },

        nextImageShow : function(){
            var slide = this.getElementsByClassName('slider_image')[0];
            var thumbnail = this.getElementsByClassName('slider_thumbnail')[0];
            var index = parseInt(thumbnail.getElementsByClassName('on')[0].getAttribute('data-num'));

            if(index === slide.children.length) {
                return false;
            }
            else {
                slide.getElementsByClassName('on')[0].classList.remove('on');
                slide.children[index].classList.add('on');
                thumbnail.getElementsByClassName('on')[0].classList.remove('on');
                thumbnail.children[index].classList.add('on');
            }

            imageSlide.closePopup()
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
    },

    closePopup : function(){
            if($("#myaudio").length > 0) {
                $(".audio-popup").hide().detach();
                currentFile = ''
            }
            if($('.single').length){
                $('.single').detach()
            }
    }
};

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

function blankCheckByCss(questionId, Ids, clearId, type, dragName,savePositionName){
    var questionId = document.getElementById(questionId);
    var answerIdArray;
    var clearArray;
    var answerId;
    var inputId;
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
    if($(questionId).hasClass('btn_answer')){
        $(questionId).removeClass('btn_answer');
        $(questionId).addClass('btn_repeat');
        questionId.title ='다시풀기';
        for(var i=0; i<answerIdArray.length; i++){
            inputId = document.getElementById(clearArray[i]);
            answerId = document.getElementById(answerIdArray[i]);

            if(inputId.value.trim() == answerId.innerHTML) {
                score++
            }
            if(type!='type02'){
                answerId.style.display='inline';
            }
        }
        var notice = score === answerIdArray.length ? "정답" : "오답"
        if(type == "type01" || type == "type02"){
/*            alert(notice + "입니다");
* 추후 정답 체크할 시, 필요할 로직*/
        }

    }else if ($(questionId).hasClass('btn_repeat')){
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

        if(type == 'type03'){
            retryDragging(dragName,savePositionName);
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
            //정답일때 radiobox 컨트롤
        } else {
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

//정답을 보여줄 Id
//버튼 Id
//소스가 개판이라 죄송합니다.
function textClear(idForClear, nameForClear, Id_a, btnId_q) {
    if(nameForClear == undefined){
        if (idForClear != null && idForClear != '' && idForClear != undefined) {
            var idForC = document.getElementById(idForClear);
            idForC.value = '';
        }
        return;
    }
    var id = document.getElementById(btnId_q);
    var answer = document.getElementById(Id_a);
    if ($(id).hasClass('btn_answer')) {
        $(id).removeClass('btn_answer');
        $(id).addClass('btn_repeat');
        $(answer).css('display', 'inline-block');
    } else if ($(id).hasClass('btn_repeat')) {
        //singleClear
        if (idForClear != null && idForClear != '' && idForClear != undefined) {
            var idForC = document.getElementById(idForClear);
            idForC.value = '';
        }
        //checkWithCheckBox
        var checkBoxNamesForClear = document.getElementsByName(nameForClear);
        for (var i = 0; i < checkBoxNamesForClear.length; i++) {
            checkBoxNamesForClear[i].checked = false;
        }
        $(id).removeClass('btn_repeat');
        $(id).addClass('btn_answer');
        $(answer).css('display', 'none');
    }
}
function textClearByNames(name,ck_list) {
    var nameArray = document.getElementsByName(name);
    console.log(name);
    console.log(nameArray);
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
            //정답컨트롤
        }else{
            //정답컨트롤
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
//스크립트 팝업
function showScriptPopupTopLeft(target, top, left){
    var popup = document.createElement("div");
    var closeImg = document.createElement('img');
    var transBtn = document.createElement('img');
    var text = document.createElement('div');
    var targetId = target.id;
    var textInit = document.getElementsByClassName(targetId+' script');
    closeImg.src='./images/popup/close_pop.png';
    transBtn.src='./images/common/09.png';
    transBtn.style.width='30px';
    transBtn.style.height='30px';
    transBtn.style.right='40px';
    transBtn.style.position='absolute';
    transBtn.style.top='5px';
    closeImg.style.position='absolute';
    closeImg.style.top='11px';
    closeImg.style.right='10px';
    closeImg.style.width='20px';
    text.style.padding='0px 10px';
    text.style.marginTop='30px';
    var top = top;
    var left = left;
    popup.className = "scriptPopup";
    $(popup).addClass(targetId);
    target.parentNode.appendChild(popup);
    popup.style.top = (target.offsetTop - top) + "px";
    popup.style.left = (target.offsetLeft + left) + "px";
    popup.appendChild(text);
    popup.appendChild(transBtn);
    popup.appendChild(closeImg);
    closeImg.addEventListener('click', function () {
        var removePopup = document.getElementsByClassName('scriptPopup '+targetId);
        $(removePopup).remove();
    });
    transBtn.addEventListener('click', function () {
        var displayTrans = document.getElementsByClassName('transText '+targetId);
        $(displayTrans).toggle();
    });
    text.innerHTML=textInit[0].outerHTML;
    $(text.childNodes).removeClass('display-none');
    var transText = text.children[0].children;
    var transTextTop = 61;
    var textLineHeight = 40;
    for(var i=0; i<transText.length; i++){
        if(i%2 != 0){
            transText[i].style.display='none';
            transText[i].style.position='absolute';
            transText[i].style.fontSize='11px';
            transText[i].style.fontFaceName='Open Sans';
            transText[i].style.color='#339900';
            transText[i].style.top=transTextTop.toString()+'px';
            $(transText[i]).addClass('transText '+targetId);
            transTextTop += textLineHeight;
        }else{
            transText[i].style.lineHeight=textLineHeight.toString()+'px';
        }
    }

}

$(document).ready(function(){
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

            imageSlide.closePopup()
        },

        buttonAction : {

            prevImageShow : function(){
                var slide = this.getElementsByClassName('slider_image')[0];
                var thumbnail = this.getElementsByClassName('slider_thumbnail')[0];
                var index = parseInt(thumbnail.getElementsByClassName('on')[0].getAttribute('data-num'));
                if(index === 1) {
                    return false;
                }else{
                    slide.getElementsByClassName('on')[0].classList.remove('on');
                    slide.children[index-2].classList.add('on');
                    thumbnail.getElementsByClassName('on')[0].classList.remove('on');
                    thumbnail.children[index-2].classList.add('on');
                }

                imageSlide.closePopup()

            },

            nextImageShow : function(){
                var slide = this.getElementsByClassName('slider_image')[0];
                var thumbnail = this.getElementsByClassName('slider_thumbnail')[0];
                var index = parseInt(thumbnail.getElementsByClassName('on')[0].getAttribute('data-num'));

                if(index === slide.children.length) {
                    return false;
                }
                else {
                    slide.getElementsByClassName('on')[0].classList.remove('on');
                    slide.children[index].classList.add('on');
                    thumbnail.getElementsByClassName('on')[0].classList.remove('on');
                    thumbnail.children[index].classList.add('on');
                }

                imageSlide.closePopup()
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
        },
        closePopup : function(){
                if($("#myaudio").length > 0) {
                    $(".audio-popup").hide().detach();
                    currentFile = ''
                }

                if($('.single').length){
                    $('.single').detach()
                }
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
        var inputId;
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
        console.log(answerIdArray);
        console.log(clearArray);
        if($(questionId).hasClass('btn_answer')){
            $(questionId).removeClass('btn_answer');
            $(questionId).addClass('btn_repeat');
            questionId.title ='다시풀기';
            for(var i=0; i<answerIdArray.length; i++){
                inputId = document.getElementById(clearArray[i]);
                answerId = document.getElementById(answerIdArray[i]);

                if(inputId.value.trim() == answerId.innerHTML) {
                    score++
                }
                if(type!='type02'){
                    answerId.style.display='inline';
                }
            }
            var notice = score === answerIdArray.length ? "정답" : "오답"
            if(type == "type01" || type == "type02"){
                alert(notice + "입니다");
            }


        }else if ($(questionId).hasClass('btn_repeat')){
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
                //정답일때 radiobox 컨트롤
            } else {
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

    //정답을 보여줄 Id
    //버튼 Id
    //소스가 개판이라 죄송합니다.
    function textClear(idForClear, nameForClear, Id_a, btnId_q) {
        if(nameForClear == undefined){
            if (idForClear != null && idForClear != '' && idForClear != undefined) {
                var idForC = document.getElementById(idForClear);
                idForC.value = '';
            }
            return;
        }
        var id = document.getElementById(btnId_q);
        var answer = document.getElementById(Id_a);
        if ($(id).hasClass('btn_answer')) {
            $(id).removeClass('btn_answer');
            $(id).addClass('btn_repeat');
            $(answer).css('display', 'inline-block');
        } else if ($(id).hasClass('btn_repeat')) {
            //singleClear
            if (idForClear != null && idForClear != '' && idForClear != undefined) {
                var idForC = document.getElementById(idForClear);
                idForC.value = '';
            }
            //checkWithCheckBox
            var checkBoxNamesForClear = document.getElementsByName(nameForClear);
            console.log(checkBoxNamesForClear);
            for (var i = 0; i < checkBoxNamesForClear.length; i++) {
                checkBoxNamesForClear[i].checked = false;
            }
            $(id).removeClass('btn_repeat');
            $(id).addClass('btn_answer');
            $(answer).css('display', 'none');
        }
    }
    function textClearByNames(name,ck_list) {
        var nameArray = document.getElementsByName(name);
        console.log(name);
        console.log(nameArray);
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
//정답컨트롤
            }else{
//오답컨트롤
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
    //스크립트 팝업
    function showScriptPopupTopLeft(target, top, left){
        var popup = document.createElement("div");
        var closeImg = document.createElement('img');
        var transBtn = document.createElement('img');
        var text = document.createElement('div');
        var targetId = target.id;
        var textInit = document.getElementsByClassName(targetId+' script');
        closeImg.src='./images/popup/close_pop.png';
        transBtn.src='./images/common/09.png';
        transBtn.style.width='30px';
        transBtn.style.height='30px';
        transBtn.style.right='40px';
        transBtn.style.position='absolute';
        transBtn.style.top='5px';
        closeImg.style.position='absolute';
        closeImg.style.top='11px';
        closeImg.style.right='10px';
        closeImg.style.width='20px';
        text.style.padding='0px 10px';
        text.style.marginTop='30px';
        var top = top;
        var left = left;
        popup.className = "scriptPopup";
        $(popup).addClass(targetId);
        target.parentNode.appendChild(popup);
        popup.style.top = (target.offsetTop - top) + "px";
        popup.style.left = (target.offsetLeft + left) + "px";
        popup.appendChild(text);
        popup.appendChild(transBtn);
        popup.appendChild(closeImg);
        closeImg.addEventListener('click', function () {
            var removePopup = document.getElementsByClassName('scriptPopup '+targetId);
            $(removePopup).remove();
        });
        transBtn.addEventListener('click', function () {
            var displayTrans = document.getElementsByClassName('transText '+targetId);
            $(displayTrans).toggle();
        });
        text.innerHTML=textInit[0].outerHTML;
        $(text.childNodes).removeClass('display-none');
        var transText = text.children[0].children;
        var transTextTop = 61;
        var textLineHeight = 40;
        for(var i=0; i<transText.length; i++){
            if(i%2 != 0){
                transText[i].style.display='none';
                transText[i].style.position='absolute';
                transText[i].style.fontSize='11px';
                transText[i].style.fontFaceName='Open Sans';
                transText[i].style.color='#339900';
                transText[i].style.top=transTextTop.toString()+'px';
                $(transText[i]).addClass('transText '+targetId);
                transTextTop += textLineHeight;
            }else{
                transText[i].style.lineHeight=textLineHeight.toString()+'px';
            }
        }
    }
})

// ask & answer 문제풀이
function checkAskAnswer(){
    var $input = $("#aa_input");
    $("#aa_wr").on("click",function(){
        $input.toggle().removeAttr('disabled');
        //$("#aa_aws").hide();
        if($("#aa_q").hasClass('btn_repeat')){
            blankCheckByCss('aa_q', 'aa_aws', 'aa_input')
        }
    });
    $("#aa_q").on('click',function(){
        $input.show()
        if($(this).hasClass('btn_answer')){
            $input.removeAttr('disabled');
        }else{
            $input.attr('disabled','true')
        }
    })
}

// ask & answer 단어사전 토글
function toggleWord(){
    $(".btn_wp").on("click",function(){
        var idx = $(this).index();
        console.log(this);
        $('.wpopup').eq(idx).toggle().siblings('.wpopup').hide();
    })
}

// setSpellcheck
function setSpellcheck(){
    var ta =document.getElementsByTagName('textarea');
    var ip =document.getElementsByTagName('input');

    if(ta){
        for(var i=0; i<ta.length;i++){
            ta[i].setAttribute('spellcheck','false');
        }
    }
    if(ip){
        for(var i=0; i<ip.length;i++){
            ip[i].setAttribute('spellcheck','false');
        }
    }
}

// popup
function openPopup(popupId){
    $("#"+popupId).show();
    function initEvent(){
        $(".popup .btn_repeat").on('click',function(){
            var $this = $(this).parent();
            $this.find("textarea").val("");
        });
        $(".popup .btn_close").on('click',function(){
            var $this = $(this).parent('.popup');
            $this.hide();
        });
    }
    initEvent();
}

function checkBoxCheckForMulti(btnId, checkboxName, answerArray) {
    //체크박스는 무조건 2개 이상이므로 따로 예외처리를 하지 않는다.
    var btnId = $('#'+btnId);
    var checkboxName = document.getElementsByName(checkboxName);
    var answerArray = answerArray;
    if(answerArray.length > 1){
        answerArray = answerArray.split('+');
    }
    //전부 체크 해제 및 correct 클래스로 변경
    for (var i = 0; i < checkboxName.length; i++) {
        checkboxName[i].checked = false;
        if ($(checkboxName[i]).hasClass('false')) {
            $(checkboxName[i]).removeClass('false');
            $(checkboxName[i]).addClass('correct');
        }
    }

    //버튼 토글(정답체크)
    if($(btnId).hasClass('btn_answer')) {
        $(btnId).removeClass('btn_answer');
        $(btnId).addClass('btn_repeat');

        //해당 답안 체크 및 false 클래스로 변경(이름이 false이지 체크하는 css 클래스임)
        for (var y = 0; y < answerArray.length; y++) {
            checkboxName[answerArray[y]].checked = true;
            if ($(checkboxName[answerArray[y]]).hasClass('correct')) {
                $(checkboxName[answerArray[y]]).removeClass('correct');
                $(checkboxName[answerArray[y]]).addClass('false');
            }
        }
        //버튼 토글(초기화)
    }else if($(btnId).hasClass('btn_repeat')){
        $(btnId).removeClass('btn_repeat');
        $(btnId).addClass('btn_answer');
    }
}
function isNumber(s) {
    s += ''; // 문자열로 변환
    s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
    if (s == '' || isNaN(s)) return false;
    return true;
}
function getMousePosition(e) {
    return e;
}
/*top: 20px;
left: 16px;*/
function showWordTopLeft(target, meaning, top, left) {
    if($('.word_on').length){
        $('.word_on').detach();
    }
    var meanText = document.createElement('span');
    meanText.innerHTML=meaning;
    meanText.style.color='#339900';
    meanText.style.position='absolute';
    meanText.style.top = (top).toString() + 'px';
    meanText.style.left = (left).toString() + 'px';
    $(meanText).addClass('word_on');
    target.appendChild(meanText);
}



//새로운 음성재생 모듈
function setAudio(){

    if($('.audio_play').length == 0) return;

    $('.audio_play').each(function () {
        if($(this).attr('data-type') == 'multi'){
            $(this).on('click', function () {
                console.log(this);
                console.log(audioPath + $(this).attr('data-name')+'.mp3');
                playAudio(audioPath + $(this).attr('data-name') + '.mp3' ,'',this,'', $(this).attr('datasrc'));
            });
        }else if($(this).attr('data-type') == 'no-color'){
            $(this).on('click', function () {
                playAudio(audioPath + $(this).attr('data-name') + '.mp3', 'single', this, 'undefined');
            });
        }else{
            $(this).on('click', function () {
                playAudio(audioPath + $(this).attr('data-name') + '.mp3', 'single', this);
            });
        }
    });
}