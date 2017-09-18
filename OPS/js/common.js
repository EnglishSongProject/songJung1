/**
 * Created by sr01-02 on 2017-09-15.
 */
/**
 * Created by wonhuiryu on 2017-09-09.
 */
    // Global variable to track current file name.
var currentFile = "";
function playAudio(path, btnId, target) {
    // Check for audio element support.
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            var btn = document.getElementById(btnId);

            oAudio.style.position = "absolute";
            oAudio.style.width = "200px";

            //Skip loading if current file hasn't changed.
            if (path !== currentFile) {
                oAudio.src = path;
                currentFile = path;
            }

            if(btnId == 'single'){
                if (oAudio.paused){
                    oAudio.play();
                }else{
                    oAudio.pause();
                }

                /*다른 오디오를 정지상태(플레이 가능사진)으로 바꿔준다*/
                var idForPlayAudioClose = document.getElementsByClassName('playAudio');
                for (var i = 0; i < idForPlayAudioClose.length; i++) {
                    idForPlayAudioClose[i].src = "./images/icon/headphone.png";
                }
            }else {
                // Tests the paused attribute and set state.
                if (oAudio.paused) {
                    oAudio.play();

                    /*팝업*/
                    removePopup()
                    popup = document.createElement("div")
                    popup.className = "popup"
                    target.parentNode.appendChild(popup);
                    popup.style.top = (target.offsetTop - 10) + "px";
                    popup.style.left = (target.offsetLeft + 40) + "px";
                    oAudio.style.top = (target.getBoundingClientRect().top - 6 +  window.scrollY) + "px";
                    oAudio.style.left = (target.getBoundingClientRect().left + 45 ) + "px";

                    oAudio.style.display='block';
                    var idForPlayAudioClose = document.getElementsByClassName('playAudio');
                    for (var i = 0; i < idForPlayAudioClose.length; i++) {
                        idForPlayAudioClose[i].src = "./images/icon/headphone.png";
                    }
                    btn.src = "./images/icon/pause.png";
                }
                else {
                    removePopup()
                    oAudio.pause();
                    oAudio.style.display='none';
                    btn.src = "./images/icon/headphone.png";

                }
                oAudio.addEventListener("ended", function (e) {
                    removePopup()
                    btn.src = "./images/icon/headphone.png";
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


function removePopup(){
   var popup = document.querySelector(".popup");
   if(popup){
        popup.parentNode.removeChild(popup);
    }
}

function textClear(textId){
    var textId= document.getElementById(textId);
    textId.value='';
}
