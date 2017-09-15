/**
 * Created by sr01-02 on 2017-09-15.
 */
/**
 * Created by wonhuiryu on 2017-09-09.
 */
    // Global variable to track current file name.
var currentFile = "";
function playAudio(path, btnId) {
    // Check for audio element support.
    if (window.HTMLAudioElement) {
        try {
            var oAudio = document.getElementById('myaudio');
            var btn = document.getElementById(btnId);

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
                var idForPlayAudioClose = document.getElementsByClassName('playAudio');
                for (var i = 0; i < idForPlayAudioClose.length; i++) {
                    idForPlayAudioClose[i].src = "./images/icon/headphone.png";
                }
            }else {
                // Tests the paused attribute and set state.
                if (oAudio.paused) {
                    oAudio.play();
                    var idForPlayAudioClose = document.getElementsByClassName('playAudio');
                    for (var i = 0; i < idForPlayAudioClose.length; i++) {
                        idForPlayAudioClose[i].src = "./images/icon/headphone.png";
                    }
                    btn.src = "./images/icon/pause.png";
                }
                else {
                    oAudio.pause();
                    btn.src = "./images/icon/headphone.png";
                }
                oAudio.addEventListener("ended", function (e) {
                    btn.src = "./images/icon/headphone.png";
                });
            }
        }
        catch (e) {
            // Fail silently but show in F12 developer tools console
            if(window.console && console.error("Error:" + e));
        }
    }
}
function textClear(textId){
    var textId= document.getElementById(textId);
    textId.value='';
}