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

    $(".btn_tip").on("click", function () {
        $(".tip_con").toggle();
    });

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
            var wrapper = document.querySelector('body');
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
                    if(imgId == 'sound-ani'){
/*                        console.log(target);
                        console.log(soundInfoForAni[0].arrayForName);*/
     /*                   console.log($(target).hasClass(soundInfoForAni[0].arrayForName));*/
                        for(var i=0; i<soundInfoForAni.length; i++){
                            if($(target).hasClass(soundInfoForAni[i].arrayForName+'_sentence')){
                                var checkedArray = soundInfoForAni[i];
                                var htmlArray = $('\.'+soundInfoForAni[i].arrayForName);
                                var name = soundInfoForAni[i].arrayForName;
                            }
                        }

                        console.log(htmlArray);
                        $(htmlArray).each(function (idx) {
                            $(this).addClass(name + '_index'+idx.toString())
                        });

                        var textForEval='';
                        for (var i = 0; i < checkedArray.arrayInfo.length; i++) {
                            if(i ==0){
                                textForEval += 'if(';
                            }else{
                                textForEval += 'else if(';
                            }
                            textForEval += checkedArray.arrayInfo[i][0].toString() + '<oAudio.currentTime&&oAudio.currentTime<' + checkedArray.arrayInfo[i][1].toString() + '){';
                            textForEval += '$(\'.'+name + '_index'+i.toString()+'\').addClass('+'\'active\''+');}';
                            if(i==checkedArray.arrayInfo.length-1){
                                textForEval += 'else {' + '$(\'.'+name+'\').removeClass('+'\'active\''+');}';
                            }
                        }
/*                        var i=0;
                        do{
                            textForEval += 'if(';
                            textForEval += checkedArray.arrayInfo[i][0].toString() + '<oAudio.currentTime&&oAudio.currentTime<' + checkedArray.arrayInfo[i][1].toString() + '){';
                            textForEval += '$(\'.'+name+'\').addClass('+'\'active\''+');}';
                            if(i>0){

                            }
                            i++

                        }while (i<checkedArray.arrayInfo.length)*/

                        console.log(textForEval);

                        $(oAudio).on('timeupdate', function () {
                            eval(textForEval);
                            console.log(oAudio.currentTime);
                            console.log(oAudio.duration);
                        });
                    }
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

            if(imgId != null && imgId != 'undefined' && imgId != 'sound-ani'){
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
                play.className = "btnMoviePlay_toggle btn_audio_pause";
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

                var wrapper = document.querySelector('body');
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
                else if(direction == 'top-left-much'){
                    popup.style.left = ($target.offset().left - 120) + "px";
                    popup.style.top = ($target.offset().top -42) + "px";
                }
                else if(direction == 'bottom'){
                    popup.style.left = ($target.offset().left - 40) + "px";
                    popup.style.top = ($target.offset().top + 30) + "px";
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
        $(".btnMoviePlay_toggle").removeClass("btn_audio_play").addClass("btn_audio_pause")
    }
    function audioPause(){
        oAudio.pause();
        isPlaying = false;
        $(".btnMoviePlay_toggle").removeClass("btn_audio_pause").addClass("btn_audio_play")
    }
    function audioStop(){
        try {
            oAudio.pause();
            isPlaying = false;
            oAudio.currentTime  = 0;
            $(".btnMoviePlay_toggle").removeClass("btn_audio_pause").addClass("btn_audio_play")
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
                // audioStop()
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

// 열려있는 사운드창 닫기
function closePopup(){
    if($("#myaudio").length > 0) {
        $(".audio-popup").hide().detach();
        currentFile = ''
    }
    if($('.single').length){
        $('.single').detach()
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

            slide_content[i].getElementsByClassName('btn_next')[0].addEventListener("click", function(){
                imageSlide.showImg.call(thumbnail_list[0])
            });

            slide_content[i].getElementsByClassName('btn_prev')[0].addEventListener("click", function(){
                imageSlide.showImg.call(thumbnail_list[1])
            });
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
                        if(imageSlide.swipe.move) imageSlide.swipe.start_x - imageSlide.swipe.end_x > 0 ? imageSlide.buttonAction.nextImageShow.call(this.parentNode.parentNode.parentNode.parentNode) : imageSlide.buttonAction.prevImageShow.call(this.parentNode.parentNode.parentNode.parentNode)

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
    if($(questionId).hasClass('btnAnswer')){
        $(questionId).removeClass('btnAnswer');
        $(questionId).addClass('btnReset');
        questionId.title ='다시풀기';
        for(var i=0; i<answerIdArray.length; i++){
            inputId = document.getElementById(clearArray[i]);
            answerId = document.getElementById(answerIdArray[i]);

            console.log(inputId,answerId)

/*            if(inputId.value.trim() == answerId.innerHTML) {
                score++
            }*/
            if(type!='type02'){
                answerId.style.display='inline-block';
            }
        }
        var notice = score === answerIdArray.length ? "정답" : "오답"
        if(type == "type01" || type == "type02"){
            /*            alert(notice + "입니다");
             * 추후 정답 체크할 시, 필요할 로직*/

        }

    }else if ($(questionId).hasClass('btnReset')){
        $(questionId).removeClass('btnReset');
        $(questionId).addClass('btnAnswer');
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

    if($(questionId).hasClass('btnAnswer')) {
        $(questionId).removeClass('btnAnswer');
        $(questionId).addClass('btnReset');
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

    }else if ($(questionId).hasClass('btnReset')){
        $(questionId).removeClass('btnReset');
        $(questionId).addClass('btnAnswer');
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
    if ($(id).hasClass('btnAnswer')) {
        $(id).removeClass('btnAnswer');
        $(id).addClass('btnReset');
        $(answer).css('display', 'inline-block');
    } else if ($(id).hasClass('btnReset')) {
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
        $(id).removeClass('btnReset');
        $(id).addClass('btnAnswer');
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
    var answerArray;
    if(inputId.indexOf("+") != -1){//배열일경우(다중 빈칸체크일 경우)
        answerArray = answer.split('+');
        inputId = inputId.split('+');
    }
    if($(questionId).hasClass('btnAnswer')){
        $(questionId).removeClass('btnAnswer');
        $(questionId).addClass('btnReset');
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
    }else if ($(questionId).hasClass('btnReset')){
        $(questionId).removeClass('btnReset');
        $(questionId).addClass('btnAnswer');
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
    console.log(top);
    console.log(left);
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
            transText[i].style.fontWeight='bold';
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

// ask & answer 문제풀이
function checkAskAnswer(){
    var $input = $("#aa_input");
    $("#aa_wr").on("click",function(){
        $input.toggle().removeAttr('disabled');
        //$("#aa_aws").hide();
        if($("#aa_q").hasClass('btnReset')){
            blankCheckByCss('aa_q', 'aa_aws', 'aa_input')
        }
    });
    $("#aa_q").on('click',function(){
        $input.show()
        if($(this).hasClass('btnAnswer')){
            $input.removeAttr('disabled');
        }else{
            $input.attr('disabled','true')
        }
    })
}

// ask & answer 단어사전 토글
function toggleWord(){
    $(".btn_wp").on("click",function(){
        var idx = $(".btn_wp").index(this);
        $('.intro_word').eq(idx).toggle().siblings('.intro_word').hide()
    })

    // $(".btnTranslation").on("click", function(){
    //     var idx = $(".btnTranslation").index(this);
    //     $('.trans_text').eq(idx).toggle();
    // });
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
        $(".popup .btnReset").on('click',function(){
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
    if($(btnId).hasClass('btnAnswer')) {
        $(btnId).removeClass('btnAnswer');
        $(btnId).addClass('btnReset');

        //해당 답안 체크 및 false 클래스로 변경(이름이 false이지 체크하는 css 클래스임)
        for (var y = 0; y < answerArray.length; y++) {
            checkboxName[answerArray[y]].checked = true;
            if ($(checkboxName[answerArray[y]]).hasClass('correct')) {
                $(checkboxName[answerArray[y]]).removeClass('correct');
                $(checkboxName[answerArray[y]]).addClass('false');
            }
        }
        //버튼 토글(초기화)
    }else if($(btnId).hasClass('btnReset')){
        $(btnId).removeClass('btnReset');
        $(btnId).addClass('btnAnswer');
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
        switch($(this).attr('data-type')){
            case 'multi':
                $(this).on('click', function () {
                    // playAudio(audioPath + $(this).attr('data-name') + '.mp3' ,'',this,'', $(this).attr('about'));
                });
                break;
            case 'no-color':
                $(this).on('click', function () {
                    // playAudio(audioPath + $(this).attr('data-name') + '.mp3', 'single', this, 'undefined');
                });
                break;
            case 'sound-ani':
                $(this).on('click', function () {
                    // playAudio(audioPath + $(this).attr('data-name') + '.mp3', 'single', this, 'sound-ani');
                });
                break;
            default:
                $(this).on('click', function () {
                    // playAudio(audioPath + $(this).attr('data-name') + '.mp3', 'single', this);
                });
        }
    });
}
//비디오 재생 모듈
var progBallLeft;
var progLimit;
function setPopVideo() {
    if($('.video_play').length == 0) return;

    $('.video_play').each(function (index) {
        var transText;
        var btnClass = 'video_play_btn'+index.toString();
        var roleText='';
        if($(this).attr('about')){
            var imgArray = $(this).attr('about').split(',');
        }
        $(this).addClass(btnClass);
        switch($(this).attr('data-type')){
            case 'en-script':
                //boola boola
                progBallLeft = 120;
                progLimit = [0, 373];
                transText = "<div id='prog_cap' class='btn_caption_en_off'></div><div id='prog_cap2' class='btn_caption_kr_off display-none'></div><div id='prog_sct' class='btn_script_off'></div>";
                break;
            case 'en_kr-script':
                //boola boola
                progBallLeft = 120;
                progLimit = [0, 373];
                transText = "<div id='prog_cap' class='btn_caption_en_off'></div><div id='prog_cap2' class='btn_caption_kr_off'></div><div id='prog_sct' class='btn_script_off'></div>";
                break;
            case 'role-script':
                progLimit = [0, 200];
                progBallLeft = 340;
                transText = "<div id='prog_cap' class='btn_caption_en_off'></div><div id='prog_cap2' class='btn_caption_kr_off display-none'></div><div id='prog_sct' class='btn_script_off'></div>";
                roleText += "<ul class='role_list'><li id='role_1' class=''>";
                roleText += "<img src='"+roleImgPath+imgArray[0]+"'/></li>";
                roleText += "<li id='role_2' class=''><img src='"+roleImgPath+imgArray[1]+"'/></li>";
                roleText += "<li id='role_3' class=''><img src='"+roleImgPath+imgArray[2]+"'/></li></ul>";
                transText += roleText;
                //boola boola
                break;
            case 'no-script':
                progBallLeft = 120;
                progLimit = [0, 373];
                transText = "<div id='prog_cap' class='btn_caption_en_off display-none'></div><div id='prog_cap2' class='btn_caption_kr_off display-none'></div><div id='prog_sct' class='btn_script_off display-none'></div>";
                //boola boola
                break;
        }
        var layerClass = document.createElement('div');
        var innerHtmlText = '';
        var layerClassForSeper = 'video_'+index.toString();
        $(layerClass).addClass('zoom_img_wrap');
        $(layerClass).addClass(layerClassForSeper);
        innerHtmlText += "<div class='video_header'><div class='media_title'>";
        innerHtmlText += "<div class='media_titlefont'><div class='media_tt'>Media title</div></div>";
        innerHtmlText += "<div class='btn_media_close'><img src='images/common/player/pop_media_close.png' alt='닫기'/></div></div>";
        innerHtmlText += "<div id='vwrap' ><div class='pageContainer'><div class='page_1'><div class='videoWrap'></div></div>";
        innerHtmlText += "<div class='txt'>*동영상의 대표 이미지를 poster로 지정해야 함</div></div></div>";
        innerHtmlText += "<div class='waiter' id='waiter_wrap'><img src='images/common/controls/vdo/mic.png' /></div><div class='controller'><div class='bg'></div>";
        innerHtmlText += "<div class='progController'><div id='prog_play'><img id='play' src='images/common/controls/vdo/btnPlay.png' /></div><div id='prog_stop'><img id='stop' src='images/common/controls/vdo/btnStop.png' /></div>";
        innerHtmlText += "<div id='prog_gray'><img src='images/common/player/prog_gray.png' /></div><div id='prog_color'><img src='images/common/player/prog_color.png' /></div><div id='prog_mouse'>";
        innerHtmlText += "<img src='images/common/player/prog_gray.png' ondragstart='return false' /></div><div id='prog_ball'><img src='images/common/player/prog_ball.png' ondragstart='return false' /></div>"
        innerHtmlText += "<div class='prog_pos'><div class='media_timefont'><div class='time_pos'>00:00</div></div></div><div class='prog_dur'><div class='media_timefont'><div class='time_dur'>00:00</div></div></div>";
        innerHtmlText += "<div class='fullsize btn_full_screen'></div>"+transText+"</div>";
        innerHtmlText += "<div class='thumb_list'></div><span class='display-none' id='isTrans'>off</span></div>";
        innerHtmlText += "<div class='sc_paper'><div class='caption_wrap display-none'><div class='caption_bg'></div><div class='caption_txt'><div class='media_captionfont'><div class='txt_one display-none'></div>";
        innerHtmlText += "<div class='txt_two display-none'></div></div></div></div>";
        innerHtmlText += "<div class='sc_paper'><div class='caption_wrap display-none'><div class='caption_bg'></div><div class='caption_txt'><div class='media_captionfont'>";
        innerHtmlText += "<div class='txt_one display-none'></div><div class='txt_two display-none'></div></div></div></div>";
        innerHtmlText += "<div class='script_wrap num1 off display-none'><div class='script_txt'><div class='media_scriptfont'><div class='txt_sct'></div></div></div>";
        innerHtmlText += "<div class='scController'><div class='sc_bg'><img src='images/common/player/scroll_bg.png' ondragstart='return false'/></div><div class='sc_ball'><img src='images/common/player/scroll_ball.png' ondragstart='return false'/></div></div>";
        innerHtmlText += "<div class='haneng'>";
        if($(this).attr('data-type') != 'en-script'){
            innerHtmlText += "<button class='btnTranslation_video_off num1'></button>";
        }else{
            innerHtmlText += "<button class='btnTranslation_video_off num1 display-none'></button>";
        }
        innerHtmlText += "</div></div></div></div></div>";

        layerClass.innerHTML=innerHtmlText;
        $('body').append(layerClass);
        mediaInit(index, progLimit, progBallLeft);

        $('\.'+btnClass).on('click', function () {
                PageStop();
                $('\.'+layerClassForSeper).show();
                //닫기 구현
                $('.btn_media_close').on('click',function(){
                    mediaClose(); //video.js
                    AllOff();
                    $('.zoom_img_wrap').hide();
                    mediaInit(index, progLimit, progBallLeft);
                    setController();
                });
        });
    });
}
function setTextDrag(num) {
    var draggableList = $('\.'+num+'_draggable')[0].children;
    var droppableList = $('\.'+num+'_droppable');
    draggableSet(draggableList, droppableList, num);
    //고유값
    retryDraggableSet(draggableList, num);
    saveDraggingText(draggableList, num);
}
//사전 재생모듈
function setDictionary() {
    var diction = $('.btnWordDictionary');

    $(diction).on('click', function () {

        // 열려있는 사운드 창 닫기
        closePopup();
        $('.intro_word').css('display', 'block');
    });

    $('.word_close_icon').on('click',function () {
        $('.intro_word').css('display', 'none');
    });

    var dictionLayerClass = document.createElement('div');
    var dictionInnerHtml='';
    $(dictionLayerClass).addClass('intro_word');
    $(dictionLayerClass).addClass('display-none');
    $(dictionLayerClass).addClass('wrapper');

    dictionInnerHtml += "<h1 class='header_tit'>Self Check</h1>";
    dictionInnerHtml += "<a href='' ><span class='word_close_icon'><img src='images/dictionary/close_word.png' alt='close icon' /></span></a>";
    dictionInnerHtml += "<div class='dic_head'>";
    dictionInnerHtml += "<ul class='word_catagory_list'><li>단원</li><li class='display-none'>알파벳</li></ul>";
    dictionInnerHtml += "<ul class='lesson_btn_list'><li class='on'>전체</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>sp</li></ul></div>";
    dictionInnerHtml += "<div id='words' class='word_list bold'></div>";
    dictionInnerHtml += "<div id='flashcard'><div id='word' class='bold'></div><div id='word_meaning'></div></div>";
    dictionInnerHtml += "<div id='flashcard_example'><div id='description' class='bold'></div><div id='description2'></div></div>";

    $(dictionLayerClass).append(dictionInnerHtml);
    $('body').append(dictionLayerClass);
}
function blankCheckByCss2(questionId, Ids, clearId, type){
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
    if($(questionId).hasClass('btnAnswer')){
        $(questionId).removeClass('btnAnswer');
        $(questionId).addClass('btnReset');
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
            //alert(notice + "입니다");
        }


    }else if ($(questionId).hasClass('btnReset')){
        $(questionId).removeClass('btnReset');
        $(questionId).addClass('btnAnswer');
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
function PageStop() {
    if(document.querySelector('.page_video')){
        var video = document.querySelector('.page_video');
        video.pause();
    }
}
function setShowScriptPopup() {
    // var scriptBtnArray = $('.btnScript');
    // var scriptArray = $('.script');
    // for (var i = 0; i < scriptBtnArray.length; i++) {
    //     $(scriptBtnArray[i]).attr('id', 'script_' + i.toString());
    //     $(scriptArray[i]).addClass('script_' + i.toString());
    //     var topLeft = $(scriptArray[i]).attr('about').split(',');
    //     $(scriptBtnArray[i]).on('click', function () {
    //         showScriptPopupTopLeft(this, topLeft[0], topLeft[1]);
    //     });
    // }
}
function setShowWritePopup() {
    var writeBtnArray = $('.btnWrite');
    for (var i = 0; i < writeBtnArray.length; i++) {
        $(writeBtnArray[i]).attr('id', 'write_' + i.toString());
        var topLeft = $(writeBtnArray[i]).attr('about').split(',');
        $(writeBtnArray[i]).on('click', function () {
            showWritePopup(this, topLeft[0], topLeft[1]);
        })
    }
}
function showWritePopup(target, top, left){

    if(document.getElementsByName(target.id).length>0){
        return;
    }
    var popup = document.createElement("div");
    $(popup).addClass('popup');
    $(popup).addClass('popup_type03');
    $(popup).addClass('display-none');
    var textArea = document.createElement('textarea');
    $(textArea).attr('name', 'name');
    $(textArea).attr('rows', '6');
    $(textArea).attr('cols', '20');
    $(textArea).attr('maxlength', '130');
    $(textArea).attr('name', target.id);
    $(textArea).attr('spellcheck', 'false');
    var btnRetry = document.createElement('button');
    $(btnRetry).addClass('btn_type_02');
    $(btnRetry).addClass('btnReset');
    $(btnRetry).on('click',function () {
        textClearByNames(target.id)
    });
    var btnClose = document.createElement('button');
    $(btnClose).addClass('btn_close');
    $(btnClose).on('click',function () {
        $(popup).detach();
    });
    popup.style.top = (target.offsetTop - top) + "px";
    popup.style.left = (target.offsetLeft - left) + "px";
    $(popup).append(textArea);
    $(popup).append(btnRetry);
    $(popup).append(btnClose);

    $('body').append(popup);

    $(popup).show();

}


function setShowWidePopup(){
    // var widePopBtnArray = $('.btnWeDoRang');
    // for (var i = 0; i < widePopBtnArray.length; i++) {
    //     $(widePopBtnArray[i]).attr('id', 'wide_' + i.toString());
    //     var topLeft = $(widePopBtnArray[i]).attr('about').split(',');
    //     $(widePopBtnArray[i]).on('click', function () {
    //         showWidePopup(this, topLeft[0], topLeft[1]);
    //     })
    // }
}

function showWidePopup(target, top, left){
    if(document.getElementsByName(target.id).length>0){
        return;
    }
    var popup = document.createElement("div");
    var innerText = "<h3>위두랑 연결 안내</h3>";
    var btnClose = document.createElement('button');
    $(btnClose).addClass('btn_close');
    innerText += "<p>위두랑 사이트에 접속해서<br />";
    innerText += "선생님과 이야기 하고,<br />";
    innerText += "친구들과 의견을 공유해<br />";
    innerText += "보세요.</p>";
    $(popup).addClass('popup');
    $(popup).addClass('wide_popup');
    $(popup).addClass('display-none');
    $(popup).append(innerText);
    popup.style.top = (target.offsetTop - top) + "px";
    popup.style.left = (target.offsetLeft - left) + "px";
    $(popup).append(btnClose);
    $(btnClose).on('click',function () {
        $(popup).detach();
    });
    $('body').append(popup);
}
function setShowInputPopup() {
    var writeBtnArray = $('.btnWrite_input');
    for (var i = 0; i < writeBtnArray.length; i++) {
        $(writeBtnArray[i]).attr('id', 'write_input' + i.toString());
        var topLeft = $(writeBtnArray[i]).attr('about').split(',');
        $(writeBtnArray[i]).on('click', function () {
            showInputPopup(this, topLeft[0], topLeft[1]);
        })
    }
}
function showInputPopup(target, top, left){

    if(document.getElementsByName(target.id).length>0){
        return;
    }

    var popup = document.createElement("div");
    $(popup).addClass('popup');
    $(popup).addClass('popup_type04');
    $(popup).addClass('display-none');

    var inputArea = document.createElement('input');
    $(inputArea).attr('id', 'input_'+target.id);
    $(inputArea).attr('maxlength', '20');
    $(inputArea).attr('name', target.id);
    $(inputArea).attr('spellcheck', 'false');

    var btnRetry = document.createElement('button');
    $(btnRetry).addClass('btn_type_02');
    $(btnRetry).addClass('btnAnswer');
    $(btnRetry).on('click',function () {
        /*        blankCheckByCss(this, 'ls_1_t1_a', 'ls_1_t1');*/
        blankCheckByCss(this, 'input_a_'+target.id, 'input_'+target.id);
        /*        textClearByNames(target.id)*/
    });

    var btnClose = document.createElement('button');
    $(btnClose).addClass('btn_close');
    $(btnClose).on('click',function () {
        $(popup).detach();
    });

    var correct = document.createElement('div');
    $(correct).addClass('display-none');
    $(correct).addClass('answer');
    $(correct).attr('id', 'input_a_'+target.id)

    var text = $(target).attr('data-name');
    correct.innerHTML = text;

    popup.style.top = (target.offsetTop - top) + "px";
    popup.style.left = (target.offsetLeft - left) + "px";
    $(popup).append(inputArea);
    $(popup).append(btnRetry);
    $(popup).append(btnClose);
    $(popup).append(correct);

    $('body').append(popup);

    $(popup).show();

}

