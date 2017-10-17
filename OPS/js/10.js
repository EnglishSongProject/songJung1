
$(function () {
    setAudio();
    setPopVideo();
    setShowWritePopup();
    $(".btn_net").on("click",function(){
        showWiduPopup(this)
    });
});


function showWiduPopup(target){
    var $popup = $(".wido_popup");

    //var position = $(target).attr('datasrc').split(',');
    $popup.show();

    $(".popup .btn_close").on('click',function(){
        var $this = $(this).parent();
        $this.hide();
    });
}
