
$(document).ready(function(){
    $(".btn_role").on("click",function(){
        $(".role_play").show();
    })

    $(".role_play .btn_close").on("click",function(){
        $(".role_play").hide();
    })



    var checkbox = $("input[type=checkbox]");
    var $btnTrns = $(".btn_trans");
    var $btnPlay =  $(".r_btn_play");
    var $btnPause =  $(".btn_pause");
    var $btnStop =  $(".btn_stop");

    var $progressBar = $(".progress_bar");
    var $controllBar = $(".controll_bar");

    var $interpret = $(".interpret");
    var $selectPlayer = $(".player_img span");
    var $playerPanel =$(".player_panel");
    var $current = $selectPlayer.eq(0);
    var rpAudio = $("#pAudio").get(0);
    var audioList = [
        "./media/audio/L01/010/add/L01_010_LS1_add_03_a.mp3",
        "./media/audio/L01/010/add/L01_010_LS1_add_03_b.mp3",
        "./media/audio/L01/010/add/L01_010_LS1_add_03_c.mp3",
        "./media/audio/L01/010/add/L01_010_LS1_add_03_d.mp3"
    ]
    rpAudio.src = audioList[0];

    function clearAll(e){
        for(var i=0; i< checkbox.length ; i++){
            checkbox[i].checked = false;
        }
        e.target.checked = true
    }

    for(var i=0; i< checkbox.length ; i++){
        checkbox[i].addEventListener("change", clearAll)
    }

    // 해석 온오프
    $btnTrns.on("click",function(){
        var $this = $(this)
        var $current = null;
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
    })

    // 플레이어 선택
    $selectPlayer.click(function(e){
        var $this = $(this);
        var idx = $this.index();
        if($current){
            $current.removeClass("on");
            $playerPanel.eq($current.index()).hide();
        }
        $this.addClass("on");
        $playerPanel.eq(idx).show();
        rpAudio.src = audioList[idx];
        stopAudio();
        $current  = $this;
    })

    $(".btn_play_toggle").on("click",function(e){
        var btn = $(e.target);
        if(btn.hasClass("r_btn_play")){
            playAudio()
        }else if(btn.hasClass("btn_pause")){
            pauseAudio()
        }
    });

    $btnStop.on("click",function(){
        stopAudio();
    })

    function playAudio(){
        rpAudio.play()
        $(".btn_play_toggle").removeClass("r_btn_play").addClass("btn_pause")
    }

    function pauseAudio(){
        rpAudio.pause();
        $(".btn_play_toggle").removeClass("btn_pause").addClass("r_btn_play")
    }

    function stopAudio(){
        rpAudio.pause();
        rpAudio.currentTime = 0;

        $(".btn_play_toggle").removeClass("btn_pause").addClass("r_btn_play");
        $controllBar.offset({
            left:276
        })
    }

    rpAudio.addEventListener("timeupdate",updateProgress);

    function updateProgress(){
        var curX = (rpAudio.currentTime / rpAudio.duration * $progressBar.width()) + $progressBar.offset().left;
        $controllBar.offset({
            left:curX
        })

        console.log(rpAudio.currentTime)

    }

    $progressBar.on("click",function(e){
        var moveX = e.pageX -  $controllBar.width() / 2
        $controllBar.offset({
            left:moveX
        })
        rpAudio.currentTime = getCerrentTime(moveX)
    })


    /* 마우스 드래그, 터치 이벤트 */
    $controllBar.get(0).addEventListener('mousedown', mouseDown, false);
    $controllBar.get(0).addEventListener('touchstart', mouseDown, false);

    window.addEventListener('mouseup', mouseUp, false);
    window.addEventListener('touchend', mouseUp, false);

    var activeControl = false;
    function mouseDown() {
        activeControl = true;
        window.addEventListener('mousemove', moveControll, true);
        window.addEventListener('touchmove', moveControll, true);
        rpAudio.removeEventListener('timeupdate', updateProgress, false);
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
            rpAudio.currentTime = getCerrentTime(posX)
            rpAudio.addEventListener("timeupdate",updateProgress,false);
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
})
