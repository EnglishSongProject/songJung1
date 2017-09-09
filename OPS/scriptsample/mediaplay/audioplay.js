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

            // Tests the paused attribute and set state.
            if (oAudio.paused) {
                oAudio.play();
                var idForPlayAudioClose = document.getElementsByClassName('playAudio');
                for(var i=0; i<idForPlayAudioClose.length;i++){
                    idForPlayAudioClose[i].textContent = "Play"
                }
                btn.textContent = "Pause";
            }
            else {
                oAudio.pause();
                btn.textContent = "Play";
            }
        }
        catch (e) {
            // Fail silently but show in F12 developer tools console
            if(window.console && console.error("Error:" + e));
        }
    }
}
