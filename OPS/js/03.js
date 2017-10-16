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
        $(scriptBtnArray[i]).on('click', function () {
            $(this).attr('id', 'script_'+i.toString());
            $(scriptArray[i]).addClass('script_'+i.toString());
            var topLeft = $(scriptArray).attr('datasrc').split(',');
            showScriptPopupTopLeft(this, topLeft[0], topLeft[1]);
        });
    }
}