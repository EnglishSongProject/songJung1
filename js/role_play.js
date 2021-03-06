$(document).ready(function(){
    $(".btnRolePlay").on("click",function(){
        $(".role_play").show();
        imageSlide.closePopup();
    });
});

function role_play(audio_list){
    var $btnPlaystop = $(".btnMoviePlaystop")
    var $btnTrns = $(".btn_rtrans");
    var $btnPlay =  $(".btn_rplay");
    var $btnPause =  $(".btn_rpause");
    var $btnStop =  $(".btn_rstop");

    var $progressBar = $(".progress_rbar");
    var $controllBar = $(".controll_rbar");
    var $interpret = $(".interpret");
    var $selectPlayer = $(".player_img span");
    var $playerPanel =$(".player_panel");
    var $current = $selectPlayer.eq(0);
    var rpAudio = $("#pAudio").get(0);

    var selectedSide  = 'all';
    var timeLine = 5.35;
    var isPlaying = false;
    var timeID = null;

    var role_player_list = audio_list;
    var checkbox = document.querySelectorAll("input[type=checkbox]");


    function init(){
        rpAudio.src = role_player_list[0].audio;
        timeLine = role_player_list[0].timeLine;
    }

    function initEvent(){
        // 오디오 이벤트
        $btnPlaystop.on("click",function(e){
            var btn = $(e.target);
            if(btn.hasClass("btn_rplay")){
                playAudio()
            }else if(btn.hasClass("btn_rpause")){
                pauseAudio()
            }
        });

        $btnStop.on("click",function(){
            stopAudio();
        });

        // 플레이어 선택
        $selectPlayer.click(function(e){
            var $this = $(this);
            var idx = $this.index();


            // 해당 오디오 선택
            rpAudio.src = role_player_list[idx].audio;
            timeLine = role_player_list[idx].timeLine;

            // 오디오 로드
            $(rpAudio).on('loadedmetadata', function() {
                resetAudio();
                if($current){
                    $current.removeClass("on");
                    $playerPanel.eq($current.index()).hide();
                }
                $this.addClass("on");
                $playerPanel.eq(idx).show();
                $current  = $this;
            });

        });

        // 체크박스 선택
        for(var i=0; i < checkbox.length; i++){
            checkbox[i].addEventListener("change",function(){
                if(this.checked == true){
                    for(var i=0; i< checkbox.length; i++){
                        checkbox[i].checked = false
                    }
                    this.checked = true
                }else{
                    this.checked = false
                }
                stopAudio();

                //어느 플레이어가 선택되었는지 체크
                for(var i=0; i < checkbox.length; i++){
                    if(checkbox[i].checked){
                        selectedSide = checkbox[i].id;
                        break;
                    }
                    selectedSide = "all"
                }
            })
        }

        //  진행바 클릭시 해당부분으로 이동
        $progressBar.on("click",function(e){
            var moveX = e.pageX -  $controllBar.width() / 2
            $controllBar.offset({
                left:moveX
            });
            rpAudio.currentTime = getCerrentTime(moveX)
        });

        // 해석 온오프
        $btnTrns.on("click",function(){
            var $this = $(this);
            if($this.hasClass("trans_off")){
                $this.removeClass("trans_off").addClass("trans_on")
                $interpret.css({
                    display: "block"
                })
            }else if($this.hasClass("trans_on")){
                $this.removeClass("trans_on").addClass("trans_off")
                $interpret.css({
                    display: "none"
                })
            }
        });

        //rpAudio.addEventListener("timeupdate",updateProgress);

        rpAudio.addEventListener("ended", function (e) {
            stopAudio();
        });

        /* 마우스 드래그, 터치 이벤트 */
        $controllBar.get(0).addEventListener('mousedown', mouseDown, false);
        $controllBar.get(0).addEventListener('touchstart', mouseDown, false);

        window.addEventListener('mouseup', mouseUp, false);
        window.addEventListener('touchend', mouseUp, false);

        // 팝업창 닫을 때 오디오 초기화, 첫번째 플레이어 선택, 해석끄기, 팝업창 숨기기
        $(".role_play .btn_close").on("click",function(){
            resetAudio();
            $selectPlayer.eq(0).click();
            $btnTrns.removeClass("trans_on").addClass("trans_off")
            $interpret.css({
                display: "none"
            });
            $(".role_play").hide();
        })
    }

    function checkSide(){
        var startTime =  timeLine[0];
        var endTime =  timeLine[1] || rpAudio.duration

        if(selectedSide == "sideA"){
            if(rpAudio.currentTime <  startTime){
                rpAudio.muted = true
            }else{
                rpAudio.muted = false
            }

        }else if(selectedSide == "sideB"){
            if(startTime < rpAudio.currentTime &&  endTime > rpAudio.currentTime){
                rpAudio.muted = true
            }else{
                rpAudio.muted = false
            }

        }else if(selectedSide == "sideC"){
            if(rpAudio.currentTime >  endTime){
                rpAudio.muted = true
            }else{
                rpAudio.muted = false
            }

        }else if(selectedSide == "all"){
            rpAudio.muted = false
        }
    }

    // 초기화
    function resetAudio(){
        stopAudio();
        selectedSide = "all";
        for(var i=0; i< checkbox.length; i++){
            checkbox[i].checked = false
        }
    }

    // 오디오 관련 함수
    function playAudio(){
        rpAudio.play();
        isPlaying = true
        $(".btnMoviePlaystop").removeClass("btn_rplay").addClass("btn_rpause");

        if (timeID){
            clearInterval(timeID);
        }
        timeID = setInterval(updateProgress,10);

    }

    function pauseAudio(){
        rpAudio.pause();
        isPlaying = false
        $(".btnMoviePlaystop").removeClass("btn_rpause").addClass("btn_rplay");

        clearInterval(timeID);
        timeID = null;

    }

    function stopAudio(){
        try {
            rpAudio.pause();
            isPlaying = false;
            rpAudio.currentTime = 0;
            $controllBar.removeAttr("style");
            $(".btnMoviePlaystop").removeClass("btn_rpause").addClass("btn_rplay");

            clearInterval(timeID);
            timeID = null;
        }
        catch (e) {
            // Fail silently but show in F12 developer tools console
            if(window.console && console.error("Error:" + e));
        }
    }

    function updateProgress(){
        var curX = (rpAudio.currentTime / rpAudio.duration * $progressBar.width()) + $progressBar.offset().left;
        $controllBar.offset({
            left:curX
        });

        checkSide();
    }

    /*drag , 터치 관련 함수*/
    var activeControl = false;
    function mouseDown() {
        activeControl = true;
        window.addEventListener('mousemove', moveControll, true);
        window.addEventListener('touchmove', moveControll, true);

        //rpAudio.removeEventListener('timeupdate', updateProgress, false);
        clearInterval(timeID);
        timeID = null;
        rpAudio.pause();
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
            rpAudio.currentTime = getCerrentTime(posX);
            //rpAudio.addEventListener("timeupdate",updateProgress,false);

            if(isPlaying){
                rpAudio.play();
                if(timeID == null){
                    timeID = setInterval(updateProgress,10);
                }
            }
        }
        activeControl = false;
    }

    function moveControll(event){
        var moveX = 0;
        if (event.touches) {
            moveX = event.touches[0].pageX;
        }
        else {
            event.preventDefault();
            moveX = event.pageX;
        }

        var startX =$progressBar.offset().left
        var endX = $progressBar.offset().left + $progressBar.width() - $controllBar.width()

        if(moveX < startX){
            moveX = startX
        }else if(moveX > endX){
            moveX = endX
        }

        $controllBar.offset({
            left:moveX
        })
    }

    function getCerrentTime(posX) {
        return (posX - $progressBar.offset().left) / ($progressBar.width()) * rpAudio.duration
    }

    init();
    initEvent();
}
