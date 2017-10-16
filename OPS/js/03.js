/**
 * Created by sr01-02 on 2017-10-15.
 */
$(function () {
    setAudio();
    setPopVideo();
    setShowScriptPopup();
});


function setShowScriptPopup() {
    var scriptBtnArray = $('.btn_sp');
    var scriptArray = $('.script');
    for(var i=0; i<scriptBtnArray.length; i++){
        scriptBtnArray[i].id = 'script_'+i.toString();
        var topLeft = $(scriptArray[i]).attr('datasrc').split(',');
        $(scriptArray[i]).addClass('script_'+i.toString());
        $(scriptBtnArray[i]).on('click', function () {
            $(scriptArray[i]).addClass('script_'+i.toString());
            showScriptPopupTopLeft(this, topLeft[0], topLeft[1]);
        });
    }
}